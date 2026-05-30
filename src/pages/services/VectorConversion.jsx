import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const BENEFITS = [
  { icon: '🎨', title: 'Infinite Scalability', desc: 'Vector files scale from a business card to a billboard without losing a single pixel of sharpness. Raster images blur and pixelate — vectors never do.' },
  { icon: '🖨️', title: 'Print-Ready Output', desc: 'Every file we deliver meets commercial print standards — CMYK color mode, correct bleed settings, and clean anchor points.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Most conversions are completed in 24 hours. Rush delivery available in 6 hours for urgent deadlines.' },
  { icon: '📁', title: 'All Major Formats', desc: 'Receive your files in SVG, AI, EPS, PDF, and PNG — every format your printer, embroiderer, or designer might need.' },
  { icon: '🎯', title: 'Hand-Traced, Not Auto', desc: 'Every conversion is traced manually by a designer. Auto-trace tools leave messy nodes and broken paths — we don\'t.' },
  { icon: '🔄', title: 'Free Revisions', desc: 'If the converted file isn\'t exactly right, we fix it. Unlimited revisions on Complex plans, two on Standard.' },
]

const STEPS = [
  { num: '01', title: 'Send Your File', desc: 'Upload your existing logo or image — JPG, PNG, PDF, or even a photo. Any resolution, any quality. We\'ll work with what you have.' },
  { num: '02', title: 'We Hand-Trace It', desc: 'Our designers manually trace your artwork into clean, scalable vector paths with precise anchor points and correct color separation.' },
  { num: '03', title: 'Review the Proof', desc: 'We send a proof for your review. Request any adjustments — color tweaks, shape refinements, added text. All at no extra cost.' },
  { num: '04', title: 'Download Your Files', desc: 'Receive your finished vector files in all requested formats. Use them for print, embroidery, signage, or web — forever.' },
]

const PLANS = [
  {
    name: 'Basic',
    price: '$10',
    unit: 'per file',
    tag: null,
    tagColor: null,
    scope: 'Simple logos & icons',
    features: [
      'Up to 3 colors',
      'SVG and PNG output',
      '24-hour turnaround',
      '1 free revision',
      'Clean anchor points',
      'Suited for text & basic shapes',
    ],
    cta: 'Order Basic',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$20',
    unit: 'per file',
    tag: 'Most Popular',
    tagColor: 'var(--gold)',
    scope: 'Multi-color & detailed artwork',
    features: [
      'Unlimited colors',
      'SVG, AI, EPS, and PDF output',
      '12-hour turnaround',
      '2 free revisions',
      'Full color separation',
      'Gradients & complex shapes',
    ],
    cta: 'Order Standard',
    highlight: true,
  },
  {
    name: 'Complex',
    price: '$35',
    unit: 'per file',
    tag: 'Best for Illustrations',
    tagColor: 'var(--navy-light)',
    scope: 'Mascots & character art',
    features: [
      'All formats with full layering',
      '6-hour rush available',
      'Unlimited revisions',
      'Character & mascot illustration',
      'Full layer organization',
      'Priority support',
    ],
    cta: 'Order Complex',
    highlight: false,
  },
]

const ADDONS = [
  { label: 'Rush Delivery', price: '+$10', desc: 'Guaranteed 6-hour turnaround — move to the front of the queue.' },
  { label: 'Color Separation', price: '+$8', desc: 'Each color on its own layer, ready for spot-color printing or screen printing.' },
  { label: 'Size Variations', price: '+$5 each', desc: 'Receive the same artwork optimized for multiple applications (print, web, embroidery).' },
  { label: 'Bulk Discount', price: '20% off', desc: 'Order 10 or more files at once and receive 20% off every file in the batch.' },
]

