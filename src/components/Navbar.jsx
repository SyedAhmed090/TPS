import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import logo from '/logo.jpg'

const ABOUT_LINKS = [
  { to: '/about/custom-patch-company', label: 'Custom Patch Company' },
  { to: '/about/low-minimum-embroidered-patches', label: 'Low Minimum Patches' },
  { to: '/about/blog', label: 'Blog' },
  { to: '/design-templates', label: 'Design Templates' },
  { to: '/about/do-it-yourself', label: 'Do It Yourself' },
  { to: '/about/faqs', label: 'FAQs' },
  { to: '/about/how-to-order', label: 'How to Order' },
  { to: '/about/testimonials', label: 'Testimonials' },
  { to: '/about/artwork-guidelines', label: 'Artwork Guidelines' },
  { to: '/about/usa-manufacturing', label: 'USA Manufacturing' },
  { to: '/contact', label: 'Contact Us' },
]

const BACKING_LINKS = [
  { to: '/patches/backing-types/heat-seal-patches', label: 'Heat Seal Patches' },
  { to: '/patches/backing-types/pin-patches', label: 'Pin Patches' },
  { to: '/patches/backing-types/plastic-patches', label: 'Plastic Patches' },
  { to: '/patches/backing-types/self-stick-patches', label: 'Self-Stick Patches' },
  { to: '/patches/backing-types/unbacked-patches', label: 'Unbacked Patches' },
  { to: '/patches/backing-types/hook-loop-patches', label: 'Hook & Loop Patches' },
  { to: '/patches/backing-types/magnetic-patches', label: 'Magnetic Patches' },
]

const CATEGORY_LINKS = [
  { to: '/patches/categories/applique-patches', label: 'Applique Patches' },
  { to: '/patches/categories/clothing-patches', label: 'Clothing Patches' },
  { to: '/patches/categories/custom-patches', label: 'Custom Patches' },
  { to: '/patches/categories/iron-on-patches', label: 'Iron On Patches' },
  { to: '/patches/categories/jacket-patches', label: 'Jacket Patches' },
  { to: '/patches/categories/logo-patches', label: 'Logo Patches' },
  { to: '/patches/categories/merit-badges', label: 'Merit Badges' },
  { to: '/patches/categories/morale-patches', label: 'Morale Patches' },
  { to: '/patches/categories/sew-on-patches', label: 'Sew-On Patches' },
  { to: '/patches/categories/uniform-patches', label: 'Uniform Patches' },
  { to: '/patches/categories/wholesale-patches', label: 'Wholesale Patches' },
]

const STYLE_LINKS = [
  { to: '/patches/styles/military-patches', label: 'Military Patches' },
  { to: '/patches/styles/biker-patches', label: 'Biker Patches' },
  { to: '/patches/styles/police-patches', label: 'Police Patches' },
  { to: '/patches/styles/motorcycle-patches', label: 'Motorcycle Patches' },
  { to: '/patches/styles/sports-patches', label: 'Sports Patches' },
  { to: '/patches/styles/baseball-patches', label: 'Baseball Patches' },
  { to: '/patches/styles/school-patches', label: 'School Patches' },
  { to: '/patches/styles/scout-patches', label: 'Scout Patches' },
]

const PRODUCT_LINKS = [
  { to: '/products/embroidered-patches', label: 'Embroidered Patches' },
  { to: '/products/woven-patches', label: 'Woven Patches' },
  { to: '/products/dye-sublimation-patches', label: 'Dye Sublimation' },
  { to: '/products/felt-patches', label: 'Felt Patches' },
  { to: '/products/pvc-patches', label: 'PVC Patches' },
  { to: '/products/leather-patches', label: 'Leather Patches' },
  { to: '/products/chenille-patches', label: 'Chenille Patches' },
  { to: '/products/blank-patches', label: 'Blank Patches' },
  { to: '/products/bullion-crest-patches', label: 'Bullion Crest Patches' },
  { to: '/products/combination-patches', label: 'Combination Patches' },
  { to: '/products/pvc-patch-keychains', label: 'PVC Patch Keychains' },
  { to: '/products/custom-patch-keychains', label: 'Custom Patch Keychains' },
  { to: '/products/brand-merchandise', label: 'Brand Merchandise' },
]

