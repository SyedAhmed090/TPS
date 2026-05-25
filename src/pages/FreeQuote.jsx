import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const PATCH_TYPES = ['Embroidered', 'Woven', 'PVC', 'Dye Sublimation', 'Felt', 'Leather', 'Chenille', 'Blank', 'Bullion Crest', 'Combination', 'Not Sure']
const BACKING_OPTIONS = ['Iron-On (Heat Seal)', 'Sew-On (Unbacked)', 'Hook & Loop (Velcro)', 'Pin Back', 'Magnetic', 'Self-Stick', 'Not Sure']
const QTY_RANGES = ['25–49', '50–99', '100–249', '250–499', '500–999', '1000–2499', '2500+']

export default function FreeQuote() {
  useSEO('Free Quote', 'Get a free custom patch quote in minutes. No obligation. Free design proof and samples included.')
  const location = useLocation()
  const { user, profile } = useAuth()
  const prefill = location.state?.prefill || {}
  const [hasPrefill, setHasPrefill] = useState(!!location.state?.prefill)
  const [form, setForm] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    phone: '',
    company: profile?.organization || '',
    patchType: prefill.patch_type || '',
    backing: prefill.backing || '',
    quantity: prefill.quantity ? String(prefill.quantity) : '',
    size: prefill.size || '',
    deadline: '',
    message: prefill.notes || '',
  })
  const [sent, setSent] = useState(false)
  const [designFile, setDesignFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  useReveal()

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setSubmitError('')
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('company', form.company)
      formData.append('patch_type', form.patchType)
      formData.append('backing', form.backing)
      formData.append('quantity', form.quantity)
      const notes = [form.message, form.size ? `Size: ${form.size}` : '', form.deadline ? `Needed by: ${form.deadline}` : ''].filter(Boolean).join(' | ')
      formData.append('special_notes', notes)
      if (designFile) formData.append('artwork', designFile)
      const { error } = await supabase.functions.invoke('submit-quote', { body: formData })
      if (error) {
        setSubmitError('Failed to send. Please try again or email us directly at info@thepatchsolutions.com')
      } else {
        if (user) {
          await supabase.from('customers')
            .update({ email: form.email, full_name: form.name, organization: form.company })
            .eq('auth_user_id', user.id)
        }
        setSent(true)
      }
    } catch {
      setSubmitError('Failed to send. Please try again or email us directly at info@thepatchsolutions.com')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1px solid rgba(11,26,46,0.2)',
    background: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    color: 'var(--text-dark)',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.72rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--navy)',
    marginBottom: '6px',
  }

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Free Quote' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">No Commitment</span>
          <h1>Get Your Free Quote</h1>
          <p>Fill out the form below and receive a free custom patch quote within 1 business day — plus a free digital proof showing exactly how your patches will look.</p>
        </div>
      </section>

      <section className="container">
        <div className="quote-layout">
          <div className="reveal">
            {sent ? (
              <div style={{ background: 'rgba(200,147,26,0.1)', border: '2px solid var(--gold)', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>Quote Request Sent!</div>
                <p style={{ color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.7 }}>Thank you! We'll review your request and respond with a detailed quote and free digital proof within 1 business day.</p>
                <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem', marginBottom: '2rem' }}>Check your email (including spam) for our response from info@thepatchsolutions.com</p>
                <Link to="/" className="btn-primary">Back to Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {hasPrefill && (
                  <div className="reorder-banner">
                    <span>♻️ Reordering from a previous order — details pre-filled below. Make any changes and submit.</span>
                    <button type="button" onClick={() => { setHasPrefill(false); setForm(f => ({ ...f, patchType: '', backing: '', quantity: '', size: '', message: '' })) }} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.1em', cursor: 'pointer', textDecoration: 'underline', whiteSpace: 'nowrap' }}>Start fresh instead</button>
                  </div>
                )}
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>Your Contact Info</h2>
                <div className="fq-grid">
                  <div><label style={labelStyle}>Name *</label><input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Company / Org</label><input name="company" value={form.company} onChange={handleChange} placeholder="Optional" style={inputStyle} /></div>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.25rem', marginTop: '0.5rem' }}>Patch Details</h2>
                <div className="fq-grid">
                  <div>
                    <label style={labelStyle}>Patch Type *</label>
                    <select name="patchType" value={form.patchType} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select type...</option>
                      {PATCH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Backing Type</label>
                    <select name="backing" value={form.backing} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select backing...</option>
                      {BACKING_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Quantity *</label>
                    <select name="quantity" value={form.quantity} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select range...</option>
                      {QTY_RANGES.map(q => <option key={q} value={q}>{q} pieces</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Approximate Size</label>
                    <input name="size" value={form.size} onChange={handleChange} placeholder='e.g. 3" × 4"' style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Needed By Date</label>
                    <input name="deadline" type="date" value={form.deadline} onChange={handleChange} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Design Description / Additional Notes</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Describe your design, colors, intended use, and any other details. You can email artwork separately to info@thepatchsolutions.com"
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <div>
                  <label style={labelStyle}>Upload Your Design <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>(optional)</span></label>
                  <label
                    htmlFor="fq-file"
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); setDesignFile(e.dataTransfer.files[0] || null) }}
                    style={{
                      display: 'block',
                      border: `2px dashed ${dragOver ? 'var(--gold)' : 'rgba(11,26,46,0.2)'}`,
                      padding: '1.5rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      background: dragOver ? 'rgba(200,147,26,0.04)' : 'var(--white)',
                    }}
                  >
                    {designFile ? (
                      <div>
                        <div style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: 4, fontSize: '0.9rem' }}>✓ {designFile.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-mid)' }}>{(designFile.size / 1024).toFixed(0)} KB — click to change</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ color: 'var(--gray-mid)', fontSize: '0.9rem', marginBottom: 4 }}>Drag & drop your artwork here</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gold)' }}>or click to browse — AI, EPS, PDF, PNG, JPG, SVG accepted</div>
                      </div>
                    )}
                    <input id="fq-file" type="file" accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg,.psd" onChange={e => setDesignFile(e.target.files[0] || null)} style={{ display: 'none' }} />
                  </label>
                  <p style={{ fontSize: '0.72rem', color: 'var(--gray-mid)', marginTop: 6 }}>Can't attach now? Email artwork to info@thepatchsolutions.com after submitting.</p>
                </div>

                <div>
                  <button type="submit" className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '14px 36px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? 'Sending…' : 'Submit Quote Request'}
                  </button>
                  {submitError && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginTop: '0.75rem' }}>{submitError}</p>}
                </div>
              </form>
            )}
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--navy)', padding: '2.5rem 2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>What Happens Next</h3>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.25rem' }}>
                {['We review your request (within 1 business day)', 'Our art team creates a free digital proof', 'We send you a detailed quote + proof', 'You approve or request changes — free', 'Pay & production begins immediately'].map((s, i) => (
                  <li key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.87rem', lineHeight: 1.65 }}>{s}</li>
                ))}
              </ol>
            </div>

            <div style={{ background: 'var(--cream)', padding: '2.5rem 2rem', border: '1px solid rgba(11,26,46,0.1)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.4rem', letterSpacing: '0.04em', marginBottom: '1rem' }}>Always Included Free</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Digital proof / sample', 'Design revisions', 'Digitizing service', 'Quality inspection', 'Satisfaction guarantee'].map(i => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.87rem', color: 'var(--text-dark)' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--red)', padding: '2.5rem 2rem', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Minimum Order</p>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--white)', letterSpacing: '0.04em', lineHeight: 1 }}>25</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.25rem' }}>patches per design</p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
