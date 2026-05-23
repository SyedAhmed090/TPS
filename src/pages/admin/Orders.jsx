import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_OPTIONS = ['pending', 'in_production', 'shipped', 'delivered', 'cancelled']
const STATUS_COLORS = {
  pending: { bg: 'rgba(200,147,26,0.15)', color: 'var(--gold)' },
  in_production: { bg: 'rgba(168,85,247,0.15)', color: '#c084fc' },
  shipped: { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  delivered: { bg: 'rgba(34,197,94,0.2)', color: '#86efac' },
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

export default function Orders() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [updatingId, setUpdatingId] = useState(null)
  const [trackingEdit, setTrackingEdit] = useState({})

  useEffect(() => { setPage(0) }, [search, statusFilter])
  useEffect(() => { fetchData() }, [search, statusFilter, page])

  async function fetchData() {
    setLoading(true)
    let query = supabase.from('orders').select('*', { count: 'exact' }).order('created_at', { ascending: false })
    if (statusFilter !== 'all') query = query.eq('status', statusFilter)
    if (search) query = query.or(`customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,order_number.ilike.%${search}%`)
    query = query.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
    const { data, count } = await query
    setRows(data || [])
    setTotal(count || 0)
    setLoading(false)
  }

  async function updateStatus(id, status) {
    setUpdatingId(id)
    await supabase.from('orders').update({ status }).eq('id', id)
    setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setUpdatingId(null)
  }

  async function saveTracking(id) {
    const tracking = trackingEdit[id]
    if (tracking === undefined) return
    await supabase.from('orders').update({ tracking_number: tracking }).eq('id', id)
    setRows(prev => prev.map(r => r.id === id ? { ...r, tracking_number: tracking } : r))
    setTrackingEdit(prev => { const n = { ...prev }; delete n[id]; return n })
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const thStyle = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', borderBottom: '2px solid rgba(200,147,26,0.2)', whiteSpace: 'nowrap' }
  const tdStyle = { padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', margin: 0, letterSpacing: '0.04em' }}>Orders</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{total} total orders</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name, email, or order #..."
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
                <th style={thStyle}>Order #</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Patch Type</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Tracking</th>
                <th style={thStyle}>Update</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>Loading...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={9} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>No orders found</td></tr>
              ) : rows.map((o, i) => (
                <tr key={o.id} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ ...tdStyle, fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--gold)' }}>{o.order_number || `#${o.id?.slice(0, 8)}`}</td>
                  <td style={tdStyle}>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    <div>{o.customer_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{o.customer_email}</div>
                  </td>
                  <td style={tdStyle}>{o.patch_type}</td>
                  <td style={tdStyle}>{o.quantity}</td>
                  <td style={tdStyle}>{o.total ? `$${Number(o.total).toFixed(2)}` : '—'}</td>
                  <td style={tdStyle}><StatusBadge status={o.status} /></td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={trackingEdit[o.id] !== undefined ? trackingEdit[o.id] : (o.tracking_number || '')}
                        onChange={e => setTrackingEdit(prev => ({ ...prev, [o.id]: e.target.value }))}
                        placeholder="Tracking #"
                        style={{ width: 110, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,147,26,0.2)', color: '#fff', padding: '0.3rem 0.5rem', fontSize: '0.75rem', outline: 'none' }}
                      />
                      {trackingEdit[o.id] !== undefined && (
                        <button onClick={() => saveTracking(o.id)}
                          style={{ padding: '0.3rem 0.5rem', background: 'var(--gold)', border: 'none', color: 'var(--navy)', fontFamily: 'var(--font-heading)', fontSize: '0.6rem', cursor: 'pointer' }}>
                          Save
                        </button>
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={o.status || ''}
                      disabled={updatingId === o.id}
                      onChange={e => updateStatus(o.id, e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,147,26,0.2)', color: '#fff', padding: '0.3rem 0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-heading)', cursor: 'pointer', outline: 'none' }}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                    </select>
                  </td>
                </tr>
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
