import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const BENEFITS = [
  { icon: '🎯', title: 'Hand-Digitized, Not Auto-Traced', desc: 'Every design is built stitch-by-stitch by an expert. Auto-conversion tools leave gaps and puckering — we don\'t.' },
  { icon: '🖥️', title: 'All Machine Formats', desc: 'DST, PES, EXP, JEF, XXX, VP3, HUS and more. Whatever machine you run, we have your format covered.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Standard 24-hour delivery. Rush options available in as little as 6 hours for urgent deadlines.' },
  { icon: '🧵', title: 'Thread Color Chart', desc: 'Every file includes a full Madeira, Robison-Anton, or Isacord thread color reference so production can start immediately.' },
  { icon: '🔄', title: 'Free Revisions', desc: 'Not happy with the first pass? We revise until it\'s exactly right — unlimited revisions on the Pro plan.' },
  { icon: '🔒', title: 'Your Files, Your Rights', desc: 'We never share, resell, or reuse your artwork. Every digitized file belongs exclusively to you.' },
]

const STEPS = [
  { num: '01', title: 'Upload Your Artwork', desc: 'Send us your logo or design in any format — PNG, JPG, PDF, AI, EPS, or even a phone photo of a hand-drawn sketch.' },
  { num: '02', title: 'We Digitize It', desc: 'Our digitizers manually convert your design into stitch data, setting pull compensation, underlay, and density for your specific fabric.' },
  { num: '03', title: 'Review the Preview', desc: 'We send a stitch simulation showing exactly how your design will run. Request any changes — we revise until you\'re satisfied.' },
  { num: '04', title: 'Download & Stitch', desc: 'Receive your machine-ready file in your chosen format. Run it on your machine or send it straight to your embroiderer.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '$8',
    sub: 'Up to 5,000 stitches',
    tag: null,
    features: [
      'Single machine format',
      '24-hour turnaround',
      '1 free revision',
      'Standard fill & satin stitches',
    ],
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$15',
    sub: 'Up to 15,000 stitches',
    tag: 'Most Popular',
    features: [
      'All major machine formats',
      '12-hour turnaround',
      '2 free revisions',
      'Full thread color chart',
      'Complex fills, outlines & pull compensation',
    ],
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$25',
    sub: 'Unlimited stitch count',
    tag: null,
    features: [
      'All formats + source file',
      '6-hour rush available',
      'Unlimited revisions',
      '3D puff & specialty stitches',
      'Priority support',
    ],
    highlight: false,
  },
]

const ADDONS = [
  { label: 'Rush Delivery', price: '+$10', desc: 'Move to the front of the queue — guaranteed 6-hour turnaround.' },
  { label: 'Stitch Simulation Video', price: '+$5', desc: 'See your design stitch out in real-time before it hits the machine.' },
  { label: 'Size Variation', price: '+$5 each', desc: 'Same design at a different size, re-optimized for the new dimensions.' },
  { label: 'Bulk Discount', price: '20% off', desc: 'Order 10 or more files at once and save 20% across the board.' },
]

const PORTFOLIO = [
  { label: 'Military Unit Badge', stitches: '8,200 stitches', bg: 'linear-gradient(135deg, #0B1A2E 0%, #1E3258 100%)' },
  { label: 'Corporate Left-Chest', stitches: '4,800 stitches', bg: 'linear-gradient(135deg, #1A2B1A 0%, #2A4028 100%)' },
  { label: 'Sports Cap Logo', stitches: '6,500 stitches', bg: 'linear-gradient(135deg, #2D1B0E 0%, #4A2C1A 100%)' },
  { label: 'MC Back Patch', stitches: '14,300 stitches', bg: 'linear-gradient(135deg, #1A1525 0%, #2D2040 100%)' },
  { label: 'School Mascot', stitches: '11,700 stitches', bg: 'linear-gradient(135deg, #142340 0%, #0B1A2E 100%)' },
  { label: 'Retail Sleeve Logo', stitches: '3,100 stitches', bg: 'linear-gradient(135deg, #251A2D 0%, #3D2A48 100%)' },
]

export default function Digitizing() {
  useReveal()
  useSEO(
    'Embroidery Digitizing Service',
    'Professional embroidery digitizing from $8/file. Hand-digitized — not auto-converted. 24-hour turnaround, all machine formats, unlimited revisions on Pro plans.'
  )

  return (
    <>
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { label: 'Embroidery Digitizing' }]} />

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Design Services</span>
          <h1>Embroidery Digitizing</h1>
          <p>Turn any logo or artwork into a machine-ready embroidery file. Hand-digitized by experts — not auto-converted — for clean, accurate stitching every time.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/free-quote" className="btn-gold">Get Started — From $8</Link>
            <a href="#pricing" className="btn-outline">See Pricing</a>
          </div>
        </div>
      </section>

      {/* WHAT IS DIGITIZING */}
      <section style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div className="story-grid reveal">
            <div>
              <span className="section-label">What Is Digitizing?</span>
              <h2 className="section-title">Your Art, Translated Into Stitches</h2>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Embroidery digitizing converts a flat image or logo into stitch instructions a machine can follow. Every fill direction, underlay layer, pull compensation value, and thread colour is set by hand.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Auto-conversion software exists — but it produces loose paths, skipped stitches, and puckered fabric. Our digitizers build every file from scratch, tuned to your fabric type and stitch count.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8 }}>
                We've produced files for Brother, Tajima, Barudan, Bernina, Janome, Singer, and more. Whatever machine you run, we have your format.
              </p>
            </div>
            <div style={{ background: 'var(--navy)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { stat: '$8', label: 'Starting Price' },
                { stat: '24 hrs', label: 'Standard Turnaround' },
                { stat: '10+', label: 'Machine Formats' },
                { stat: '100%', label: 'Satisfaction Guaranteed' },
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

      {/* BENEFITS */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Why TPS Digitizing</span>
            <h2 className="section-title">Built for Production, Not Just Preview</h2>
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
            <h2 className="section-title light">From File to Finished Stitch</h2>
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
            <p style={{ color: 'var(--gray-mid)', maxWidth: 520, margin: '0 auto' }}>No per-stitch fees. No hidden charges. Every plan includes a stitch simulation before delivery.</p>
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
            <h2 className="section-title">Digitizing Portfolio</h2>
            <p style={{ color: 'var(--gray-mid)', maxWidth: 520, margin: '0 auto' }}>A sample of the designs we've produced — from simple logos to intricate multi-colour artwork.</p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
            {PORTFOLIO.map(({ label, stitches, bg }) => (
              <div key={label} style={{ background: bg, padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 200, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,147,26,0.05) 0px, rgba(200,147,26,0.05) 1px, transparent 1px, transparent 20px)', pointerEvents: 'none' }} />
                <span style={{ fontSize: '2rem', marginBottom: '0.75rem', position: 'relative' }}>🧵</span>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--white)', letterSpacing: '0.06em', marginBottom: '0.3rem', position: 'relative' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative' }}>{stitches}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--gray-mid)', marginTop: '1.25rem' }}>* Representative samples — client files are kept confidential.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to Get Started?</span>
          <h2 className="section-title light" style={{ margin: '0.5rem 0 0.75rem' }}>Upload Your Design Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 460, margin: '0 auto 2rem' }}>Any artwork, any format. Machine-ready file back to you within 24 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Order Digitizing — From $8</Link>
            <Link to="/vector-conversion" className="btn-outline-light">Need Vector Conversion First?</Link>
          </div>
        </div>
      </section>
    </>
  )
}
