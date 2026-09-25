import { useMemo, useState } from 'react'
import { ArrowUpRight, Check, FolderKanban } from 'lucide-react'
import content from '../data/content.js'
import { SERVICES, servicePath } from '../data/services.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

// Projects showcase. Renders nothing until real projects are added in
// src/data/content.js (see the field notes there).

const serviceByName = (label) => SERVICES.find((s) => s.name === label || s.shortName === label)

// Cover art: the project's own image, or a branded cover drawn from its
// primary service so the grid stays consistent before photography exists.
function ProjectCover({ project, index, featured, wide }) {
  const service = serviceByName(project.services?.[0])
  const Icon = service?.icon ?? FolderKanban
  return (
    <div className={`relative overflow-hidden bg-navy-deep ${featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : wide ? 'aspect-[16/10] md:max-lg:aspect-[21/8]' : 'aspect-[16/10]'}`}>
      {project.image ? (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-grid-dark opacity-60" />
          <div className="glow absolute -right-16 -top-20 h-72 w-72" style={{ '--glow': 'rgba(22,139,224,0.45)' }} />
          <div className="glow absolute -bottom-24 -left-10 h-64 w-64" style={{ '--glow': 'rgba(14,82,155,0.5)' }} />
          <span className="absolute left-6 top-5 font-display text-5xl font-semibold text-white/[0.07] md:text-6xl" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/15 bg-white/10 text-sky shadow-glow backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-[58%] md:h-20 md:w-20">
            <Icon size={featured ? 32 : 28} strokeWidth={1.6} />
          </span>
        </>
      )}
      <div className="bg-spectrum absolute inset-x-0 bottom-0 h-[3px] opacity-80" aria-hidden="true" />
      {project.industry && (
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-2xs font-semibold text-ink shadow-soft backdrop-blur">
          {project.industry}
        </span>
      )}
    </div>
  )
}

function ProjectCard({ project, index, featured, wide, delay, animate }) {
  const meta = [project.client, project.year].filter(Boolean).join(' · ')
  return (
    <article
      className={`group card-surface relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${
        featured ? 'lg:grid lg:grid-cols-[1.1fr_1fr]' : ''
      } ${animate ? 'animate-popIn' : ''}`}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      <ProjectCover project={project} index={index} featured={featured} wide={wide} />

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 md:p-9' : 'p-6'}`}>
        {meta && <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-primary">{meta}</p>}
        <h3 className={`mt-3 font-semibold text-ink ${featured ? 'text-2xl md:text-h3' : 'text-xl'}`}>
          {project.href ? (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 hover:text-primary">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        {project.summary && <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">{project.summary}</p>}

        {(project.challenge || project.solution) && (
          <dl className="mt-4 space-y-3 text-sm leading-relaxed">
            {project.challenge && (
              <div>
                <dt className="font-semibold text-ink">Challenge</dt>
                <dd className="text-mist">{project.challenge}</dd>
              </div>
            )}
            {project.solution && (
              <div>
                <dt className="font-semibold text-ink">Solution</dt>
                <dd className="text-mist">{project.solution}</dd>
              </div>
            )}
          </dl>
        )}

        {project.results?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {project.results.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm font-semibold text-navy">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-haze text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                {r}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {project.services?.length > 0 && (
            <ul className="relative z-10 flex flex-wrap gap-2" aria-label="Services">
              {project.services.map((label) => {
                const s = serviceByName(label)
                const cls = 'rounded-full border border-ink/10 px-3 py-1 text-2xs font-semibold text-ink/70'
                return (
                  <li key={label}>
                    {s ? (
                      <a href={servicePath(s)} className={`${cls} inline-block transition-colors hover:border-primary/40 hover:text-primary`}>
                        {label}
                      </a>
                    ) : (
                      <span className={cls}>{label}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          {project.href && (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/25 text-primary transition-all duration-200 group-hover:border-navy group-hover:bg-navy group-hover:text-white" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { projects } = content
  const [filter, setFilter] = useState('All')
  // Cards enter with the scroll reveal first; after that, filtering animates them
  const [filtered, setFiltered] = useState(false)

  const filters = useMemo(() => {
    const names = new Set(projects.flatMap((p) => p.services ?? []))
    return ['All', ...names]
  }, [projects])

  if (!projects.length) return null

  const shown = filter === 'All' ? projects : projects.filter((p) => p.services?.includes(filter))
  const showFilters = projects.length >= 3 && filters.length > 2
  const [featured, ...rest] = shown
  const oddLast = (i) => rest.length % 2 === 1 && i === rest.length - 1

  return (
    <section id="projects" className="section-pad section-y">
      <div className="section-max">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Work we&apos;re <span className="gradient-text">proud of.</span>
              </>
            }
            description="A selection of the systems we have designed and built — and the difference they made."
          />
          {showFilters && (
            <Reveal>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by service">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setFilter(f)
                      setFiltered(true)
                    }}
                    aria-pressed={filter === f}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      filter === f
                        ? 'border border-navy bg-navy text-white shadow-soft'
                        : 'border border-ink/10 bg-white text-ink/70 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-12">
          <div key={filter} className="space-y-6">
          {featured && <ProjectCard project={featured} index={projects.indexOf(featured)} featured delay={0} animate={filtered} />}
          {rest.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                // On tablets an odd card out spans the row instead of leaving a gap
                <div key={`${p.title}-${i}`} className={oddLast(i) ? 'md:max-lg:col-span-2' : ''}>
                  <ProjectCard project={p} index={projects.indexOf(p)} wide={oddLast(i)} delay={(i + 1) * 80} animate={filtered} />
                </div>
              ))}
            </div>
          )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
