import { TrendingUp, TrendingDown, Gauge } from 'lucide-react'

const KPIS = [
  { label: 'Process Efficiency', value: '82%', trend: 'up' },
  { label: 'Cycle Time', value: '3.4d', trend: 'down' },
  { label: 'Data Accuracy', value: '96%', trend: 'up' },
]

const BARS = [38, 55, 44, 68, 60, 78, 71]
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const TREND_POINTS = '0,42 20,36 40,38 60,24 80,26 100,12'

export default function InsightsDemo() {
  return (
    <div className="card-dark p-5 md:p-7">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Gauge size={16} className="text-sky" /> Operational Insight
        </div>
        <span className="text-2xs font-medium text-white/60">Demo visualization · sample data</span>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-3">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 md:p-4">
            <p className="font-display text-xl font-semibold text-white md:text-2xl">{kpi.value}</p>
            <p className="mt-1 text-2xs leading-tight text-white/60">{kpi.label}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-2xs font-medium text-sky">
              {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {kpi.trend === 'up' ? 'Improving' : 'Reducing'}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-6 grid items-end gap-6 sm:grid-cols-[1fr_auto]">
        <div>
          <div className="flex h-32 items-end gap-2.5" aria-hidden="true">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-sky"
                style={{ height: `${h}%`, opacity: 0.55 + i * 0.065 }}
              />
            ))}
          </div>
          <div className="mt-2 flex gap-2.5" aria-hidden="true">
            {DAYS.map((d, i) => (
              <span key={i} className="flex-1 text-center text-2xs text-white/60">
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
          <p className="text-2xs font-semibold tracking-[0.1em] text-white/60">THROUGHPUT</p>
          <svg viewBox="0 0 100 50" className="mt-1 h-16 w-28 text-sky" aria-hidden="true">
            <polyline points={TREND_POINTS} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
