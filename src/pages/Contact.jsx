import { useState } from 'react'
import { Link } from 'react-router-dom'

const INITIAL = {
  firstName: '', lastName: '', email: '', phone: '',
  company: '', patchType: '', quantity: '', size: '',
  backing: '', notes: '',
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="overline">Get a Free Quote</span>
          <h1 className="display-2">Let's Create Your Patch</h1>
          <p className="lead">
            Fill out the form below — our team will respond with a detailed quote within 24 business hours. No commitment required.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section section--cream">
        <div className="container">
          <div className="contact-layout">

            {/* Info Card */}
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <p>Reach out by phone, email, or fill out the quote form. We're here to help you every step of the way.</p>

              {[
                {
                  label: 'Phone',
                  value: '(800) 555-1234',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>,
                },
                {
                  label: 'Email',
                  value: 'info@thepatchsolutions.com',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
                },
                {
                  label: 'Address',
                  value: '123 Patch Ave, Suite 10\nPhiladelphia, PA 19103',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>,
                },
              ].map(({ label, value, icon }) => (
                <div className="contact-detail" key={label}>
                  <div className="contact-detail__icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{icon}</svg>
                  </div>
                  <div>
                    <span className="contact-detail__label">{label}</span>
                    <span className="contact-detail__value" style={{ whiteSpace: 'pre-line' }}>{value}</span>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>
                  What Happens Next?
                </div>
                <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'We review your request and respond within 24 hours.',
                    'Our design team creates a free digital proof.',
                    'You approve the design and we begin production.',
                  ].map((step, i) => (
                    <li key={i} style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Quote Form */}
            <div className="quote-form">
              <h2 className="heading-2" style={{ marginBottom: 8 }}>Request Your Free Quote</h2>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem', marginBottom: 28 }}>
                All fields marked with <span style={{ color: 'var(--gold)' }}>*</span> are required.
              </p>

              {submitted ? (
                <div>
                  <div className="success-message">
                    <svg width="24" height="24" fill="none" stroke="var(--gold)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <p><strong>Thank you! We've received your quote request.</strong></p>
                      <p style={{ marginTop: 6 }}>Our team will respond within 24 business hours. Check your email for a confirmation.</p>
                    </div>
                  </div>
                  <p style={{ marginTop: 20, fontSize: '0.9rem', color: 'var(--gray)' }}>
                    In the meantime, <Link to="/gallery" style={{ color: 'var(--gold)', fontWeight: 600 }}>browse our gallery</Link> for inspiration.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">First Name <span>*</span></label>
                      <input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="John" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name <span>*</span></label>
                      <input className="form-input" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span>*</span></label>
                      <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Organization / Company</label>
                      <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Patch Type <span>*</span></label>
                      <select className="form-select" name="patchType" value={form.patchType} onChange={handleChange} required>
                        <option value="">Select a type...</option>
                        {['Embroidered','Woven','PVC / Rubber','Iron-On','Leather','Chenille','Dye Sublimation','Felt','Not Sure'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Approximate Quantity <span>*</span></label>
                      <select className="form-select" name="quantity" value={form.quantity} onChange={handleChange} required>
                        <option value="">Select quantity...</option>
                        {['25–49','50–99','100–249','250–499','500+'].map(q => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Patch Size</label>
                      <select className="form-select" name="size" value={form.size} onChange={handleChange}>
                        <option value="">Select size...</option>
                        {['Under 2"','2"–3"','3"–4"','4"–6"','Over 6"','Custom / Multiple'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group form-group--full">
                      <label className="form-label">Backing Type</label>
                      <select className="form-select" name="backing" value={form.backing} onChange={handleChange}>
                        <option value="">Select backing...</option>
                        {['Sew-On','Iron-On','Hook & Loop / Velcro','Self-Adhesive','Pin Back','Magnetic','Not Sure'].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group form-group--full">
                      <label className="form-label">Design Description / Notes</label>
                      <textarea
                        className="form-textarea"
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Describe your design, colors, text, and any specific requirements..."
                      />
                    </div>
                    <div className="form-group form-group--full">
                      <label className="form-label">Artwork / Design File</label>
                      <div className="form-upload">
                        <svg width="32" height="32" fill="none" stroke="var(--gold)" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: '0 auto' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <p style={{ fontWeight: 600, color: 'var(--dark)', marginTop: 8 }}>Drop your artwork here or click to browse</p>
                        <p>Accepted: AI, EPS, PDF, PNG, PSD &bull; Max 25MB per file</p>
                      </div>
                    </div>
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="btn btn--gold btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                      Submit Quote Request →
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Why Get a Quote */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="overline">No Obligation</span>
            <h2 className="heading-1">Why Get a Quote?</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid-3">
            {[
              {
                title: '100% Free',
                desc: 'Our quotes have zero cost and zero obligation. Just tell us your requirements and we handle the rest.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
              },
              {
                title: '24-Hour Response',
                desc: 'Our team reviews every request and responds with a detailed, itemized quote within one business day.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>,
              },
              {
                title: 'Free Design Proof',
                desc: 'Every quote includes a complimentary digital proof from our in-house design team. No hidden fees.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>,
              },
            ].map(({ title, desc, icon }) => (
              <div className="card" key={title}>
                <div className="card__body">
                  <div className="card__icon">
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{icon}</svg>
                  </div>
                  <h3 className="card__title">{title}</h3>
                  <p className="card__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
