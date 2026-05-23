import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'
import {
  quoteConfirmation, contactConfirmation, sampleConfirmation,
  proofApproval, orderInProduction, orderShipped, orderDelivered,
} from '../_shared/emailTemplates.ts'

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

    // Verify admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: adminCheck } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!adminCheck) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { template = 'quote_confirmation', to } = await req.json()
    if (!to) {
      return new Response(JSON.stringify({ error: 'Missing "to" email' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const demoName = 'Test User'
    let tpl: { html: string; text: string }
    let subject: string

    switch (template) {
      case 'quote_confirmation':
        tpl = quoteConfirmation({ name: demoName, patchType: 'Embroidered Patches', quantity: 100, discountPct: 10, estimatedPrice: 189, siteUrl: SITE_URL })
        subject = '[TEST] Your Quote Request — The Patch Solutions'
        break
      case 'contact_confirmation':
        tpl = contactConfirmation({ name: demoName, subject: 'General Inquiry', siteUrl: SITE_URL })
        subject = '[TEST] Message Received — The Patch Solutions'
        break
      case 'sample_confirmation':
        tpl = sampleConfirmation({ name: demoName, siteUrl: SITE_URL })
        subject = '[TEST] Free Sample Request Received — The Patch Solutions'
        break
      case 'proof_approval':
        tpl = proofApproval({ name: demoName, proofUrl: `${SITE_URL}/sample-proof.pdf`, approveUrl: `${SITE_URL}/account`, siteUrl: SITE_URL })
        subject = '[TEST] Your Design Proof Is Ready — The Patch Solutions'
        break
      case 'order_in_production':
        tpl = orderInProduction({ name: demoName, orderNumber: 'TPS-0001', siteUrl: SITE_URL })
        subject = '[TEST] Your Order Is In Production — TPS-0001'
        break
      case 'order_shipped':
        tpl = orderShipped({ name: demoName, orderNumber: 'TPS-0001', trackingNumber: '1Z999AA10123456784', carrier: 'UPS', siteUrl: SITE_URL })
        subject = '[TEST] Your Order Has Shipped — TPS-0001'
        break
      case 'order_delivered':
        tpl = orderDelivered({ name: demoName, orderNumber: 'TPS-0001', siteUrl: SITE_URL })
        subject = '[TEST] Your Order Has Been Delivered — TPS-0001'
        break
      default:
        return new Response(JSON.stringify({ error: `Unknown template: ${template}` }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

    const result = await sendEmail(to, subject, tpl.html, tpl.text)

    return new Response(JSON.stringify({ success: result.ok, resendId: result.data?.id, error: result.ok ? null : result.data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('test-email error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
