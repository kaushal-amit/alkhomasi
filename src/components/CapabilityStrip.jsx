import { Sparkles, Bot, Workflow, LayoutDashboard, BarChart3, Network, Rocket } from 'lucide-react'

const CAPABILITIES = [
  { icon: Sparkles, label: 'AI Solutions' },
  { icon: Bot, label: 'AI Agents' },
  { icon: Workflow, label: 'Workflow Automation' },
  { icon: LayoutDashboard, label: 'Business Software' },
  { icon: BarChart3, label: 'Data & Business Intelligence' },
  { icon: Network, label: 'System Integration' },
  { icon: Rocket, label: 'Digital Transformation' },
]

export default function CapabilityStrip() {
  const items = [...CAPABILITIES, ...CAPABILITIES]
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-navy-deep py-5" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-deep to-transparent" />
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="flex items-center gap-3 font-display text-base font-medium tracking-wide text-white/75">
              <item.icon size={16} className="text-sky" />
              {item.label}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-bright/50" />
          </div>
        ))}
      </div>
    </div>
  )
}
