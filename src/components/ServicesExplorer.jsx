import { useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, MessageSquare } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { SERVICES, demoHref } from '../data/services.js'
import { useHashTarget, tabKeyHandler } from '../lib/hashTarget.js'
import { useContactModal } from './ContactModalContext.jsx'

const KEYS = SERVICES.map((s) => s.key)

export default function ServicesExplorer() {
  const [active, setActive] = useState(KEYS[0])
  const tabRefs = useRef([])
  const service = SERVICES.find((s) => s.key === active)
  const index = KEYS.indexOf(active)
  const { open } = useContactModal()

  // "#service-<key>" links (header menu, footer) open the matching tab
  useHashTarget('service', KEYS, 'solutions', setActive)

  const onKeyDown = tabKeyHandler(KEYS, active, setActive, tabRefs)

  return (
    <section id="solutions" className="relative bg-page-wash section-pad section-y-lg">
      <div className="section-max">
        <SectionHeading
          eyebrow="What We Build"
          title="Six capabilities. One intelligent business."
          description="From manual processes to intelligent workflows — we build solutions that automate work, connect systems and help organizations make faster, smarter decisions."
        />

        <Reveal delay={100} className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
          {/* Tabs — horizontal chips on small screens, dark rail on desktop */}
          <div className="min-w-0 lg:relative lg:overflow-hidden lg:rounded-3xl lg:bg-navy-deep lg:p-3 lg:shadow-lift">
            <div className="pointer-events-none absolute inset-0 hidden bg-dots-dark opacity-40 lg:block" />
            <div
              role="tablist"
              aria-label="Solutions"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="no-scrollbar relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-10 md:px-10 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:p-0"
            >
              {SERVICES.map((s, i) => {
                const on = active === s.key
                return (
                  <button
                    key={s.key}
                    ref={(el) => (tabRefs.current[i] = el)}
                    id={`service-tab-${s.key}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="service-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(s.key)}
                    className={`group relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-200 lg:items-start lg:gap-4 lg:rounded-2xl lg:px-5 lg:py-4 ${
                      on
                        ? 'bg-navy text-white lg:bg-white/[0.08]'
                        : 'bg-white text-ink/70 ring-1 ring-ink/[0.07] hover:text-primary lg:bg-transparent lg:ring-0 lg:hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-4 bottom-4 hidden w-[3px] rounded-full bg-gradient-to-b from-sky to-bright transition-opacity lg:block ${
                        on ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <s.icon size={15} className="lg:hidden" />
                    <span className={`hidden font-display text-xs font-semibold lg:mt-1 lg:block ${on ? 'text-sky' : 'text-white/60'}`}>
                      0{i + 1}
                    </span>
                    <span className="lg:flex-1">
                      <span
                        className={`block whitespace-nowrap lg:whitespace-normal lg:font-display lg:text-lg lg:leading-snug ${
                          on ? 'lg:text-sky' : 'lg:text-white/75 lg:group-hover:text-white'
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className={`mt-1 hidden text-sm font-normal lg:block ${on ? 'text-white' : 'text-white/60'}`}>
                        {s.tagline}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className={`mt-1 hidden transition-opacity lg:block ${on ? 'text-sky opacity-100' : 'text-white opacity-0 group-hover:opacity-60'}`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active panel */}
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
            className="card-surface relative min-w-0 overflow-hidden p-6 md:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-bright/10 to-transparent blur-2xl" />
            <div key={active} className="relative animate-popIn">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-navy to-primary text-white shadow-soft">
                  <service.icon size={19} />
                </span>
                <span className="eyebrow text-primary">
                  0{index + 1} · {service.name}
                </span>
              </div>
              <h3 className="mt-6 max-w-2xl text-h3 font-semibold text-ink">{service.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist md:text-lg">{service.desc}</p>

              <p className="mt-8 font-display text-lg font-semibold text-ink">Core capabilities</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {service.capabilities.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white px-4 py-3.5 transition-colors duration-200 hover:border-primary/25 hover:bg-haze/40"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-haze text-navy">
                      <c.icon size={19} strokeWidth={1.8} />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-ink">{c.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href={demoHref(service.demo)} className="link-arrow">
                  See it in action
                  <span className="chip">
                    <ArrowRight size={14} />
                  </span>
                </a>
                <button type="button" onClick={open} className="link-arrow">
                  Discuss your {service.shortName ?? service.name} project
                  <span className="chip">
                    <MessageSquare size={14} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
