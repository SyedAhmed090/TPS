import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const VALUES = [
  { title: 'Quality First', desc: 'Every patch undergoes strict quality control — accurate colors, clean stitching, consistent sizing, and perfect finishing before it leaves our facility.' },
  { title: 'Fair Pricing', desc: 'We believe professional-grade patches shouldn\'t require enterprise-level budgets. Transparent pricing with no hidden fees.' },
  { title: 'Real Service', desc: 'When you call or email us, a real patch expert answers — not a bot, not a call center. Real advice, real accountability.' },
  { title: 'Fast Turnaround', desc: 'Standard orders ship in 10–14 business days. Rush production available for urgent needs.' },
  { title: 'Low Minimums', desc: 'Minimum orders start at just 25 patches — because great organizations of every size deserve access to custom patches.' },
  { title: '100% Guarantee', desc: 'If your patches don\'t match the approved proof, we fix or replace them. No questions, no hassle.' },
]

export default function CustomPatchCompany() {
  useReveal()
  useSEO('Custom Patch Company', 'The Patch Solutions is America\'s trusted custom patch company. Embroidered, woven, PVC, and specialty patches with free proofs and samples.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { label: 'Custom Patch Company' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">About Us</span>
          <h1>Custom Patch Company</h1>
          <p>Who we are, what we stand for, and why thousands of organizations trust The Patch Solutions.</p>
        </div>
      </section>

      <section className="container">
        <div className="detail-layout reveal">
          <div className="detail-img">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="TPS Workshop" />
          </div>
          <div>
            <span className="detail-label">Our Story</span>
            <h2 className="detail-title">The Patch Solutions</h2>
            <p className="detail-desc">
              Founded in 2005, The Patch Solutions is a US-based custom patch manufacturer with over 20 years of experience serving military units, motorcycle clubs, sports teams, schools, law enforcement agencies, businesses, and individual collectors.
            </p>
            <p className="detail-desc">
              We started with a simple idea: high-quality custom patches shouldn't be complicated or overpriced. That idea has guided every decision we've made since — from our pricing model to our production standards to how we treat every customer.
            </p>
            <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Our Commitment</span>
            <h2 className="section-title">The TPS Promise</h2>
          </div>
          <div className="cards-grid-3 reveal">
            {VALUES.map(v => (
              <div key={v.title} style={{ background: 'var(--white)', padding: '2.5rem 2rem', borderTop: '3px solid var(--gold)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Work with Us?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Join thousands of satisfied customers. Get a free quote in minutes.</p>
          <Link to="/contact" className="btn-outline-light">Get a Free Quote</Link>
        </div>
      </section>
    </>
  )
}
