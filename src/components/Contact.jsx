import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

const REQUIREMENT_TYPES = [
  'AI Solution',
  'AI Agent',
  'Workflow Automation',
  'Business Software',
  'Data & Business Intelligence',
  'System Integration',
  'Digital Transformation',
  'Other',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-pad py-24 md:py-32">
      <div className="section-max grid lg:grid-cols-[0.85fr_1.15fr] gap-14">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about your business."
            description="Tell us what you're trying to solve — we'll get back to you."
          />

          <Reveal delay={140} className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/[0.08] text-primary">
                <Phone size={17} />
              </span>
              <div>
                <p className="text-xs text-mist">Phone</p>
                <a href="tel:8878571610" className="text-[15px] font-medium text-ink hover:text-primary">
                  8878571610
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/[0.08] text-primary">
                <Mail size={17} />
              </span>
              <div>
                <p className="text-xs text-mist">Email</p>
                <a
                  href="mailto:info@alkhomasi.com"
                  className="text-[15px] font-medium text-ink hover:text-primary"
                >
                  info@alkhomasi.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/[0.08] text-primary">
                <MapPin size={17} />
              </span>
              <div>
                <p className="text-xs text-mist">Address</p>
                <p className="text-[15px] font-medium leading-relaxed text-ink">
                  1st Floor, Utkarsh Arcade, New Shivaji Nagar, Thatipur,
                  <br />
                  R.K. Puri, Gwalior, Madhya Pradesh – 474011
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="card-surface p-6 md:p-9">
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/[0.08] text-primary">
                <CheckCircle2 size={26} />
              </span>
              <h3 className="text-xl font-semibold text-ink">Message received</h3>
              <p className="max-w-xs text-[15px] text-mist">
                Thank you for reaching out. Our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" name="name" required />
              <Field label="Company / Organization" name="company" />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[13px] font-medium text-ink/70">Requirement Type</span>
                <select
                  name="requirement"
                  required
                  defaultValue=""
                  className="rounded-lg border border-ink/10 bg-white px-3.5 py-2.5 text-[14.5px] text-ink outline-none transition-colors focus:border-primary"
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
              </label>

              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[13px] font-medium text-ink/70">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="resize-none rounded-lg border border-ink/10 bg-white px-3.5 py-2.5 text-[14.5px] text-ink outline-none transition-colors focus:border-primary"
                />
              </label>

              <button type="submit" className="btn-primary sm:col-span-2 justify-center">
                Send Message <Send size={15} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-ink/70">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-ink/10 bg-white px-3.5 py-2.5 text-[14.5px] text-ink outline-none transition-colors focus:border-primary"
      />
    </label>
  )
}
