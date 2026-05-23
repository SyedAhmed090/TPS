import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'
import { supabase } from '../../lib/supabase'

export default function Blog() {
  useReveal()
  useSEO('Blog', 'Tips, guides, and stories about custom patches — iron-on application, embroidery vs. printing, design advice, and more.')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('slug, title, excerpt, category, cover_image, published_at, read_time')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data)
        setLoading(false)
      })
  }, [])

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
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--gray-mid)', padding: '3rem 0' }}>Loading...</p>
        ) : (
          <div className="blog-grid reveal">
            {posts.map(post => (
              <Link key={post.slug} to={`/about/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article className="blog-card">
                  <div className="blog-card__img">
                    <img src={post.cover_image} alt={post.title} />
                  </div>
                  <div className="blog-card__body">
                    <span className="blog-card__tag">{post.category}</span>
                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
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
