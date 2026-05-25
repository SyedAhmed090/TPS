import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'
import { contactConfirmation, contactNotification } from '../_shared/emailTemplates.ts'

async function sendEmail(to: string, tmpl: { subject: string; html: string; text: string }) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'The Patch Solutions <noreply@thepatchsolutions.com>', to, subject: tmpl.subject, html: tmpl.html, text: tmpl.text }),
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { name, email, phone, subject, message, turnstile_token } = await req.json()

    // Verify Turnstile CAPTCHA token if secret is configured
    const turnstileSecret = Deno.env.get('TURNSTILE_SECRET_KEY')
    if (turnstileSecret && turnstile_token) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${turnstileSecret}&response=${turnstile_token}`,
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return new Response(JSON.stringify({ success: false, message: 'CAPTCHA verification failed. Please try again.' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } else if (turnstileSecret && !turnstile_token) {
      return new Response(JSON.stringify({ success: false, message: 'CAPTCHA token missing. Please complete the verification.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const errors: Record<string, string> = {}
    if (!name?.trim())    errors.name    = 'Name is required'
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Valid email is required'
    if (!message?.trim()) errors.message = 'Message is required'

    if (Object.keys(errors).length) {
      return new Response(JSON.stringify({ success: false, errors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Rate limit: one submission per email per 5 minutes
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { data: recent } = await supabaseAdmin
      .from('email_logs')
      .select('id')
      .eq('to_email', email.toLowerCase())
      .eq('template', 'contact-confirmation')
      .gte('created_at', fiveMinAgo)
      .limit(1)

    if (recent && recent.length > 0) {
      return new Response(JSON.stringify({ success: false, message: 'Please wait a few minutes before submitting again.' }), {
        status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null

    const { data: contact, error: contactError } = await supabaseAdmin
      .from('contacts')
      .insert({
        name: name.trim().slice(0, 200),
        email: email.trim().toLowerCase(),
        phone: phone?.trim().slice(0, 50) ?? null,
        subject: subject?.trim().slice(0, 300) ?? null,
        message: message.trim().slice(0, 5000),
        ip_address: ipAddress,
      })
      .select('id')
      .single()

    if (contactError) throw contactError

    const adminEmail = Deno.env.get('ADMIN_EMAIL') ?? 'info@thepatchsolutions.com'
    const custTmpl   = contactConfirmation({ name: name.trim(), subject: subject?.trim() })
    const adminTmpl  = contactNotification({ contact_id: contact.id, name: name.trim(), email: email.trim(), phone: phone?.trim(), subject: subject?.trim(), message: message.trim() })

    const [custRes, adminRes] = await Promise.allSettled([
      sendEmail(email.trim(), custTmpl),
      sendEmail(adminEmail, adminTmpl),
    ])

    await supabaseAdmin.from('email_logs').insert([
      {
        to_email: email.trim(), template: 'contact-confirmation', subject: custTmpl.subject,
        status: custRes.status === 'fulfilled' && custRes.value.ok ? 'sent' : 'failed',
        related_id: contact.id, related_type: 'contact',
      },
      {
        to_email: adminEmail, template: 'contact-notification', subject: adminTmpl.subject,
        status: adminRes.status === 'fulfilled' && adminRes.value.ok ? 'sent' : 'failed',
        related_id: contact.id, related_type: 'contact',
      },
    ])

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('submit-contact error:', err)
    return new Response(JSON.stringify({ success: false, message: 'Something went wrong. Please try again.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
