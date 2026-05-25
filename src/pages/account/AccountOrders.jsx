import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const STATUS_CLASS = {
  pending: 'pending', paid: 'approved', in_production: 'in_production',
  quality_check: 'reviewing', shipped: 'shipped', delivered: 'delivered', cancelled: 'cancelled',
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${STATUS_CLASS[status] || 'pending'}`}>{status?.replace('_', ' ')}</span>
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
}

function trackingUrl(carrier, number) {
  if (!number) return null
  const c = (carrier || '').toLowerCase()
  if (c.includes('ups'))   return `https://www.ups.com/track?tracknum=${number}`
  if (c.includes('fedex')) return `https://www.fedex.com/apps/fedtrack/?tracknumbers=${number}`
  if (c.includes('usps'))  return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${number}`
  if (c.includes('dhl'))   return `https://www.dhl.com/en/express/tracking.html?AWB=${number}`
  return `https://www.google.com/search?q=track+${encodeURIComponent(number)}`
}

const ORDER_STEPS = ['Order Placed', 'Payment Confirmed', 'In Production', 'Quality Check', 'Shipped', 'Delivered']
const STEP_STATUS = { pending: 0, paid: 1, in_production: 2, quality_check: 3, shipped: 4, delivered: 5 }

function Stepper({ status }) {
  const current = STEP_STATUS[status] ?? 0
  return (
    <div className="stepper">
      {ORDER_STEPS.map((label, i) => {
        const done   = i < current
        const active = i === current
        const last   = i === ORDER_STEPS.length - 1
        return (
          <div key={label} className={`stepper__step${done ? ' done' : active ? ' active' : ''}`}>
            {!last && <div className="stepper__line" />}
            <div className="stepper__dot" />
            <div className="stepper__label">{label}</div>
          </div>
        )
      })}
    </div>
  )
}

function OrderModal({ order, onClose, onProofApproved }) {
  const [approving, setApproving] = useState(false)
  const [approved, setApproved]   = useState(false)

  async function approveProof() {
    setApproving(true)
    await supabase.from('orders').update({ proof_approved_at: new Date().toISOString() }).eq('id', order.id)
    setApproved(true)
    setApproving(false)
    onProofApproved(order.id)
  }

  const url = trackingUrl(order.carrier, order.tracking_number)
  const canApprove = order.status === 'quality_check' && order.proof_url && !order.proof_approved_at

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>Order ID</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--navy)' }}>{order.id.slice(0, 8).toUpperCase()}</div>
        </div>
        <div style={{ marginBottom: '1.2rem' }}><StatusBadge status={order.status} /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem 1.5rem', marginBottom: '1.2rem' }}>
          {[
            ['Patch Type', order.patch_type],
            ['Size', order.size],
            ['Quantity', order.quantity],
            ['Unit Price', order.unit_price ? `$${Number(order.unit_price).toFixed(2)}` : null],
            ['Total Price', order.total_price ? `$${Number(order.total_price).toFixed(2)}` : null],
            ['Date', formatDate(order.created_at)],
          ].filter(([,v]) => v).map(([label, val]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>

        {order.rush_order && <div style={{ background: 'rgba(181,32,32,0.08)', color: 'var(--red)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', padding: '6px 10px', marginBottom: '0.8rem', display: 'inline-block' }}>⚡ RUSH ORDER</div>}

        {order.tracking_number && (
          <div style={{ marginBottom: '1rem', padding: '0.8rem', background: 'var(--cream)', border: '1px solid rgba(11,26,46,0.08)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>Tracking</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.88rem' }}>{order.tracking_number}</span>
              {order.carrier && <span style={{ fontSize: '0.78rem', color: 'var(--gray-mid)' }}>via {order.carrier}</span>}
              {url && <a href={url} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: '0.72rem', padding: '4px 12px' }}>Track Package →</a>}
            </div>
          </div>
        )}

        {order.proof_url && (
          <div style={{ marginBottom: '1rem' }}>
            <a href={order.proof_url} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: '0.82rem', padding: '7px 16px', display: 'inline-block' }}>View Proof →</a>
          </div>
        )}

        {(canApprove || approved) && (
          <div style={{ background: approved ? 'rgba(22,101,52,0.08)' : 'rgba(200,147,26,0.1)', border: `1px solid ${approved ? 'rgba(22,101,52,0.3)' : 'rgba(200,147,26,0.3)'}`, padding: '1rem', marginBottom: '1rem' }}>
            {approved ? (
              <div style={{ color: '#166534', fontSize: '0.88rem', fontWeight: 600 }}>✓ Proof approved! Production will begin shortly.</div>
            ) : (
              <>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: '0.75rem', fontWeight: 600 }}>Your proof is ready for approval.</div>
                <button className="btn-primary" onClick={approveProof} disabled={approving} style={{ fontSize: '0.85rem', padding: '8px 20px' }}>
                  {approving ? 'Approving…' : 'Approve Proof'}
                </button>
              </>
            )}
          </div>
        )}

        <div style={{ borderTop: '1px solid rgba(11,26,46,0.1)', paddingTop: '1.2rem', marginTop: '0.5rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>Order Timeline</div>
          <Stepper status={order.status} />
        </div>
      </div>
    </div>
  )
}

