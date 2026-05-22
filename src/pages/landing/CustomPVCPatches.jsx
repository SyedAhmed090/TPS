import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const FEATURES = [
  {
    icon: '💧',
    title: 'Fully Waterproof',
    desc: 'Unlike embroidered patches, PVC patches are completely waterproof. Rain, sweat, submersion — nothing affects the color or integrity.',
  },
  {
    icon: '🎨',
    title: 'Full Color',
    desc: 'No thread count limitations. PVC patches support any number of colors, gradients, and photographic detail. Your design is limited only by your imagination.',
  },
  {
    icon: '📐',
    title: '3D Detail',
    desc: 'PVC is molded in layers, creating dimensional depth that embroidery can\'t replicate. Raised elements, recessed areas, and fine detail stand out.',
  },
  {
    icon: '🏋️',
    title: 'Durability',
    desc: 'Soft but tough. PVC patches don\'t fray, fade, or lose their shape. Rated for outdoor and tactical use in all conditions.',
  },
]

const USES_LEFT = [
  { label: 'Tactical & Military', detail: 'MOLLE gear, plate carriers, backpacks' },
  { label: 'Law Enforcement', detail: 'Uniform patches, K9 patches' },
  { label: 'Outdoor', detail: 'Hiking, camping, hunting gear' },
  { label: 'Motorcycle', detail: 'Vest patches, bag patches' },
]

const USES_RIGHT = [
  { label: 'Corporate Branding', detail: 'Bag patches, uniform branding' },
  { label: 'Sports', detail: 'Team bags, helmets, equipment' },
  { label: 'Promotional', detail: 'Event patches, giveaways' },
  { label: 'Fashion', detail: 'Streetwear, denim, accessories' },
]

const COMPARISON = [
  { feature: 'Waterproof',     pvc: '✓ Yes',       emb: '✗ No',                   wov: '✗ No' },
  { feature: 'Color Options',  pvc: 'Unlimited',    emb: 'Up to 15 thread colors', wov: 'Up to 15 colors' },
  { feature: '3D/Dimensional', pvc: '✓ Yes',        emb: 'Slight',                 wov: '✗ Flat' },
  { feature: 'Texture',        pvc: 'Rubber/soft',  emb: 'Thread texture',         wov: 'Flat/smooth' },
  { feature: 'Best for',       pvc: 'Tactical, outdoor, bold designs', emb: 'Uniforms, traditional look', wov: 'Fine detail, small text' },
  { feature: 'Durability',     pvc: 'Excellent',    emb: 'Excellent',              wov: 'Very Good' },
  { feature: 'Price point',    pvc: 'Moderate',     emb: 'Moderate',               wov: 'Moderate' },
]

const BACKINGS = [
  {
    name: 'Hook & Loop (Hard Hook)',
    desc: 'Most common for PVC. Attaches to uniform fields and morale patch boards. Standard for tactical use.',
    primary: true,
  },
  {
    name: 'Sew-On',
    desc: 'No backing — sewn directly to the garment or gear for a permanent, clean finish.',
    primary: false,
  },
  {
    name: 'Pin-Back',
    desc: 'Metal pin and clasp. For hats, bags, and non-sewn applications.',
    primary: false,
  },
  {
    name: 'Adhesive Backing',
    desc: 'Self-stick peel-and-apply. For temporary placement or smooth surface application.',
    primary: false,
  },
]

