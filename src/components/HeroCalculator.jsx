import { useState, useEffect } from 'react'
import QuoteModal from './QuoteModal'

const SIZES = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7]
const QTY_TIERS = [12, 25, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000]
const BACKING_SIZES = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]

const EMB_50 = {
  2:   [6.22,3.07,1.60,1.26,0.77,0.68,0.56,0.49,0.46,0.45,0.43],
  2.5: [8.00,3.89,2.01,1.44,0.98,0.85,0.72,0.61,0.57,0.56,0.55],
  3:   [9.47,4.59,2.36,1.66,1.12,1.05,0.87,0.62,0.59,0.57,0.55],
  3.5: [13.23,6.38,3.26,1.87,1.39,1.32,1.05,0.77,0.73,0.71,0.69],
  4:   [14.58,7.08,3.59,2.11,1.53,1.41,1.21,0.95,0.91,0.89,0.86],
  4.5: [17.48,8.42,4.28,2.52,1.75,1.67,1.37,1.08,1.02,0.99,0.96],
  5:   [19.59,9.44,4.79,2.77,2.21,1.93,1.48,1.26,1.17,1.11,1.08],
  5.5: [24.24,11.65,5.91,3.36,2.46,2.07,1.76,1.53,1.44,1.37,1.31],
  6:   [28.12,13.50,6.86,3.83,3.06,2.69,2.30,2.15,2.08,2.04,1.96],
  6.5: [31.69,15.19,7.70,4.30,3.50,3.17,2.46,2.31,2.22,2.12,2.04],
  7:   [36.28,17.41,8.81,5.24,4.25,3.90,3.30,2.97,2.81,2.72,2.66],
}
const EMB_75 = {
  2:   [6.52,3.20,1.66,1.38,0.85,0.74,0.62,0.54,0.49,0.48,0.46],
  2.5: [8.24,3.96,2.06,1.56,1.09,0.93,0.79,0.67,0.63,0.61,0.59],
  3:   [10.08,4.87,2.51,1.81,1.24,1.15,0.95,0.67,0.65,0.61,0.59],
  3.5: [13.59,6.55,3.36,2.05,1.54,1.45,1.15,0.85,0.81,0.75,0.72],
  4:   [16.56,7.99,4.07,2.31,1.68,1.55,1.33,1.05,1.01,0.98,0.94],
  4.5: [19.20,9.25,4.71,2.68,1.94,1.84,1.51,1.18,1.11,1.07,1.05],
  5:   [21.80,10.48,5.33,3.05,2.44,2.14,1.63,1.38,1.29,1.22,1.14],
  5.5: [25.49,12.22,6.22,3.67,2.71,2.28,1.95,1.68,1.59,1.52,1.48],
  6:   [29.88,14.40,7.28,4.21,3.39,2.97,2.54,2.39,2.29,2.17,2.11],
  6.5: [33.19,15.93,8.06,4.73,3.86,3.52,2.71,2.55,2.46,2.39,2.23],
  7:   [36.89,17.70,8.94,5.86,4.72,4.32,3.66,3.29,3.10,3.01,2.86],
}
const EMB_100 = {
  2:   [6.89,3.35,1.75,1.49,0.91,0.82,0.67,0.58,0.54,0.52,0.49],
  2.5: [8.39,4.01,2.11,1.69,1.19,1.02,0.87,0.72,0.68,0.64,0.62],
  3:   [12.21,5.86,3.03,1.96,1.35,1.26,1.04,0.72,0.70,0.68,0.66],
  3.5: [15.19,7.29,3.74,2.22,1.68,1.58,1.26,0.91,0.88,0.84,0.81],
  4:   [16.90,8.09,4.15,2.51,1.85,1.70,1.46,1.14,1.09,1.06,0.98],
  4.5: [20.28,9.77,4.99,3.01,2.13,2.01,1.66,1.29,1.21,1.15,1.11],
  5:   [22.28,10.68,5.45,3.35,2.67,2.34,1.78,1.50,1.41,1.34,1.28],
  5.5: [29.69,14.22,6.82,4.03,2.97,2.50,2.14,1.85,1.74,1.68,1.61],
  6:   [31.66,15.18,7.69,4.56,3.72,3.26,2.78,2.63,2.51,2.41,2.29],
  6.5: [36.61,17.57,8.89,5.17,4.25,3.86,2.97,2.79,2.69,2.57,2.45],
  7:   [39.75,19.08,9.64,6.35,5.18,4.74,4.02,3.62,3.41,3.25,3.07],
}
const BACKINGS = {
  'None':                   [0,    0,    0,    0,    0,    0,    0],
  'Heat Seal':              [0.06, 0.08, 0.10, 0.12, 0.16, 0.19, 0.23],
  'Hook & Loop (hard)':     [0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00],
  'Hook & Loop (soft)':     [0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.30],
  'Self Stick':             [0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.30],
}

function getEmbPrice(coverage, size, qty) {
  const table = coverage === '50%' ? EMB_50 : coverage === '75%' ? EMB_75 : EMB_100
  const row = table[size]
  if (!row) return null
  let idx = 0
  for (let i = 0; i < QTY_TIERS.length; i++) { if (qty >= QTY_TIERS[i]) idx = i }
  return row[idx]
}

function getBackingAddon(backing, size) {
  const prices = BACKINGS[backing]
  if (!prices) return 0
  const idx = BACKING_SIZES.findIndex(s => Math.abs(s - size) < 0.01)
  return idx === -1 ? prices[prices.length - 1] : prices[idx]
}

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
