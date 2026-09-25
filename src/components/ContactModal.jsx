import { useEffect, useRef } from 'react'
import { X, Sparkles, Bot, Workflow, Network } from 'lucide-react'
import ContactForm from './ContactForm.jsx'
import { ContactDetails } from './Contact.jsx'
import { COMPANY } from '../data/site.js'
import { useContactModal } from './ContactModalContext.jsx'

const HIGHLIGHTS = [
  { icon: Sparkles, label: 'AI Solutions' },
  { icon: Bot, label: 'AI Agents' },
  { icon: Workflow, label: 'Automation' },
  { icon: Network, label: 'Integration' },
]

export default function ContactModal() {
  const { isOpen, close } = useContactModal()
  const dialogRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    lastFocused.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const dialog = dialogRef.current
    dialog?.querySelector('input')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      // Keep keyboard focus inside the dialog
      if (e.key === 'Tab' && dialog) {
        const focusables = dialog.querySelectorAll('a[href], button, input, select, textarea')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      lastFocused.current?.focus?.()
    }
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-6">
      <div className="fixed inset-0 bg-navy-ink/60 backdrop-blur-md animate-fadeIn" onClick={close} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative my-auto grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-navy-deep shadow-lift animate-popIn lg:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Info side */}
        <div className="relative hidden p-10 lg:block">
          <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <p className="eyebrow text-sky">
              <span className="h-px w-6 bg-sky/60" /> {COMPANY.name}
            </p>
            <p className="mt-4 font-display text-[1.7rem] font-semibold leading-tight text-white">
              Intelligent solutions, built around how your business works.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <h.icon size={18} className="text-sky" />
                  <span className="text-[14px] font-semibold text-white">{h.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ContactDetails compact />
            </div>
            <p className="mt-auto pt-8 font-display text-[12px] font-semibold tracking-[0.16em] text-sky/80">
              {COMPANY.motto.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="relative bg-white p-6 sm:p-10 lg:m-3 lg:rounded-[1.4rem]">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink transition-colors hover:bg-haze"
          >
            <X size={18} />
          </button>
          <h2 id="contact-modal-title" className="pr-12 text-[1.7rem] sm:text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink">
            Share your vision &amp; <span className="gradient-text">get a quick response.</span>
          </h2>
          <p className="mt-3 text-[14.5px] text-mist">
            Reach our experts for an upfront view of how to approach your project.
          </p>
          <div className="mt-7">
            <ContactForm compact />
          </div>
        </div>
      </div>
    </div>
  )
}
