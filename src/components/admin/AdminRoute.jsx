import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-heading)', letterSpacing: '0.15em' }}>LOADING...</div>
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />
  return children
}
