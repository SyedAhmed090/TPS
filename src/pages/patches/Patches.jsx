import { Link } from 'react-router-dom'
import { BACKING_TYPES, PATCH_CATEGORIES, PATCH_STYLES } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const SECTIONS = [
  {
    title: 'Backing Types',
    desc: 'Choose how your patch attaches — iron-on, sew-on, hook & loop, magnetic, and more.',
    href: '/patches/backing-types',
    items: BACKING_TYPES.slice(0, 4),
  },
  {
    title: 'Patch Categories',
    desc: 'Browse patches by category — applique, iron-on, merit badges, morale patches, and more.',
    href: '/patches/categories',
    items: PATCH_CATEGORIES.slice(0, 4),
  },
  {
    title: 'Patch Styles',
    desc: 'Find patches made for your community — military, biker, sports, school, and more.',
    href: '/patches/styles',
    items: PATCH_STYLES.slice(0, 4),
  },
]

export default function Patches() {
  useReveal()
  useSEO('Custom Patches', 'Browse all custom patch types — embroidered, woven, PVC, chenille, leather, and more. Every shape, size, and backing option.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Patches' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Everything Patches</span>
          <h1>The Complete Patch Resource</h1>
          <p>Explore every patch backing type, category, and style. Whatever you need — we make it.</p>
        </div>
      </section>

      {SECTIONS.map((sec, idx) => (
        <section key={sec.title} style={{ background: idx % 2 === 0 ? 'var(--cream)' : 'var(--white)', padding: '5rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }} className="reveal">
              <div>
                <h2 className="section-title">{sec.title}</h2>
                <p className="section-subtitle">{sec.desc}</p>
              </div>
              <Link to={sec.href} style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', fontSize: '0.85rem', flexShrink: 0, marginLeft: '2rem' }}>VIEW ALL →</Link>
            </div>
            <div className="overview-grid reveal">
              {sec.items.map(item => (
                <Link key={item.slug} to={`${sec.href}/${item.slug}`} className="overview-card">
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 2 }} />
                  <h3>{item.name}</h3>
                  <p>{item.shortDesc}</p>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: 'auto' }}>LEARN MORE →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section style={{ background: 'var(--navy)', padding: '5rem 0' }}>
        <div className="container">
          <div className="cards-grid-3 reveal" style={{ textAlign: 'center' }}>
            {[
              { href: '/patches/patch-borders', label: 'Patch Borders', desc: 'Merrowed, die-cut, hot-cut, and laser-cut borders explained.' },
              { href: '/patches/threads-and-twills', label: 'Threads & Twills', desc: 'Thread types, twill options, and how they affect your patch.' },
              { href: '/patches/threads-and-twills/camo-twill', label: 'Camo Twill', desc: 'Custom patches on camouflage twill backgrounds.' },
            ].map(l => (
              <Link key={l.href} to={l.href} style={{ background: 'rgba(255,255,255,0.05)', padding: '2.5rem 2rem', display: 'block', transition: 'background 0.2s' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.6rem', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>{l.label}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.65 }}>{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
