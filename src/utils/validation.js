export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidPhone(phone) {
  return /^[\d\s\-+().]{7,20}$/.test(phone.trim())
}

export function isValidZip(zip, country = 'US') {
  if (country === 'US') return /^\d{5}(-\d{4})?$/.test(zip.trim())
  return zip.trim().length >= 3
}

export function validateQuoteForm(form) {
  const errors = {}
  if (!form.name?.trim()) errors.name = 'Name is required'
  if (!form.email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address'
  if (!form.patch_type) errors.patch_type = 'Please select a patch type'
  if (!form.quantity || parseInt(form.quantity) < 25) errors.quantity = 'Minimum order is 25 patches'
  return errors
}

export function validateContactForm(form) {
  const errors = {}
  if (!form.name?.trim()) errors.name = 'Name is required'
  if (!form.email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address'
  if (!form.message?.trim()) errors.message = 'Message is required'
  return errors
}

export function validateSampleForm(form) {
  const errors = {}
  if (!form.name?.trim()) errors.name = 'Name is required'
  if (!form.email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address'
  return errors
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatShortDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const ORDER_STATUS_LABELS = {
  new:           'New',
  reviewing:     'Reviewing',
  quoted:        'Quoted',
  approved:      'Approved',
  in_production: 'In Production',
  shipped:       'Shipped',
  delivered:     'Delivered',
  cancelled:     'Cancelled',
}

export const ORDER_STATUS_COLORS = {
  new:           '#C8931A',
  reviewing:     '#3b82f6',
  quoted:        '#8b5cf6',
  approved:      '#10b981',
  in_production: '#f59e0b',
  shipped:       '#06b6d4',
  delivered:     '#22c55e',
  cancelled:     '#ef4444',
}
