import { ArrowRight, Phone } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { COMPANY } from '../data/site.js'
import { useContactModal } from './ContactModalContext.jsx'

export default function FinalCTA() {
  const { open } = useContactModal()
  return (
    <section className="section-pad section-y-sm">
      <div className="section-max relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-deep via-navy to-primary px-6 py-16 md:px-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-sky/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-bright/20 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <Reveal as="p" className="eyebrow text-sky">
              <span className="h-px w-6 bg-sky/60" /> Let's build it together
            </Reveal>
            <Reveal as="h2" delay={60} className="mt-4 max-w-2xl text-h2 font-semibold text-white">
              Ready to make your business <span className="gradient-text-light">smarter?</span>
            </Reveal>
            <Reveal delay={120} as="p" className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Tell us about one process that slows your team down. We'll show you how
              AI, automation and integration can turn it into an intelligent system.
            </Reveal>
          </div>
          <Reveal delay={200} className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <button type="button" onClick={open} className="btn-secondary btn-lg">
              Book a Free Consultation <ArrowRight size={16} />
            </button>
            <a href={COMPANY.phoneHref} className="btn-ghost-light btn-lg">
              <Phone size={16} /> {COMPANY.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
