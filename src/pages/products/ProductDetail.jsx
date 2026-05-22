import { useParams, Link } from 'react-router-dom'
import { PRODUCTS_DATA } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

export default function ProductDetail() {
  useReveal()
  const { slug } = useParams()
  const item = PRODUCTS_DATA.find(p => p.slug === slug)

  if (!item) return (
    <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '1rem' }}>Product Not Found</h2>
      <Link to="/products" className="btn-primary">Back to Products</Link>
    </div>
  )

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { label: item.name },
      ]} />

      <section className="container">
        <div className="detail-layout reveal">
          <div className="detail-img">
            <img src={item.img} alt={item.name} />
          </div>
          <div>
            <span className="detail-label">Product</span>
            <h1 className="detail-title">{item.name}</h1>
            {item.tagline && <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1rem', letterSpacing: '0.04em' }}>{item.tagline}</p>}
            <p className="detail-desc">{item.description}</p>
            <ul className="detail-features">
              {item.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.5rem' }}>
              {item.startingPrice && (
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: '2px' }}>Starting at</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', letterSpacing: '0.04em' }}>{item.startingPrice}</span>
                </div>
              )}
              {item.turnaround && (
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: '2px' }}>Turnaround</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--navy)', fontWeight: 700 }}>{item.turnaround}</span>
                </div>
              )}
            </div>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Order Process</span>
          <h2 className="section-title light" style={{ marginBottom: '1rem' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginTop: '2.5rem' }}>
            {['Submit Your Design', 'Approve Free Proof', 'Production Begins', 'Fast Delivery'].map((step, i) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--navy)' }}>{i + 1}</div>
                <p style={{ color: 'var(--cream)', fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '0.04em' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Order {item.name}?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Free quotes, free proofs, and guaranteed satisfaction.</p>
          <Link to="/contact" className="btn-outline-light">Request Free Quote</Link>
        </div>
      </section>
    </>
  )
}
