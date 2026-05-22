import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ background: 'var(--navy)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', letterSpacing: '0.04em', marginBottom: '1rem' }}>Something Went Wrong</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>An unexpected error occurred. Please try refreshing the page.</p>
            <Link to="/" className="btn-gold" onClick={() => this.setState({ hasError: false })}>Back to Home</Link>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
