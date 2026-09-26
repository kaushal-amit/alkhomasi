import { useEffect, useRef } from 'react'

// Deep links into tabbed sections, e.g. "#service-data" or "#demo-agents".
// When the URL hash is `#<prefix>-<key>` and `key` is valid, `onMatch(key)`
// runs, the section scrolls into view, and the hash is normalised back to the
// section id so the same link can be clicked again.
export function useHashTarget(prefix, validKeys, sectionId, onMatch) {
  const onMatchRef = useRef(onMatch)
  onMatchRef.current = onMatch

  useEffect(() => {
    const check = () => {
      const match = window.location.hash.match(new RegExp(`^#${prefix}-(.+)$`))
      if (!match || !validKeys.includes(match[1])) return
      onMatchRef.current(match[1])
      requestAnimationFrame(() => {
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        document.getElementById(sectionId)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
        history.replaceState(null, '', `#${sectionId}`)
      })
    }
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
    // validKeys/prefix/sectionId are static per call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// Arrow / Home / End keyboard support for a tablist (WAI-ARIA tabs pattern).
export function tabKeyHandler(keys, active, setActive, refs) {
  return (e) => {
    const i = keys.indexOf(active)
    const last = keys.length - 1
    const next = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setActive(keys[next])
    refs.current[next]?.focus()
  }
}
