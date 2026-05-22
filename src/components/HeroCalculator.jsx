import { useState, useEffect } from 'react'
import QuoteModal from './QuoteModal'
import { SIZES, QTY_TIERS, BACKINGS, getEmbPrice, getBackingAddon } from '../data/pricingData'

function fmt(n) { return '$' + n.toFixed(2) }

const chip = (active) => ({
  padding: '4px 9px',
  border: `1.5px solid ${active ? 'var(--gold)' : 'rgba(255,255,255,0.18)'}`,
  background: active ? 'var(--gold)' : 'transparent',
  color: active ? 'var(--navy)' : 'rgba(255,255,255,0.7)',
  fontFamily: 'var(--font-heading)',
  fontSize: '0.78rem',
  fontWeight: active ? 700 : 400,
  letterSpacing: '0.04em',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.15s',
  whiteSpace: 'nowrap',
})

const lbl = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  display: 'block',
  marginBottom: 6,
}

export default function HeroCalculator() {
  const [coverage, setCoverage] = useState('50%')
  const [size, setSize]         = useState(3)
  const [qty, setQty]           = useState(100)
  const [qtyInput, setQtyInput] = useState('100')
  const [backing, setBacking]   = useState('None')
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setError('')
    const q = parseInt(qty)
    if (!q || q < 25) { setResult(null); if (q && q > 0) setError('Min 25'); return }
    const base = getEmbPrice(coverage, size, q)
    if (!base) { setResult(null); return }
    const backAddon = getBackingAddon(backing, Math.min(size, 5))
    const ppp = base + backAddon
    setResult({ base, backAddon, ppp, total: ppp * q, q })
  }, [coverage, size, qty, backing])

  function handleQty(e) {
    setQtyInput(e.target.value)
    const n = parseInt(e.target.value)
    if (!isNaN(n)) setQty(n)
  }

  const inputBase = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(200,147,26,0.3)',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    outline: 'none',
  }

  return (
    <div style={{ background: 'rgba(11,26,46,0.7)', border: '1px solid rgba(200,147,26,0.3)', backdropFilter: 'blur(8px)' }}>
      {/* Header */}
      <div style={{ background: 'var(--gold)', padding: '0.85rem 1.4rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', letterSpacing: '0.06em', color: 'var(--navy)', lineHeight: 1 }}>
          Instant Price Estimator
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(11,26,46,0.6)', marginTop: 3 }}>
          Embroidered Patches
        </div>
      </div>

      <div style={{ padding: '1.2rem 1.4rem' }}>
        {/* Coverage */}
        <div style={{ marginBottom: '0.9rem' }}>
          <span style={lbl}>Coverage</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['50%', '75%', '100%'].map(c => (
              <div key={c} style={chip(coverage === c)} onClick={() => setCoverage(c)}>{c}</div>
            ))}
          </div>
        </div>

        {/* Size */}
        <div style={{ marginBottom: '0.9rem' }}>
          <span style={lbl}>Size (inches)</span>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {SIZES.map(s => (
              <div key={s} style={chip(size === s)} onClick={() => setSize(s)}>{s}"</div>
            ))}
          </div>
        </div>

        {/* Qty + Backing */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '0.75rem', marginBottom: '0.9rem' }}>
          <div>
            <span style={lbl}>Quantity</span>
            <input type="number" min="25" value={qtyInput} onChange={handleQty}
              style={{ ...inputBase, width: '100%', fontSize: '0.95rem', padding: '0.45rem 0.7rem' }}
              placeholder="100" />
            {error && <div style={{ fontSize: '0.68rem', color: 'var(--gold-light)', marginTop: 3 }}>{error}</div>}
          </div>
          <div>
            <span style={lbl}>Backing</span>
            <select value={backing} onChange={e => setBacking(e.target.value)}
              style={{ ...inputBase, width: '100%', fontSize: '0.82rem', padding: '0.45rem 0.5rem', background: 'var(--navy-mid)', cursor: 'pointer' }}>
              {Object.keys(BACKINGS).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {/* Result */}
        <div style={{ background: 'rgba(200,147,26,0.1)', border: '1px solid rgba(200,147,26,0.25)', padding: '0.85rem 1rem', marginBottom: '0.9rem', minHeight: 72 }}>
          {result ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
                  {fmt(result.base)}{result.backAddon > 0 ? ` + ${fmt(result.backAddon)} backing` : ''} each
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                  {fmt(result.ppp)}/patch
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(200,147,26,0.2)', paddingTop: 7 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                  Est. Total · {result.q} patches
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: 'var(--gold)', letterSpacing: '0.03em', lineHeight: 1 }}>
                  {fmt(result.total)}
                </span>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 48 }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Enter qty to see price
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-gold"
          style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: '0.82rem', padding: '0.7rem', border: 'none', cursor: 'pointer' }}
        >
          Get Your Free Official Quote →
        </button>

        <p style={{ fontSize: '0.64rem', color: 'rgba(255,255,255,0.28)', marginTop: 8, textAlign: 'center', lineHeight: 1.5, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
          Min. 25 patches · Free setup · Free sample · Flat-rate shipping
        </p>
      </div>

      <QuoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        summary={result ? `${size}" embroidered · ${coverage} coverage · ${backing !== 'None' ? backing + ' backing · ' : ''}${result.q} patches · ${fmt(result.ppp)}/patch · Est. ${fmt(result.total)}` : null}
      />
    </div>
  )
}
