import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import useSEO from '../../hooks/useSEO'
import logo from '/logo-tps.png'

export default function UpdatePassword() {
  useSEO('Update Password', 'Set a new password for your account.')
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    // Supabase processes the token from the URL hash automatically
    supabase.auth.getSession()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) { setError("Passwords don't match."); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.updateUser({ password })
    if (err) {
      setError(err.message.includes('expired') ? 'Link has expired. Please request a new reset link.' : err.message)
      setLoading(false)
    } else {
      setDone(true)
      setTimeout(() => navigate('/account'), 2000)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <img src={logo} alt="The Patch Solutions" style={{ height: 48, objectFit: 'contain' }} />
        </div>
        <div className="auth-card__title">New Password</div>
        <div className="auth-card__sub">Choose a new password for your account.</div>

        {done ? (
          <div className="auth-success">Password updated! Redirecting to your account…</div>
        ) : (
          <>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>New Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoFocus autoComplete="new-password" />
              </div>
              <div className="auth-field">
                <label>Confirm New Password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required autoComplete="new-password" />
              </div>
              <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', padding: '0.8rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          </>
        )}

        <div className="auth-link"><Link to="/login">← Back to Sign In</Link></div>
      </div>
    </div>
  )
}
