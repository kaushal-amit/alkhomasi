import { useEffect, useRef, useState } from 'react'
import { Building2, Sparkles, Workflow, Network, Puzzle, Layers, Search, Zap, Link2, TrendingUp } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { LogoMark } from './Logo.jsx'
import { COMPANY } from '../data/site.js'
import { useInView, usePrefersReducedMotion } from '../hooks/motion.js'

const POINTS = [
  {
    icon: Building2,
    title: 'Business-centric technology',
    desc: 'We start with your operations and goals, then choose the technology — never the other way round.',
  },
  {
    icon: Sparkles,
    title: 'AI-first approach',
    desc: 'AI goes where it genuinely saves time, improves accuracy or reveals insight.',
  },
  {
    icon: Workflow,
    title: 'Workflow automation',
    desc: 'Repetitive steps disappear, so your people spend their time on judgement and customers.',
  },
  {
    icon: Network,
    title: 'Connected systems',
    desc: 'Our solutions plug into what you already run, creating one reliable flow of information.',
  },
  {
    icon: Puzzle,
    title: 'Custom solutions',
    desc: 'Built for your processes, roles and terminology — not a generic template.',
  },
  {
    icon: Layers,
    title: 'Scalable architecture',
    desc: 'Clean, modular foundations that grow with your organization as requirements change.',
  },
]

// The four-stage method — mirrors the company motto
const STAGES = [
  { label: 'Identify', icon: Search, desc: 'We map how work really flows and pinpoint where time, money and accuracy are lost.' },
  { label: 'Automate', icon: Zap, desc: 'Repetitive steps move to workflows and AI agents, with your people kept in control.' },
  { label: 'Integrate', icon: Link2, desc: 'Your systems share one reliable flow of data — no re-keying, no conflicting numbers.' },
  { label: 'Scale', icon: TrendingUp, desc: 'Modular foundations grow with you: new teams, branches and use cases.' },
]

// Node positions on the orbit (percent of the square), clockwise from the top
const NODE_POS = [
  { x: 50, y: 12 },
  { x: 88, y: 50 },
  { x: 50, y: 88 },
  { x: 12, y: 50 },
]

const R = 38 // orbit radius in the 0–100 viewBox
const CIRC = 2 * Math.PI * R

function MethodOrbit() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref)
  const reduced = usePrefersReducedMotion()

  // Walk through the stages while visible; any interaction pauses it
  useEffect(() => {
    if (!inView || paused || reduced) return
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 3200)
    return () => clearInterval(t)
  }, [inView, paused, reduced])

  const progress = (active + 1) / STAGES.length
  const Stage = STAGES[active]

  return (
    <div
      ref={ref}
      className="card-dark p-6 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
      <div className="glow absolute -right-24 -top-24 h-80 w-80" style={{ '--glow': 'rgba(22,139,224,0.35)' }} />
      <div className="bg-spectrum absolute inset-x-0 top-0 h-[3px] opacity-80" aria-hidden="true" />

      <div className="relative flex items-center justify-between">
        <p className="eyebrow text-sky">
          <span className="h-px w-6 bg-sky/60" /> Our method
        </p>
        <p className="font-display text-xs font-semibold text-white/50" aria-hidden="true">
          0{active + 1} / 0{STAGES.length}
        </p>
      </div>

      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[340px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="orbit-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5CC2FF" />
              <stop offset="100%" stopColor="#168BE0" />
            </linearGradient>
          </defs>
          {/* slow-turning outer ring */}
          <g className="origin-center animate-orbit [transform-box:fill-box]">
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.3" strokeDasharray="0.6 2.2" />
          </g>
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.4" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#orbit-arc)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress)}
            transform="rotate(-90 50 50)"
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
          <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
        </svg>

        {/* centre */}
        <div className="absolute inset-[29%] flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-center">
          <LogoMark size={22} />
          <p key={Stage.label} className="mt-2 animate-fadeIn font-display text-lg font-semibold leading-none text-white sm:text-xl">
            {Stage.label}
          </p>
          <p className="mt-1.5 text-2xs text-white/50">Step {active + 1}</p>
        </div>

        {/* stage nodes */}
        {STAGES.map((s, i) => {
          const on = i === active
          const done = i < active
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              aria-label={`${i + 1}. ${s.label}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${NODE_POS[i].x}%`, top: `${NODE_POS[i].y}%` }}
            >
              {on && <span className="absolute inset-0 rounded-full bg-sky/40 animate-ring" aria-hidden="true" />}
              <span
                className={`relative grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 sm:h-12 sm:w-12 ${
                  on
                    ? 'scale-110 border-transparent bg-gradient-to-br from-bright to-primary text-white shadow-glow'
                    : done
                      ? 'border-sky/40 bg-navy text-sky'
                      : 'border-white/15 bg-navy-deep text-white/60 group-hover:border-sky/50 group-hover:text-white'
                }`}
              >
                <s.icon size={18} />
              </span>
            </button>
          )
        })}
      </div>

      {/* active stage detail */}
      <div className="relative mt-4 min-h-[88px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5" aria-live="polite">
        <div key={Stage.label} className="animate-fadeIn">
          <p className="font-display text-base font-semibold text-white">
            {active + 1}. {Stage.label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white/70">{Stage.desc}</p>
        </div>
      </div>

      <div className="relative mt-4 flex gap-1.5" aria-hidden="true">
        {STAGES.map((s, i) => (
          <span key={s.label} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? 'bg-sky' : 'bg-white/10'}`} />
        ))}
      </div>
    </div>
  )
}

export default function WhyAlKhomasi() {
  return (
    <section id="why" className="section-pad section-y-lg bg-page-wash">
      <div className="section-max grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-center">
        <Reveal className="order-2 lg:order-1">
          <MethodOrbit />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={`About ${COMPANY.displayName}`}
            title={
              <>
                Technology that <span className="gradient-text">adapts to your business.</span>
              </>
            }
            description={`${COMPANY.displayName} is an AI and software company based in Gwalior, India. We combine AI, automation and integration expertise with a genuine understanding of how organizations run day to day.`}
          />

          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {POINTS.map((point, i) => (
              <Reveal as="li" key={point.title} delay={i * 60} className="group flex gap-4 border-t border-ink/[0.08] py-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-soft ring-1 ring-ink/[0.05] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-navy group-hover:text-sky">
                  <point.icon size={18} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{point.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
