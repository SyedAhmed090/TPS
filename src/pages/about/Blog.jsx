import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'
import { supabase } from '../../lib/supabase'

const CATEGORIES = ['Embroidery Tips', 'How-To', 'Industry News', 'Company Updates', 'Patch Care']

export default function Blog() {
  useReveal()
  useSEO('Blog', 'Tips, guides, and stories about custom patches — iron-on application, embroidery vs. printing, design advice, and more.')

  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [activeTag, setActiveTag] = useState(searchParams.get('tag') || '')

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('slug, title, excerpt, category, tags, cover_image, published_at, read_time')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data)
        setLoading(false)
      })
  }, [])

  // Sync filters to URL params
  useEffect(() => {
    const params = {}
    if (search) params.q = search
    if (activeCategory) params.category = activeCategory
    if (activeTag) params.tag = activeTag
    setSearchParams(params, { replace: true })
  }, [search, activeCategory, activeTag])

  // Clear other filters when switching category/tag
  function selectCategory(cat) {
    setActiveCategory(v => v === cat ? '' : cat)
    setActiveTag('')
  }

  function selectTag(tag) {
    setActiveTag(v => v === tag ? '' : tag)
    setActiveCategory('')
  }

  // Collect all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set()
    posts.forEach(p => (p.tags || []).forEach(t => tagSet.add(t)))
    return [...tagSet].sort()
  }, [posts])

  // Filter posts client-side
  const filtered = useMemo(() => {
    let p = posts
    if (activeCategory) p = p.filter(x => x.category === activeCategory)
    if (activeTag) p = p.filter(x => (x.tags || []).includes(activeTag))
    if (search.trim()) {
      const q = search.toLowerCase()
      p = p.filter(x => x.title.toLowerCase().includes(q) || x.excerpt?.toLowerCase().includes(q))
    }
    return p
  }, [posts, activeCategory, activeTag, search])

  const hasFilter = search || activeCategory || activeTag

  function formatDate(dateStr) {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { label: 'Blog' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Knowledge Base</span>
          <h1>The TPS Blog</h1>
          <p>Tips, guides, and stories from the world of custom patches — written by the people who make them.</p>
        </div>
      </section>

      <section className="container">
        {/* Search + filters */}
        <div className="reveal" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search posts..."
              style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', border: '1px solid rgba(11,26,46,0.15)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-dark)', outline: 'none', boxSizing: 'border-box' }}
            />
            <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-mid)', fontSize: '0.9rem', pointerEvents: 'none' }}>🔍</span>
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginRight: '0.25rem' }}>Category:</span>
            <button
              onClick={() => { setActiveCategory(''); setActiveTag('') }}
              style={{ padding: '0.35rem 0.8rem', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid', cursor: 'pointer', background: !activeCategory && !activeTag ? 'var(--navy)' : 'transparent', color: !activeCategory && !activeTag ? '#fff' : 'var(--gray-mid)', borderColor: !activeCategory && !activeTag ? 'var(--navy)' : 'rgba(11,26,46,0.2)' }}>
              All
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => selectCategory(cat)}
                style={{ padding: '0.35rem 0.8rem', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid', cursor: 'pointer', background: activeCategory === cat ? 'var(--navy)' : 'transparent', color: activeCategory === cat ? '#fff' : 'var(--gray-mid)', borderColor: activeCategory === cat ? 'var(--navy)' : 'rgba(11,26,46,0.2)' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Tag filter (only shown when tags exist) */}
          {allTags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginRight: '0.25rem' }}>Tags:</span>
              {allTags.map(tag => (
                <button key={tag} onClick={() => selectTag(tag)}
                  style={{ padding: '0.25rem 0.65rem', fontFamily: 'var(--font-heading)', fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid', cursor: 'pointer', background: activeTag === tag ? 'var(--gold)' : 'transparent', color: activeTag === tag ? 'var(--navy)' : 'var(--gray-mid)', borderColor: activeTag === tag ? 'var(--gold)' : 'rgba(11,26,46,0.15)' }}>
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {hasFilter && (
            <p style={{ fontSize: '0.83rem', color: 'var(--gray-mid)', margin: 0 }}>
              {filtered.length} post{filtered.length !== 1 ? 's' : ''} found
              {' '}
              <button onClick={() => { setSearch(''); setActiveCategory(''); setActiveTag('') }}
                style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '0.83rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                Clear filters
              </button>
            </p>
          )}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--gray-mid)', padding: '3rem 0' }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-mid)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No posts found</p>
            <p style={{ fontSize: '0.88rem' }}>Try a different search term or category.</p>
          </div>
        ) : (
          <div className="blog-grid reveal">
            {filtered.map(post => (
              <Link key={post.slug} to={`/about/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article className="blog-card">
                  <div className="blog-card__img">
                    <img src={post.cover_image} alt={post.title} />
                  </div>
                  <div className="blog-card__body">
                    <span className="blog-card__tag"
                      onClick={e => { e.preventDefault(); selectCategory(post.category) }}
                      style={{ cursor: 'pointer' }}>
                      {post.category}
                    </span>
                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        {post.tags.map(tag => (
                          <span key={tag}
                            onClick={e => { e.preventDefault(); selectTag(tag) }}
                            style={{ fontSize: '0.68rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', cursor: 'pointer', textDecoration: 'underline' }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.5rem' }}>{formatDate(post.published_at)}</span>
                    <span className="blog-card__read" style={{ color: 'var(--gold)' }}>Read More →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section style={{ background: 'var(--navy)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Have a Question?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Can't find what you're looking for? Our patch experts are happy to help.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/about/faqs" className="btn-primary">Browse FAQs</Link>
            <Link to="/contact" className="btn-outline-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
