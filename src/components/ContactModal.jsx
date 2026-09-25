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

    // Make everything behind the dialog unreachable (keyboard, pointer, screen readers)
    const background = document.querySelectorAll('[data-modal-background]')
    background.forEach((el) => el.setAttribute('inert', ''))

    const dialog = dialogRef.current
    dialog?.querySelector('input')?.focus()

    // Only elements that are actually rendered can take focus (the info
    // panel is display:none on small screens)
    const visibleFocusables = () =>
      [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea')].filter(
        (el) => el.getClientRects().length > 0 && !el.closest('[aria-hidden="true"]')
      )

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab' && dialog) {
        const focusables = visibleFocusables()
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      background.forEach((el) => el.removeAttribute('inert'))
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
        className="card-dark my-auto grid w-full max-w-5xl animate-popIn lg:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Info side */}
        <div className="relative hidden p-10 lg:block">
          <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <p className="eyebrow text-sky">
              <span className="h-px w-6 bg-sky/60" /> {COMPANY.name}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold text-white">
              Intelligent solutions, built around how your business works.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <h.icon size={18} className="text-sky" />
                  <span className="text-sm font-semibold text-white">{h.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ContactDetails compact />
            </div>
            <p className="mt-auto pt-8 font-display text-xs font-semibold tracking-[0.16em] text-sky/80">
              {COMPANY.motto.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="relative bg-white p-6 sm:p-10 lg:m-3 lg:rounded-3xl">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="icon-btn absolute right-4 top-4"
          >
            <X size={18} />
          </button>
          <h2 id="contact-modal-title" className="pr-12 text-h3 font-semibold text-ink">
            Share your vision &amp; <span className="gradient-text">get a quick response.</span>
          </h2>
          <p className="mt-3 text-sm text-mist">
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
