import { Link } from 'react-router-dom'

/* ── TPS Emblem SVG ─────────────────────────────────────────── */
function TpsEmblemSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer solid circle */}
      <circle cx="60" cy="60" r="57" stroke="#9A7820" strokeWidth="1.2" fill="none" />

      {/* Dashed spinning ring */}
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="#9A7820"
        strokeWidth="0.8"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.55"
      />

      {/* Inner decorative ring */}
      <circle cx="60" cy="60" r="46" stroke="#9A7820" strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* Text path definition */}
      <defs>
        <path
          id="emblem-ring-path"
          d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
        />
      </defs>

      {/* Circular text */}
      <text fill="#9A7820" fontSize="6.2" fontFamily="Barlow Condensed, Arial Narrow, Arial, sans-serif" fontWeight="700" letterSpacing="4">
        <textPath href="#emblem-ring-path" startOffset="0%">
          THE PATCH SOLUTIONS · CUSTOM PATCHES · BUILT TO LAST ·
        </textPath>
      </text>

      {/* Corner star accents */}
      <g fill="#9A7820" opacity="0.6">
        <polygon points="60,14 61.2,17.5 64.9,17.5 61.9,19.5 63.1,23 60,21 56.9,23 58.1,19.5 55.1,17.5 58.8,17.5" />
      </g>
    </svg>
  )
}

/* ── Trust Bar Icons ─────────────────────────────────────────── */
function IconTruck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function IconGift() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" rx="1" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

/* ── Product card SVG icon ───────────────────────────────────── */
function PatchIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="28" cy="28" r="22" stroke="white" strokeWidth="2.5" fill="none" opacity="0.85" />
      <circle cx="28" cy="28" r="15" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="28" cy="28" r="5" fill="white" opacity="0.9" />
      <line x1="28" y1="6" x2="28" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="28" y1="44" x2="28" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="6" y1="28" x2="12" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="44" y1="28" x2="50" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

