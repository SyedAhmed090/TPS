import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'
import { supabase } from '../lib/supabase'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC']

const PATCH_TYPES = [
  'Embroidered Patches',
  'Woven Patches',
  'PVC Patches',
  'Chenille Patches',
  'Leather Patches',
  'Dye Sublimation Patches',
]

export default function RequestSample() {
  useSEO('Free Patch Samples', 'Request free custom patch samples from The Patch Solutions. See and feel our quality before you order — no commitment required.')
  useReveal()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    notes: '',
  })
  const [patchTypes, setPatchTypes] = useState([])
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

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
          phone: form.phone || undefined,
          company: form.company || undefined,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
          patch_types: patchTypes,
          notes: form.notes || undefined,
        },
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

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1px solid rgba(11,26,46,0.2)',
    background: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    color: 'var(--text-dark)',
    boxSizing: 'border-box',
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
          <span className="section-label">No Commitment</span>
          <h1>Request Free Patch Samples</h1>
          <p>See and feel our quality before you commit to an order. We'll ship you samples of our most popular patch types — completely free.</p>
        </div>
      </section>

      <section className="container">
        <div className="quote-layout">
          <div className="reveal">
            {sent ? (
              <div style={{ background: 'rgba(200,147,26,0.1)', border: '2px solid var(--gold)', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>Request Received!</div>
                <p style={{ color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.7 }}>Thank you! We'll process your sample request and ship within 2–3 business days.</p>
                <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem', marginBottom: '2rem' }}>Check your email for a confirmation from info@thepatchsolutions.com</p>
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

                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem', letterSpacing: '0.04em', marginBottom: '0.25rem', marginTop: '0.5rem' }}>Shipping Address *</h2>
                <div>
                  <label style={labelStyle}>Street Address</label>
                  <input name="address" value={form.address} onChange={handleChange} required placeholder="123 Main St" style={inputStyle} />
                </div>
                <div className="fq-grid">
                  <div>
                    <label style={labelStyle}>City</label>
                    <input name="city" value={form.city} onChange={handleChange} required placeholder="City" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <select name="state" value={form.state} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select state...</option>
                      {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>ZIP Code</label>
                    <input name="zip" value={form.zip} onChange={handleChange} required placeholder="12345" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Which patch types would you like? <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>(select all that apply)</span></label>
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
                  <label style={labelStyle}>Additional Notes <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>(optional)</span></label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                    placeholder="Tell us about your project — type, size, quantity, intended use..."
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {submitError && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: 0 }}>{submitError}</p>}
                <button type="submit" disabled={loading} className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '14px 36px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Sending...' : 'Request Free Samples'}
                </button>
              </form>
            )}
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--navy)', padding: '2.5rem 2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.5rem', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>What You'll Receive</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Embroidered patch — multiple coverage levels',
                  'Woven patch — flat finish with fine detail',
                  'PVC rubber patch — waterproof 3D style',
                  'All samples free, no credit card required',
                  'Shipped within 2–3 business days',
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
                We send samples because we're confident in our quality. There's no purchase required and no sales pressure. If you love what you receive, you can request a free quote.
              </p>
              <Link to="/free-quote" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700 }}>
                GET A FREE QUOTE →
              </Link>
            </div>

            <div style={{ background: 'var(--navy)', padding: '1.5rem 2rem', borderLeft: '4px solid var(--gold)' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: 'var(--gold)' }}>US addresses only</strong> for free samples. International customers — please <Link to="/contact" style={{ color: 'var(--gold-light)' }}>contact us</Link> directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
