import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
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
