import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatDate } from '../../utils/validation'

const th = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', whiteSpace: 'nowrap' }
const td = { padding: '10px 12px', fontSize: '0.88rem', color: 'var(--text-dark)', borderBottom: '1px solid rgba(11,26,46,0.07)', verticalAlign: 'middle' }

const EMPTY_FORM = { code: '', description: '', pct_off: '', min_quantity: '25', max_uses: '', expires_at: '' }

export default function DiscountCodes() {
  const [codes, setCodes]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [saving, setSaving]     = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase.from('discount_codes').select('*').order('created_at', { ascending: false })
    setCodes(data || [])
    setLoading(false)
  }

  async function toggleActive(code) {
    await supabase.from('discount_codes').update({ active: !code.active }).eq('id', code.id)
    setCodes(prev => prev.map(c => c.id === code.id ? { ...c, active: !c.active } : c))
  }

  async function handleCreate(e) {
    e.preventDefault()
    setFormError('')
    if (!form.code.trim() || !form.pct_off) { setFormError('Code and discount % are required.'); return }
    setSaving(true)
    const { error } = await supabase.from('discount_codes').insert({
      code: form.code.trim().toUpperCase(),
      description: form.description || null,
      pct_off: parseInt(form.pct_off),
      min_quantity: parseInt(form.min_quantity) || 25,
      max_uses: form.max_uses ? parseInt(form.max_uses) : null,
      expires_at: form.expires_at || null,
      active: true,
    })
    setSaving(false)
    if (error) { setFormError(error.message); return }
    setForm(EMPTY_FORM)
    fetchData()
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Discount Codes</h1>

      <div style={{ background: 'var(--cream)', border: '1px solid rgba(11,26,46,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '1rem' }}>Create New Code</h3>
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            {[['code','Code (auto-uppercased)'],['pct_off','Discount %'],['min_quantity','Min Qty'],['max_uses','Max Uses (blank=unlimited)'],['description','Description']].map(([key, label]) => (
              <div key={key}>
                <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 4 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={label}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 4 }}>Expires (blank=never)</label>
              <input type="date" value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', outline: 'none' }} />
            </div>
          </div>
          {formError && <p style={{ color: '#c0392b', fontSize: '0.82rem', marginBottom: '0.75rem' }}>{formError}</p>}
          <button type="submit" disabled={saving} style={{ padding: '8px 20px', background: 'var(--navy)', color: '#fff', border: 'none', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
            {saving ? 'Creating...' : 'Create Code'}
          </button>
        </form>
      </div>

      {loading ? (
        <p style={{ color: 'var(--gray-mid)', padding: '2rem 0' }}>Loading...</p>
      ) : (
        <div style={{ background: 'var(--white)', border: '1px solid rgba(11,26,46,0.1)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Code','Description','% Off','Min Qty','Used','Max Uses','Expires','Active'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {codes.map((c, i) => (
                <tr key={c.id} style={{ background: i % 2 === 1 ? 'var(--cream)' : 'var(--white)' }}>
                  <td style={{ ...td, fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', fontWeight: 700 }}>{c.code}</td>
                  <td style={{ ...td, color: 'var(--gray-mid)' }}>{c.description || '—'}</td>
                  <td style={td}>{c.pct_off}%</td>
                  <td style={td}>{c.min_quantity}</td>
                  <td style={td}>{c.used_count}</td>
                  <td style={td}>{c.max_uses ?? '∞'}</td>
                  <td style={{ ...td, fontSize: '0.8rem', color: 'var(--gray-mid)' }}>{c.expires_at ? formatDate(c.expires_at) : 'Never'}</td>
                  <td style={td}>
                    <button onClick={() => toggleActive(c)} style={{ padding: '4px 10px', background: c.active ? '#22c55e' : '#94a3b8', color: '#fff', border: 'none', borderRadius: 12, fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', cursor: 'pointer' }}>
                      {c.active ? 'Active' : 'Off'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
