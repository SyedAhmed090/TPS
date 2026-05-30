import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatDate, formatCurrency } from '../../utils/validation'

const th = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', whiteSpace: 'nowrap', borderBottom: '2px solid rgba(200,147,26,0.2)' }
const td = { padding: '10px 12px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'middle' }

export default function Customers() {
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
    setRows(data || [])
    setLoading(false)
  }

  const filtered = rows.filter(r => {
    if (!search) return true
    const q = search.toLowerCase()
    return (r.full_name || '').toLowerCase().includes(q) ||
           (r.email || '').toLowerCase().includes(q) ||
           (r.organization || '').toLowerCase().includes(q)
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', letterSpacing: '0.04em', margin: 0 }}>Customers</h1>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, company..."
          style={{ padding: '8px 14px', border: '1px solid rgba(200,147,26,0.2)', background: 'var(--navy)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.88rem', outline: 'none', width: 280 }}
        />
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', padding: '2rem 0' }}>Loading...</p>
      ) : (
        <div style={{ border: '1px solid rgba(200,147,26,0.15)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Company', 'Orders', 'Total Spent', 'Joined'].map(h => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ ...td, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>No customers found.</td></tr>
              ) : filtered.map((r, i) => (
                <tr key={r.id} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={td}><strong style={{ color: '#fff' }}>{r.full_name || '—'}</strong></td>
                  <td style={td}>{r.email}</td>
                  <td style={{ ...td, color: 'rgba(255,255,255,0.5)' }}>{r.organization || '—'}</td>
                  <td style={{ ...td, textAlign: 'center' }}>{r.total_orders}</td>
                  <td style={td}>{formatCurrency(r.total_spent)}</td>
                  <td style={{ ...td, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{formatDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.75rem' }}>{filtered.length} customer{filtered.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
