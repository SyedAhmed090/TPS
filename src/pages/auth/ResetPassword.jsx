import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import useSEO from '../../hooks/useSEO'
import logo from '/logo.jpg'

const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin

export default function ResetPassword() {
  useSEO('Reset Password', 'Reset your The Patch Solutions account password.')
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${SITE_URL}/auth/update-password`,
    })
    if (err) { setError(err.message); setLoading(false) }
    else setSent(true)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <img src={logo} alt="The Patch Solutions" style={{ height: 48, objectFit: 'contain' }} />
        </div>
        <div className="auth-card__title">Reset Password</div>
        <div className="auth-card__sub">Enter your email to receive a reset link.</div>

        {sent ? (
          <div className="auth-success">Reset link sent! Check your email inbox.</div>
        ) : (
          <>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
              </div>
              <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', padding: '0.8rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}

        <div className="auth-link"><Link to="/login">← Back to Sign In</Link></div>
      </div>
    </div>
  )
}
