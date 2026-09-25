import {
  FileSpreadsheet,
  Mail,
  ClipboardCheck,
  Unplug,
  RotateCcw,
  Sparkles,
  Workflow,
  Network,
  LayoutDashboard,
  BrainCircuit,
  ArrowRight,
  X,
  Check,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const ROWS = [
  { before: { icon: FileSpreadsheet, label: 'Scattered spreadsheets' }, after: { icon: LayoutDashboard, label: 'Live dashboards' } },
  { before: { icon: Mail, label: 'Requests lost in email' }, after: { icon: Workflow, label: 'Tracked, automated workflows' } },
  { before: { icon: ClipboardCheck, label: 'Manual approvals' }, after: { icon: Sparkles, label: 'AI-assisted approvals' } },
  { before: { icon: Unplug, label: 'Disconnected systems' }, after: { icon: Network, label: 'Connected systems' } },
  { before: { icon: RotateCcw, label: 'Repetitive data entry' }, after: { icon: BrainCircuit, label: 'Intelligent automation' } },
]

export default function DigitalTransformation() {
  return (
    <section className="section-pad section-y-sm">
      <div className="section-max">
        <SectionHeading
          align="center"
          eyebrow="Digital Transformation"
          title="Modernize the way your business works."
          description="Transformation isn't about replacing everything at once. We start with the processes that cost you the most time and turn them into intelligent workflows — one practical step at a time."
        />

        <Reveal delay={120} className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-card">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-ink/[0.06] bg-haze/60 px-4 py-4 md:px-8">
            <p className="text-2xs font-semibold tracking-[0.14em] text-mist">BEFORE</p>
            <span className="w-10 md:w-16" />
            <p className="text-2xs font-semibold tracking-[0.14em] text-primary">AFTER AL-KHOMASI</p>
          </div>
          <ul>
            {ROWS.map((row, i) => (
              <li
                key={row.before.label}
                className={`grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 md:px-8 md:py-5 ${
                  i < ROWS.length - 1 ? 'border-b border-ink/[0.05]' : ''
                }`}
              >
                <span className="flex items-center gap-3 text-sm md:text-base text-ink/55">
                  <span className="hidden sm:grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink/[0.04] text-ink/40">
                    <row.before.icon size={15} />
                  </span>
                  <X size={14} className="sm:hidden shrink-0 text-mist" />
                  <span className="line-through decoration-ink/20">{row.before.label}</span>
                </span>
                <span className="mx-2 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-navy to-primary text-white md:mx-4">
                  <ArrowRight size={14} />
                </span>
                <span className="flex items-center gap-3 text-sm md:text-base font-semibold text-ink">
                  <span className="hidden sm:grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <row.after.icon size={15} />
                  </span>
                  <Check size={14} className="sm:hidden shrink-0 text-primary" />
                  {row.after.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
