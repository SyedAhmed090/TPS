import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── TPS Story Emblem SVG ────────────────────────────────────── */
function TpsEmblemSvg() {
  return (
    <svg
      viewBox="0 0 160 160"
      width="140"
      height="140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TPS Emblem — Est. 2005"
    >
      {/* Outer ring */}
      <circle cx="80" cy="80" r="74" stroke="rgba(212,175,55,0.85)" strokeWidth="3.5" fill="none" />
      {/* Dashed inner ring */}
      <circle
        cx="80"
        cy="80"
        r="64"
        stroke="rgba(212,175,55,0.4)"
        strokeWidth="1.2"
        strokeDasharray="5 4"
        fill="none"
      />
      {/* Subtle inner ring */}
      <circle cx="80" cy="80" r="54" stroke="rgba(212,175,55,0.2)" strokeWidth="0.8" fill="none" />
      {/* Top star accent */}
      <polygon
        points="80,9 82.2,15.8 89.4,15.8 83.8,20 86,26.8 80,22.6 74,26.8 76.2,20 70.6,15.8 77.8,15.8"
        fill="rgba(212,175,55,0.75)"
      />
      {/* TPS wordmark */}
      <text
        x="80"
        y="93"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', 'Arial Narrow', Arial, sans-serif"
        fontWeight="900"
        fontSize="42"
        fill="rgba(212,175,55,0.92)"
        letterSpacing="3"
      >
        TPS
      </text>
      {/* Established sub-label */}
      <text
        x="80"
        y="115"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', 'Arial Narrow', Arial, sans-serif"
        fontWeight="600"
        fontSize="9"
        fill="rgba(212,175,55,0.5)"
        letterSpacing="7"
      >
        EST. 2005
      </text>
    </svg>
  )
}

/* ── Value card icons ────────────────────────────────────────── */
function IconShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="32"
      height="32"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function IconEye() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="32"
      height="32"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconLightning() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="32"
      height="32"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

/* ── FAQ toggle icon — a + that rotates 45° to become × ──────── */
function PlusIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      width="18"
      height="18"
      aria-hidden="true"
      style={{
        display: 'block',
        flexShrink: 0,
        transition: 'transform 0.25s ease',
        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
      }}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

/* ── Data ────────────────────────────────────────────────────── */
const VALUES = [
  {
    id: 1,
    title: 'Quality First',
    description:
      "Every patch goes through a rigorous QC process before it ships. If it's not perfect, we remake it.",
    Icon: IconShield,
  },
  {
    id: 2,
    title: 'Transparency',
    description: 'No hidden fees, no surprise charges. What we quote is what you pay.',
    Icon: IconEye,
  },
  {
    id: 3,
    title: 'Speed',
    description: 'Industry-leading turnaround times without sacrificing quality.',
    Icon: IconLightning,
  },
]

const STATS = [
  { number: '24hr',    label: 'Quote Response Time'   },
  { number: '50,000+', label: 'Patches Delivered'     },
  { number: '98%',     label: 'Customer Satisfaction' },
  { number: '15+',     label: 'Patch Types Available' },
]

const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Our minimum order is 25 patches per design. For sample orders (1–5 patches), contact us for custom pricing.',
  },
  {
    q: 'How long does production take?',
    a: 'Standard turnaround is 10–14 business days after design approval. Rush orders (5–7 days) are available for an additional fee.',
  },
  {
    q: 'Do you send a sample before production?',
    a: 'Yes! We send a physical pre-production sample for orders over 50 patches. You must approve the sample before we begin full production.',
  },
  {
    q: 'What file format should I submit?',
    a: 'We accept AI, EPS, PDF, PNG (300 DPI+), and PSD files. If you only have a JPG or description, our design team can recreate your artwork for free.',
  },
  {
    q: 'Can I use iron-on backing with any patch type?',
    a: "Iron-on backing is available with embroidered, woven, and chenille patches. It's not recommended for PVC or leather patches.",
  },
  {
    q: 'What is a merrowed border?',
    a: "A merrowed border is the classic zigzag thread edge seen on most embroidered patches. It's included free on all standard shapes. Custom cut edges (die-cut) are available for irregular shapes.",
  },
]

/* ══════════════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════════════ */
export default function About() {
  const [openFaqs, setOpenFaqs] = useState([])

  function toggleFaq(index) {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <>
      {/* ── 1. PAGE HERO ────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <span className="overline">Our Story</span>
          <h1 className="heading-1">Built on Craft. Driven by Quality.</h1>
          <p className="lead">
            The Patch Solutions was founded with one goal: deliver the best custom patches at fair
            prices, every time.
          </p>
        </div>
      </section>

      {/* ── 2. OUR STORY ────────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div className="about-story">

            {/* Visual — Left */}
            <div className="about-story__visual patch-bg-1">
              <TpsEmblemSvg />
            </div>

            {/* Text — Right */}
            <div>
              <span className="overline">EST. 2005</span>
              <h2 className="heading-1">Two Decades of Patch Excellence</h2>

              <p>
                The Patch Solutions was born in 2005 when our founder, a veteran with a passion for
                quality craftsmanship, noticed a gap in the market — too many patch companies
                offering low-quality products at inflated prices.
              </p>
              <p>
                We started small, fulfilling orders for local military units and motorcycle clubs.
                Word spread fast. Our commitment to quality, fast turnaround, and transparent
                pricing set us apart from the competition.
              </p>
              <p>
                Today, TPS serves thousands of clients across the country — from Fortune 500
                companies to youth soccer leagues. Every patch we produce carries the same
                dedication to craft that started us on day one.
              </p>

              <div className="gold-divider" style={{ marginLeft: 0 }} />

              <div
                style={{
                  display: 'flex',
                  gap: '2.5rem',
                  marginTop: '1.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <div className="stat-item">
                  <span className="stat-item__number">10,000+</span>
                  <span className="stat-item__label">Clients Served</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__number">20</span>
                  <span className="stat-item__label">Years in Business</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. VALUES ───────────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="overline">Our Values</span>
            <h2 className="heading-2">Why We Do It This Way</h2>
          </div>
          <div className="values-grid">
            {VALUES.map(({ id, title, description, Icon }) => (
              <div key={id} className="value-card">
                <div className="value-card__icon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STATS (why choose TPS) ───────────────────────────── */}
      <section className="section section--dark-2">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-item__number">{stat.number}</span>
                <span className="stat-item__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ──────────────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="overline">FAQ</span>
            <h2 className="heading-2">Common Questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqs.includes(index)
              return (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question${isOpen ? ' faq-question--open' : ''}`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    {faq.q}
                    <span className="faq-question__icon">
                      <PlusIcon open={isOpen} />
                    </span>
                  </button>
                  <div className={`faq-answer${isOpen ? ' faq-answer--open' : ''}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ───────────────────────────────────────── */}
      <div className="cta-banner">
        <div className="container">
          <h2 className="heading-1">Join Thousands of Satisfied Customers</h2>
          <p>
            Whether you need 25 patches or 5,000, we bring the same care and craftsmanship to every
            order.
          </p>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn btn--gold btn--lg">
              Get a Free Quote
            </Link>
            <Link to="/gallery" className="btn btn--outline btn--lg">
              View Our Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