const USE_CASES = [
  { icon: '🪡', title: 'Embroidery & Patches', desc: 'Digitizers require a clean vector file. We convert your logo so it\'s ready for the digitizing process and results in a cleaner stitch output.' },
  { icon: '🖨️', title: 'Screen Printing', desc: 'Screen printers need separate color layers. Our color-separated vector files slot directly into their workflow without extra prep.' },
  { icon: '✂️', title: 'Vinyl & Laser Cutting', desc: 'Cutting machines follow vector paths precisely. A properly vectorized file cuts cleanly with no rough edges or missed cuts.' },
  { icon: '🏷️', title: 'Branded Merchandise', desc: 'Whether it\'s a hat, bag, or t-shirt, your logo needs to be vector for consistent reproduction at any size.' },
]

const PORTFOLIO = [
  { label: 'Restaurant Chain', type: 'Logo Vectorization', colors: '4 colors', bg: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' },
  { label: 'Real Estate Agency', type: 'Wordmark Rebuild', colors: '2 colors', bg: 'linear-gradient(135deg, #1A2D1A 0%, var(--navy-mid) 100%)' },
  { label: 'Sports Team', type: 'Mascot Illustration', colors: 'Full color', bg: 'linear-gradient(135deg, #2D1B0E 0%, #4A2C1A 100%)' },
  { label: 'Startup Brand', type: 'Icon & Wordmark', colors: '3 colors', bg: 'linear-gradient(135deg, #1A1A2D 0%, #2D2A4A 100%)' },
  { label: 'Motorcycle Club', type: 'Badge Redraw', colors: '6 colors', bg: 'linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 100%)' },
  { label: 'School District', type: 'Crest Vectorization', colors: '5 colors', bg: 'linear-gradient(135deg, #2A1A2D 0%, #3D2A4A 100%)' },
]

export default function VectorConversion() {
  useReveal()
  useSEO(
    'Vector Conversion Service',
    'Professional vector conversion starting at $10/file. Hand-traced, not auto-converted. All formats: SVG, AI, EPS, PDF. 24-hour turnaround. Perfect for print, embroidery, and branding.'
  )

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Vector Conversion' },
      ]} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #1A2B1A 0%, var(--navy) 100%)' }}>
        <div className="container">
          <span className="section-label">Design Services</span>
          <h1>Vector Conversion Service</h1>
          <p style={{ maxWidth: 600 }}>
            Transform any raster image, blurry logo, or low-resolution file into a clean, scalable vector — ready for print, embroidery, signage, or merchandise.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link to="/free-quote" className="btn-gold">Get Started — From $10</Link>
            <a href="#pricing" className="btn-outline">View Pricing</a>
          </div>
        </div>
      </section>

      {/* ── WHAT IS VECTOR CONVERSION ────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div className="story-grid reveal">
            <div>
              <span className="section-label">What Is Vector Conversion?</span>
              <h2 className="section-title">Raster vs. Vector — and Why It Matters</h2>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Raster images (JPEG, PNG, BMP) are made of pixels. When you scale them up, they blur and pixelate. Vector graphics are made of mathematical paths — they scale to any size with zero quality loss.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Printers, embroiderers, sign makers, and merchandise suppliers almost always require vector artwork. If you only have a raster logo, we convert it into a production-ready vector file.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8 }}>
                We manually trace every design — we don't use auto-trace tools that generate messy, unusable results. The files we deliver are clean, organized, and immediately usable.
              </p>
            </div>
            <div style={{ background: 'var(--navy)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
              {[
                { stat: '24 hrs', label: 'Standard Turnaround' },
                { stat: '$10', label: 'Starting Price' },
                { stat: '5+', label: 'Output Formats' },
                { stat: '100%', label: 'Hand-Traced (No Auto)' },
              ].map(({ stat, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderBottom: '1px solid rgba(200,147,26,0.12)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--gold)', letterSpacing: '0.04em', minWidth: 90 }}>{stat}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">When You Need It</span>
            <h2 className="section-title">Common Use Cases</h2>
          </div>
          <div className="card-grid-2 reveal">
            {USE_CASES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'var(--cream)', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', border: '1px solid rgba(11,26,46,0.07)' }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>{title}</p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: 'var(--navy-mid)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Why TPS Vector Conversion</span>
            <h2 className="section-title light">Clean Files. Every Time.</h2>
          </div>
          <div className="cards-grid-3">
            {BENEFITS.map(({ icon, title, desc }, i) => (
              <div key={title} className={`reveal reveal-delay-${(i % 3) + 1}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,147,26,0.12)', padding: '1.75rem' }}>
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>{icon}</span>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--white)', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>{title}</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--white)', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The Process</span>
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="steps-row">
            {STEPS.map(({ num, title, desc }, i) => (
              <div key={num} className={`step reveal reveal-delay-${i + 1}`} style={{ background: 'var(--cream)' }}>
                <div className="step-num">{num}</div>
                <p className="step-title">{title}</p>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Transparent Pricing</span>
            <h2 className="section-title">Flat-Rate Vector Conversion</h2>
            <p style={{ color: 'var(--gray-mid)', maxWidth: 520, margin: '0 auto' }}>One price per file — no surprises. Choose the plan that matches your artwork complexity.</p>
          </div>
          <div className="cards-grid-3 reveal" style={{ gap: '1.5rem', marginTop: '2.5rem' }}>
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
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: plan.tagColor, color: plan.highlight ? 'var(--navy)' : '#fff',
                    fontFamily: 'var(--font-heading)', fontSize: '0.68rem', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 16px',
                    whiteSpace: 'nowrap',
                  }}>{plan.tag}</span>
                )}
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: plan.highlight ? 'var(--gold)' : 'var(--gray-mid)', marginBottom: '0.5rem' }}>{plan.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', color: plan.highlight ? 'var(--gold)' : 'var(--navy)', letterSpacing: '0.03em', lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: plan.highlight ? 'rgba(255,255,255,0.5)' : 'var(--gray-mid)' }}>{plan.unit}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 700, color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--navy)', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: `1px solid ${plan.highlight ? 'rgba(200,147,26,0.2)' : 'rgba(11,26,46,0.1)'}` }}>{plan.scope}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', color: plan.highlight ? 'rgba(255,255,255,0.8)' : 'var(--gray-mid)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/free-quote" className={plan.highlight ? 'btn-gold' : 'btn-outline-dark'} style={{ textAlign: 'center' }}>{plan.cta}</Link>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="reveal" style={{ marginTop: '3rem', background: 'var(--navy)', padding: '2rem', borderLeft: '4px solid var(--gold)' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>Available Add-Ons</p>
            <div className="card-grid-2">
              {ADDONS.map(({ label, price, desc }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingBottom: '1rem', borderBottom: '1px solid rgba(200,147,26,0.1)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.2rem' }}>{label}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Conversion Portfolio</h2>
            <p style={{ color: 'var(--gray-mid)', maxWidth: 520, margin: '0 auto' }}>Examples of artwork we've converted — from faded logos to complex mascot illustrations.</p>
          </div>
          <div className="products-grid reveal" style={{ marginTop: '2rem' }}>
            {PORTFOLIO.map(({ label, type, colors, bg }) => (
              <div key={label} style={{ background: bg, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, rgba(200,147,26,0.04) 0px, rgba(200,147,26,0.04) 1px, transparent 1px, transparent 24px)', pointerEvents: 'none' }} />
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: 64, height: 64, border: '2px solid rgba(200,147,26,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', background: 'rgba(200,147,26,0.08)' }}>
                    <span style={{ fontSize: '1.6rem' }}>✏️</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--white)', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{label}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{type}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{colors}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="pricing-note" style={{ textAlign: 'center' }}>* Portfolio samples are representative. Client files are kept fully confidential.</p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to Convert?</span>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}>Send Us Your File Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem' }}>
            Any format accepted. Clean vector files returned in 24 hours or less.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Order Vector Conversion — From $10</Link>
            <Link to="/digitizing" className="btn-outline-light">Also Need Digitizing?</Link>
          </div>
        </div>
      </section>
    </>
  )
}
