import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Turnstile } from '@marsidev/react-turnstile'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { inputStyle, labelStyle, selectStyle, textareaStyle, fieldErrorStyle } from '../styles/formStyles'
import { useFormSubmit } from '../hooks/useFormSubmit'
import { validateQuoteForm } from '../utils/validation'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

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
  const [errors, setErrors] = useState({})
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(null)
  const [discountLoading, setDiscountLoading] = useState(false)
  const [discountError, setDiscountError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const { submit, loading, submitError } = useFormSubmit('submit-quote')
  useReveal()

  // Fill in contact fields once the auth profile is available
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

  async function applyDiscount() {
    if (!discountCode.trim()) return
    setDiscountLoading(true)
    setDiscountError('')
    const { data, error } = await supabase.functions.invoke('validate-discount', { body: { code: discountCode.trim().toUpperCase() } })
    setDiscountLoading(false)
    if (error || !data?.valid) { setDiscountError(data?.message || 'Invalid or expired discount code'); return }
    setAppliedDiscount({ code: discountCode.trim().toUpperCase(), type: data.type, value: data.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validateQuoteForm({ name: form.name, email: form.email, patch_type: form.patchType, quantity: form.quantity ? 25 : 0 })
    if (Object.keys(errs).length) { setErrors(errs); return }
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
    if (appliedDiscount) formData.append('discount_code', appliedDiscount.code)
    if (turnstileToken) formData.append('turnstile_token', turnstileToken)
    const ok = await submit(formData)
    if (ok) {
      if (user) {
        await supabase.from('customers')
          .update({ email: form.email, full_name: form.name, organization: form.company })
          .eq('auth_user_id', user.id)
      }
      setSent(true)
    }
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

                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.25rem', marginTop: '0.5rem' }}>Patch Details</h2>
                <div className="fq-grid">
                  <div>
                    <label style={labelStyle}>Patch Type *</label>
                    <select name="patchType" value={form.patchType} onChange={handleChange} style={{ ...selectStyle, borderColor: errors.patch_type ? '#c0392b' : undefined }}>
                      <option value="">Select type...</option>
                      {PATCH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.patch_type && <span style={fieldErrorStyle}>{errors.patch_type}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Backing Type</label>
                    <select name="backing" value={form.backing} onChange={handleChange} style={selectStyle}>
                      <option value="">Select backing...</option>
                      {BACKING_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Quantity *</label>
                    <select name="quantity" value={form.quantity} onChange={handleChange} style={{ ...selectStyle, borderColor: errors.quantity ? '#c0392b' : undefined }}>
                      <option value="">Select range...</option>
                      {QTY_RANGES.map(q => <option key={q} value={q}>{q} pieces</option>)}
                    </select>
                    {errors.quantity && <span style={fieldErrorStyle}>{errors.quantity}</span>}
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
                    style={textareaStyle} />
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

                {/* Discount code */}
                <div>
                  <label style={labelStyle}>Discount Code <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>(optional)</span></label>
                  {appliedDiscount ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.4)', padding: '0.6rem 1rem' }}>
                      <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, flex: 1 }}>
                        ✓ {appliedDiscount.code} — {appliedDiscount.type === 'percent' ? `${appliedDiscount.value}% off` : `$${appliedDiscount.value} off`}
                      </span>
                      <button type="button" onClick={() => { setAppliedDiscount(null); setDiscountCode('') }} style={{ background: 'none', border: 'none', color: 'var(--gray-mid)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input value={discountCode} onChange={e => { setDiscountCode(e.target.value.toUpperCase()); setDiscountError('') }} placeholder="Enter code" style={{ ...inputStyle, width: 'auto', flex: 1, letterSpacing: '0.1em', fontWeight: 600 }} />
                      <button type="button" onClick={applyDiscount} disabled={discountLoading || !discountCode.trim()} style={{ background: 'var(--navy)', color: '#fff', border: 'none', fontFamily: 'var(--font-heading)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 1.2rem', cursor: discountLoading ? 'not-allowed' : 'pointer', opacity: discountLoading ? 0.7 : 1, whiteSpace: 'nowrap' }}>
                        {discountLoading ? '…' : 'Apply'}
                      </button>
                    </div>
                  )}
                  {discountError && <span style={fieldErrorStyle}>{discountError}</span>}
                </div>

                {TURNSTILE_SITE_KEY && (
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={token => setTurnstileToken(token)}
                    onError={() => setTurnstileToken('')}
                    onExpire={() => setTurnstileToken('')}
                  />
                )}

                <div>
                  <button type="submit" className="btn-primary"
                    disabled={loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                    style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '14px 36px', opacity: (loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)) ? 0.7 : 1, cursor: (loading || (!!TURNSTILE_SITE_KEY && !turnstileToken)) ? 'not-allowed' : 'pointer' }}>
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
