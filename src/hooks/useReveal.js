import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
    })
    return () => {
      cancelAnimationFrame(id)
      observer.disconnect()
    }
  }, [])
}
