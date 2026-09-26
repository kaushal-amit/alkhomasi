import { useEffect, useState } from 'react'
import { PhoneCall, MessageCircle, ArrowUp } from 'lucide-react'
import { COMPANY } from '../data/site.js'
import { useContactModal } from './ContactModalContext.jsx'

export default function FloatingActions() {
  const { open } = useContactModal()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside data-modal-background aria-label="Quick contact">
      {/* "Get a Call Back" side tab — only from 1280px, where the page gutter
          is wide enough that it never covers content */}
      <button
        type="button"
        onClick={open}
        className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-r-2xl bg-navy-deep py-5 pl-2.5 pr-3 text-white shadow-lift transition-colors hover:bg-primary xl:flex"
      >
        <span className="font-display text-xs font-semibold tracking-wide [writing-mode:vertical-rl] rotate-180">
          Get a Call Back
        </span>
        <PhoneCall size={17} className="text-sky" />
      </button>

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        {/* Back to top — tablet and up; on phones the WhatsApp button stays alone */}
        <a
          href="#home"
          aria-label="Back to top"
          className={`hidden md:grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:text-primary ${
            showTop ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
          }`}
        >
          <ArrowUp size={17} />
        </a>
        <a
          href={COMPANY.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform duration-200 hover:scale-105 md:h-14 md:w-14"
        >
          <MessageCircle size={22} />
        </a>
      </div>
    </aside>
  )
}
