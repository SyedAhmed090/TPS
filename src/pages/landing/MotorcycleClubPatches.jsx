import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const MC_COMPONENTS = [
  {
    num: '01',
    name: 'Top Rocker',
    desc: 'The curved patch worn at the top of the back panel, typically bearing the club name. Shaped to follow the curve of a standard vest.',
  },
  {
    num: '02',
    name: 'Bottom Rocker',
    desc: 'The lower curved patch, usually indicating location or chapter. Mirrors the top rocker shape.',
  },
  {
    num: '03',
    name: 'Center Patch',
    desc: 'The main club emblem — usually the largest piece, centered on the back. Can be a single piece or multi-piece design.',
  },
  {
    num: '04',
    name: 'MC Tab',
    desc: "A small rectangular patch that sits between the top rocker and center patch on some sets. Simply reads 'MC.'",
  },
  {
    num: '05',
    name: 'Side Patches / Auxiliary Patches',
    desc: 'Number patches, officer titles, award patches, and custom additions worn on the front of the vest.',
  },
]

const PATCH_OPTIONS = [
  {
    name: 'Embroidered',
    subtitle: 'Most Traditional',
    desc: 'The classic choice for MC patches. Thread-sewn on twill, available in custom colors and metallic threads. Merrowed border is standard.',
    highlight: true,
  },
  {
    name: 'Woven',
    subtitle: 'Fine Detail',
    desc: 'Finer detail than embroidery — ideal for complex logos or small text in the center patch.',
    highlight: false,
  },
  {
    name: 'Leather',
    subtitle: 'Premium Option',
    desc: 'Premium genuine leather patches for clubs that want a higher-end feel. Laser-cut and embossed or printed.',
    highlight: false,
  },
]

const BACKING_OPTIONS = [
  {
    name: 'Sew-On',
    subtitle: 'Traditional',
    desc: 'The authentic MC choice. Patches are sewn directly onto the denim or leather vest. Permanent, traditional.',
    recommended: true,
  },
  {
    name: 'Iron-On (Heat Seal)',
    subtitle: 'Convenient',
    desc: 'Convenient alternative to sewing. Bonds to fabric with heat. Recommend also sewing the perimeter for durability on frequently-worn items.',
    recommended: false,
  },
]

const DURABILITY_POINTS = [
  'Premium twill backing resists tearing and fraying',
  'UV-stabilized threads maintain color through sun exposure',
  'Merrow border locks the edge from unraveling',
  'PVC patches available for members who want waterproof options',
]

