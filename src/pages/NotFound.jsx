import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section style={{ background: 'var(--navy)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'rgba(200,147,26,0.15)', lineHeight: 1, marginBottom: '-1rem' }}>404</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--white)', letterSpacing: '0.04em', marginBottom: '1rem' }}>Page Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: 460, margin: '0 auto 2.5rem' }}>
          The page you're looking for doesn't exist. It may have been moved or the URL may be incorrect.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-gold">Back to Home</Link>
          <Link to="/contact" className="btn-outline-light">Contact Us</Link>
        </div>
      </div>
    </section>
  )
}
