import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'
import { supabase } from '../lib/supabase'

const PATCH_TYPE_OPTIONS = ['Embroidered', 'Woven', 'PVC', 'Chenille', 'Leather', 'Dye Sublimation']

export default function RequestSample() {
  useSEO('Free Patch Samples', 'Request free custom patch samples from The Patch Solutions — embroidered, woven, PVC, and more. No obligation.')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    notes: '',
  })
  const [patchTypes, setPatchTypes] = useState([])
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  useReveal()

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function togglePatchType(type) {
    setPatchTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setSubmitError('')
    try {
      const { error } = await supabase.functions.invoke('request-sample', {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country || 'US',
          patch_types: patchTypes,
          notes: form.notes,
        }
      })
      if (error) {
        setSubmitError('Failed to submit. Please try again or email us at info@thepatchsolutions.com')
      } else {
        setSent(true)
      }
    } catch {
      setSubmitError('Failed to submit. Please try again or email us at info@thepatchsolutions.com')
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
        { label: 'Free Samples' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">No Obligation</span>
          <h1>Free Patch Samples</h1>
          <p>See and feel the quality before you order. Request free patch samples shipped directly to your door — no purchase required.</p>
        </div>
      </section>

      <section className="container">
        <div className="quote-layout">
          <div className="reveal">
            {sent ? (
              <div style={{ background: 'rgba(200,147,26,0.1)', border: '2px solid var(--gold)', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>Request Sent!</div>
                <p style={{ color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.7 }}>Thank you! We'll ship your free samples within 2–3 business days. Keep an eye on your mailbox.</p>
                <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem', marginBottom: '2rem' }}>Questions? Email us at info@thepatchsolutions.com</p>
                <Link to="/" className="btn-primary">Back to Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>Your Contact Info</h2>
                <div className="fq-grid">
                  <div><label style={labelStyle}>Name *</label><input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Company / Org</label><input name="company" value={form.company} onChange={handleChange} placeholder="Optional" style={inputStyle} /></div>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.25rem', marginTop: '0.5rem' }}>Shipping Address</h2>
                <div>
                  <label style={labelStyle}>Street Address *</label>
                  <input name="address" value={form.address} onChange={handleChange} required placeholder="123 Main St" style={inputStyle} />
                </div>
                <div className="fq-grid">
                  <div><label style={labelStyle}>City *</label><input name="city" value={form.city} onChange={handleChange} required placeholder="City" style={inputStyle} /></div>
                  <div><label style={labelStyle}>State *</label><input name="state" value={form.state} onChange={handleChange} required placeholder="e.g. TX" style={inputStyle} /></div>
                  <div><label style={labelStyle}>ZIP / Postal Code *</label><input name="zip" value={form.zip} onChange={handleChange} required placeholder="e.g. 78701" style={inputStyle} /></div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <select name="country" value={form.country} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>Patch Types</h2>
                  <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem', marginBottom: '1rem' }}>Select which types you'd like to receive samples of (optional).</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {PATCH_TYPE_OPTIONS.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => togglePatchType(type)}
                        style={{
                          padding: '0.45rem 1rem',
                          border: `1.5px solid ${patchTypes.includes(type) ? 'var(--navy)' : 'rgba(11,26,46,0.2)'}`,
                          background: patchTypes.includes(type) ? 'var(--navy)' : 'var(--white)',
                          color: patchTypes.includes(type) ? 'var(--white)' : 'var(--navy)',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.82rem',
                          fontWeight: patchTypes.includes(type) ? 700 : 400,
                          letterSpacing: '0.06em',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={4}
                    placeholder="Any specific requirements or questions about our patches?"
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <div>
                  <button type="submit" className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '14px 36px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? 'Submitting…' : 'Request Free Samples'}
                  </button>
                  {submitError && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginTop: '0.75rem' }}>{submitError}</p>}
                </div>
              </form>
            )}
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--navy)', padding: '2.5rem 2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>What You'll Receive</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Physical patch samples shipped to your door',
                  'Multiple patch types to compare quality',
                  'Backing options (iron-on, sew-on, velcro)',
                  'Size reference samples',
                  'Thread and color swatches',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.6rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.87rem', lineHeight: 1.65 }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--cream)', padding: '2.5rem 2rem', border: '1px solid rgba(11,26,46,0.1)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.4rem', letterSpacing: '0.04em', marginBottom: '1rem' }}>No Obligation</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Completely free — no credit card needed',
                  'No minimum order required',
                  'Ships within 2–3 business days',
                  'US, Canada & international available',
                  'One sample request per address',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.87rem', color: 'var(--text-dark)' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--navy-mid)', padding: '2rem', border: '1px solid rgba(200,147,26,0.2)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.2rem', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>Ready to Order?</h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>Already know what you need? Skip the samples and get a free custom quote.</p>
              <Link to="/free-quote" className="btn-gold" style={{ display: 'inline-block' }}>Get a Free Quote →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
