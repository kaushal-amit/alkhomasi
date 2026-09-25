import { LayoutGrid, Clock3, CheckSquare, Activity, ChevronRight, Check } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const STATUS = [
  { label: 'Purchase Requests', value: 'On track', tone: 'bg-emerald-500' },
  { label: 'Vendor Onboarding', value: 'Needs review', tone: 'bg-amber-400' },
  { label: 'Expense Approvals', value: 'On track', tone: 'bg-emerald-500' },
]

const TASKS = ['Review Q3 budget variance', 'Approve leave request — Ops team', 'Confirm vendor contract renewal']

const ACTIVITY = [
  { text: 'Approval routed to Finance Manager', time: '2m' },
  { text: 'New workflow instance created', time: '14m' },
  { text: 'Report generated for Operations', time: '1h' },
]

const POINTS = [
  'Designed around your approval chains, roles and terminology',
  'One place for requests, tasks, status and reporting',
  'Built to grow — add modules as your needs evolve',
]

export default function BusinessSoftware() {
  return (
    <section id="business-software" className="section-pad py-24 md:py-32">
      <div className="section-max grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <div>
          <SectionHeading
            eyebrow="Business Software"
            title="Software built around your business — not the other way round."
            description="Custom platforms that reflect how your organization actually operates, so your team adopts them quickly and management gets a single, reliable view of work in progress."
          />
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3.5">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15.5px] text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-bright/15 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-card">
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-ink/[0.06] bg-haze/60 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                </span>
                <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <LayoutGrid size={14} className="text-primary" /> Operations Overview
                </span>
              </div>
              <span className="text-[11px] font-medium text-mist">Illustrative interface</span>
            </div>

            <div className="grid grid-cols-3 gap-px bg-ink/[0.06]">
              {[
                { label: 'Pending Approvals', value: '12' },
                { label: 'Active Workflows', value: '28' },
                { label: 'Tasks Today', value: '7' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white p-5">
                  <p className="font-display text-[1.7rem] font-semibold text-navy">{kpi.value}</p>
                  <p className="mt-1 text-[12px] leading-tight text-mist">{kpi.label}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-ink/[0.06]">
              <div className="bg-white p-5">
                <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                  <Clock3 size={13} className="text-primary" /> Workflow Status
                </p>
                <ul className="mt-3 space-y-2.5">
                  {STATUS.map((s) => (
                    <li key={s.label} className="flex items-center justify-between gap-2 text-[13px]">
                      <span className="text-ink/75">{s.label}</span>
                      <span className="flex items-center gap-1.5 rounded-full bg-haze px-2 py-0.5 text-[11.5px] text-ink/70">
                        <span className={`h-1.5 w-1.5 rounded-full ${s.tone}`} /> {s.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5">
                <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                  <CheckSquare size={13} className="text-primary" /> My Tasks
                </p>
                <ul className="mt-3 space-y-2.5">
                  {TASKS.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-[13px] text-ink/75">
                      <ChevronRight size={12} className="shrink-0 text-bright" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-ink/[0.06] bg-white p-5">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                <Activity size={13} className="text-primary" /> Recent Activity
              </p>
              <ul className="mt-3 space-y-2">
                {ACTIVITY.map((a) => (
                  <li key={a.text} className="flex items-center justify-between text-[13px] text-ink/65">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50" /> {a.text}
                    </span>
                    <span className="text-[11.5px] text-mist">{a.time} ago</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
