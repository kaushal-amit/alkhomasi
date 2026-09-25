import {
  Bot,
  Workflow,
  LayoutDashboard,
  Users,
  BarChart3,
  Network,
  ArrowRight,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const SPINE = ['Manual Process', 'AI', 'Automation', 'Integration', 'Intelligence']

const CAPABILITIES = [
  {
    icon: Bot,
    title: 'AI Solutions',
    desc: 'AI-powered applications, assistants and intelligent agents.',
    span: 'md:col-span-2',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    desc: 'Automate repetitive corporate processes and approvals.',
    span: '',
  },
  {
    icon: LayoutDashboard,
    title: 'Business Software',
    desc: "Custom platforms built around your organization's workflows.",
    span: '',
  },
  {
    icon: Users,
    title: 'AI Agents',
    desc: 'Intelligent agents for operations, customer service, sales and collections.',
    span: 'md:col-span-2',
  },
  {
    icon: BarChart3,
    title: 'Data & Business Intelligence',
    desc: 'Turn business data into actionable insights.',
    span: '',
  },
  {
    icon: Network,
    title: 'System Integration',
    desc: 'Connect ERP, CRM, APIs, cloud and existing business systems.',
    span: '',
  },
]

export default function SolutionsOverview() {
  return (
    <section id="solutions" className="section-pad py-24 md:py-32">
      <div className="section-max">
        <SectionHeading
          eyebrow="What We Build"
          title="From manual processes to intelligent workflows."
          description="We build intelligent business solutions that automate workflows, connect systems, reduce manual work and help organizations make faster, smarter decisions."
        />

        {/* Transformation spine */}
        <Reveal
          delay={120}
          className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-4 rounded-2xl border border-ink/[0.06] bg-haze/60 p-5 md:p-6"
        >
          {SPINE.map((stage, i) => (
            <div key={stage} className="flex items-center gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  i === 0
                    ? 'bg-white text-mist border border-ink/10'
                    : 'bg-gradient-to-r from-navy to-primary text-white'
                }`}
              >
                {stage}
              </span>
              {i < SPINE.length - 1 && <ArrowRight size={16} className="text-primary/50 shrink-0" />}
            </div>
          ))}
        </Reveal>

        {/* Capability grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 70} className={cap.span}>
              <div className="group h-full card-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-primary/20">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/[0.08] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <cap.icon size={19} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{cap.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mist">{cap.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
