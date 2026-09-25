const CAPABILITIES = [
  'AI Solutions',
  'Workflow Automation',
  'Business Software',
  'AI Agents',
  'Data & BI',
  'System Integration',
]

export default function CapabilityStrip() {
  const items = [...CAPABILITIES, ...CAPABILITIES]
  return (
    <div className="border-y border-ink/[0.06] bg-navy py-4 overflow-hidden">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-sm font-medium tracking-wide text-white/70">{item}</span>
            <span className="h-1 w-1 rounded-full bg-bright/60" />
          </div>
        ))}
      </div>
    </div>
  )
}
