import { Building2, Users, Code2, Cloud, Database, LayoutDashboard, BrainCircuit, Check } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const NODES = [
  { label: 'ERP', icon: Building2, x: 50, y: 10 },
  { label: 'CRM', icon: Users, x: 85, y: 30 },
  { label: 'APIs', icon: Code2, x: 85, y: 70 },
  { label: 'Business Software', icon: LayoutDashboard, x: 50, y: 90 },
  { label: 'Database', icon: Database, x: 15, y: 70 },
  { label: 'Cloud', icon: Cloud, x: 15, y: 30 },
]

const POINTS = [
  'Data entered once, updated everywhere',
  'Secure, well-documented APIs between systems',
  'Keep the tools your team already knows',
]

export default function SystemIntegration() {
  return (
    <section id="integration" className="section-pad section-y bg-navy-deep relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="absolute top-0 right-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/25 blur-[130px]" />
      </div>

      <div className="section-max relative grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHeading
            light
            eyebrow="System Integration"
            title="Connect the systems you already use."
            description="Disconnected tools create duplicate work and conflicting numbers. We link your ERP, CRM, databases, cloud services and APIs through a single intelligence layer, so information flows automatically."
          />
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3.5">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base text-white/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky text-navy-deep">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-[18%] rounded-full border border-white/10" />
          <div className="absolute inset-[4%] rounded-full border border-dashed border-white/10" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-sky/50">
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

          <div className="absolute left-1/2 top-1/2 flex w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-center shadow-glow backdrop-blur-md">
            <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-bright to-primary text-white">
              <span className="absolute inset-0 rounded-xl bg-bright/40 animate-ring" />
              <BrainCircuit size={19} className="relative" />
            </span>
            <span className="text-2xs font-semibold leading-tight text-white">
              AL-KHOMASI Intelligence Layer
            </span>
          </div>

          {NODES.map((n) => (
            <div
              key={n.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-navy text-sky shadow-soft">
                <n.icon size={17} />
              </span>
              <span className="text-2xs font-medium text-white/80 whitespace-nowrap">{n.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
