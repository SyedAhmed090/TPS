import { Link } from 'react-router-dom'

function TPSLogoSm() {
  return (
    <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#9A7820" strokeWidth="2.5"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="#9A7820" strokeWidth="1" strokeDasharray="6 5"/>
      <text x="50" y="61" textAnchor="middle" fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight="900" fontSize="38" fill="#FFFFFF" letterSpacing="-1">TPS</text>
    </svg>
  )
}

const QUICK_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/pricing',  label: 'Pricing' },
  { to: '/about',    label: 'About Us' },
  { to: '/contact',  label: 'Contact' },
]

const PRODUCT_LINKS = [
  'Embroidered Patches',
  'Woven Patches',
  'PVC / Rubber Patches',
  'Iron-On Patches',
  'Leather Patches',
  'Chenille Patches',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <TPSLogoSm />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.05rem', color: '#fff', letterSpacing: '0.04em' }}>THE PATCH SOLUTIONS</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 3 }}>Custom Patches. Built to Last.</div>
              </div>
            </div>
            <p>
              Premium custom embroidered and specialty patches for military, sports, organizations, motorcycle clubs, schools, and more. Quality you can feel.
            </p>
            <div className="footer__social">
              {[
                { label: 'Facebook', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/> },
                { label: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                { label: 'Twitter / X', icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/> },
                { label: 'YouTube', icon: <><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></> },
              ].map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="footer__col">
            <h4>Products</h4>
            <ul>
              {PRODUCT_LINKS.map(p => (
                <li key={p}><Link to="/products">{p}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>Contact Us</h4>
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>,
                text: '(800) 555-1234',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
                text: 'info@thepatchsolutions.com',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>,
                text: '123 Patch Ave, Suite 10\nPhiladelphia, PA 19103',
              },
            ].map(({ icon, text }, i) => (
              <div className="footer__contact-item" key={i}>
                <svg width="16" height="16" fill="none" stroke="var(--gold)" strokeWidth="2" viewBox="0 0 24 24">{icon}</svg>
                <span style={{ whiteSpace: 'pre-line' }}>{text}</span>
              </div>
            ))}

            <Link to="/contact" className="btn btn--gold btn--sm" style={{ marginTop: 20 }}>
              Get a Free Quote
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} The Patch Solutions. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
