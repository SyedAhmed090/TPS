import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import useSEO from '../../hooks/useSEO'
import Breadcrumb from '../../components/Breadcrumb'
import { formatDate, formatCurrency, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/validation'

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(11,26,46,0.08)' }}>{title}</h2>
      {children}
    </div>
  )
}

export default function Account() {
  useSEO('My Account', 'View your orders, proofs, and profile.')
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders]     = useState([])
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [profileForm, setProfileForm] = useState({ name: '', company: '', phone: '' })
  const [profileSaved, setProfileSaved] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/account/login'); return }
    loadData()
  }, [user])

  async function loadData() {
    const [custResult, ordersResult] = await Promise.all([
      supabase.from('customers').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('orders').select('*, customers(name,email)').order('created_at', { ascending: false }).limit(20),
    ])
    if (custResult.data) {
      setCustomer(custResult.data)
      setProfileForm({ name: custResult.data.name || '', company: custResult.data.company || '', phone: custResult.data.phone || '' })
    }
    setOrders(ordersResult.data || [])
    setLoading(false)
  }

  async function saveProfile(e) {
    e.preventDefault()
    if (customer) {
      await supabase.from('customers').update({ name: profileForm.name, company: profileForm.company, phone: profileForm.phone }).eq('id', customer.id)
    } else {
      await supabase.from('customers').insert({ user_id: user.id, email: user.email, ...profileForm })
    }
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 5 }

  if (loading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-mid)', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em' }}>Loading...</div>

  return (
    <>
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { label: 'My Account' }]} />
      <section className="page-hero">
        <div className="container">
          <span className="section-label">My Account</span>
          <h1>Welcome{customer?.name ? `, ${customer.name.split(' ')[0]}` : ''}</h1>
          <p>{user.email}</p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <button onClick={handleSignOut} style={{ padding: '8px 18px', background: 'transparent', color: 'var(--navy)', border: '1px solid rgba(11,26,46,0.3)', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.1em', cursor: 'pointer' }}>Sign Out</button>
        </div>

        <Section title="My Orders">
          {orders.length === 0 ? (
            <div style={{ background: 'var(--cream)', padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--gray-mid)', marginBottom: '1rem' }}>You don't have any orders yet.</p>
              <Link to="/free-quote" className="btn-primary" style={{ display: 'inline-block' }}>Get a Free Quote</Link>
            </div>
          ) : (
            <div style={{ background: 'var(--white)', border: '1px solid rgba(11,26,46,0.1)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Order #', 'Date', 'Type', 'Qty', 'Total', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={o.id} style={{ background: i % 2 === 1 ? 'var(--cream)' : 'var(--white)' }}>
                      <td style={{ padding: '10px 12px', fontSize: '0.88rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>{o.order_number}</td>
                      <td style={{ padding: '10px 12px', fontSize: '0.8rem', color: 'var(--gray-mid)' }}>{formatDate(o.created_at)}</td>
                      <td style={{ padding: '10px 12px', fontSize: '0.88rem' }}>{o.patch_type || '—'}</td>
                      <td style={{ padding: '10px 12px', fontSize: '0.88rem', textAlign: 'center' }}>{o.quantity || '—'}</td>
                      <td style={{ padding: '10px 12px', fontSize: '0.88rem' }}>{o.total ? formatCurrency(o.total) : '—'}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ padding: '3px 10px', background: ORDER_STATUS_COLORS[o.status] || '#94a3b8', color: '#fff', borderRadius: 10, fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em', textTransform: 'capitalize' }}>
                          {ORDER_STATUS_LABELS[o.status] || o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        <Section title="My Profile">
          <form onSubmit={saveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 600 }}>
            <div><label style={labelStyle}>Full Name</label><input value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inputStyle} /></div>
            <div><label style={labelStyle}>Company / Organization</label><input value={profileForm.company} onChange={e => setProfileForm(f => ({ ...f, company: e.target.value }))} placeholder="Optional" style={inputStyle} /></div>
            <div><label style={labelStyle}>Phone</label><input value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} placeholder="Optional" style={inputStyle} /></div>
            <div><label style={labelStyle}>Email</label><input value={user.email} disabled style={{ ...inputStyle, background: 'var(--cream)', color: 'var(--gray-mid)' }} /></div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button type="submit" className="btn-primary" style={{ display: 'inline-block', padding: '10px 24px' }}>
                {profileSaved ? 'Saved ✓' : 'Save Profile'}
              </button>
            </div>
          </form>
        </Section>

        <Section title="Quick Links">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-outline" style={{ display: 'inline-block' }}>Get a Free Quote</Link>
            <Link to="/request-samples" className="btn-outline" style={{ display: 'inline-block' }}>Request Samples</Link>
            <Link to="/contact" className="btn-outline" style={{ display: 'inline-block' }}>Contact Us</Link>
          </div>
        </Section>
      </section>
    </>
  )
}
