// A soft highlight that follows the pointer across interactive surfaces
// marked with the `spotlight` class (and primary buttons). One delegated listener for the whole
// page; skipped on touch devices and when reduced motion is requested.
export function initSpotlight() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return () => {}

  let frame = 0
  let last = null
  const onMove = (e) => {
    last = e
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      const el = last.target instanceof Element ? last.target.closest('.spotlight, .btn-primary') : null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${last.clientX - r.left}px`)
      el.style.setProperty('--my', `${last.clientY - r.top}px`)
    })
  }
  document.addEventListener('pointermove', onMove, { passive: true })
  return () => {
    cancelAnimationFrame(frame)
    document.removeEventListener('pointermove', onMove)
  }
}
