import { Link } from 'react-router-dom'

/* ══════════════════════════════════════════════════════════════
   SVG ICONS — backing types
══════════════════════════════════════════════════════════════ */

function IconNeedle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="16" />
      <path d="M8 12 Q12 20 16 12" fill="none" />
      <circle cx="12" cy="18" r="2" fill="currentColor" stroke="none" />
      <line x1="10" y1="3.5" x2="14" y2="3.5" />
    </svg>
  )
}

function IconIron() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17 Q3 13 7 13 L19 13 L21 17 Z" />
      <line x1="9" y1="13" x2="9" y2="10" />
      <line x1="9" y1="10" x2="18" y2="10" />
      <line x1="7" y1="19" x2="17" y2="19" />
    </svg>
  )
}

function IconVelcro() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="6" rx="1" />
      <rect x="3" y="13" width="18" height="6" rx="1" />
      <line x1="7" y1="8" x2="7" y2="8" strokeWidth="3" strokeLinecap="round" />
      <line x1="11" y1="8" x2="11" y2="8" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="8" x2="15" y2="8" strokeWidth="3" strokeLinecap="round" />
      <line x1="9" y1="16" x2="9" y2="16" strokeWidth="3" strokeLinecap="round" />
      <line x1="13" y1="16" x2="13" y2="16" strokeWidth="3" strokeLinecap="round" />
      <line x1="17" y1="16" x2="17" y2="16" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function IconSticker() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9 L20 9" strokeDasharray="2 2" />
      <path d="M9 9 L9 20" />
      <path d="M4 14 L9 14" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 L16 8 L14 14 L10 14 L8 8 Z" />
      <line x1="12" y1="14" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
    </svg>
  )
}

function IconMagnet() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 4 L6 13 Q6 18 12 18 Q18 18 18 13 L18 4" />
      <line x1="3" y1="4" x2="9" y2="4" />
      <line x1="15" y1="4" x2="21" y2="4" />
    </svg>
  )
}

function IconPlain() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 3 20 8 20 16 12 21 4 16 4 8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconPlastic() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 L20 7 L20 17 L12 21 L4 17 L4 7 Z" />
      <path d="M12 3 L12 21" strokeDasharray="3 2" />
      <path d="M4 7 L20 7" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════
   SVG PATCH EMBLEMS — for product-type visual panels
══════════════════════════════════════════════════════════════ */

function EmbroideredEmblem() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="3" fill="none" opacity="0.6" />
      <circle cx="80" cy="80" r="58" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" strokeDasharray="6 4" />
      <circle cx="80" cy="80" r="46" stroke="white" strokeWidth="2" fill="none" opacity="0.45" />
      {/* Thread lines pattern */}
      <g stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
        <line x1="58" y1="58" x2="102" y2="102" />
        <line x1="102" y1="58" x2="58" y2="102" />
        <line x1="80" y1="46" x2="80" y2="114" />
        <line x1="46" y1="80" x2="114" y2="80" />
      </g>
      <circle cx="80" cy="80" r="14" fill="white" opacity="0.85" />
      <circle cx="80" cy="80" r="8" fill="none" stroke="rgba(154,120,32,0.9)" strokeWidth="2" />
      {/* Corner star */}
      <polygon points="80,24 83,32 92,32 85,37 88,45 80,40 72,45 75,37 68,32 77,32" fill="white" opacity="0.8" />
    </svg>
  )
}

function WovenEmblem() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="24" y="24" width="112" height="112" rx="8" stroke="white" strokeWidth="2.5" fill="none" opacity="0.5" />
      <rect x="36" y="36" width="88" height="88" rx="4" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" />
      {/* Weave lines horizontal */}
      {[46, 54, 62, 70, 78, 86, 94, 102, 110, 118].map((y, i) => (
        <line key={`h${i}`} x1="36" y1={y} x2="124" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      ))}
      {/* Weave lines vertical */}
      {[46, 54, 62, 70, 78, 86, 94, 102, 110, 118].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="36" x2={x} y2="124" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      ))}
      <rect x="56" y="56" width="48" height="48" rx="4" fill="white" opacity="0.12" />
      <text x="80" y="86" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="Barlow Condensed, Arial Narrow, Arial, sans-serif" opacity="0.9">TPS</text>
    </svg>
  )
}

function PvcEmblem() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Shield shape */}
      <path d="M80 20 L130 44 L130 90 Q130 128 80 148 Q30 128 30 90 L30 44 Z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2.5" />
      <path d="M80 32 L120 52 L120 90 Q120 120 80 136 Q40 120 40 90 L40 52 Z" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1.5" opacity="0.6" />
      {/* Center star */}
      <polygon points="80,56 86,72 104,72 90,82 96,98 80,88 64,98 70,82 56,72 74,72" fill="white" opacity="0.85" />
      {/* Bottom text */}
      <text x="80" y="125" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Barlow Condensed, Arial Narrow, Arial, sans-serif" letterSpacing="4" opacity="0.7">TACTICAL</text>
    </svg>
  )
}

