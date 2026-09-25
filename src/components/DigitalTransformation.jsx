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
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const BEFORE = [
  { icon: FileSpreadsheet, label: 'Spreadsheets' },
  { icon: Mail, label: 'Emails' },
  { icon: ClipboardCheck, label: 'Manual approvals' },
  { icon: Unplug, label: 'Disconnected systems' },
  { icon: RotateCcw, label: 'Repetitive work' },
]

const AFTER = [
  { icon: Sparkles, label: 'AI' },
  { icon: Workflow, label: 'Automation' },
  { icon: Network, label: 'Connected systems' },
  { icon: LayoutDashboard, label: 'Dashboards' },
  { icon: BrainCircuit, label: 'Intelligent workflows' },
]

export default function DigitalTransformation() {
  return (
    <section className="section-pad py-24 md:py-32">
      <div className="section-max">
        <SectionHeading
          align="center"
          eyebrow="Digital Transformation"
          title="Modernize the way your business works."
          description="From manual processes to intelligent workflows."
        />

        <Reveal
          delay={120}
          className="mt-14 grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-center"
        >
          <div className="card-surface p-7 opacity-90">
            <p className="text-xs font-semibold tracking-[0.1em] text-mist">BEFORE</p>
            <ul className="mt-4 space-y-3.5">
              {BEFORE.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-[15px] text-ink/70">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink/[0.05] text-ink/50">
                    <item.icon size={14} />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-navy to-primary text-white rotate-90 md:rotate-0">
            <ArrowRight size={18} />
          </div>

          <div className="card-surface p-7 border-primary/20 shadow-card">
            <p className="text-xs font-semibold tracking-[0.1em] text-primary">AFTER</p>
            <ul className="mt-4 space-y-3.5">
              {AFTER.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/[0.1] text-primary">
                    <item.icon size={14} />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
