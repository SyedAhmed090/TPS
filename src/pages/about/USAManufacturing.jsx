import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const PERKS = [
  {
    icon: '✅',
    title: 'Quality Control',
    desc: 'Every order is inspected at multiple stages before shipping. No patch leaves our facility without passing our quality standards.',
  },
  {
    icon: '🚚',
    title: 'Fast Domestic Shipping',
    desc: 'No international delays. Your patches ship from within the United States to anywhere in the country — fast.',
  },
  {
    icon: '🏛️',
    title: 'Government Compliance',
    desc: 'Our manufacturing process meets Buy American Act requirements, making us a compliant choice for government procurement.',
  },
  {
    icon: '🔒',
    title: 'Secure & Confidential',
    desc: 'Your designs never leave our facility unprotected. We take confidentiality seriously — especially for military and law enforcement customers.',
  },
  {
    icon: '📞',
    title: 'Direct Customer Support',
    desc: "You talk to our real team — real Americans who know patches. No overseas call centers, no chatbots for complex orders.",
  },
  {
    icon: '🏭',
    title: 'No Middlemen',
    desc: 'You work directly with the manufacturer. No broker markup, no quality dilution — just the people who actually make your patches.',
  },
]

const SERVE_ITEMS = [
  { icon: '🎖️', name: 'Military Units' },
  { icon: '🚔', name: 'Law Enforcement' },
  { icon: '🚒', name: 'Fire Departments' },
  { icon: '🏛️', name: 'Government Agencies' },
  { icon: '🎓', name: 'Schools & Universities' },
  { icon: '⚽', name: 'Sports Teams' },
  { icon: '💼', name: 'Businesses' },
  { icon: '🤝', name: 'Non-Profit Organizations' },
]

const ACCORDION_ITEMS = [
  {
    title: 'Thread & Material Standards',
    content:
      'We use premium Madeira and Isacord embroidery threads, which meet ISO quality standards. Our backing materials — twill, felt, PVC compounds — are sourced from US and certified international suppliers and are tested for durability and colorfastness.',
  },
  {
    title: 'Production Quality Control Process',
    content:
      "Every order goes through three quality checkpoints: (1) pre-production design proof review, (2) mid-production sample review for large orders, and (3) final inspection before packaging. Any item that doesn't meet our standards is remade at no charge.",
  },
  {
    title: 'Satisfaction Guarantee Terms',
    content:
      "Every order is backed by our 100% satisfaction guarantee. If you're not satisfied with your patches for any reason, we'll remake them or refund your order — no questions asked. This guarantee has been our standard since day one.",
  },
  {
    title: 'Rush & Standard Production Compliance',
    content:
      "Our rush production options (5–7 business days) maintain the same quality standards as standard production. We never cut corners on quality to meet a deadline — if a rush order can't be fulfilled to our standards, we'll tell you before production begins.",
  },
]

