import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── PRICING DATA ───────────────────────────────────────────────
const SIZES = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
const BLANK_SIZES = [2, 2.5, 3, 3.5, 4, 4.5, 5];
const QTY_TIERS = [12, 25, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000];
const BLANK_QTY_TIERS = [100, 200, 300, 500, 1000, 2000];

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
};

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
};

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
};

const BLANK = {
  2:   [0.92,0.60,0.51,0.42,0.39,0.37],
  2.5: [0.97,0.65,0.56,0.47,0.44,0.42],
  3:   [1.02,0.70,0.61,0.52,0.49,0.47],
  3.5: [1.07,0.75,0.66,0.57,0.54,0.52],
  4:   [1.26,0.85,0.76,0.67,0.64,0.62],
  4.5: [1.36,0.95,0.86,0.77,0.74,0.72],
  5:   [1.46,1.05,0.96,0.87,0.84,0.82],
};

const BULLION = {
  'HBC3 3"x3"': { "10-25": 25.00, "26-50": 24.00, "51-90": 22.00, "100+": 20.00 },
  'HBC4 4"x4"': { "10-25": 28.00, "26-50": 27.00, "51-90": 25.00, "100+": 22.00 },
};

const BACKING_SIZES = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
const BACKINGS = {
  "None":                   [0,    0,    0,    0,    0,    0,    0],
  "Heat Seal":              [0.06, 0.08, 0.10, 0.12, 0.16, 0.19, 0.23],
  "Hook & Loop (hard hook)":[0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00],
  "Hook & Loop (soft pile)":[0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.30],
  "Self Stick":             [0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.30],
};

const DISCOUNT_CODES = {
  "WELCOME10": { type: "percent", value: 10, label: "10% off — Welcome discount" },
  "SAVE15":    { type: "percent", value: 15, label: "15% off — Promo code" },
  "FLAT20":    { type: "fixed",   value: 20, label: "$20 off — Flat discount" },
  "MILITARY":  { type: "percent", value: 12, label: "12% off — Military discount" },
  "BULK500":   { type: "percent", value: 8,  label: "8% off — Bulk order discount" },
};

// ─── HELPERS ────────────────────────────────────────────────────
function getBackingAddon(backing, size) {
  const prices = BACKINGS[backing];
  if (!prices) return 0;
  const idx = BACKING_SIZES.findIndex(s => Math.abs(s - size) < 0.01);
  return idx === -1 ? prices[prices.length - 1] : prices[idx];
}

function getEmbPrice(coverage, size, qty) {
  const table = coverage === "50%" ? EMB_50 : coverage === "75%" ? EMB_75 : EMB_100;
  const row = table[size];
  if (!row) return null;
  let tierIdx = 0;
  for (let i = 0; i < QTY_TIERS.length; i++) {
    if (qty >= QTY_TIERS[i]) tierIdx = i;
  }
  return row[tierIdx];
}

function getBlankPrice(size, qty) {
  const row = BLANK[size];
  if (!row) return null;
  let tierIdx = 0;
  for (let i = 0; i < BLANK_QTY_TIERS.length; i++) {
    if (qty >= BLANK_QTY_TIERS[i]) tierIdx = i;
  }
  return row[tierIdx];
}

function getBullionPrice(variant, qty) {
  const prices = BULLION[variant];
  if (!prices) return null;
  if (qty >= 100) return prices["100+"];
  if (qty >= 51)  return prices["51-90"];
  if (qty >= 26)  return prices["26-50"];
  return prices["10-25"];
}

function fmt(n) { return "$" + n.toFixed(2); }

