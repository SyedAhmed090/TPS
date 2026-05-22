import { useState } from 'react'
import { Link } from 'react-router-dom'

const SHAPES = ['circle', 'shield', 'rectangle', 'blob']

const SHAPE_LABELS = {
  circle: 'Circle',
  shield: 'Shield',
  rectangle: 'Rectangle',
  blob: 'Custom',
}

const SIZE_COMPARISONS = [
  { max: 1.5, text: 'About the size of a quarter' },
  { max: 2, text: 'About the size of a golf ball' },
  { max: 2.5, text: 'About the size of a ping-pong ball' },
  { max: 3, text: 'About the size of a business card width' },
  { max: 4, text: 'About the size of your palm' },
  { max: 5, text: 'About the size of a CD/DVD' },
  { max: 6, text: 'About the size of a large smartphone' },
  { max: 7, text: 'About the size of a standard envelope width' },
]

const QUICK_PICKS = [
  { val: 2, label: '2"', tip: 'Great for hat patches and name tags' },
  { val: 3, label: '3"', tip: 'Most popular — perfect for chest patches' },
  { val: 4, label: '4"', tip: 'Standard jacket patch size' },
  { val: 5, label: '5"', tip: 'Large statement patches' },
]

function getSizeComparison(size) {
  for (const entry of SIZE_COMPARISONS) {
    if (size <= entry.max) return entry.text
  }
  return 'About the size of a standard envelope width'
}

function PatchShape({ shape, scale }) {
  const strokeProps = {
    fill: 'var(--gold)',
    stroke: 'var(--navy)',
    strokeWidth: 4,
    opacity: 0.92,
  }
  const merrowProps = {
    fill: 'none',
    stroke: 'var(--gold-light)',
    strokeWidth: 2,
    opacity: 0.8,
  }

  if (shape === 'circle') {
    return (
      <>
        <circle r={42} {...strokeProps} />
        <g transform={`scale(${(42 + 5) / 42})`}>
          <circle r={42} {...merrowProps} />
        </g>
        {[-12, -4, 4, 12].map((offset, i) => (
          <line
            key={i}
            x1={-18 + offset * 0.3}
            y1={offset}
            x2={18 + offset * 0.3}
            y2={offset - 8}
            stroke="#8B6914"
            strokeWidth={1.2}
            opacity={0.5}
          />
        ))}
      </>
    )
  }
  if (shape === 'shield') {
    const d = 'M0,-42 L35,-18 L35,14 L0,42 L-35,14 L-35,-18 Z'
    const dLg = 'M0,-48 L40,-22 L40,18 L0,48 L-40,18 L-40,-22 Z'
    return (
      <>
        <path d={d} {...strokeProps} />
        <path d={dLg} {...merrowProps} />
        {[-12, -4, 4, 12].map((offset, i) => (
          <line
            key={i}
            x1={-16 + offset * 0.2}
            y1={offset}
            x2={16 + offset * 0.2}
            y2={offset - 8}
            stroke="#8B6914"
            strokeWidth={1.2}
            opacity={0.5}
          />
        ))}
      </>
    )
  }
  if (shape === 'rectangle') {
    return (
      <>
        <rect x={-42} y={-28} width={84} height={56} rx={4} {...strokeProps} />
        <rect x={-47} y={-33} width={94} height={66} rx={6} {...merrowProps} />
        {[-10, -2, 6].map((offset, i) => (
          <line
            key={i}
            x1={-20 + offset * 0.2}
            y1={offset}
            x2={20 + offset * 0.2}
            y2={offset - 8}
            stroke="#8B6914"
            strokeWidth={1.2}
            opacity={0.5}
          />
        ))}
      </>
    )
  }
  // blob / custom
  const d = 'M0,-42 C20,-42 45,-22 42,0 C40,20 28,42 0,42 C-28,42 -44,18 -42,0 C-40,-22 -20,-42 0,-42 Z'
  const dLg = 'M0,-48 C24,-48 51,-26 48,0 C46,24 32,48 0,48 C-32,48 -50,22 -48,0 C-46,-26 -24,-48 0,-48 Z'
  return (
    <>
      <path d={d} {...strokeProps} />
      <path d={dLg} {...merrowProps} />
      {[-12, -4, 4, 12].map((offset, i) => (
        <line
          key={i}
          x1={-15 + offset * 0.15}
          y1={offset}
          x2={15 + offset * 0.15}
          y2={offset - 8}
          stroke="#8B6914"
          strokeWidth={1.2}
          opacity={0.5}
        />
      ))}
    </>
  )
}

