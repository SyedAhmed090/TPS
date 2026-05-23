import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import useSEO from '../../hooks/useSEO'
import Breadcrumb from '../../components/Breadcrumb'

export default function ResetPassword() {
  useSEO('Reset Password', 'Reset your The Patch Solutions account password.')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/update-password`,
    })
    setLoading(false)
    if (err) setError(err.message)
    else setSent(true)
  }

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }

  return (
    <>
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/account/login', label: 'Sign In' }, { label: 'Reset Password' }]} />
      <section className="page-hero">
        <div className="container">
          <span className="section-label">My Account</span>
          <h1>Reset Password</h1>
          <p>Enter your email address and we'll send you a reset link.</p>
        </div>
      </section>
      <section className="container" style={{ padding: '4rem 1rem', maxWidth: 480 }}>
        {sent ? (
          <div style={{ background: 'rgba(200,147,26,0.1)', border: '2px solid var(--gold)', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>Email Sent</div>
            <p style={{ color: 'var(--navy)', lineHeight: 1.7 }}>Check <strong>{email}</strong> for a password reset link.</p>
            <Link to="/account/login" style={{ display: 'inline-block', marginTop: '1.25rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700 }}>BACK TO SIGN IN →</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '6px' }}>Email Address *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={inputStyle} />
            </div>
            {error && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <p style={{ textAlign: 'center' }}><Link to="/account/login" style={{ color: 'var(--gray-mid)', fontSize: '0.82rem' }}>← Back to Sign In</Link></p>
          </form>
        )}
      </section>
    </>
  )
}
