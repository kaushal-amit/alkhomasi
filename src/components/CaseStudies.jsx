import { Quote, TrendingUp } from 'lucide-react'
import content from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

// Case studies + testimonials. Renders nothing until real entries are added
// in src/data/content.js.
export default function CaseStudies() {
  const { caseStudies, testimonials } = content
  if (!caseStudies.length && !testimonials.length) return null

  return (
    <section id="work" className="section-pad section-y bg-page-wash">
      <div className="section-max">
        <SectionHeading
          eyebrow="Our Work"
          title="Results from the organizations we work with."
          description="A few examples of the problems we've solved and the outcomes they delivered."
        />

        {caseStudies.length > 0 && (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal
                as="article"
                key={`${c.client}-${i}`}
                delay={i * 80}
                className="card-surface flex flex-col p-6 transition-shadow duration-200 hover:shadow-card md:p-7"
              >
                <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {c.industry} · {c.client}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{c.title}</h3>
                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-ink">Challenge</dt>
                    <dd className="text-mist">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Solution</dt>
                    <dd className="text-mist">{c.solution}</dd>
                  </div>
                </dl>
                {c.results?.length > 0 && (
                  <ul className="mt-5 space-y-2 rounded-2xl bg-haze p-4">
                    {c.results.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm font-semibold text-navy">
                        <TrendingUp size={15} className="mt-0.5 shrink-0 text-primary" /> {r}
                      </li>
                    ))}
                  </ul>
                )}
                {c.services?.length > 0 && (
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label="Services used">
                    {c.services.map((s) => (
                      <li key={s} className="rounded-full border border-ink/10 px-3 py-1 text-2xs font-semibold text-ink/70">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        )}

        {testimonials.length > 0 && (
          <div className={`grid gap-5 md:grid-cols-2 ${caseStudies.length ? 'mt-10' : 'mt-12'}`}>
            {testimonials.map((t, i) => (
              <Reveal as="figure" key={`${t.name}-${i}`} delay={i * 80} className="card-dark p-7 md:p-9">
                <Quote size={28} className="text-sky" aria-hidden="true" />
                <blockquote className="mt-4 text-lg leading-relaxed text-white/90">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <span className="block font-semibold text-white">{t.name}</span>
                  <span className="text-sm text-white/60">
                    {t.role}
                    {t.company ? `, ${t.company}` : ''}
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
