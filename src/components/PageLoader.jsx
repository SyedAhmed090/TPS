export default function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--navy)',
    }}>
      <div style={{
        width: 40, height: 40,
        border: '3px solid rgba(200,147,26,0.2)',
        borderTopColor: 'var(--gold)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
