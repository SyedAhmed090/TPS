import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'
import PatchCalculator from '../components/PatchCalculator'
import HeroCalculator from '../components/HeroCalculator'

const PRODUCTS = [
  { name: 'Embroidered Patches', slug: 'embroidered-patches', desc: 'Classic, durable, and detailed — the most popular style for uniforms and jackets.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
  { name: 'Woven Patches', slug: 'woven-patches', desc: 'Ultra-fine detail for complex logos and small text with a flat finish.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
  { name: 'PVC Patches', slug: 'pvc-patches', desc: '3D rubber feel, fully waterproof, and built for tough gear and tactical use.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
  { name: 'Dye Sublimation', slug: 'dye-sublimation-patches', desc: 'Photographic color reproduction and sharp gradients — no design limits.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
  { name: 'Chenille Patches', slug: 'chenille-patches', desc: 'Varsity-style raised texture with a classic athletic look and feel.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
  { name: 'Leather Patches', slug: 'leather-patches', desc: 'Premium genuine leather for jackets, bags, hats, and accessories.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
  { name: 'Patch Keychains', slug: 'pvc-patch-keychains', desc: 'PVC and custom patch keychains — perfect merch, gifts, or giveaways.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
  { name: 'Brand Merchandise', slug: 'brand-merchandise', desc: 'Custom branded goods beyond patches — for businesses and organizations.', img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches' },
]

const SERVE = [
  { icon: '🎖️', name: 'Military Units' },
  { icon: '🏍️', name: 'Motorcycle Clubs' },
  { icon: '⚾', name: 'Sports Teams' },
  { icon: '🏫', name: 'Schools' },
  { icon: '⚜️', name: 'Boy & Girl Scouts' },
  { icon: '🚓', name: 'Police Departments' },
  { icon: '🔥', name: 'Fire Departments' },
  { icon: '🏢', name: 'Businesses' },
]

const MARQUEE_ITEMS = [
  'Embroidered Patches','Woven Patches','PVC Patches','Chenille Patches',
  'Leather Patches','Dye Sublimation','Free Samples','Flat-Rate Shipping',
  'Fast Turnaround','Any Shape · Any Size',
]

export default function Home() {
  useReveal()
  useSEO(null, 'Premium custom embroidered, woven, PVC, and specialty patches. Free quotes, fast turnaround, flat-rate shipping since 2000. 25+ years of American craftsmanship.')

  return (
    <>
      <section className="hero">
        <img
          src="/hero-patch.jpg"
          alt=""
          aria-hidden="true"
          className="hero-bg-img"
        />
        <div className="hero-pattern" />
        <div className="hero-accent-left" />
        <div className="hero-shape" />
        <div className="hero-split">
          <div className="hero-inner">
            <p className="hero-eyebrow">Custom Patches Since 2000</p>
            <h1 className="hero-title">Crafted with<br /><span>Precision.</span><br />Worn with Pride.</h1>
            <p className="hero-subtitle">
              From military units to motorcycle clubs, we deliver custom embroidered, woven, PVC, and specialty patches in any shape, any size — backed by 25 years of American craftsmanship.
            </p>
            <div className="hero-btns">
              <Link to="/free-quote" className="btn-primary">Get a Free Quote</Link>
              <Link to="/products" className="btn-outline">View Products</Link>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><span className="trust-num">25+</span><span className="trust-label">Years in Business</span></div>
              <div className="trust-item"><span className="trust-num">100%</span><span className="trust-label">Satisfaction Guarantee</span></div>
              <div className="trust-item"><span className="trust-num">Free</span><span className="trust-label">Samples &amp; Quotes</span></div>
              <div className="trust-item"><span className="trust-num">Flat</span><span className="trust-label">Rate Shipping</span></div>
            </div>
          </div>
          <div className="hero-calc-wrap">
            <HeroCalculator />
          </div>
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>{item}<span className="marquee-dot"> ◆ </span></span>
          ))}
        </div>
      </div>

      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-text reveal">
              <p className="section-label">Why Choose TPS</p>
              <h2 className="section-title">The Standard in Custom Patches</h2>
              <p className="section-subtitle">Since 2000, The Patch Solutions has been the trusted partner for organizations that demand quality, accuracy, and reliability. Based in the USA, we stand behind every patch we produce.</p>
              <span className="since-badge">In Business Since <span>2000</span></span>
            </div>
            <div className="why-perks">
              {[
                { icon: '📦', title: 'Flat-Rate Shipping', desc: 'No surprises at checkout. One simple rate, every order.' },
                { icon: '⚡', title: 'Fast Turnaround', desc: 'Rush and standard options to meet any deadline.' },
                { icon: '🎨', title: 'Free Design Proof', desc: 'Approve every detail before we go into production.' },
                { icon: '✉️', title: 'Free Samples', desc: 'See and feel the quality before committing to your order.' },
                { icon: '📐', title: 'Any Shape & Size', desc: 'Custom die-cut to match your exact artwork or logo.' },
                { icon: '💬', title: 'Free Quote', desc: 'Quick turnaround on quotes — no obligation required.' },
              ].map(({ icon, title, desc }, i) => (
                <div key={title} className={`perk-card reveal reveal-delay-${(i % 4) + 1}`}>
                  <span className="perk-icon">{icon}</span>
                  <p className="perk-title">{title}</p>
                  <p className="perk-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <div className="reveal">
              <p className="section-label">Our Products</p>
              <h2 className="section-title light">Every Patch Type You Need</h2>
            </div>
            <Link to="/products" className="btn-outline reveal">View All Products</Link>
          </div>
          <div className="products-grid reveal">
            {PRODUCTS.map(({ name, slug, desc, img }) => (
              <Link to={`/products/${slug}`} className="product-card" key={name}>
                <div className="product-photo">
                  <img src={img} alt={name} loading="lazy" />
                  <div className="product-photo-overlay" />
                </div>
                <div className="product-info">
                  <p className="product-name">{name}</p>
                  <p className="product-desc">{desc}</p>
                  <span className="product-arrow">Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="serve-section">
        <div className="container">
          <div className="serve-header reveal">
            <p className="section-label">Who We Serve</p>
            <h2 className="section-title">Trusted by Organizations Across America</h2>
            <p className="section-subtitle">From the front lines to the field, our patches represent the people and missions that matter most.</p>
          </div>
          <div className="serve-grid">
            {SERVE.map(({ icon, name }, i) => (
              <div key={name} className={`serve-card reveal reveal-delay-${(i % 4) + 1}`}>
                <span className="serve-icon">{icon}</span>
                <p className="serve-name">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <div className="how-header reveal">
            <p className="section-label">The Process</p>
            <h2 className="section-title light">From Idea to Your Door</h2>
            <p className="section-subtitle light">Four simple steps — that's all it takes to get custom patches that represent your organization exactly the way you want.</p>
          </div>
          <div className="steps-row">
            {[
              { num: '01', title: 'Submit Your Quote', desc: 'Fill out our free quote form with your patch details — size, quantity, and artwork.' },
              { num: '02', title: 'Approve the Proof', desc: 'Our design team creates a digital proof. No production starts until you sign off.' },
              { num: '03', title: 'We Produce It', desc: 'Your patches go into production with our quality-controlled manufacturing process.' },
              { num: '04', title: 'Ships to Your Door', desc: <span>Flat-rate shipping, fast delivery, and 100% satisfaction guaranteed. <Link to="/rush-order" style={{ color: 'var(--gold-light)' }}>Need it faster? Rush production available →</Link></span> },
            ].map(({ num, title, desc }, i) => (
              <div key={num} className={`step reveal reveal-delay-${i + 1}`}>
                <div className="step-num">{num}</div>
                <p className="step-title">{title}</p>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy-mid)', padding: '5.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,147,26,0.03) 0px, rgba(200,147,26,0.03) 1px, transparent 1px, transparent 32px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Instant Estimate</span>
            <h2 className="section-title light">Price Your Custom Patches</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>Select your patch type, size, and quantity for an instant estimate. Get your free official quote to lock in the price.</p>
          </div>
          <div className="reveal">
            <PatchCalculator />
          </div>
        </div>
      </section>

      <div className="guarantee-section">
        <div className="container">
          <div className="guarantee-inner">
            <div className="guarantee-text reveal">
              <p className="section-label">Our Promise</p>
              <h2 className="section-title">100% Satisfaction Guarantee</h2>
              <p>We stand behind every patch we produce. If you're not completely satisfied with your order, we'll make it right — no questions asked. That's been our standard since day one.</p>
            </div>
            <div className="guarantee-badge reveal">
              <p className="badge-main">100%<br />Satisfaction</p>
              <p className="badge-sub">Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      <section className="cta-section">
        <div className="container">
          <p className="section-label reveal">Ready to Get Started?</p>
          <h2 className="section-title reveal">Get Your Custom Patches Today</h2>
          <p className="section-subtitle reveal">Request a free quote and receive a design proof — no commitment required. Patches for every mission, every team, every story.</p>
          <div className="cta-btns reveal">
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/request-samples" className="btn-primary-dark">Request Free Samples</Link>
          </div>
          <div className="cta-perks reveal">
            {['25-piece minimum','Free design proof','Free samples','Flat-rate shipping','100% satisfaction guarantee'].map(p => (
              <span key={p} className="cta-perk">{p}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
