import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import content from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { useInView, usePrefersReducedMotion } from '../hooks/motion.js'

// Client reviews. Renders nothing until real, permitted quotes are added in
// src/data/content.js.

const initials = (name = '') =>
  name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '•'

function Avatar({ t, size = 'h-12 w-12', text = 'text-sm' }) {
  if (t.photo) {
    return <img src={t.photo} alt="" loading="lazy" className={`${size} shrink-0 rounded-full object-cover ring-2 ring-white/20`} />
  }
  return (
    <span aria-hidden="true" className={`${size} ${text} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-bright to-primary font-display font-semibold text-white ring-2 ring-white/15`}>
      {initials(t.name)}
    </span>
  )
}

function Rating({ value }) {
  if (!value) return null
  const n = Math.max(0, Math.min(5, Math.round(value)))
  return (
    <p className="flex gap-1" role="img" aria-label={`Rated ${n} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} aria-hidden="true" className={i < n ? 'fill-amber-400 text-amber-400' : 'text-white/20'} />
      ))}
    </p>
  )
}

export default function Testimonials() {
  const { testimonials } = content
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref)
  const reduced = usePrefersReducedMotion()
  const count = testimonials.length

  useEffect(() => {
    if (count < 2 || !inView || paused || reduced) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 8000)
    return () => clearInterval(t)
  }, [count, inView, paused, reduced])

  if (!count) return null

  const go = (i) => setIndex((i + count) % count)
  const t = testimonials[index]

  return (
    <section id="testimonials" className="section-pad section-y">
      <div className="section-max">
        <SectionHeading
          eyebrow="Client reviews"
          align="center"
          title={
            <>
              What our clients <span className="gradient-text">say about us.</span>
            </>
          }
          description="Feedback from the organizations we have worked with."
        />

        <Reveal className="mt-12">
          <div
            ref={ref}
            className="card-dark grid lg:grid-cols-[1fr_0.42fr]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client reviews"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-30" />
            <div className="glow absolute -left-32 -top-32 h-96 w-96" style={{ '--glow': 'rgba(22,139,224,0.3)' }} />
            <div className="bg-spectrum absolute inset-x-0 top-0 h-[3px] opacity-80" aria-hidden="true" />

            {/* current review */}
            <figure
              key={index}
              className="relative flex min-h-[320px] flex-col p-7 motion-safe:animate-slideIn sm:p-10 md:p-12"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
            >
              <div className="flex items-center justify-between gap-4">
                <Quote size={40} className="text-sky/80" aria-hidden="true" />
                <Rating value={t.rating} />
              </div>
              <blockquote className="mt-6 font-display text-xl font-medium leading-snug text-white md:text-2xl md:leading-snug mb-8">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4 border-t border-white/10 pt-6">
                <Avatar t={t} />
                <span>
                  <span className="block font-semibold text-white">{t.name}</span>
                  <span className="text-sm text-white/60">
                    {[t.role, t.company].filter(Boolean).join(', ')}
                  </span>
                </span>
              </figcaption>
            </figure>

            {/* reviewer list + controls */}
            {count > 1 && (
              <div className="relative flex flex-col gap-6 border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
                <ul className="hidden space-y-2 lg:block" aria-label="Choose a review">
                  {testimonials.map((r, i) => (
                    <li key={`${r.name}-${i}`}>
                      <button
                        type="button"
                        onClick={() => go(i)}
                        aria-current={i === index ? 'true' : undefined}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 ${
                          i === index ? 'border-white/20 bg-white/10' : 'border-transparent hover:bg-white/[0.05]'
                        }`}
                      >
                        <Avatar t={r} size="h-10 w-10" text="text-xs" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-white">{r.name}</span>
                          <span className="block truncate text-xs text-white/50">{r.company || r.role}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    {testimonials.map((r, i) => (
                      <span
                        key={`${r.name}-dot-${i}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-sky' : 'w-1.5 bg-white/25'}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => go(index - 1)}
                      aria-label="Previous review"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/10"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(index + 1)}
                      aria-label="Next review"
                      className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy transition-colors hover:bg-sky"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
