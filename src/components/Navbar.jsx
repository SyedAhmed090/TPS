import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '/logo.jpg'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/pricing',  label: 'Pricing' },
  { to: '/about',    label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

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
    <nav className="navbar">
      <Link to="/" className="navbar__logo" aria-label="The Patch Solutions">
        <img src={logo} alt="The Patch Solutions" />
      </Link>

      <ul className={`navbar__links${open ? ' navbar__links--open' : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li className="navbar__cta-mobile">
          <Link to="/contact" className="btn-primary">Free Quote</Link>
        </li>
      </ul>

      <Link to="/contact" className="navbar__cta">Free Quote</Link>

      <button
        className="navbar__hamburger"
        onClick={toggleMenu}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span style={open ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
        <span style={open ? { opacity: 0 } : {}} />
        <span style={open ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
      </button>
    </nav>
  )
}
