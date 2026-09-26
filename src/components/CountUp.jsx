import { useEffect, useRef, useState } from 'react'

// Counts the leading number in a value like "120+" or "98%" up from zero the
// first time it scrolls into view. The prerendered HTML (and reduced-motion
// visitors) always get the final value; values already on screen at load are
// left as they are, so nothing flashes.
export default function CountUp({ value, duration = 1200 }) {
  const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  const [display, setDisplay] = useState(value)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!match || !node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return // already visible

    const [, prefix, num, suffix] = match
    const target = parseFloat(num)
    const decimals = num.includes('.') ? num.split('.')[1].length : 0
    let frame = 0
    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`)

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}
