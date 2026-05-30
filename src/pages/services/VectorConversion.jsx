import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const BENEFITS = [
  { icon: '📐', title: 'Hand-Traced, Not Auto', desc: 'Every conversion is traced manually. Auto-trace tools leave messy nodes, broken paths, and rough edges — we trace clean.' },
  { icon: '♾️', title: 'Infinite Scalability', desc: 'Vector files scale from a business card to a billboard with zero quality loss. Pixels blur — vectors never do.' },
  { icon: '🖨️', title: 'Print-Ready Output', desc: 'Every file meets commercial print standards — correct colour mode, clean anchor points, and proper bleed if required.' },
  { icon: '📁', title: 'All Output Formats', desc: 'Receive SVG, AI, EPS, PDF, and a flattened PNG — every format your printer, embroiderer, or designer could need.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Standard 24-hour turnaround. Rush delivery available in 6 hours for urgent deadlines.' },
  { icon: '🔄', title: 'Free Revisions', desc: 'If the converted file isn\'t right, we fix it. Two revisions on Standard, unlimited on Complex.' },
]

const STEPS = [
  { num: '01', title: 'Send Your File', desc: 'Upload in any format — JPG, PNG, PDF, or even a photo. Any resolution, any quality. We work with what you have.' },
  { num: '02', title: 'We Hand-Trace It', desc: 'Our designers manually trace your artwork into clean vector paths with precise anchor points and proper colour separation.' },
  { num: '03', title: 'Review the Proof', desc: 'We send a proof for your approval. Request any adjustments — colour tweaks, shape fixes, text changes — all at no extra cost.' },
  { num: '04', title: 'Download Your Files', desc: 'Receive your finished vector files in all requested formats. Use them for print, embroidery, signage, or web — forever.' },
]

const PLANS = [
  {
    name: 'Basic',
    price: '$10',
    sub: 'Simple logos & icons',
    tag: null,
    features: [
      'Up to 3 colours',
      'SVG and PNG output',
      '24-hour turnaround',
      '1 free revision',
      'Clean paths & anchor points',
    ],
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$20',
    sub: 'Multi-colour & detailed artwork',
    tag: 'Most Popular',
    features: [
      'Unlimited colours',
      'SVG, AI, EPS & PDF output',
      '12-hour turnaround',
      '2 free revisions',
      'Full colour separation',
      'Gradients & complex shapes',
    ],
    highlight: true,
  },
  {
    name: 'Complex',
    price: '$35',
    sub: 'Mascots & character art',
    tag: null,
    features: [
      'All formats with full layering',
      '6-hour rush available',
      'Unlimited revisions',
      'Character & mascot illustration',
      'Full layer organisation',
      'Priority support',
    ],
    highlight: false,
  },
]

const ADDONS = [
  { label: 'Rush Delivery', price: '+$10', desc: 'Guaranteed 6-hour turnaround — moved to the front of the queue.' },
  { label: 'Colour Separation', price: '+$8', desc: 'Each colour on its own layer, ready for spot-colour or screen printing.' },
  { label: 'Size Variations', price: '+$5 each', desc: 'Artwork re-optimised for different applications — print, web, embroidery.' },
  { label: 'Bulk Discount', price: '20% off', desc: 'Order 10 or more files at once and save 20% on every file in the batch.' },
]

const USE_CASES = [
  { icon: '🪡', title: 'Embroidery & Patches', desc: 'Digitizers require clean vector artwork. Convert your raster logo first for a smoother stitch output and fewer corrections.' },
  { icon: '🖨️', title: 'Screen Printing', desc: 'Screen printers need colour-separated vector layers. Our files slot directly into their workflow without extra prep.' },
  { icon: '✂️', title: 'Vinyl & Laser Cutting', desc: 'Cutting machines follow vector paths. A properly vectorised file cuts cleanly with no rough edges or missed details.' },
  { icon: '🏷️', title: 'Branded Merchandise', desc: 'Hats, bags, t-shirts — your logo must be vector for consistent, high-quality reproduction at any size.' },
]