function IronOnEmblem() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Patch outline — rounded rectangle */}
      <rect x="22" y="34" width="116" height="92" rx="12" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.08" />
      <rect x="30" y="42" width="100" height="76" rx="8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="5 3" />
      {/* Heat/iron icon */}
      <path d="M50 100 Q50 88 62 88 L100 88 L108 100 Z" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.2" />
      <line x1="62" y1="88" x2="62" y2="80" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="80" x2="96" y2="80" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Heat waves */}
      <path d="M60 72 Q63 68 66 72 Q69 76 72 72" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M72 72 Q75 68 78 72 Q81 76 84 72" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M84 72 Q87 68 90 72 Q93 76 96 72" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Bottom text */}
      <text x="80" y="118" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Barlow Condensed, Arial Narrow, Arial, sans-serif" letterSpacing="3" opacity="0.75">IRON-ON</text>
    </svg>
  )
}

function LeatherEmblem() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Diamond shape */}
      <polygon points="80,18 142,80 80,142 18,80" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.08" />
      <polygon points="80,32 128,80 80,128 32,80" stroke="white" strokeWidth="1.5" fill="none" opacity="0.45" />
      <polygon points="80,46 114,80 80,114 46,80" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Center monogram */}
      <text x="80" y="88" textAnchor="middle" fill="white" fontSize="28" fontWeight="900" fontFamily="Barlow Condensed, Arial Narrow, Arial, sans-serif" opacity="0.9">TPS</text>
      {/* Corner diamonds */}
      <polygon points="80,22 83,26 80,30 77,26" fill="white" opacity="0.7" />
      <polygon points="80,130 83,134 80,138 77,134" fill="white" opacity="0.7" />
      <polygon points="22,80 26,77 30,80 26,83" fill="white" opacity="0.7" />
      <polygon points="130,80 134,77 138,80 134,83" fill="white" opacity="0.7" />
    </svg>
  )
}

function ChenilleEmblem() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Varsity letter shape */}
      <path d="M40 30 L120 30 L120 50 L90 50 L90 110 L120 110 L120 130 L40 130 L40 110 L70 110 L70 50 L40 50 Z" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2.5" />
      <path d="M46 36 L114 36 L114 50 L84 50 L84 110 L114 110 L114 124 L46 124 L46 110 L76 110 L76 50 L46 50 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
      {/* Dots for chenille texture */}
      {[0, 1, 2, 3, 4].map(row =>
        [0, 1, 2, 3, 4, 5].map(col => (
          <circle
            key={`${row}-${col}`}
            cx={50 + col * 12}
            cy={60 + row * 12}
            r="2.5"
            fill="white"
            opacity="0.35"
          />
        ))
      )}
      <text x="80" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Barlow Condensed, Arial Narrow, Arial, sans-serif" letterSpacing="2" opacity="0.8">VARSITY</text>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

const PATCH_TYPES = [
  {
    id: 1,
    label: 'Most Popular',
    title: 'Embroidered Patches',
    desc: 'The timeless classic. Embroidered patches use colored thread stitched onto a twill or felt base, creating a raised, textured appearance that looks professional on any garment.',
    features: [
      'Available in any color with up to 15 thread colors',
      'Merrow, hot-cut, or laser-cut borders',
      'Works on jackets, hats, bags, and uniforms',
      'Minimum order: 25 patches',
    ],
    bgClass: 'patch-bg-1',
    Emblem: EmbroideredEmblem,
  },
  {
    id: 2,
    label: 'Fine Detail',
    title: 'Woven Patches',
    desc: 'Where precision meets artistry. Woven patches are created on a loom, resulting in much finer detail than embroidered patches — ideal for small text, complex logos, and intricate designs.',
    features: [
      'Captures fine lines and small text perfectly',
      'Thinner and lighter than embroidered',
      'Soft fabric feel',
      'Ideal for fashion and retail applications',
    ],
    bgClass: 'patch-bg-3',
    Emblem: WovenEmblem,
  },
  {
    id: 3,
    label: 'Maximum Durability',
    title: 'PVC / Rubber Patches',
    desc: 'Built for the toughest conditions. PVC patches are molded from soft rubber, making them waterproof, UV-resistant, and virtually indestructible. Perfect for tactical gear, outdoor equipment, and uniforms.',
    features: [
      'Waterproof and weather-resistant',
      '3D raised design elements',
      'Velcro or sew-on backing available',
      'Popular for military and outdoor use',
    ],
    bgClass: 'patch-bg-6',
    Emblem: PvcEmblem,
  },
  {
    id: 4,
    label: 'Easy Application',
    title: 'Iron-On Patches',
    desc: 'The convenient choice for quick application. Our iron-on patches use a heat-activated adhesive backing that bonds permanently to fabric with just an iron — no sewing required.',
    features: [
      'Applies in under 60 seconds with a household iron',
      'Permanent bond on most fabrics',
      'Available in all patch types',
      'Great for DIY customization',
    ],
    bgClass: 'patch-bg-5',
    Emblem: IronOnEmblem,
  },
  {
    id: 5,
    label: 'Premium Feel',
    title: 'Leather Patches',
    desc: 'Elevate your brand with genuine or faux leather patches. Perfect for premium apparel, hats, bags, and corporate gifts — leather patches add a sophisticated, high-end look.',
    features: [
      'Genuine or vegan leather options',
      'Debossed, embossed, or laser-etched designs',
      'Perfect for hats, bags, and premium apparel',
      'Available with sew-on or velcro backing',
    ],
    bgClass: 'patch-bg-2',
    Emblem: LeatherEmblem,
  },
  {
    id: 6,
    label: 'Varsity Style',
    title: 'Chenille Patches',
    desc: 'The iconic varsity letter jacket patch. Chenille patches feature a thick, fuzzy yarn surface that creates a bold, retro look beloved by schools, sports teams, and universities.',
    features: [
      'Thick, plush yarn surface',
      'Classic school and sports aesthetic',
      'Available in school colors',
      'Ideal for letterman jackets',
    ],
    bgClass: 'patch-bg-4',
    Emblem: ChenilleEmblem,
  },
]

