import { useEffect, useState } from 'react'
import { Menu, X, Mail, Phone, ArrowUpRight, Sparkles } from 'lucide-react'
import Logo from './Logo.jsx'
import { COMPANY } from '../data/site.js'
import { useContactModal } from './ContactModalContext.jsx'

const LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'AI Agents', href: '#ai-agents' },
  { label: 'Automation', href: '#automation' },
  { label: 'Integration', href: '#integration' },
  { label: 'Process', href: '#how-we-work' },
  { label: 'FAQ', href: '#faq' },
]

function TickerItems() {
  return (
    <>
      <span className="flex items-center gap-2 text-white/80">
        <Sparkles size={13} className="text-sky" />
        AI solutions, AI agents, workflow automation &amp; business software — built around the way you work.
        <a href="#contact" className="font-semibold text-white underline decoration-sky/60 underline-offset-4 hover:decoration-white">
          Connect now
        </a>
      </span>
      <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 font-semibold text-white hover:text-sky">
        <Mail size={13} /> {COMPANY.email}
      </a>
      <a href={COMPANY.phoneHref} className="flex items-center gap-2 font-semibold text-white hover:text-sky">
        <Phone size={13} /> {COMPANY.phoneDisplay}
      </a>
    </>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { open: openModal } = useContactModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Announcement ticker */}
      <div
        className={`overflow-hidden bg-navy-deep text-[13px] transition-all duration-300 ${
          scrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className="marquee-pause py-2.5">
          <div className="flex w-max animate-marquee-slow items-center gap-14 whitespace-nowrap pl-14">
            <TickerItems />
            <TickerItems />
            <TickerItems />
            <TickerItems />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? 'border-ink/[0.06] bg-white/85 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-white/70 backdrop-blur-md'
        }`}
      >
        <div className={`section-max section-pad flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-[76px]'}`}>
          <a href="#home" aria-label="AL-KHOMASI home" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors ${
                  active === link.href ? 'text-primary' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-primary transition-transform duration-300 origin-left ${
                    active === link.href ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Phone size={15} /> Call us
            </a>
            <button type="button" onClick={openModal} className="btn-primary !px-5 !py-2.5 !text-[14.5px]">
              Let's Talk <ArrowUpRight size={16} />
            </button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-4 mt-2 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-card animate-popIn">
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15.5px] font-medium text-ink/80 hover:bg-haze hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href={COMPANY.phoneHref} className="btn-secondary justify-center !px-4">
              <Phone size={15} /> Call
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openModal()
              }}
              className="btn-primary justify-center !px-4"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
