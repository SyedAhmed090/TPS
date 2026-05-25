import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'
import { supabase } from '../../lib/supabase'
import { inputStyle, labelStyle, textareaStyle } from '../../styles/formStyles'

const CONTACT_INFO = [
  { label: 'Email', value: 'info@thepatchsolutions.com', icon: '✉' },
  { label: 'Phone', value: '1-800-PATCHES (1-800-728-2437)', icon: '📞' },
  { label: 'Hours', value: 'Mon–Fri, 9am–6pm EST', icon: '🕐' },
  { label: 'Turnaround', value: '10–14 business days standard', icon: '⚡' },
]

export default function Contact() {
  useSEO('Contact Us', 'Contact The Patch Solutions for a free custom patch quote, samples, or any questions about your order.')
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', quantity: '', message: '' })
  const [sent, setSent] = useState(false)
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
      const { error } = await supabase.functions.invoke('submit-contact', {
        body: { name: form.name, email: form.email, phone: form.phone, subject: form.subject, message: form.message }
      })
      if (error) {
        setSubmitError('Failed to send. Please try again or email us at info@thepatchsolutions.com')
      } else {
        setSent(true)
      }
    } catch {
      setSubmitError('Failed to send. Please try again or email us at info@thepatchsolutions.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Contact Us' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>Ready to order? Have a question? We're here to help — real people, real answers, fast response.</p>
        </div>
      </section>

      <section className="container">
        <div className="story-grid" style={{ alignItems: 'start' }}>
          <div className="reveal">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '2rem', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>Get a Free Quote</h2>
            <p style={{ color: 'var(--gray-mid)', marginBottom: '2.5rem', lineHeight: 1.7 }}>Fill out the form and we'll respond within 1 business day with a free quote and digital proof timeline.</p>

            {sent ? (
              <div style={{ background: 'rgba(200,147,26,0.12)', border: '1px solid var(--gold)', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>Message Sent!</div>
                <p style={{ color: 'var(--navy)', fontSize: '0.9rem' }}>Thank you for reaching out. We'll be in touch within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="fq-grid">
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle} />
                  </div>
                </div>
                <div className="fq-grid">
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="(optional)" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Quantity</label>
                    <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 100 patches" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Embroidered patches quote" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Describe your patch project — type, size, backing, and any artwork details..." style={textareaStyle} />
                </div>
                <div>
                  <button type="submit" className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>
                  {submitError && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginTop: '0.75rem' }}>{submitError}</p>}
                </div>
              </form>
            )}
          </div>

          <div className="reveal">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '2rem', letterSpacing: '0.04em', marginBottom: '2rem' }}>Contact Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {CONTACT_INFO.map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0, marginTop: 2 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '3px' }}>{c.label}</div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--navy)' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--navy)', padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.4rem', letterSpacing: '0.04em', marginBottom: '1rem' }}>What to Include</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Patch type (embroidered, PVC, woven, etc.)', 'Size (width × height in inches)', 'Quantity needed', 'Backing type preference', 'Your artwork or design concept', 'Desired turnaround date'].map(i => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
