import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const THREAD_TYPES = [
  { name: 'Rayon Thread', desc: 'The most common embroidery thread — smooth, lustrous sheen with vibrant color. Rayon is the standard for most embroidered patches.' },
  { name: 'Polyester Thread', desc: 'Slightly less lustrous than rayon but more color-fast and resistant to bleaching. Recommended for outdoor or heavy-wash applications.' },
  { name: 'Metallic Thread', desc: 'Gold, silver, copper, and holographic metallic threads add premium flash. Best used as accents rather than full coverage due to stiffness.' },
  { name: 'Glow-in-the-Dark Thread', desc: 'Phosphorescent thread that glows under UV light and in the dark. Popular for safety patches, novelty designs, and special effects.' },
  { name: 'Reflective Thread', desc: 'Highly reflective thread that catches direct light — used for safety and visibility applications on uniforms and gear.' },
]

const TWILL_TYPES = [
  { name: 'Standard Twill', desc: 'White or off-white woven polyester twill — the default base for most embroidered patches. Accepts any embroidery color with full coverage.' },
  { name: 'Colored Twill', desc: 'Pre-dyed twill in custom colors for use as the patch background. Lets the twill color show through in unembroidered areas for a distinctive look.' },
  { name: 'Camo Twill', desc: 'Camouflage-patterned twill backgrounds for military, tactical, and outdoor patches. Available in woodland, desert, ACU, and custom patterns.', link: '/patches/threads-and-twills/camo-twill' },
  { name: 'Felt Base', desc: 'Thick wool or acrylic felt replaces twill for chenille, letter, and traditional school patches. Adds structure and a soft feel.' },
]

export default function ThreadsAndTwills() {
  useReveal()
  useSEO('Threads & Twills', 'Explore embroidery thread and twill backing options for your custom patches — colors, textures, and specialty options.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { label: 'Threads & Twills' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Materials</span>
          <h1>Threads &amp; Twills</h1>
          <p>The materials inside your patch determine its look, feel, and durability. Learn about thread types and base fabrics to make the right choice for your project.</p>
        </div>
      </section>

      <section className="container">
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Thread Types</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>Different thread types create different visual effects and performance characteristics.</p>
          <div className="card-grid-3">
            {THREAD_TYPES.map(t => (
              <div key={t.name} style={{ background: 'var(--white)', padding: '2rem', borderTop: '3px solid var(--gold)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>{t.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Base Fabrics (Twills)</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>The twill is the woven fabric base that embroidery stitches are sewn into.</p>
          <div className="card-grid-2">
            {TWILL_TYPES.map(t => (
              <div key={t.name} style={{ background: 'var(--white)', padding: '2rem', borderLeft: '4px solid var(--navy)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>{t.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.7, marginBottom: t.link ? '1rem' : 0 }}>{t.desc}</p>
                {t.link && <Link to={t.link} style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>LEARN MORE →</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Questions About Materials?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Our patch experts will help you select the right thread and twill combination for your design.</p>
          <Link to="/contact" className="btn-primary">Ask an Expert</Link>
        </div>
      </section>
    </>
  )
}
