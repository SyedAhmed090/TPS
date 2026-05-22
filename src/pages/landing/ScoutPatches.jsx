import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const PATCH_TYPES = [
  {
    icon: '🏅',
    name: 'Merit Badge Style',
    desc: 'Round embroidered patches in BSA-compatible sizes and backing options. Custom skills, achievements, and accomplishment badges.',
  },
  {
    icon: '#️⃣',
    name: 'Troop Number Patches',
    desc: 'Identify your troop with a custom number patch in your troop colors. Small quantities available — as few as 25 pieces.',
  },
  {
    icon: '🏕️',
    name: 'Event Patches',
    desc: 'Commemorative patches for camporees, jamborees, and special events. A keepsake every Scout keeps forever.',
  },
  {
    icon: '⭐',
    name: 'Rank Patches',
    desc: 'Custom rank patches for independent scout organizations or home groups. Fully customizable design.',
  },
  {
    icon: '🌟',
    name: 'Award Patches',
    desc: 'Special achievement patches for service projects, milestones, and custom troop awards.',
  },
  {
    icon: '🔗',
    name: 'Neckerchief Slides',
    desc: 'Woven patches sized for neckerchief slides. Ask about this option when requesting your quote.',
  },
]

const ORDER_STEPS = [
  {
    num: '1',
    title: 'Submit a Free Quote',
    desc: 'Include your troop number, quantity needed, and your design (or describe what you want).',
  },
  {
    num: '2',
    title: 'Approve the Proof',
    desc: "We'll create a digital proof for your approval before any production begins.",
  },
  {
    num: '3',
    title: 'We Produce',
    desc: 'Standard 10–14 day turnaround. Rush available for events and deadlines.',
  },
  {
    num: '4',
    title: 'Delivered to Your Door',
    desc: 'Flat-rate shipping. All patches arrive ready to distribute.',
  },
]

