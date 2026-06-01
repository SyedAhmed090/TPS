import { useEffect } from 'react'

const SITE_NAME = 'The Patch Solutions'
const SITE_URL = 'https://www.thepatchsolutions.com'
const DEFAULT_IMAGE = `${SITE_URL}/hero-patch.jpg`

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = url
}

export default function useSEO(title, description, options = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `Custom Patches Since 2000 | ${SITE_NAME}`
    const desc = description || 'Premium custom embroidered, woven, PVC, and specialty patches. Free quotes, fast turnaround, flat-rate shipping since 2000.'
    const canonical = options.canonical || (SITE_URL + window.location.pathname)
    const image = options.image || DEFAULT_IMAGE

    document.title = fullTitle

    // Standard meta
    setMeta('description', desc)

    // Open Graph
    setMeta('og:site_name',   SITE_NAME,         true)
    setMeta('og:type',        options.type || 'website', true)
    setMeta('og:locale',      'en_US',            true)
    setMeta('og:title',       fullTitle,          true)
    setMeta('og:description', desc,               true)
    setMeta('og:url',         canonical,          true)
    setMeta('og:image',       image,              true)
    setMeta('og:image:alt',   options.imageAlt || `${SITE_NAME} — custom patches`, true)

    // Twitter Card
    setMeta('twitter:card',        'summary_large_image')
    setMeta('twitter:title',       fullTitle)
    setMeta('twitter:description', desc)
    setMeta('twitter:image',       image)

    // Canonical
    setCanonical(canonical)
  }, [title, description, options.canonical, options.type, options.image])
}
