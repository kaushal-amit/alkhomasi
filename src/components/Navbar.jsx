import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'AI Agents', href: '#ai-agents' },
  { label: 'Automation', href: '#automation' },
  { label: 'Business Software', href: '#business-software' },
  { label: 'About', href: '#how-we-work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`section-max section-pad flex items-center justify-between rounded-full transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-lg shadow-soft border border-ink/[0.06] mx-4 md:mx-8 lg:mx-16 px-5' : ''
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-navy via-primary to-bright text-white font-display font-bold text-sm">
            AK
          </span>
          <span className="font-display font-semibold text-[15px] tracking-tight text-ink">
            AL-KHOMASI
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-ink/70 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary !px-5 !py-2.5 !text-sm">
            Talk to Us
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mx-4 mt-2 rounded-2xl border border-ink/[0.06] bg-white shadow-card p-5 flex flex-col gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink/80 hover:bg-haze hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary justify-center mt-2"
          >
            Talk to Us
          </a>
        </div>
      )}
    </header>
  )
}
