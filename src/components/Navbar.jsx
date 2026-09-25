import { useEffect, useRef, useState } from 'react'
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

// The ticker repeats its content to loop seamlessly; only the first copy is
// exposed to assistive tech and the keyboard.
function TickerItems({ copy }) {
  const hidden = copy > 0
  const linkProps = hidden ? { tabIndex: -1 } : {}
  return (
    <div className="flex items-center gap-14" aria-hidden={hidden || undefined}>
      <span className="flex items-center gap-2 text-white/80">
        <Sparkles size={13} className="text-sky" />
        AI solutions, AI agents, workflow automation &amp; business software — built around the way you work.
        <a href="#contact" {...linkProps} className="font-semibold text-white underline decoration-sky/60 underline-offset-4 hover:decoration-white">
          Connect now
        </a>
      </span>
      <a href={`mailto:${COMPANY.email}`} {...linkProps} className="flex items-center gap-2 font-semibold text-white hover:text-sky">
        <Mail size={13} /> {COMPANY.email}
      </a>
      <a href={COMPANY.phoneHref} {...linkProps} className="flex items-center gap-2 font-semibold text-white hover:text-sky">
        <Phone size={13} /> {COMPANY.phoneDisplay}
      </a>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { open: openModal } = useContactModal()
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

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

  // Mobile menu: Esc / outside click / widening the window closes it,
  // the page behind stops scrolling, and focus returns to the toggle.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector('a')?.focus()

    const close = () => setOpen(false)
    const onKey = (e) => e.key === 'Escape' && close()
    const onPointer = (e) => {
      if (!menuRef.current?.contains(e.target) && !toggleRef.current?.contains(e.target)) close()
    }
    const mq = window.matchMedia('(min-width: 1280px)')
    const onWide = (e) => e.matches && close()

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    mq.addEventListener('change', onWide)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      mq.removeEventListener('change', onWide)
      // Return focus to the toggle unless the user moved it elsewhere (e.g. a link)
      if (!document.activeElement || document.activeElement === document.body || menuRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus()
      }
    }
  }, [open])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Announcement ticker */}
      <div
        className={`overflow-hidden bg-navy-deep text-xs transition-all duration-300 ${
          scrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className="marquee-pause py-2.5">
          <div className="flex w-max animate-marquee-slow items-center gap-14 whitespace-nowrap pl-14">
            {[0, 1, 2, 3].map((copy) => (
              <TickerItems key={copy} copy={copy} />
            ))}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled || open
            ? 'border-ink/[0.06] bg-white/95 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className={`section-max section-pad flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? 'h-16' : 'h-[76px]'}`}>
          <a href="#home" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? 'location' : undefined}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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

          <div className="hidden xl:flex items-center gap-3">
            <a href={COMPANY.phoneHref} className="btn-secondary btn-sm">
              <Phone size={15} /> Call us
            </a>
            <button type="button" onClick={openModal} className="btn-primary btn-sm">
              Let's Talk <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button type="button" onClick={openModal} className="btn-primary btn-sm hidden sm:inline-flex">
              Let's Talk
            </button>
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="icon-btn"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="xl:hidden mx-4 mt-2 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-card animate-popIn"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink/80 hover:bg-haze hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href={COMPANY.phoneHref} className="btn-secondary">
              <Phone size={15} /> Call
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openModal()
              }}
              className="btn-primary"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