export default function PatchSizeVisualizer() {
  const [size, setSize] = useState(3)
  const [shape, setShape] = useState('circle')

  const patchPx = size * 28
  const patchScale = patchPx / 84

  const rulerWidth = 400
  const pixelsPerInch = 40
  const maxRulerInches = 8
  const filledWidth = Math.min(size * pixelsPerInch, maxRulerInches * pixelsPerInch)

  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid rgba(200,147,26,0.3)',
        borderRadius: 6,
        overflow: 'hidden',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      {/* SVG Jacket */}
      <div style={{ background: '#0a1525', display: 'flex', justifyContent: 'center', padding: '1rem 0 0.5rem' }}>
        <svg
          viewBox="0 0 400 480"
          width="100%"
          style={{ maxWidth: 400, display: 'block' }}
          aria-label="Jacket patch size preview"
        >
          {/* Background */}
          <rect x={0} y={0} width={400} height={480} fill="#0a1525" />

          {/* Jacket body */}
          <path
            d="M70,120 Q50,130 45,160 L40,380 Q40,400 60,405 L340,405 Q360,400 360,380 L355,160 Q350,130 330,120 Z"
            fill="#1e3a5f"
            stroke="#2a4d7a"
            strokeWidth={1}
          />

          {/* Left sleeve */}
          <path
            d="M70,120 L20,130 L10,280 L45,285 L55,230 L70,200 Z"
            fill="#1e3a5f"
            stroke="#2a4d7a"
            strokeWidth={1}
          />

          {/* Right sleeve */}
          <path
            d="M330,120 L380,130 L390,280 L355,285 L345,230 L330,200 Z"
            fill="#1e3a5f"
            stroke="#2a4d7a"
            strokeWidth={1}
          />

          {/* Ribbed hem */}
          <rect x={40} y={390} width={320} height={18} rx={4} fill="#162d4e" />
          {[0, 4, 8, 12, 16].map((offset, i) => (
            <line
              key={i}
              x1={40}
              y1={393 + offset}
              x2={360}
              y2={393 + offset}
              stroke="#1e3a5f"
              strokeWidth={0.8}
              opacity={0.7}
            />
          ))}

          {/* Ribbed left cuff */}
          <rect x={10} y={273} width={36} height={14} rx={3} fill="#162d4e" />
          {[0, 4, 8].map((offset, i) => (
            <line
              key={i}
              x1={10}
              y1={276 + offset}
              x2={46}
              y2={276 + offset}
              stroke="#1e3a5f"
              strokeWidth={0.8}
              opacity={0.7}
            />
          ))}

          {/* Ribbed right cuff */}
          <rect x={354} y={273} width={36} height={14} rx={3} fill="#162d4e" />
          {[0, 4, 8].map((offset, i) => (
            <line
              key={i}
              x1={354}
              y1={276 + offset}
              x2={390}
              y2={276 + offset}
              stroke="#1e3a5f"
              strokeWidth={0.8}
              opacity={0.7}
            />
          ))}

          {/* Collar detail */}
          <path d="M160,120 L200,160 L240,120" fill="#162d4e" stroke="#2a4d7a" strokeWidth={1} />

          {/* Neck */}
          <rect x={185} y={90} width={30} height={25} fill="#1a2e4a" />

          {/* Head */}
          <circle cx={200} cy={58} r={38} fill="#1a2e4a" stroke="#2d4a6e" strokeWidth={1.5} />

          {/* Zipper line */}
          <line x1={200} y1={160} x2={200} y2={395} stroke="#2d4a6e" strokeWidth={2} />

          {/* Left chest pocket line (viewer's left = SVG right ~x110-155) */}
          <line x1={110} y1={185} x2={155} y2={185} stroke="#2a4d7a" strokeWidth={1.2} />
          <line x1={110} y1={185} x2={110} y2={220} stroke="#2a4d7a" strokeWidth={1.2} />
          <line x1={155} y1={185} x2={155} y2={220} stroke="#2a4d7a" strokeWidth={1.2} />
          <line x1={110} y1={220} x2={155} y2={220} stroke="#2a4d7a" strokeWidth={1.2} />

          {/* Right chest pocket line (viewer's right = SVG left ~x245-295) */}
          <line x1={245} y1={185} x2={295} y2={185} stroke="#2a4d7a" strokeWidth={1.2} />
          <line x1={245} y1={185} x2={245} y2={220} stroke="#2a4d7a" strokeWidth={1.2} />
          <line x1={295} y1={185} x2={295} y2={220} stroke="#2a4d7a" strokeWidth={1.2} />
          <line x1={245} y1={220} x2={295} y2={220} stroke="#2a4d7a" strokeWidth={1.2} />

          {/* Patch on right chest (viewer's right = SVG left ~x270) */}
          <g transform={`translate(270,202) scale(${patchScale})`}>
            <PatchShape shape={shape} scale={patchScale} />
          </g>

          {/* Patch label arrow */}
          <line x1={320} y1={175} x2={290} y2={195} stroke="rgba(200,147,26,0.6)" strokeWidth={1} />
          <text x={322} y={172} fill="rgba(200,147,26,0.8)" fontSize={10} fontFamily="var(--font-heading)">
            PATCH
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
        {/* Shape Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
              fontWeight: 700,
            }}
          >
            Shape
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {SHAPES.map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid var(--gold)',
                  borderRadius: 3,
                  background: shape === s ? 'var(--gold)' : 'transparent',
                  color: shape === s ? 'var(--navy)' : 'var(--gold)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s ease',
                }}
              >
                {SHAPE_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Size Slider */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '0.25rem',
            }}
          >
            Size
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              color: 'var(--gold)',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              letterSpacing: '0.03em',
            }}
          >
            {size.toFixed(1)} inches
          </div>
          <input
            type="range"
            min={1}
            max={7}
            step={0.5}
            value={size}
            onChange={(e) => setSize(parseFloat(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--gold)',
              cursor: 'pointer',
              marginBottom: '0.75rem',
            }}
          />
          {/* Quick picks */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {QUICK_PICKS.map((qp) => (
              <button
                key={qp.val}
                title={qp.tip}
                onClick={() => setSize(qp.val)}
                style={{
                  padding: '0.3rem 0.85rem',
                  border: `1px solid ${size === qp.val ? 'var(--gold)' : 'rgba(200,147,26,0.4)'}`,
                  borderRadius: 3,
                  background: size === qp.val ? 'rgba(200,147,26,0.18)' : 'transparent',
                  color: size === qp.val ? 'var(--gold)' : 'rgba(200,147,26,0.7)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ruler */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
            }}
          >
            Actual patch width at selected size
          </div>
          <svg viewBox="0 0 400 40" width="100%" style={{ display: 'block' }}>
            {/* Background ruler line */}
            <line x1={10} y1={20} x2={390} y2={20} stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
            {/* Filled gold segment */}
            <line
              x1={10}
              y1={20}
              x2={10 + filledWidth}
              y2={20}
              stroke="var(--gold)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            {/* Tick marks */}
            {Array.from({ length: maxRulerInches * 2 + 1 }, (_, i) => {
              const x = 10 + i * (pixelsPerInch / 2)
              const isInch = i % 2 === 0
              const inch = i / 2
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={isInch ? 12 : 15}
                    x2={x}
                    y2={isInch ? 28 : 25}
                    stroke={x <= 10 + filledWidth ? 'var(--gold)' : 'rgba(255,255,255,0.3)'}
                    strokeWidth={isInch ? 1.5 : 1}
                  />
                  {isInch && (
                    <text
                      x={x}
                      y={38}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.45)"
                      fontSize={8}
                      fontFamily="var(--font-heading)"
                    >
                      {inch}"
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Size comparison */}
        <div
          style={{
            background: 'rgba(11,26,46,0.8)',
            borderLeft: '3px solid var(--gold)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            borderRadius: '0 3px 3px 0',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.02em',
            }}
          >
            📐 {getSizeComparison(size)}
          </span>
        </div>

        {/* CTA */}
        <Link
          to="/free-quote"
          className="btn-gold"
          style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem' }}
        >
          Get a Quote for This Size →
        </Link>
      </div>
    </div>
  )
}
