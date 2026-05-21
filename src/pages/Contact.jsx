import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Icons ───────────────────────────────────────────────────── */
function IconPhone() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconUpload() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="38"
      height="38"
      aria-hidden="true"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  )
}

function IconCheckCircle() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="52"
      height="52"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconPencil() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

/* ── Form state ──────────────────────────────────────────────── */
const INITIAL_FORM = {
  firstName:    '',
  lastName:     '',
  email:        '',
  phone:        '',
  organization: '',
  patchType:    '',
  quantity:     '',
  patchSize:    '',
  backingType:  '',
  description:  '',
}

/* ══════════════════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════════════════ */
export default function Contact() {
  const [form, setForm]           = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ── 1. PAGE HERO ────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <span className="overline">Get a Free Quote</span>
          <h1 className="heading-1">Let's Create Your Patch</h1>
          <p className="lead">
            Fill out the form below — our team will respond with a detailed quote within 24 business
            hours.
          </p>
        </div>
      </section>

      {/* ── 2. CONTACT SECTION ──────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <div className="contact-layout">

            {/* ── Left: Info Card ─────────────────────────────── */}
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <p>
                Reach out by phone, email, or fill out the quote form. We're here to help.
              </p>

              {/* Phone */}
              <div className="contact-detail">
                <span className="contact-detail__icon">
                  <IconPhone />
                </span>
                <div>
                  <span className="contact-detail__label">Phone</span>
                  <a href="tel:+18005551234" className="contact-detail__value">
                    (800) 555-1234
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-detail">
                <span className="contact-detail__icon">
                  <IconMail />
                </span>
                <div>
                  <span className="contact-detail__label">Email</span>
                  <a href="mailto:info@thepatchsolutions.com" className="contact-detail__value">
                    info@thepatchsolutions.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="contact-detail">
                <span className="contact-detail__icon">
                  <IconMapPin />
                </span>
                <div>
                  <span className="contact-detail__label">Address</span>
                  <span className="contact-detail__value">
                    123 Patch Ave, Suite 10<br />
                    Philadelphia, PA 19103
                  </span>
                </div>
              </div>

              {/* What Happens Next */}
              <div style={{ marginTop: '2rem' }}>
                <h4
                  style={{
                    color: '#C4A235',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  What Happens Next?
                </h4>
                <ol
                  style={{
                    paddingLeft: '20px',
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.65)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <li>We review your request and respond within 24 hours.</li>
                  <li>Our design team creates a free digital proof.</li>
                  <li>You approve and we begin production.</li>
                </ol>
              </div>
            </div>

            {/* ── Right: Quote Form ───────────────────────────── */}
            <div className="quote-form">
              <h3 className="heading-2">Request Your Free Quote</h3>
              <p>Complete the fields below and we'll build a custom quote for your order.</p>

              {submitted ? (
                /* ── Success State ─────────────────────────── */
                <div className="success-message">
                  <span style={{ color: 'var(--gold)', display: 'flex', justifyContent: 'center' }}>
                    <IconCheckCircle />
                  </span>
                  <p>
                    Thank you! We've received your quote request and will respond within 24 business
                    hours. Check your email for a confirmation.
                  </p>
                  <p>
                    In the meantime,{' '}
                    <Link to="/gallery">browse our gallery for inspiration</Link>.
                  </p>
                </div>
              ) : (
                /* ── Quote Form ────────────────────────────── */
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-grid">

                    {/* Row 1: First Name / Last Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">
                        First Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="form-input"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">
                        Last Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="form-input"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                      />
                    </div>

                    {/* Row 2: Email / Phone */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>

                    {/* Row 3: Organization / Patch Type */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="organization">
                        Organization / Company
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        className="form-input"
                        value={form.organization}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="patchType">
                        Patch Type
                      </label>
                      <select
                        id="patchType"
                        name="patchType"
                        className="form-select"
                        value={form.patchType}
                        onChange={handleChange}
                      >
                        <option value="">Select a type…</option>
                        <option value="embroidered">Embroidered</option>
                        <option value="woven">Woven</option>
                        <option value="pvc">PVC / Rubber</option>
                        <option value="iron-on">Iron-On</option>
                        <option value="leather">Leather</option>
                        <option value="chenille">Chenille</option>
                        <option value="dye-sublimation">Dye Sublimation</option>
                        <option value="felt">Felt</option>
                        <option value="not-sure">Not Sure</option>
                      </select>
                    </div>

                    {/* Row 4: Quantity / Patch Size */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="quantity">
                        Approximate Quantity
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        className="form-select"
                        value={form.quantity}
                        onChange={handleChange}
                      >
                        <option value="">Select quantity…</option>
                        <option value="25-49">25–49</option>
                        <option value="50-99">50–99</option>
                        <option value="100-249">100–249</option>
                        <option value="250-499">250–499</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="patchSize">
                        Patch Size
                      </label>
                      <select
                        id="patchSize"
                        name="patchSize"
                        className="form-select"
                        value={form.patchSize}
                        onChange={handleChange}
                      >
                        <option value="">Select size…</option>
                        <option value="under-2">Under 2"</option>
                        <option value="2-3">2"–3"</option>
                        <option value="3-4">3"–4"</option>
                        <option value="4-6">4"–6"</option>
                        <option value="over-6">Over 6"</option>
                        <option value="custom">Custom / Multiple</option>
                      </select>
                    </div>

                    {/* Row 5: Backing Type (full width) */}
                    <div className="form-group form-group--full">
                      <label className="form-label" htmlFor="backingType">
                        Backing Type
                      </label>
                      <select
                        id="backingType"
                        name="backingType"
                        className="form-select"
                        value={form.backingType}
                        onChange={handleChange}
                      >
                        <option value="">Select backing…</option>
                        <option value="sew-on">Sew-On</option>
                        <option value="iron-on">Iron-On</option>
                        <option value="hook-loop">Hook &amp; Loop / Velcro</option>
                        <option value="self-adhesive">Self-Adhesive</option>
                        <option value="pin-back">Pin Back</option>
                        <option value="magnetic">Magnetic</option>
                        <option value="not-sure">Not Sure</option>
                      </select>
                    </div>

                    {/* Row 6: Design Description (full width) */}
                    <div className="form-group form-group--full">
                      <label className="form-label" htmlFor="description">
                        Design Description / Notes
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-textarea"
                        rows={5}
                        placeholder="Describe your design, colors, text, and any specific requirements..."
                        value={form.description}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Row 7: File Upload (full width, visual) */}
                    <div className="form-group form-group--full">
                      <label className="form-label">Artwork File</label>
                      <div className="form-upload">
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '0.5rem',
                            opacity: 0.6,
                          }}
                        >
                          <IconUpload />
                        </span>
                        <span>Drop your artwork here or click to browse</span>
                        <p style={{ fontSize: '0.78rem', marginTop: '0.35rem', opacity: 0.6 }}>
                          Accepted: AI, EPS, PDF, PNG, PSD &nbsp;&bull;&nbsp; Max 25 MB per file
                        </p>
                      </div>
                    </div>

                  </div>{/* /form-grid */}

                  <div className="form-submit">
                    <button
                      type="submit"
                      className="btn btn--gold btn--lg"
                      style={{ width: '100%' }}
                    >
                      Submit Quote Request &rarr;
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>{/* /contact-layout */}
        </div>
      </section>

      {/* ── 3. WHY GET A QUOTE ──────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="overline">No Pressure</span>
            <h2 className="heading-2">Why Get a Quote?</h2>
          </div>
          <div className="grid-3">

            <div className="card">
              <div className="value-card__icon">
                <IconCheck />
              </div>
              <h3>100% Free</h3>
              <p>No obligation — just send us your requirements and we'll build a detailed estimate.</p>
            </div>

            <div className="card">
              <div className="value-card__icon">
                <IconClock />
              </div>
              <h3>24-Hour Response</h3>
              <p>Our team replies fast with a thorough, itemized pricing breakdown for your order.</p>
            </div>

            <div className="card">
              <div className="value-card__icon">
                <IconPencil />
              </div>
              <h3>Design Included</h3>
              <p>Every quote comes with a free digital proof — our artists bring your vision to life.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
