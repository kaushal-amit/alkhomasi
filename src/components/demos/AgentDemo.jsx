import { useEffect, useRef, useState } from 'react'
import { Settings2, Headphones, TrendingUp, Wallet, BookOpen, CheckCircle2, Bot, User, Loader2 } from 'lucide-react'
import { useInView, usePrefersReducedMotion } from '../../hooks/motion.js'

const STEPS = ['Understanding the request', 'Retrieving information', 'Checking the workflow', 'Taking action']

const DEPARTMENTS = [
  {
    key: 'operations',
    label: 'Operations',
    icon: Settings2,
    customer: 'A shipment approval has been pending for two days. Can this move forward?',
    agent:
      "I've reviewed the approval chain — the delay is with warehouse confirmation. I've flagged it to the responsible team and queued the next step so it proceeds automatically once confirmed.",
  },
  {
    key: 'customer-service',
    label: 'Customer Service',
    icon: Headphones,
    customer: "I placed an order last week and haven't received an update. Where is it?",
    agent:
      "Your order was dispatched yesterday and is scheduled for delivery on Thursday. I've sent the tracking details to your email and set a reminder to confirm once it arrives.",
  },
  {
    key: 'sales',
    label: 'Sales',
    icon: TrendingUp,
    customer: 'Where does the proposal for the Gwalior account currently stand?',
    agent:
      "It's been with the client for review since Tuesday. I'll follow up on your behalf and update the pipeline the moment there's a response.",
  },
  {
    key: 'collections',
    label: 'Collections',
    icon: Wallet,
    customer: 'Which invoices are overdue this week?',
    agent:
      "I've identified the overdue accounts and drafted reminder communications. I'll route the two largest balances to your team for a direct follow-up.",
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    icon: BookOpen,
    customer: "What's our current process for onboarding a new vendor?",
    agent:
      "Here's the current vendor onboarding process, drawn from your internal documentation, along with the approvals it requires at each stage.",
  },
]

export default function AgentDemo() {
  const [active, setActive] = useState(DEPARTMENTS[0].key)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [typed, setTyped] = useState('')
  const [started, setStarted] = useState(false)
  const dept = DEPARTMENTS.find((d) => d.key === active)
  const ref = useRef(null)
  const inView = useInView(ref)
  const reducedMotion = usePrefersReducedMotion()

  // Start the first time the demo is on screen
  useEffect(() => {
    if (inView) setStarted(true)
  }, [inView])

  // Replay the "thinking" steps, then type the reply. Reduced motion shows
  // the finished state straight away.
  useEffect(() => {
    if (reducedMotion) {
      setVisibleSteps(STEPS.length)
      setTyped(dept.agent)
      return
    }
    if (!started) return
    setVisibleSteps(0)
    setTyped('')
    const timers = STEPS.map((_, i) => setTimeout(() => setVisibleSteps(i + 1), 350 * (i + 1)))
    let typer
    const start = setTimeout(() => {
      let n = 0
      typer = setInterval(() => {
        n += 3
        setTyped(dept.agent.slice(0, n))
        if (n >= dept.agent.length) clearInterval(typer)
      }, 16)
    }, 350 * STEPS.length + 200)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(start)
      clearInterval(typer)
    }
  }, [active, dept.agent, started, reducedMotion])

  const thinking = visibleSteps < STEPS.length
  const typing = !thinking && typed.length < dept.agent.length

  return (
    <div ref={ref} className="card-dark p-5 md:p-7">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />

      {/* Department picker */}
      <div className="relative">
        <p id="agent-dept-label" className="text-2xs font-semibold tracking-[0.14em] text-white/60">
          CHOOSE A DEPARTMENT
        </p>
        <div role="group" aria-labelledby="agent-dept-label" className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {DEPARTMENTS.map((d) => {
            const on = d.key === active
            return (
              <button
                key={d.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(d.key)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  on ? 'bg-white text-navy' : 'bg-white/[0.06] text-white/80 hover:bg-white/10'
                }`}
              >
                <d.icon size={14} /> {d.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between border-y border-white/10 py-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-bright text-white">
            <Bot size={17} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">{dept.label} Agent</p>
            <p className="text-2xs text-white/60">Capability example · not a live product</p>
          </div>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-2xs font-semibold text-sky">
          <span className="h-1.5 w-1.5 rounded-full bg-sky" /> Online
        </span>
      </div>

      <div className="relative mt-5 grid gap-5 md:grid-cols-[1fr_200px]">
        <div className="flex min-h-[230px] flex-col gap-4" aria-live="polite">
          <div className="flex items-end justify-end gap-2.5">
            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm leading-relaxed text-ink">
              {dept.customer}
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white/70">
              <User size={14} />
            </span>
          </div>
          <div className="flex items-end gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-bright text-white">
              <Bot size={14} />
            </span>
            <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-white">
              {thinking ? (
                <span className="flex items-center gap-2 text-white/60">
                  <Loader2 size={14} className="animate-spin" /> Working on it…
                </span>
              ) : (
                <span className={typing ? 'caret' : ''}>{typed}</span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-2xs font-semibold tracking-[0.14em] text-white/60">AGENT ACTIVITY</p>
          <ul className="mt-4 space-y-3">
            {STEPS.map((step, i) => {
              const done = i < visibleSteps
              return (
                <li key={step} className={`flex items-center gap-2.5 text-xs transition-colors duration-300 ${done ? 'text-white' : 'text-white/60'}`}>
                  <CheckCircle2 size={15} className={done ? 'text-sky' : 'text-white/20'} />
                  {step}
                </li>
              )
            })}
          </ul>
          <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-bright to-sky transition-all duration-500"
              style={{ width: `${(visibleSteps / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
