import { useParams, Link } from 'react-router-dom'
import useSEO from '../../hooks/useSEO'
import Breadcrumb from '../../components/Breadcrumb'

const POSTS = [
  {
    slug: 'how-to-iron-on-a-patch',
    title: 'How to Iron On a Patch: The Complete Guide',
    category: 'DIY Guides',
    date: 'May 10, 2025',
    img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80',
    excerpt: 'Everything you need to know about applying iron-on patches at home — temperatures, fabrics, tips for a permanent bond, and what to do if it doesn\'t stick.',
  },
  {
    slug: 'embroidered-patches-vs-printed',
    title: '5 Reasons Embroidered Patches Outlast Printed Ones',
    category: 'Industry',
    date: 'April 22, 2025',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    excerpt: 'Embroidery vs. printing — it\'s not a close contest. Here\'s why thread-sewn patches hold up over years of wear and washing while printed patches fade.',
  },
  {
    slug: 'pvc-vs-embroidered-patches',
    title: 'PVC vs. Embroidered Patches: Which Is Right for You?',
    category: 'Product Guide',
    date: 'April 5, 2025',
    img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
    excerpt: 'Both are great options — but for different applications. We break down the pros, cons, and ideal uses of PVC rubber vs. traditional embroidered patches.',
  },
  {
    slug: 'history-of-motorcycle-club-patches',
    title: 'The History of the Motorcycle Club Patch',
    category: 'History',
    date: 'March 18, 2025',
    img: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=1200&q=80',
    excerpt: 'From WWII veterans to today\'s riding clubs — the evolution of the MC patch is a story of identity, brotherhood, and tradition that spans 80 years.',
  },
  {
    slug: 'how-to-sew-on-a-patch',
    title: 'How to Sew On a Patch by Hand or Machine',
    category: 'DIY Guides',
    date: 'March 2, 2025',
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80',
    excerpt: 'Sewing on a patch is the most durable attachment method. This guide walks you through both hand and machine sewing for a clean, professional result.',
  },
  {
    slug: 'designing-your-first-custom-patch',
    title: 'Designing Your First Custom Patch: A Beginner\'s Guide',
    category: 'Getting Started',
    date: 'February 14, 2025',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80',
    excerpt: 'Never ordered a custom patch before? This step-by-step guide walks you through artwork requirements, file formats, choosing a patch type, and what to expect.',
  },
]

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find(p => p.slug === slug)

  useSEO(
    post ? post.title : 'Blog Post Not Found',
    post ? post.excerpt : undefined
  )

  if (!post) {
    return (
      <section style={{ background: 'var(--navy)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '1rem' }}>Post Not Found</h1>
          <Link to="/about/blog" className="btn-gold">Back to Blog</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/about/blog', label: 'Blog' },
        { label: post.title },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.date}</p>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 0', maxWidth: 800 }}>
        <div style={{ borderRadius: 4, overflow: 'hidden', marginBottom: '2.5rem', maxHeight: 420 }}>
          <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <p style={{ fontSize: '1.1rem', color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: '2rem' }}>{post.excerpt}</p>
        <div style={{ background: 'var(--navy-light)', border: '1px solid rgba(200,147,26,0.2)', padding: '2rem', borderRadius: 4, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>Want to learn more? Our patch experts are happy to answer your questions.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-gold">Get a Free Quote</Link>
            <Link to="/about/blog" className="btn-outline">Back to Blog</Link>
          </div>
        </div>
      </section>
    </>
  )
}
