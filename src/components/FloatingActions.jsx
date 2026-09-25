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
    <>
      {/* "Get a Call Back" side tab (desktop) */}
      <button
        type="button"
        onClick={open}
        className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-r-2xl bg-navy-deep py-5 pl-2.5 pr-3 text-white shadow-lift transition-colors hover:bg-primary md:flex"
      >
        <span className="font-display text-[13px] font-semibold tracking-wide [writing-mode:vertical-rl] rotate-180">
          Get a Call Back
        </span>
        <PhoneCall size={17} className="text-sky" />
      </button>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <a
          href="#home"
          aria-label="Back to top"
          className={`grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-card transition-all duration-300 hover:text-primary ${
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
          className="relative grid h-14 w-14 place-items-center rounded-full bg-[#1FAF55] text-white shadow-lift transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 rounded-full bg-[#1FAF55] animate-ring" />
          <MessageCircle size={24} className="relative" />
        </a>
      </div>
    </>
  )
}
