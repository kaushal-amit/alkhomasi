import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function FinalCTA() {
  return (
    <section className="section-pad py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-primary">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg className="h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <g stroke="white" strokeOpacity="0.12" strokeWidth="1">
            <line x1="60" y1="40" x2="220" y2="140" />
            <line x1="220" y1="140" x2="420" y2="60" />
            <line x1="420" y1="60" x2="640" y2="150" />
            <line x1="220" y1="140" x2="180" y2="300" />
            <line x1="420" y1="60" x2="520" y2="260" />
            <line x1="640" y1="150" x2="740" y2="320" />
            <line x1="180" y1="300" x2="520" y2="260" />
          </g>
          <g fill="white" fillOpacity="0.5">
            <circle cx="60" cy="40" r="3" />
            <circle cx="220" cy="140" r="3" />
            <circle cx="420" cy="60" r="3" />
            <circle cx="640" cy="150" r="3" />
            <circle cx="180" cy="300" r="3" />
            <circle cx="520" cy="260" r="3" />
            <circle cx="740" cy="320" r="3" />
          </g>
        </svg>
      </div>

      <div className="section-max relative flex flex-col items-center text-center gap-6">
        <Reveal as="h2" className="max-w-2xl text-3xl md:text-[2.75rem] font-semibold leading-[1.12] text-white">
          Ready to make your business smarter?
        </Reveal>
        <Reveal delay={100} as="p" className="max-w-xl text-lg text-white/70">
          Let's turn your business workflows into intelligent systems.
        </Reveal>
        <Reveal delay={200} className="mt-4 flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-primary !bg-white !text-navy hover:!bg-haze">
            Talk to Our Team <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            Discuss Your Requirement
          </a>
        </Reveal>
      </div>
    </section>
  )
}
