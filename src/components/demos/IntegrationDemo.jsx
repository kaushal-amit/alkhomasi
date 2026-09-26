import { Building2, Users, Code2, Cloud, Database, LayoutDashboard } from 'lucide-react'
import { LogoMark } from '../Logo.jsx'

const NODES = [
  { label: 'ERP', icon: Building2, x: 50, y: 11 },
  { label: 'CRM', icon: Users, x: 84, y: 30 },
  { label: 'APIs', icon: Code2, x: 84, y: 70 },
  { label: 'Business Software', icon: LayoutDashboard, x: 50, y: 89 },
  { label: 'Database', icon: Database, x: 16, y: 70 },
  { label: 'Cloud', icon: Cloud, x: 16, y: 30 },
]

export default function IntegrationDemo() {
  return (
    <div className="card-dark px-4 py-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" />
      <div
        className="relative mx-auto aspect-square w-full max-w-[26rem]"
        role="img"
        aria-label="Diagram: ERP, CRM, APIs, business software, databases and cloud services all connected through the AL-KHOMASI intelligence layer"
      >
        <div className="absolute inset-[18%] rounded-full border border-white/10" />
        <div className="absolute inset-[4%] rounded-full border border-dashed border-white/10" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-sky/50" aria-hidden="true">
          {NODES.map((n) => (
            <line key={n.label} x1="50" y1="50" x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="0.5" className="dash-line" />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-white/20 bg-navy p-3.5 text-center shadow-glow md:w-36 md:p-4">
          <span className="grid h-11 w-14 place-items-center rounded-xl bg-white shadow-soft">
            <LogoMark size={20} />
          </span>
          <span className="text-2xs font-semibold leading-tight text-white">AL-KHOMASI Intelligence Layer</span>
        </div>

        {NODES.map((n) => (
          <div
            key={n.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-navy text-sky shadow-soft md:h-11 md:w-11">
              <n.icon size={17} />
            </span>
            <span className="max-w-[5.5rem] text-center text-2xs font-medium leading-tight text-white/80">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
