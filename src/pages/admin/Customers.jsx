import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatDate, formatCurrency } from '../../utils/validation'

const th = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', whiteSpace: 'nowrap' }
const td = { padding: '10px 12px', fontSize: '0.88rem', color: 'var(--text-dark)', borderBottom: '1px solid rgba(11,26,46,0.07)', verticalAlign: 'middle' }

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
    return (r.name || '').toLowerCase().includes(q) ||
           (r.email || '').toLowerCase().includes(q) ||
           (r.company || '').toLowerCase().includes(q)
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.04em', margin: 0 }}>Customers</h1>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, company..."
          style={{ padding: '8px 14px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', outline: 'none', width: 280 }}
        />
      </div>

      {loading ? (
        <p style={{ color: 'var(--gray-mid)', padding: '2rem 0' }}>Loading...</p>
      ) : (
        <div style={{ background: 'var(--white)', border: '1px solid rgba(11,26,46,0.1)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Email', 'Company', 'Orders', 'Total Spent', 'Joined'].map(h => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ ...td, textAlign: 'center', color: 'var(--gray-mid)', padding: '2rem' }}>No customers found.</td></tr>
              ) : filtered.map((r, i) => (
                <tr key={r.id} style={{ background: i % 2 === 1 ? 'var(--cream)' : 'var(--white)' }}>
                  <td style={td}><strong>{r.name || '—'}</strong></td>
                  <td style={td}>{r.email}</td>
                  <td style={td}>{r.company || '—'}</td>
                  <td style={{ ...td, textAlign: 'center' }}>{r.total_orders}</td>
                  <td style={td}>{formatCurrency(r.total_spent)}</td>
                  <td style={{ ...td, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>{formatDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: '0.8rem', color: 'var(--gray-mid)', marginTop: '0.75rem' }}>{filtered.length} customer{filtered.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
