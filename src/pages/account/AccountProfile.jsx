import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

function SaveButton({ loading, saved, onClick }) {
  return (
    <button onClick={onClick} className="btn-primary" disabled={loading} style={{ fontSize: '0.85rem', padding: '9px 24px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
      {loading ? 'Saving…' : saved ? 'Saved ✓' : 'Save Changes'}
    </button>
  )
}

function PasswordModal({ onClose }) {
  const [pw, setPw]         = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)
  const [error, setError]   = useState('')

  async function submit(e) {
    e.preventDefault()
    if (pw !== confirm) { setError("Passwords don't match."); return }
    if (pw.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.updateUser({ password: pw })
    if (err) { setError(err.message); setLoading(false) }
    else { setDone(true); setTimeout(onClose, 2000) }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" style={{ maxWidth: 420 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Change Password</h3>
        {done ? (
          <div className="auth-success">Password updated successfully!</div>
        ) : (
          <form onSubmit={submit}>
            {error && <div className="auth-error">{error}</div>}
            <div className="auth-field"><label>New Password</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} required minLength={8} autoFocus /></div>
            <div className="auth-field"><label>Confirm Password</label><input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required /></div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '0.75rem' }}>{loading ? 'Updating…' : 'Update Password'}</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function AccountProfile() {
  const { user, profile, updateProfile, signOut } = useAuth()
  const navigate = useNavigate()

  const [personal, setPersonal] = useState({ full_name: '', phone: '', organization: '' })
  const [address, setAddress]   = useState({ address_line1: '', address_line2: '', city: '', state: '', zip: '', country: 'United States' })
  const [pSaving, setPSaving]   = useState(false)
  const [pSaved, setPSaved]     = useState(false)
  const [aSaving, setASaving]   = useState(false)
  const [aSaved, setASaved]     = useState(false)
  const [showPwModal, setShowPwModal] = useState(false)
  const [signingOut, setSigningOut]   = useState(false)

  useEffect(() => {
    if (profile) {
      setPersonal({ full_name: profile.full_name || '', phone: profile.phone || '', organization: profile.organization || '' })
      setAddress({ address_line1: profile.address_line1 || '', address_line2: profile.address_line2 || '', city: profile.city || '', state: profile.state || '', zip: profile.zip || '', country: profile.country || 'United States' })
    }
  }, [profile])

  async function savePersonal() {
    setPSaving(true)
    await updateProfile(personal)
    setPSaving(false)
    setPSaved(true)
    setTimeout(() => setPSaved(false), 3000)
  }

  async function saveAddress() {
    setASaving(true)
    await updateProfile(address)
    setASaving(false)
    setASaved(true)
    setTimeout(() => setASaved(false), 3000)
  }

  async function globalSignOut() {
    setSigningOut(true)
    await supabase.auth.signOut({ scope: 'global' })
    navigate('/')
  }

  const inputStyle = { background: 'var(--cream)', border: '1px solid rgba(11,26,46,0.15)', color: 'var(--text-dark)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', padding: '0.65rem 0.9rem', outline: 'none', width: '100%', transition: 'border-color 0.2s', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 5 }
  const sectionBox = { background: 'var(--white)', border: '1px solid rgba(11,26,46,0.08)', padding: '1.8rem', marginBottom: '1.5rem' }

  return (
    <div style={{ maxWidth: 640 }}>
      {/* Personal Information */}
      <div style={sectionBox}>
        <div className="account-section__title">Personal Information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>Full Name</label><input value={personal.full_name} onChange={e => setPersonal(p => ({ ...p, full_name: e.target.value }))} style={inputStyle} /></div>
          <div><label style={labelStyle}>Phone</label><input value={personal.phone} onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))} style={inputStyle} placeholder="Optional" /></div>
          <div><label style={labelStyle}>Organization</label><input value={personal.organization} onChange={e => setPersonal(p => ({ ...p, organization: e.target.value }))} style={inputStyle} placeholder="Optional" /></div>
        </div>
        <SaveButton loading={pSaving} saved={pSaved} onClick={savePersonal} />
      </div>

      {/* Shipping Address */}
      <div style={sectionBox}>
        <div className="account-section__title">Shipping Address</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>Address Line 1</label><input value={address.address_line1} onChange={e => setAddress(a => ({ ...a, address_line1: e.target.value }))} style={inputStyle} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>Address Line 2</label><input value={address.address_line2} onChange={e => setAddress(a => ({ ...a, address_line2: e.target.value }))} style={inputStyle} placeholder="Apt, suite, unit (optional)" /></div>
          <div><label style={labelStyle}>City</label><input value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} style={inputStyle} /></div>
          <div><label style={labelStyle}>State</label>
            <select value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="">Select…</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>ZIP Code</label><input value={address.zip} onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))} style={inputStyle} /></div>
          <div><label style={labelStyle}>Country</label><input value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))} style={inputStyle} /></div>
        </div>
        <SaveButton loading={aSaving} saved={aSaved} onClick={saveAddress} />
      </div>

      {/* Security */}
      <div style={sectionBox}>
        <div className="account-section__title">Account Security</div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Email</label>
          <input value={user?.email || ''} disabled style={{ ...inputStyle, background: 'var(--gray-light)', color: 'var(--gray-mid)', cursor: 'not-allowed' }} />
        </div>
        <button onClick={() => setShowPwModal(true)} className="btn-outline" style={{ fontSize: '0.85rem', padding: '8px 20px' }}>Change Password</button>
      </div>

      {/* Danger Zone */}
      <div style={{ ...sectionBox, borderColor: 'rgba(181,32,32,0.2)' }}>
        <div className="account-section__title" style={{ color: 'var(--red)' }}>Danger Zone</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginBottom: '1rem' }}>Signs you out of all devices and browser sessions.</p>
        <button onClick={globalSignOut} disabled={signingOut} style={{ background: 'none', border: '1px solid var(--red)', color: 'var(--red)', fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 18px', cursor: signingOut ? 'not-allowed' : 'pointer', opacity: signingOut ? 0.7 : 1 }}>
          {signingOut ? 'Signing out…' : 'Sign Out of All Devices'}
        </button>
      </div>

      {showPwModal && <PasswordModal onClose={() => setShowPwModal(false)} />}
    </div>
  )
}
