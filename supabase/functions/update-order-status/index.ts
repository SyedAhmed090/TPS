import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'
import { orderInProduction, orderShipped, orderDelivered } from '../_shared/emailTemplates.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const SITE_URL       = Deno.env.get('SITE_URL') ?? 'https://thepatchsolutions.com'

// Human-readable display ID derived from UUID (e.g. "TPS-A1B2C3D4")
function displayOrderId(id: string): string {
  return 'TPS-' + id.replace(/-/g, '').substring(0, 8).toUpperCase()
}

async function sendEmail(to: string, subject: string, html: string, text: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'The Patch Solutions <noreply@thepatchsolutions.com>', to, subject, html, text }),
  })
  return { ok: res.ok, data: await res.json() }
}

type OrderStatus = 'pending' | 'in_production' | 'shipped' | 'delivered' | 'cancelled'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // Verify caller is an authenticated admin
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const { data: adminRow } = await supabaseAdmin
      .from('admin_users').select('id').eq('auth_user_id', user.id).maybeSingle()
    if (!adminRow) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { order_id, status, tracking_number, carrier, note } = await req.json() as {
      order_id: string; status: OrderStatus; tracking_number?: string; carrier?: string; note?: string
    }

    if (!order_id || !status) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Use full_name (schema column), not name
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*, customers(email, full_name)')
      .eq('id', order_id)
      .single()

    if (fetchError || !order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const updatePayload: Record<string, unknown> = { status }
    if (tracking_number) updatePayload.tracking_number = tracking_number
    if (carrier) updatePayload.carrier = carrier
    if (status === 'shipped') updatePayload.shipped_at = new Date().toISOString()
    if (status === 'delivered') updatePayload.delivered_at = new Date().toISOString()
    if (note) {
      const existing = order.internal_notes ?? ''
      const ts = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
      updatePayload.internal_notes = existing ? `${existing}\n\n[${ts}] ${note}` : `[${ts}] ${note}`
    }

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update(updatePayload)
      .eq('id', order_id)

    if (updateError) {
      return new Response(JSON.stringify({ error: 'Failed to update order' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const customerEmail = order.customers?.email
    // Use order_number from DB if present, otherwise derive from UUID
    const orderRef      = order.order_number ?? displayOrderId(order.id)
    const customerName  = order.customers?.full_name || 'Customer'

    if (customerEmail && ['in_production', 'shipped', 'delivered'].includes(status)) {
      let tpl: { html: string; text: string } | null = null
      let subject = ''

      if (status === 'in_production') {
        tpl = orderInProduction({ name: customerName, orderNumber: orderRef, siteUrl: SITE_URL })
        subject = `Your Order Is In Production — ${orderRef}`
      } else if (status === 'shipped') {
        tpl = orderShipped({
          name: customerName, orderNumber: orderRef,
          trackingNumber: tracking_number, carrier, siteUrl: SITE_URL,
        })
        subject = `Your Order Has Shipped — ${orderRef}`
      } else if (status === 'delivered') {
        tpl = orderDelivered({ name: customerName, orderNumber: orderRef, siteUrl: SITE_URL })
        subject = `Your Order Has Been Delivered — ${orderRef}`
      }

      if (tpl && subject) {
        const result = await sendEmail(customerEmail, subject, tpl.html, tpl.text)
        await supabaseAdmin.from('email_logs').insert({
          to_email: customerEmail, subject, template: `order_${status}`,
          status: result.ok ? 'sent' : 'failed',
          resend_id: result.data?.id ?? null,
          error_message: result.ok ? null : JSON.stringify(result.data),
        })
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('update-order-status error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
