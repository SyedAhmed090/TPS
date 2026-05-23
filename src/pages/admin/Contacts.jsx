import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_OPTIONS = ['unread', 'read', 'replied']
const STATUS_COLORS = {
  unread: { bg: 'rgba(200,147,26,0.15)', color: 'var(--gold)' },
  read: { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' },
  replied: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || { bg: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }
  return (
    <span style={{ background: s.bg, color: s.color, padding: '2px 8px', borderRadius: 3, fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {status}
    </span>
  )
}

const PAGE_SIZE = 20

export default function Contacts() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [expandedId, setExpandedId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => { setPage(0) }, [statusFilter])
  useEffect(() => { fetchData() }, [statusFilter, page])

  async function fetchData() {
    setLoading(true)
    let query = supabase.from('contacts').select('*', { count: 'exact' }).order('created_at', { ascending: false })
    if (statusFilter !== 'all') query = query.eq('status', statusFilter)
    query = query.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
    const { data, count } = await query
    setRows(data || [])
    setTotal(count || 0)
    setLoading(false)
  }

  async function updateStatus(id, status) {
    setUpdatingId(id)
    await supabase.from('contacts').update({ status }).eq('id', id)
    setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setUpdatingId(null)
  }

  async function markRead(id) {
    const row = rows.find(r => r.id === id)
    if (row?.status === 'unread') await updateStatus(id, 'read')
  }

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id)
    markRead(id)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const thStyle = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', borderBottom: '2px solid rgba(200,147,26,0.2)', whiteSpace: 'nowrap' }
  const tdStyle = { padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', margin: 0, letterSpacing: '0.04em' }}>Contacts</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{total} total messages</p>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['all', ...STATUS_OPTIONS].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: '0.45rem 0.85rem', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid', cursor: 'pointer', background: statusFilter === s ? 'var(--gold)' : 'transparent', color: statusFilter === s ? 'var(--navy)' : 'rgba(255,255,255,0.5)', borderColor: statusFilter === s ? 'var(--gold)' : 'rgba(255,255,255,0.15)' }}>
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--navy)', border: '1px solid rgba(200,147,26,0.12)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>Loading...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={7} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>No contacts found</td></tr>
              ) : rows.map((c, i) => (
                <>
                  <tr key={c.id}
                    style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent', cursor: 'pointer', fontWeight: c.status === 'unread' ? 600 : 400 }}
                    onClick={() => toggleExpand(c.id)}>
                    <td style={tdStyle}>{new Date(c.created_at).toLocaleDateString()}</td>
                    <td style={tdStyle}>{c.name || `${c.first_name || ''} ${c.last_name || ''}`.trim()}</td>
                    <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.5)' }}>{c.email}</td>
                    <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.5)' }}>{c.phone || '—'}</td>
                    <td style={tdStyle}>{c.subject || '—'}</td>
                    <td style={tdStyle}><StatusBadge status={c.status} /></td>
                    <td style={tdStyle} onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {c.status !== 'replied' && (
                          <button onClick={() => updateStatus(c.id, 'replied')} disabled={updatingId === c.id}
                            style={{ padding: '0.3rem 0.6rem', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
                            Mark Replied
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedId === c.id && (
                    <tr key={`${c.id}-msg`} style={{ background: 'rgba(200,147,26,0.04)' }}>
                      <td colSpan={7} style={{ ...tdStyle, padding: '1rem 1.25rem' }}>
                        <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Message</div>
                        <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{c.message}</div>
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
