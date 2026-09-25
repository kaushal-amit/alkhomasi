import { useEffect, useState } from 'react'
import { Settings2, Headphones, TrendingUp, Wallet, BookOpen, CheckCircle2, Bot } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const TABS = [
  {
    key: 'operations',
    label: 'Operations',
    icon: Settings2,
    customer: 'A shipment approval has been pending for two days. Can this move forward?',
    agent:
      "I've reviewed the approval chain — the delay is with warehouse confirmation. I've flagged it to the responsible team and queued the next step so it proceeds automatically once confirmed.",
    steps: ['Understanding request', 'Retrieving information', 'Checking workflow', 'Taking action'],
  },
  {
    key: 'customer-service',
    label: 'Customer Service',
    icon: Headphones,
    customer: 'Can you help me with my request?',
    agent:
      'Of course. Let me check the relevant information and guide you through the next step.',
    steps: ['Understanding request', 'Retrieving information', 'Checking workflow', 'Taking action'],
  },
  {
    key: 'sales',
    label: 'Sales',
    icon: TrendingUp,
    customer: 'Where does the proposal for the Gwalior account currently stand?',
    agent:
      "It's with the client for review since Tuesday. I'll follow up on your behalf and update the pipeline the moment there's a response.",
    steps: ['Understanding request', 'Retrieving information', 'Checking workflow', 'Taking action'],
  },
  {
    key: 'collections',
    label: 'Collections',
    icon: Wallet,
    customer: 'Which invoices are overdue this week?',
    agent:
      "I've identified the overdue accounts and drafted reminder communications. I'll route the two largest balances to your team for a direct follow-up.",
    steps: ['Understanding request', 'Retrieving information', 'Checking workflow', 'Taking action'],
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    icon: BookOpen,
    customer: "What's our current process for onboarding a new vendor?",
    agent:
      "Here's the current vendor onboarding process, drawn from your internal documentation, along with the approvals it requires at each stage.",
    steps: ['Understanding request', 'Retrieving information', 'Checking workflow', 'Taking action'],
  },
]

export default function AIAgents() {
  const [active, setActive] = useState(TABS[0].key)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const tab = TABS.find((t) => t.key === active)

  useEffect(() => {
    setVisibleSteps(0)
    const timers = tab.steps.map((_, i) =>
      setTimeout(() => setVisibleSteps(i + 1), 280 * (i + 1))
    )
    return () => timers.forEach(clearTimeout)
  }, [active])

  return (
    <section id="ai-agents" className="section-pad py-24 md:py-32 bg-haze/50">
      <div className="section-max">
        <SectionHeading
          eyebrow="AI Agents"
          title="AI agents that work alongside your business."
          description="Intelligent agents for operations, customer service, sales and collections."
        />

        <Reveal delay={120} className="mt-14 grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Tab rail */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-300 ${
                  active === t.key
                    ? 'bg-navy text-white shadow-soft'
                    : 'bg-white text-ink/70 border border-ink/[0.06] hover:border-primary/30 hover:text-primary'
                }`}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Demo panel */}
          <div className="card-surface p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-navy to-primary text-white">
                  <Bot size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">
                    {tab.label} Agent — capability example
                  </p>
                  <p className="text-xs text-mist">Illustrative solution area, not a live product</p>
                </div>
              </div>
              <span className="hidden sm:flex h-2 w-2 rounded-full bg-bright animate-pulseSoft" />
            </div>

            <div className="mt-6 grid md:grid-cols-[1fr_220px] gap-6">
              <div className="space-y-3">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary/[0.08] px-4 py-3 text-[14.5px] text-ink">
                  {tab.customer}
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-navy px-4 py-3 text-[14.5px] leading-relaxed text-white">
                  {tab.agent}
                </div>
              </div>

              <div className="rounded-xl border border-ink/[0.06] bg-haze/60 p-4">
                <p className="text-[11px] font-semibold tracking-[0.1em] text-mist">AGENT ACTIVITY</p>
                <ul className="mt-3 space-y-2.5">
                  {tab.steps.map((step, i) => (
                    <li
                      key={step}
                      className={`flex items-center gap-2 text-[13px] transition-opacity duration-300 ${
                        i < visibleSteps ? 'opacity-100 text-ink' : 'opacity-35 text-mist'
                      }`}
                    >
                      <CheckCircle2
                        size={14}
                        className={i < visibleSteps ? 'text-bright' : 'text-ink/20'}
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
