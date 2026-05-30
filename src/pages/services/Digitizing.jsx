import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const BENEFITS = [
  { icon: '🎯', title: 'Stitch-Perfect Accuracy', desc: 'Every design is hand-digitized by an experienced artist — not auto-converted. We map pull compensation, underlay, and density to your specific fabric type.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Standard 24-hour delivery. Need it sooner? Rush options available in as little as 6 hours for most designs.' },
  { icon: '🔄', title: 'Unlimited Revisions', desc: 'On Pro plans, we revise until the design is exactly right — no extra charges, no questions asked.' },
  { icon: '🖥️', title: 'All Machine Formats', desc: 'We deliver in every major embroidery format: DST, PES, EXP, JEF, XXX, VP3, HUS, and more.' },
  { icon: '🧵', title: 'Thread Color Chart', desc: 'Receive a full Madeira, Robison-Anton, or Isacord thread color chart with your file so your machine operator has everything they need.' },
  { icon: '🔒', title: 'Your Design, Your Rights', desc: 'We never share, resell, or reuse your artwork. Every digitized file belongs exclusively to you.' },
]

const STEPS = [
  { num: '01', title: 'Upload Your Artwork', desc: 'Send us your logo, design, or artwork in any format — PNG, JPG, PDF, AI, EPS, or even a photo of a hand-drawn sketch.' },
  { num: '02', title: 'We Digitize It', desc: 'Our expert digitizers manually convert your design into stitch data, optimizing for thread type, fabric, and size.' },
  { num: '03', title: 'Review & Approve', desc: 'We send you a stitch simulation for review. Request any changes — we revise until you\'re satisfied.' },
  { num: '04', title: 'Receive Your File', desc: 'Download your machine-ready file in your chosen format. You\'re ready to start stitching.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '$8',
    unit: 'per file',
    tag: null,
    tagColor: null,
    stitches: 'Up to 5,000 stitches',
    features: [
      'Single machine format',
      '24-hour turnaround',
      '1 free revision',
      'Basic stitch capabilities',
      'Standard fill & satin stitches',
    ],
    cta: 'Order Starter',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$15',
    unit: 'per file',
    tag: 'Most Popular',
    tagColor: 'var(--gold)',
    stitches: 'Up to 15,000 stitches',
    features: [
      'All major machine formats',
      '12-hour turnaround',
      '2 free revisions',
      'Full thread color chart',
      'Complex fills & outlines',
      'Pull compensation included',
    ],
    cta: 'Order Standard',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$25',
    unit: 'per file',
    tag: 'Best Quality',
    tagColor: 'var(--navy-light)',
    stitches: 'Unlimited stitches',
    features: [
      'All formats + source file',
      '6-hour rush available',
      'Unlimited revisions',
      '3D puff stitch support',
      'Specialty stitches (chenille, sequin)',
      'Priority support',
    ],
    cta: 'Order Pro',
    highlight: false,
  },
]

const ADDONS = [
  { label: 'Rush Delivery', price: '+$10', desc: 'Move to the front of the queue — 6-hour turnaround.' },
  { label: 'Stitch Simulation Video', price: '+$5', desc: 'See exactly how your design will stitch out before it hits the machine.' },
  { label: 'Size Variation', price: '+$5 each', desc: 'Need the same design at multiple sizes? Each resize is optimized separately.' },
  { label: 'Bulk Discount', price: '20% off', desc: 'Order 10 or more files at once and save 20% across the board.' },
]

