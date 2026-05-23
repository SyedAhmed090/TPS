import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const BORDER_TYPES = [
  {
    name: 'Merrowed Border',
    desc: 'The classic patch border — a tightly stitched thread edge that wraps around the patch perimeter. Merrowed borders are durable, traditional, and available in any thread color. Standard on most embroidered patches.',
    best: 'Oval, round, and rectangular patches',
    img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches',
  },
  {
    name: 'Die-Cut Border',
    desc: 'A die-cut border cuts the patch to a precise custom shape using a metal die. The result is a clean, sharp edge that follows your artwork exactly — with no fabric overhang. Available as a flat cut or combined with a thin satin border.',
    best: 'Custom shapes, logos, and irregular outlines',
    img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches',
  },
  {
    name: 'Hot-Cut Border',
    desc: 'Hot-cut borders use heat to trim the patch and simultaneously seal the edges, preventing fraying. Produces a very clean edge similar to die-cut but without requiring a custom die — lower cost for simple shapes.',
    best: 'Woven patches, simple geometric shapes',
    img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches',
  },
  {
    name: 'Laser-Cut Border',
    desc: 'Laser cutting delivers the most precise edge of any border method. A laser beam cuts the exact outline of your design with sub-millimeter accuracy, enabling extremely complex shapes and fine detail in the patch outline.',
    best: 'Intricate shapes, fine details, premium patches',
    img: 'https://placehold.co/600x400/142340/C8931A?text=Custom+Patches',
  },
]

export default function PatchBorders() {
  useReveal()
  useSEO('Patch Borders', 'Learn about custom patch border styles — merrowed, laser-cut, die-cut, and more from The Patch Solutions.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/patches', label: 'Patches' },
        { label: 'Patch Borders' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Finishing Details</span>
          <h1>Patch Borders</h1>
          <p>The border defines the shape of your patch. Learn about merrowed, die-cut, hot-cut, and laser-cut borders to choose the right finish for your design.</p>
        </div>
      </section>

      <section className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {BORDER_TYPES.map((b, i) => (
            <div key={b.name} className={`detail-layout${i % 2 !== 0 ? ' detail-layout--reverse' : ''} reveal`}>
              <div className="detail-img">
                <img src={b.img} alt={b.name} />
              </div>
              <div>
                <span className="detail-label">Border Type</span>
                <h2 className="detail-title">{b.name}</h2>
                <p className="detail-desc">{b.desc}</p>
                <div className="detail-tip">
                  <strong>Best For</strong>
                  {b.best}
                </div>
                <Link to="/contact" className="btn-primary">Request This Border</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--red)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Not Sure Which Border?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>Our team will recommend the best border for your design and budget — free consultation.</p>
          <Link to="/contact" className="btn-outline-light">Get Expert Advice</Link>
        </div>
      </section>
    </>
  )
}