const FAQS = [
  {
    q: 'What\'s the minimum order for PVC patches?',
    a: 'Our minimum is 25 pieces for custom PVC patches. Volume pricing applies from 50, 100, 200 pieces and up.',
  },
  {
    q: 'Can PVC patches go in the washing machine?',
    a: 'Yes. PVC patches are waterproof and can be washed normally. For patches sewn onto garments, machine wash on gentle cycle. For hook & loop backed patches, re-attach before washing.',
  },
  {
    q: 'How many colors can a PVC patch have?',
    a: 'As many as you want. PVC patches use injected color without thread count limitations — full color designs, gradients, and photographic elements are all possible.',
  },
  {
    q: 'What\'s the difference between 2D and 3D PVC patches?',
    a: '2D PVC patches are flat with color variation. 3D PVC patches have raised and recessed elements — creating depth and dimension. We produce both styles.',
  },
  {
    q: 'How do PVC patches attach to MOLLE gear?',
    a: 'Use hook & loop (hard hook) backing — it attaches directly to the loop panels on MOLLE-compatible gear, plate carriers, and backpacks. It\'s the standard for tactical PVC patches.',
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

export default function CustomPVCPatches() {
  useReveal()
  useSEO('Custom PVC Patches', 'Custom 3D PVC rubber patches. Fully waterproof, full color, built for tactical gear and outdoor use. Free quote.')

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Custom PVC Patches' },
      ]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">3D Rubber Patches</span>
          <h1>Custom PVC Patches — 3D Rubber, Built to Last</h1>
          <p>Fully waterproof, vibrant color, dimensional texture — PVC patches are the choice for tactical gear, outdoor apparel, and bold branding.</p>
        </div>
      </section>

      {/* WHAT MAKES PVC DIFFERENT */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Why PVC</span>
            <h2 className="section-title">What Makes PVC Different</h2>
          </div>
          <div className="why-perks reveal">
            {FEATURES.map(f => (
              <div key={f.title} className="perk-card">
                <span className="perk-icon">{f.icon}</span>
                <div className="perk-title">{f.title}</div>
                <p className="perk-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON USES */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Applications</span>
            <h2 className="section-title">Common Uses</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="reveal">
            <div style={{ background: 'var(--white)', padding: '2rem' }}>
              {USES_LEFT.map(u => (
                <div key={u.label} style={{ padding: '0.9rem 0', borderBottom: '1px solid rgba(11,26,46,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.88rem' }}>{u.label}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', textAlign: 'right' }}>{u.detail}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--white)', padding: '2rem' }}>
              {USES_RIGHT.map(u => (
                <div key={u.label} style={{ padding: '0.9rem 0', borderBottom: '1px solid rgba(11,26,46,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.88rem' }}>{u.label}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', textAlign: 'right' }}>{u.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Compare</span>
            <h2 className="section-title light">PVC vs. Embroidered vs. Woven</h2>
          </div>
          <div style={{ overflowX: 'auto' }} className="reveal">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.9rem', minWidth: 560 }}>
              <thead>
                <tr style={{ background: 'var(--gold)' }}>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'left', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.8rem' }}>Feature</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'left', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.8rem' }}>PVC</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'left', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.8rem' }}>Embroidered</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'left', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.8rem' }}>Woven</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} style={{ background: i % 2 === 0 ? 'var(--navy-mid)' : 'rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '0.75rem 1.2rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-heading)', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{row.feature}</td>
                    <td style={{ padding: '0.75rem 1.2rem', color: 'var(--gold)', fontWeight: 600 }}>{row.pvc}</td>
                    <td style={{ padding: '0.75rem 1.2rem', color: 'rgba(255,255,255,0.75)' }}>{row.emb}</td>
                    <td style={{ padding: '0.75rem 1.2rem', color: 'rgba(255,255,255,0.75)' }}>{row.wov}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PVC BACKING OPTIONS */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Attachment</span>
            <h2 className="section-title">PVC Backing Options</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="reveal">
            {BACKINGS.map(b => (
              <div key={b.name} style={{
                background: 'var(--cream)',
                padding: '1.75rem',
                borderLeft: `4px solid ${b.primary ? 'var(--gold)' : 'var(--navy)'}`,
              }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  {b.primary && <span style={{ color: 'var(--gold)', marginRight: '0.4rem' }}>★</span>}{b.name}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Questions</span>
            <h2 className="section-title">PVC Patch FAQ</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }} className="reveal">
            {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Order Custom PVC Patches</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Minimum 25 pieces. Free design proof. Fully waterproof.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/products" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>
    </>
  )
}
