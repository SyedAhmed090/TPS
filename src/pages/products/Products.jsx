import { Link } from 'react-router-dom'
import { PRODUCTS_DATA } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

export default function Products() {
  useReveal()
  useSEO('Products', 'All custom patch products from The Patch Solutions — embroidered, woven, PVC, leather, chenille, dye sublimation, and more.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Products' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">What We Make</span>
          <h1>All Patch Products</h1>
          <p>From classic embroidered patches to 3D PVC, leather, chenille, and beyond — we produce every patch type imaginable.</p>
        </div>
      </section>

      <section className="container reveal">
        <div className="overview-grid">
          {PRODUCTS_DATA.map(item => (
            <Link key={item.slug} to={`/products/${item.slug}`} className="overview-card">
              <img src={item.img} alt={item.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2 }} />
              <h3>{item.name}</h3>
              <p>{item.shortDesc}</p>
              {item.startingPrice && (
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '0.06em' }}>From {item.startingPrice}</span>
              )}
              <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: 'auto' }}>LEARN MORE →</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '5rem 0' }}>
        <div className="container">
          <div className="split-grid">
            <div className="reveal">
              <span className="section-label">Why TPS</span>
              <h2 className="section-title light">Quality You Can Count On</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '2rem' }}>
                Every patch we produce goes through our strict quality control process — accurate colors, clean stitching, and consistent results across every run, large or small.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Free digital proof on every order', '25-piece minimum — no huge commitments', '10–14 day standard turnaround', '100% satisfaction guarantee'].map(i => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', color: 'var(--cream)', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" style={{ textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: 4 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--gold)', letterSpacing: '0.04em', lineHeight: 1 }}>20+</div>
                <p style={{ color: 'var(--cream)', fontFamily: 'var(--font-heading)', marginTop: '0.5rem', letterSpacing: '0.08em' }}>YEARS OF EXPERIENCE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Get a Free Quote Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>No commitment. Free proof. Fast turnaround.</p>
          <Link to="/contact" className="btn-outline-light">Request Free Quote</Link>
        </div>
      </section>
    </>
  )
}
