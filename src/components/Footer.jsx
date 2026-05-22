import { Link } from 'react-router-dom'
import logo from '/logo.jpg'

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
              <li><Link to="/about">Testimonials</Link></li>
              <li><Link to="/about">FAQs</Link></li>
              <li><Link to="/about">How to Order</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Free Quote</Link></li>
              <li><Link to="/contact">Free Samples</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>The Patch Solutions · Custom Patches Since 2000 · All Rights Reserved</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Return Policy</a>
            <a href="#">Resources</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
