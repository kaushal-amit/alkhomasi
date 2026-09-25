import { useEffect, useRef, useState } from 'react'
import { Inbox, Eye, ShieldCheck, CheckCircle2, Zap, FileText, Pause, Play } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { useInView, usePrefersReducedMotion } from '../hooks/motion.js'

const NODES = [
  {
    icon: Inbox,
    label: 'Request',
    desc: 'A request enters the workflow — a purchase, a leave application, a client onboarding, or any process your team runs regularly.',
  },
  {
    icon: Eye,
    label: 'Review',
    desc: 'The request is checked against the relevant policy or business rule before moving forward.',
  },
  {
    icon: ShieldCheck,
    label: 'AI Check',
    desc: 'An AI check reviews the details for completeness and flags anything that needs human attention.',
  },
  {
    icon: CheckCircle2,
    label: 'Approval',
    desc: 'The right approver is notified automatically, with the context they need to decide quickly.',
  },
  {
    icon: Zap,
    label: 'Action',
    desc: 'Once approved, the system carries out the next step — updating records, notifying teams or triggering the next process.',
  },
  {
    icon: FileText,
    label: 'Report',
    desc: 'Every step is logged, giving management a clear, auditable record of how the process ran.',
  },
]

const OUTCOMES = [
  { title: 'Less manual effort', desc: 'Repetitive steps run on their own.' },
  { title: 'Faster turnaround', desc: 'No request waits in an inbox.' },
  { title: 'Full audit trail', desc: 'Every decision is recorded.' },
]

export default function WorkflowAutomation() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const flowRef = useRef(null)
  const inView = useInView(flowRef)
  const reducedMotion = usePrefersReducedMotion()

  // Never auto-advance for reduced-motion users; they step through manually
  useEffect(() => {
    if (reducedMotion) setPlaying(false)
  }, [reducedMotion])

  // Auto-advance only while the flow is visible
  useEffect(() => {
    if (!playing || !inView) return
    const id = setInterval(() => setActive((a) => (a + 1) % NODES.length), 3200)
    return () => clearInterval(id)
  }, [playing, inView])

  const select = (i) => {
    setActive(i)
    setPlaying(false)
  }

  const ActiveIcon = NODES[active].icon

  return (
    <section id="automation" className="section-pad section-y bg-page-wash">
      <div className="section-max">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Workflow Automation"
            title="Automate the work. Empower the people."
            description="Here is how a typical approval process runs once it's automated — from the moment a request arrives to the report management sees."
          />
          <Reveal delay={100} className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[480px]">
            {OUTCOMES.map((o) => (
              <div key={o.title} className="rounded-2xl border border-ink/[0.06] bg-white p-4">
                <p className="text-sm font-semibold text-ink">{o.title}</p>
                <p className="mt-1 text-xs leading-snug text-mist">{o.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-12 card-surface p-5 md:p-10">
          <div ref={flowRef} className="relative">
            {/* Progress rail (desktop) */}
            <div className="absolute left-[8%] right-[8%] top-[34px] hidden h-[2px] bg-ink/[0.07] md:block">
              <div
                className="h-full bg-gradient-to-r from-navy via-primary to-bright transition-all duration-700"
                style={{ width: `${(active / (NODES.length - 1)) * 100}%` }}
              />
            </div>

            <ol className="relative grid grid-cols-3 gap-y-4 md:grid-cols-6">
              {NODES.map((node, i) => {
                const on = active === i
                const done = i < active
                return (
                  <li key={node.label}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={on ? 'step' : undefined}
                      className="flex w-full flex-col items-center gap-3 rounded-xl px-1 py-2 text-center"
                    >
                      <span
                        className={`grid h-[52px] w-[52px] place-items-center rounded-2xl border-2 transition-all duration-500 ${
                          on
                            ? 'border-primary bg-gradient-to-br from-navy to-primary text-white shadow-glow scale-110'
                            : done
                              ? 'border-primary/30 bg-haze text-primary'
                              : 'border-ink/10 bg-white text-mist'
                        }`}
                      >
                        <node.icon size={20} />
                      </span>
                      <span className={`text-xs font-semibold ${on ? 'text-primary' : 'text-ink/60'}`}>
                        <span className="mr-1 text-mist">0{i + 1}</span>
                        {node.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-navy-deep p-6 md:flex-row md:items-center md:p-7">
            <span key={active} className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-sky animate-popIn">
              <ActiveIcon size={20} />
            </span>
            <div key={`t-${active}`} className="flex-1 animate-popIn">
              <p className="text-xs font-semibold tracking-[0.14em] text-sky">
                STEP 0{active + 1} · {NODES[active].label.toUpperCase()}
              </p>
              <p className="mt-1.5 text-base leading-relaxed text-white/85">{NODES[active].desc}</p>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="btn-ghost-light btn-sm shrink-0 self-start md:self-center"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
