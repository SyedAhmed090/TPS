import { Link } from 'react-router-dom'
import { PATCH_CATEGORIES } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

export default function PatchCategories() {
  useReveal()
  useSEO('Patch Categories', 'Shop by patch category — iron-on, sew-on, jacket, uniform, merit badge, morale patches, and more.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { label: 'Patch Categories' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Browse by Category</span>
          <h1>Patch Categories</h1>
          <p>From applique to wholesale, iron-on to merit badges — find the perfect patch category for your project.</p>
        </div>
      </section>

      <section className="container reveal">
        <div className="overview-grid">
          {PATCH_CATEGORIES.map(item => (
            <Link key={item.slug} to={`/patches/categories/${item.slug}`} className="overview-card">
              <img src={item.img} alt={item.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2 }} />
              <h3>{item.name}</h3>
              <p>{item.shortDesc}</p>
              <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: 'auto' }}>LEARN MORE →</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Order?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Get a free quote on any patch category — no minimum on quotes.</p>
          <Link to="/contact" className="btn-outline-light">Get a Free Quote</Link>
        </div>
      </section>
    </>
  )
}
