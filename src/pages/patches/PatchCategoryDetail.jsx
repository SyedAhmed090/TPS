import { useParams, Link } from 'react-router-dom'
import { PATCH_CATEGORIES } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

export default function PatchCategoryDetail() {
  useReveal()
  const { slug } = useParams()
  const item = PATCH_CATEGORIES.find(c => c.slug === slug)

  if (!item) return (
    <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '1rem' }}>Page Not Found</h2>
      <Link to="/patches/categories" className="btn-primary">Back to Categories</Link>
    </div>
  )

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { href: '/patches/categories', label: 'Categories' },
        { label: item.name },
      ]} />

      <section className="container">
        <div className="detail-layout reveal">
          <div className="detail-img">
            <img src={item.img} alt={item.name} />
          </div>
          <div>
            <span className="detail-label">Patch Category</span>
            <h1 className="detail-title">{item.name}</h1>
            <p className="detail-desc">{item.description}</p>
            <ul className="detail-features">
              {item.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Related Products</span>
          <h2 className="section-title light" style={{ marginBottom: '1rem' }}>Explore All Patch Types</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>We produce {item.name.toLowerCase()} in embroidered, woven, PVC, chenille, leather, and more.</p>
          <Link to="/products" className="btn-primary">View All Products</Link>
        </div>
      </section>
    </>
  )
}
