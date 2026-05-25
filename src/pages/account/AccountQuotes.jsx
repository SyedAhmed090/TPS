import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const STATUS_CLASS = {
  new: 'new', reviewing: 'reviewing', quoted: 'quoted', approved: 'approved',
  in_production: 'in_production', shipped: 'shipped', completed: 'completed',
  cancelled: 'cancelled',
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${STATUS_CLASS[status] || 'new'}`}>{status?.replace('_', ' ')}</span>
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
}

const QUOTE_STEPS = ['Quote Received', 'Under Review', 'Quote Sent', 'Approved', 'In Production', 'Shipped', 'Delivered']
const STEP_STATUS = { new: 0, reviewing: 1, quoted: 2, approved: 3, in_production: 4, shipped: 5, completed: 6 }

function Stepper({ status }) {
  const current = STEP_STATUS[status] ?? 0
  return (
    <div className="stepper">
      {QUOTE_STEPS.map((label, i) => {
        const done   = i < current
        const active = i === current
        const last   = i === QUOTE_STEPS.length - 1
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

function QuoteModal({ quote, onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>Quote ID</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--navy)' }}>{quote.id.slice(0, 8).toUpperCase()}</div>
        </div>
        <div style={{ marginBottom: '1.2rem' }}><StatusBadge status={quote.status} /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem 1.5rem', marginBottom: '1.2rem' }}>
          {[
            ['Patch Type', quote.patch_type],
            ['Size', quote.size],
            ['Quantity', quote.quantity],
            ['Coverage', quote.coverage],
            ['Backing', quote.backing],
            ['Date', formatDate(quote.created_at)],
            quote.estimated_price && ['Estimated Price', `$${Number(quote.estimated_price).toFixed(2)}`],
          ].filter(Boolean).map(([label, val]) => val && (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>

        {quote.rush_order && <div style={{ background: 'rgba(181,32,32,0.08)', color: 'var(--red)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', padding: '6px 10px', marginBottom: '0.8rem', display: 'inline-block' }}>⚡ RUSH ORDER</div>}
        {quote.special_notes && <div style={{ marginBottom: '1rem' }}><div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>Notes</div><p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>{quote.special_notes}</p></div>}
        {quote.artwork_url && <div style={{ marginBottom: '1rem' }}><a href={quote.artwork_url} target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>View Artwork File →</a></div>}

        <div style={{ borderTop: '1px solid rgba(11,26,46,0.1)', paddingTop: '1.2rem', marginTop: '0.5rem' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>Status Timeline</div>
          <Stepper status={quote.status} />
        </div>
      </div>
    </div>
  )
}

export default function AccountQuotes() {
  const { user } = useAuth()
  const [quotes, setQuotes]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [selected, setSelected] = useState(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const { data, error: err } = await supabase
        .from('quotes')
        .select('*')
        .eq('auth_user_id', user.id)
        .order('created_at', { ascending: false })
      if (err) throw err
      setQuotes(data || [])
    } catch {
      setError("Couldn't load quotes.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user) load() }, [user])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--navy)', letterSpacing: '0.04em' }}>My Quotes</h2>
        <Link to="/free-quote" className="btn-primary" style={{ fontSize: '0.82rem', padding: '8px 18px' }}>New Quote</Link>
      </div>

      {loading && [1,2,3].map(i => <div key={i} className="skeleton-row" />)}

      {error && (
        <div style={{ background: 'rgba(181,32,32,0.06)', border: '1px solid rgba(181,32,32,0.2)', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--red)', fontSize: '0.88rem' }}>{error}</span>
          <button onClick={load} style={{ background: 'none', border: '1px solid var(--red)', color: 'var(--red)', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.1em', padding: '4px 12px', cursor: 'pointer' }}>Retry</button>
        </div>
      )}

      {!loading && !error && quotes.length === 0 && (
        <div className="account-empty">
          <div className="account-empty__icon">📋</div>
          <div className="account-empty__text">No quotes yet.</div>
          <Link to="/free-quote" className="btn-primary">Get Your First Quote</Link>
        </div>
      )}

      {!loading && quotes.map(q => (
        <div key={q.id} className="quote-row" style={{ cursor: 'pointer' }} onClick={() => setSelected(q)}>
          <div style={{ fontSize: '0.78rem', color: 'var(--gray-mid)', minWidth: 90 }}>{formatDate(q.created_at)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)' }}>{q.patch_type}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gray-mid)' }}>{q.size} · {q.quantity} pcs</div>
          </div>
          <StatusBadge status={q.status} />
          {q.estimated_price && <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-heading)', color: 'var(--navy)', fontWeight: 700 }}>${Number(q.estimated_price).toFixed(2)}</div>}
          <button className="btn-outline" style={{ fontSize: '0.72rem', padding: '5px 14px' }} onClick={e => { e.stopPropagation(); setSelected(q) }}>Details</button>
        </div>
      ))}

      {selected && <QuoteModal quote={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
