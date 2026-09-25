import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import Logo from './Logo.jsx'
import { COMPANY } from '../data/site.js'

const COLUMNS = [
  {
    title: 'Solutions',
    links: [
      { label: 'AI Solutions', href: '#svc-ai' },
      { label: 'AI Agents', href: '#ai-agents' },
      { label: 'Workflow Automation', href: '#automation' },
      { label: 'Business Software', href: '#business-software' },
      { label: 'Data & BI', href: '#insights' },
      { label: 'System Integration', href: '#integration' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why AL-KHOMASI', href: '#why' },
      { label: 'How We Work', href: '#how-we-work' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-ink section-pad pt-20 pb-24 md:pb-10 text-white/65">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <div className="section-max relative grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            {COMPANY.tagline}. We build intelligent business solutions that automate
            workflows, connect systems and help organizations make faster, smarter decisions.
          </p>
          <a
            href="#contact"
            className="btn-ghost-light btn-sm mt-6"
          >
            Start a project <ArrowUpRight size={15} />
          </a>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-xs font-semibold tracking-[0.14em] text-white/60">{col.title.toUpperCase()}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-white/60">GET IN TOUCH</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={COMPANY.phoneHref} className="flex items-center gap-3 hover:text-white">
                <Phone size={16} className="text-sky" /> {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 hover:text-white">
                <Mail size={16} className="text-sky" /> {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-3 leading-relaxed">
              <MapPin size={16} className="mt-1 shrink-0 text-sky" />
              <address className="not-italic">
                {COMPANY.addressLines[0]} {COMPANY.addressLines[1]}
              </address>
            </li>
          </ul>
        </div>
      </div>

      <div className="section-max relative mt-16 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/60" suppressHydrationWarning>
          © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
        </p>
        <p className="font-display text-xs font-semibold tracking-[0.14em] text-sky/80">
          {COMPANY.motto.toUpperCase()}
        </p>
      </div>
    </footer>
  )
}
