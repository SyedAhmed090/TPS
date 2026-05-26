import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useSEO from '../../hooks/useSEO'
import Breadcrumb from '../../components/Breadcrumb'
import { inputStyle, labelStyle } from '../../styles/formStyles'

export default function Login() {
  useSEO('Sign In', 'Sign in to your The Patch Solutions account to track orders and manage your profile.')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await signIn(form.email, form.password)
    if (err) { setError(err.message); setLoading(false) }
    else navigate('/account')
  }

  return (
    <>
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { label: 'Sign In' }]} />
      <section className="page-hero">
        <div className="container">
          <span className="section-label">My Account</span>
          <h1>Sign In</h1>
          <p>Access your orders, proofs, and account information.</p>
        </div>
      </section>
      <section className="container" style={{ padding: '4rem 1rem', maxWidth: 480 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div><label style={labelStyle}>Email *</label><input name="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="your@email.com" style={inputStyle} /></div>
          <div><label style={labelStyle}>Password *</label><input name="password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required style={inputStyle} /></div>
          {error && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <Link to="/account/signup" style={{ color: 'var(--gold)' }}>Create account →</Link>
            <Link to="/account/reset-password" style={{ color: 'var(--gray-mid)' }}>Forgot password?</Link>
          </div>
        </form>
      </section>
    </>
  )
}
