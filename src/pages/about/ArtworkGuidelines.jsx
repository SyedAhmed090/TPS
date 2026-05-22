import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const FORMATS = [
  {
    ext: 'AI',
    name: 'Adobe Illustrator',
    desc: 'Vector format, fully scalable',
    badge: '✓ PREFERRED',
    tier: 'preferred',
  },
  {
    ext: 'EPS',
    name: 'Encapsulated PostScript',
    desc: 'Vector format, great for production',
    badge: '✓ GREAT',
    tier: 'preferred',
  },
  {
    ext: 'PDF',
    name: 'Portable Document Format',
    desc: 'Vector PDF preferred',
    badge: '✓ GOOD',
    tier: 'preferred',
  },
  {
    ext: 'SVG',
    name: 'Scalable Vector Graphic',
    desc: 'Web-standard vector format',
    badge: '✓ GOOD',
    tier: 'preferred',
  },
  {
    ext: 'PNG',
    name: 'Portable Network Graphic',
    desc: '300 DPI minimum required',
    badge: '⚠ ACCEPTABLE',
    tier: 'acceptable',
  },
  {
    ext: 'JPG/JPEG',
    name: 'JPEG Image',
    desc: '300 DPI minimum, no transparency',
    badge: '⚠ ACCEPTABLE',
    tier: 'acceptable',
  },
  {
    ext: 'PSD',
    name: 'Photoshop Document',
    desc: '300 DPI, layered preferred',
    badge: '⚠ ACCEPTABLE',
    tier: 'acceptable',
  },
  {
    ext: 'DOC/PPT',
    name: 'Word / PowerPoint',
    desc: 'Cannot use for production',
    badge: '✗ NOT ACCEPTED',
    tier: 'rejected',
  },
]

const TIER_STYLES = {
  preferred: {
    border: '#166534',
    bg: 'rgba(22,101,52,0.08)',
    text: '#166534',
    badgeBg: '#166534',
    badgeText: '#fff',
  },
  acceptable: {
    border: '#92400e',
    bg: 'rgba(146,64,14,0.08)',
    text: '#b45309',
    badgeBg: '#92400e',
    badgeText: '#fff',
  },
  rejected: {
    border: '#7f1d1d',
    bg: 'rgba(127,29,29,0.08)',
    text: '#b91c1c',
    badgeBg: '#7f1d1d',
    badgeText: '#fff',
  },
}

const DOS = [
  {
    title: 'Use solid, distinct colors',
    desc: 'Gradients are difficult or impossible to stitch accurately in embroidery',
  },
  {
    title: 'Keep text at minimum 4pt for embroidery',
    desc: "Smaller text won't be legible once stitched",
  },
  {
    title: 'Maintain high contrast between design elements',
    desc: 'This ensures clean, readable patches',
  },
  {
    title: 'Provide PMS/Pantone color codes if exact color matching is needed',
    desc: 'Especially important for brand logos',
  },
  {
    title: 'Separate layers in your vector file if possible',
    desc: 'Makes the digitizing process smoother',
  },
  {
    title: 'Include a reference photo or sketch',
    desc: 'Even alongside a vector file, visual references help our team',
  },
]

const DONTS = [
  {
    title: 'Submit blurry or low-resolution images as your primary artwork',
    desc: "They can't be reproduced accurately",
  },
  {
    title: 'Use more than 15 colors for embroidered patches',
    desc: 'Thread counts have practical limits',
  },
  {
    title: 'Use very thin lines under 1pt',
    desc: 'Fine lines may not stitch cleanly and can blur',
  },
  {
    title: 'Use photographic gradients for embroidered patches',
    desc: 'Embroidery uses thread color blocking, not photo gradients',
  },
  {
    title: 'Submit Word or PowerPoint files',
    desc: "These formats aren't usable for production",
  },
]

const NO_ARTWORK_CARDS = [
  {
    icon: '✏️',
    title: 'Send Us a Sketch',
    desc: "Hand-drawn on paper? No problem. Photograph or scan your sketch and send it along with your quote. Our design team will digitize it for you.",
    btn: 'Submit a Sketch',
    href: '/free-quote',
  },
  {
    icon: '💬',
    title: 'Describe Your Design',
    desc: "Don't have any artwork at all? Just fill out the quote form and describe your patch in detail. We'll create a proof for your approval before production.",
    btn: 'Describe My Design',
    href: '/free-quote',
  },
  {
    icon: '🖼️',
    title: 'Send a Reference Image',
    desc: "Have a logo, photo, or low-res image? Send it as a reference and we'll recreate it in a format suitable for patch production.",
    btn: 'Send a Reference',
    href: '/free-quote',
  },
]

const COLOR_BOXES = [
  {
    title: 'Embroidery Thread Colors',
    text: 'We use Madeira and Isacord thread color systems. Standard orders include up to 8 thread colors. Metallic threads are available for an additional fee. Thread color matching is done visually to your artwork.',
  },
  {
    title: 'PVC / Rubber Colors',
    text: 'PVC patches support full color matching with no thread count limitations. Colors are matched using Pantone references. Gradients and multiple tones are achievable.',
  },
  {
    title: 'Dye Sublimation',
    text: 'Dye sublimation patches support photographic-quality color reproduction — any number of colors, gradients, and photos. CMYK color process.',
  },
]

