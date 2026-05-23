import { corsHeaders } from '../_shared/cors.ts'
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { code, order_total } = await req.json()

    if (!code?.trim()) {
      return new Response(JSON.stringify({ valid: false, message: 'No code provided' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: dc, error } = await supabaseAdmin
      .from('discount_codes')
      .select('*')
      .eq('code', code.trim().toUpperCase())
      .eq('active', true)
      .single()

    if (error || !dc) {
      return new Response(JSON.stringify({ valid: false, message: 'Invalid code. Please check and try again.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (dc.expires_at && new Date(dc.expires_at) < new Date()) {
      return new Response(JSON.stringify({ valid: false, message: 'This code has expired.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (dc.usage_limit !== null && dc.usage_count >= dc.usage_limit) {
      return new Response(JSON.stringify({ valid: false, message: 'This code has reached its usage limit.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (dc.min_order_amount !== null && order_total !== undefined && order_total < dc.min_order_amount) {
      return new Response(JSON.stringify({ valid: false, message: `Minimum order of $${dc.min_order_amount.toFixed(2)} required for this code.` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const savings = dc.type === 'percent'
      ? (order_total !== undefined ? +(order_total * dc.value / 100).toFixed(2) : null)
      : dc.value

    return new Response(JSON.stringify({
      valid: true,
      type: dc.type,
      value: dc.value,
      label: dc.label,
      savings,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('validate-discount error:', err)
    return new Response(JSON.stringify({ valid: false, message: 'Unable to validate code. Please try again.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
