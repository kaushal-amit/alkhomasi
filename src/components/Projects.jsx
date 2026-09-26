import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  FolderKanban,
  Scale,
  CandlestickChart,
  GraduationCap,
  UtensilsCrossed,
  CreditCard,
  Building2,
  Bus,
  Sparkles,
} from 'lucide-react'
import content from '../data/content.js'
import { SERVICES, servicePath } from '../data/services.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

// Projects showcase, grouped by category. Renders nothing until projects are
// added in src/data/content.js (see the field notes there).

// Category keys used by `project.category`, in display order
export const PROJECT_CATEGORIES = {
  legal: { label: 'LegalTech', icon: Scale },
  trading: { label: 'Trading', icon: CandlestickChart },
  edtech: { label: 'Education', icon: GraduationCap },
  fintech: { label: 'Fintech & Payments', icon: CreditCard },
  food: { label: 'Food & Commerce', icon: UtensilsCrossed },
  business: { label: 'Business & Government', icon: Building2 },
  tracking: { label: 'Tracking & Mobility', icon: Bus },
}

const serviceByName = (label) => SERVICES.find((s) => s.name === label || s.shortName === label)
const categoryOf = (p) => PROJECT_CATEGORIES[p.category]

// AI projects first, then live ones, otherwise keep the order in content.js
const rank = (p) => (p.ai ? 0 : 2) + (p.status === 'live' ? 0 : 1)

// Layout: a 6-column grid on desktop. Card sizes are chosen so rows always
// fill — thirds, with one full-width or two half-width cards absorbing any
// remainder at the top.
function sizesFor(n) {
  if (n % 3 === 1) return ['full', ...Array(n - 1).fill('third')]
  if (n % 3 === 2) return ['half', 'half', ...Array(n - 2).fill('third')]
  return Array(n).fill('third')
}
const SPAN = {
  full: 'md:col-span-2 lg:col-span-6',
  half: 'lg:col-span-3',
  third: 'lg:col-span-2',
}

