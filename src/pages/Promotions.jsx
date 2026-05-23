import { Link } from 'react-router-dom'
import { PROMOTIONS } from '../data/siteData'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'
import useCountdown from '../hooks/useCountdown'

function CountdownUnit({ value, label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 48 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', lineHeight: 1, letterSpacing: '0.04em' }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
        {label}
      </div>
    </div>
  )
}

function CountdownSep() {
  return <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)', opacity: 0.5, alignSelf: 'flex-start', paddingTop: 2 }}>:</div>
}

function PromoCard({ promo }) {
  const timeLeft = useCountdown(promo.expiresAt)
  const expired  = promo.expiresAt && !timeLeft

  return (
    <div className="promo-card" style={{ opacity: expired ? 0.5 : 1 }}>
      <div className="promo-badge">{promo.badge}</div>
      <h2 className="promo-title">{promo.title}</h2>
      <p className="promo-desc">{promo.desc}</p>

      {promo.expiresAt && timeLeft && (
        <div style={{ background: 'var(--navy)', padding: '0.9rem 1rem', margin: '1rem 0', borderTop: '2px solid rgba(200,147,26,0.25)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.6rem' }}>
            Offer Ends In
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CountdownUnit value={timeLeft.days}    label="Days" />
            <CountdownSep />
            <CountdownUnit value={timeLeft.hours}   label="Hours" />
            <CountdownSep />
            <CountdownUnit value={timeLeft.minutes} label="Min" />
            <CountdownSep />
            <CountdownUnit value={timeLeft.seconds} label="Sec" />
          </div>
        </div>
      )}

      {expired && (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem 0.9rem', margin: '1rem 0', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
          Offer Expired
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span className="promo-expires">Valid: {promo.expires}</span>
        {!expired && <Link to="/free-quote" className="btn-primary" style={{ fontSize: '0.82rem', padding: '10px 20px' }}>Claim Offer</Link>}
      </div>
    </div>
  )
}

export default function Promotions() {
  useReveal()
  useSEO('Promotions & Deals', 'Current promotions and special offers on custom patches from The Patch Solutions.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Promotions' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Special Offers</span>
          <h1>Current Promotions</h1>
          <p>Save on your next custom patch order with our current promotions and volume discounts.</p>
        </div>
      </section>

      <section className="container">
        <div className="promo-grid reveal">
          {PROMOTIONS.map(p => <PromoCard key={p.title} promo={p} />)}
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }} className="reveal">
            <span className="section-label">Volume Savings</span>
            <h2 className="section-title">Real Prices. Real Savings.</h2>
            <p style={{ color: 'var(--gray-mid)', lineHeight: 1.75, maxWidth: 600 }}>
              Our tiered pricing means every additional patch costs less per unit. The table below shows real per-patch prices — not estimates — based on a 3" embroidered patch at 50% coverage.
            </p>
          </div>
          <div className="reveal" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: 'var(--navy)', color: 'var(--white)' }}>
                  <th style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', fontWeight: 700 }}>Quantity</th>
                  <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', fontWeight: 700 }}>Price / Patch</th>
                  <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', fontWeight: 700 }}>Est. Total</th>
                  <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', fontWeight: 700 }}>You Save vs. 25 qty</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { qty: '25',    ppp: 4.59, total: 114.75, save: '—',   base: true },
                  { qty: '50',    ppp: 2.36, total: 118.00, save: '49%' },
                  { qty: '100',   ppp: 1.66, total: 166.00, save: '64%' },
                  { qty: '200',   ppp: 1.12, total: 224.00, save: '76%' },
                  { qty: '500',   ppp: 0.87, total: 435.00, save: '81%' },
                  { qty: '1,000', ppp: 0.62, total: 620.00, save: '87%' },
                ].map((row, i) => (
                  <tr key={row.qty} style={{ background: row.base ? 'rgba(200,147,26,0.06)' : i % 2 === 0 ? 'var(--white)' : '#f9f7f3', borderBottom: '1px solid rgba(11,26,46,0.07)' }}>
                    <td style={{ padding: '0.8rem 1.25rem', fontFamily: 'var(--font-heading)', fontWeight: row.base ? 700 : 400, color: 'var(--navy)' }}>
                      {row.qty} patches{row.base ? ' (base)' : ''}
                    </td>
                    <td style={{ padding: '0.8rem 1.25rem', textAlign: 'right', fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: row.base ? 'var(--navy)' : 'var(--gold)', letterSpacing: '0.03em' }}>
                      ${row.ppp.toFixed(2)}
                    </td>
                    <td style={{ padding: '0.8rem 1.25rem', textAlign: 'right', color: 'var(--gray-mid)' }}>
                      ${row.total.toFixed(2)}
                    </td>
                    <td style={{ padding: '0.8rem 1.25rem', textAlign: 'right', fontFamily: 'var(--font-heading)', fontWeight: 700, color: row.save === '—' ? 'var(--gray-mid)' : '#166534' }}>
                      {row.save}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '0.72rem', color: 'var(--gray-mid)', marginTop: '0.75rem', lineHeight: 1.6 }}>
              * Based on a 3" embroidered patch at 50% coverage, no backing. Prices vary by size, patch type, and coverage. Use{' '}
              <Link to="/pricing" style={{ color: 'var(--gold)' }}>our full calculator</Link> for your exact estimate.
            </p>
          </div>
          <div style={{ marginTop: '2rem' }} className="reveal">
            <Link to="/pricing" className="btn-primary">View Full Pricing & Calculator</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Save?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Get a free quote and mention any promotion to apply your savings.</p>
          <Link to="/free-quote" className="btn-outline-light">Get a Free Quote</Link>
        </div>
      </section>
    </>
  )
}
