import { Link } from 'react-router-dom'
import logo from '/logo.png'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="The Patch Solutions" />
            </Link>
            <p>Custom patches of every type — designed, produced, and delivered with pride since 2005. Trusted by military units, clubs, teams, and organizations across the United States.</p>
            <p className="footer-since">© {new Date().getFullYear()} The Patch Solutions · USA</p>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              {['Embroidered Patches','Woven Patches','PVC Patches','Chenille Patches','Leather Patches','Dye Sublimation','Felt Patches','Brand Merchandise'].map(p => (
                <li key={p}><Link to="/products">{p}</Link></li>
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
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Free Quote</Link></li>
              <li><Link to="/contact">Free Samples</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/return-policy">Return Policy</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>The Patch Solutions · Custom Patches Since 2005 · All Rights Reserved</p>
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
