import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react'
import Logo from './Logo.jsx'
import { COMPANY } from '../data/site.js'
import { SERVICES, servicePath } from '../data/services.js'
import { useHomeHref } from '../lib/page.jsx'
import content from '../data/content.js'

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const SOCIAL = [
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'x', label: 'X', icon: XIcon },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
].filter((s) => content.social[s.key])

const COMPANY_LINKS = [
  { label: 'See it in action', href: '#demos' },
  ...(content.projects.length ? [{ label: 'Projects', href: '#projects' }] : []),
  ...(content.industries.length ? [{ label: 'Industries', href: '#industries' }] : []),
  { label: 'About us', href: '#why' },
  ...(content.testimonials.length ? [{ label: 'Client reviews', href: '#testimonials' }] : []),
  { label: 'How we work', href: '#how-we-work' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: content.legal.privacyUrl },
  { label: 'Terms of Use', href: content.legal.termsUrl },
].filter((l) => l.href)

export default function Footer() {
  const home = useHomeHref()
  return (
    <footer className="relative overflow-hidden bg-navy-ink section-pad pt-20 pb-24 text-white/70">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="bg-spectrum absolute inset-x-0 top-0 h-[3px] opacity-80" aria-hidden="true" />

      <div className="section-max relative grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light size={40} />
          <p className="mt-4 font-display text-sm font-semibold tracking-wide text-white">{COMPANY.displayName}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">
            {COMPANY.tagline}. We build intelligent business solutions that automate workflows, connect
            systems and help organizations make faster, smarter decisions.
          </p>
          <a href="#contact" className="btn-ghost-light btn-sm mt-6">
            Start a project <ArrowUpRight size={15} />
          </a>
          {SOCIAL.length > 0 && (
            <ul className="mt-8 flex gap-2" aria-label="Social media">
              {SOCIAL.map((s) => (
                <li key={s.key}>
                  <a
                    href={content.social[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AL-KHOMASI on ${s.label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-sky/60 hover:text-sky"
                  >
                    <s.icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Solutions">
          <p className="text-xs font-semibold tracking-[0.14em] text-white/60">SOLUTIONS</p>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.key}>
                <a href={servicePath(s)} className="text-sm transition-colors hover:text-white">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-xs font-semibold tracking-[0.14em] text-white/60">COMPANY</p>
          <ul className="mt-5 space-y-3">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href === '#contact' ? l.href : home(l.href)} className="text-sm transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

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

      <div className="section-max relative mt-16 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 text-xs text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {COMPANY.displayName} All rights reserved.
          </p>
          {COMPANY.cin && <p>CIN: {COMPANY.cin}</p>}
          {LEGAL.map((l) => (
            <a key={l.label} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <p className="font-display text-xs font-semibold tracking-[0.14em] text-sky/80">{COMPANY.motto.toUpperCase()}</p>
      </div>
    </footer>
  )
}
