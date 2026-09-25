export default function Logo({ light = false, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-navy via-primary to-bright text-white font-display font-bold text-base shadow-soft">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
        <span className="relative">AK</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-base font-bold leading-none tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          AL-KHOMASI
        </span>
        <span className={`mt-1.5 text-2xs font-semibold leading-none tracking-[0.16em] ${light ? 'text-white/50' : 'text-mist'}`}>
          SOFTWARE PVT. LTD.
        </span>
      </span>
    </span>
  )
}
