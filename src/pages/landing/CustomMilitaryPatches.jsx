import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const PERKS = [
  {
    icon: '🎯',
    title: 'Accuracy',
    desc: 'Military patches demand precision. We match rank insignia, branch symbols, and unit crests exactly as specified. Every stitch counts.',
  },
  {
    icon: '🛡️',
    title: 'Durability',
    desc: 'Our patches are built to withstand field conditions — heat, moisture, and constant wear. We use premium materials rated for military use.',
  },
  {
    icon: '🔒',
    title: 'Confidentiality',
    desc: 'Your unit designs and mission patches never leave our facility. We never share, display, or reuse customer artwork without explicit permission.',
  },
  {
    icon: '✅',
    title: 'Compliance',
    desc: 'Our embroidered and PVC patches meet military uniform regulations. We produce to AR 670-1 compatible standards on request.',
  },
]

const PATCH_TYPES = [
  {
    name: 'Embroidered Patches',
    desc: 'The traditional military standard. Thread-sewn on wool/twill backing, available in all coverage options.',
    to: '/products/embroidered-patches',
  },
  {
    name: 'PVC Patches',
    desc: '3D rubber patches for tactical gear, morale patches, and equipment. Fully waterproof.',
    to: '/products/pvc-patches',
  },
  {
    name: 'Woven Patches',
    desc: 'Fine detail for complex insignia with small text. Flat finish, lightweight.',
    to: '/products/woven-patches',
  },
  {
    name: 'Morale Patches',
    desc: 'PVC and embroidered morale patches in any design. Hook & loop backing standard.',
    to: '/patches/styles/military-patches',
  },
  {
    name: 'Rank Insignia',
    desc: 'Chevrons, bars, stars — precise thread work matching official specifications.',
    to: '/contact',
  },
  {
    name: 'Unit Crests',
    desc: 'Custom unit crests in embroidered or bullion crest styles for ceremonial use.',
    to: '/products/bullion-crest-patches',
  },
]

const TURNAROUND = [
  { label: 'Standard', time: '10–14 business days', highlight: false },
  { label: 'Rush', time: '5–7 days', highlight: true },
  { label: 'Super Rush', time: '3–4 days (call ahead)', highlight: false },
]

