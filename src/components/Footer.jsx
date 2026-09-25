const NAV = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'AI Agents', href: '#ai-agents' },
  { label: 'Automation', href: '#automation' },
  { label: 'Business Software', href: '#business-software' },
  { label: 'About', href: '#how-we-work' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="section-pad pt-16 pb-10 bg-navy-deep text-white/70">
      <div className="section-max grid md:grid-cols-[1.2fr_1fr] gap-12">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-bright to-primary text-white font-display font-bold text-sm">
              AK
            </span>
            <span className="font-display font-semibold text-[15px] text-white">AL-KHOMASI</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            AL-KHOMASI SOFTWARE PRIVATE LIMITED
            <br />
            AI Solutions &amp; Digital Transformation Partner
          </p>
          <p className="mt-6 text-sm">
            8878571610 &middot; info@alkhomasi.com
          </p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed">
            1st Floor, Utkarsh Arcade, New Shivaji Nagar, Thatipur, R.K. Puri,
            Gwalior, Madhya Pradesh – 474011
          </p>
        </div>

        <div className="md:justify-self-end">
          <p className="text-xs font-semibold tracking-[0.1em] text-white/40">NAVIGATION</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm hover:text-white transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-max mt-14 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} AL-KHOMASI SOFTWARE PRIVATE LIMITED
        </p>
        <p className="text-xs font-medium tracking-[0.08em] text-bright/80">
          IDENTIFY. AUTOMATE. INTEGRATE. SCALE.
        </p>
      </div>
    </footer>
  )
}