const PORTFOLIO = [
  { label: 'Military Unit', type: 'Embroidered Badge', stitches: '8,200 stitches', bg: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' },
  { label: 'Corporate Logo', type: 'Left Chest Logo', stitches: '4,800 stitches', bg: 'linear-gradient(135deg, #1A2D1A 0%, var(--navy-mid) 100%)' },
  { label: 'Sports Team', type: 'Cap Embroidery', stitches: '6,500 stitches', bg: 'linear-gradient(135deg, #2D1B0E 0%, #4A2C1A 100%)' },
  { label: 'Motorcycle Club', type: 'Back Patch', stitches: '14,300 stitches', bg: 'linear-gradient(135deg, #1A1A2D 0%, #2D2A4A 100%)' },
  { label: 'School / University', type: 'Mascot Design', stitches: '11,700 stitches', bg: 'linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 100%)' },
  { label: 'Retail Brand', type: 'Sleeve Logo', stitches: '3,100 stitches', bg: 'linear-gradient(135deg, #2A1A2D 0%, #3D2A4A 100%)' },
]

export default function Digitizing() {
  useReveal()
  useSEO(
    'Embroidery Digitizing Service',
    'Professional embroidery digitizing starting at $8/file. 24-hour turnaround, all machine formats, unlimited revisions on Pro plans. Upload your artwork and get a machine-ready file today.'
  )

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Embroidery Digitizing' },
      ]} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 100%)' }}>
        <div className="container">
          <span className="section-label">Design Services</span>
          <h1>Embroidery Digitizing</h1>
          <p style={{ maxWidth: 600 }}>
            Turn any logo, artwork, or image into a machine-ready embroidery file. Hand-digitized by experts — not auto-converted — for stitch-perfect results every time.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link to="/free-quote" className="btn-gold">Get Started — From $8</Link>
            <a href="#pricing" className="btn-outline">View Pricing</a>
          </div>
        </div>
      </section>

      {/* ── WHAT IS DIGITIZING ───────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div className="story-grid reveal">
            <div>
              <span className="section-label">What Is Digitizing?</span>
              <h2 className="section-title">Your Art, Translated into Stitches</h2>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Embroidery digitizing is the process of converting a flat image or logo into a set of machine-readable stitch instructions. Every stitch direction, density, underlay layer, and thread color is mapped by hand.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                A poorly digitized file produces gaps, puckering, and thread breaks. A properly digitized file runs cleanly on first production — saving time, thread, and frustration.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8 }}>
                Our digitizers have produced files for embroidery machines from Brother, Barudan, Tajima, Bernina, Janome, Singer, and more. Whatever machine you run, we have your format.
              </p>
            </div>
            <div style={{ background: 'var(--navy)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
              {[
                { stat: '24 hrs', label: 'Standard Turnaround' },
                { stat: '$8', label: 'Starting Price' },
                { stat: '10+', label: 'Machine Formats Supported' },
                { stat: '100%', label: 'Satisfaction Guaranteed' },
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

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Why Choose TPS Digitizing</span>
            <h2 className="section-title">Built for Production, Not Just Preview</h2>
          </div>
          <div className="cards-grid-3">
            {BENEFITS.map(({ icon, title, desc }, i) => (
              <div key={title} className={`perk-card reveal reveal-delay-${(i % 3) + 1}`}>
                <span className="perk-icon">{icon}</span>
                <p className="perk-title">{title}</p>
                <p className="perk-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy-mid)', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The Process</span>
            <h2 className="section-title light">How It Works</h2>
          </div>
          <div className="steps-row">
            {STEPS.map(({ num, title, desc }, i) => (
              <div key={num} className={`step reveal reveal-delay-${i + 1}`}>
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
            <h2 className="section-title">Simple, Flat-Rate Digitizing</h2>
            <p style={{ color: 'var(--gray-mid)', maxWidth: 560, margin: '0 auto' }}>No hidden fees. Pay per file — not per stitch. Every plan includes a stitch simulation preview before delivery.</p>
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
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 700, color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--navy)', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: `1px solid ${plan.highlight ? 'rgba(200,147,26,0.2)' : 'rgba(11,26,46,0.1)'}` }}>{plan.stitches}</p>
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
            <h2 className="section-title">Digitizing Portfolio</h2>
            <p style={{ color: 'var(--gray-mid)', maxWidth: 520, margin: '0 auto' }}>A sample of the designs we've brought to life — from simple logos to complex multi-color artwork.</p>
          </div>
          <div className="products-grid reveal" style={{ marginTop: '2rem' }}>
            {PORTFOLIO.map(({ label, type, stitches, bg }) => (
              <div key={label} style={{ background: bg, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,147,26,0.04) 0px, rgba(200,147,26,0.04) 1px, transparent 1px, transparent 24px)', pointerEvents: 'none' }} />
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: 64, height: 64, border: '2px solid rgba(200,147,26,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', background: 'rgba(200,147,26,0.08)' }}>
                    <span style={{ fontSize: '1.6rem' }}>🧵</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--white)', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{label}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{type}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{stitches}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="pricing-note" style={{ textAlign: 'center' }}>* Portfolio images are representative samples. Real client files are kept confidential.</p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to Get Started?</span>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}>Upload Your Design Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem' }}>
            Send us your artwork and we'll have a machine-ready file back to you in 24 hours or less.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Order Digitizing — From $8</Link>
            <Link to="/vector-conversion" className="btn-outline-light">Need Vector Conversion First?</Link>
          </div>
        </div>
      </section>
    </>
  )
}
