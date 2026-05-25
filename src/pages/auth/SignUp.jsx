import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useSEO from '../../hooks/useSEO'
import logo from '/logo.jpg'

function getStrength(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[0-9]/.test(pw)) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 1) return 'weak'
  if (score === 2 || score === 3) return 'fair'
  return 'strong'
}

function mapError(msg) {
  if (!msg) return 'Something went wrong.'
  if (msg.includes('User already registered') || msg.includes('already been registered')) return 'An account with this email already exists. Sign in instead.'
  if (msg.includes('Password should be at least')) return 'Password must be at least 8 characters.'
  if (msg.includes('Failed to fetch')) return 'Connection error. Please check your internet.'
  return msg
}

export default function SignUp() {
  useSEO('Create Account', 'Create a free account to track your patch orders and quotes.')
  const { signUp } = useAuth()

  const [form, setForm] = useState({ fullName: '', organization: '', email: '', password: '', confirm: '' })
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState(false)
  const [confirmError, setConfirmError] = useState('')

  const strength = form.password ? getStrength(form.password) : null
  const strengthLabel = { weak: 'Weak', fair: 'Fair', strong: 'Strong' }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (name === 'confirm' || name === 'password') {
      const pw = name === 'password' ? value : form.password
      const cf = name === 'confirm' ? value : form.confirm
      setConfirmError(cf && pw !== cf ? "Passwords don't match." : '')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) { setError("Passwords don't match."); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await signUp({ email: form.email, password: form.password, fullName: form.fullName })
    if (err) { setError(mapError(err.message)); setLoading(false) }
    else setSuccess(true)
  }

  if (success) return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ margin: '0 auto 1.2rem' }}>
          <circle cx="28" cy="28" r="28" fill="rgba(200,147,26,0.12)" />
          <path d="M16 28l8 8 16-16" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="auth-card__title">Check Your Email!</div>
        <p style={{ color: 'var(--gray-mid)', marginBottom: '0.5rem' }}>We sent a confirmation link to</p>
        <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>{form.email}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginBottom: '1.5rem' }}>Click the link to activate your account. Check your spam folder if you don't see it.</p>
        <Link to="/login" className="btn-gold" style={{ display: 'block', textAlign: 'center', padding: '0.8rem' }}>Back to Sign In</Link>
      </div>
    </div>
  )

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <img src={logo} alt="The Patch Solutions" style={{ height: 48, objectFit: 'contain' }} />
        </div>
        <div className="auth-card__title">Create Your Account</div>
        <div className="auth-card__sub">Track orders, reorder fast, save your details.</div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Full Name *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required autoFocus />
          </div>
          <div className="auth-field">
            <label>Organization / Company</label>
            <input name="organization" value={form.organization} onChange={handleChange} placeholder="Optional" />
          </div>
          <div className="auth-field">
            <label>Email Address *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
          </div>
          <div className="auth-field">
            <label>Password *</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" />
            {form.password && (
              <>
                <div className={`password-strength ${strength}`} />
                <div className="password-strength-label">{strengthLabel[strength]} password</div>
              </>
            )}
          </div>
          <div className="auth-field">
            <label>Confirm Password *</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required autoComplete="new-password" />
            {confirmError && <div className="auth-field__error">{confirmError}</div>}
          </div>

          <div style={{ background: 'var(--cream)', padding: '0.9rem 1rem', marginBottom: '1.2rem' }}>
            {['Track your quotes and orders', 'Reorder with one click', 'Save your shipping details', 'Get order status updates'].map(b => (
              <div key={b} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-dark)', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>{b}
              </div>
            ))}
          </div>

          <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-link">Already have an account? <Link to="/login">Sign In →</Link></div>
      </div>
    </div>
  )
}
