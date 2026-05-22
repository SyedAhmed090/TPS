import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const ABOUT_LINKS = [
  { to: '/about/custom-patch-company', label: 'Custom Patch Company', desc: 'Who we are and what drives us.' },
  { to: '/about/low-minimum-embroidered-patches', label: 'Low Minimum Patches', desc: 'Quality patches starting from just 25 pieces.' },
  { to: '/about/blog', label: 'Blog', desc: 'Tips, guides, and stories from the world of custom patches.' },
  { to: '/about/do-it-yourself', label: 'Do It Yourself', desc: 'Step-by-step guides for applying and caring for your patches.' },
  { to: '/about/faqs', label: 'FAQs', desc: 'Answers to the most common patch questions.' },
  { to: '/about/how-to-order', label: 'How to Order', desc: 'Getting your custom patches is easy — here\'s how.' },
  { to: '/about/testimonials', label: 'Testimonials', desc: 'What our customers say about The Patch Solutions.' },
  { to: '/contact', label: 'Contact Us', desc: 'Get in touch — we\'re here to help.' },
]

const STATS = [
  { num: '20+', label: 'Years in Business' },
  { num: '500K+', label: 'Patches Produced' },
  { num: '10K+', label: 'Happy Customers' },
  { num: '25', label: 'Piece Minimum' },
]

export default function About() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'About' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1>About The Patch Solutions</h1>
          <p>A US-based custom patch company serving military units, businesses, clubs, and individuals since 2005. Quality, service, and craftsmanship — that's TPS.</p>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container">
          <div className="stats-grid reveal">
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--gold)', letterSpacing: '0.04em', lineHeight: 1 }}>{s.num}</div>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="story-grid reveal">
          <div>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Made in America. Worn Worldwide.</h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--gray-mid)', marginBottom: '1.25rem' }}>
              The Patch Solutions was founded in 2005 with a single mission: produce the highest quality custom patches at fair prices, backed by real customer service. Two decades later, that mission hasn't changed.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--gray-mid)', marginBottom: '2rem' }}>
              We serve everyone from individual collectors to US military units to Fortune 500 companies — producing embroidered, woven, PVC, leather, chenille, and specialty patches with the same dedication regardless of order size.
            </p>
            <Link to="/contact" className="btn-primary">Contact Us</Link>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="The Patch Solutions workshop" style={{ borderRadius: 4, width: '100%' }} />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">More About TPS</span>
            <h2 className="section-title">Explore Our Story</h2>
          </div>
          <div className="overview-grid reveal">
            {ABOUT_LINKS.map(l => (
              <Link key={l.to} to={l.to} className="overview-card">
                <h3>{l.label}</h3>
                <p>{l.desc}</p>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: 'auto' }}>READ MORE →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
