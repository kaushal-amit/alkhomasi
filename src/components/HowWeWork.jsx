import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const STEPS = [
  { n: '01', title: 'Understand', desc: 'Understand your business, workflows and requirements.' },
  { n: '02', title: 'Identify', desc: 'Identify opportunities for AI, automation and integration.' },
  { n: '03', title: 'Design', desc: "Design technology around your organization's needs." },
  { n: '04', title: 'Build', desc: 'Build applications, AI systems and automation.' },
  { n: '05', title: 'Integrate', desc: 'Connect existing systems, APIs and data.' },
  { n: '06', title: 'Scale', desc: 'Expand and improve the solution as requirements evolve.' },
]

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="section-pad py-24 md:py-32">
      <div className="section-max">
        <SectionHeading
          eyebrow="How We Work"
          title="A clear path from problem to intelligent system."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-x-10 gap-y-12">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 70} className="relative pl-14 md:pl-0">
              <span className="absolute left-0 top-0 md:static md:mb-4 md:block text-3xl font-display font-semibold text-primary/25">
                {step.n}
              </span>
              <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute left-[15px] top-9 h-[calc(100%-4px)] w-px bg-ink/10 md:hidden" />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