const FAQS = [
  {
    q: "What's the minimum order for troop patches?",
    a: '25 pieces minimum. Most scout troops order 30–50 pieces (enough for all members plus extras and officers).',
  },
  {
    q: 'Can I match BSA or GSUSA colors exactly?',
    a: "Yes. Provide us with the specific colors (or describe the standard) and we'll match as closely as possible using our thread library. For exact brand color matching, provide PMS/Pantone references.",
  },
  {
    q: "What's the turnaround time for event patches?",
    a: 'Standard production is 10–14 business days. If your event is sooner, request a rush quote. We recommend ordering at least 3 weeks before your event date.',
  },
  {
    q: 'Can I upload a sketch or rough drawing?',
    a: "Absolutely. Scouts often start with hand-drawn designs — our team will digitize and refine your sketch into a production-ready file.",
  },
  {
    q: 'Do you offer repeat orders for the same design?',
    a: 'Yes. We keep your artwork on file (with your permission) so reorder is easy — just specify quantity and we\'ll produce from your existing approved design.',
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

export default function ScoutPatches() {
  useReveal()
  useSEO('Custom Scout Patches', 'Custom scout patches for Boy Scouts, Girl Scouts, and Cub Scouts. Merit badges, troop numbers, event patches. Low minimums. Free quote.')

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Scout Patches' },
      ]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Merit Badges &amp; More</span>
          <h1>Custom Scout Patches — Merit Badges, Troop Numbers &amp; More</h1>
          <p>From troop number patches to event badges, we produce custom scout patches for BSA, GSUSA, and independent scout organizations with low minimums and fast turnaround.</p>
        </div>
      </section>

      {/* TYPES OF SCOUT PATCHES */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Patch Types</span>
            <h2 className="section-title">Types of Scout Patches</h2>
          </div>
          <div className="serve-grid reveal">
            {PATCH_TYPES.map(pt => (
              <div key={pt.name} className="serve-card" style={{ textAlign: 'left' }}>
                <span className="serve-icon">{pt.icon}</span>
                <div className="serve-name" style={{ marginBottom: '0.6rem' }}>{pt.name}</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.6 }}>{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BSA & GSUSA STANDARDS */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Official Organizations</span>
            <h2 className="section-title">BSA &amp; GSUSA Standards</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }} className="reveal">
            <div style={{ background: 'var(--white)', padding: '2.25rem', borderTop: '4px solid var(--navy)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '1rem' }}>BSA — Boy Scouts of America</div>
              <p style={{ fontSize: '0.92rem', color: 'var(--gray-mid)', lineHeight: 1.75 }}>
                Our patches are produced to meet BSA uniform standards. We match Council shoulder patches and troop number patches in BSA-approved formats. Iron-on (heat seal) and sew-on backing available, as specified in the BSA uniform guidelines.
              </p>
            </div>
            <div style={{ background: 'var(--white)', padding: '2.25rem', borderTop: '4px solid var(--gold)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '1rem' }}>GSUSA — Girl Scouts</div>
              <p style={{ fontSize: '0.92rem', color: 'var(--gray-mid)', lineHeight: 1.75 }}>
                Custom patches for Girl Scout troops, council activities, and individual achievements. We produce in standard GSUSA sizes and can match the color standards for Brownie, Junior, Cadette, Senior, and Ambassador levels.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', textAlign: 'center', fontStyle: 'italic' }} className="reveal">
            We work with both official BSA/GSUSA troop leaders and independent scouting organizations.
          </p>
        </div>
      </section>

      {/* LOW MINIMUMS */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: 680, margin: '0 auto' }} className="reveal">
            <div style={{ border: '2px solid var(--gold)', background: 'rgba(200,147,26,0.04)', padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '0.04em' }}>25</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '1rem' }}>✓ Piece Minimum — Perfect for Small Troops</div>
              <p style={{ fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.75 }}>
                Scout patch orders don't need to be large. Our 25-piece minimum makes it easy for any troop size to get quality custom patches. Order just enough for your troop, plus a few extras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IRON-ON VS SEW-ON */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Backing Options</span>
            <h2 className="section-title">Iron-On vs. Sew-On for Scout Uniforms</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="reveal">
            <div style={{ background: 'var(--white)', padding: '2.25rem', borderLeft: '4px solid var(--gold)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.75rem' }}>Iron-On (Heat Seal)</div>
              <p style={{ fontSize: '0.92rem', color: 'var(--gray-mid)', lineHeight: 1.75 }}>
                Convenient for parents and scouts — apply at home with a standard iron. Adheres to the cotton/polyester blend of scout uniforms. Recommended: also sew around the edge for permanent attachment through repeated washes.
              </p>
            </div>
            <div style={{ background: 'var(--white)', padding: '2.25rem', borderLeft: '4px solid var(--navy)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.75rem' }}>Sew-On</div>
              <p style={{ fontSize: '0.92rem', color: 'var(--gray-mid)', lineHeight: 1.75 }}>
                The traditional method. Thread sewn directly to the uniform. Most durable option. Required for merit badge sashes (BSA sashes are intended for sew-on only).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDERING PROCESS */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal">
            <span className="section-label">How to Order</span>
            <h2 className="section-title light">Ordering Process for Troop Leaders</h2>
          </div>
          <div className="steps-grid-4 reveal" style={{ position: 'relative', gap: 0 }}>
            <div style={{ position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 1, background: 'repeating-linear-gradient(90deg, rgba(200,147,26,0.4) 0, rgba(200,147,26,0.4) 10px, transparent 10px, transparent 20px)' }} />
            {ORDER_STEPS.map(s => (
              <div key={s.num} style={{ textAlign: 'center', padding: '0 1.5rem' }}>
                <div style={{ width: 64, height: 64, background: 'var(--gold)', color: 'var(--navy)', fontFamily: 'var(--font-display)', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.4rem', position: 'relative', zIndex: 1 }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.5rem' }}>{s.title}</div>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Questions</span>
            <h2 className="section-title">Scout Patch FAQ</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }} className="reveal">
            {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Order Custom Scout Patches</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Low minimums. Free design proof. Flat-rate shipping.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