const GALLERY_IMGS = [
  { src: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?w=600&q=80', alt: 'Military tactical gear' },
  { src: 'https://images.unsplash.com/photo-1580752300992-559f8e0734e0?w=600&q=80', alt: 'Military uniform detail' },
  { src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80', alt: 'Military insignia' },
  { src: 'https://images.unsplash.com/photo-1486702986012-63b6e2d1ad6f?w=600&q=80', alt: 'Tactical equipment' },
]

const FAQS = [
  {
    q: 'Do you make patches for active duty military?',
    a: 'Yes. We produce patches for active duty military, reserves, veterans organizations, and civilian military contractors. For CAC-required orders, we work with procurement officers directly.',
  },
  {
    q: 'Can you match existing military patches exactly?',
    a: 'In most cases, yes. Provide us with a sample or detailed reference and we\'ll match it as closely as possible, including thread colors, size, and border type.',
  },
  {
    q: 'What backing is required for ACU/OCP uniforms?',
    a: 'Hook side Velcro (hard hook) is the standard for ACU/OCP uniforms. Our hook & loop (hard) backing is compatible with standard military uniform loop fields.',
  },
  {
    q: 'Do you offer rush production for deployment deadlines?',
    a: 'Yes. Contact us directly for deployment-deadline orders. We\'ll do everything we can to meet your timeline.',
  },
  {
    q: "Is my unit's design kept confidential?",
    a: 'Absolutely. Your designs are never shared, displayed, or reused. We take operational security seriously.',
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

export default function CustomMilitaryPatches() {
  useReveal()
  useSEO('Custom Military Patches', 'Custom military patches for any branch or unit. Embroidered, PVC, woven, and morale patches with hook & loop backing. Free quote.')

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Custom Military Patches' },
      ]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Built for Service</span>
          <h1>Custom Military Patches — Any Branch, Any Unit</h1>
          <p>From combat uniforms to ceremonial dress — we've produced patches for every branch of the US military, every rank, every mission patch.</p>
        </div>
      </section>

      {/* WHY MILITARY BUYERS CHOOSE TPS */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Why Military Buyers Choose TPS</span>
            <h2 className="section-title">Precision. Durability. Security.</h2>
          </div>
          <div className="why-perks reveal">
            {PERKS.map(p => (
              <div key={p.title} className="perk-card">
                <span className="perk-icon">{p.icon}</span>
                <div className="perk-title">{p.title}</div>
                <p className="perk-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORTED MILITARY PATCH TYPES */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Patch Types</span>
            <h2 className="section-title">Supported Military Patch Types</h2>
          </div>
          <div className="serve-grid reveal">
            {PATCH_TYPES.map(pt => (
              <Link key={pt.name} to={pt.to} className="serve-card" style={{ textAlign: 'left', display: 'block' }}>
                <div className="serve-name" style={{ marginBottom: '0.6rem' }}>{pt.name}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{pt.desc}</p>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>LEARN MORE →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BACKING TYPES FOR MILITARY */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Backing Options</span>
            <h2 className="section-title">Backing Types for Military</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '2rem' }} className="reveal">
            <div style={{ background: 'var(--cream)', padding: '2rem', borderLeft: '4px solid var(--gold)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.75rem' }}>Hook &amp; Loop (Velcro)</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>The most common military patch backing. Hard hook attaches to soft loop fields on uniforms. Interchangeable, removable, and repositionable. Required for many military uniform standards.</p>
            </div>
            <div style={{ background: 'var(--cream)', padding: '2rem', borderLeft: '4px solid var(--navy)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.75rem' }}>Sew-On</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>The original military patch method. Thread-sewn directly to the uniform for permanent attachment. Required for some ceremonial uniforms.</p>
            </div>
          </div>
          <div style={{ background: 'var(--cream)', padding: '1.5rem 2rem', borderRadius: '2px' }} className="reveal">
            <p style={{ fontSize: '0.92rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--navy)' }}>Also available:</strong> Heat Seal (iron-on) and Pin-back backing options for non-uniform uses such as bags, hats, and display boards.
            </p>
          </div>
        </div>
      </section>

      {/* TURNAROUND FOR MILITARY ORDERS */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Production Speed</span>
            <h2 className="section-title light">Turnaround for Military Orders</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }} className="reveal">
            {TURNAROUND.map(t => (
              <div key={t.label} style={{
                background: t.highlight ? 'var(--gold)' : 'var(--navy-mid)',
                padding: '2rem',
                textAlign: 'center',
                border: t.highlight ? '2px solid var(--gold)' : '1px solid rgba(200,147,26,0.2)',
              }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: t.highlight ? 'var(--navy)' : 'var(--gold)', marginBottom: '0.5rem' }}>{t.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: t.highlight ? 'var(--navy)' : 'var(--white)', letterSpacing: '0.04em' }}>{t.time}</div>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', fontSize: '0.95rem', marginBottom: '1.5rem' }} className="reveal">
            Rush production available for urgent deployments and time-sensitive orders.
          </p>
          <div style={{ textAlign: 'center' }} className="reveal">
            <Link to="/rush-order" style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Learn about Rush Orders →</Link>
          </div>
        </div>
      </section>

      {/* MILITARY PATCH EXAMPLES */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Gallery</span>
            <h2 className="section-title">Military Patch Examples</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="reveal">
            {GALLERY_IMGS.map(img => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 4 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Questions</span>
            <h2 className="section-title">Military Patch FAQ</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }} className="reveal">
            {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Order Your Military Patches?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Free quote, free design proof, confidential order process.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/products" className="btn-outline">View Patch Types</Link>
          </div>
        </div>
      </section>
    </>
  )
}
