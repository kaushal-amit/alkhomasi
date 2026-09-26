import { useEffect, useState } from 'react'

// True when the visitor has asked the OS/browser to reduce motion.
// Starts false so the prerendered HTML and first client render match.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

// True while the referenced element is on screen — used to pause timers and
// looping demos that nobody is looking at.
export function useInView(ref, rootMargin = '0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin])
  return inView
}