/* ── Star rating ─────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="testimonial-stars" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero__bg" aria-hidden="true" />

        {/* decorative rings */}
        <div
          className="home-hero__ring"
          style={{ width: 600, height: 600, right: -160, top: '50%', transform: 'translateY(-50%)' }}
          aria-hidden="true"
        />
        <div
          className="home-hero__ring"
          style={{ width: 400, height: 400, right: -60, top: '50%', transform: 'translateY(-50%)' }}
          aria-hidden="true"
        />

        <div className="container">
          <div className="home-hero__content">
            {/* Text */}
            <div className="home-hero__text">
              <span className="overline">Premium Custom Patches</span>
              <h1 className="home-hero__headline">
                CUSTOM{' '}
                <em>PATCHES.</em>
                <br />
                BUILT TO
                <br />
                LAST.
              </h1>
              <p className="home-hero__sub">
                From military insignia to motorcycle clubs — we craft premium patches that represent
                your identity. Any shape, any size, any design.
              </p>
              <div className="home-hero__actions">
                <Link to="/contact" className="btn btn--gold btn--lg">
                  Get a Free Quote
                </Link>
                <Link to="/gallery" className="btn btn--outline">
                  View Our Gallery
                </Link>
              </div>
            </div>

            {/* Visual — TPS Emblem */}
            <div className="home-hero__visual">
              <div className="tps-emblem" style={{ width: 340, height: 340 }}>
                {/* Spinning outer SVG */}
                <TpsEmblemSvg />

                {/* Static center */}
                <div className="tps-emblem__center">
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
                      fontWeight: 900,
                      fontSize: 32,
                      color: '#FFFFFF',
                      lineHeight: 1,
                      letterSpacing: '0.04em',
                    }}
                  >
                    TPS
                  </span>
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: 8,
                      color: '#9A7820',
                      letterSpacing: 12,
                      textTransform: 'uppercase',
                      marginTop: 6,
                      paddingLeft: 12,
                    }}
                  >
                    THE PATCH SOLUTIONS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ────────────────────────────────────────── */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-bar__grid">
            <div className="trust-item">
              <div className="trust-item__icon"><IconTruck /></div>
              <span className="trust-item__label">Flat-Rate Shipping</span>
            </div>
            <div className="trust-item">
              <div className="trust-item__icon"><IconClock /></div>
              <span className="trust-item__label">Fast Turnaround</span>
            </div>
            <div className="trust-item">
              <div className="trust-item__icon"><IconChat /></div>
              <span className="trust-item__label">Free Quote</span>
            </div>
            <div className="trust-item">
              <div className="trust-item__icon"><IconStar /></div>
              <span className="trust-item__label">Any Shape &amp; Size</span>
            </div>
            <div className="trust-item">
              <div className="trust-item__icon"><IconGift /></div>
              <span className="trust-item__label">Free Sample</span>
            </div>
            <div className="trust-item">
              <div className="trust-item__icon"><IconShield /></div>
              <span className="trust-item__label">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="overline">What We Make</span>
            <h2 className="heading-1">Our Custom Patches</h2>
            <p className="lead">
              From classic embroidered to modern PVC — we produce every patch type with precision
              and care.
            </p>
          </div>

          <div className="grid-4">
            {/* Embroidered */}
            <div className="product-card">
              <div className="product-card__thumb patch-bg-1">
                <PatchIcon />
              </div>
              <div className="product-card__body">
                <div className="product-card__name">Embroidered Patches</div>
                <p className="product-card__desc">
                  The gold standard. Thread-crafted patches with vivid colors and a textured finish.
                </p>
                <Link to="/products" className="product-card__link">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Woven */}
            <div className="product-card">
              <div className="product-card__thumb patch-bg-3">
                <PatchIcon />
              </div>
              <div className="product-card__body">
                <div className="product-card__name">Woven Patches</div>
                <p className="product-card__desc">
                  Finer detail than embroidered — perfect for intricate logos and text.
                </p>
                <Link to="/products" className="product-card__link">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* PVC */}
            <div className="product-card">
              <div className="product-card__thumb patch-bg-6">
                <PatchIcon />
              </div>
              <div className="product-card__body">
                <div className="product-card__name">PVC / Rubber Patches</div>
                <p className="product-card__desc">
                  Durable 3D patches for extreme conditions. Waterproof and bold.
                </p>
                <Link to="/products" className="product-card__link">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Iron-On */}
            <div className="product-card">
              <div className="product-card__thumb patch-bg-5">
                <PatchIcon />
              </div>
              <div className="product-card__body">
                <div className="product-card__name">Iron-On Patches</div>
                <p className="product-card__desc">
                  Heat-applied convenience. No sewing required — bonds permanently to fabric.
                </p>
                <Link to="/products" className="product-card__link">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. STATS ────────────────────────────────────────────── */}
      <section className="section--dark-2">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-item__number">20+</div>
              <div className="stat-item__label">Years in Business</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">50,000+</div>
              <div className="stat-item__label">Patches Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">15+</div>
              <div className="stat-item__label">Patch Types</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">100%</div>
              <div className="stat-item__label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ─────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="overline">Simple Process</span>
            <h2 className="heading-1">From Idea to Patch in 4 Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step">
              <div className="step__number">1</div>
              <div className="step__title">Request a Quote</div>
              <p className="step__desc">
                Tell us your design, size, quantity, and backing type. It's free and fast.
              </p>
            </div>
            <div className="step">
              <div className="step__number">2</div>
              <div className="step__title">Approve Your Design</div>
              <p className="step__desc">
                Our artists send a digital proof. You request changes until it's perfect.
              </p>
            </div>
            <div className="step">
              <div className="step__number">3</div>
              <div className="step__title">We Produce It</div>
              <p className="step__desc">
                Your patches are crafted with premium materials and meticulous attention to detail.
              </p>
            </div>
            <div className="step">
              <div className="step__number">4</div>
              <div className="step__title">Fast Delivery</div>
              <p className="step__desc">
                Patches are packed and shipped with flat-rate shipping to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BROWSE CATEGORIES ────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="overline">Browse By Use</span>
            <h2 className="heading-1">Patches for Every Purpose</h2>
          </div>

          <div className="grid-4">
            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #1a2744, #2d4a8a)' }}
              >
                ★
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Military &amp; Tactical</span>
              </div>
            </div>

            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #1c3a1c, #2d6a2d)' }}
              >
                ⚽
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Sports &amp; Athletics</span>
              </div>
            </div>

            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #2a1a08, #7a3515)' }}
              >
                🏍
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Motorcycle Clubs</span>
              </div>
            </div>

            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #1a1a2e, #2c3e7a)' }}
              >
                ⚖
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Law Enforcement</span>
              </div>
            </div>

            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #3d0b0b, #7a1c1c)' }}
              >
                🎓
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Schools &amp; Scouts</span>
              </div>
            </div>

            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #1f1f1f, #3d3d3d)' }}
              >
                💼
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Corporate &amp; Brand</span>
              </div>
            </div>

            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #2a0a2a, #5a1a5a)' }}
              >
                🤝
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Organizations</span>
              </div>
            </div>

            <div className="category-card">
              <div
                className="category-card__bg"
                style={{ background: 'linear-gradient(135deg, #0a2a2a, #1a5a5a)' }}
              >
                ✦
              </div>
              <div className="category-card__overlay">
                <span className="category-card__name">Custom Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="overline">What Customers Say</span>
            <h2 className="heading-1">Trusted by Thousands</h2>
          </div>

          <div className="grid-3">
            {/* Review 1 */}
            <div className="testimonial-card">
              <Stars />
              <p className="testimonial-text">
                "The quality of our unit patches exceeded expectations. TPS delivered on time and the
                stitching is incredible. Will order again."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">JR</div>
                <div>
                  <div className="testimonial-name">James R., Staff Sergeant</div>
                  <div className="testimonial-role">U.S. Army Unit</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="testimonial-card">
              <Stars />
              <p className="testimonial-text">
                "Ordered team patches for our youth league. Perfect colors, fast shipping, and they
                even sent a free sample before production. Amazing service."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">MC</div>
                <div>
                  <div className="testimonial-name">Maria C.</div>
                  <div className="testimonial-role">Soccer Club Manager</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="testimonial-card">
              <Stars />
              <p className="testimonial-text">
                "Our MC patches look phenomenal. Detailed embroidery, great colors, and the iron-on
                backing made it easy. Highly recommend TPS."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">DH</div>
                <div>
                  <div className="testimonial-name">Derek H.</div>
                  <div className="testimonial-role">Motorcycle Club President</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CTA BANNER ───────────────────────────────────────── */}
      <div className="cta-banner">
        <div className="container">
          <h2 className="heading-1">Ready to Create Your Custom Patch?</h2>
          <p>
            Get a free quote today — no commitment required. Our team responds within 24 hours.
          </p>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn btn--gold btn--lg">
              Get a Free Quote
            </Link>
            <Link to="/gallery" className="btn btn--outline">
              View Our Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
