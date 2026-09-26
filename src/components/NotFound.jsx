import { ArrowRight } from 'lucide-react'
import { LogoMark } from './Logo.jsx'
import { SERVICES, servicePath } from '../data/services.js'

export default function NotFound() {
  return (
    <section id="not-found" className="section-pad pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="section-max max-w-3xl text-center">
        <LogoMark size={40} className="mx-auto mb-6 block" />
        <p className="eyebrow justify-center text-primary">Error 404</p>
        <h1 className="mt-4 text-display font-semibold text-ink">We couldn't find that page.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-mist">
          The link may be out of date or the page may have moved. Try one of these instead.
        </p>
        <a href="/" className="btn-primary btn-lg mt-9">
          Back to the home page <ArrowRight size={16} />
        </a>
        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          {SERVICES.map((s) => (
            <li key={s.key}>
              <a href={servicePath(s)} className="btn-secondary btn-sm">
                <s.icon size={15} /> {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
