import content from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

// Industries served. Renders nothing until real entries are added in
// src/data/content.js.
export default function Industries() {
  const { industries } = content
  if (!industries.length) return null

  return (
    <section id="industries" className="section-pad section-y-sm">
      <div className="section-max">
        <SectionHeading
          eyebrow="Industries"
          title="Built for the way your industry works."
          description="Every sector has its own processes, rules and systems. We design around them."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal
              as="li"
              key={ind.name}
              delay={i * 60}
              className="group flex gap-4 rounded-2xl border border-ink/[0.07] bg-white p-5 transition-colors duration-200 hover:border-primary/25"
            >
              <span className="font-display text-sm font-semibold text-primary">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="block text-lg font-semibold text-ink">{ind.name}</span>
                {ind.desc && <span className="mt-1 block text-sm leading-relaxed text-mist">{ind.desc}</span>}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
