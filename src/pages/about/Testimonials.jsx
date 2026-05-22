import { Link } from 'react-router-dom'
import { TESTIMONIALS } from '../../data/siteData'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: '0.75rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--gold)', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  useReveal()
  useSEO('Testimonials', 'Read what our customers say about The Patch Solutions — military units, sports teams, clubs, and businesses across America.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { label: 'Testimonials' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Customer Reviews</span>
          <h1>What Our Customers Say</h1>
          <p>Don't take our word for it. Thousands of satisfied customers across military, business, sports, and more have trusted TPS with their patches.</p>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container">
          <div className="stats-grid">
          {[{ num: '10,000+', label: 'Happy Customers' }, { num: '4.9/5', label: 'Average Rating' }, { num: '500K+', label: 'Patches Delivered' }, { num: '20+', label: 'Years in Business' }].map(s => (
            <div key={s.label} className="reveal">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', color: 'var(--gold)', letterSpacing: '0.04em', lineHeight: 1 }}>{s.num}</div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5rem' }}>{s.label}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="testimonials-grid reveal">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="testimonial-card">
              <Stars count={t.rating} />
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Join Our Satisfied Customers</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Experience the quality and service that keeps customers coming back.</p>
          <Link to="/contact" className="btn-outline-light">Get a Free Quote</Link>
        </div>
      </section>
    </>
  )
}