export default function AccountOrders() {
  const { user } = useAuth()
  const navigate  = useNavigate()
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [selected, setSelected] = useState(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('*')
        .eq('auth_user_id', user.id)
        .order('created_at', { ascending: false })
      if (err) throw err
      setOrders(data || [])
    } catch {
      setError("Couldn't load orders.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user) load() }, [user])

  function handleProofApproved(id) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, proof_approved_at: new Date().toISOString() } : o))
    if (selected?.id === id) setSelected(prev => ({ ...prev, proof_approved_at: new Date().toISOString() }))
  }

  function reorder(order) {
    navigate('/free-quote', { state: { prefill: {
      patch_type: order.patch_type,
      size: order.size,
      quantity: order.quantity,
      backing: order.backing,
      coverage: order.coverage,
      notes: order.internal_notes,
    }}})
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>My Orders</h2>

      {loading && [1,2,3].map(i => <div key={i} className="skeleton-row" />)}

      {error && (
        <div style={{ background: 'rgba(181,32,32,0.06)', border: '1px solid rgba(181,32,32,0.2)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--red)', fontSize: '0.88rem' }}>{error}</span>
          <button onClick={load} style={{ background: 'none', border: '1px solid var(--red)', color: 'var(--red)', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.1em', padding: '4px 12px', cursor: 'pointer' }}>Retry</button>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="account-empty">
          <div className="account-empty__icon">📦</div>
          <div className="account-empty__text">No orders yet.</div>
          <Link to="/free-quote" className="btn-primary">Request a Quote</Link>
        </div>
      )}

      {!loading && orders.map(o => {
        const url = trackingUrl(o.carrier, o.tracking_number)
        const canReorder = ['delivered', 'completed'].includes(o.status)
        return (
          <div key={o.id} className="order-row" style={{ cursor: 'pointer' }} onClick={() => setSelected(o)}>
            <div style={{ fontSize: '0.78rem', color: 'var(--gray-mid)', minWidth: 90 }}>{formatDate(o.created_at)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)' }}>{o.patch_type}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gray-mid)' }}>{o.size} · {o.quantity} pcs</div>
            </div>
            <StatusBadge status={o.status} />
            {o.total_price && <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-heading)', color: 'var(--navy)', fontWeight: 700 }}>${Number(o.total_price).toFixed(2)}</div>}
            {o.tracking_number && url && (
              <a href={url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: '0.72rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textDecoration: 'none' }}>Track →</a>
            )}
            {canReorder && <button className="btn-outline" style={{ fontSize: '0.72rem', padding: '5px 14px' }} onClick={e => { e.stopPropagation(); reorder(o) }}>Reorder</button>}
            <button className="btn-outline" style={{ fontSize: '0.72rem', padding: '5px 14px' }} onClick={e => { e.stopPropagation(); setSelected(o) }}>Details</button>
          </div>
        )
      })}

      {selected && <OrderModal order={selected} onClose={() => setSelected(null)} onProofApproved={handleProofApproved} />}
    </div>
  )
}
