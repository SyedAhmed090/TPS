import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const GUIDES = [
  {
    title: 'How to Iron On a Patch',
    steps: [
      'Preheat your iron to the cotton/linen setting (no steam).',
      'Place your garment on a firm, flat surface — an ironing board or folded towel.',
      'Position the patch on the fabric and cover with a thin pressing cloth.',
      'Press the iron firmly over the patch for 15–30 seconds with firm downward pressure.',
      'Let cool for 30 seconds, then press from the inside of the garment for 15 seconds.',
      'Test adhesion by gently tugging an edge. If needed, press again.',
    ],
    tip: 'For best results, we recommend finishing with a few stitches around the border — especially for items that will be washed frequently.',
    img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
  },
  {
    title: 'How to Sew On a Patch by Hand',
    steps: [
      'Thread your needle with thread that matches the patch border color.',
      'Position the patch on the garment and pin it in place.',
      'Begin stitching at the back of the fabric, pushing the needle through to the front just inside the patch border.',
      'Use a whip stitch or running stitch around the entire perimeter.',
      'Space stitches evenly — about 1/8" apart — for a clean appearance.',
      'Tie off securely at the back when you reach your starting point.',
    ],
    tip: 'Use a thimble to push the needle through thick fabrics. A curved needle helps on tight areas.',
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
  },
  {
    title: 'How to Care for Patched Garments',
    steps: [
      'Turn patched garments inside-out before washing.',
      'Use cold water and a gentle cycle.',
      'Avoid bleach — it can damage thread colors and backing adhesive.',
      'Tumble dry on low heat or hang to dry.',
      'If a corner lifts after washing, simply re-press with an iron.',
      'For sew-on patches, check stitching periodically and re-sew loose areas.',
    ],
    tip: 'Iron-on patches may loosen over time on garments washed frequently. A few stitches at the corners will extend patch life significantly.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
]

export default function DoItYourself() {
  useReveal()
  useSEO('Do It Yourself Patches', 'DIY patch guides from The Patch Solutions — how to apply, sew, and design your own custom patches.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { label: 'Do It Yourself' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Patch Application Guides</span>
          <h1>Do It Yourself</h1>
          <p>Step-by-step guides for applying, sewing, and caring for your custom patches — from the people who make them.</p>
        </div>
      </section>

      <section className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {GUIDES.map((g, i) => (
            <div key={g.title} className={`detail-layout${i % 2 !== 0 ? ' detail-layout--reverse' : ''} reveal`}>
              <div className="detail-img">
                <img src={g.img} alt={g.title} />
              </div>
              <div>
                <h2 className="detail-title">{g.title}</h2>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', paddingLeft: '1.25rem' }}>
                  {g.steps.map((s, si) => (
                    <li key={si} style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-dark)' }}>{s}</li>
                  ))}
                </ol>
                <div className="detail-tip">
                  <strong>Pro Tip</strong>
                  {g.tip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Still Have Questions?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Our team is happy to walk you through any application question.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/about/faqs" className="btn-primary">Browse FAQs</Link>
            <Link to="/contact" className="btn-outline-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
