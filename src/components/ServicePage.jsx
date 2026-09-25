import { ArrowRight, Check, ChevronRight, MessageSquare } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import HowWeWork from './HowWeWork.jsx'
import FAQ from './FAQ.jsx'
import Contact from './Contact.jsx'
import { DEMOS } from './SeeItInAction.jsx'
import { SERVICES, servicePath } from '../data/services.js'
import { useContactModal } from './ContactModalContext.jsx'

// A dedicated, prerendered page for one service (/services/<slug>/).
export default function ServicePage({ service }) {
  const { open } = useContactModal()
  const demo = DEMOS.find((d) => d.key === service.demo)
  const others = SERVICES.filter((s) => s.key !== service.key)

  return (
    <>
      {/* Hero */}
      <section id="overview" className="relative overflow-hidden section-pad pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-haze via-white to-white" />
        <div className="glow absolute -top-40 right-[-15%] -z-10 h-[40rem] w-[40rem]" style={{ '--glow': 'rgba(22,139,224,0.2)' }} />

        <div className="section-max">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-mist">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li>
                <a href="/#solutions" className="hover:text-primary">
                  Solutions
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li aria-current="page" className="text-ink">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <span className="eyebrow text-primary">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-navy to-primary text-white">
                  <service.icon size={15} />
                </span>
                {service.name}
              </span>
              <h1 className="mt-6 text-display font-semibold text-ink">{service.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{service.desc}</p>
              <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
                <button type="button" onClick={open} className="btn-primary btn-lg">
                  Discuss your project <ArrowRight size={16} />
                </button>
                {demo && (
                  <a href="#demo" className="btn-secondary btn-lg">
                    See it in action
                  </a>
                )}
              </div>
            </div>

            <Reveal delay={120} className="card-dark p-7 md:p-9">
              <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
              <p className="relative text-2xs font-semibold tracking-[0.16em] text-white/60">CORE CAPABILITIES</p>
              <ul className="relative mt-5 space-y-3">
                {service.capabilities.map((c) => (
                  <li key={c.label} className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-sky">
                      <c.icon size={17} />
                    </span>
                    <span className="text-sm font-semibold text-white">{c.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Demo */}
      {demo && (
        <section id="demo" className="section-pad section-y bg-page-wash">
          <div className="section-max grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <Reveal>
              <span className="eyebrow text-primary">
                <span className="h-px w-6 bg-primary/50" /> See it in action
              </span>
              <h2 className="mt-4 text-h2 font-semibold text-ink">{demo.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">{demo.desc}</p>
              <ul className="mt-6 space-y-3">
                {demo.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-base text-ink/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-mist">Illustrative example using sample data — not a live client system.</p>
            </Reveal>
            <Reveal delay={100} className="min-w-0">
              <demo.Demo />
            </Reveal>
          </div>
        </section>
      )}

      <HowWeWork />

      {/* Other services */}
      <section id="other-solutions" className="section-pad section-y-sm bg-page-wash">
        <div className="section-max">
          <SectionHeading eyebrow="More Solutions" title="Explore our other capabilities." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <Reveal as="li" key={s.key} delay={i * 60}>
                <a
                  href={servicePath(s)}
                  className="spotlight group flex h-full items-start gap-4 rounded-2xl border border-ink/[0.07] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-haze text-navy transition-colors group-hover:bg-navy group-hover:text-sky">
                    <s.icon size={19} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-base font-semibold text-ink group-hover:text-primary">{s.name}</span>
                    <span className="mt-1 block text-sm text-mist">{s.tagline}</span>
                  </span>
                  <ArrowRight size={16} className="mt-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <button type="button" onClick={open} className="link-arrow">
              Not sure which fits? Talk to us
              <span className="chip">
                <MessageSquare size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      <FAQ />
      <Contact />
    </>
  )
}
