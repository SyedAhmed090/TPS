import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const RESOURCE_GROUPS = [
  {
    title: 'Getting Started',
    resources: [
      { label: 'How to Order Custom Patches', href: '/about/how-to-order', desc: 'Step-by-step guide to placing your first order with TPS.' },
      { label: 'Free Quote Form', href: '/free-quote', desc: 'Start your order with a free, no-commitment quote request.' },
      { label: 'Frequently Asked Questions', href: '/about/faqs', desc: 'Answers to the most common patch questions.' },
    ],
  },
  {
    title: 'Application Guides',
    resources: [
      { label: 'How to Iron On a Patch', href: '/about/do-it-yourself', desc: 'Complete guide for perfect iron-on application.' },
      { label: 'How to Sew On a Patch', href: '/about/do-it-yourself', desc: 'Hand and machine sewing techniques for patches.' },
      { label: 'Patch Care Instructions', href: '/about/do-it-yourself', desc: 'How to wash and care for patched garments.' },
    ],
  },
  {
    title: 'Product Knowledge',
    resources: [
      { label: 'Patch Backing Types Guide', href: '/patches/backing-types', desc: 'Learn which backing is right for your application.' },
      { label: 'Patch Border Types', href: '/patches/patch-borders', desc: 'Merrowed, die-cut, hot-cut, and laser-cut borders explained.' },
      { label: 'Threads & Twills Guide', href: '/patches/threads-and-twills', desc: 'Understanding thread types and base fabric options.' },
      { label: 'Camo Twill Patches', href: '/patches/threads-and-twills/camo-twill', desc: 'Guide to camouflage base fabric options.' },
    ],
  },
  {
    title: 'Pricing & Policies',
    resources: [
      { label: 'Pricing Overview', href: '/pricing', desc: 'Starting prices for all patch types.' },
      { label: 'Embroidered Patch Price Chart', href: '/pricing/embroidered-patches', desc: 'Detailed price table by size and quantity.' },
      { label: 'Return & Satisfaction Policy', href: '/return-policy', desc: 'Our quality guarantee and what it covers.' },
      { label: 'Privacy Policy', href: '/privacy-policy', desc: 'How we collect and use your information.' },
    ],
  },
  {
    title: 'About TPS',
    resources: [
      { label: 'About The Patch Solutions', href: '/about/custom-patch-company', desc: 'Our story, values, and commitment to quality.' },
      { label: 'Low Minimum Patches', href: '/about/low-minimum-embroidered-patches', desc: 'Why we offer 25-piece minimums.' },
      { label: 'Customer Testimonials', href: '/about/testimonials', desc: 'Reviews from our military, business, and club customers.' },
      { label: 'TPS Blog', href: '/about/blog', desc: 'Guides, tips, and patch industry stories.' },
    ],
  },
]

export default function Resources() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Resources' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Help Center</span>
          <h1>Resources</h1>
          <p>Everything you need to know about custom patches — guides, how-tos, pricing, and more.</p>
        </div>
      </section>

      <section className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {RESOURCE_GROUPS.map(group => (
            <div key={group.title} className="reveal">
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid rgba(11,26,46,0.1)' }}>{group.title}</h2>
              <div className="resources-grid">
                {group.resources.map(r => (
                  <Link key={r.label} to={r.href} className="resource-card">
                    <h3 className="resource-card__title">{r.label}</h3>
                    <p className="resource-card__desc">{r.desc}</p>
                    <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.1em', marginTop: 'auto' }}>READ MORE →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Can't Find What You Need?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Our patch experts are happy to answer any question directly.</p>
          <Link to="/contact" className="btn-outline-light">Contact Us</Link>
        </div>
      </section>
    </>
  )
}
