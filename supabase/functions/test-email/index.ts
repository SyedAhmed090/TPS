import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return new Response(JSON.stringify({ success: false }), { status: 401, headers: corsHeaders })

    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseAdmin.auth.getUser(token)
    if (!user) return new Response(JSON.stringify({ success: false }), { status: 401, headers: corsHeaders })

    const { data: adminCheck } = await supabaseAdmin.from('admin_users').select('id').eq('auth_user_id', user.id).single()
    if (!adminCheck) return new Response(JSON.stringify({ success: false }), { status: 403, headers: corsHeaders })

    const { to_email } = await req.json()
    if (!to_email) return new Response(JSON.stringify({ success: false, message: 'to_email required' }), { status: 400, headers: corsHeaders })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'The Patch Solutions <noreply@thepatchsolutions.com>',
        to: to_email,
        subject: 'Test Email — The Patch Solutions',
        html: '<p>This is a test email from The Patch Solutions backend. If you received this, Resend integration is working correctly.</p>',
        text: 'Test email from The Patch Solutions backend. Resend integration is working.',
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify({ success: res.ok, message_id: data.id, error: res.ok ? undefined : data }), {
      status: res.ok ? 200 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: String(err) }), { status: 500, headers: corsHeaders })
  }
})
