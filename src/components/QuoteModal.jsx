import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '../lib/supabase'

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(200,147,26,0.3)',
  color: '#fff',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  padding: '0.65rem 0.9rem',
  width: '100%',
  outline: 'none',
  display: 'block',
}

const labelStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  display: 'block',
  marginBottom: 6,
}

export default function QuoteModal({ open, onClose, summary, patchType = 'Custom Patch', quantity = 25, discountCode = '', discountPct = 0, estimatedPrice }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  function handleClose() {
    setForm({ name: '', email: '', phone: '' })
    setFile(null)
    setErrors({})
    setSubmitted(false)
    setSubmitError('')
    onClose()
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  function handleFilePick(e) {
    setFile(e.target.files[0] || null)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setSubmitError('')
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('patch_type', patchType)
      formData.append('quantity', String(quantity))
      formData.append('discount_code', discountCode)
      formData.append('discount_pct', String(discountPct))
      if (estimatedPrice !== undefined) formData.append('estimated_price', String(estimatedPrice))
      if (summary) formData.append('special_notes', summary)
      if (file) formData.append('artwork', file)
      const { error } = await supabase.functions.invoke('submit-quote', { body: formData })
      if (error) {
        setSubmitError('Failed to send. Please try again or email us directly.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setSubmitError('Failed to send. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) handleClose()
  }

  const field = (id, label, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: '1.1rem' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input
        id={id} name={id} type={type} value={form[id]}
        onChange={handleChange} placeholder={placeholder}
        style={{ ...inputStyle, borderColor: errors[id] ? 'var(--red-bright)' : 'rgba(200,147,26,0.3)' }}
        required
      />
      {errors[id] && <span style={{ fontSize: '0.72rem', color: 'var(--red-bright)', marginTop: 4, display: 'block' }}>{errors[id]}</span>}
    </div>
  )

  return createPortal(
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(11,26,46,0.88)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{
        background: 'var(--navy-mid)',
        border: '1px solid rgba(200,147,26,0.35)',
        width: '100%', maxWidth: 500,
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 12, right: 14, zIndex: 1,
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.45)', fontSize: '1.6rem',
            cursor: 'pointer', lineHeight: 1, padding: '2px 6px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
        >×</button>

        {/* Header */}
        <div style={{ background: 'var(--gold)', padding: '1.1rem 1.6rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.06em', color: 'var(--navy)', lineHeight: 1 }}>
            Get Your Free Official Quote
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(11,26,46,0.55)', marginTop: 4 }}>
            The Patch Solutions · No Obligation
          </div>
        </div>

        <div style={{ padding: '1.5rem 1.6rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(200,147,26,0.15)', border: '2px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.2rem',
                fontSize: '1.6rem', color: 'var(--gold)',
              }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: 'var(--gold)', letterSpacing: '0.04em', marginBottom: '0.6rem' }}>
                Request Received!
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.4rem' }}>
                Thanks! We'll review your details and get you a free official quote within <strong style={{ color: '#fff' }}>1 business day</strong>.
              </p>
              <button
                onClick={handleClose}
                className="btn-gold"
                style={{ display: 'inline-block', padding: '0.7rem 2rem', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Estimate context */}
              {summary && (
                <div style={{
                  background: 'rgba(200,147,26,0.08)',
                  border: '1px solid rgba(200,147,26,0.2)',
                  padding: '0.65rem 0.9rem',
                  marginBottom: '1.3rem',
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>Your estimate: </span>{summary}
                </div>
              )}

              {field('name',  'Full Name',     'text',  'e.g. John Smith')}
              {field('email', 'Email Address', 'email', 'e.g. john@example.com')}
              {field('phone', 'Phone Number',  'tel',   'e.g. (555) 000-0000')}

              {/* File upload */}
              <div style={{ marginBottom: '1.3rem' }}>
                <span style={labelStyle}>Upload Your Design <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '0.7rem' }}>(optional)</span></span>
                <label
                  htmlFor="design-upload"
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{
                    display: 'block',
                    border: `2px dashed ${dragOver ? 'var(--gold)' : 'rgba(200,147,26,0.3)'}`,
                    background: dragOver ? 'rgba(200,147,26,0.06)' : 'rgba(255,255,255,0.03)',
                    padding: '1.2rem 1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {file ? (
                    <div>
                      <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 4 }}>
                        ✓ {file.name}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem' }}>
                        {(file.size / 1024).toFixed(0)} KB — click to change
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-heading)', fontSize: '0.82rem', marginBottom: 4 }}>
                        Drag & drop your design file here
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem' }}>
                        or <span style={{ color: 'var(--gold)' }}>click to browse</span> · AI, EPS, PDF, PNG, JPG accepted
                      </div>
                    </div>
                  )}
                  <input
                    id="design-upload"
                    type="file"
                    accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg,.psd"
                    onChange={handleFilePick}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="btn-gold"
                disabled={loading}
                style={{ display: 'block', width: '100%', textAlign: 'center', padding: '0.85rem', fontSize: '0.9rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending…' : 'Send My Quote Request →'}
              </button>

              {submitError && (
                <p style={{ fontSize: '0.78rem', color: 'var(--red-bright, #e55)', textAlign: 'center', marginTop: 8 }}>{submitError}</p>
              )}

              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 10, lineHeight: 1.5, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
                Free quote · No obligation · We reply within 1 business day
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
