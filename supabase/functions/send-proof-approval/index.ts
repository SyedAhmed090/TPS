import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'
import { proofApproval } from '../_shared/emailTemplates.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const SITE_URL       = Deno.env.get('SITE_URL') ?? 'https://thepatchsolutions.com'

async function sendEmail(to: string, subject: string, html: string, text: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'The Patch Solutions <noreply@thepatchsolutions.com>', to, subject, html, text }),
  })
  return { ok: res.ok, data: await res.json() }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { order_id, proof_url, customer_email, customer_name } = await req.json()

    if (!order_id || !proof_url || !customer_email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ proof_url, proof_approved: false })
      .eq('id', order_id)

    if (updateError) {
      return new Response(JSON.stringify({ error: 'Failed to update order' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const tpl = proofApproval({
      name: customer_name || 'Customer',
      proofUrl: proof_url,
      approveUrl: `${SITE_URL}/account/orders/${order_id}?approve=true`,
      siteUrl: SITE_URL,
    })

    const result = await sendEmail(customer_email, 'Your Design Proof Is Ready — The Patch Solutions', tpl.html, tpl.text)

    await supabaseAdmin.from('email_logs').insert({
      to_email: customer_email, subject: 'Your Design Proof Is Ready — The Patch Solutions',
      template: 'proof_approval', status: result.ok ? 'sent' : 'failed',
      resend_id: result.data?.id ?? null, error: result.ok ? null : JSON.stringify(result.data),
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-proof-approval error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
