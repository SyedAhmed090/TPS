import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

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

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a1628' }}>
      <aside style={sidebarStyle}>
        <div style={{ padding: '1.5rem 1.2rem 1rem', borderBottom: '1px solid rgba(200,147,26,0.12)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--gold)', letterSpacing: '0.05em', lineHeight: 1.2 }}>TPS</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>ADMIN PANEL</div>
        </div>
        <nav style={{ flex: 1, paddingTop: '0.75rem' }}>
          {NAV.map(item => (
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
            </NavLink>
          ))}
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
