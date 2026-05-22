import { Link } from 'react-router-dom'
import { BACKING_TYPES } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

export default function BackingTypes() {
  useReveal()
  useSEO('Patch Backing Types', 'Explore all patch backing options — heat seal, hook and loop, self-stick, pin, magnetic, and more.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { label: 'Backing Types' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Attachment Options</span>
          <h1>Patch Backing Types</h1>
          <p>Every patch needs a way to attach. Choose from iron-on, sew-on, hook &amp; loop, magnetic, and more — we offer every backing type for every application.</p>
        </div>
      </section>

      <section className="container reveal">
        <div className="overview-grid">
          {BACKING_TYPES.map(item => (
            <Link key={item.slug} to={`/patches/backing-types/${item.slug}`} className="overview-card">
              <img src={item.img} alt={item.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2 }} />
              <h3>{item.name}</h3>
              <p>{item.shortDesc}</p>
              <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: 'auto' }}>LEARN MORE →</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Not Sure Which Backing?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Our team will help you choose the right backing for your application — free consultation.</p>
          <Link to="/contact" className="btn-primary">Get Expert Advice</Link>
        </div>
      </section>
    </>
  )
}
