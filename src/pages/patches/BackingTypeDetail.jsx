import { useParams, Link } from 'react-router-dom'
import { BACKING_TYPES } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

export default function BackingTypeDetail() {
  useReveal()
  const { slug } = useParams()
  const item = BACKING_TYPES.find(b => b.slug === slug)

  if (!item) return (
    <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '1rem' }}>Page Not Found</h2>
      <Link to="/patches/backing-types" className="btn-primary">Back to Backing Types</Link>
    </div>
  )

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { href: '/patches/backing-types', label: 'Backing Types' },
        { label: item.name },
      ]} />

      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Backing Type</span>
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
            {item.tip && (
              <div className="detail-tip">
                <strong>Pro Tip</strong>
                {item.tip}
              </div>
            )}
            <Link to="/contact" className="btn-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Get a Free Quote</Link>
          </div>
        </div>
      </section>

      {item.useCases && (
        <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
          <div className="container">
            <h2 className="section-title light" style={{ marginBottom: '2rem' }}>Common Use Cases</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {item.useCases.map(u => (
                <span key={u} style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', fontFamily: 'var(--font-heading)', padding: '8px 20px', letterSpacing: '0.05em', fontSize: '0.9rem' }}>{u}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Order {item.name}?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Get a free quote in minutes — no commitment required.</p>
          <Link to="/contact" className="btn-outline-light">Request Free Quote</Link>
        </div>
      </section>
    </>
  )
}
