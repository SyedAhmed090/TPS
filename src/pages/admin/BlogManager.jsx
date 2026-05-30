import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatDate } from '../../utils/validation'

const th = { padding: '10px 12px', background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'left', whiteSpace: 'nowrap', borderBottom: '2px solid rgba(200,147,26,0.2)' }
const td = { padding: '10px 12px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'middle' }
const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid rgba(200,147,26,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }
const labelStyle = { display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }

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
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Blog Posts</h1>

      {editId && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,147,26,0.2)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Edit Post</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[['title', 'Title'], ['category', 'Category'], ['read_time', 'Read Time (min)']].map(([key, label]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input value={editForm[key]} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Tags <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>(comma-separated)</span></label>
              <input value={editForm.tags || ''} onChange={e => setEditForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="e.g. embroidery, iron-on, tutorial" style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Excerpt</label>
            <textarea value={editForm.excerpt} onChange={e => setEditForm(f => ({ ...f, excerpt: e.target.value }))} rows={3}
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={saveEdit} disabled={saving} style={{ padding: '8px 20px', background: 'var(--gold)', color: 'var(--navy)', border: 'none', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer', fontWeight: 700 }}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={() => setEditId(null)} style={{ padding: '8px 20px', background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', padding: '2rem 0' }}>Loading...</p>
      ) : (
        <div style={{ border: '1px solid rgba(200,147,26,0.15)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>{['Title', 'Category', 'Published', 'Date', 'Views', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={td}>
                    <div style={{ fontWeight: 600, color: '#fff', maxWidth: 280 }}>{p.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{p.slug}</div>
                  </td>
                  <td style={{ ...td, color: 'rgba(255,255,255,0.6)' }}>{p.category || '—'}</td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <button onClick={() => togglePublished(p)} style={{ padding: '4px 10px', background: p.published ? '#22c55e' : '#94a3b8', color: '#fff', border: 'none', borderRadius: 12, fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', cursor: 'pointer' }}>
                      {p.published ? 'Live' : 'Draft'}
                    </button>
                  </td>
                  <td style={{ ...td, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{formatDate(p.published_at)}</td>
                  <td style={{ ...td, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>{p.view_count}</td>
                  <td style={td}>
                    <button onClick={() => startEdit(p)} style={{ padding: '4px 10px', background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.72rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', cursor: 'pointer' }}>Edit</button>
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
