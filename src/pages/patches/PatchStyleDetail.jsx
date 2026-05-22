import { useParams, Link } from 'react-router-dom'
import { PATCH_STYLES } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

export default function PatchStyleDetail() {
  useReveal()
  const { slug } = useParams()
  const item = PATCH_STYLES.find(s => s.slug === slug)

  if (!item) return (
    <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '1rem' }}>Page Not Found</h2>
      <Link to="/patches/styles" className="btn-primary">Back to Styles</Link>
    </div>
  )

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { href: '/patches/styles', label: 'Patch Styles' },
        { label: item.name },
      ]} />

      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Patch Style</span>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      </section>

      <section className="container">
        <div className="detail-layout reveal">
          <div className="detail-img">
            <img src={item.img} alt={item.name} />
          </div>
          <div>
            <p className="detail-desc">{item.description}</p>
            <ul className="detail-features">
              {item.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/patches/categories" className="btn-secondary">Browse Categories</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Custom {item.name} — Fast &amp; Easy</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Submit your design and get a free proof in 24 hours.</p>
          <Link to="/contact" className="btn-outline-light">Start Your Order</Link>
        </div>
      </section>
    </>
  )
}