const FAQS = [
  {
    q: 'Do you produce three-piece back patches?',
    a: 'Yes. We produce full three-piece sets (top rocker, center patch, bottom rocker) as well as individual pieces. We\'ll match colors and style across all pieces for a cohesive set.',
  },
  {
    q: 'Can I get patches shaped to my exact specifications?',
    a: 'Yes. Custom die-cut shapes are available for any patch in your set. Provide your design files and we\'ll cut to your specifications.',
  },
  {
    q: 'What backing do most MC clubs use?',
    a: 'Sew-on is the traditional and most common backing for MC back patches — it gives the most authentic look and the most permanent attachment. For front patches and name patches, heat seal is also popular.',
  },
  {
    q: "How do I submit my club's artwork?",
    a: 'Submit through our free quote form or email to info@thepatchsolutions.com. We accept AI, EPS, PDF, and high-res images. Visit our Artwork Guidelines page for full requirements.',
  },
  {
    q: 'Is there a club discount for large sets?',
    a: 'Volume discounts apply automatically based on quantity per item. For large club orders (full membership sets), contact us for custom pricing.',
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

export default function MotorcycleClubPatches() {
  useReveal()
  useSEO('Motorcycle Club Patches', 'Custom motorcycle club patches — top rockers, bottom rockers, center patches, MC tabs. Embroidered, woven, and leather. Free quote.')

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Motorcycle Club Patches' },
      ]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Built for the Road</span>
          <h1>Motorcycle Club Patches — Built for the Road</h1>
          <p>Top rockers, bottom rockers, center patches, MC tabs — we produce the complete MC patch set with the accuracy, durability, and confidentiality that MC culture demands.</p>
        </div>
      </section>

      {/* MC PATCH SET EXPLAINED */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">The Set</span>
            <h2 className="section-title">The MC Patch Set Explained</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }} className="reveal">
            {MC_COMPONENTS.map(c => (
              <div key={c.num} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '1.5rem', background: 'var(--cream)', borderLeft: '4px solid var(--gold)' }}>
                <div style={{ flexShrink: 0, fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1, opacity: 0.4, letterSpacing: '0.04em' }}>{c.num}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.4rem' }}>{c.name}</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.75)', padding: '1.25rem 1.75rem', fontSize: '0.92rem', lineHeight: 1.7 }} className="reveal">
            We produce the full three-piece back patch set or individual pieces. <Link to="/contact" style={{ color: 'var(--gold)' }}>Contact us for set pricing.</Link>
          </div>
        </div>
      </section>

      {/* PATCH TYPES FOR MC */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Material Options</span>
            <h2 className="section-title">Patch Types for MC</h2>
          </div>
          <div className="card-grid-3 reveal">
            {PATCH_OPTIONS.map(p => (
              <div key={p.name} style={{
                background: 'var(--white)',
                padding: '2rem',
                borderTop: `4px solid ${p.highlight ? 'var(--gold)' : 'var(--navy)'}`,
                position: 'relative',
              }}>
                {p.highlight && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--gold)', color: 'var(--navy)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.2rem 0.5rem' }}>Traditional</div>
                )}
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.25rem' }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>{p.subtitle}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACKING OPTIONS FOR MC */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Attachment</span>
            <h2 className="section-title">Backing Options for MC</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="reveal">
            {BACKING_OPTIONS.map(b => (
              <div key={b.name} style={{ background: 'var(--cream)', padding: '2rem', borderLeft: `4px solid ${b.recommended ? 'var(--gold)' : 'var(--navy)'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)' }}>{b.name}</div>
                  {b.recommended && <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.15rem 0.5rem' }}>Traditional</span>}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: '0.75rem' }}>{b.subtitle}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.7, fontStyle: 'italic' }} className="reveal">
            Note: Most MC patch sets use sew-on (no backing) for the back panel and may use heat seal for smaller front patches.
          </p>
        </div>
      </section>

      {/* DURABILITY */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="reveal">
            <div>
              <span className="section-label">Road-Tested</span>
              <h2 className="section-title light" style={{ marginBottom: '1.25rem' }}>Durability for Riding</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                MC patches take a beating. Worn through wind, rain, heat, and thousands of miles. Our patches are built to survive it.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {DURABILITY_POINTS.map(pt => (
                  <li key={pt} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0, color: 'var(--gold)', fontWeight: 700, marginTop: '0.1rem' }}>→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--navy-mid)', padding: '2.5rem', border: '1px solid rgba(200,147,26,0.15)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '1rem', letterSpacing: '0.04em' }}>20+</div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Years producing patches for riders who demand quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIDENTIALITY */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }} className="reveal">
            <div style={{ background: 'var(--navy)', padding: '2.5rem', borderLeft: '4px solid var(--gold)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                🔒 Your Designs Stay With You
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                We never display, share, or reuse customer artwork. MC patch designs are private — full stop. We do not publish photos of club patches in our portfolio without explicit permission. Your order information and designs are kept strictly confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMUM ORDERS */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }} className="reveal">
            <span className="section-label">Order Sizes</span>
            <h2 className="section-title">Minimum Orders</h2>
          </div>
          <p style={{ maxWidth: 580, margin: '0 auto', fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.75 }} className="reveal">
            25-piece minimum per item. Most MC sets consist of 3–5 patch designs ordered for the full membership. Discounts apply automatically at higher quantities.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Questions</span>
            <h2 className="section-title">MC Patch FAQ</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }} className="reveal">
            {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Order Your Club's Patches</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Free design proof. Confidential order process.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
