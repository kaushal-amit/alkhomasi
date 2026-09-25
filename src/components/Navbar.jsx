import { useEffect, useRef, useState } from 'react'
import { Menu, X, Mail, Phone, ArrowUpRight, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import Logo from './Logo.jsx'
import { COMPANY } from '../data/site.js'
import { SERVICES, serviceHref } from '../data/services.js'
import content from '../data/content.js'
import { useContactModal } from './ContactModalContext.jsx'

// Plain links after the Solutions menu. "Our work" only appears once real
// case studies or testimonials exist.
const LINKS = [
  { label: 'See it in action', href: '#demos' },
  ...(content.caseStudies.length || content.testimonials.length ? [{ label: 'Our work', href: '#work' }] : []),
  { label: 'Why us', href: '#why' },
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

// Desktop "Solutions" dropdown: opens on click or hover, closes on Esc,
// outside click, or choosing an item.
function SolutionsMenu({ active }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const buttonRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (e) => !wrapRef.current?.contains(e.target) && setOpen(false)
    const onFocus = (e) => !wrapRef.current?.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('focusin', onFocus)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('focusin', onFocus)
    }
  }, [open])

  // When hovering has just opened the menu, the click that usually follows
  // should keep it open rather than toggle it shut.
  const hoverOpenedAt = useRef(0)
  const openRef = useRef(open)
  openRef.current = open

  const hoverOpen = () => {
    clearTimeout(closeTimer.current)
    if (!openRef.current) hoverOpenedAt.current = Date.now()
    openRef.current = true
    setOpen(true)
  }
  const onButtonClick = () => {
    // Hover updates may not have rendered yet, so check the timestamp, not `open`
    if (Date.now() - hoverOpenedAt.current < 600) {
      setOpen(true)
      return
    }
    setOpen((v) => !v)
  }
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => {
      openRef.current = false
      setOpen(false)
    }, 150)
  }

  return (
    <div ref={wrapRef} className="relative" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="solutions-menu"
        onClick={onButtonClick}
        className={`relative flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          active || open ? 'text-primary' : 'text-ink/70 hover:text-ink'
        }`}
      >
        Solutions
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        <span
          className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-primary transition-transform duration-300 ${
            active ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </button>

      {open && (
        <div id="solutions-menu" className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-3">
          <div className="overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-card animate-popIn">
            <ul className="grid grid-cols-2 gap-1 p-3">
              {SERVICES.map((s) => (
                <li key={s.key}>
                  <a
                    href={serviceHref(s.key)}
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-haze focus-visible:bg-haze"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-haze text-navy transition-colors group-hover:bg-navy group-hover:text-sky">
                      <s.icon size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink group-hover:text-primary">{s.name}</span>
                      <span className="mt-0.5 block text-xs text-mist">{s.tagline}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-ink/[0.06] bg-haze/50 px-6 py-3.5">
              <span className="text-xs text-mist">Not sure what you need? We'll help you find the right starting point.</span>
              <a href="#demos" onClick={() => setOpen(false)} className="link-arrow !text-xs">
                See it in action
                <span className="chip !h-7 !w-7">
                  <ArrowRight size={13} />
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
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
    menuRef.current?.querySelector('a, summary')?.focus()

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
            <SolutionsMenu active={active === '#solutions'} />
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
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink/80 hover:bg-haze [&::-webkit-details-marker]:hidden">
                Solutions
                <ChevronDown size={17} className="transition-transform group-open:rotate-180" />
              </summary>
              <ul className="mb-2 ml-3 border-l border-ink/[0.08] pl-2">
                {SERVICES.map((s) => (
                  <li key={s.key}>
                    <a
                      href={serviceHref(s.key)}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-haze hover:text-primary"
                    >
                      <s.icon size={16} className="text-primary" /> {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
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
