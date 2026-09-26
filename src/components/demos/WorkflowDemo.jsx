import { useEffect, useRef, useState } from 'react'
import { Inbox, Eye, ShieldCheck, CheckCircle2, Zap, FileText, Pause, Play } from 'lucide-react'
import { useInView, usePrefersReducedMotion } from '../../hooks/motion.js'

const NODES = [
  {
    icon: Inbox,
    label: 'Request',
    desc: 'A request enters the workflow — a purchase, a leave application, a client onboarding, or any process your team runs regularly.',
  },
  { icon: Eye, label: 'Review', desc: 'The request is checked against the relevant policy or business rule before moving forward.' },
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

export default function WorkflowDemo() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref)
  const reducedMotion = usePrefersReducedMotion()

  // Reduced-motion visitors step through manually
  useEffect(() => {
    if (reducedMotion) setPlaying(false)
  }, [reducedMotion])

  // Auto-advance only while visible
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
    <div ref={ref} className="card-surface p-5 md:p-7">
      <div className="relative">
        {/* Progress rail (tablet and up) */}
        <div className="absolute left-[8%] right-[8%] top-[30px] hidden h-[2px] bg-ink/[0.07] md:block">
          <div
            className="h-full bg-gradient-to-r from-navy via-primary to-bright transition-all duration-700"
            style={{ width: `${(active / (NODES.length - 1)) * 100}%` }}
          />
        </div>

        <ol className="relative grid grid-cols-3 gap-y-3 md:grid-cols-6">
          {NODES.map((node, i) => {
            const on = active === i
            const done = i < active
            return (
              <li key={node.label}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={on ? 'step' : undefined}
                  className="flex w-full flex-col items-center gap-2.5 rounded-xl px-1 py-2 text-center"
                >
                  <span
                    className={`grid h-[46px] w-[46px] place-items-center rounded-2xl border-2 transition-all duration-500 ${
                      on
                        ? 'scale-110 border-primary bg-gradient-to-br from-navy to-primary text-white shadow-glow'
                        : done
                          ? 'border-primary/30 bg-haze text-primary'
                          : 'border-ink/10 bg-white text-mist'
                    }`}
                  >
                    <node.icon size={18} />
                  </span>
                  <span className={`text-xs font-semibold ${on ? 'text-primary' : 'text-ink/70'}`}>{node.label}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-navy-deep p-5 sm:flex-row sm:items-center md:p-6">
        <span key={active} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-sky animate-popIn">
          <ActiveIcon size={19} />
        </span>
        <div key={`t-${active}`} className="flex-1 animate-popIn" aria-live="polite">
          <p className="text-2xs font-semibold tracking-[0.14em] text-sky">
            STEP 0{active + 1} · {NODES[active].label.toUpperCase()}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/85">{NODES[active].desc}</p>
        </div>
        <button type="button" onClick={() => setPlaying((p) => !p)} className="btn-ghost-light btn-sm shrink-0 self-start sm:self-center">
          {playing ? <Pause size={14} /> : <Play size={14} />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  )
}
