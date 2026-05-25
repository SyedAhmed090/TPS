import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const STATUS_CLASS = {
  new: 'new', reviewing: 'reviewing', quoted: 'quoted', approved: 'approved',
  in_production: 'in_production', shipped: 'shipped', completed: 'completed',
  cancelled: 'cancelled', pending: 'pending', paid: 'approved', delivered: 'delivered',
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${STATUS_CLASS[status] || 'pending'}`}>{status?.replace('_', ' ')}</span>
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
}

export default function AccountOverview() {
  const { user } = useAuth()
  const [quotes, setQuotes]   = useState([])
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([
      supabase.from('quotes').select('id,created_at,patch_type,size,quantity,status,estimated_price').eq('auth_user_id', user.id).order('created_at', { ascending: false }).limit(3),
      supabase.from('orders').select('id,created_at,patch_type,size,quantity,status,total_price').eq('auth_user_id', user.id).order('created_at', { ascending: false }).limit(3),
    ]).then(([q, o]) => {
      setQuotes(q.data || [])
      setOrders(o.data || [])
      setLoading(false)
    })
  }, [user])

  const activeOrders    = orders.filter(o => !['delivered','cancelled'].includes(o.status)).length
  const completedOrders = orders.filter(o => o.status === 'delivered').length

  const QUICK = [
    { to: '/free-quote', icon: '📋', label: 'Get a Quote' },
    { to: '/rush-order', icon: '⚡', label: 'Rush Order' },
    { to: '/pricing',    icon: '💰', label: 'View Pricing' },
    { to: '/contact',    icon: '✉️', label: 'Contact Us' },
  ]

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { num: quotes.length, label: 'Total Quotes' },
          { num: activeOrders, label: 'Active Orders' },
          { num: completedOrders, label: 'Completed Orders' },
        ].map(s => (
          <div key={s.label} className="account-stat-card">
            <div className="account-stat-num">{loading ? '—' : s.num}</div>
            <div className="account-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Quotes */}
      <div className="account-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div className="account-section__title" style={{ marginBottom: 0 }}>Recent Quotes</div>
          {quotes.length > 0 && <Link to="/account/quotes" style={{ fontSize: '0.82rem', color: 'var(--gold)', textDecoration: 'none', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>View All →</Link>}
        </div>
        {loading ? [1,2,3].map(i => <div key={i} className="skeleton-row" />) :
         quotes.length === 0 ? (
          <div className="account-empty">
            <div className="account-empty__icon">📋</div>
            <div className="account-empty__text">You haven't requested a quote yet.</div>
            <Link to="/free-quote" className="btn-primary">Get Your First Quote</Link>
          </div>
        ) : quotes.map(q => (
          <div key={q.id} className="quote-row">
            <div style={{ fontSize: '0.78rem', color: 'var(--gray-mid)', minWidth: 80 }}>{formatDate(q.created_at)}</div>
            <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: 600 }}>{q.patch_type} · {q.size} · {q.quantity} pcs</div>
            <StatusBadge status={q.status} />
            {q.estimated_price && <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>${Number(q.estimated_price).toFixed(2)}</div>}
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="account-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div className="account-section__title" style={{ marginBottom: 0 }}>Recent Orders</div>
          {orders.length > 0 && <Link to="/account/orders" style={{ fontSize: '0.82rem', color: 'var(--gold)', textDecoration: 'none', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>View All →</Link>}
        </div>
        {loading ? [1,2,3].map(i => <div key={i} className="skeleton-row" />) :
         orders.length === 0 ? (
          <div className="account-empty">
            <div className="account-empty__icon">📦</div>
            <div className="account-empty__text">No orders yet.</div>
          </div>
        ) : orders.map(o => (
          <div key={o.id} className="order-row">
            <div style={{ fontSize: '0.78rem', color: 'var(--gray-mid)', minWidth: 80 }}>{formatDate(o.created_at)}</div>
            <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: 600 }}>{o.patch_type} · {o.size} · {o.quantity} pcs</div>
            <StatusBadge status={o.status} />
            {o.total_price && <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>${Number(o.total_price).toFixed(2)}</div>}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="account-section">
        <div className="account-section__title">Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {QUICK.map(q => (
            <Link key={q.to} to={q.to} style={{ background: 'var(--white)', border: '1px solid rgba(11,26,46,0.08)', padding: '1.1rem', textAlign: 'center', textDecoration: 'none', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(11,26,46,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{q.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)' }}>{q.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
