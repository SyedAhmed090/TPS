import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const STEPS = [
  {
    num: '1',
    title: 'Position the patch',
    desc: 'Place your patch face-up on the fabric in the desired position.',
  },
  {
    num: '2',
    title: 'Apply heat & pressure',
    desc: 'Press firmly with a hot iron (cotton setting, no steam) for 30–45 seconds.',
  },
  {
    num: '3',
    title: 'Let it cool, then check',
    desc: 'Allow to cool completely, then test the edges. Re-press if any edges lift.',
  },
]

const PRICING = [
  { qty: 25,   perPatch: '$4.69', total: '$117.25' },
  { qty: 50,   perPatch: '$2.46', total: '$123.00' },
  { qty: 100,  perPatch: '$1.76', total: '$176.00' },
  { qty: 200,  perPatch: '$1.22', total: '$244.00' },
  { qty: 500,  perPatch: '$0.97', total: '$485.00' },
  { qty: 1000, perPatch: '$0.72', total: '$720.00' },
]

const FAQS = [
  {
    q: 'How permanent are iron-on patches?',
    a: 'Heat seal patches are very durable when applied correctly to the right fabric. For maximum permanence, we recommend also sewing around the perimeter. With sewing, iron-on patches can last the lifetime of the garment.',
  },
  {
    q: 'Can I iron patches onto polyester?',
    a: 'Yes, on most polyester fabrics. Test in an inconspicuous area first — some performance polyester fabrics have heat-sensitive treatments. Use a lower heat setting and pressing cloth.',
  },
  {
    q: 'How do I care for garments with iron-on patches?',
    a: 'Wash inside-out on gentle cycle. Avoid harsh chemicals. Tumble dry on low or hang dry. Do not dry clean.',
  },
  {
    q: 'Can iron-on patches be removed?',
    a: 'With effort, yes. Heat the patch again with an iron, then carefully peel while warm. Some adhesive residue may remain — remove with rubbing alcohol.',
  },
  {
    q: 'Do you apply the iron-on backing, or do I?',
    a: 'We apply the professional-grade heat seal adhesive during production. You receive finished patches ready to iron on. No additional materials needed.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button
        className={`faq-question${open ? ' faq-question--open' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        {q}
        <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '1.2rem', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div className={`faq-answer${open ? ' faq-answer--open' : ''}`}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function IronOnPatchesBulk() {
  useReveal()
  useSEO('Bulk Iron-On Patches', 'Order iron-on patches in bulk starting at 25 pieces. Heat seal backing applied by our team. Easy home application. Free quote.')

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Iron-On Patches Bulk' },
      ]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Heat Seal Backing</span>
          <h1>Bulk Iron-On Patches — Starting at 25 Pieces</h1>
          <p>Professional heat seal backing applied in production. Apply to fabric at home with a household iron. Order as few as 25, as many as 10,000+.</p>
        </div>
      </section>

      {/* HOW IRON-ON PATCHES WORK */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }} className="reveal">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">How Iron-On Patches Work</h2>
          </div>
          <p style={{ maxWidth: 680, margin: '0 auto 3rem', textAlign: 'center', fontSize: '1rem', color: 'var(--gray-mid)', lineHeight: 1.75 }} className="reveal">
            Iron-on patches (also called heat seal patches) have a thermally activated adhesive applied to the back during production. When you apply heat — from a household iron or a heat press — the adhesive bonds permanently to the fabric.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="reveal">
            {STEPS.map(s => (
              <div key={s.num} style={{ background: 'var(--cream)', padding: '2rem', textAlign: 'center', borderBottom: '3px solid var(--gold)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.75rem' }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>{s.title}</div>
                <p style={{ fontSize: '0.92rem', color: 'var(--gray-mid)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST FABRICS */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Fabric Compatibility</span>
            <h2 className="section-title">Best Fabrics for Iron-On</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }} className="reveal">
            <div style={{ background: 'var(--white)', padding: '2rem', borderTop: '4px solid #2d7a2d' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2d7a2d', marginBottom: '1rem' }}>Works Great</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Cotton', 'Denim', 'Canvas', 'Twill', 'Wool blends', 'Most polyester'].map(f => (
                  <li key={f} style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(11,26,46,0.06)', fontSize: '0.95rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#2d7a2d', fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--white)', padding: '2rem', borderTop: '4px solid var(--red)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem' }}>Avoid or Test First</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Nylon', 'Waterproof/treated fabrics', 'Genuine leather', 'Very thin fabrics', 'Heat-sensitive synthetics', 'Velvet'].map(f => (
                  <li key={f} style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(11,26,46,0.06)', fontSize: '0.95rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--red)', fontWeight: 700 }}>✗</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ background: 'var(--navy)', color: 'var(--white)', padding: '1.25rem 1.75rem', borderLeft: '4px solid var(--gold)', fontSize: '0.95rem', lineHeight: 1.7 }} className="reveal">
            💡 <strong>Pro Tip:</strong> For best results, also sew around the edges of iron-on patches for permanent attachment. The heat adhesive alone can loosen over multiple washes.
          </div>
        </div>
      </section>

      {/* APPLICATION INSTRUCTIONS */}
      <section style={{ background: 'var(--white)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Step by Step</span>
            <h2 className="section-title">Application Instructions</h2>
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto' }} className="reveal">
            {[
              'Pre-wash your garment without fabric softener — softener leaves a residue that interferes with adhesion.',
              'Set iron to cotton/high heat setting. Do NOT use the steam setting.',
              'Place the patch in the desired position, design-side up.',
              'Cover with a thin pressing cloth or pillowcase (protects the patch).',
              'Press firmly and evenly with the iron. Apply heavy pressure. Hold for 30–45 seconds — don\'t move the iron.',
              'Flip the garment inside out and iron from the back for another 30 seconds.',
              'Allow to cool fully before moving or wearing. Do not pull on edges while warm.',
              'Optional: sew around the perimeter for added durability, especially for high-wear items.',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, background: 'var(--gold)', color: 'var(--navy)', fontFamily: 'var(--font-display)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--gray-mid)', lineHeight: 1.7, paddingTop: '0.4rem' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BULK PRICING TIERS */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Pricing</span>
            <h2 className="section-title light">Bulk Pricing Tiers</h2>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto' }} className="reveal">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: 'var(--gold)' }}>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'left', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.82rem' }}>Quantity</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'right', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.82rem' }}>Per Patch</th>
                  <th style={{ padding: '0.9rem 1.2rem', textAlign: 'right', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.82rem' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {PRICING.map((row, i) => (
                  <tr key={row.qty} style={{ background: i % 2 === 0 ? 'var(--navy-mid)' : 'rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '0.8rem 1.2rem', color: 'var(--white)', fontWeight: 600 }}>{row.qty}</td>
                    <td style={{ padding: '0.8rem 1.2rem', color: 'var(--gold)', textAlign: 'right', fontWeight: 600 }}>{row.perPatch}</td>
                    <td style={{ padding: '0.8rem 1.2rem', color: 'rgba(255,255,255,0.75)', textAlign: 'right' }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              * 3" embroidered patch, 50% coverage, heat seal backing. Prices vary by size and coverage.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Questions</span>
            <h2 className="section-title">Iron-On Patch FAQ</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }} className="reveal">
            {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Order Bulk Iron-On Patches</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Starting at 25 pieces. Professional heat seal backing applied in production.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/pricing" className="btn-outline">View Pricing</Link>
          </div>
        </div>
      </section>
    </>
  )
}