const PORTFOLIO = [
  { label: 'Restaurant Chain Logo', detail: 'Multi-colour wordmark', bg: 'linear-gradient(135deg, #0B1A2E 0%, #1E3258 100%)' },
  { label: 'Real Estate Wordmark', detail: '2-colour rebuild', bg: 'linear-gradient(135deg, #1A2B1A 0%, #2A4028 100%)' },
  { label: 'Sports Team Mascot', detail: 'Full character illustration', bg: 'linear-gradient(135deg, #2D1B0E 0%, #4A2C1A 100%)' },
  { label: 'Startup Brand Mark', detail: 'Icon & logotype set', bg: 'linear-gradient(135deg, #1A1525 0%, #2D2040 100%)' },
  { label: 'MC Club Badge', detail: '6-colour crest redraw', bg: 'linear-gradient(135deg, #142340 0%, #0B1A2E 100%)' },
  { label: 'School District Crest', detail: '5-colour coat of arms', bg: 'linear-gradient(135deg, #251A2D 0%, #3D2A48 100%)' },
]

export default function VectorConversion() {
  useReveal()
  useSEO(
    'Vector Conversion Service',
    'Professional vector conversion from $10/file. Hand-traced, not auto-converted. SVG, AI, EPS, PDF output. 24-hour turnaround. Perfect for print, embroidery, and branding.'
  )

  return (
    <>
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { label: 'Vector Conversion' }]} />

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Design Services</span>
          <h1>Vector Conversion</h1>
          <p>Transform any raster image, blurry logo, or low-resolution file into a clean, scalable vector — ready for print, embroidery, signage, or merchandise.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link to="/free-quote" className="btn-gold">Get Started — From $10</Link>
            <a href="#pricing" className="btn-outline">See Pricing</a>
          </div>
        </div>
      </section>

      {/* WHAT IS VECTOR CONVERSION */}
      <section style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div className="story-grid reveal">
            <div>
              <span className="section-label">Raster vs. Vector</span>
              <h2 className="section-title">Why Your Logo Needs to Be a Vector</h2>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Raster images (JPEG, PNG) are made of pixels. Scale them up and they blur. Vector graphics are made of mathematical paths — they scale to any size with zero quality loss.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Printers, embroiderers, sign makers, and merchandise suppliers almost always require vector artwork. If you only have a raster logo, we convert it into a production-ready vector file.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8 }}>
                We trace every design by hand — no auto-trace tools that produce messy nodes and broken paths. The files we deliver are clean, organised, and immediately usable.
              </p>
            </div>
            <div style={{ background: 'var(--navy)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { stat: '$10', label: 'Starting Price' },
                { stat: '24 hrs', label: 'Standard Turnaround' },
                { stat: '5+', label: 'Output Formats' },
                { stat: '100%', label: 'Hand-Traced (No Auto)' },
              ].map(({ stat, label }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 0', borderBottom: i < 3 ? '1px solid rgba(200,147,26,0.12)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--gold)', letterSpacing: '0.04em', minWidth: 80 }}>{stat}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">When You Need It</span>
            <h2 className="section-title">Common Use Cases</h2>
          </div>
          <div className="card-grid-2 reveal">
            {USE_CASES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'var(--cream)', padding: '1.75rem 2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', border: '1px solid rgba(11,26,46,0.07)', borderLeft: '3px solid var(--gold)' }}>
                <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>{title}</p>
                  <p style={{ fontSize: '0.87rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Why TPS Vector Conversion</span>
            <h2 className="section-title">Clean Files. Every Time.</h2>
          </div>
          <div className="why-perks reveal">
            {BENEFITS.map(({ icon, title, desc }, i) => (
              <div key={title} className={`perk-card reveal-delay-${(i % 3) + 1}`}>
                <span className="perk-icon">{icon}</span>
                <p className="perk-title">{title}</p>
                <p className="perk-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--navy-mid)', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The Process</span>
            <h2 className="section-title light">Four Simple Steps</h2>
          </div>
          <div className="steps-row reveal">
            {STEPS.map(({ num, title, desc }, i) => (
              <div key={num} className={`step reveal-delay-${i + 1}`}>
                <div className="step-num">{num}</div>
                <p className="step-title">{title}</p>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Simple Pricing</span>
            <h2 className="section-title">Flat Rate Per File</h2>
            <p style={{ color: 'var(--gray-mid)', maxWidth: 520, margin: '0 auto' }}>One price per file — no surprises. Choose the plan that matches your artwork complexity.</p>
          </div>

          <div className="cards-grid-3 reveal" style={{ gap: '1.5rem', marginTop: '2.5rem', alignItems: 'start' }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{
                background: plan.highlight ? 'var(--navy)' : 'var(--white)',
                border: plan.highlight ? '2px solid var(--gold)' : '1px solid rgba(11,26,46,0.1)',
                padding: '2.5rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {plan.tag && (
                  <span style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gold)', color: 'var(--navy)',
                    fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 14px',
                    whiteSpace: 'nowrap',
                  }}>{plan.tag}</span>
                )}
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: plan.highlight ? 'var(--gold)' : 'var(--gray-mid)', marginBottom: '0.4rem' }}>{plan.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: plan.highlight ? 'var(--gold)' : 'var(--navy)', lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', color: plan.highlight ? 'rgba(255,255,255,0.45)' : 'var(--gray-mid)' }}>/ file</span>
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', fontWeight: 600, color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'var(--gray-mid)', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: `1px solid ${plan.highlight ? 'rgba(200,147,26,0.18)' : 'rgba(11,26,46,0.1)'}` }}>{plan.sub}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.87rem', color: plan.highlight ? 'rgba(255,255,255,0.78)' : 'var(--gray-mid)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/free-quote" className={plan.highlight ? 'btn-gold' : 'btn-outline-dark'} style={{ textAlign: 'center', display: 'block' }}>Order {plan.name}</Link>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="reveal" style={{ marginTop: '2.5rem', background: 'var(--navy)', padding: '2rem 2.5rem', borderTop: '3px solid var(--gold)' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>Optional Add-Ons</p>
            <div className="card-grid-2" style={{ gap: '1.5rem' }}>
              {ADDONS.map(({ label, price, desc }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(200,147,26,0.1)', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.25rem', letterSpacing: '0.04em' }}>{label}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--gold)', letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0 }}>{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Conversion Portfolio</h2>
            <p style={{ color: 'var(--gray-mid)', maxWidth: 520, margin: '0 auto' }}>Examples of artwork we've converted — from faded logos to complex mascot illustrations.</p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
            {PORTFOLIO.map(({ label, detail, bg }) => (
              <div key={label} style={{ background: bg, padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 200, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, rgba(200,147,26,0.05) 0px, rgba(200,147,26,0.05) 1px, transparent 1px, transparent 20px)', pointerEvents: 'none' }} />
                <span style={{ fontSize: '2rem', marginBottom: '0.75rem', position: 'relative' }}>✏️</span>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--white)', letterSpacing: '0.06em', marginBottom: '0.3rem', position: 'relative' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative' }}>{detail}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--gray-mid)', marginTop: '1.25rem' }}>* Representative samples — client files are kept fully confidential.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to Convert?</span>
          <h2 className="section-title light" style={{ margin: '0.5rem 0 0.75rem' }}>Send Us Your File Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 460, margin: '0 auto 2rem' }}>Any format accepted. Clean vector files returned within 24 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Order Vector Conversion — From $10</Link>
            <Link to="/digitizing" className="btn-outline-light">Also Need Digitizing?</Link>
          </div>
        </div>
      </section>
    </>
  )
}
