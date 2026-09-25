import { useState } from 'react'
import { Inbox, Eye, ShieldCheck, CheckCircle2, Zap, FileText } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

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

export default function WorkflowAutomation() {
  const [active, setActive] = useState(0)

  return (
    <section id="automation" className="section-pad py-24 md:py-32">
      <div className="section-max">
        <SectionHeading
          eyebrow="Workflow Automation"
          title="Automate the work. Empower the people."
          description="Automate repetitive corporate processes and approvals."
        />

        <Reveal delay={120} className="mt-14 card-surface p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
            {NODES.map((node, i) => (
              <div key={node.label} className="flex md:flex-1 items-center">
                <button
                  onClick={() => setActive(i)}
                  className="flex flex-1 flex-col items-center gap-2.5 rounded-xl px-2 py-3 text-center transition-colors duration-300 hover:bg-haze/70"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full border-2 transition-all duration-300 ${
                      active === i
                        ? 'border-primary bg-gradient-to-br from-navy to-primary text-white shadow-glow scale-105'
                        : 'border-ink/10 bg-white text-mist'
                    }`}
                  >
                    <node.icon size={18} />
                  </span>
                  <span
                    className={`text-[13px] font-semibold ${
                      active === i ? 'text-primary' : 'text-ink/60'
                    }`}
                  >
                    {node.label}
                  </span>
                </button>
                {i < NODES.length - 1 && (
                  <span className="hidden md:block h-px flex-1 min-w-[16px] bg-gradient-to-r from-primary/30 to-bright/10" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-ink/[0.06] bg-haze/60 p-6 transition-all duration-300">
            <p className="text-sm font-semibold text-primary">{NODES[active].label}</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink/80">{NODES[active].desc}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
