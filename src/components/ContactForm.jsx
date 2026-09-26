import { useId, useRef, useState } from 'react'
import { User, Building2, Mail, Phone, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { COMPANY, REQUIREMENT_TYPES } from '../data/site.js'
import { submitLead } from '../lib/submitLead.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+()\-\s\d]{7,20}$/

function validate(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Please enter your name.'
  if (!data.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Please enter a valid email address.'
  if (data.phone.trim() && !PHONE_RE.test(data.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (!data.requirement) errors.requirement = 'Please choose what you need help with.'
  if (data.message.trim().length < 10) errors.message = 'Please add a few words about your project.'
  return errors
}

// Shared requirement form used by the Contact section and the "Let's Talk"
// modal. Delivery is handled by `submitLead` (see src/lib/submitLead.js).
export default function ContactForm({ compact = false }) {
  const [status, setStatus] = useState('idle') // idle | submitting | sent | mailto | error
  const [errors, setErrors] = useState({})
  const uid = useId()
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = Object.fromEntries(
      ['name', 'company', 'email', 'phone', 'requirement', 'message', 'website'].map((k) => [k, String(form.get(k) ?? '')])
    )

    // Honeypot: real visitors never see or fill the "website" field
    if (data.website) {
      setStatus('sent')
      return
    }
    delete data.website

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) {
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      const { via } = await submitLead(data)
      setStatus(via === 'mailto' ? 'mailto' : 'sent')
    } catch {
      setStatus('error')
    }
  }

  // Clear a field's error as soon as the visitor edits it
  const clearError = (e) => {
    const { name } = e.target
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  if (status === 'sent' || status === 'mailto') {
    return (
      <div role="status" className="flex min-h-[320px] flex-col items-center justify-center gap-3 text-center animate-popIn">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/[0.08] text-primary">
          <CheckCircle2 size={28} />
        </span>
        {status === 'sent' ? (
          <>
            <h3 className="mt-2 text-xl font-semibold text-ink">Thank you — we've got it.</h3>
            <p className="max-w-xs text-base text-mist">
              A member of our team will review your requirement and get back to you shortly.
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-2 text-xl font-semibold text-ink">Almost there — press send.</h3>
            <p className="max-w-sm text-base text-mist">
              We've opened your email app with your message ready to go. If nothing opened, email us at{' '}
              <a href={`mailto:${COMPANY.email}`} className="font-semibold text-primary">
                {COMPANY.email}
              </a>
              .
            </p>
          </>
        )}
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={clearError}
      noValidate
      className={`relative grid sm:grid-cols-2 ${compact ? 'gap-x-6 gap-y-5' : 'gap-x-8 gap-y-6'}`}
    >
      <Field id={`${uid}-name`} icon={User} label="Full name" name="name" autoComplete="name" required error={errors.name} />
      <Field id={`${uid}-company`} icon={Building2} label="Company name" name="company" autoComplete="organization" />
      <Field id={`${uid}-email`} icon={Mail} label="Work email" name="email" type="email" autoComplete="email" required error={errors.email} />
      <Field id={`${uid}-phone`} icon={Phone} label="Phone number" name="phone" type="tel" autoComplete="tel" error={errors.phone} />

      {/* Honeypot — hidden from people and assistive tech, catches simple bots */}
      <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor={`${uid}-req`} required>
          What do you need help with?
        </Label>
        <select
          id={`${uid}-req`}
          name="requirement"
          defaultValue=""
          aria-required="true"
          aria-invalid={Boolean(errors.requirement)}
          aria-describedby={errors.requirement ? `${uid}-req-err` : undefined}
          className={`field-input mt-1 cursor-pointer ${errors.requirement ? '!border-red-600' : ''}`}
        >
          <option value="" disabled>
            Select a requirement
          </option>
          {REQUIREMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FieldError id={`${uid}-req-err`} message={errors.requirement} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor={`${uid}-msg`} required>
          Tell us about your project
        </Label>
        <textarea
          id={`${uid}-msg`}
          name="message"
          rows={compact ? 3 : 4}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-msg-err` : undefined}
          placeholder="The process you want to improve, systems you use today, and what success looks like."
          className={`field-input mt-1 resize-none ${errors.message ? '!border-red-600' : ''}`}
        />
        <FieldError id={`${uid}-msg-err`} message={errors.message} />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3">
        {status === 'error' && (
          <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>
              Something went wrong sending your message. Please try again, or email us at{' '}
              <a href={`mailto:${COMPANY.email}`} className="font-semibold underline">
                {COMPANY.email}
              </a>
              .
            </span>
          </p>
        )}
        <button type="submit" disabled={submitting} className="btn-primary btn-lg w-full">
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Book a Free Consultation <ArrowRight size={16} />
            </>
          )}
        </button>
        <p className="text-center text-xs text-mist">No obligation. Your details stay confidential.</p>
      </div>
    </form>
  )
}

function Label({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.1em] text-mist">
      {children}
      {required && (
        <span className="text-primary" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
  )
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
      <AlertCircle size={13} aria-hidden="true" /> {message}
    </p>
  )
}

function Field({ id, icon: Icon, label, name, type = 'text', required, autoComplete, error }) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative mt-1">
        <Icon size={16} aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-mist" />
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`field-input !pl-7 ${error ? '!border-red-600' : ''}`}
        />
      </div>
      <FieldError id={`${id}-err`} message={error} />
    </div>
  )
}
