import { Link } from 'react-router-dom'
import logo from '/logo-tps.png'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="The Patch Solutions" />
            </Link>
            <p>Custom patches of every type — designed, produced, and delivered with pride since 2000. Trusted by military units, clubs, teams, and organizations across the United States.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '1rem 0' }}>
              <a href="tel:+18007282437" style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.82rem', letterSpacing: '0.06em', textDecoration: 'none' }}>📞 1-800-PATCHES (1-800-728-2437)</a>
              <a href="mailto:info@thepatchsolutions.com" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.04em', textDecoration: 'none' }}>✉ info@thepatchsolutions.com</a>
            </div>
            <p className="footer-since">© {new Date().getFullYear()} The Patch Solutions · USA</p>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              {[
                { name: 'Embroidered Patches', slug: 'embroidered-patches' },
                { name: 'Woven Patches', slug: 'woven-patches' },
                { name: 'PVC Patches', slug: 'pvc-patches' },
                { name: 'Chenille Patches', slug: 'chenille-patches' },
                { name: 'Leather Patches', slug: 'leather-patches' },
                { name: 'Dye Sublimation', slug: 'dye-sublimation-patches' },
                { name: 'Felt Patches', slug: 'felt-patches' },
                { name: 'Brand Merchandise', slug: 'brand-merchandise' },
              ].map(({ name, slug }) => (
                <li key={name}><Link to={`/products/${slug}`}>{name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about/testimonials">Testimonials</Link></li>
              <li><Link to="/about/faqs">FAQs</Link></li>
              <li><Link to="/about/how-to-order">How to Order</Link></li>
              <li><Link to="/about/artwork-guidelines">Artwork Guidelines</Link></li>
              <li><Link to="/about/usa-manufacturing">USA Manufacturing</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/rush-order">Rush Order</Link></li>
              <li><Link to="/free-quote">Free Quote</Link></li>
              <li><Link to="/request-samples">Free Samples</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/return-policy">Return Policy</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Popular Searches</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { to: '/custom-military-patches', label: 'Custom Military Patches' },
              { to: '/iron-on-patches-bulk', label: 'Iron-On Patches Bulk' },
              { to: '/custom-pvc-patches', label: 'Custom PVC Patches' },
              { to: '/custom-embroidered-patches', label: 'Custom Embroidered Patches' },
              { to: '/motorcycle-club-patches', label: 'Motorcycle Club Patches' },
              { to: '/scout-patches', label: 'Scout Patches' },
              { to: '/rush-order', label: 'Rush Order' },
              { to: '/about/artwork-guidelines', label: 'Artwork Guidelines' },
              { to: '/about/usa-manufacturing', label: 'USA Manufacturing' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', padding: '3px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, textDecoration: 'none', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.target.style.color = 'var(--gold)'; e.target.style.borderColor = 'rgba(200,147,26,0.4)' }}
                onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.55)'; e.target.style.borderColor = 'rgba(255,255,255,0.12)' }}
              >{label}</Link>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>The Patch Solutions · Custom Patches Since 2000 · All Rights Reserved</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/return-policy">Return Policy</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
