import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatDate } from '../../utils/validation'

const th = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', whiteSpace: 'nowrap' }
const td = { padding: '10px 12px', fontSize: '0.88rem', color: 'var(--text-dark)', borderBottom: '1px solid rgba(11,26,46,0.07)', verticalAlign: 'middle' }

export default function BlogManager() {
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [editId, setEditId]     = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving]     = useState(false)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, category, tags, published, published_at, view_count, read_time')
      .order('published_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  async function togglePublished(post) {
    const newVal = !post.published
    await supabase.from('blog_posts').update({ published: newVal, published_at: newVal ? new Date().toISOString() : null }).eq('id', post.id)
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: newVal } : p))
  }

  function startEdit(post) {
    setEditId(post.id)
    setEditForm({ title: post.title, excerpt: post.excerpt || '', category: post.category || '', read_time: post.read_time || '', tags: (post.tags || []).join(', ') })
  }

  async function saveEdit() {
    setSaving(true)
    const tags = editForm.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    await supabase.from('blog_posts').update({
      title: editForm.title,
      excerpt: editForm.excerpt,
      category: editForm.category,
      read_time: parseInt(editForm.read_time) || null,
      tags,
    }).eq('id', editId)
    setPosts(prev => prev.map(p => p.id === editId ? { ...p, ...editForm, tags } : p))
    setEditId(null)
    setSaving(false)
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Blog Posts</h1>

      {editId && (
        <div style={{ background: 'var(--cream)', border: '1px solid rgba(11,26,46,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '1rem' }}>Edit Post</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[['title', 'Title'], ['category', 'Category'], ['read_time', 'Read Time (min)']].map(([key, label]) => (
              <div key={key}>
                <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 4 }}>{label}</label>
                <input value={editForm[key]} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 4 }}>Tags <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '0.72rem', color: 'var(--gray-mid)' }}>(comma-separated)</span></label>
              <input value={editForm.tags || ''} onChange={e => setEditForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="e.g. embroidery, iron-on, tutorial"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 4 }}>Excerpt</label>
            <textarea value={editForm.excerpt} onChange={e => setEditForm(f => ({ ...f, excerpt: e.target.value }))} rows={3}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(11,26,46,0.2)', background: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={saveEdit} disabled={saving} style={{ padding: '8px 20px', background: 'var(--navy)', color: '#fff', border: 'none', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={() => setEditId(null)} style={{ padding: '8px 20px', background: 'transparent', color: 'var(--navy)', border: '1px solid rgba(11,26,46,0.3)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--gray-mid)', padding: '2rem 0' }}>Loading...</p>
      ) : (
        <div style={{ background: 'var(--white)', border: '1px solid rgba(11,26,46,0.1)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Title', 'Category', 'Published', 'Date', 'Views', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 1 ? 'var(--cream)' : 'var(--white)' }}>
                  <td style={td}>
                    <div style={{ fontWeight: 600, maxWidth: 280 }}>{p.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', marginTop: 2 }}>{p.slug}</div>
                  </td>
                  <td style={td}>{p.category || '—'}</td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <button onClick={() => togglePublished(p)} style={{ padding: '4px 10px', background: p.published ? '#22c55e' : '#94a3b8', color: '#fff', border: 'none', borderRadius: 12, fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', cursor: 'pointer' }}>
                      {p.published ? 'Live' : 'Draft'}
                    </button>
                  </td>
                  <td style={{ ...td, color: 'var(--gray-mid)', fontSize: '0.8rem' }}>{formatDate(p.published_at)}</td>
                  <td style={{ ...td, textAlign: 'center' }}>{p.view_count}</td>
                  <td style={td}>
                    <button onClick={() => startEdit(p)} style={{ padding: '4px 10px', background: 'transparent', color: 'var(--navy)', border: '1px solid rgba(11,26,46,0.3)', fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', cursor: 'pointer' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
