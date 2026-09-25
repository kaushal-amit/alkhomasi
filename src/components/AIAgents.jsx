import { useEffect, useState } from 'react'
import { Settings2, Headphones, TrendingUp, Wallet, BookOpen, CheckCircle2, Bot, User, Loader2 } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const STEPS = ['Understanding the request', 'Retrieving information', 'Checking the workflow', 'Taking action']

const TABS = [
  {
    key: 'operations',
    label: 'Operations',
    icon: Settings2,
    blurb: 'Tracks approvals, chases delays and keeps work moving.',
    customer: 'A shipment approval has been pending for two days. Can this move forward?',
    agent:
      "I've reviewed the approval chain — the delay is with warehouse confirmation. I've flagged it to the responsible team and queued the next step so it proceeds automatically once confirmed.",
  },
  {
    key: 'customer-service',
    label: 'Customer Service',
    icon: Headphones,
    blurb: 'Answers customers instantly and hands off complex cases.',
    customer: "I placed an order last week and haven't received an update. Where is it?",
    agent:
      "Your order was dispatched yesterday and is scheduled for delivery on Thursday. I've sent the tracking details to your email and set a reminder to confirm once it arrives.",
  },
  {
    key: 'sales',
    label: 'Sales',
    icon: TrendingUp,
    blurb: 'Keeps the pipeline current and follow-ups on time.',
    customer: 'Where does the proposal for the Gwalior account currently stand?',
    agent:
      "It's been with the client for review since Tuesday. I'll follow up on your behalf and update the pipeline the moment there's a response.",
  },
  {
    key: 'collections',
    label: 'Collections',
    icon: Wallet,
    blurb: 'Identifies overdue accounts and drafts reminders.',
    customer: 'Which invoices are overdue this week?',
    agent:
      "I've identified the overdue accounts and drafted reminder communications. I'll route the two largest balances to your team for a direct follow-up.",
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    icon: BookOpen,
    blurb: 'Finds answers across your internal documentation.',
    customer: "What's our current process for onboarding a new vendor?",
    agent:
      "Here's the current vendor onboarding process, drawn from your internal documentation, along with the approvals it requires at each stage.",
  },
]

export default function AIAgents() {
  const [active, setActive] = useState(TABS[0].key)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [typed, setTyped] = useState('')
  const tab = TABS.find((t) => t.key === active)

  // Replay the agent "thinking" steps, then type out the reply
  useEffect(() => {
    setVisibleSteps(0)
    setTyped('')
    const timers = STEPS.map((_, i) => setTimeout(() => setVisibleSteps(i + 1), 350 * (i + 1)))
    let typer
    const start = setTimeout(() => {
      let n = 0
      typer = setInterval(() => {
        n += 3
        setTyped(tab.agent.slice(0, n))
        if (n >= tab.agent.length) clearInterval(typer)
      }, 16)
    }, 350 * STEPS.length + 200)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(start)
      clearInterval(typer)
    }
  }, [active, tab.agent])

  const thinking = visibleSteps < STEPS.length
  const typing = !thinking && typed.length < tab.agent.length

  return (
    <section id="ai-agents" className="section-pad py-24 md:py-32">
      <div className="section-max">
        <SectionHeading
          eyebrow="AI Agents"
          title="AI agents that work alongside your business."
          description="Pick a department to see how an agent handles a real request — understanding it, finding the right information, checking your workflow and taking the next step."
        />

        <Reveal delay={120} className="mt-14 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Tab rail */}
          <div role="tablist" aria-label="Agent examples" className="no-scrollbar flex min-w-0 lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {TABS.map((t) => {
              const on = active === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(t.key)}
                  className={`flex shrink-0 items-start gap-3 rounded-2xl px-4 py-4 text-left transition-all duration-300 ${
                    on
                      ? 'bg-navy text-white shadow-lift'
                      : 'bg-white text-ink/75 border border-ink/[0.07] hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${on ? 'bg-white/10 text-sky' : 'bg-haze text-primary'}`}>
                    <t.icon size={16} />
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-semibold">{t.label}</span>
                    <span className={`mt-0.5 hidden lg:block text-[12.5px] leading-snug ${on ? 'text-white/60' : 'text-mist'}`}>
                      {t.blurb}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Demo panel */}
          <div className="relative min-w-0 overflow-hidden rounded-3xl bg-navy-deep p-5 md:p-8 shadow-lift">
            <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
            <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-bright/20 blur-3xl" />

            <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-bright text-white">
                  <Bot size={18} />
                </span>
                <div className="leading-tight">
                  <p className="text-[15px] font-semibold text-white">{tab.label} Agent</p>
                  <p className="text-[12px] text-white/50">Capability example · not a live product</p>
                </div>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11.5px] font-semibold text-sky">
                <span className="h-1.5 w-1.5 rounded-full bg-sky animate-pulseSoft" /> Online
              </span>
            </div>

            <div className="relative mt-6 grid md:grid-cols-[1fr_230px] gap-6">
              <div className="flex min-h-[260px] flex-col gap-4" aria-live="polite">
                <div className="flex items-end justify-end gap-2.5">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-[14.5px] leading-relaxed text-ink">
                    {tab.customer}
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white/70">
                    <User size={14} />
                  </span>
                </div>
                <div className="flex items-end gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-bright text-white">
                    <Bot size={14} />
                  </span>
                  <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.07] px-4 py-3 text-[14.5px] leading-relaxed text-white">
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
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/45">AGENT ACTIVITY</p>
                <ul className="mt-4 space-y-3">
                  {STEPS.map((step, i) => {
                    const done = i < visibleSteps
                    return (
                      <li
                        key={step}
                        className={`flex items-center gap-2.5 text-[13px] transition-all duration-300 ${
                          done ? 'text-white' : 'text-white/35'
                        }`}
                      >
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
        </Reveal>
      </div>
    </section>
  )
}
