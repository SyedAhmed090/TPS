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
    // Double-rAF ensures React has committed all DOM mutations before querying
    let id2
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
      })
    })
    return () => {
      cancelAnimationFrame(id1)
      cancelAnimationFrame(id2)
      observer.disconnect()
    }
  }, [])
}
