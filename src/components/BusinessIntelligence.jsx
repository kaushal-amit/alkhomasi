import { TrendingUp, TrendingDown, Gauge } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const KPIS = [
  { label: 'Process Efficiency', value: '82%', trend: 'up' },
  { label: 'Cycle Time', value: '3.4d', trend: 'down' },
  { label: 'Data Accuracy', value: '96%', trend: 'up' },
]

const BARS = [38, 55, 44, 68, 60, 78, 71]
const TREND_POINTS = '0,42 20,36 40,38 60,24 80,26 100,12'

export default function BusinessIntelligence() {
  return (
    <section className="section-pad py-24 md:py-32">
      <div className="section-max grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="order-2 lg:order-1 card-surface p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Gauge size={16} className="text-primary" /> Operational Insight
            </div>
            <span className="text-[11px] font-medium text-mist">Demo visualization</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            {KPIS.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-ink/[0.06] p-4">
                <p className="text-xl font-semibold text-ink">{kpi.value}</p>
                <p className="mt-1 text-[11.5px] leading-tight text-mist">{kpi.label}</p>
                <span
                  className={`mt-2 inline-flex items-center gap-1 text-[11px] font-medium ${
                    kpi.trend === 'up' ? 'text-emerald-600' : 'text-primary'
                  }`}
                >
                  {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.trend === 'up' ? 'Improving' : 'Reducing'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
            <div className="flex items-end gap-2.5 h-28">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-bright transition-all duration-700"
                  style={{ height: `${h}%`, transitionDelay: `${i * 60}ms` }}
                />
              ))}
            </div>
            <svg viewBox="0 0 100 50" className="w-28 h-16 text-bright">
              <polyline
                points={TREND_POINTS}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Data & Business Intelligence"
            title="Turn business data into actionable insights."
            description="Turn business data into actionable insights."
          />
        </div>
      </div>
    </section>
  )
}
