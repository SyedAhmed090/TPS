import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useSEO from '../../hooks/useSEO'
import logo from '/logo-tps.png'

export default function AdminLogin() {
  useSEO('Admin Login')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await signIn(email, password)
    if (err) { setError(err.message); setLoading(false) }
    else navigate('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--navy-mid)', borderTop: '4px solid var(--gold)', padding: '2.5rem 2rem' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#fff', padding: '10px 20px', marginBottom: 12 }}>
            <img src={logo} alt="The Patch Solutions" style={{ height: 44, display: 'block', objectFit: 'contain' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>ADMIN DASHBOARD</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,147,26,0.3)', color: '#fff', padding: '0.65rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,147,26,0.3)', color: '#fff', padding: '0.65rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          {error && <div style={{ color: '#ff6b6b', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ background: 'var(--gold)', color: 'var(--navy)', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.75rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
