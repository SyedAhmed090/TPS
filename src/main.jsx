import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { AuthProvider } from './contexts/AuthContext'
import App from './App'
import './index.css'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  enabled: !!import.meta.env.VITE_SENTRY_DSN,
  tracesSampleRate: 0.1,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Sentry.ErrorBoundary fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#333' }}>
            <div style={{ textAlign: 'center' }}>
              <h2>Something went wrong</h2>
              <p>Please refresh the page. If the problem persists, contact us at info@thepatchsolutions.com</p>
              <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: '#0b1a2e', color: '#fff', border: 'none', cursor: 'pointer' }}>Refresh Page</button>
            </div>
          </div>
        }>
          <App />
        </Sentry.ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
