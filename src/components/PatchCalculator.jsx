import { useState, useEffect } from "react";
import QuoteModal from "./QuoteModal";
import {
  SIZES, QTY_TIERS, BACKINGS,
  BLANK_SIZES, BLANK_QTY_TIERS, BULLION, DISCOUNT_CODES,
  getEmbPrice, getBackingAddon, getBlankPrice, getBullionPrice,
} from "../data/pricingData";

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
  const [modalOpen, setModalOpen] = useState(false);

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
      if (q < 25) { setError("Minimum order is 25 patches."); setResult(null); return; }
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

  function buildSummary() {
    if (!result) return null
    const sz = useCustomSize ? `${parseFloat(customSize)}"` : `${size}"`
    const parts = [patchType]
    if (patchType === "Bullion Crest") parts.push(bullionVariant)
    else parts.push(sz)
    if (patchType === "Embroidered") parts.push(`${coverage} coverage`)
    parts.push(`${result.q} patches`, `${fmt(result.ppp)}/patch`)
    const total = appliedDiscount ? getDiscountedTotal(result.total) : result.total
    parts.push(`Est. ${fmt(total)}`)
    return parts.join(' · ')
  }

  return (
    <div style={S.card} className="patch-calc-card">
      {/* Header */}
      <div style={S.header} className="patch-calc-header">
        <div style={S.headerTitle}>Patch Price Calculator</div>
        <div style={S.headerSub}>The Patch Solutions · Instant Estimate</div>
      </div>

      <div style={S.body} className="patch-calc-body">
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
          {patchType === "Embroidered"   && <div style={S.addonNote}>Min: 25 · Best value at 100+</div>}
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

              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold"
                style={{ display: "block", width: "100%", textAlign: "center", marginTop: "1.4rem", border: "none", cursor: "pointer", padding: "0.85rem" }}
              >
                Get Your Free Official Quote →
              </button>
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

      <QuoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        summary={result ? buildSummary() : null}
      />
    </div>
  );
}
