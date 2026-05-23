import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import useSEO from '../../hooks/useSEO'
import Breadcrumb from '../../components/Breadcrumb'

export default function SignUp() {
  useSEO('Create Account', 'Create a free account to track your patch orders and manage your profile.')
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.name } },
    })
    setLoading(false)
    if (err) setError(err.message)
    else setDone(true)
  }

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '6px' }

  return (
    <>
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { label: 'Create Account' }]} />
      <section className="page-hero">
        <div className="container">
          <span className="section-label">My Account</span>
          <h1>Create Account</h1>
          <p>Track orders, view design proofs, and manage your profile.</p>
        </div>
      </section>
      <section className="container" style={{ padding: '4rem 1rem', maxWidth: 480 }}>
        {done ? (
          <div style={{ background: 'rgba(200,147,26,0.1)', border: '2px solid var(--gold)', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>Check Your Email</div>
            <p style={{ color: 'var(--navy)', lineHeight: 1.7 }}>We sent a confirmation link to <strong>{form.email}</strong>. Click the link to activate your account.</p>
            <Link to="/account/login" style={{ display: 'inline-block', marginTop: '1.25rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700 }}>BACK TO SIGN IN →</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div><label style={labelStyle}>Full Name *</label><input name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Your name" style={inputStyle} /></div>
            <div><label style={labelStyle}>Email *</label><input name="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="your@email.com" style={inputStyle} /></div>
            <div><label style={labelStyle}>Password *</label><input name="password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Confirm Password *</label><input name="confirm" type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required style={inputStyle} /></div>
            {error && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p style={{ fontSize: '0.82rem', color: 'var(--gray-mid)', textAlign: 'center' }}>
              Already have an account? <Link to="/account/login" style={{ color: 'var(--gold)' }}>Sign in →</Link>
            </p>
          </form>
        )}
      </section>
    </>
  )
}
