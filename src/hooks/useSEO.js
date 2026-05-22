import { useEffect } from 'react'

export default function useSEO(title, description) {
  useEffect(() => {
    const SITE = 'The Patch Solutions'
    document.title = title ? `${title} | ${SITE}` : `Custom Patches Since 2000 | ${SITE}`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    if (description) meta.content = description
  }, [title, description])
}