// ─── STYLES ─────────────────────────────────────────────────────
const S = {
  card: {
    maxWidth: 860,
    margin: "0 auto",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,147,26,0.25)",
    overflow: "hidden",
  },
  header: {
    background: "var(--gold)",
    padding: "1.6rem 2.2rem",
    borderBottom: "2px solid rgba(11,26,46,0.15)",
  },
  headerTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "1.9rem",
    letterSpacing: "0.06em",
    color: "var(--navy)",
    lineHeight: 1,
  },
  headerSub: {
    fontFamily: "var(--font-heading)",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(11,26,46,0.6)",
    marginTop: 5,
  },
  body: { padding: "2rem 2.2rem" },
  sectionLabel: {
    fontFamily: "var(--font-heading)",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: 10,
    display: "block",
  },
  row: { marginBottom: "1.6rem" },
  label: {
    fontFamily: "var(--font-heading)",
    fontSize: "0.8rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
    display: "block",
    marginBottom: 8,
  },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: (active) => ({
    padding: "0.38rem 0.9rem",
    border: `1.5px solid ${active ? "var(--gold)" : "rgba(255,255,255,0.15)"}`,
    background: active ? "var(--gold)" : "transparent",
    color: active ? "var(--navy)" : "rgba(255,255,255,0.7)",
    fontFamily: "var(--font-heading)",
    fontSize: "0.85rem",
    fontWeight: active ? 700 : 400,
    letterSpacing: "0.06em",
    cursor: "pointer",
    transition: "all 0.18s",
    userSelect: "none",
  }),
  input: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(200,147,26,0.3)",
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    padding: "0.6rem 1rem",
    width: "100%",
    maxWidth: 200,
    outline: "none",
  },
  divider: {
    borderTop: "1px solid rgba(200,147,26,0.12)",
    margin: "1.6rem 0",
  },
  resultBox: {
    background: "rgba(200,147,26,0.08)",
    border: "1px solid rgba(200,147,26,0.35)",
    padding: "1.6rem 2rem",
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.55)",
    fontWeight: 300,
  },
  resultValue: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "var(--gold-light)",
    letterSpacing: "0.04em",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTop: "1px solid rgba(200,147,26,0.3)",
    paddingTop: 14,
    marginTop: 8,
  },
  totalLabel: {
    fontFamily: "var(--font-display)",
    fontSize: "1.4rem",
    letterSpacing: "0.08em",
    color: "#fff",
  },
  totalValue: {
    fontFamily: "var(--font-display)",
    fontSize: "2.2rem",
    letterSpacing: "0.04em",
    color: "var(--gold)",
  },
  notice: {
    fontSize: "0.74rem",
    color: "rgba(255,255,255,0.32)",
    marginTop: 14,
    lineHeight: 1.6,
  },
  addonNote: {
    fontSize: "0.77rem",
    color: "rgba(255,255,255,0.36)",
    marginTop: 6,
    lineHeight: 1.5,
  },
  errorMsg: {
    color: "var(--gold-light)",
    fontSize: "0.82rem",
    marginTop: 6,
    fontWeight: 500,
  },
  select: {
    background: "var(--navy-mid)",
    border: "1px solid rgba(200,147,26,0.3)",
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    padding: "0.6rem 1rem",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    appearance: "auto",
  },
  textarea: {
    background: "var(--navy-mid)",
    border: "1px solid rgba(200,147,26,0.3)",
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    padding: "0.7rem 1rem",
    width: "100%",
    outline: "none",
    resize: "vertical",
    minHeight: 90,
    lineHeight: 1.6,
  },
  discountRow: { display: "flex", gap: 8, alignItems: "stretch" },
  discountInput: {
    background: "var(--navy-mid)",
    border: "1px solid rgba(200,147,26,0.3)",
    color: "#fff",
    fontFamily: "var(--font-heading)",
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "0.6rem 1rem",
    flex: 1,
    outline: "none",
  },
  discountBtn: {
    background: "var(--gold)",
    color: "var(--navy)",
    fontFamily: "var(--font-heading)",
    fontSize: "0.85rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    border: "none",
    padding: "0 1.2rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  discountApplied: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(200,147,26,0.12)",
    border: "1px solid rgba(200,147,26,0.4)",
    padding: "0.5rem 0.9rem",
    marginTop: 8,
  },
  discountAppliedText: {
    fontSize: "0.8rem",
    color: "var(--gold-light)",
    fontWeight: 600,
    letterSpacing: "0.06em",
  },
  discountRemove: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.4)",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    textDecoration: "underline",
  },
  savingsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  savingsLabel: { fontSize: "0.85rem", color: "#5ecf8a", fontWeight: 500 },
  savingsValue: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#5ecf8a",
    letterSpacing: "0.04em",
  },
};

