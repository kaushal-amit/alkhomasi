import { Building2, Users, Code2, Cloud, Database, LayoutDashboard, BrainCircuit } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const NODES = [
  { label: 'ERP', icon: Building2, x: 50, y: 10 },
  { label: 'CRM', icon: Users, x: 84, y: 30 },
  { label: 'APIs', icon: Code2, x: 84, y: 70 },
  { label: 'Business Software', icon: LayoutDashboard, x: 50, y: 90 },
  { label: 'Database', icon: Database, x: 16, y: 70 },
  { label: 'Cloud', icon: Cloud, x: 16, y: 30 },
]

export default function SystemIntegration() {
  return (
    <section className="section-pad py-24 md:py-32 bg-navy relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="section-max relative grid lg:grid-cols-2 gap-14 items-center">
        <SectionHeading
          light
          eyebrow="System Integration"
          title="Connect the systems you already use."
          description="Connect ERP, CRM, APIs, cloud and existing business systems."
        />

        <Reveal delay={140} className="relative mx-auto aspect-square w-full max-w-md">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-bright/40">
            {NODES.map((n) => (
              <line
                key={n.label}
                x1="50"
                y1="50"
                x2={n.x}
                y2={n.y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="dash-line"
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex w-32 flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-bright to-primary text-white">
              <BrainCircuit size={18} />
            </span>
            <span className="text-[11px] font-semibold leading-tight text-white">
              AL-KHOMASI Intelligence Layer
            </span>
          </div>

          {NODES.map((n) => (
            <div
              key={n.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-navy-deep/80 text-bright shadow-soft">
                <n.icon size={16} />
              </span>
              <span className="text-[11px] font-medium text-white/80 whitespace-nowrap">{n.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
