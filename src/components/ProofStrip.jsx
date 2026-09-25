import content from '../data/content.js'
import Reveal from './Reveal.jsx'

// Headline numbers + client names directly under the hero.
// Renders nothing until real stats or clients are added in src/data/content.js.
export default function ProofStrip() {
  const { stats, clients } = content
  if (!stats.length && !clients.length) return null

  return (
    <section aria-label="At a glance" className="section-pad border-y border-ink/[0.06] bg-white py-10 md:py-12">
      <div className="section-max flex flex-col gap-10">
        {stats.length > 0 && (
          <Reveal as="dl" className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1 border-l-2 border-primary/20 pl-5">
                <dt className="text-sm text-mist">{s.label}</dt>
                <dd className="font-display text-h3 font-semibold text-navy">{s.value}</dd>
              </div>
            ))}
          </Reveal>
        )}

        {clients.length > 0 && (
          <Reveal delay={80} className="flex flex-col items-center gap-5 md:flex-row md:gap-10">
            <p className="shrink-0 text-2xs font-semibold uppercase tracking-[0.16em] text-mist">Trusted by</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-start">
              {clients.map((c) => (
                <li key={c.name} className="text-mist transition-colors hover:text-ink">
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} loading="lazy" className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
                  ) : (
                    <span className="font-display text-lg font-semibold">{c.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}
