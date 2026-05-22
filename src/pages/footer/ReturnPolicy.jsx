import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const SECTIONS = [
  {
    title: 'Our Satisfaction Guarantee',
    content: 'The Patch Solutions stands behind every patch we produce. If your order does not match the approved digital proof in terms of design accuracy, color accuracy, or quality, we will remake your order at no charge. Your satisfaction is our top priority.',
  },
  {
    title: 'What\'s Covered',
    content: 'Our guarantee covers: patches that do not match the approved proof design, significant color deviations from approved proof colors, manufacturing defects such as loose threads, uneven stitching, or damaged borders, and incorrect quantities. Issues must be reported within 30 days of delivery.',
  },
  {
    title: 'What\'s Not Covered',
    content: 'Our guarantee does not cover: design errors that were present in and approved by you in the digital proof, changes to your design after proof approval, patches that have been altered, washed, or applied, normal color variation that is minor and within industry standards, or orders where the original design had limitations that were noted in the proof.',
  },
  {
    title: 'How to File a Claim',
    content: 'Contact us at info@thepatchsolutions.com within 30 days of delivery. Include your order number, a clear description of the issue, and photos of the affected patches alongside your approved proof. Our team will review your claim within 2 business days and provide resolution options.',
  },
  {
    title: 'Custom Product Policy',
    content: 'Because all patches are custom-manufactured to your specifications, we do not accept returns for patches that were produced exactly as approved. Custom products cannot be restocked or resold. If you\'re unsatisfied and your issue is covered under our guarantee, we will remake your order.',
  },
  {
    title: 'Cancellation Policy',
    content: 'Orders may be cancelled prior to proof approval with a full refund. After proof approval and payment, production begins immediately and cancellations are not possible. Rush orders cannot be cancelled after proof approval.',
  },
]

export default function ReturnPolicy() {
  useReveal()
  useSEO('Return Policy', 'Return and satisfaction policy for The Patch Solutions — 100% satisfaction guaranteed on all custom patch orders.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Return Policy' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Quality Guarantee</span>
          <h1>Return &amp; Satisfaction Policy</h1>
          <p>We stand behind every patch we make. If something isn't right, we'll make it right — guaranteed.</p>
        </div>
      </section>

      <section className="container">
        <div className="prose reveal">
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Have a Problem with Your Order?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Contact our team and we'll make it right — fast.</p>
          <Link to="/contact" className="btn-primary">Contact Support</Link>
        </div>
      </section>
    </>
  )
}
