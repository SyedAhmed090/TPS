import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const COVERAGE = [
  {
    pct: '50%',
    label: 'Coverage',
    desc: 'Half of the patch surface is thread. The backing material (usually twill) is visible between design elements. Ideal for simple logos, text, and designs with open backgrounds. Most economical.',
  },
  {
    pct: '75%',
    label: 'Coverage',
    desc: 'Three-quarters thread coverage. More filled-in look while remaining cost-effective. Good for designs with moderate detail.',
  },
  {
    pct: '100%',
    label: 'Coverage',
    desc: 'Fully thread-covered surface — no backing visible. Maximum detail, richest appearance. Best for complex designs and premium applications.',
  },
]

const THREAD_COLORS = [
  { name: 'Navy',         color: '#0B1A2E' },
  { name: 'Gold',         color: '#C8931A' },
  { name: 'Red',          color: '#B52020' },
  { name: 'White',        color: '#FFFFFF' },
  { name: 'Black',        color: '#111111' },
  { name: 'Forest Green', color: '#2D5A27' },
  { name: 'Royal Blue',   color: '#2244AA' },
  { name: 'Silver',       color: '#B0B8C0' },
]

const BACKINGS = [
  { name: 'None (Merrowed Border Only)', desc: 'Sew directly to garment. Traditional look, clean edge.' },
  { name: 'Heat Seal',                   desc: 'Iron-on adhesive. Apply at home with a household iron.' },
  { name: 'Hook & Loop Hard',            desc: 'Hard hook side. Attaches to uniform loop fields and Velcro boards.' },
  { name: 'Hook & Loop Soft',            desc: 'Soft loop side. Use when the receiving surface has hard hook.' },
  { name: 'Self Stick',                  desc: 'Peel-and-apply adhesive. Temporary or smooth surface use.' },
  { name: 'Pin Back',                    desc: 'Metal pin and clasp. For hats, lapels, and non-fabric surfaces.' },
  { name: 'Sew On',                      desc: 'Pre-cut fabric backing. Reinforces the patch for easier sewing.' },
]

const SIZES = ['1"', '1.5"', '2"', '2.5"', '3"', '4"', '5"', '6"', '7"', 'Custom']

const SERVE_ITEMS = [
  { icon: '🎖️', name: 'Military Units' },
  { icon: '🚓', name: 'Law Enforcement' },
  { icon: '🔥', name: 'Fire Departments' },
  { icon: '🏍️', name: 'Motorcycle Clubs' },
  { icon: '⚾', name: 'Sports Teams' },
  { icon: '🏫', name: 'Schools' },
  { icon: '⚜️', name: 'Scout Troops' },
  { icon: '🏢', name: 'Businesses' },
]

const PRICING = [
  { qty: 25,   price: '$4.59',  total: '$114.75' },
  { qty: 50,   price: '$2.36',  total: '$118.00' },
  { qty: 100,  price: '$1.66',  total: '$166.00' },
  { qty: 200,  price: '$1.12',  total: '$224.00' },
  { qty: 500,  price: '$0.87',  total: '$435.00' },
  { qty: 1000, price: '$0.62',  total: '$620.00' },
]