function Badges({ project }) {
  return (
    <div className="absolute right-4 top-4 flex gap-2">
      {project.ai && (
        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-bright to-primary px-2.5 py-1 text-2xs font-bold tracking-wide text-white shadow-soft">
          <Sparkles size={11} aria-hidden="true" /> AI
        </span>
      )}
      {project.status === 'live' && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-2xs font-bold text-ink shadow-soft">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      )}
    </div>
  )
}

// Cover art: the project's own image, or a branded cover drawn from its category
function ProjectCover({ project, size }) {
  const cat = categoryOf(project)
  const Icon = cat?.icon ?? FolderKanban
  const shape =
    size === 'full' ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px]' : size === 'half' ? 'aspect-[16/9]' : 'aspect-[16/10]'
  return (
    <div className={`relative overflow-hidden bg-navy-deep ${shape}`}>
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
          <div
            className="glow absolute -right-16 -top-20 h-72 w-72"
            style={{ '--glow': project.ai ? 'rgba(92,194,255,0.45)' : 'rgba(22,139,224,0.4)' }}
          />
          <div className="glow absolute -bottom-24 -left-10 h-64 w-64" style={{ '--glow': 'rgba(14,82,155,0.5)' }} />
          <span
            className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/15 bg-white/10 text-sky shadow-glow backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-[58%] ${
              size === 'third' ? 'h-16 w-16' : 'h-20 w-20'
            }`}
          >
            <Icon size={size === 'third' ? 28 : 34} strokeWidth={1.6} />
          </span>
          <span
            className="absolute bottom-10 left-1/2 max-w-[80%] -translate-x-1/2 truncate font-display text-sm font-semibold text-white/35"
            aria-hidden="true"
          >
            {project.title}
          </span>
        </>
      )}
      <div className="bg-spectrum absolute inset-x-0 bottom-0 h-[3px] opacity-80" aria-hidden="true" />
      {cat && (
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-2xs font-semibold text-ink shadow-soft backdrop-blur">
          {cat.label}
        </span>
      )}
      <Badges project={project} />
    </div>
  )
}

function ProjectCard({ project, size, delay, animate }) {
  const meta = [project.region, project.platform].filter(Boolean).join(' · ')
  const big = size !== 'third'
  return (
    <article
      className={`group card-surface relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${
        size === 'full' ? 'lg:grid lg:grid-cols-[1.1fr_1fr]' : ''
      } ${animate ? 'animate-popIn' : ''}`}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      <ProjectCover project={project} size={size} />

      <div className={`flex flex-1 flex-col ${size === 'full' ? 'p-6 md:p-9' : 'p-6'}`}>
        {meta && <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-primary">{meta}</p>}
        <h3 className={`mt-2 font-semibold text-ink ${size === 'full' ? 'text-2xl md:text-h3' : big ? 'text-2xl' : 'text-xl'}`}>
          {project.title}
          {project.formerly && <span className="ml-2 align-middle text-sm font-medium text-mist">formerly {project.formerly}</span>}
        </h3>
        {project.summary && <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">{project.summary}</p>}

        {project.highlights?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm font-medium text-ink/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-haze text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          {project.services?.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Services">
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
          {project.links?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 px-3.5 py-1.5 text-xs font-semibold text-primary transition-all duration-200 hover:border-navy hover:bg-navy hover:text-white"
                >
                  {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { projects } = content
  const [filter, setFilter] = useState('all')
  // Cards enter with the scroll reveal first; after that, filtering animates them
  const [filtered, setFiltered] = useState(false)
  // Phones show the first few cards until the visitor asks for the rest
  const [expanded, setExpanded] = useState(false)

  const sorted = useMemo(
    () => projects.map((p, i) => ({ p, i })).sort((a, b) => rank(a.p) - rank(b.p) || a.i - b.i).map(({ p }) => p),
    [projects]
  )

  const filters = useMemo(() => {
    const list = [{ key: 'all', label: 'All', count: projects.length }]
    const ai = projects.filter((p) => p.ai).length
    const live = projects.filter((p) => p.status === 'live').length
    if (ai) list.push({ key: 'ai', label: 'AI', count: ai })
    if (live) list.push({ key: 'live', label: 'Live', count: live })
    for (const [key, c] of Object.entries(PROJECT_CATEGORIES)) {
      const n = projects.filter((p) => p.category === key).length
      if (n) list.push({ key, label: c.label, count: n })
    }
    return list
  }, [projects])

  if (!projects.length) return null

  const shown = sorted.filter((p) =>
    filter === 'all' ? true : filter === 'ai' ? p.ai : filter === 'live' ? p.status === 'live' : p.category === filter
  )
  const sizes = sizesFor(shown.length)
  const MOBILE_LIMIT = 4
  const collapsed = !expanded && shown.length > MOBILE_LIMIT + 1

  return (
    <section id="projects" className="section-pad section-y">
      <div className="section-max">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Products and platforms <span className="gradient-text">we&apos;ve built.</span>
              </>
            }
            description="From AI products to fintech, education and food-ordering platforms — a selection of the work we have designed, built and launched."
          />
          {projects.length >= 3 && (
            <Reveal>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => {
                      setFilter(f.key)
                      setFiltered(true)
                    }}
                    aria-pressed={filter === f.key}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      filter === f.key
                        ? 'border border-navy bg-navy text-white shadow-soft'
                        : 'border border-ink/10 bg-white text-ink/70 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {f.key === 'ai' && <Sparkles size={14} aria-hidden="true" />}
                    {f.key === 'live' && <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />}
                    {f.label}
                    <span className={`text-xs ${filter === f.key ? 'text-white/60' : 'text-mist'}`}>{f.count}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-12">
          <div key={filter} className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {shown.map((p, i) => {
              // On tablets, a lone last card (odd count of non-full cards) spans the row
              const nonFull = sizes.filter((s) => s !== 'full').length
              const lastOdd = sizes[i] !== 'full' && nonFull % 2 === 1 && i === shown.length - 1
              return (
                <div
                  key={p.title}
                  className={`${SPAN[sizes[i]]} ${lastOdd ? 'md:col-span-2 lg:col-span-2' : ''} ${
                    collapsed && i >= MOBILE_LIMIT ? 'max-md:hidden' : ''
                  }`}
                >
                  <ProjectCard project={p} size={sizes[i]} delay={i * 70} animate={filtered} />
                </div>
              )
            })}
          </div>
          {collapsed && (
            <div className="mt-8 text-center md:hidden">
              <button type="button" onClick={() => setExpanded(true)} className="btn-secondary">
                Show all {shown.length} projects
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
