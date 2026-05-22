import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import useSEO from '../../hooks/useSEO'
import Breadcrumb from '../../components/Breadcrumb'
import { POSTS } from '../../data/blogData'

function ContentSection({ section }) {
  switch (section.type) {
    case 'paragraph':
      return <p style={{ color: 'var(--gray-mid)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '1.02rem' }}>{section.text}</p>
    case 'heading':
      return <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)', letterSpacing: '0.03em', marginTop: '2.5rem', marginBottom: '0.75rem' }}>{section.text}</h2>
    case 'list':
      return (
        <ul style={{ color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          {section.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
          ))}
        </ul>
      )
    case 'tip':
      return (
        <div style={{ background: 'rgba(200,147,26,0.08)', borderLeft: '4px solid var(--gold)', padding: '1rem 1.25rem', borderRadius: '0 4px 4px 0', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.4rem' }}>PRO TIP</span>
          <p style={{ color: 'var(--navy)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>{section.text}</p>
        </div>
      )
    case 'warning':
      return (
        <div style={{ background: 'rgba(181,32,32,0.06)', borderLeft: '4px solid var(--red)', padding: '1rem 1.25rem', borderRadius: '0 4px 4px 0', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', display: 'block', marginBottom: '0.4rem' }}>IMPORTANT</span>
          <p style={{ color: 'var(--navy)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>{section.text}</p>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find(p => p.slug === slug)

  useSEO(
    post ? post.title : '404 — Post Not Found',
    post ? post.excerpt : 'This blog post was not found.'
  )

  // Structured data for SEO
  useEffect(() => {
    if (!post) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      image: post.img,
      author: { '@type': 'Organization', name: 'The Patch Solutions' },
      publisher: { '@type': 'Organization', name: 'The Patch Solutions', url: 'https://www.thepatchsolutions.com' },
    })
    document.head.appendChild(script)
    return () => { if (script.parentNode) script.parentNode.removeChild(script) }
  }, [post])

  if (!post) {
    return (
      <section style={{ background: 'var(--navy)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '1rem' }}>Post Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>This blog post doesn&apos;t exist or may have been moved.</p>
          <Link to="/about/blog" className="btn-gold">Back to Blog</Link>
        </div>
      </section>
    )
  }

  const related = POSTS.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/about/blog', label: 'Blog' },
        { label: post.title },
      ]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">{post.category}</span>
          <h1>{post.title}</h1>
          <p style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </p>
        </div>
      </section>

      {/* Featured image */}
      <div style={{ width: '100%', maxHeight: 460, overflow: 'hidden' }}>
        <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {/* Excerpt lead */}
          <p style={{ fontSize: '1.18rem', color: 'var(--navy)', lineHeight: 1.75, marginBottom: '2.5rem', fontWeight: 500, borderBottom: '1px solid rgba(11,26,46,0.1)', paddingBottom: '2rem' }}>{post.excerpt}</p>

          {post.content.map((section, i) => (
            <ContentSection key={i} section={section} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy-mid)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to Order?</span>
          <h2 className="section-title light" style={{ marginBottom: '0.75rem' }}>Get Your Custom Patches Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem' }}>Free quote, free design proof, free samples — no obligation.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-quote" className="btn-gold">Get a Free Quote</Link>
            <Link to="/about/blog" className="btn-outline-light">Back to Blog</Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section style={{ padding: '4rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '2rem' }}>Related Posts</h2>
          <div className="card-grid-3">
            {related.map(p => (
              <Link key={p.slug} to={`/about/blog/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'var(--white)', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(11,26,46,0.08)' }}>
                  <div style={{ height: 160, overflow: 'hidden' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>{p.category}</span>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', margin: '0.4rem 0 0.6rem', lineHeight: 1.3 }}>{p.title}</p>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600 }}>Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
