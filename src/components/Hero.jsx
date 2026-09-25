import { useEffect, useState } from 'react'
import {
  Database,
  Sparkles,
  Bot,
  Workflow,
  Network,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Puzzle,
  ShieldCheck,
} from 'lucide-react'
import Reveal from './Reveal.jsx'
import { useContactModal } from './ContactModalContext.jsx'

const FLOW = [
  { icon: Database, label: 'Business Data', note: 'Emails, forms, spreadsheets, ERP' },
  { icon: Sparkles, label: 'AI Understanding', note: 'Reads, classifies, extracts' },
  { icon: Bot, label: 'AI Agents', note: 'Decide the next best step' },
  { icon: Workflow, label: 'Automation', note: 'Routes approvals & actions' },
  { icon: Network, label: 'Connected Systems', note: 'Updates every system of record' },
  { icon: BarChart3, label: 'Business Insights', note: 'Live visibility for management' },
]

const TRUST = [
  { icon: Puzzle, label: 'Custom-built, never one-size-fits-all' },
  { icon: ShieldCheck, label: 'Integrates with the systems you already use' },
  { icon: MapPin, label: 'Engineered in Gwalior, India' },
]

export default function Hero() {
  const [step, setStep] = useState(0)
  const { open } = useContactModal()

  // Walk a highlight down the workflow so the visual reads as "live"
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % FLOW.length), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-haze via-white to-white" />
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,43,99,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,43,99,0.05) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
          }}
        />
        <div className="absolute -top-24 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-bright/20 blur-[120px] animate-drift" />
        <div className="absolute top-1/3 left-[-15%] h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-[110px] animate-drift" />
      </div>

      <div className="section-max section-pad grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-16 items-center">
        <div>
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 py-1.5 pl-1.5 pr-4 text-[12.5px] font-semibold text-ink shadow-soft backdrop-blur">
            <span className="shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-navy to-primary px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-white">
              AI-FIRST
            </span>
            <span className="hidden sm:inline">AI Solutions &amp; Digital Transformation Partner</span>
            <span className="sm:hidden">Digital Transformation Partner</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.5rem] leading-[1.06] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold tracking-[-0.02em] text-ink">
              Turn everyday business work into{' '}
              <span className="gradient-text">intelligent systems.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[17px] md:text-lg leading-relaxed text-mist">
              AL-KHOMASI designs and builds AI solutions, AI agents, workflow
              automation and custom business software that remove manual work,
              connect your systems and give leadership real-time visibility and
              control.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <button type="button" onClick={open} className="btn-primary !px-7 !py-4">
              Book a Free Consultation <ArrowRight size={16} />
            </button>
            <a href="#solutions" className="btn-secondary !px-7 !py-4">
              Explore Solutions
            </a>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 border-t border-ink/[0.07] pt-6">
              {TRUST.map((t) => (
                <li key={t.label} className="flex items-center gap-2 text-[13.5px] font-medium text-ink/70">
                  <t.icon size={15} className="text-primary shrink-0" />
                  {t.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Live workflow visualization */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-[26rem]">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-bright/5 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-deep p-6 shadow-lift">
            <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" />
            <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-bright/25 blur-3xl" />

            <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[11px] font-semibold tracking-[0.14em] text-white/55">
                INTELLIGENT WORKFLOW
              </span>
              <span className="flex items-center gap-2 text-[11px] font-semibold text-sky">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-sky animate-ring" />
                  <span className="relative h-2 w-2 rounded-full bg-sky" />
                </span>
                RUNNING
              </span>
            </div>

            <ol className="relative mt-4 flex flex-col">
              {FLOW.map((s, i) => {
                const done = i < step
                const current = i === step
                return (
                  <li key={s.label} className="relative flex items-center gap-4 py-2.5">
                    {i < FLOW.length - 1 && (
                      <span className="absolute left-[21px] top-[46px] h-[calc(100%-26px)] w-px bg-white/10">
                        <span
                          className="block w-px bg-gradient-to-b from-sky to-bright transition-all duration-700"
                          style={{ height: done ? '100%' : '0%' }}
                        />
                      </span>
                    )}
                    <span
                      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-all duration-500 ${
                        current
                          ? 'border-sky/60 bg-gradient-to-br from-primary to-bright text-white shadow-glow scale-105'
                          : done
                            ? 'border-white/10 bg-white/10 text-sky'
                            : 'border-white/10 bg-white/[0.04] text-white/40'
                      }`}
                    >
                      <s.icon size={18} />
                    </span>
                    <span className="flex-1 leading-tight">
                      <span className={`block text-[14.5px] font-semibold transition-colors ${current || done ? 'text-white' : 'text-white/50'}`}>
                        {s.label}
                      </span>
                      <span className="mt-0.5 block text-[12px] text-white/45">{s.note}</span>
                    </span>
                    {done && <CheckCircle2 size={15} className="text-sky/80" />}
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white px-4 py-3 shadow-card">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
              <Sparkles size={16} />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">Human in the loop</p>
              <p className="text-[11.5px] text-mist">AI assists — your team stays in control</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
