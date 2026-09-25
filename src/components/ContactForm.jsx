import { useId, useState } from 'react'
import { User, Building2, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react'
import { REQUIREMENT_TYPES } from '../data/site.js'

// Shared requirement form used by the Contact section and the "Let's Talk"
// modal. Client-side only: wire `handleSubmit` to your email/CRM endpoint.
export default function ContactForm({ compact = false }) {
  const [submitted, setSubmitted] = useState(false)
  const uid = useId()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 text-center animate-popIn">
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-primary/[0.08] text-primary">
          <span className="absolute inset-0 rounded-full bg-primary/10 animate-ring" />
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-2 text-xl font-semibold text-ink">Thank you — we've got it.</h3>
        <p className="max-w-xs text-[15px] leading-relaxed text-mist">
          A member of our team will review your requirement and get back to you
          shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`grid sm:grid-cols-2 ${compact ? 'gap-x-6 gap-y-5' : 'gap-x-8 gap-y-6'}`}>
      <Field id={`${uid}-name`} icon={User} label="Full name" name="name" autoComplete="name" required />
      <Field id={`${uid}-company`} icon={Building2} label="Company name" name="company" autoComplete="organization" />
      <Field id={`${uid}-email`} icon={Mail} label="Work email" name="email" type="email" autoComplete="email" required />
      <Field id={`${uid}-phone`} icon={Phone} label="Phone number" name="phone" type="tel" autoComplete="tel" />

      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-req`} className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink/50">
          What do you need help with?
        </label>
        <select
          id={`${uid}-req`}
          name="requirement"
          required
          defaultValue=""
          className="field-input mt-1 cursor-pointer"
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
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-msg`} className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink/50">
          Tell us about your project
        </label>
        <textarea
          id={`${uid}-msg`}
          name="message"
          rows={compact ? 3 : 4}
          required
          placeholder="The process you want to improve, systems you use today, and what success looks like."
          className="field-input mt-1 resize-none"
        />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3">
        <button type="submit" className="btn-primary w-full justify-center !py-4">
          Book a Free Consultation <ArrowRight size={16} />
        </button>
        <p className="text-center text-[12.5px] text-mist">
          No obligation. Your details stay confidential.
        </p>
      </div>
    </form>
  )
}

function Field({ id, icon: Icon, label, name, type = 'text', required, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink/50">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <div className="relative mt-1">
        <Icon size={16} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ink/35" />
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="field-input !pl-7"
        />
      </div>
    </div>
  )
}
