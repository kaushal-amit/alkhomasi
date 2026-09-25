import { useRef, useState } from 'react'
import { Bot, Workflow, LayoutDashboard, BarChart3, Network, Check, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import AgentDemo from './demos/AgentDemo.jsx'
import WorkflowDemo from './demos/WorkflowDemo.jsx'
import SoftwareDemo from './demos/SoftwareDemo.jsx'
import InsightsDemo from './demos/InsightsDemo.jsx'
import IntegrationDemo from './demos/IntegrationDemo.jsx'
import { useHashTarget, tabKeyHandler } from '../lib/hashTarget.js'
import { useContactModal } from './ContactModalContext.jsx'

export const DEMOS = [
  {
    key: 'agents',
    icon: Bot,
    label: 'AI Agents',
    title: 'AI agents that work alongside your business.',
    desc: 'Pick a department and watch an agent handle a real request — understanding it, finding the right information, checking your workflow and taking the next step.',
    points: [
      'Answers and actions grounded in your own data and rules',
      'Hands complex or sensitive cases to the right person',
      'Every action is logged and reviewable',
    ],
    Demo: AgentDemo,
  },
  {
    key: 'automation',
    icon: Workflow,
    label: 'Workflow Automation',
    title: 'Automate the work. Empower the people.',
    desc: "How a typical approval process runs once it's automated — from the moment a request arrives to the report management sees.",
    points: [
      'Less manual effort — repetitive steps run on their own',
      'Faster turnaround — no request waits in an inbox',
      'Full audit trail — every decision is recorded',
    ],
    Demo: WorkflowDemo,
  },
  {
    key: 'software',
    icon: LayoutDashboard,
    label: 'Business Software',
    title: 'Software built around your business — not the other way round.',
    desc: 'Custom platforms that reflect how your organization actually operates, so your team adopts them quickly and management gets one reliable view of work in progress.',
    points: [
      'Designed around your approval chains, roles and terminology',
      'One place for requests, tasks, status and reporting',
      'Built to grow — add modules as your needs evolve',
    ],
    Demo: SoftwareDemo,
  },
  {
    key: 'data',
    icon: BarChart3,
    label: 'Data & BI',
    title: 'Turn business data into actionable insights.',
    desc: "Most organizations already have the data they need — it's just scattered across spreadsheets and systems. We bring it together so leaders see performance clearly and act early.",
    points: [
      'Live dashboards that pull from every system you use',
      'Scheduled reports delivered automatically to the right people',
      'Early warnings when a metric moves outside its normal range',
    ],
    Demo: InsightsDemo,
  },
  {
    key: 'integration',
    icon: Network,
    label: 'Integration',
    title: 'Connect the systems you already use.',
    desc: 'Disconnected tools create duplicate work and conflicting numbers. We link your ERP, CRM, databases, cloud services and APIs so information flows automatically.',
    points: [
      'Data entered once, updated everywhere',
      'Secure, well-documented APIs between systems',
      'Keep the tools your team already knows',
    ],
    Demo: IntegrationDemo,
  },
]

const KEYS = DEMOS.map((d) => d.key)

export default function SeeItInAction() {
  const [active, setActive] = useState(KEYS[0])
  const tabRefs = useRef([])
  const demo = DEMOS.find((d) => d.key === active)
  const { open } = useContactModal()

  // "#demo-<key>" links from the Solutions panels open the matching demo
  useHashTarget('demo', KEYS, 'demos', setActive)

  return (
    <section id="demos" className="section-pad section-y">
      <div className="section-max">
        <SectionHeading
          align="center"
          eyebrow="See It In Action"
          title="What intelligent systems look like in practice."
          description="Interactive examples of what we build. They illustrate our capabilities using sample scenarios — they are not live client systems."
        />

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Demos"
            onKeyDown={tabKeyHandler(KEYS, active, setActive, tabRefs)}
            className="no-scrollbar -mx-5 flex max-w-full gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:rounded-full md:bg-haze md:p-1.5 md:px-1.5"
          >
            {DEMOS.map((d, i) => {
              const on = d.key === active
              return (
                <button
                  key={d.key}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`demo-tab-${d.key}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="demo-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(d.key)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    on ? 'bg-navy text-white shadow-soft' : 'bg-white text-ink/70 ring-1 ring-ink/[0.07] hover:text-primary md:bg-transparent md:ring-0'
                  }`}
                >
                  <d.icon size={15} /> {d.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div
          id="demo-panel"
          role="tabpanel"
          aria-labelledby={`demo-tab-${active}`}
          className="mt-10 grid items-center gap-10 lg:min-h-[540px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
        >
          <div key={`copy-${active}`} className="animate-popIn">
            <h3 className="text-h3 font-semibold text-ink">{demo.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">{demo.desc}</p>
            <ul className="mt-6 space-y-3">
              {demo.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <button type="button" onClick={open} className="link-arrow mt-8">
              Talk to us about {demo.label === 'Integration' ? 'integration' : demo.label}
              <span className="chip">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>

          <div key={`demo-${active}`} className="min-w-0 animate-popIn">
            <demo.Demo />
          </div>
        </div>
      </div>
    </section>
  )
}
