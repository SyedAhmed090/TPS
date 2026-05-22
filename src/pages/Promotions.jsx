import { Link } from 'react-router-dom'
import { PROMOTIONS } from '../data/siteData'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'

export default function Promotions() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Promotions' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Special Offers</span>
          <h1>Current Promotions</h1>
          <p>Save on your next custom patch order with our current promotions and volume discounts.</p>
        </div>
      </section>

      <section className="container">
        <div className="promo-grid reveal">
          {PROMOTIONS.map(p => (
            <div key={p.title} className="promo-card">
              <div className="promo-badge">{p.badge}</div>
              <h2 className="promo-title">{p.title}</h2>
              <p className="promo-desc">{p.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span className="promo-expires">Valid: {p.expires}</span>
                <Link to="/contact" className="btn-primary" style={{ fontSize: '0.82rem', padding: '10px 20px' }}>Claim Offer</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="reveal">
            <div>
              <span className="section-label">Volume Savings</span>
              <h2 className="section-title">The More You Order, the More You Save</h2>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.75, marginBottom: '2rem' }}>
                Our tiered pricing means every additional patch you order costs less per unit. From 25 pieces to 10,000+ — every quantity level comes with volume pricing built in.
              </p>
              <Link to="/pricing" className="btn-primary">View Full Pricing</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[{ qty: '25+', save: 'Starting Price' }, { qty: '100+', save: 'Save 20%' }, { qty: '250+', save: 'Save 35%' }, { qty: '500+', save: 'Save 50%' }].map(t => (
                <div key={t.qty} style={{ background: 'var(--white)', padding: '2rem', textAlign: 'center', borderBottom: '3px solid var(--gold)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>{t.qty}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--gold)', textTransform: 'uppercase' }}>{t.save}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Save?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Get a free quote and mention any promotion to apply your savings.</p>
          <Link to="/contact" className="btn-outline-light">Get a Free Quote</Link>
        </div>
      </section>
    </>
  )
}
