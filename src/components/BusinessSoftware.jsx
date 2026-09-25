import { LayoutGrid, Clock3, CheckSquare, Activity, ChevronRight } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const STATUS = [
  { label: 'Purchase Requests', value: 'On track', tone: 'bg-bright' },
  { label: 'Vendor Onboarding', value: 'Needs review', tone: 'bg-amber-400' },
  { label: 'Expense Approvals', value: 'On track', tone: 'bg-bright' },
]

const TASKS = ['Review Q3 budget variance', 'Approve leave request — Ops team', 'Confirm vendor contract renewal']

const ACTIVITY = [
  'Approval routed to Finance Manager',
  'New workflow instance created',
  'Report generated for Operations',
]

export default function BusinessSoftware() {
  return (
    <section id="business-software" className="section-pad py-24 md:py-32 bg-haze/50">
      <div className="section-max grid lg:grid-cols-2 gap-14 items-center">
        <SectionHeading
          eyebrow="Business Software"
          title="Software built around your business."
          description="Custom platforms built around your organization's workflows."
        />

        <Reveal delay={140} className="card-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink/[0.06] px-6 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <LayoutGrid size={16} className="text-primary" /> Overview
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
                <p className="text-2xl font-semibold text-ink">{kpi.value}</p>
                <p className="mt-1 text-[12px] text-mist leading-tight">{kpi.label}</p>
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
                  <li key={s.label} className="flex items-center justify-between text-[13px]">
                    <span className="text-ink/70">{s.label}</span>
                    <span className="flex items-center gap-1.5 text-ink/60">
                      <span className={`h-1.5 w-1.5 rounded-full ${s.tone}`} /> {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                <CheckSquare size={13} className="text-primary" /> Tasks
              </p>
              <ul className="mt-3 space-y-2.5">
                {TASKS.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[13px] text-ink/70">
                    <ChevronRight size={12} className="text-bright shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-5 border-t border-ink/[0.06]">
            <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
              <Activity size={13} className="text-primary" /> Recent Activity
            </p>
            <ul className="mt-3 space-y-2 text-[13px] text-ink/60">
              {ACTIVITY.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
