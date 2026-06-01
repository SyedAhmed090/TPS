import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SITE_URL = 'https://www.thepatchsolutions.com'

export default function Breadcrumb({ items }) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
      })),
    }
    const existing = document.getElementById('breadcrumb-schema')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'breadcrumb-schema'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => {
      const el = document.getElementById('breadcrumb-schema')
      if (el) el.remove()
    }
  }, [items])

  return (
    <div className="breadcrumb">
      <div className="container">
        <ol className="breadcrumb__list">
          {items.map((item, i) => (
            <li key={i} className={`breadcrumb__item${i === items.length - 1 ? ' breadcrumb__item--active' : ''}`}>
              {i < items.length - 1 ? (
                <>
                  <Link to={item.href}>{item.label}</Link>
                  <span className="breadcrumb__sep">›</span>
                </>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
