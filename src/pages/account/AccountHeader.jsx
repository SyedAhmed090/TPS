import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function initials(name, email) {
  if (name) {
    const parts = name.trim().split(' ').filter(Boolean)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    return parts[0][0].toUpperCase()
  }
  return (email?.[0] || '?').toUpperCase()
}

function memberSince(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function AccountHeader() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const name = profile?.full_name || ''
  const firstName = name.split(' ')[0] || user?.email?.split('@')[0] || 'there'

  return (
    <div className="account-header">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="account-header__inner">
            <div className="account-avatar">{initials(name, user?.email)}</div>
            <div>
              <div className="account-header__name">Welcome back, {firstName}</div>
              <div className="account-header__meta">
                {profile?.organization || user?.email}
                {profile?.created_at && ` · Member since ${memberSince(profile.created_at)}`}
              </div>
            </div>
          </div>
          <button onClick={handleSignOut} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', cursor: 'pointer', marginTop: '0.25rem', transition: 'all 0.2s' }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
