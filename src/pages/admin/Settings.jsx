import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const SETTING_LABELS = {
  min_order_quantity: 'Minimum Order Quantity',
  flat_rate_shipping: 'Flat-Rate Shipping (USD)',
  rush_fee_pct:       'Rush Order Surcharge (%)',
  contact_email:      'Contact Email Address',
}

export default function Settings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(null)
  const [saved, setSaved]       = useState(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase.from('settings').select('*')
    const map = {}
    ;(data || []).forEach(s => { map[s.key] = s.value })
    setSettings(map)
    setLoading(false)
  }

  async function saveSetting(key) {
    setSaving(key)
    await supabase.from('settings').upsert({ key, value: settings[key], updated_at: new Date().toISOString() })
    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
  }

  if (loading) return <p style={{ color: 'rgba(255,255,255,0.3)', padding: '2rem 0' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Settings</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}>
        {Object.entries(SETTING_LABELS).map(([key, label]) => (
          <div key={key} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,147,26,0.15)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{label}</label>
              <input
                value={settings[key] ?? ''}
                onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid rgba(200,147,26,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
            <button
              onClick={() => saveSetting(key)}
              disabled={saving === key}
              style={{ padding: '9px 18px', background: saved === key ? '#22c55e' : 'var(--gold)', color: 'var(--navy)', border: 'none', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 700, transition: 'background 0.2s' }}
            >
              {saved === key ? 'Saved ✓' : saving === key ? 'Saving...' : 'Save'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
