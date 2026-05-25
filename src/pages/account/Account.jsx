import { NavLink, Outlet } from 'react-router-dom'
import useSEO from '../../hooks/useSEO'
import AccountHeader from './AccountHeader'

const TABS = [
  { to: '/account', label: 'Overview', end: true },
  { to: '/account/quotes', label: 'My Quotes' },
  { to: '/account/orders', label: 'My Orders' },
  { to: '/account/profile', label: 'Profile' },
]

export default function Account() {
  useSEO('My Account', 'View your quotes, orders, and account details.')
  return (
    <>
      <AccountHeader />
      <div className="account-page">
        <div className="container">
          <nav className="account-tabs">
            {TABS.map(t => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) => `account-tab${isActive ? ' active' : ''}`}
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  )
}
