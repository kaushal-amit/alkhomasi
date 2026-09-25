import { Building2, Sparkles, Workflow, Network, Puzzle, Layers } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const POINTS = [
  { icon: Building2, title: 'Business-Centric Technology' },
  { icon: Sparkles, title: 'AI-First Approach' },
  { icon: Workflow, title: 'Workflow Automation' },
  { icon: Network, title: 'Connected Systems' },
  { icon: Puzzle, title: 'Custom Solutions' },
  { icon: Layers, title: 'Scalable Architecture' },
]

export default function WhyAlKhomasi() {
  return (
    <section className="section-pad py-24 md:py-32 bg-haze/50">
      <div className="section-max">
        <SectionHeading eyebrow="Why Al-Khomasi" title="Technology that adapts to your business." />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
          {POINTS.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 60}
              className="flex items-center gap-4 border-l-2 border-primary/20 pl-5 py-1"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-primary shadow-soft">
                <point.icon size={17} />
              </span>
              <span className="text-[15px] font-medium text-ink">{point.title}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
