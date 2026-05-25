import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_OPTIONS = ['new', 'reviewing', 'quoted', 'in_production', 'completed', 'cancelled']
const STATUS_COLORS = {
  new: { bg: 'rgba(200,147,26,0.15)', color: 'var(--gold)' },
  reviewing: { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  quoted: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
  in_production: { bg: 'rgba(168,85,247,0.15)', color: '#c084fc' },
  completed: { bg: 'rgba(34,197,94,0.2)', color: '#86efac' },
  cancelled: { bg: 'rgba(239,68,68,0.15)', color: '#f87171' },
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || { bg: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }
  return (
    <span style={{ background: s.bg, color: s.color, padding: '2px 8px', borderRadius: 3, fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {status?.replace(/_/g, ' ')}
    </span>
  )
}

const PAGE_SIZE = 20

export default function Quotes() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [expandedId, setExpandedId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => { setPage(0) }, [search, statusFilter])
  useEffect(() => { fetchData() }, [search, statusFilter, page])

  async function fetchData() {
    setLoading(true)
    let query = supabase.from('quotes').select('*', { count: 'exact' }).order('created_at', { ascending: false })
    if (statusFilter !== 'all') query = query.eq('status', statusFilter)
    if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    query = query.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
    const { data, count } = await query
    setRows(data || [])
    setTotal(count || 0)
    setLoading(false)
  }

  async function updateStatus(id, status) {
    setUpdatingId(id)
    await supabase.from('quotes').update({ status }).eq('id', id)
    setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setUpdatingId(null)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  const thStyle = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', borderBottom: '2px solid rgba(200,147,26,0.2)', whiteSpace: 'nowrap' }
  const tdStyle = { padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', margin: 0, letterSpacing: '0.04em' }}>Quotes</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{total} total quotes</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, background: 'var(--navy)', border: '1px solid rgba(200,147,26,0.2)', color: '#fff', padding: '0.55rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['all', ...STATUS_OPTIONS].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ padding: '0.45rem 0.85rem', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid', cursor: 'pointer', background: statusFilter === s ? 'var(--gold)' : 'transparent', color: statusFilter === s ? 'var(--navy)' : 'rgba(255,255,255,0.5)', borderColor: statusFilter === s ? 'var(--gold)' : 'rgba(255,255,255,0.15)' }}>
              {s === 'all' ? 'All' : s.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--navy)', border: '1px solid rgba(200,147,26,0.12)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Patch Type</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Est. Price</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>Loading...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={8} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>No quotes found</td></tr>
              ) : rows.map((q, i) => (
                <>
                  <tr key={q.id} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent', cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}>
                    <td style={tdStyle}>{new Date(q.created_at).toLocaleDateString()}</td>
                    <td style={tdStyle}>{q.name}</td>
                    <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.5)' }}>{q.email}</td>
                    <td style={tdStyle}>{q.patch_type}</td>
                    <td style={tdStyle}>{q.quantity}</td>
                    <td style={tdStyle}>{q.estimated_price ? `$${q.estimated_price}` : '—'}</td>
                    <td style={tdStyle}><StatusBadge status={q.status} /></td>
                    <td style={tdStyle} onClick={e => e.stopPropagation()}>
                      <select
                        value={q.status || ''}
                        disabled={updatingId === q.id}
                        onChange={e => updateStatus(q.id, e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,147,26,0.2)', color: '#fff', padding: '0.3rem 0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-heading)', cursor: 'pointer', outline: 'none' }}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                      </select>
                    </td>
                  </tr>
                  {expandedId === q.id && (
                    <tr key={`${q.id}-detail`} style={{ background: 'rgba(200,147,26,0.04)' }}>
                      <td colSpan={8} style={{ ...tdStyle, padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                          {[
                            ['Phone', q.phone],
                            ['Company', q.company],
                            ['Size', q.size],
                            ['Colors', q.colors],
                            ['Backing', q.backing_type],
                            ['Artwork', q.has_artwork ? 'Yes' : 'No'],
                          ].map(([label, val]) => val ? (
                            <div key={label}>
                              <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 2 }}>{label}</div>
                              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>{val}</div>
                            </div>
                          ) : null)}
                          {q.message && (
                            <div style={{ gridColumn: '1 / -1' }}>
                              <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 2 }}>Message</div>
                              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>{q.message}</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              style={{ padding: '0.4rem 0.75rem', background: 'transparent', border: '1px solid rgba(200,147,26,0.2)', color: page === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', cursor: page === 0 ? 'not-allowed' : 'pointer' }}>
              Prev
            </button>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.4)' }}>Page {page + 1} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
              style={{ padding: '0.4rem 0.75rem', background: 'transparent', border: '1px solid rgba(200,147,26,0.2)', color: page >= totalPages - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer' }}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
