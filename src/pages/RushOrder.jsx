import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'

const TURNAROUND_CARDS = [
  {
    badge: 'MOST POPULAR',
    badgeBg: 'var(--gold)',
    badgeText: 'var(--navy)',
    headline: 'Standard',
    time: '10–14 Business Days',
    surcharge: 'No surcharge',
    available: 'All patch types',
    bestFor: 'Planned orders, bulk quantities, non-urgent requests',
    items: ['✓ No extra charge', '✓ All patch types available', '✓ Full QC process'],
    border: 'var(--gold)',
  },
  {
    badge: 'FAST',
    badgeBg: '#1d4ed8',
    badgeText: '#fff',
    headline: 'Rush',
    time: '5–7 Business Days',
    surcharge: 'Rush surcharge applies',
    available: 'Embroidered, PVC, Woven',
    bestFor: 'Events, last-minute orders, time-sensitive projects',
    items: ['✓ Expedited production', '✓ Same quality standards', '✓ Most patch types'],
    border: '#1d4ed8',
  },
  {
    badge: 'URGENT',
    badgeBg: 'var(--red)',
    badgeText: '#fff',
    headline: 'Super Rush',
    time: '3–4 Business Days',
    surcharge: 'Call for pricing — limited availability',
    available: 'Embroidered patches only',
    bestFor: 'True emergencies, mission-critical deadlines',
    items: ['✓ Fastest available', '⚠ Limited slots', '⚠ Call to confirm availability'],
    border: 'var(--red)',
  },
]

const CHECKLIST_ITEMS = [
  'Final approved artwork (vector file preferred — AI, EPS, SVG, PDF)',
  'Exact quantity confirmed',
  'Patch type, size, and shape selected',
  'Backing type chosen (hook & loop, heat seal, sew-on, etc.)',
  'Shipping address and deadline date ready',
  'Payment method ready to go',
]

const FAQ_ITEMS = [
  {
    question: 'What qualifies as a rush order?',
    answer:
      "Any order where you need production completed in under 10 business days qualifies for rush pricing. When you submit your quote, select your target ship date and we'll confirm availability and any applicable surcharge.",
  },
  {
    question: 'Can I rush any patch type?',
    answer:
      'Rush (5–7 days) is available for embroidered, PVC, and woven patches. Super Rush (3–4 days) is available for embroidered patches only. Chenille, leather, and bullion crest patches require standard lead times.',
  },
  {
    question: 'How do I request a rush order?',
    answer:
      "Submit a free quote request and mention your deadline in the notes field. Select 'Rush' as your production option. Our team will confirm availability and the exact surcharge within a few hours during business hours.",
  },
  {
    question: 'Is there a minimum order for rush?',
    answer:
      'Rush orders have the same 25-piece minimum as standard orders. However, for Super Rush orders, we recommend 100+ pieces minimum for the most efficient production run.',
  },
  {
    question: 'What if my deadline is less than 3 business days away?',
    answer:
      "Contact us directly at 1-800-PATCHES (1-800-728-2437) or via our contact form. Explain your situation — if we have open production slots, we'll do everything we can to help. We can't guarantee sub-3-day turnaround but we always try.",
  },
]

function getBasePrice(qty, type) {
  if (type === 'embroidered') {
    if (qty <= 50) return 2.36
    if (qty <= 100) return 1.66
    return 0.87
  }
  return 2.0
}

