import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const CAMO_PATTERNS = [
  { name: 'Woodland ERDL', desc: 'Classic four-color woodland pattern — the original US military camouflage. Popular for Vietnam-era commemorative and heritage patches.' },
  { name: 'ACU (UCP)', desc: 'US Army Universal Camouflage Pattern — gray-green digital pixel pattern used on contemporary Army uniforms.' },
  { name: 'Multicam / OCP', desc: 'Modern operational camouflage pattern combining green, tan, and brown. Current standard for US Army and SOF patches.' },
  { name: 'Desert Tan', desc: 'Three-color desert pattern for arid environment patches. Used extensively for Gulf War and Middle East theater patches.' },
  { name: 'MARPAT Woodland', desc: 'Marine Corps digital woodland pattern — a digital green camo used on USMC uniform patches.' },
  { name: 'Custom Camo', desc: 'Any camouflage pattern you provide or design. We can reproduce virtually any camo twill for a fully custom background.' },
]

export default function CamoTwill() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { href: '/patches/threads-and-twills', label: 'Threads & Twills' },
        { label: 'Camo Twill' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Specialty Base Fabric</span>
          <h1>Camo Twill Patches</h1>
          <p>Camouflage twill backgrounds for military, tactical, and outdoor patches — in woodland, desert, ACU, Multicam, and custom patterns.</p>
        </div>
      </section>

      <section className="container">
        <div className="detail-layout reveal">
          <div className="detail-img">
            <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80" alt="Camo Twill Patches" />
          </div>
          <div>
            <span className="detail-label">What Is Camo Twill?</span>
            <h2 className="detail-title">Camouflage Background Patches</h2>
            <p className="detail-desc">
              Camo twill patches use a pre-printed or woven camouflage base fabric instead of standard white or colored twill. Your embroidery design is stitched on top of the camo background, with unembroidered areas showing the camo pattern beneath.
            </p>
            <ul className="detail-features">
              <li>All major US military camo patterns available</li>
              <li>Custom camo patterns accepted</li>
              <li>Embroidery stitched directly on camo base</li>
              <li>Popular with military units, hunters, and outdoor brands</li>
              <li>Available with any backing type</li>
              <li>Minimum order: 25 patches</li>
            </ul>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Order Camo Patches</Link>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: '5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Available Camo Patterns</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>We stock or can source the following camouflage twill backgrounds.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {CAMO_PATTERNS.map(p => (
              <div key={p.name} style={{ background: 'var(--white)', padding: '1.75rem', borderLeft: '4px solid var(--gold)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.6rem', letterSpacing: '0.04em' }}>{p.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Order Camo Twill Patches</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Submit your design and tell us your preferred camo pattern. Free proof included.</p>
          <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </>
  )
}
