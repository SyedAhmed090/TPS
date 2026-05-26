import { Link } from 'react-router-dom'

/* ── Data ────────────────────────────────────────────────────── */
const PRICING_FACTORS = [
  {
    id: 1,
    title: 'Patch Size',
    description:
      'Larger patches require more material and thread. Standard sizes range from 2" to 6" and beyond — we accommodate any size.',
  },
  {
    id: 2,
    title: 'Thread Colors & Complexity',
    description:
      'More colors and intricate designs take longer to produce. Simple logos cost less; detailed artwork costs more.',
  },
  {
    id: 3,
    title: 'Order Quantity',
    description:
      'The more you order, the less you pay per patch. Our quantity breaks offer significant savings at 50, 100, 250, and 500+ units.',
  },
]

const PRICING_ROWS = [
  { qty: '25–49',   price: '$3.50–$5.00', turnaround: '12–14 days', notes: 'Standard',        badge: false },
  { qty: '50–99',   price: '$2.50–$3.75', turnaround: '10–12 days', notes: 'Popular Choice',  badge: true  },
  { qty: '100–249', price: '$1.75–$2.50', turnaround: '8–10 days',  notes: 'Best Value',      badge: true  },
  { qty: '250–499', price: '$1.25–$1.75', turnaround: '7–9 days',   notes: '—',               badge: false },
  { qty: '500+',    price: 'Contact Us',  turnaround: '5–7 days',   notes: 'Volume Discount', badge: false },
]

/* ── Icon components ─────────────────────────────────────────── */
function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function IconGift() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" rx="1" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

function IconTruck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function IconPalette() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="10.5" r="2.5" />
      <circle cx="8.5" cy="7.5" r="2.5" />
      <circle cx="6.5" cy="12.5" r="2.5" />
      <path d="M12 22a7 7 0 010-14" />
    </svg>
  )
}

function IconRefresh() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </svg>
  )
}

const INCLUDED_FREE = [
  {
    id: 1,
    title: 'Free Design Proof',
    description: 'Our artists create a digital proof before production starts. Changes are free.',
    Icon: IconCheck,
  },
  {
    id: 2,
    title: 'Free Sample',
    description: 'We create a sample patch and send you high-res photos and a video before you commit to a full order.',
    Icon: IconGift,
  },
  {
    id: 3,
    title: 'Free Shipping Estimate',
    description: 'Get your full shipping cost upfront — no surprise fees at checkout.',
    Icon: IconTruck,
  },
  {
    id: 4,
    title: 'Merrowed Border',
    description: 'Standard merrowed border included at no extra cost.',
    Icon: IconStar,
  },
  {
    id: 5,
    title: 'Color Matching',
    description: 'We match your exact brand colors using industry-standard thread colors.',
    Icon: IconPalette,
  },
  {
    id: 6,
    title: 'Revision Rounds',
    description: "Unlimited design revisions until you're 100% happy with the proof.",
    Icon: IconRefresh,
  },
]

/* ══════════════════════════════════════════════════════════════
   PRICING PAGE
══════════════════════════════════════════════════════════════ */
export default function Pricing() {
  return (
    <>
      {/* ── 1. PAGE HERO ────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <span className="overline">Transparent Pricing</span>
          <h1 className="heading-1">Fair Prices. Premium Quality.</h1>
          <p className="lead">
            No hidden fees, no surprises. Our pricing is based on a few simple factors — and we
            always offer free quotes.
          </p>
        </div>
      </section>

      {/* ── 2. HOW PRICING WORKS ────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="overline">Pricing Factors</span>
            <h2 className="heading-2">What Affects the Price?</h2>
          </div>
          <div className="pricing-factors">
            {PRICING_FACTORS.map((factor) => (
              <div key={factor.id} className="pricing-factor-card">
                <h3>{factor.title}</h3>
                <p>{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. QUANTITY PRICING TABLE ───────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="overline">Quantity Breaks</span>
            <h2 className="heading-2">More Patches, More Savings</h2>
          </div>

          <div className="table-scroll">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Est. Price / Patch</th>
                <th>Turnaround</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_ROWS.map((row) => (
                <tr key={row.qty}>
                  <td>{row.qty}</td>
                  <td>{row.price}</td>
                  <td>{row.turnaround}</td>
                  <td>
                    {row.badge ? (
                      <span className="badge-gold">{row.notes}</span>
                    ) : (
                      row.notes
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <p className="pricing-note">
            * Prices are estimates for standard 3" embroidered patches with up to 8 thread colors.
            Actual pricing depends on size, type, and complexity. Request a free quote for exact
            pricing.
          </p>
        </div>
      </section>

      {/* ── 4. INCLUDED FREE ────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="overline">Always Included</span>
            <h2 className="heading-2">No Hidden Fees</h2>
          </div>
          <div className="grid-3">
            {INCLUDED_FREE.map(({ id, title, description, Icon }) => (
              <div key={id} className="card">
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

      {/* ── 5. CTA BANNER ───────────────────────────────────────── */}
      <div className="cta-banner">
        <div className="container">
          <h2 className="heading-1">Get Your Custom Quote Today</h2>
          <p>
            Send us your design and requirements — we'll respond with a detailed quote within 24
            hours.
          </p>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn btn--gold btn--lg">
              Request Free Quote
            </Link>
            <Link to="/products" className="btn btn--outline btn--lg">
              View Our Products
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
