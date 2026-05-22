import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const POSTS = [
  {
    title: 'How to Iron On a Patch: The Complete Guide',
    excerpt: 'Everything you need to know about applying iron-on patches at home — temperatures, fabrics, tips for a permanent bond, and what to do if it doesn\'t stick.',
    category: 'DIY Guides',
    date: 'May 10, 2025',
    img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
  },
  {
    title: '5 Reasons Embroidered Patches Outlast Printed Ones',
    excerpt: 'Embroidery vs. printing — it\'s not a close contest. Here\'s why thread-sewn patches hold up over years of wear and washing while printed patches fade.',
    category: 'Industry',
    date: 'April 22, 2025',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    title: 'PVC vs. Embroidered Patches: Which Is Right for You?',
    excerpt: 'Both are great options — but for different applications. We break down the pros, cons, and ideal uses of PVC rubber vs. traditional embroidered patches.',
    category: 'Product Guide',
    date: 'April 5, 2025',
    img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
  },
  {
    title: 'The History of the Motorcycle Club Patch',
    excerpt: 'From WWII veterans to today\'s riding clubs — the evolution of the MC patch is a story of identity, brotherhood, and tradition that spans 80 years.',
    category: 'History',
    date: 'March 18, 2025',
    img: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=600&q=80',
  },
  {
    title: 'How to Sew On a Patch by Hand or Machine',
    excerpt: 'Sewing on a patch is the most durable attachment method. This guide walks you through both hand and machine sewing for a clean, professional result.',
    category: 'DIY Guides',
    date: 'March 2, 2025',
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
  },
  {
    title: 'Designing Your First Custom Patch: A Beginner\'s Guide',
    excerpt: 'Never ordered a custom patch before? This step-by-step guide walks you through artwork requirements, file formats, choosing a patch type, and what to expect from the production process.',
    category: 'Getting Started',
    date: 'February 14, 2025',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
  },
]

export default function Blog() {
  useReveal()
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
        <div className="blog-grid reveal">
          {POSTS.map(post => (
            <article key={post.title} className="blog-card">
              <div className="blog-card__img">
                <img src={post.img} alt={post.title} />
              </div>
              <div className="blog-card__body">
                <span className="blog-card__tag">{post.category}</span>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.5rem' }}>{post.date}</span>
                <span className="blog-card__read">Read More →</span>
              </div>
            </article>
          ))}
        </div>
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
