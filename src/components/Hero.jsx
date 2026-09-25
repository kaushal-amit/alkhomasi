import { Database, Sparkles, Bot, Workflow, Network, BarChart3, ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FLOW = [
  { icon: Database, label: 'Business Data' },
  { icon: Sparkles, label: 'AI' },
  { icon: Bot, label: 'AI Agents' },
  { icon: Workflow, label: 'Automation' },
  { icon: Network, label: 'Connected Systems' },
  { icon: BarChart3, label: 'Business Insights' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-haze/70 via-white to-white" />
        <div className="absolute -top-24 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-bright/20 blur-[120px] animate-drift" />
        <div className="absolute top-1/3 left-[-15%] h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-[110px] animate-drift" />
      </div>

      <div className="section-max section-pad grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-primary">
            AI SOLUTIONS &amp; DIGITAL TRANSFORMATION
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.08] sm:text-5xl md:text-[3.4rem] font-semibold tracking-tight text-ink">
              <span className="gradient-text">AI-powered business solutions</span>
              <br />
              built around the way your business works.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              We design and build AI-powered corporate solutions that automate
              operations, connect systems, improve productivity and give
              management better visibility and control.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary">
              Discuss Your Requirement <ArrowRight size={16} />
            </a>
            <a href="#solutions" className="btn-secondary">
              Explore Solutions
            </a>
          </Reveal>
        </div>

        {/* Live workflow visualization */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-sm">
          <div className="card-surface relative overflow-hidden p-6">
            <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
              <span className="text-xs font-semibold tracking-[0.1em] text-mist">
                INTELLIGENT WORKFLOW
              </span>
              <span className="flex h-2 w-2 rounded-full bg-bright animate-pulseSoft" />
            </div>

            <ol className="relative mt-5 flex flex-col">
              {FLOW.map((step, i) => (
                <li key={step.label} className="relative flex items-center gap-4 py-3">
                  {i < FLOW.length - 1 && (
                    <span className="absolute left-[19px] top-[38px] h-[calc(100%-14px)] w-px bg-gradient-to-b from-primary/40 to-bright/10" />
                  )}
                  <span
                    className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy to-primary text-white shadow-soft"
                    style={{ animationDelay: `${i * 220}ms` }}
                  >
                    <step.icon size={17} />
                  </span>
                  <span className="text-[15px] font-medium text-ink">{step.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-2 rounded-2xl border border-ink/[0.06] bg-white px-4 py-3 shadow-card">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-bright/20 text-bright">
              <Sparkles size={15} />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">Always learning</p>
              <p className="text-[11px] text-mist">from every workflow run</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
