import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const TIERS = [
  { qty: '25–49', label: 'Starter', desc: 'Perfect for small clubs, teams, and personal projects. Same quality, smaller run.' },
  { qty: '50–99', label: 'Small Batch', desc: 'Great for Etsy sellers, small organizations, and test runs before scaling up.' },
  { qty: '100–499', label: 'Standard', desc: 'Most popular range for schools, businesses, military units, and clubs.' },
  { qty: '500+', label: 'Volume', desc: 'Maximum savings with our volume discount pricing. Contact us for a custom quote.' },
]

export default function LowMinimum() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { label: 'Low Minimum Patches' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Accessible Quality</span>
          <h1>Low Minimum Embroidered Patches</h1>
          <p>Professional custom patches starting at just 25 pieces — because every organization deserves access to quality, regardless of size.</p>
        </div>
      </section>

      <section className="container">
        <div className="detail-layout reveal">
          <div className="detail-img">
            <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80" alt="Low Minimum Custom Patches" />
          </div>
          <div>
            <span className="detail-label">Why Low Minimums Matter</span>
            <h2 className="detail-title">Great Patches for Every Order Size</h2>
            <p className="detail-desc">
              Many patch suppliers require hundreds or thousands of pieces to get started. We believe that's wrong. A small motorcycle club, a youth soccer team, an Etsy seller, or a startup brand shouldn't have to overpay or over-order just to get custom patches.
            </p>
            <p className="detail-desc">
              Our low minimum of 25 patches per design gives you the flexibility to order exactly what you need — with the same quality, same process, and same service as our largest customers.
            </p>
            <ul className="detail-features">
              <li>25-piece minimum per design</li>
              <li>No setup fees for standard orders</li>
              <li>Free digital proof on every order</li>
              <li>Same quality as high-volume orders</li>
              <li>Mix designs — minimum applies per design</li>
            </ul>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Pricing Tiers</span>
            <h2 className="section-title">The More You Order, the More You Save</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="reveal">
            {TIERS.map(t => (
              <div key={t.qty} style={{ background: 'var(--white)', padding: '2.5rem 2rem', textAlign: 'center', borderBottom: '3px solid var(--gold)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>{t.qty}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>{t.label}</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Start with Just 25 Patches</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>No huge commitments. No overstock. Just the patches you need.</p>
          <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </>
  )
}
