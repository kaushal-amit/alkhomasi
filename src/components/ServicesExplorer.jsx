import { useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  BrainCircuit,
  Lightbulb,
  MessagesSquare,
  FileSearch,
  Wand2,
  Bot,
  Settings2,
  Headphones,
  TrendingUp,
  Wallet,
  BookOpen,
  Workflow,
  CheckCircle2,
  FileCog,
  BellRing,
  ClipboardList,
  LayoutDashboard,
  AppWindow,
  PanelsTopLeft,
  Boxes,
  Globe,
  BarChart3,
  Gauge,
  FileBarChart,
  DatabaseZap,
  LineChart,
  Network,
  Building2,
  Users,
  Code2,
  Cloud,
  Database,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const SERVICES = [
  {
    id: 'svc-ai',
    icon: Sparkles,
    name: 'AI Solutions',
    tagline: 'Intelligent business applications',
    title: 'Your partner in practical, business-ready AI.',
    desc: 'We identify where AI creates real value in your operations, then design and build applications, assistants and models that fit your data, your people and your processes.',
    capabilities: [
      { icon: Lightbulb, label: 'AI Strategy & Consulting' },
      { icon: BrainCircuit, label: 'Custom AI Applications' },
      { icon: MessagesSquare, label: 'AI Assistants & Copilots' },
      { icon: FileSearch, label: 'Document Intelligence' },
      { icon: Wand2, label: 'Generative AI Integration' },
    ],
    links: [
      { label: 'See AI agents in action', href: '#ai-agents' },
      { label: 'How we work', href: '#how-we-work' },
    ],
  },
  {
    id: 'svc-agents',
    icon: Bot,
    name: 'AI Agents',
    tagline: 'Digital teammates for daily operations',
    title: 'AI agents that work alongside your team.',
    desc: 'Agents that understand requests, retrieve the right information, check your workflows and take action — across operations, customer service, sales and collections.',
    capabilities: [
      { icon: Settings2, label: 'Operations Agents' },
      { icon: Headphones, label: 'Customer Service Agents' },
      { icon: TrendingUp, label: 'Sales Agents' },
      { icon: Wallet, label: 'Collections Agents' },
      { icon: BookOpen, label: 'Knowledge Agents' },
    ],
    links: [{ label: 'Try the agent demo', href: '#ai-agents' }],
  },
  {
    id: 'svc-automation',
    icon: Workflow,
    name: 'Workflow Automation',
    tagline: 'Remove repetitive manual work',
    title: 'Automate the routine. Free your people for what matters.',
    desc: 'We map how work actually flows through your organization and automate the repetitive steps — requests, reviews, approvals, notifications and reporting — with full auditability.',
    capabilities: [
      { icon: CheckCircle2, label: 'Approval Workflows' },
      { icon: FileCog, label: 'Document & Form Automation' },
      { icon: Workflow, label: 'End-to-End Process Automation' },
      { icon: BellRing, label: 'Alerts & Escalations' },
      { icon: ClipboardList, label: 'Audit Trails & Logs' },
    ],
    links: [{ label: 'Walk through a workflow', href: '#automation' }],
  },
  {
    id: 'svc-software',
    icon: LayoutDashboard,
    name: 'Business Software',
    tagline: 'Platforms built around you',
    title: 'Custom software shaped around your business.',
    desc: "Instead of bending your processes to fit off-the-shelf tools, we build platforms around your organization's workflows — secure, scalable and easy for your team to adopt.",
    capabilities: [
      { icon: AppWindow, label: 'Custom Business Platforms' },
      { icon: PanelsTopLeft, label: 'Internal Portals' },
      { icon: Boxes, label: 'Operations Management Systems' },
      { icon: Gauge, label: 'Management Dashboards' },
      { icon: Globe, label: 'Web Applications' },
    ],
    links: [{ label: 'View a sample interface', href: '#business-software' }],
  },
  {
    id: 'svc-data',
    icon: BarChart3,
    name: 'Data & Business Intelligence',
    tagline: 'Decisions backed by data',
    title: 'Turn scattered data into decisions.',
    desc: 'We consolidate data from across your business into clear dashboards and automated reports, so management sees what is happening — and what needs attention — at a glance.',
    capabilities: [
      { icon: Gauge, label: 'KPI Dashboards' },
      { icon: FileBarChart, label: 'Automated Reporting' },
      { icon: DatabaseZap, label: 'Data Consolidation' },
      { icon: LineChart, label: 'Trend & Performance Analysis' },
      { icon: BrainCircuit, label: 'AI-Powered Insights' },
    ],
    links: [{ label: 'See an insight dashboard', href: '#insights' }],
  },
  {
    id: 'svc-integration',
    icon: Network,
    name: 'System Integration',
    tagline: 'One connected business',
    title: 'Connect the systems you already rely on.',
    desc: 'We connect ERP, CRM, databases, cloud services and third-party APIs so data flows automatically — no more re-keying information or reconciling disconnected tools.',
    capabilities: [
      { icon: Building2, label: 'ERP Integration' },
      { icon: Users, label: 'CRM Integration' },
      { icon: Code2, label: 'API Development' },
      { icon: Cloud, label: 'Cloud Integration' },
      { icon: Database, label: 'Database Connectivity' },
    ],
    links: [{ label: 'See the integration map', href: '#integration' }],
  },
]

export default function ServicesExplorer() {
  const [active, setActive] = useState(SERVICES[0].id)
  const railRef = useRef(null)

  // Scroll-spy: the rail follows whichever service panel is centred in view
  useEffect(() => {
    const panels = SERVICES.map((s) => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    panels.forEach((p) => observer.observe(p))
    return () => observer.disconnect()
  }, [])

  // Keep the active chip visible in the mobile horizontal rail
  useEffect(() => {
    const rail = railRef.current
    const chip = rail?.querySelector(`[data-chip="${active}"]`)
    if (rail && chip && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' })
    }
  }, [active])

  return (
    <section id="solutions" className="relative bg-page-wash section-pad py-24 md:py-32">
      <div className="section-max">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What We Build"
            title="Six capabilities. One intelligent business."
            description="From manual processes to intelligent workflows — we build solutions that automate work, connect systems and help organizations make faster, smarter decisions."
          />
          <Reveal delay={120} className="hidden md:flex items-center gap-2 text-[13px] font-semibold text-mist">
            Scroll to explore <ArrowRight size={14} className="rotate-90" />
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
          {/* Rail — sticky dark sidebar on desktop, sticky chips on mobile */}
          <div className="sticky top-[64px] z-20 -mx-5 min-w-0 md:-mx-10 lg:mx-0 lg:top-28 lg:self-start">
            <nav
              ref={railRef}
              aria-label="Solutions"
              className="no-scrollbar flex gap-2 overflow-x-auto bg-white/90 px-5 py-3 backdrop-blur-lg md:px-10 lg:hidden"
            >
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  data-chip={s.id}
                  href={`#${s.id}`}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    active === s.id ? 'bg-navy text-white' : 'bg-haze text-ink/70'
                  }`}
                >
                  <s.icon size={14} /> {s.name}
                </a>
              ))}
            </nav>

            <nav
              aria-label="Solutions"
              className="relative hidden overflow-hidden rounded-3xl bg-navy-deep p-3 shadow-lift lg:block"
            >
              <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
              <ul className="relative">
                {SERVICES.map((s, i) => {
                  const on = active === s.id
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={on ? 'true' : undefined}
                        className={`group relative flex items-start gap-4 rounded-2xl px-5 py-5 transition-all duration-300 ${
                          on ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-gradient-to-b from-sky to-bright transition-opacity ${
                            on ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        <span className={`mt-0.5 font-display text-[12px] font-semibold ${on ? 'text-sky' : 'text-white/30'}`}>
                          0{i + 1}
                        </span>
                        <span className="flex-1">
                          <span
                            className={`block font-display text-[17px] font-semibold leading-snug transition-colors ${
                              on ? 'text-sky' : 'text-white/55 group-hover:text-white/80'
                            }`}
                          >
                            {s.name}
                          </span>
                          <span
                            className={`mt-1 block text-[13.5px] transition-colors ${
                              on ? 'text-white' : 'text-white/35 group-hover:text-white/55'
                            }`}
                          >
                            {s.tagline}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={16}
                          className={`mt-1 transition-all ${on ? 'text-sky opacity-100' : 'opacity-0 group-hover:opacity-60 text-white'}`}
                        />
                      </a>
                      {i < SERVICES.length - 1 && <div className="mx-5 h-px bg-white/[0.07]" />}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Panels */}
          <div className="flex min-w-0 flex-col gap-6">
            {SERVICES.map((s, i) => (
              <ServicePanel key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicePanel({ service: s, index }) {
  return (
    <article
      id={s.id}
      className="scroll-mt-40 lg:scroll-mt-28 relative overflow-hidden rounded-3xl border border-ink/[0.06] bg-white/80 p-6 shadow-soft backdrop-blur md:p-10"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-bright/10 to-transparent blur-2xl" />
      <Reveal className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-navy to-primary text-white shadow-soft">
            <s.icon size={19} />
          </span>
          <span className="eyebrow text-primary">
            0{index + 1} · {s.name}
          </span>
        </div>
        <h3 className="mt-6 max-w-2xl text-[1.75rem] leading-[1.15] md:text-[2.3rem] font-semibold tracking-tight text-ink">
          {s.title}
        </h3>
        <p className="mt-4 max-w-2xl text-[16px] md:text-[17px] leading-relaxed text-mist">{s.desc}</p>

        <p className="mt-9 font-display text-[18px] font-semibold text-ink">Core Capabilities</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {s.capabilities.map((c) => (
            <li
              key={c.label}
              className="group relative flex min-h-[148px] flex-col items-center justify-center gap-3 rounded-2xl border border-ink/[0.06] bg-white p-4 text-center shadow-[0_1px_2px_rgba(6,43,99,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:bg-navy hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-haze text-navy transition-colors duration-300 group-hover:bg-white/10 group-hover:text-sky">
                <c.icon size={22} strokeWidth={1.8} />
              </span>
              <span className="text-[14px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-white">
                {c.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {s.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-3 rounded-xl bg-navy py-3 pl-5 pr-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-primary"
            >
              {l.label}
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={13} />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </article>
  )
}