const BACKINGS = [
  {
    name: 'Sew-On',
    Icon: IconNeedle,
    desc: 'The classic choice. Attach with thread for a permanent, durable hold on any fabric.',
  },
  {
    name: 'Iron-On',
    Icon: IconIron,
    desc: 'Heat-activated adhesive for quick, tool-free application.',
  },
  {
    name: 'Hook & Loop (Velcro)',
    Icon: IconVelcro,
    desc: 'Removable and reattachable. Popular for military, tactical, and uniforms.',
  },
  {
    name: 'Self-Adhesive',
    Icon: IconSticker,
    desc: 'Peel-and-stick for temporary applications and smooth surfaces.',
  },
  {
    name: 'Pin Back',
    Icon: IconPin,
    desc: 'Add a brooch pin for removable display on clothing and bags.',
  },
  {
    name: 'Magnetic',
    Icon: IconMagnet,
    desc: 'Strong magnets hold the patch without damaging fabric.',
  },
  {
    name: 'No Backing',
    Icon: IconPlain,
    desc: 'For custom framing, display cases, or your own application method.',
  },
  {
    name: 'Plastic Backing',
    Icon: IconPlastic,
    desc: 'Stiff plastic backing adds structure and rigidity to the patch.',
  },
]

/* ══════════════════════════════════════════════════════════════
   PRODUCTS PAGE
══════════════════════════════════════════════════════════════ */

export default function Products() {
  return (
    <>
      {/* ── 1. PAGE HERO ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Products</span>
          <h1>Every Patch Type. One Place.</h1>
          <p>
            We produce 8+ types of custom patches — each crafted to the highest standard.
          </p>
          <Link to="/free-quote" className="btn-gold" style={{ marginTop: '0.5rem' }}>
            Get a Free Quote
          </Link>
        </div>
      </section>

      {/* ── 2. PRODUCT TYPES ─────────────────────────────────────── */}
      <div>
        {PATCH_TYPES.map((patch, index) => {
          const isReverse = index % 2 !== 0
          const { Emblem } = patch
          return (
            <div key={patch.id} className="product-type-section">
              <div className="container">
                <div className={`product-type__layout${isReverse ? ' product-type__layout--reverse' : ''}`}>
                  {/* Text side */}
                  <div>
                    <span className="product-type__label">{patch.label}</span>
                    <h2 className="product-type__title">{patch.title}</h2>
                    <p className="product-type__desc">{patch.desc}</p>
                    <ul className="feature-list">
                      {patch.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <Link to="/free-quote" className="btn-outline">
                      Get a Quote
                    </Link>
                  </div>

                  {/* Visual side */}
                  <div className={`product-type__visual ${patch.bgClass}`}>
                    <Emblem />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── 3. BACKING TYPES ─────────────────────────────────────── */}
      <div className="backings-strip">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Backing Options</span>
            <h2 className="section-title light">Choose Your Perfect Backing</h2>
          </div>
          <div className="backings-grid">
            {BACKINGS.map((backing) => {
              const { Icon } = backing
              return (
                <div key={backing.name} className="backing-card">
                  <div className="backing-card__icon">
                    <Icon />
                  </div>
                  <div className="backing-card__name">{backing.name}</div>
                  <p className="backing-card__desc">{backing.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM CTA ────────────────────────────────────────── */}
      <div className="cta-banner">
        <div className="container">
          <h2 className="section-title light">Not Sure Which Type You Need?</h2>
          <p>
            Our patch experts will guide you to the perfect solution for your project.
          </p>
          <div className="cta-banner__actions">
            <Link to="/free-quote" className="btn-gold">
              Get a Free Quote
            </Link>
            <Link to="/gallery" className="btn-outline-light">
              View Our Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
