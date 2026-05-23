import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'
import { sampleConfirmation, sampleNotification } from '../_shared/emailTemplates.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const ADMIN_EMAIL    = Deno.env.get('ADMIN_EMAIL') ?? 'info@thepatchsolutions.com'
const SITE_URL       = Deno.env.get('SITE_URL') ?? 'https://thepatchsolutions.com'

async function sendEmail(to: string, subject: string, html: string, text: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'The Patch Solutions <noreply@thepatchsolutions.com>',
      to, subject, html, text,
    }),
  })
  const data = await res.json()
  return { ok: res.ok, data }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { name, email, phone, company, address, city, state, zip, country = 'US', patch_types, notes } = body

    if (!name || !email || !address || !city || !state || !zip) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: sample, error } = await supabaseAdmin
      .from('sample_requests')
      .insert({ name, email, phone: phone || null, company: company || null, address, city, state, zip, country, patch_types: patch_types || [], notes: notes || null })
      .select()
      .single()

    if (error) {
      return new Response(JSON.stringify({ error: 'Failed to save request' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const confirmTpl = sampleConfirmation({ name, siteUrl: SITE_URL })
    const notifyTpl  = sampleNotification({ name, email, phone, company, address, city, state, zip, country, patchTypes: patch_types, notes, requestId: sample.id })

    const confirmResult = await sendEmail(email, 'Free Sample Request Received — The Patch Solutions', confirmTpl.html, confirmTpl.text)
    await sendEmail(ADMIN_EMAIL, `New Sample Request: ${name}`, notifyTpl.html, notifyTpl.text)

    await supabaseAdmin.from('email_logs').insert({
      to_email: email, subject: 'Free Sample Request Received — The Patch Solutions',
      template: 'sample_confirmation', status: confirmResult.ok ? 'sent' : 'failed',
      resend_id: confirmResult.data?.id ?? null, error: confirmResult.ok ? null : JSON.stringify(confirmResult.data),
    })

    return new Response(JSON.stringify({ success: true, requestId: sample.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('request-sample error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
