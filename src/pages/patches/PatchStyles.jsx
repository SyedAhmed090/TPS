import { Link } from 'react-router-dom'
import { PATCH_STYLES } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

export default function PatchStyles() {
  useReveal()
  useSEO('Patch Styles', 'Browse patch styles for military, biker, police, motorcycle clubs, sports teams, schools, and scouts.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { label: 'Patch Styles' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Browse by Style</span>
          <h1>Patch Styles</h1>
          <p>Military, biker, sports, school, police — browse patches by the industry or community they serve.</p>
        </div>
      </section>

      <section className="container reveal">
        <div className="overview-grid">
          {PATCH_STYLES.map(item => (
            <Link key={item.slug} to={`/patches/styles/${item.slug}`} className="overview-card">
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
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Don't See Your Style?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>We make custom patches for every industry and community. Contact us to discuss your specific needs.</p>
          <Link to="/contact" className="btn-primary">Talk to Us</Link>
        </div>
      </section>
    </>
  )
}
