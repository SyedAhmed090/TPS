import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

function TPSLogo() {
  return (
    <svg width="46" height="46" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#9A7820" strokeWidth="2.5"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="#9A7820" strokeWidth="1" strokeDasharray="6 5"/>
      <text x="50" y="61" textAnchor="middle" fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight="900" fontSize="38" fill="#FFFFFF" letterSpacing="-1">TPS</text>
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/pricing',  label: 'Pricing' },
  { to: '/about',    label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [location])

  function toggleMenu() {
    setOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : ''
      return !v
    })
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" aria-label="The Patch Solutions Home">
          <TPSLogo />
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">THE PATCH</span>
            <span className="navbar__logo-sub">SOLUTIONS</span>
          </div>
        </Link>

        <ul className={`navbar__links${open ? ' navbar__links--open' : ''}`} role="menu">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to} role="none">
              <NavLink
                to={to}
                end={to === '/'}
                role="menuitem"
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="navbar__cta-mobile">
            <Link to="/contact" className="btn btn--gold">Get a Free Quote</Link>
          </li>
        </ul>

        <div className="navbar__right">
          <a href="tel:+18005551234" className="navbar__phone">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            (800) 555-1234
          </a>
          <Link to="/contact" className="btn btn--gold navbar__cta">Get a Free Quote</Link>
          <button
            className={`navbar__hamburger${open ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}
