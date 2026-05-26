export const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1px solid rgba(11,26,46,0.2)',
  background: 'var(--white)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  outline: 'none',
  color: 'var(--text-dark)',
  boxSizing: 'border-box',
}

export const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-heading)',
  fontSize: '0.72rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--navy)',
  marginBottom: '6px',
}

export const selectStyle = { ...inputStyle, cursor: 'pointer' }
export const textareaStyle = { ...inputStyle, resize: 'vertical' }
export const fieldErrorStyle = { fontSize: '0.72rem', color: '#c0392b', marginTop: '4px', display: 'block' }
