import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

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

function StatCard({ icon, value, label, color }) {
  return (
    <div style={{ background: 'var(--navy)', border: '1px solid rgba(200,147,26,0.12)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ fontSize: '2rem', lineHeight: 1 }}>{icon}</div>
      <div>
        <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: color || 'var(--gold)', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{label}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({ newQuotes: 0, openContacts: 0, activeOrders: 0, pendingSamples: 0 })
  const [recentQuotes, setRecentQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const [quotesNew, contacts, orders, samples, recentQ] = await Promise.all([
      supabase.from('quotes').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
      supabase.from('orders').select('id', { count: 'exact', head: true }).in('status', ['in_production', 'pending']),
      supabase.from('sample_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('quotes').select('id, created_at, first_name, last_name, email, patch_type, quantity, status').order('created_at', { ascending: false }).limit(10),
    ])
    setStats({
      newQuotes: quotesNew.count || 0,
      openContacts: contacts.count || 0,
      activeOrders: orders.count || 0,
      pendingSamples: samples.count || 0,
    })
    setRecentQuotes(recentQ.data || [])
    setLoading(false)
  }

  const thStyle = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', borderBottom: '2px solid rgba(200,147,26,0.2)', whiteSpace: 'nowrap' }
  const tdStyle = { padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', margin: 0, letterSpacing: '0.04em' }}>Dashboard</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Overview of recent activity</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <StatCard icon="📋" value={loading ? '—' : stats.newQuotes} label="New Quotes" />
        <StatCard icon="✉️" value={loading ? '—' : stats.openContacts} label="Open Contacts" color="#60a5fa" />
        <StatCard icon="📦" value={loading ? '—' : stats.activeOrders} label="Active Orders" color="#c084fc" />
        <StatCard icon="📬" value={loading ? '—' : stats.pendingSamples} label="Pending Samples" color="#4ade80" />
      </div>

      <div style={{ background: 'var(--navy)', border: '1px solid rgba(200,147,26,0.12)' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(200,147,26,0.12)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Recent Quotes</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Patch Type</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>Loading...</td></tr>
              ) : recentQuotes.length === 0 ? (
                <tr><td colSpan={6} style={{ ...tdStyle, textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '2rem' }}>No quotes yet</td></tr>
              ) : recentQuotes.map((q, i) => (
                <tr key={q.id} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={tdStyle}>{new Date(q.created_at).toLocaleDateString()}</td>
                  <td style={tdStyle}>{q.first_name} {q.last_name}</td>
                  <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.5)' }}>{q.email}</td>
                  <td style={tdStyle}>{q.patch_type}</td>
                  <td style={tdStyle}>{q.quantity}</td>
                  <td style={tdStyle}><StatusBadge status={q.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