// ─── COMPONENT ──────────────────────────────────────────────────
export default function PatchCalculator() {
  const [patchType, setPatchType] = useState("Embroidered");
  const [coverage, setCoverage] = useState("50%");
  const [size, setSize] = useState(3);
  const [customSize, setCustomSize] = useState("");
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [bullionVariant, setBullionVariant] = useState('HBC3 3"x3"');
  const [qty, setQty] = useState(100);
  const [qtyInput, setQtyInput] = useState("100");
  const [backing, setBacking] = useState("None");
  const [extraColors, setExtraColors] = useState(0);
  const [metallic, setMetallic] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState("");
  const [customNote, setCustomNote] = useState("");

  const PATCH_TYPES = ["Embroidered", "Blank", "Bullion Crest"];
  const COVERAGE_OPTIONS = ["50%", "75%", "100%"];
  const availSizes = patchType === "Blank" ? BLANK_SIZES : SIZES;
  const showBacking  = patchType === "Embroidered";
  const showCoverage = patchType === "Embroidered";
  const showSize     = patchType !== "Bullion Crest";

  useEffect(() => { calculate(); }, [patchType, coverage, size, customSize, useCustomSize, bullionVariant, qty, backing, extraColors, metallic]);

  function calculate() {
    setError("");
    const q = parseInt(qty);
    if (!q || q < 1) { setResult(null); return; }
    const sz = useCustomSize ? parseFloat(customSize) : size;
    let basePPP = null, backingAddon = 0, colorAddon = 0, metallicAddon = 0, notes = [];

    if (patchType === "Embroidered") {
      if (q < 12) { setError("Minimum order is 12 patches."); setResult(null); return; }
      if (useCustomSize) {
        if (!sz || sz <= 0) { setResult(null); return; }
        const lower = [...SIZES].reverse().find(s => s <= sz);
        const upper = SIZES.find(s => s >= sz);
        if (!lower && !upper) { setError("Size out of supported range."); setResult(null); return; }
        if (lower === upper || !upper) {
          basePPP = getEmbPrice(coverage, lower || upper, q);
        } else if (!lower) {
          basePPP = getEmbPrice(coverage, upper, q);
        } else {
          const t = (sz - lower) / (upper - lower);
          basePPP = getEmbPrice(coverage, lower, q) + t * (getEmbPrice(coverage, upper, q) - getEmbPrice(coverage, lower, q));
        }
        notes.push(`Custom size ${sz}" estimated by interpolation — confirm with a free quote.`);
      } else {
        basePPP = getEmbPrice(coverage, sz, q);
      }
      if (!basePPP) { setError("Price not available for this combination."); setResult(null); return; }
      colorAddon = Math.max(0, extraColors) * 0.08;
      if (metallic) metallicAddon = basePPP * 0.20;
      if (backing !== "None") {
        backingAddon = getBackingAddon(backing, Math.min(sz, 5));
        if (sz > 5) notes.push('Backing pricing shown up to 5" — contact us for larger sizes.');
      }
    } else if (patchType === "Blank") {
      if (q < 100) { setError("Minimum order for blank patches is 100."); setResult(null); return; }
      if (sz > 5) { setError('Blank patch pricing available up to 5".'); setResult(null); return; }
      basePPP = getBlankPrice(sz, q);
      if (!basePPP) { setError("Price not available for this combination."); setResult(null); return; }
    } else if (patchType === "Bullion Crest") {
      if (q < 10) { setError("Minimum order for Bullion Crests is 10."); setResult(null); return; }
      basePPP = getBullionPrice(bullionVariant, q);
      notes.push("Final price may vary based on design complexity.");
    }

    const ppp = basePPP + backingAddon + colorAddon + metallicAddon;
    setResult({ basePPP, backingAddon, colorAddon, metallicAddon, ppp, total: ppp * q, q, notes });
  }

  function handleQtyChange(e) {
    setQtyInput(e.target.value);
    const n = parseInt(e.target.value);
    if (!isNaN(n)) setQty(n);
  }

  function applyDiscount() {
    setDiscountError("");
    const code = discountCode.trim().toUpperCase();
    const found = DISCOUNT_CODES[code];
    if (!found) { setAppliedDiscount(null); setDiscountError("Invalid code. Please check and try again."); }
    else { setAppliedDiscount({ code, ...found }); }
  }

  function removeDiscount() {
    setAppliedDiscount(null); setDiscountCode(""); setDiscountError("");
  }

  function getDiscountedTotal(total) {
    if (!appliedDiscount) return total;
    if (appliedDiscount.type === "percent") return total * (1 - appliedDiscount.value / 100);
    if (appliedDiscount.type === "fixed")   return Math.max(0, total - appliedDiscount.value);
    return total;
  }

  return (
    <div style={S.card}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerTitle}>Patch Price Calculator</div>
        <div style={S.headerSub}>The Patch Solutions · Instant Estimate</div>
      </div>

      <div style={S.body}>
        {/* Step 1 — Patch Type */}
        <div style={S.row}>
          <span style={S.sectionLabel}>Step 1</span>
          <span style={S.label}>Select Patch Type</span>
          <div style={S.chipRow}>
            {PATCH_TYPES.map(t => (
              <div key={t} style={S.chip(patchType === t)}
                onClick={() => { setPatchType(t); setBacking("None"); setUseCustomSize(false); setCustomSize(""); }}>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Coverage */}
        {showCoverage && (
          <div style={S.row}>
            <span style={S.sectionLabel}>Step 2</span>
            <span style={S.label}>Embroidery Coverage</span>
            <div style={S.chipRow}>
              {COVERAGE_OPTIONS.map(c => (
                <div key={c} style={S.chip(coverage === c)} onClick={() => setCoverage(c)}>{c} Coverage</div>
              ))}
            </div>
            <div style={S.addonNote}>50% = standard logo · 75% = detailed design · 100% = fully filled patch</div>
          </div>
        )}

        {/* Bullion variant */}
        {patchType === "Bullion Crest" && (
          <div style={S.row}>
            <span style={S.sectionLabel}>Step 2</span>
            <span style={S.label}>Crest Size</span>
            <div style={S.chipRow}>
              {Object.keys(BULLION).map(v => (
                <div key={v} style={S.chip(bullionVariant === v)} onClick={() => setBullionVariant(v)}>{v}</div>
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        {showSize && (
          <div style={S.row}>
            <span style={S.sectionLabel}>{showCoverage ? "Step 3" : "Step 2"}</span>
            <span style={S.label}>Patch Size (inches)</span>
            <div style={S.chipRow}>
              {availSizes.map(s => (
                <div key={s} style={S.chip(!useCustomSize && size === s)}
                  onClick={() => { setSize(s); setUseCustomSize(false); }}>{s}"</div>
              ))}
              <div style={S.chip(useCustomSize)} onClick={() => setUseCustomSize(true)}>Custom</div>
            </div>
            {useCustomSize && (
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <input type="number" min="0.5" max="20" step="0.5" value={customSize}
                  onChange={e => setCustomSize(e.target.value)}
                  style={{ ...S.input, maxWidth: 140 }} placeholder='e.g. 8.5"' autoFocus />
                <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>inches</span>
              </div>
            )}
            {patchType === "Blank" && <div style={S.addonNote}>Size = (max length + max height) ÷ 2, rounded up to nearest 0.5"</div>}
            {useCustomSize && <div style={S.addonNote}>Custom sizes estimated by interpolation — free quote confirms exact price.</div>}
          </div>
        )}

        {/* Quantity */}
        <div style={S.row}>
          <span style={S.sectionLabel}>
            {patchType === "Embroidered" ? "Step 4" : "Step 3"}
          </span>
          <span style={S.label}>Quantity</span>
          <input type="number" min="1" value={qtyInput} onChange={handleQtyChange}
            style={S.input} placeholder="e.g. 100" />
          {patchType === "Embroidered"   && <div style={S.addonNote}>Min: 12 · Best value at 100+</div>}
          {patchType === "Blank"         && <div style={S.addonNote}>Min: 100</div>}
          {patchType === "Bullion Crest" && <div style={S.addonNote}>Min: 10</div>}
          {error && <div style={S.errorMsg}>⚠ {error}</div>}
        </div>

        {/* Add-ons */}
        {patchType === "Embroidered" && (
          <>
            <div style={S.divider} />
            <div style={S.row}>
              <span style={S.sectionLabel}>Add-Ons (Optional)</span>
              <div className="calc-addons-grid">
                <div>
                  <span style={S.label}>Special Backing</span>
                  <select value={backing} onChange={e => setBacking(e.target.value)} style={S.select}>
                    {Object.keys(BACKINGS).map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {backing !== "None" && size <= 5 && (
                    <div style={S.addonNote}>+{fmt(getBackingAddon(backing, size))} per patch</div>
                  )}
                </div>
                <div>
                  <span style={S.label}>Extra Colors (over 8)</span>
                  <div style={S.chipRow}>
                    {[0,1,2,3,4].map(n => (
                      <div key={n} style={S.chip(extraColors === n)} onClick={() => setExtraColors(n)}>
                        {n === 0 ? "None" : `+${n}`}
                      </div>
                    ))}
                  </div>
                  {extraColors > 0 && <div style={S.addonNote}>+${(extraColors * 0.08).toFixed(2)} per patch</div>}
                </div>
              </div>
              <div style={{ marginTop: "1.2rem" }}>
                <span style={S.label}>Metallic Thread</span>
                <div style={S.chipRow}>
                  <div style={S.chip(!metallic)} onClick={() => setMetallic(false)}>No</div>
                  <div style={S.chip(metallic)}  onClick={() => setMetallic(true)}>Yes (+20%)</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Discount */}
        <div style={S.divider} />
        <div style={S.row}>
          <span style={S.sectionLabel}>Discount Code</span>
          <span style={S.label}>Have a promo code?</span>
          {!appliedDiscount ? (
            <>
              <div style={S.discountRow}>
                <input type="text" value={discountCode}
                  onChange={e => { setDiscountCode(e.target.value); setDiscountError(""); }}
                  onKeyDown={e => e.key === "Enter" && applyDiscount()}
                  style={S.discountInput} placeholder="Enter code e.g. WELCOME10" />
                <button style={S.discountBtn} onClick={applyDiscount}>Apply</button>
              </div>
              {discountError && <div style={S.errorMsg}>⚠ {discountError}</div>}
            </>
          ) : (
            <div style={S.discountApplied}>
              <span style={S.discountAppliedText}>✓ {appliedDiscount.code} — {appliedDiscount.label}</span>
              <button style={S.discountRemove} onClick={removeDiscount}>Remove</button>
            </div>
          )}
        </div>

        {/* Notes */}
        <div style={S.row}>
          <span style={S.sectionLabel}>Order Notes</span>
          <span style={S.label}>Any special instructions or details?</span>
          <textarea value={customNote} onChange={e => setCustomNote(e.target.value)} style={S.textarea}
            placeholder="e.g. Need hook & loop on back, specific thread colors, rush order needed by a certain date..."
            maxLength={500} />
          <div style={{ ...S.addonNote, textAlign: "right", marginTop: 4 }}>{customNote.length}/500</div>
        </div>

        {/* Result */}
        {result && (
          <>
            <div style={S.divider} />
            <div style={S.resultBox}>
              <div style={{ ...S.sectionLabel, marginBottom: 16 }}>Your Estimate</div>

              <div style={S.resultRow}>
                <span style={S.resultLabel}>Base price per patch</span>
                <span style={S.resultValue}>{fmt(result.basePPP)}</span>
              </div>
              {result.backingAddon > 0 && (
                <div style={S.resultRow}>
                  <span style={S.resultLabel}>Backing add-on</span>
                  <span style={S.resultValue}>+{fmt(result.backingAddon)}</span>
                </div>
              )}
              {result.colorAddon > 0 && (
                <div style={S.resultRow}>
                  <span style={S.resultLabel}>Extra colors ({extraColors} × $0.08)</span>
                  <span style={S.resultValue}>+{fmt(result.colorAddon)}</span>
                </div>
              )}
              {result.metallicAddon > 0 && (
                <div style={S.resultRow}>
                  <span style={S.resultLabel}>Metallic thread (20%)</span>
                  <span style={S.resultValue}>+{fmt(result.metallicAddon)}</span>
                </div>
              )}
              <div style={S.resultRow}>
                <span style={S.resultLabel}>Final price per patch</span>
                <span style={{ ...S.resultValue, color: "#fff" }}>{fmt(result.ppp)}</span>
              </div>
              <div style={S.resultRow}>
                <span style={S.resultLabel}>Quantity</span>
                <span style={S.resultValue}>× {result.q.toLocaleString()}</span>
              </div>

              <div style={S.totalRow}>
                <span style={S.totalLabel}>Estimated Total</span>
                <span style={S.totalValue}>{fmt(result.total)}</span>
              </div>

              {appliedDiscount && (() => {
                const discounted = getDiscountedTotal(result.total);
                const savings = result.total - discounted;
                return (
                  <>
                    <div style={{ ...S.savingsRow, marginTop: 10 }}>
                      <span style={S.savingsLabel}>Discount ({appliedDiscount.code})</span>
                      <span style={S.savingsValue}>− {fmt(savings)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid rgba(94,207,138,0.3)", paddingTop: 12, marginTop: 4 }}>
                      <span style={{ ...S.totalLabel, color: "#5ecf8a" }}>Total After Discount</span>
                      <span style={{ ...S.totalValue, color: "#5ecf8a" }}>{fmt(discounted)}</span>
                    </div>
                  </>
                );
              })()}

              {result.notes.length > 0 && <div style={S.notice}>{result.notes.join(" ")}</div>}
              <div style={S.notice}>
                * This is an estimate only. Final pricing confirmed upon free quote. Includes free setup, up to 8 colors, free sample, and flat-rate shipping.
              </div>

              {customNote.trim() && (
                <div style={{ marginTop: 12, padding: "0.7rem 0.9rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ ...S.sectionLabel, marginBottom: 4 }}>Order Note</div>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, fontWeight: 300 }}>{customNote}</p>
                </div>
              )}

              <Link to="/contact" className="btn-gold" style={{ display: "block", textAlign: "center", marginTop: "1.4rem" }}>
                Get Your Free Official Quote →
              </Link>
            </div>
          </>
        )}

        {/* Inclusions footer */}
        <div style={{ ...S.divider, marginTop: "1.6rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem 1.4rem" }}>
          {["Free Quote","Free Setup","Up to 8 Colors Included","Free Sample","Fast Turnaround","Any Shape & Size"].map(f => (
            <span key={f} style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "var(--gold)", fontWeight: 700 }}>✓</span> {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
