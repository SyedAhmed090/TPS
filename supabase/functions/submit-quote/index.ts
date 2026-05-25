import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'
import { quoteConfirmation, quoteNotification } from '../_shared/emailTemplates.ts'

const ALLOWED_EXTS  = ['.ai','.eps','.pdf','.svg','.png','.jpg','.jpeg','.psd']
const MAX_FILE_SIZE = 25 * 1024 * 1024

async function sendEmail(to: string, template: ReturnType<typeof quoteConfirmation>) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: 'The Patch Solutions <noreply@thepatchsolutions.com>', to, subject: template.subject, html: template.html, text: template.text }),
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const formData = await req.formData()

    const name        = formData.get('name')?.toString().trim() ?? ''
    const email       = formData.get('email')?.toString().trim().toLowerCase() ?? ''
    const patchType   = formData.get('patch_type')?.toString().trim() ?? ''
    const size        = formData.get('size')?.toString().trim() ?? ''
    const quantityRaw = formData.get('quantity')?.toString().trim() ?? ''
    // quantity may be a range string like "25–49"; parse the lower bound
    const quantity    = parseInt(quantityRaw)

    const errors: Record<string, string> = {}
    if (!name)    errors.name       = 'Name is required'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Valid email is required'
    if (!patchType) errors.patch_type = 'Patch type is required'
    if (!quantityRaw) errors.quantity = 'Quantity is required'

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ success: false, errors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify Turnstile CAPTCHA token if secret is configured
    const turnstileToken  = formData.get('turnstile_token')?.toString()
    const turnstileSecret = Deno.env.get('TURNSTILE_SECRET_KEY')
    if (turnstileSecret && turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${turnstileSecret}&response=${turnstileToken}`,
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return new Response(JSON.stringify({ success: false, message: 'CAPTCHA verification failed. Please try again.' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } else if (turnstileSecret && !turnstileToken) {
      return new Response(JSON.stringify({ success: false, message: 'CAPTCHA token missing. Please complete the verification.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const phone          = formData.get('phone')?.toString().trim().slice(0, 50) ?? null
    const organization   = formData.get('organization')?.toString().trim().slice(0, 200) ?? null
    const coverage       = formData.get('coverage')?.toString().trim() ?? null
    const backing        = formData.get('backing')?.toString().trim() ?? null
    const colors         = parseInt(formData.get('colors')?.toString() ?? '8') || 8
    const metallicThread = formData.get('metallic_thread') === 'true'
    const rushOrder      = formData.get('rush_order') === 'true'
    const turnaround     = formData.get('turnaround_needed')?.toString().trim() ?? null
    const specialNotes   = formData.get('special_notes')?.toString().trim().slice(0, 2000) ?? null
    const discountCodeRaw = formData.get('discount_code')?.toString().trim().toUpperCase() ?? null
    const estimatedPrice = parseFloat(formData.get('estimated_price')?.toString() ?? '') || null
    const sourcePage     = formData.get('source_page')?.toString().trim().slice(0, 200) ?? null
    const ipAddress      = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null

    // Rate limit: max 5 quotes per IP in 10 minutes
    if (ipAddress) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
      const { count } = await supabaseAdmin
        .from('quotes')
        .select('id', { count: 'exact', head: true })
        .eq('ip_address', ipAddress)
        .gte('created_at', tenMinutesAgo)
      if ((count ?? 0) >= 5) {
        return new Response(JSON.stringify({ success: false, message: 'Too many requests. Please try again later.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    // Extract auth_user_id from JWT if the user is logged in
    let auth_user_id: string | null = null
    const authHeader = req.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const { data: { user } } = await supabaseAdmin.auth.getUser(authHeader.substring(7))
      auth_user_id = user?.id ?? null
    }

    // Handle artwork upload — use signed URL (bucket is private)
    let artworkUrl: string | null = null
    let artworkFilename: string | null = null
    const artworkFile = formData.get('artwork') as File | null

    if (artworkFile && artworkFile.size > 0) {
      if (artworkFile.size > MAX_FILE_SIZE) {
        return new Response(JSON.stringify({ success: false, errors: { artwork: 'File must be under 25MB' } }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const ext = '.' + artworkFile.name.split('.').pop()!.toLowerCase()
      if (!ALLOWED_EXTS.includes(ext)) {
        return new Response(JSON.stringify({ success: false, errors: { artwork: 'File type not allowed. Use: AI, EPS, PDF, SVG, PNG, JPG, PSD' } }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const uuid  = crypto.randomUUID()
      const now   = new Date()
      const year  = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const path  = `quotes/${year}/${month}/${uuid}-${artworkFile.name}`
      const bytes = await artworkFile.arrayBuffer()

      const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage.from('artwork-uploads')
        .upload(path, bytes, { contentType: artworkFile.type || 'application/octet-stream' })

      if (uploadError) throw new Error('File upload failed')

      // Bucket is private — create a long-lived signed URL for admin access
      const { data: signedData } = await supabaseAdmin
        .storage.from('artwork-uploads')
        .createSignedUrl(uploadData.path, 60 * 60 * 24 * 365 * 5) // 5 years

      artworkUrl      = signedData?.signedUrl ?? null
      artworkFilename = artworkFile.name
    }

    // Validate discount code
    let discountAmount: number | null = null
    if (discountCodeRaw) {
      const { data: dc } = await supabaseAdmin
        .from('discount_codes')
        .select('*')
        .eq('code', discountCodeRaw)
        .eq('active', true)
        .single()

      if (dc) {
        const expired  = dc.expires_at && new Date(dc.expires_at) < new Date()
        const hitLimit = dc.usage_limit !== null && dc.usage_count >= dc.usage_limit
        if (!expired && !hitLimit) {
          if (estimatedPrice !== null) {
            if (dc.type === 'percent') discountAmount = +(estimatedPrice * dc.value / 100).toFixed(2)
            else discountAmount = Math.min(dc.value, estimatedPrice)
          }
          await supabaseAdmin.from('discount_codes').update({ usage_count: dc.usage_count + 1 }).eq('id', dc.id)
        }
      }
    }

    // Insert quote — include auth_user_id so it appears in the customer's account
    const { data: quote, error: quoteError } = await supabaseAdmin
      .from('quotes')
      .insert({
        name, email, phone, organization,
        patch_type: patchType, size,
        quantity: isNaN(quantity) ? null : quantity,
        quantity_range: quantityRaw,
        coverage, backing, colors, metallic_thread: metallicThread,
        rush_order: rushOrder, turnaround_needed: turnaround,
        artwork_url: artworkUrl, artwork_filename: artworkFilename,
        special_notes: specialNotes,
        estimated_price: estimatedPrice,
        discount_code: discountCodeRaw,
        discount_amount: discountAmount,
        source_page: sourcePage,
        ip_address: ipAddress,
        auth_user_id,
      })
      .select('id')
      .single()

    if (quoteError) throw quoteError

    const quoteId    = quote.id
    const adminEmail = Deno.env.get('ADMIN_EMAIL') ?? 'info@thepatchsolutions.com'

    const [custRes, adminRes] = await Promise.allSettled([
      sendEmail(email, quoteConfirmation({
        name, quote_id: quoteId, patch_type: patchType, size, quantity,
        estimated_price: estimatedPrice ?? undefined,
        artwork_submitted: !!artworkUrl,
      })),
      sendEmail(adminEmail, quoteNotification({
        quote_id: quoteId, name, email, phone: phone ?? undefined,
        patch_type: patchType, size, quantity,
        estimated_price: estimatedPrice ?? undefined,
        rush_order: rushOrder,
        artwork_url: artworkUrl ?? undefined,
        special_notes: specialNotes ?? undefined,
        source_page: sourcePage ?? undefined,
      })),
    ])

    const logRows = []
    const custTmpl = quoteConfirmation({ name, quote_id: quoteId, patch_type: patchType, size, quantity, artwork_submitted: !!artworkUrl })
    if (custRes.status === 'fulfilled' && custRes.value.ok) {
      const resendData = await custRes.value.json().catch(() => ({}))
      logRows.push({ to_email: email, template: 'quote-confirmation', subject: custTmpl.subject, status: 'sent', related_id: quoteId, related_type: 'quote', resend_id: resendData.id })
    } else {
      logRows.push({ to_email: email, template: 'quote-confirmation', subject: custTmpl.subject, status: 'failed', related_id: quoteId, related_type: 'quote', error_message: 'Send failed' })
    }
    const adminTmpl = quoteNotification({ quote_id: quoteId, name, email, patch_type: patchType, size, quantity })
    if (adminRes.status === 'fulfilled' && adminRes.value.ok) {
      logRows.push({ to_email: adminEmail, template: 'quote-notification', subject: adminTmpl.subject, status: 'sent', related_id: quoteId, related_type: 'quote' })
    } else {
      logRows.push({ to_email: adminEmail, template: 'quote-notification', subject: adminTmpl.subject, status: 'failed', related_id: quoteId, related_type: 'quote' })
    }
    await supabaseAdmin.from('email_logs').insert(logRows)

    return new Response(JSON.stringify({
      success: true, quote_id: quoteId,
      message: "Quote request received! We'll respond within 1 business day.",
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('submit-quote error:', err)
    return new Response(JSON.stringify({ success: false, message: 'Something went wrong. Please try again.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
