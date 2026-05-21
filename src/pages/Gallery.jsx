import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Constants ───────────────────────────────────────────────── */
const FILTERS = ['All', 'Military', 'Sports', 'Organizations', 'Motorcycle', 'Schools', 'Corporate']

const GALLERY_ITEMS = [
  { id: 1,  title: 'Army Unit Patch',      category: 'Military',      bgClass: 'patch-bg-1', emoji: '★'  },
  { id: 2,  title: 'Ranger Battalion',     category: 'Military',      bgClass: 'patch-bg-7', emoji: '⚔'  },
  { id: 3,  title: 'Navy Squadron',        category: 'Military',      bgClass: 'patch-bg-1', emoji: '⚓'  },
  { id: 4,  title: 'Police Department',    category: 'Organizations', bgClass: 'patch-bg-6', emoji: '🛡'  },
  { id: 5,  title: 'Fire Station 12',      category: 'Organizations', bgClass: 'patch-bg-8', emoji: '🔥'  },
  { id: 6,  title: 'Soccer Club FC',       category: 'Sports',        bgClass: 'patch-bg-3', emoji: '⚽'  },
  { id: 7,  title: 'Baseball League',      category: 'Sports',        bgClass: 'patch-bg-3', emoji: '⚾'  },
  { id: 8,  title: 'Wrestling Team',       category: 'Sports',        bgClass: 'patch-bg-2', emoji: '🏆'  },
  { id: 9,  title: 'MC Iron Brotherhood', category: 'Motorcycle',    bgClass: 'patch-bg-2', emoji: '✕'  },
  { id: 10, title: 'Desert Riders MC',     category: 'Motorcycle',    bgClass: 'patch-bg-5', emoji: '🏍'  },
  { id: 11, title: 'Rolling Thunder',      category: 'Motorcycle',    bgClass: 'patch-bg-6', emoji: '⚡'  },
  { id: 12, title: 'East High School',     category: 'Schools',       bgClass: 'patch-bg-8', emoji: 'E'   },
  { id: 13, title: 'Scout Troop 42',       category: 'Schools',       bgClass: 'patch-bg-3', emoji: '◆'  },
  { id: 14, title: 'University Athletics', category: 'Schools',       bgClass: 'patch-bg-1', emoji: 'U'   },
  { id: 15, title: 'Tech Corp Logo',       category: 'Corporate',     bgClass: 'patch-bg-6', emoji: 'T'   },
  { id: 16, title: 'Eagle Scout Merit',    category: 'Organizations', bgClass: 'patch-bg-3', emoji: '◎'  },
  { id: 17, title: 'Marathon 2024',        category: 'Sports',        bgClass: 'patch-bg-5', emoji: '🏅'  },
  { id: 18, title: 'Volunteer EMT',        category: 'Organizations', bgClass: 'patch-bg-8', emoji: '✚'  },
]

/* ══════════════════════════════════════════════════════════════
   GALLERY PAGE
══════════════════════════════════════════════════════════════ */
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleItems =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <>
      {/* ── 1. PAGE HERO ────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <span className="overline">Our Portfolio</span>
          <h1 className="heading-1">Patches We've Built</h1>
          <p className="lead">
            A showcase of our craft — thousands of unique patches delivered to clients worldwide.
          </p>
        </div>
      </section>

      {/* ── 2. GALLERY SECTION ──────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          {/* Filter Bar */}
          <div className="gallery-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`filter-btn${activeFilter === filter ? ' filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {visibleItems.map((item) => (
              <div key={item.id} className="gallery-item">
                <div
                  className={`gallery-item__visual ${item.bgClass}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                  }}
                >
                  {item.emoji}
                </div>
                <div className="gallery-item__overlay">
                  <span className="gallery-item__label">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CTA BANNER ───────────────────────────────────────── */}
      <div className="cta-banner">
        <div className="container">
          <h2 className="heading-1">Inspired by What You See?</h2>
          <p>Let's create something unique for your group, team, or organization.</p>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn btn--gold btn--lg">
              Start Your Order
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
