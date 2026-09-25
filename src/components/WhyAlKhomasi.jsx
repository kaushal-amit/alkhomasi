import { useState } from 'react'
import { Building2, Sparkles, Workflow, Network, Puzzle, Layers } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const POINTS = [
  {
    icon: Building2,
    title: 'Business-Centric Technology',
    desc: 'We start with your operations and goals, then choose the technology — never the other way round.',
  },
  {
    icon: Sparkles,
    title: 'AI-First Approach',
    desc: 'Every solution is designed to use AI where it genuinely saves time, improves accuracy or reveals insight.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    desc: 'We remove repetitive steps so your people spend their time on judgement, customers and growth.',
  },
  {
    icon: Network,
    title: 'Connected Systems',
    desc: 'Our solutions plug into what you already run, creating one reliable flow of information.',
  },
  {
    icon: Puzzle,
    title: 'Custom Solutions',
    desc: 'Built for your processes, roles and terminology — no forcing your team into a generic template.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    desc: 'Clean, modular foundations that grow with your organization and adapt as requirements change.',
  },
]

// Four-stage method ring — mirrors the company motto
const STAGES = [
  { label: 'Identify', color: '#062B63' },
  { label: 'Automate', color: '#0868C9' },
  { label: 'Integrate', color: '#168BE0' },
  { label: 'Scale', color: '#5CC2FF' },
]

function MethodRing() {
  const [hover, setHover] = useState(null)
  const r = 80
  const c = 2 * Math.PI * r
  const gap = 6
  const seg = c / STAGES.length

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" role="img" aria-label="Identify, Automate, Integrate, Scale">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#E3EAF3" strokeWidth="26" />
        {STAGES.map((s, i) => (
          <circle
            key={s.label}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={hover === i ? 32 : 26}
            strokeDasharray={`${seg - gap} ${c - seg + gap}`}
            strokeDashoffset={-i * seg}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </svg>
      {/* segment labels */}
      {STAGES.map((s, i) => {
        const angle = ((i + 0.5) / STAGES.length) * 2 * Math.PI - Math.PI / 2
        const x = 50 + Math.cos(angle) * 40
        const y = 50 + Math.sin(angle) * 40
        return (
          <span
            key={s.label}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-display text-xs font-semibold ${
              i >= 2 ? 'text-navy-deep' : 'text-white'
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {s.label}
          </span>
        )
      })}
      <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-white text-center shadow-card">
        <span className="text-2xs font-semibold tracking-[0.16em] text-mist">OUR METHOD</span>
        <span className="mt-1 font-display text-lg font-semibold leading-tight text-ink">
          {hover === null ? 'Four steps' : STAGES[hover].label}
        </span>
        <span className="mt-1 text-2xs text-mist">to an intelligent business</span>
      </div>
    </div>
  )
}

export default function WhyAlKhomasi() {
  return (
    <section id="why" className="section-pad section-y-lg bg-page-wash">
      <div className="section-max grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <MethodRing />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Why AL-KHOMASI"
            title={
              <>
                Technology that <span className="gradient-text">adapts to your business.</span>
              </>
            }
            description="We combine AI, automation and integration expertise with a genuine understanding of how organizations run day to day."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {POINTS.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 60}
                className="group rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(6,43,99,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-haze text-primary transition-colors group-hover:bg-navy group-hover:text-sky">
                    <point.icon size={18} />
                  </span>
                  <h3 className="text-base font-semibold text-ink">{point.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist">{point.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