function ToggleArrow({ open }) {
  return (
    <span className={`navbar__toggle-arrow${open ? ' navbar__toggle-arrow--open' : ''}`}>▾</span>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 })
  const navbarRef   = useRef(null)
  const userMenuRef = useRef(null)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const { user, profile, signOut: authSignOut } = useAuth()

  useEffect(() => {
    function handler(e) {
      const inBtn      = userMenuRef.current?.contains(e.target)
      const inDropdown = dropdownRef.current?.contains(e.target)
      if (!inBtn && !inDropdown) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function getInitials() {
    const name = profile?.full_name
    if (name) {
      const parts = name.trim().split(' ').filter(Boolean)
      if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      return parts[0][0].toUpperCase()
    }
    return (user?.email?.[0] || '?').toUpperCase()
  }

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
    document.body.style.overflow = ''
  }, [location])

  function toggleMenu() {
    setOpen(v => {
      const next = !v
      document.body.style.overflow = next ? 'hidden' : ''
      if (!next) setExpanded(null)
      return next
    })
  }

  function toggleSub(name, e) {
    e.preventDefault()
    e.stopPropagation()
    setExpanded(v => v === name ? null : name)
  }

  function openUserMenu() {
    if (navbarRef.current && userMenuRef.current) {
      const navBottom  = navbarRef.current.getBoundingClientRect().bottom
      const btnRect    = userMenuRef.current.getBoundingClientRect()
      setDropdownPos({ top: navBottom, right: window.innerWidth - btnRect.right })
    }
    setUserMenuOpen(v => !v)
  }

  return (
    <nav className="navbar" ref={navbarRef}>
      <Link to="/" className="navbar__logo" aria-label="The Patch Solutions">
        <img src={logo} alt="The Patch Solutions" />
      </Link>

      <ul className={`navbar__links${open ? ' navbar__links--open' : ''}`}>

        {/* Home */}
        <li className="navbar__item">
          <NavLink to="/" end className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>Home</NavLink>
        </li>

        {/* About */}
        <li className="navbar__item">
          <div className="navbar__item-row">
            <NavLink to="/about" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
              About <span className="navbar__link-arrow">▾</span>
            </NavLink>
            <button className="navbar__toggle-sub" onClick={e => toggleSub('about', e)} aria-label="Toggle About menu">
              <ToggleArrow open={expanded === 'about'} />
            </button>
          </div>
          <div className="navbar__dropdown">
            {ABOUT_LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div className={`navbar__mobile-sub${expanded === 'about' ? ' navbar__mobile-sub--open' : ''}`}>
            {ABOUT_LINKS.map(l => <Link key={l.to} to={l.to} className="navbar__mobile-sub-link">{l.label}</Link>)}
          </div>
        </li>

        {/* Gallery */}
        <li className="navbar__item">
          <NavLink to="/gallery" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>Gallery</NavLink>
        </li>

        {/* Patches — mega menu */}
        <li className="navbar__item">
          <div className="navbar__item-row">
            <NavLink to="/patches" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
              Patches <span className="navbar__link-arrow">▾</span>
            </NavLink>
            <button className="navbar__toggle-sub" onClick={e => toggleSub('patches', e)} aria-label="Toggle Patches menu">
              <ToggleArrow open={expanded === 'patches'} />
            </button>
          </div>
          <div className="navbar__mega">
            <div className="navbar__mega-col">
              <div className="navbar__dropdown-header">Backing Types</div>
              {BACKING_LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
              <Link to="/patches/backing-types" style={{ color: 'var(--gold)', marginTop: 4 }}>View All →</Link>
            </div>
            <div className="navbar__mega-col">
              <div className="navbar__dropdown-header">Patch Categories</div>
              {CATEGORY_LINKS.slice(0, 8).map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
              <Link to="/patches/categories" style={{ color: 'var(--gold)', marginTop: 4 }}>View All →</Link>
            </div>
            <div className="navbar__mega-col">
              <div className="navbar__dropdown-header">Patch Styles</div>
              {STYLE_LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
              <Link to="/patches/styles" style={{ color: 'var(--gold)', marginTop: 4 }}>View All →</Link>
            </div>
            <div className="navbar__mega-col">
              <div className="navbar__dropdown-header">More</div>
              <Link to="/patches/patch-borders">Patch Borders</Link>
              <Link to="/patches/threads-and-twills">Threads &amp; Twills</Link>
              <Link to="/patches/threads-and-twills/camo-twill">Camo Twill</Link>
              <div className="navbar__dropdown-header" style={{ marginTop: 12 }}>Browse All</div>
              <Link to="/patches">All Patches</Link>
            </div>
          </div>
          <div className={`navbar__mobile-sub${expanded === 'patches' ? ' navbar__mobile-sub--open' : ''}`}>
            <p className="navbar__mobile-sub-header">Backing Types</p>
            {BACKING_LINKS.map(l => <Link key={l.to} to={l.to} className="navbar__mobile-sub-link">{l.label}</Link>)}
            <p className="navbar__mobile-sub-header">Categories</p>
            {CATEGORY_LINKS.map(l => <Link key={l.to} to={l.to} className="navbar__mobile-sub-link">{l.label}</Link>)}
            <p className="navbar__mobile-sub-header">Styles</p>
            {STYLE_LINKS.map(l => <Link key={l.to} to={l.to} className="navbar__mobile-sub-link">{l.label}</Link>)}
          </div>
        </li>

        {/* Products */}
        <li className="navbar__item">
          <div className="navbar__item-row">
            <NavLink to="/products" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
              Products <span className="navbar__link-arrow">▾</span>
            </NavLink>
            <button className="navbar__toggle-sub" onClick={e => toggleSub('products', e)} aria-label="Toggle Products menu">
              <ToggleArrow open={expanded === 'products'} />
            </button>
          </div>
          <div className="navbar__dropdown" style={{ minWidth: 240 }}>
            {PRODUCT_LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div className={`navbar__mobile-sub${expanded === 'products' ? ' navbar__mobile-sub--open' : ''}`}>
            {PRODUCT_LINKS.map(l => <Link key={l.to} to={l.to} className="navbar__mobile-sub-link">{l.label}</Link>)}
          </div>
        </li>

        {/* Pricing */}
        <li className="navbar__item">
          <div className="navbar__item-row">
            <NavLink to="/pricing" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
              Pricing <span className="navbar__link-arrow">▾</span>
            </NavLink>
            <button className="navbar__toggle-sub" onClick={e => toggleSub('pricing', e)} aria-label="Toggle Pricing menu">
              <ToggleArrow open={expanded === 'pricing'} />
            </button>
          </div>
          <div className="navbar__dropdown">
            <Link to="/pricing">Pricing Overview</Link>
            <Link to="/pricing/embroidered-patches">Embroidered Patches</Link>
          </div>
          <div className={`navbar__mobile-sub${expanded === 'pricing' ? ' navbar__mobile-sub--open' : ''}`}>
            <Link to="/pricing" className="navbar__mobile-sub-link">Pricing Overview</Link>
            <Link to="/pricing/embroidered-patches" className="navbar__mobile-sub-link">Embroidered Patches</Link>
          </div>
        </li>

        {/* Promotions */}
        <li className="navbar__item">
          <NavLink to="/promotions" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>Promotions</NavLink>
        </li>

        {/* Rush Order */}
        <li className="navbar__item">
          <NavLink to="/rush-order" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`} style={{ color: 'var(--red)' }}>Rush Order</NavLink>
        </li>

        {/* Mobile auth */}
        <li className="navbar__mobile-only" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
          {user ? (
            <>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', padding: '0.4rem 1.5rem', textTransform: 'uppercase' }}>{profile?.full_name || user.email}</div>
              <Link to="/account" onClick={() => setOpen(false)} className="navbar__mobile-sub-link" style={{ display: 'block' }}>My Account</Link>
              <Link to="/account/orders" onClick={() => setOpen(false)} className="navbar__mobile-sub-link" style={{ display: 'block' }}>My Orders</Link>
              <button onClick={async () => { setOpen(false); await authSignOut() }} style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,100,100,0.8)', fontFamily: 'var(--font-heading)', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.55rem 1.5rem', cursor: 'pointer', textAlign: 'left', width: '100%' }}>Sign Out</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="navbar__mobile-sub-link" style={{ display: 'block', color: 'rgba(255,255,255,0.7)' }}>Sign In</Link>
          )}
        </li>

        <li className="navbar__cta-mobile">
          <Link to="/free-quote" className="btn-primary">Free Quote</Link>
        </li>
      </ul>

      {/* Desktop auth */}
      {user ? (
        <div ref={userMenuRef} className="navbar__user-area">
          <button className="navbar__user-btn" onClick={openUserMenu} aria-label="Account menu">
            {getInitials()}
          </button>
          {userMenuOpen && createPortal(
            <div
              ref={dropdownRef}
              className="navbar__user-dropdown"
              style={{ position: 'fixed', top: dropdownPos.top, right: dropdownPos.right }}
            >
              <div className="navbar__user-dropdown__header">
                <div className="navbar__user-dropdown__name">{profile?.full_name || 'My Account'}</div>
                <div className="navbar__user-dropdown__email">{user.email}</div>
              </div>
              <Link to="/account" onClick={() => setUserMenuOpen(false)}>My Account</Link>
              <Link to="/account/orders" onClick={() => setUserMenuOpen(false)}>My Orders</Link>
              <Link to="/account/quotes" onClick={() => setUserMenuOpen(false)}>My Quotes</Link>
              <button className="signout-btn" onClick={async () => { setUserMenuOpen(false); await authSignOut() }}>Sign Out</button>
            </div>,
            document.body
          )}
        </div>
      ) : (
        <Link to="/login" className="navbar__signin-link">Sign In</Link>
      )}

      <Link to="/free-quote" className="navbar__cta">Free Quote</Link>

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
