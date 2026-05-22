import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const FILTERS = ['All', 'Military', 'Sports', 'Organizations', 'Motorcycle', 'Schools', 'Corporate']

const ITEMS = [
  { id: 1,  title: 'Army Unit Patch',        category: 'Military',       img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 2,  title: 'Special Forces Tab',     category: 'Military',       img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80' },
  { id: 3,  title: 'Naval Squadron',         category: 'Military',       img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' },
  { id: 4,  title: 'Police Department',      category: 'Organizations',  img: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=600&q=80' },
  { id: 5,  title: 'Fire Station Badge',     category: 'Organizations',  img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80' },
  { id: 6,  title: 'Soccer Club Crest',      category: 'Sports',         img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80' },
  { id: 7,  title: 'Baseball League',        category: 'Sports',         img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80' },
  { id: 8,  title: 'Wrestling Championship', category: 'Sports',         img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80' },
  { id: 9,  title: 'Iron Brotherhood MC',    category: 'Motorcycle',     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 10, title: 'Desert Riders MC',       category: 'Motorcycle',     img: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=600&q=80' },
  { id: 11, title: 'Rolling Thunder MC',     category: 'Motorcycle',     img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' },
  { id: 12, title: 'East High School',       category: 'Schools',        img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80' },
  { id: 13, title: 'Scout Troop 42',         category: 'Schools',        img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80' },
  { id: 14, title: 'University Athletics',   category: 'Schools',        img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80' },
  { id: 15, title: 'Tech Corp Logo',         category: 'Corporate',      img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80' },
  { id: 16, title: 'Eagle Scout Merit',      category: 'Organizations',  img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80' },
  { id: 17, title: 'Marathon 2024',          category: 'Sports',         img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80' },
  { id: 18, title: 'Volunteer EMT',          category: 'Organizations',  img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80' },
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const visible = activeFilter === 'All' ? ITEMS : ITEMS.filter(i => i.category === activeFilter)

  return (
    <>
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { label: 'Gallery' }]} />

      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Our Portfolio</span>
          <h1>Patches We've Built</h1>
          <p>A showcase of our craft — thousands of unique patches delivered to clients across the country.</p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="gallery-filters">
            {FILTERS.map(f => (
              <button key={f} className={`filter-btn${activeFilter === f ? ' filter-btn--active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="gallery-grid">
            {visible.map(item => (
              <div key={item.id} className="gallery-item">
                <img src={item.img} alt={item.title} className="gallery-item__visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__label">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Start Your Order</span>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>See Your Design Here</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem' }}>Every patch we've made started with a free quote. Yours is one click away.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/contact" className="btn-outline-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
