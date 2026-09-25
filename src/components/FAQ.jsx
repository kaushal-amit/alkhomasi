import { Plus, MessageCircle } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { useContactModal } from './ContactModalContext.jsx'

const FAQS = [
  {
    q: 'Do we need to replace our existing software?',
    a: 'No. In most cases we integrate with the systems you already use — ERP, CRM, databases and cloud tools — and add AI and automation on top. We only recommend replacing something when it genuinely holds your business back.',
  },
  {
    q: 'Where do we start if we are new to AI?',
    a: 'We begin by understanding your workflows and identifying a small number of high-impact opportunities. Starting focused lets you see value early, then scale what works.',
  },
  {
    q: 'Are your solutions off-the-shelf or custom?',
    a: "Custom. Every solution is designed around your organization's processes, roles and terminology, so it fits the way your team already works.",
  },
  {
    q: 'Will AI make decisions without our team?',
    a: 'Only where you want it to. We design workflows with clear human checkpoints — AI handles the repetitive work and flags exceptions, while your people stay in control of important decisions.',
  },
  {
    q: 'What happens after the solution goes live?',
    a: 'We continue to support, refine and extend the solution as your requirements evolve — adding automations, integrations and insights as your business grows.',
  },
]

export default function FAQ() {
  const { open } = useContactModal()
  return (
    <section id="faq" className="section-pad py-24 md:py-32 bg-page-wash">
      <div className="section-max grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we often hear."
            description="Straight answers about how we work. Don't see your question? Ask us directly."
          />
          <Reveal delay={120}>
            <button type="button" onClick={open} className="btn-secondary mt-8">
              <MessageCircle size={16} /> Ask a question
            </button>
          </Reveal>
        </div>

        <Reveal delay={100} className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-2xl border border-ink/[0.07] bg-white px-6 shadow-[0_1px_2px_rgba(6,43,99,0.04)] open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-haze text-primary transition-transform duration-300 group-open:rotate-45 group-open:bg-navy group-open:text-white">
                  <Plus size={16} />
                </span>
              </summary>
              <p className="-mt-1 pb-5 pr-10 text-[15px] leading-relaxed text-mist">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