export default function RushOrder() {
  useReveal()
  useSEO(
    'Rush Order Patches',
    'Need custom patches fast? We offer rush production in 3–7 business days. Get a rush order quote today.'
  )

  const [openFaq, setOpenFaq] = useState(null)

  // Estimator state
  const [qty, setQty] = useState(100)
  const [patchType, setPatchType] = useState('embroidered')
  const [turnaround, setTurnaround] = useState('standard')

  const surchargeRate = turnaround === 'rush' ? 0.15 : turnaround === 'super' ? 0.3 : 0
  const basePrice = getBasePrice(qty, patchType)
  const baseTotal = basePrice * qty
  const surchargeAmt = baseTotal * surchargeRate
  const totalLow = (baseTotal + surchargeAmt) * 0.9
  const totalHigh = (baseTotal + surchargeAmt) * 1.1

  return (
    <>
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { label: 'Rush Order Patches' },
        ]}
      />

      {/* SECTION 1 — Hero */}
      <section
        className="page-hero"
        style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, var(--navy) 60%)' }}
      >
        <div className="container">
          <span className="section-label" style={{ color: '#fca5a5' }}>
            Fast Turnaround
          </span>
          <h1>Rush Order Patches</h1>
          <p>Need patches in a hurry? Expedited production for time-sensitive orders. Fast doesn't mean cutting corners.</p>
        </div>
      </section>

      {/* SECTION 2 — Turnaround Options */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Choose Your Speed</span>
            <h2 className="section-title">Turnaround Options</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {TURNAROUND_CARDS.map((card) => (
              <div
                key={card.headline}
                style={{
                  background: 'var(--navy)',
                  border: `1px solid ${card.border}`,
                  padding: '2rem',
                  borderRadius: 4,
                  position: 'relative',
                  paddingTop: '3rem',
                }}
              >
                {/* Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: card.badgeBg,
                    color: card.badgeText,
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '3px 10px',
                    borderRadius: 12,
                  }}
                >
                  {card.badge}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: '#fff',
                    letterSpacing: '0.04em',
                    marginBottom: '0.25rem',
                  }}
                >
                  {card.headline}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    color: 'var(--gold)',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                  }}
                >
                  {card.time}
                </div>

                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '0.35rem',
                  }}
                >
                  <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Surcharge:</strong> {card.surcharge}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '0.35rem',
                  }}
                >
                  <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Available on:</strong> {card.available}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Best for:</strong> {card.bestFor}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {card.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '0.82rem',
                        color: item.startsWith('✓') ? 'rgba(255,255,255,0.8)' : 'rgba(255,200,50,0.75)',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Rush Fee Estimator */}
      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Quick Estimate</span>
            <h2 className="section-title">Rush Fee Estimator</h2>
          </div>
          <div
            className="reveal"
            style={{
              background: 'rgba(200,147,26,0.08)',
              border: '1px solid rgba(200,147,26,0.3)',
              padding: '2rem',
              borderRadius: 4,
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              {/* Quantity */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    color: 'var(--navy)',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                  }}
                >
                  Quantity
                </label>
                <input
                  type="number"
                  value={qty}
                  min={25}
                  onChange={(e) => setQty(Math.max(25, parseInt(e.target.value) || 25))}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    border: '1px solid rgba(11,26,46,0.2)',
                    borderRadius: 3,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    color: 'var(--navy)',
                    background: '#fff',
                  }}
                />
              </div>

              {/* Patch Type */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    color: 'var(--navy)',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                  }}
                >
                  Patch Type
                </label>
                <select
                  value={patchType}
                  onChange={(e) => setPatchType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    border: '1px solid rgba(11,26,46,0.2)',
                    borderRadius: 3,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    color: 'var(--navy)',
                    background: '#fff',
                  }}
                >
                  <option value="embroidered">Embroidered</option>
                  <option value="pvc">PVC</option>
                  <option value="woven">Woven</option>
                </select>
              </div>

              {/* Turnaround */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    color: 'var(--navy)',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                  }}
                >
                  Turnaround
                </label>
                <select
                  value={turnaround}
                  onChange={(e) => setTurnaround(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    border: '1px solid rgba(11,26,46,0.2)',
                    borderRadius: 3,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    color: 'var(--navy)',
                    background: '#fff',
                  }}
                >
                  <option value="standard">Standard (10–14 days)</option>
                  <option value="rush">Rush 5–7 days (+15%)</option>
                  <option value="super">Super Rush 3–4 days (+30%)</option>
                </select>
              </div>
            </div>

            {/* Result */}
            <div
              style={{
                background: 'var(--navy)',
                padding: '1.25rem 1.5rem',
                borderRadius: 4,
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.9rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.03em',
                  marginBottom: '0.25rem',
                }}
              >
                Estimated order: ${totalLow.toFixed(2)} – ${totalHigh.toFixed(2)}
              </div>
              {surchargeAmt > 0 && (
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: '#fca5a5' }}>
                  Rush surcharge: ${surchargeAmt.toFixed(2)}
                </div>
              )}
            </div>

            <p style={{ fontSize: '0.75rem', color: 'rgba(11,26,46,0.55)', marginBottom: '1.25rem' }}>
              * Final rush fee confirmed at time of quote. Estimates are approximate.
            </p>

            <Link to="/free-quote" className="btn-gold" style={{ display: 'inline-block' }}>
              Get Rush Quote Now →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Rush Order Checklist */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Be Prepared</span>
            <h2 className="section-title">Rush Order Checklist</h2>
            <p
              style={{
                color: 'var(--gray-mid)',
                maxWidth: 520,
                margin: '0.75rem auto 0',
                fontSize: '0.95rem',
              }}
            >
              To process your rush order as fast as possible, have these ready:
            </p>
          </div>
          <div
            className="reveal"
            style={{
              maxWidth: 640,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {CHECKLIST_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'var(--cream)',
                  padding: '1rem 1.25rem',
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: 'var(--navy)',
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--navy)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Rush FAQ Accordion */}
      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal">
            <span className="section-label">Common Questions</span>
            <h2 className="section-title">Rush Order FAQ</h2>
          </div>
          <div
            className="reveal"
            style={{ maxWidth: 740, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  style={{
                    border: '1px solid rgba(11,26,46,0.12)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: '#fff',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.1rem 1.25rem',
                      background: isOpen ? 'rgba(200,147,26,0.06)' : '#fff',
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
                        color: 'var(--navy)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      style={{
                        color: 'var(--gold)',
                        fontSize: '0.9rem',
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
                        padding: '1rem 1.25rem',
                        borderTop: '1px solid rgba(11,26,46,0.08)',
                        background: 'rgba(200,147,26,0.03)',
                      }}
                    >
                      <p style={{ color: 'var(--gray-mid)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Urgency CTA */}
      <section style={{ background: 'var(--red)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>
            Don't Wait — Rush Slots Fill Up Fast
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Call us: <strong>1-800-PATCHES (1-800-728-2437)</strong>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
            Or submit a rush quote request online and we'll respond within hours.
          </p>
          <Link
            to="/free-quote"
            className="btn-outline-light"
            style={{ fontSize: '1rem', padding: '0.85rem 2.5rem' }}
          >
            Submit Rush Quote Request →
          </Link>
        </div>
      </section>
    </>
  )
}
