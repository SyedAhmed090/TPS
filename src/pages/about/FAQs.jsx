import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Our minimum order is 25 patches per design. This applies to embroidered, woven, PVC, chenille, leather, and most other patch types. Some specialty products like bullion crests may have different minimums — contact us for details.',
  },
  {
    q: 'How do I submit my artwork?',
    a: 'We accept vector files (AI, EPS, PDF, SVG) for best results, but we also accept raster files (PNG, JPG, PSD) at high resolution (300 DPI minimum). Hand sketches and rough ideas are welcome too — our art team can digitize and refine your design.',
  },
  {
    q: 'Do you provide a proof before production?',
    a: 'Yes — every order includes a free digital proof (digitizing sample) before production begins. You\'ll see exactly how your design will look as a patch and can request revisions before we proceed. No patches are produced without your written approval.',
  },
  {
    q: 'What is the standard turnaround time?',
    a: 'Standard production turnaround is 10–14 business days after proof approval. Rush production (5–7 days) is available for an additional fee. Shipping time adds 2–5 days depending on your location and shipping method selected.',
  },
  {
    q: 'What backing types do you offer?',
    a: 'We offer iron-on (heat seal), sew-on (unbacked), hook & loop (Velcro), pin back, magnetic, plastic backing, and self-stick adhesive. Most patch types are available with any backing. Visit our Backing Types page for details on each option.',
  },
  {
    q: 'Can you match specific Pantone or PMS colors?',
    a: 'Yes. We offer PMS color matching for embroidered and woven patches. Provide the PMS color numbers with your order and we\'ll match as closely as possible with available thread colors. Note that thread colors are an approximation of Pantone — minor variation is normal.',
  },
  {
    q: 'Do you offer rush production?',
    a: 'Yes — rush production is available for most patch types. Rush orders (5–7 day production) are subject to a surcharge. Contact us before placing a rush order to confirm availability for your specific patch type and quantity.',
  },
  {
    q: 'What if my patches don\'t look like the approved proof?',
    a: 'We stand behind our quality with a 100% satisfaction guarantee. If your patches don\'t match the approved proof in terms of design accuracy or quality, we will fix or replace them at no charge. Simply contact us within 30 days of delivery.',
  },
  {
    q: 'Do you offer bulk discounts?',
    a: 'Yes — pricing decreases as quantity increases. Significant volume discounts apply at 100, 250, 500, and 1000+ units per design. Contact us for a volume quote or visit our Pricing page for standard embroidered patch pricing tiers.',
  },
  {
    q: 'Can I order patches in multiple designs on the same order?',
    a: 'Absolutely. You can order multiple designs in a single order — the 25-piece minimum applies per design, not per order. Combine any number of designs in one purchase.',
  },
  {
    q: 'What file format do you need for my artwork?',
    a: 'Vector files (AI, EPS, PDF) are preferred as they scale without quality loss. High-res raster files (PNG, JPG at 300 DPI minimum) are also accepted. If you only have a low-res image, our art team can recreate your design as a vector — contact us for a digitizing quote.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes — we ship worldwide. International shipping rates and delivery times vary by destination. Contact us for international shipping quotes before placing your order.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button className={`faq-question${open ? ' faq-question--open' : ''}`} onClick={() => setOpen(v => !v)}>
        {q}
        <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '1.2rem', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div className={`faq-answer${open ? ' faq-answer--open' : ''}`}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function FAQs() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { label: 'FAQs' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Help Center</span>
          <h1>Frequently Asked Questions</h1>
          <p>Answers to the most common questions about ordering, production, artwork, shipping, and more.</p>
        </div>
      </section>

      <section className="container">
        <div style={{ maxWidth: 800, margin: '0 auto' }} className="reveal">
          {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Still Have Questions?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Our patch experts are standing by to answer any question — no question too big or too small.</p>
          <Link to="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </section>
    </>
  )
}
