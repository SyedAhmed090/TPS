import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useSEO from '../../hooks/useSEO'
import logo from '/logo-tps.png'

function mapError(msg) {
  if (!msg) return 'Something went wrong. Please try again.'
  if (msg.includes('Invalid login credentials')) return 'Incorrect email or password. Please try again.'
  if (msg.includes('Email not confirmed')) return 'Please check your email and confirm your account first.'
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) return 'Connection error. Please check your internet and try again.'
  return msg
}

export default function Login() {
  useSEO('Sign In', 'Sign in to your The Patch Solutions account.')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/account'

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await signIn(email, password)
    if (err) { setError(mapError(err.message)); setLoading(false) }
    else navigate(from, { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <img src={logo} alt="The Patch Solutions" style={{ height: 48, objectFit: 'contain' }} />
        </div>
        <div className="auth-card__title">Welcome Back</div>
        <div className="auth-card__sub">Sign in to your account</div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus autoComplete="email" />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" style={{ paddingRight: '2.8rem' }} />
              <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-mid)', fontSize: '1rem', padding: 0, lineHeight: 1 }}>
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'right', marginTop: '-0.6rem', marginBottom: '1.2rem' }}>
            <Link to="/auth/reset-password" style={{ fontSize: '0.8rem', color: 'var(--gold)', textDecoration: 'none' }}>Forgot your password?</Link>
          </div>
          <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="auth-link">Don't have an account? <Link to="/signup">Create one →</Link></div>
      </div>
    </div>
  )
}
