import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '◆', end: true },
  { to: '/admin/quotes', label: 'Quotes', icon: '📋' },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/contacts', label: 'Contacts', icon: '✉️' },
  { to: '/admin/customers', label: 'Customers', icon: '👤' },
  { to: '/admin/blog', label: 'Blog', icon: '📝' },
  { to: '/admin/discounts', label: 'Discount Codes', icon: '🏷️' },
  { to: '/admin/samples', label: 'Sample Requests', icon: '📬' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

const sidebarStyle = {
  width: 220,
  minWidth: 220,
  background: 'var(--navy)',
  borderRight: '1px solid rgba(200,147,26,0.15)',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}

const navLinkBase = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.65rem 1.2rem',
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  fontFamily: 'var(--font-heading)',
  fontSize: '0.78rem',
  letterSpacing: '0.08em',
  transition: 'background 0.15s, color 0.15s',
  borderLeft: '3px solid transparent',
}

export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [newQuotes, setNewQuotes]       = useState(0)
  const [newContacts, setNewContacts]   = useState(0)
  const [toast, setToast]               = useState(null)

  useEffect(() => {
    fetchCounts()

    const quoteSub = supabase
      .channel('admin-quotes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'quotes' }, payload => {
        setNewQuotes(n => n + 1)
        setToast(`New quote from ${payload.new.name}`)
        setTimeout(() => setToast(null), 5000)
      })
      .subscribe()

    const contactSub = supabase
      .channel('admin-contacts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contacts' }, payload => {
        setNewContacts(n => n + 1)
        setToast(`New message from ${payload.new.name}`)
        setTimeout(() => setToast(null), 5000)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(quoteSub)
      supabase.removeChannel(contactSub)
    }
  }, [])

  useEffect(() => {
    if (pathname === '/admin/quotes')   setNewQuotes(0)
    if (pathname === '/admin/contacts') setNewContacts(0)
  }, [pathname])

  async function fetchCounts() {
    const [{ count: qCount }, { count: cCount }] = await Promise.all([
      supabase.from('quotes').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
    ])
    setNewQuotes(qCount || 0)
    setNewContacts(cCount || 0)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a1628', position: 'relative' }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: 'var(--navy)', border: '1px solid var(--gold)', color: '#fff', padding: '0.75rem 1.25rem', fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.05em', zIndex: 9999, maxWidth: 320, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <span style={{ color: 'var(--gold)', marginRight: 6 }}>◆</span>{toast}
        </div>
      )}
      <aside style={sidebarStyle}>
        <div style={{ padding: '1.5rem 1.2rem 1rem', borderBottom: '1px solid rgba(200,147,26,0.12)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold)', letterSpacing: '0.05em', lineHeight: 1.2 }}>TPS</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>ADMIN PANEL</div>
        </div>
        <nav style={{ flex: 1, paddingTop: '0.75rem' }}>
          {NAV.map(item => {
            const badge = item.to === '/admin/quotes' ? newQuotes : item.to === '/admin/contacts' ? newContacts : 0
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  ...navLinkBase,
                  background: isActive ? 'rgba(200,147,26,0.1)' : 'transparent',
                  color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                  borderLeftColor: isActive ? 'var(--gold)' : 'transparent',
                })}
              >
                <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>{item.icon}</span>
                {item.label}
                {badge > 0 && <span style={{ marginLeft: 'auto', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 10, fontSize: '0.6rem', fontWeight: 700, padding: '1px 6px', lineHeight: 1.4 }}>{badge}</span>}
              </NavLink>
            )
          })}
        </nav>
        <div style={{ padding: '1rem 1.2rem', borderTop: '1px solid rgba(200,147,26,0.12)' }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.email}
          </div>
          <button
            onClick={handleSignOut}
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,147,26,0.2)', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.5rem', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', padding: '2rem', minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  )
}
