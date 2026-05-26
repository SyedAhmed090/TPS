import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatDate } from '../../utils/validation'

const th = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', whiteSpace: 'nowrap' }
const td = { padding: '10px 12px', fontSize: '0.88rem', color: 'var(--text-dark)', borderBottom: '1px solid rgba(11,26,46,0.07)', verticalAlign: 'middle' }

const STATUS_COLORS = { pending: '#f59e0b', sent: '#22c55e' }

export default function SampleRequests() {
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase.from('sample_requests').select('*').order('created_at', { ascending: false })
    setRows(data || [])
    setLoading(false)
  }

  async function markSent(id) {
    await supabase.from('sample_requests').update({ status: 'sent' }).eq('id', id)
    setRows(prev => prev.map(r => r.id === id ? { ...r, status: 'sent' } : r))
  }

  const filtered = filter === 'all' ? rows : rows.filter(r => r.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.04em', margin: 0 }}>Sample Requests</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all','pending','sent'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '6px 14px', background: filter === s ? 'var(--navy)' : 'transparent', color: filter === s ? '#fff' : 'var(--navy)', border: '1px solid rgba(11,26,46,0.3)', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'capitalize', cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ color: 'var(--gray-mid)', padding: '2rem 0' }}>Loading...</p>
      ) : (
        <div style={{ background: 'var(--white)', border: '1px solid rgba(11,26,46,0.1)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Date','Name','Email','Patch Types','Notes','Status','Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ ...td, textAlign: 'center', color: 'var(--gray-mid)', padding: '2rem' }}>No requests found.</td></tr>
              ) : filtered.map((r, i) => (
                <tr key={r.id} style={{ background: i % 2 === 1 ? 'var(--cream)' : 'var(--white)' }}>
                  <td style={{ ...td, fontSize: '0.8rem', color: 'var(--gray-mid)', whiteSpace: 'nowrap' }}>{formatDate(r.created_at)}</td>
                  <td style={td}><strong>{r.name}</strong>{r.organization && <div style={{ fontSize: '0.75rem', color: 'var(--gray-mid)' }}>{r.organization}</div>}</td>
                  <td style={td}>{r.email}</td>
                  <td style={{ ...td, fontSize: '0.8rem' }}>{(r.patch_interest || r.patch_types || []).join(', ') || '—'}</td>
                  <td style={{ ...td, fontSize: '0.8rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.notes || '—'}</td>
                  <td style={td}>
                    <span style={{ padding: '3px 10px', background: STATUS_COLORS[r.status] || '#94a3b8', color: '#fff', borderRadius: 10, fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textTransform: 'capitalize' }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={td}>
                    {r.status === 'pending' && (
                      <button onClick={() => markSent(r.id)} style={{ padding: '4px 10px', background: 'transparent', color: 'var(--navy)', border: '1px solid rgba(11,26,46,0.3)', fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', cursor: 'pointer' }}>
                        Mark Sent
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: '0.8rem', color: 'var(--gray-mid)', marginTop: '0.75rem' }}>{filtered.length} request{filtered.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
