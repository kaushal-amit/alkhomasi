import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import Reveal from './Reveal.jsx'
import ContactForm from './ContactForm.jsx'
import { COMPANY } from '../data/site.js'

const NEXT_STEPS = [
  { title: 'We review your requirement', desc: 'Our team studies your process and goals.' },
  { title: 'Discovery conversation', desc: 'A focused call to understand the details.' },
  { title: 'Recommended approach', desc: 'A clear proposal with scope and next steps.' },
]

export function ContactDetails({ compact = false }) {
  const items = [
    { icon: Mail, label: 'Send us an email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: Phone, label: 'Call us', value: COMPANY.phoneDisplay, href: COMPANY.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with our team', href: COMPANY.whatsappHref, external: true },
  ]
  return (
    <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'sm:grid-cols-3 lg:grid-cols-1'}`}>
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-colors hover:border-sky/40 hover:bg-white/[0.08]"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sky">
            <it.icon size={17} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[11.5px] text-white/50">{it.label}</span>
            <span className="mt-1 block truncate text-[14px] font-semibold text-white group-hover:text-sky">{it.value}</span>
          </span>
        </a>
      ))}
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section-pad pb-24 md:pb-32 pt-4">
      <Reveal className="section-max overflow-hidden rounded-[2rem] bg-navy-deep shadow-lift">
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          {/* Info panel */}
          <div className="relative p-7 md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40" />
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <p className="eyebrow text-sky">
                <span className="h-px w-6 bg-sky/60" /> Contact
              </p>
              <h2 className="mt-4 text-[2rem] md:text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-white">
                Let's talk about your business.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/65">
                Share what you're trying to solve. We'll come back with practical
                ideas — no jargon, no obligation.
              </p>

              <p className="mt-10 text-[11.5px] font-semibold tracking-[0.14em] text-white/45">WHAT HAPPENS NEXT</p>
              <ol className="mt-4 space-y-4">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-sky/40 font-display text-[12px] font-semibold text-sky">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-white">{s.title}</span>
                      <span className="mt-0.5 block text-[13.5px] text-white/55">{s.desc}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-10">
                <ContactDetails />
              </div>

              <div className="mt-6 flex items-start gap-3 text-[13.5px] leading-relaxed text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-sky" />
                <address className="not-italic">
                  {COMPANY.addressLines[0]}
                  <br />
                  {COMPANY.addressLines[1]}
                </address>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-white p-7 md:p-12 lg:m-3 lg:rounded-[1.6rem]">
            <h3 className="text-[1.6rem] md:text-[2rem] font-semibold leading-tight tracking-tight text-ink">
              Share your vision &amp; <span className="gradient-text">get expert guidance.</span>
            </h3>
            <p className="mt-2 text-[15px] text-mist">
              Tell us a little about your requirement and our team will reach out.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
