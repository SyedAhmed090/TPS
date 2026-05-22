import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const STEPS = [
  {
    num: '01',
    title: 'Submit Your Request',
    desc: 'Fill out our free quote form or email us your design details — patch type, size, quantity, backing, and any artwork you have. Don\'t have artwork? No problem, our team can help.',
    icon: '📋',
  },
  {
    num: '02',
    title: 'Receive Your Free Proof',
    desc: 'Within 1–2 business days, we\'ll send you a free digital proof showing exactly how your patch will look. Review colors, details, and layout — and request any revisions until it\'s perfect.',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'Approve & Pay',
    desc: 'Once you approve the proof, we\'ll send your invoice. Payment is processed securely, and production begins immediately after confirmation.',
    icon: '✅',
  },
  {
    num: '04',
    title: 'Production & Delivery',
    desc: 'Your patches are produced in our facility over 10–14 business days. We perform quality inspection before shipping. You\'ll receive tracking information as soon as your order ships.',
    icon: '📦',
  },
]

const METHODS = [
  { title: 'Free Quote Form', desc: 'Fill out our online form with your details — fastest way to start.', action: 'Get a Free Quote', href: '/contact' },
  { title: 'Email Us', desc: 'Send your design and specs directly to our team at info@thepatchsolutions.com.', action: 'Contact Us', href: '/contact' },
  { title: 'Phone', desc: 'Prefer to talk? Call us during business hours for immediate assistance.', action: 'Contact Details', href: '/contact' },
]

export default function HowToOrder() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { label: 'How to Order' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Getting Started</span>
          <h1>How to Order Custom Patches</h1>
          <p>Ordering custom patches from TPS is a simple 4-step process. From artwork to delivery in as little as 2 weeks.</p>
        </div>
      </section>

      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="reveal">
          {STEPS.map(s => (
            <div key={s.num} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: 64, height: 64, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)', letterSpacing: '0.04em' }}>{s.num}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.4rem', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Ways to Reach Us</span>
            <h2 className="section-title">How to Get Started</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="reveal">
            {METHODS.map(m => (
              <div key={m.title} style={{ background: 'var(--white)', padding: '2.5rem 2rem', textAlign: 'center', borderTop: '3px solid var(--gold)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>{m.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{m.desc}</p>
                <Link to={m.href} className="btn-primary">{m.action}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="section-title light" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>What You'll Need</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="reveal">
            {[
              { title: 'Your Artwork', items: ['Vector file (AI, EPS, PDF) preferred', 'High-res PNG or JPG accepted', 'Rough sketch or idea — we can help'] },
              { title: 'Order Details', items: ['Patch type (embroidered, PVC, etc.)', 'Approximate size (width × height)', 'Quantity per design'] },
              { title: 'Preferences', items: ['Backing type (iron-on, sew-on, velcro, etc.)', 'Border style (merrowed, die-cut, etc.)', 'Any color specifications (PMS #s)'] },
            ].map(sec => (
              <div key={sec.title}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{sec.title}</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {sec.items.map(i => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span>{i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Start Your Order?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Get a free quote in minutes. No commitment required.</p>
          <Link to="/contact" className="btn-outline-light">Get a Free Quote Now</Link>
        </div>
      </section>
    </>
  )
}