export default function USAManufacturing() {
  useReveal()
  useSEO(
    'USA Manufacturing',
    'The Patch Solutions is an American-owned custom patch manufacturer. Proudly serving military, law enforcement, and organizations since 2000.'
  )

  const [openAccordion, setOpenAccordion] = useState(null)

  return (
    <>
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
          { label: 'USA Manufacturing' },
        ]}
      />

      {/* SECTION 1 — Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">American Made</span>
          <h1>Proudly Made in the USA</h1>
          <p>American-owned, American-operated — serving military, law enforcement, and organizations since 2000.</p>
        </div>
      </section>

      {/* SECTION 2 — Our Story */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <div style={{ flex: '1 1 55%' }}>
              <span className="section-label">Our Story</span>
              <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
                Built in America. Backed by 20 Years.
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--gray-mid)', marginBottom: '1.25rem' }}>
                Founded in 2000, The Patch Solutions has spent over 25 years building relationships with American military units, law enforcement agencies, schools, businesses, and organizations of every size. We are headquartered in the United States and committed to domestic production, quality craftsmanship, and the kind of customer service that only a USA-based team can provide.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--gray-mid)' }}>
                When you order from TPS, you work directly with our production team — no overseas middlemen, no communication delays, no compromises on quality. Your designs are produced here, reviewed here, and shipped directly from our facility to your door.
              </p>
            </div>

            {/* Decorative SVG Badge */}
            <div style={{ flex: '1 1 40%', display: 'flex', justifyContent: 'center' }}>
              <svg
                viewBox="0 0 300 300"
                width="100%"
                style={{ maxWidth: 280 }}
                aria-label="Made in USA badge"
              >
                {/* Outer gold ring */}
                <circle cx={150} cy={150} r={145} fill="none" stroke="var(--gold)" strokeWidth={6} />
                <circle cx={150} cy={150} r={138} fill="var(--navy)" />

                {/* Shield background */}
                <path
                  d="M150,40 L220,75 L220,165 Q220,215 150,245 Q80,215 80,165 L80,75 Z"
                  fill="#1e3a5f"
                  stroke="var(--gold)"
                  strokeWidth={2}
                />

                {/* Blue top of shield */}
                <path
                  d="M150,40 L220,75 L220,130 L80,130 L80,75 Z"
                  fill="#1a3a8f"
                />

                {/* Stars on blue */}
                {[
                  [115, 90], [140, 78], [165, 90], [125, 108], [155, 108],
                  [150, 93],
                ].map(([cx, cy], i) => (
                  <polygon
                    key={i}
                    points={`${cx},${cy - 7} ${cx + 2.5},${cy - 1} ${cx + 7},${cy - 1} ${cx + 3.5},${cy + 3} ${cx + 5},${cy + 8} ${cx},${cy + 5} ${cx - 5},${cy + 8} ${cx - 3.5},${cy + 3} ${cx - 7},${cy - 1} ${cx - 2.5},${cy - 1}`}
                    fill="#fff"
                    opacity={0.9}
                  />
                ))}

                {/* Red and white stripes */}
                {[0, 1, 2, 3, 4].map((stripe) => (
                  <rect
                    key={stripe}
                    x={80}
                    y={130 + stripe * 14}
                    width={140}
                    height={14}
                    fill={stripe % 2 === 0 ? '#B52020' : '#fff'}
                    clipPath="url(#shieldClip)"
                  />
                ))}
                <clipPath id="shieldClip">
                  <path d="M150,40 L220,75 L220,165 Q220,215 150,245 Q80,215 80,165 L80,75 Z" />
                </clipPath>

                {/* USA Text */}
                <text
                  x={150}
                  y={230}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize={32}
                  fill="var(--gold)"
                  letterSpacing={4}
                >
                  USA
                </text>

                {/* Stars around outer ring */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180
                  const cx = 150 + 123 * Math.cos(rad)
                  const cy = 150 + 123 * Math.sin(rad)
                  return (
                    <polygon
                      key={i}
                      points={`${cx},${cy - 5} ${cx + 2},${cy - 1} ${cx + 5},${cy - 1} ${cx + 2.5},${cy + 2} ${cx + 3.5},${cy + 5} ${cx},${cy + 3} ${cx - 3.5},${cy + 5} ${cx - 2.5},${cy + 2} ${cx - 5},${cy - 1} ${cx - 2},${cy - 1}`}
                      fill="var(--gold)"
                      opacity={0.85}
                    />
                  )
                })}

                {/* "MADE IN" text */}
                <text
                  x={150}
                  y={270}
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontSize={11}
                  fill="rgba(200,147,26,0.7)"
                  letterSpacing={3}
                  fontWeight={700}
                >
                  MADE IN
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Why It Matters */}
      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Why It Matters</span>
            <h2 className="section-title">Why USA Manufacturing Makes a Difference</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {PERKS.map((perk) => (
              <div key={perk.title} className="perk-card">
                <div className="perk-icon">{perk.icon}</div>
                <div className="perk-title">{perk.title}</div>
                <div className="perk-desc">{perk.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Who We Serve */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Our Customers</span>
            <h2 className="section-title">Who We Serve</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
            }}
          >
            {SERVE_ITEMS.map((item) => (
              <div
                key={item.name}
                className="serve-card"
                style={{
                  background: 'var(--navy)',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  borderRadius: 4,
                  border: '1px solid rgba(200,147,26,0.15)',
                }}
              >
                <div className="serve-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {item.icon}
                </div>
                <div
                  className="serve-name"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Buy American Callout */}
      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              background: 'var(--navy-mid)',
              border: '2px solid var(--gold)',
              padding: '3rem',
              borderRadius: 4,
              maxWidth: 800,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏛️</div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              Government Procurement Notice
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: 'var(--gold)',
                letterSpacing: '0.04em',
                marginBottom: '1rem',
              }}
            >
              Buy American Act Compliance
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              For federal, state, and military procurement officers — TPS patches are manufactured in the United States and may qualify as compliant domestic products under the Buy American Act.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Need documentation of US manufacturing for your procurement office? We provide manufacturer certification letters on request.
            </p>
            <Link to="/contact" className="btn-gold">
              Request Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Quality Standards Accordion */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Our Standards</span>
            <h2 className="section-title">Quality Standards</h2>
          </div>
          <div
            className="reveal"
            style={{ maxWidth: 740, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {ACCORDION_ITEMS.map((item, i) => {
              const isOpen = openAccordion === i
              return (
                <div
                  key={i}
                  style={{
                    border: '1px solid rgba(200,147,26,0.25)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.1rem 1.25rem',
                      background: isOpen ? 'rgba(200,147,26,0.08)' : 'var(--navy)',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: isOpen ? 'var(--gold)' : 'rgba(255,255,255,0.9)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        color: 'var(--gold)',
                        fontSize: '1rem',
                        flexShrink: 0,
                        transition: 'transform 0.25s ease',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      ▶
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '1.1rem 1.25rem',
                        background: 'rgba(200,147,26,0.04)',
                        borderTop: '1px solid rgba(200,147,26,0.15)',
                        animation: 'fadeIn 0.2s ease',
                      }}
                    >
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #0f2240 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Work With American Makers</span>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>
            Trust Matters. Quality Matters. USA Made.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem' }}>
            Twenty-five years of American craftsmanship behind every patch. Get your free quote today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">
              Get a Free Quote
            </Link>
            <Link to="/contact" className="btn-outline-light">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