const SUBMISSION_STEPS = [
  {
    icon: '📤',
    title: 'Upload via Quote Form',
    desc: 'The easiest method. Upload your file directly on the Free Quote form. Accepts files up to 25MB.',
    link: 'Go to Free Quote Form →',
    href: '/free-quote',
  },
  {
    icon: '📧',
    title: 'Email Your File',
    desc: "Send files to info@thepatchsolutions.com with your name and any order reference number. We'll match it to your quote.",
    link: null,
    href: null,
  },
  {
    icon: '🔗',
    title: 'Large Files (25MB+)',
    desc: 'For files over 25MB, use WeTransfer (wetransfer.com) or Google Drive and share the link in your quote form or email.',
    link: null,
    href: null,
  },
]

export default function ArtworkGuidelines() {
  useReveal()
  useSEO(
    'Artwork & File Guidelines',
    "File format requirements and design guidelines for submitting custom patch artwork. Accepted formats, dos and don'ts, and how to submit."
  )

  return (
    <>
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
          { label: 'Artwork & File Guidelines' },
        ]}
      />

      {/* SECTION 1 — Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Submitting Your Design</span>
          <h1>Artwork &amp; File Guidelines</h1>
          <p>Everything you need to know to submit artwork that produces the best possible patch.</p>
        </div>
      </section>

      {/* SECTION 2 — Accepted File Formats */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">What We Can Work With</span>
            <h2 className="section-title">Accepted File Formats</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            {FORMATS.map((fmt) => {
              const styles = TIER_STYLES[fmt.tier]
              return (
                <div
                  key={fmt.ext}
                  style={{
                    border: `2px solid ${styles.border}`,
                    background: styles.bg,
                    padding: '1.25rem',
                    borderRadius: 4,
                    width: 'calc(33.333% - 0.75rem)',
                    minWidth: 180,
                    flex: '1 1 180px',
                    maxWidth: 220,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: styles.text,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {fmt.ext}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem' }}>
                    {fmt.name}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', margin: '0.4rem 0 0.6rem' }}>
                    {fmt.desc}
                  </div>
                  <span
                    style={{
                      background: styles.badgeBg,
                      color: styles.badgeText,
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                    }}
                  >
                    {fmt.badge}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Do's and Don'ts */}
      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Design Best Practices</span>
            <h2 className="section-title">Design Do's and Don'ts</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Do's */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: '#166534',
                  letterSpacing: '0.04em',
                  marginBottom: '1rem',
                }}
              >
                ✅ Do's
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {DOS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: '4px solid #166534',
                      background: '#fff',
                      padding: '0.9rem 1rem',
                      borderRadius: '0 3px 3px 0',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--navy)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Don'ts */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: '#b91c1c',
                  letterSpacing: '0.04em',
                  marginBottom: '1rem',
                }}
              >
                ❌ Don'ts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {DONTS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: '4px solid #b91c1c',
                      background: '#fff',
                      padding: '0.9rem 1rem',
                      borderRadius: '0 3px 3px 0',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--navy)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — What If I Don't Have Artwork? */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">No Artwork? No Problem.</span>
            <h2 className="section-title">What If I Don't Have Artwork?</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {NO_ARTWORK_CARDS.map((card) => (
              <div
                key={card.title}
                style={{
                  background: 'var(--navy)',
                  borderTop: '3px solid var(--gold)',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  borderRadius: '0 0 4px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                  {card.desc}
                </p>
                <Link to={card.href} className="btn-gold" style={{ marginTop: 'auto' }}>
                  {card.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Color Guide */}
      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Thread &amp; Ink Colors</span>
            <h2 className="section-title">Color Matching Guide</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            {COLOR_BOXES.map((box) => (
              <div
                key={box.title}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(11,26,46,0.1)',
                  padding: '1.5rem',
                  borderRadius: 4,
                  borderTop: '3px solid var(--navy)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--navy)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  {box.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.75 }}>{box.text}</p>
              </div>
            ))}
          </div>
          {/* Callout */}
          <div
            className="reveal"
            style={{
              border: '2px solid var(--gold)',
              background: 'rgba(200,147,26,0.06)',
              padding: '1.5rem 2rem',
              borderRadius: 4,
            }}
          >
            <p style={{ color: 'var(--navy)', fontSize: '0.92rem', lineHeight: 1.75, margin: 0 }}>
              💡 <strong>Not sure about your colors?</strong> Just provide PMS/Pantone numbers or describe what you want — we'll match as closely as the production method allows. For exact brand color matching, Pantone references give the most accurate results.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — File Submission Methods */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Getting Your Files to Us</span>
            <h2 className="section-title">File Submission Methods</h2>
          </div>
          <div
            className="reveal"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 680, margin: '0 auto' }}
          >
            {SUBMISSION_STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  background: 'var(--cream)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 4,
                  borderLeft: '4px solid var(--gold)',
                }}
              >
                <div style={{ fontSize: '1.75rem', lineHeight: 1, flexShrink: 0 }}>{step.icon}</div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--navy)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.7, margin: 0 }}>
                    {step.desc}
                  </p>
                  {step.link && (
                    <Link
                      to={step.href}
                      style={{
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--gold)',
                        letterSpacing: '0.08em',
                        textDecoration: 'none',
                      }}
                    >
                      {step.link}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA */}
      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to Start?</span>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>
            Submit Your Artwork Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: 520, margin: '0 auto 2rem' }}>
            Get a free quote and upload your file in one step. Our team reviews every submission within 1 business day.
          </p>
          <Link to="/free-quote" className="btn-gold">
            Get a Free Quote &amp; Upload Your File →
          </Link>
        </div>
      </section>
    </>
  )
}
