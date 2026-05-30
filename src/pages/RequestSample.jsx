import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Turnstile } from '@marsidev/react-turnstile'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'
import { inputStyle, labelStyle, textareaStyle, fieldErrorStyle } from '../styles/formStyles'
import { useFormSubmit } from '../hooks/useFormSubmit'
import { validateSampleForm } from '../utils/validation'
import { useAuth } from '../contexts/AuthContext'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

const PATCH_TYPES = [
  'Embroidered Patches',
  'Woven Patches',
  'PVC Patches',
  'Chenille Patches',
  'Leather Patches',
  'Dye Sublimation Patches',
]

export default function RequestSample() {
  useSEO('Free Patch Sample Preview', 'Request a free sample from The Patch Solutions. We create your sample patch and send you high-resolution photos and a video — no shipping wait, no commitment required.')
  useReveal()

  const { user, profile } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', notes: '' })
  const [patchTypes, setPatchTypes] = useState([])
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [turnstileToken, setTurnstileToken] = useState('')
  const { submit, loading, submitError } = useFormSubmit('request-sample')

  useEffect(() => {
    if (profile || user) {
      setForm(f => ({
        ...f,
        name: f.name || profile?.full_name || '',
        email: f.email || user?.email || '',
        phone: f.phone || profile?.phone || '',
        company: f.company || profile?.organization || '',
      }))
    }
  }, [profile, user])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function togglePatchType(type) {
    setPatchTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validateSampleForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    const ok = await submit({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      company: form.company || undefined,
      patch_types: patchTypes,
      notes: form.notes || undefined,
      turnstile_token: turnstileToken || undefined,
    })
    if (ok) setSent(true)
  }

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Free Sample Preview' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">100% Free</span>
          <h1>Request a Free Patch Sample</h1>
          <p>We'll create a sample patch and send you high-resolution photos and a video so you can see the quality before placing your full order — no commitment required.</p>
        </div>
      </section>

      <section className="container">
        <div className="quote-layout">
          <div className="reveal">
            {sent ? (
              <div style={{ background: 'rgba(200,147,26,0.1)', border: '2px solid var(--gold)', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>Request Received!</div>
                <p style={{ color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.7 }}>Thank you! We'll create your sample patch and send high-resolution photos and a video directly to your email within a few business days.</p>
                <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem', marginBottom: '2rem' }}>Check your inbox for a confirmation from info@thepatchsolutions.com</p>
                <Link to="/" className="btn-primary">Back to Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>Your Contact Info</h2>
                <div className="fq-grid">
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" style={{ ...inputStyle, borderColor: errors.name ? '#c0392b' : undefined }} />
                    {errors.name && <span style={fieldErrorStyle}>{errors.name}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={{ ...inputStyle, borderColor: errors.email ? '#c0392b' : undefined }} />
                    {errors.email && <span style={fieldErrorStyle}>{errors.email}</span>}
                  </div>
                  <div><label style={labelStyle}>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Company / Org</label><input name="company" value={form.company} onChange={handleChange} placeholder="Optional" style={inputStyle} /></div>
                </div>

                <div>
                  <label style={labelStyle}>Which patch types are you interested in? <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>(select all that apply)</span></label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.25rem' }}>
                    {PATCH_TYPES.map(type => {
                      const active = patchTypes.includes(type)
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => togglePatchType(type)}
                          style={{
                            padding: '0.4rem 1rem',
                            border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(11,26,46,0.25)'}`,
                            background: active ? 'var(--navy)' : 'transparent',
                            color: active ? '#fff' : 'var(--navy)',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.78rem',
                            letterSpacing: '0.06em',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {active ? '✓ ' : ''}{type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Tell Us About Your Project <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>(optional)</span></label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                    placeholder="Patch type, size, quantity, intended use, design details..."
                    style={textareaStyle} />
                </div>

                {submitError && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: 0 }}>{submitError}</p>}
                {TURNSTILE_SITE_KEY && (
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={token => setTurnstileToken(token)}
                    onError={() => setTurnstileToken('')}
                    onExpire={() => setTurnstileToken('')}
                  />
                )}
                <button type="submit"
                  disabled={loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '14px 36px', opacity: (loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)) ? 0.7 : 1, cursor: (loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)) ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Sending...' : 'Request Free Sample'}
                </button>
              </form>
            )}
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--navy)', padding: '2.5rem 2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>What You'll Receive</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'High-resolution photos of your sample patch',
                  'Video showing the finish, texture, and detail',
                  'Available for all 6 patch types we offer',
                  '100% free — no credit card required',
                  'Delivered digitally — no shipping wait',
                ].map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.87rem', lineHeight: 1.65 }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--cream)', padding: '2.5rem 2rem', border: '1px solid rgba(11,26,46,0.1)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.4rem', letterSpacing: '0.04em', marginBottom: '1rem' }}>No Obligation</h3>
              <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                We share samples digitally because we're confident in our quality. See the real finish, stitch detail, and texture before you commit — no purchase required, no sales pressure.
              </p>
              <Link to="/free-quote" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700 }}>
                GET A FREE QUOTE →
              </Link>
            </div>

            <div style={{ background: 'rgba(200,147,26,0.08)', padding: '1.5rem 2rem', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ color: 'var(--navy)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: 'var(--navy)' }}>Worldwide availability.</strong> Because samples are shared digitally, we can serve customers anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
