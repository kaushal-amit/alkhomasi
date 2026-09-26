import { Search, Target, PenTool, Hammer, Plug, TrendingUp } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const STEPS = [
  { icon: Search, title: 'Understand', desc: 'We learn how your business runs today — your workflows, teams, systems and goals.' },
  { icon: Target, title: 'Identify', desc: 'We pinpoint where AI, automation and integration will deliver the greatest impact.' },
  { icon: PenTool, title: 'Design', desc: "We design the solution around your organization's needs and agree on it with you." },
  { icon: Hammer, title: 'Build', desc: 'We develop the applications, AI systems and automations in clear, reviewable stages.' },
  { icon: Plug, title: 'Integrate', desc: 'We connect the solution to your existing systems, APIs and data sources.' },
  { icon: TrendingUp, title: 'Scale', desc: 'We support, refine and extend the solution as your requirements evolve.' },
]

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="section-pad section-y">
      <div className="section-max">
        <SectionHeading
          align="center"
          eyebrow="How We Work"
          title="A clear path from problem to intelligent system."
          description="A structured, transparent process — so you always know what's happening, what's next and why."
        />

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div className="absolute left-[8.33%] right-[8.33%] top-7 hidden h-px bg-gradient-to-r from-navy/30 via-primary/40 to-bright/30 lg:block" />

          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80} className="group relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-ink/[0.07] bg-white text-primary shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-navy group-hover:text-sky group-hover:shadow-lift">
                  <step.icon size={21} />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-bright font-display text-2xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink lg:mt-5">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
