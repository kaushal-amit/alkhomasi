import { useEffect, useRef } from 'react'

// Thin reading-progress bar across the very top of the page. Updated with
// requestAnimationFrame and a transform only, so it never triggers layout.
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={barRef}
        className="h-full origin-left bg-spectrum"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
