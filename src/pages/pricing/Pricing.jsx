import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const FACTORS = [
  { title: 'Patch Type', desc: 'Embroidered patches are most economical. PVC, leather, and bullion crests command higher prices due to materials and production complexity.' },
  { title: 'Size', desc: 'Larger patches require more material and stitching. Price increases with size, most notably at 3", 4", and 6" thresholds.' },
  { title: 'Quantity', desc: 'Volume discounts apply at 100, 250, 500, and 1000+ pieces. Significant per-unit savings at higher quantities.' },
  { title: 'Thread Colors', desc: 'Most pricing includes up to 8–10 thread colors per design. Complex multi-color designs may have a small surcharge.' },
  { title: 'Backing Type', desc: 'Iron-on and sew-on backings are included. Hook & loop (Velcro), magnetic, and pin-back backings have a small per-piece premium.' },
  { title: 'Turnaround', desc: 'Standard 10–14 day turnaround is included. Rush production (5–7 days) carries a surcharge based on order size.' },
]

const PRODUCT_PRICING = [
  { name: 'Embroidered Patches', from: '$1.75', detail: '/pricing/embroidered-patches' },
  { name: 'Woven Patches', from: '$1.90', detail: null },
  { name: 'Dye Sublimation', from: '$2.10', detail: null },
  { name: 'Felt Patches', from: '$1.60', detail: null },
  { name: 'PVC Patches', from: '$2.50', detail: null },
  { name: 'Leather Patches', from: '$3.50', detail: null },
  { name: 'Chenille Patches', from: '$4.00', detail: null },
  { name: 'Blank Patches', from: '$0.85', detail: null },
  { name: 'Bullion Crest Patches', from: '$12.00', detail: null },
  { name: 'Combination Patches', from: '$4.50', detail: null },
  { name: 'PVC Patch Keychains', from: '$3.00', detail: null },
  { name: 'Custom Patch Keychains', from: '$2.75', detail: null },
]

export default function Pricing() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Pricing' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Transparent Pricing</span>
          <h1>Patch Pricing</h1>
          <p>Fair, transparent pricing with no hidden fees. The more you order, the more you save — and quality never changes based on quantity.</p>
        </div>
      </section>

      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
          <span className="section-label">Starting Prices</span>
          <h2 className="section-title">Price by Product Type</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>Starting prices per patch for orders of 100 pieces. Volume discounts available.</p>
        </div>

        <div style={{ overflowX: 'auto' }} className="reveal">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Starting Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_PRICING.map(p => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', fontSize: '1.05rem' }}>{p.from} each</td>
                  <td>
                    {p.detail
                      ? <Link to={p.detail} style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>VIEW PRICING →</Link>
                      : <Link to="/contact" style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>GET QUOTE →</Link>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--gray-mid)', marginTop: '1rem', textAlign: 'right' }}>* Prices based on 100-piece orders. Volume discounts available at 250, 500, and 1000+ pieces.</p>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">What Affects the Price</span>
            <h2 className="section-title">Pricing Factors</h2>
          </div>
          <div className="pricing-factors reveal">
            {FACTORS.map(f => (
              <div key={f.title} className="pricing-factor-card">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">No Surprises</span>
          <h2 className="section-title light" style={{ marginBottom: '1rem' }}>What's Always Included</h2>
          <div className="included-grid reveal">
            {['Free Digital Proof', 'Free Digitizing', 'Quality Inspection', 'Satisfaction Guarantee'].map(i => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem 1.5rem', borderTop: '2px solid var(--gold)' }}>
                <div style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>✓</div>
                <p style={{ color: 'var(--cream)', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', letterSpacing: '0.04em' }}>{i}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn-primary">Get Your Custom Quote</Link>
        </div>
      </section>
    </>
  )
}