const FAQS = [
  {
    q: 'What\'s the difference between coverage percentages?',
    a: 'Coverage refers to what percentage of the patch surface is covered in thread. 50% leaves some backing visible between elements. 100% means the entire patch surface is thread. More coverage = more thread = higher cost, but richer appearance.',
  },
  {
    q: 'How small can text be on an embroidered patch?',
    a: 'For legible text, we recommend a minimum of 4pt font size. Smaller text can be stitched but may not be clearly readable. For very small text, woven patches may be a better option.',
  },
  {
    q: 'What\'s the minimum order?',
    a: '25 pieces is our minimum for custom embroidered patches. Volume pricing applies automatically at each tier.',
  },
  {
    q: 'How long does production take?',
    a: 'Standard production is 10–14 business days. Rush production (5–7 days) is available for an additional surcharge.',
  },
  {
    q: 'Can I get a sample before the full order?',
    a: 'Yes — we offer free samples. Contact us to request a sample of our work. For custom design approval, we send a digital proof before any production begins.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button
        className={`faq-question${open ? ' faq-question--open' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        {q}
        <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '1.2rem', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div className={`faq-answer${open ? ' faq-answer--open' : ''}`}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function CustomEmbroideredPatches() {
  useReveal()
  useSEO('Custom Embroidered Patches', 'Custom embroidered patches in any size, shape, or design. 50%, 75%, and 100% coverage options. Free quote, free proof, free samples.')

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Custom Embroidered Patches' },
      ]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">The Classic Choice</span>
          <h1>Custom Embroidered Patches — The Gold Standard Since 2000</h1>
          <p>Thread-sewn on quality backing, built to last. Embroidered patches are the most popular choice for uniforms, clubs, teams, and organizations.</p>
        </div>
      </section>

      {/* COVERAGE OPTIONS */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Thread Coverage</span>
            <h2 className="section-title">Coverage Options Explained</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="reveal">
            {COVERAGE.map(c => (
              <div key={c.pct} style={{ background: 'var(--white)', padding: '2.25rem 2rem', textAlign: 'center', borderBottom: '3px solid var(--gold)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.25rem' }}>{c.pct}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '1rem' }}>{c.label}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREAD COLORS */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Colors</span>
            <h2 className="section-title">Thread Colors &amp; Options</h2>
          </div>
          <p style={{ maxWidth: 600, margin: '0 auto 2.5rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.75 }} className="reveal">
            Standard: up to 8 thread colors per patch. Metallic threads (gold, silver, copper) available for premium look. Glow-in-the-dark threads available. Color matching from Pantone/PMS references.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }} className="reveal">
            {THREAD_COLORS.map(tc => (
              <div key={tc.name} style={{ textAlign: 'center', width: 80 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: tc.color,
                  margin: '0 auto 0.5rem',
                  border: tc.color === '#FFFFFF' ? '2px solid rgba(11,26,46,0.15)' : '2px solid rgba(11,26,46,0.08)',
                  boxShadow: '0 2px 8px rgba(11,26,46,0.12)',
                }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gray-mid)' }}>{tc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACKING OPTIONS */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Attachment</span>
            <h2 className="section-title">All Backing Options</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }} className="reveal">
            {BACKINGS.map(b => (
              <div key={b.name} style={{ background: 'var(--white)', padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', marginTop: '0.45rem' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.25rem' }}>{b.name}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }} className="reveal">
            <Link to="/patches/backing-types" style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>View Full Backing Types Guide →</Link>
          </div>
        </div>
      </section>

      {/* SIZE RANGE */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }} className="reveal">
            <span className="section-label">Dimensions</span>
            <h2 className="section-title">Size Range</h2>
          </div>
          <p style={{ maxWidth: 560, margin: '0 auto 2rem', fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.7 }} className="reveal">
            Our embroidered patches are available from 1" to 20"+ in virtually any shape. Standard sizes for reference:
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }} className="reveal">
            {SIZES.map(s => (
              <span key={s} style={{
                display: 'inline-block',
                padding: '0.5rem 1.1rem',
                background: s === 'Custom' ? 'var(--gold)' : 'var(--cream)',
                color: s === 'Custom' ? 'var(--navy)' : 'var(--navy)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                border: '1px solid rgba(11,26,46,0.1)',
              }}>{s}</span>
            ))}
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)' }} className="reveal">
            Use our <Link to="/pricing" style={{ color: 'var(--gold)' }}>Size Visualizer on the pricing page</Link> to see how each size looks on a jacket.
          </p>
        </div>
      </section>

      {/* WHO ORDERS */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal">
            <span className="section-label">Who We Serve</span>
            <h2 className="section-title">Who Orders Embroidered Patches</h2>
          </div>
          <div className="serve-grid reveal">
            {SERVE_ITEMS.map(s => (
              <div key={s.name} className="serve-card">
                <span className="serve-icon">{s.icon}</span>
                <span className="serve-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TABLE */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Pricing</span>
            <h2 className="section-title light">Embroidered Patch Pricing</h2>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto' }} className="reveal">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: 'var(--gold)' }}>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'left', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.82rem' }}>Quantity</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'right', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.82rem' }}>Price per Patch</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'right', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.82rem' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {PRICING.map((row, i) => (
                  <tr key={row.qty} style={{ background: i % 2 === 0 ? 'var(--navy-mid)' : 'rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '0.8rem 1.2rem', color: 'var(--white)', fontWeight: 600 }}>{row.qty}</td>
                    <td style={{ padding: '0.8rem 1.2rem', color: 'var(--gold)', textAlign: 'right', fontWeight: 600 }}>{row.price}</td>
                    <td style={{ padding: '0.8rem 1.2rem', color: 'rgba(255,255,255,0.75)', textAlign: 'right' }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              * 3" embroidered patch, 50% coverage, no backing. Prices vary by size, coverage, and backing. Use our full calculator for your exact estimate.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/pricing/embroidered-patches" style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Full Embroidered Pricing Calculator →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Questions</span>
            <h2 className="section-title">Embroidered Patch FAQ</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }} className="reveal">
            {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Order Custom Embroidered Patches</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Free quote, free design proof, free samples.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/pricing/embroidered-patches" className="btn-outline">View Embroidered Pricing</Link>
          </div>
        </div>
      </section>
    </>
  )
}
