import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const PRICING_TABLE = [
  { size: '1" – 2"', q25: '$3.50', q50: '$2.80', q100: '$2.20', q250: '$1.75', q500: '$1.40' },
  { size: '2" – 3"', q25: '$4.00', q50: '$3.20', q100: '$2.50', q250: '$2.00', q500: '$1.60' },
  { size: '3" – 4"', q25: '$4.75', q50: '$3.80', q100: '$2.95', q250: '$2.35', q500: '$1.90' },
  { size: '4" – 5"', q25: '$5.50', q50: '$4.40', q100: '$3.45', q250: '$2.75', q500: '$2.20' },
  { size: '5" – 6"', q25: '$6.50', q50: '$5.20', q100: '$4.05', q250: '$3.25', q500: '$2.60' },
  { size: '6" – 8"', q25: '$8.00', q50: '$6.40', q100: '$5.00', q250: '$4.00', q500: '$3.20' },
  { size: '8" – 10"', q25: '$10.50', q50: '$8.40', q100: '$6.55', q250: '$5.25', q500: '$4.20' },
  { size: '10" – 12"', q25: '$14.00', q50: '$11.20', q100: '$8.75', q250: '$7.00', q500: '$5.60' },
]

const INCLUDES = [
  'Up to 8 thread colors per design',
  'Free full-color digital proof',
  'Merrowed border standard',
  'Iron-on or sew-on backing',
  'Quality inspection before shipping',
  '100% satisfaction guarantee',
]

export default function EmbroideredPricing() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/pricing', label: 'Pricing' },
        { label: 'Embroidered Patches' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Pricing</span>
          <h1>Embroidered Patch Pricing</h1>
          <p>Transparent, volume-based pricing for custom embroidered patches. The more you order, the lower the per-unit cost.</p>
        </div>
      </section>

      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
          <span className="section-label">Price Per Patch</span>
          <h2 className="section-title">Embroidered Patch Price Chart</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>Prices listed per patch based on size and quantity. Prices include standard features listed below.</p>
        </div>

        <div style={{ overflowX: 'auto' }} className="reveal">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>25 pcs</th>
                <th>50 pcs</th>
                <th>100 pcs</th>
                <th>250 pcs</th>
                <th>500 pcs</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_TABLE.map(row => (
                <tr key={row.size}>
                  <td style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', fontWeight: 700 }}>{row.size}</td>
                  <td>{row.q25}</td>
                  <td>{row.q50}</td>
                  <td style={{ color: 'var(--gold)', fontWeight: 600 }}>{row.q100}</td>
                  <td>{row.q250}</td>
                  <td>{row.q500}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--gray-mid)', marginTop: '1rem' }}>* For 1000+ pieces, contact us for custom volume pricing. Prices are estimates — exact quote provided with your proof.</p>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="reveal">
            <div>
              <span className="section-label">What's Included</span>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Standard Features</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {INCLUDES.map(i => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--navy)', padding: '3rem 2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '1rem' }}>Surcharges</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  '9–15 thread colors: +$0.25 per patch',
                  'Rush production (5–7 days): +$0.50–$1.50 per patch',
                  'Hook & loop backing: +$0.40 per patch',
                  'Magnetic backing: +$0.60 per patch',
                  'Die-cut or laser-cut border: +$0.30 per patch',
                ].map(s => (
                  <li key={s} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>+</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Get Your Exact Price</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Submit your design details for a precise quote — free, no commitment.</p>
          <Link to="/contact" className="btn-outline-light">Request Free Quote</Link>
        </div>
      </section>
    </>
  )
}
