import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import useReveal from '../hooks/useReveal'
import useSEO from '../hooks/useSEO'

// Update downloadUrl for each template once files are uploaded to Supabase Storage.
// Leave as null to show the "Request Template" fallback.
const TEMPLATES = [
  {
    type: 'Embroidered Patches',
    description: 'Includes stitch boundary zones, safe area margins, size indicators, and thread color labeling guidelines. Ideal for vector-based artwork.',
    formats: ['AI', 'PSD', 'PDF'],
    specs: ['Minimum 300 DPI for raster elements', 'Safe zone: 2mm from border', 'Outline all text to paths'],
    downloadUrl: null,
  },
  {
    type: 'Woven Patches',
    description: 'Flat-woven template with fine detail guidelines. Woven patches support smaller text and finer lines than embroidery.',
    formats: ['AI', 'PSD', 'PDF'],
    specs: ['Minimum 600 DPI for fine detail', 'Text min size: 4pt', 'No gradients — solid colors only'],
    downloadUrl: null,
  },
  {
    type: 'PVC Patches',
    description: '3D rubber mold template with layer depth guidelines, undercut restrictions, and pantone color mapping.',
    formats: ['AI', 'PDF'],
    specs: ['Max 4 color layers', 'Minimum feature size: 1.5mm', 'Sharp corners allowed'],
    downloadUrl: null,
  },
  {
    type: 'Chenille Patches',
    description: 'Chenille-specific template with yarn fill zones, felt base layer, and applique stitch boundary indicators.',
    formats: ['AI', 'PSD', 'PDF'],
    specs: ['Bold shapes work best', 'Min letter height: 12mm', 'No fine detail in yarn areas'],
    downloadUrl: null,
  },
  {
    type: 'Leather Patches',
    description: 'Debossing and laser-engraving template with depth zones, leather grain direction guide, and edge finish options.',
    formats: ['AI', 'PDF'],
    specs: ['Vector paths only', 'Min line weight: 0.5pt', 'No photo-realistic images'],
    downloadUrl: null,
  },
  {
    type: 'Dye Sublimation Patches',
    description: 'Full-color sublimation template with bleed zones, ICC color profile guidance, and edge-to-edge print boundary.',
    formats: ['AI', 'PSD', 'PDF'],
    specs: ['RGB color mode', 'Min 300 DPI at print size', 'Bleed: 3mm on all sides'],
    downloadUrl: null,
  },
]

const FORMAT_COLORS = { AI: '#f97316', PSD: '#3b82f6', PDF: '#ef4444' }

export default function DesignTemplates() {
  useSEO(
    'Design Templates',
    'Download free custom patch design templates — AI, PSD, and PDF files for embroidered, woven, PVC, chenille, leather, and dye sublimation patches.'
  )
  useReveal()

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Design Templates' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Free Download</span>
          <h1>Design Templates</h1>
          <p>Set up your artwork correctly the first time. Download our free templates for every patch type — includes safe zones, bleed guidelines, and spec sheets.</p>
        </div>
      </section>

      <section className="container">
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div style={{ background: 'var(--navy)', padding: '1.5rem 2rem', borderLeft: '4px solid var(--gold)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: 'var(--gold)' }}>Don't have design software?</strong> No problem — send us your concept sketch, logo file, or description and our art team will create a proof for free.
              </p>
            </div>
            <Link to="/free-quote" className="btn-gold" style={{ whiteSpace: 'nowrap' }}>Get a Free Proof</Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {TEMPLATES.map(t => (
            <div key={t.type} className="reveal" style={{ background: 'var(--white)', border: '1px solid rgba(11,26,46,0.1)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'var(--navy)', padding: '1.25rem 1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.3rem', letterSpacing: '0.04em', margin: 0 }}>{t.type}</h2>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                  {t.formats.map(f => (
                    <span key={f} style={{ background: FORMAT_COLORS[f] || '#6b7280', color: '#fff', padding: '2px 8px', fontSize: '0.68rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', fontWeight: 700 }}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{t.description}</p>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.5rem' }}>Key Specs</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                    {t.specs.map(s => (
                      <li key={s} style={{ display: 'flex', gap: '0.5rem', color: 'var(--gray-mid)', fontSize: '0.82rem' }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  {t.downloadUrl ? (
                    <a href={t.downloadUrl} download style={{ display: 'inline-block', padding: '0.6rem 1.25rem', background: 'var(--navy)', color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer' }}>
                      ↓ Download Template
                    </a>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <a href="mailto:info@thepatchsolutions.com?subject=Design Template Request&body=I'd like the design template for: {t.type}" style={{ display: 'inline-block', padding: '0.6rem 1.25rem', background: 'var(--gold)', color: 'var(--navy)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 700 }}>
                        Request Template
                      </a>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gray-mid)' }}>Sent within 1 business day</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '4rem 0', marginTop: '3rem' }}>
        <div className="container reveal">
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">Artwork Guidelines</span>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Need Help with Your Artwork?</h2>
            <p style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Not a designer? That's fine. We accept logos, photos, scanned sketches, and rough ideas — our art team will turn them into production-ready artwork at no extra charge.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/about/artwork-guidelines" className="btn-primary">View Artwork Guidelines</Link>
              <Link to="/free-quote" className="btn-secondary">Submit Your Design</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Ready to Order?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Free quote, free design proof, no minimum commitment.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/request-samples" className="btn-outline-light">Request Samples</Link>
          </div>
        </div>
      </section>
    </>
  )
}
