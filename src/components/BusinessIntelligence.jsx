import { TrendingUp, TrendingDown, Gauge, Check } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const KPIS = [
  { label: 'Process Efficiency', value: '82%', trend: 'up' },
  { label: 'Cycle Time', value: '3.4d', trend: 'down' },
  { label: 'Data Accuracy', value: '96%', trend: 'up' },
]

const BARS = [38, 55, 44, 68, 60, 78, 71]
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const TREND_POINTS = '0,42 20,36 40,38 60,24 80,26 100,12'

const POINTS = [
  'Live dashboards that pull from every system you use',
  'Scheduled reports delivered automatically to the right people',
  'Early warnings when a metric moves outside its normal range',
]

export default function BusinessIntelligence() {
  return (
    <section id="insights" className="section-pad section-y-sm bg-page-wash">
      <div className="section-max grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <Reveal className="order-2 lg:order-1 card-dark p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
          <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Gauge size={16} className="text-sky" /> Operational Insight
            </div>
            <span className="text-2xs font-medium text-white/60">Demo visualization</span>
          </div>

          <div className="relative mt-5 grid grid-cols-3 gap-3">
            {KPIS.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="font-display text-2xl font-semibold text-white">{kpi.value}</p>
                <p className="mt-1 text-2xs leading-tight text-white/55">{kpi.label}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-2xs font-medium text-sky">
                  {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.trend === 'up' ? 'Improving' : 'Reducing'}
                </span>
              </div>
            ))}
          </div>

          <div className="relative mt-6 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <div className="flex h-32 items-end gap-2.5">
                {BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-sky"
                    style={{ height: `${h}%`, opacity: 0.55 + i * 0.065 }}
                  />
                ))}
              </div>
              <div className="mt-2 flex gap-2.5">
                {DAYS.map((d, i) => (
                  <span key={i} className="flex-1 text-center text-2xs text-white/60">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
              <p className="text-2xs font-semibold tracking-[0.1em] text-white/60">THROUGHPUT</p>
              <svg viewBox="0 0 100 50" className="mt-1 h-16 w-28 text-sky">
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
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Data & Business Intelligence"
            title="Turn business data into actionable insights."
            description="Most organizations already have the data they need — it's just scattered across spreadsheets and systems. We bring it together so leaders can see performance clearly and act early."
          />
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3.5">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
