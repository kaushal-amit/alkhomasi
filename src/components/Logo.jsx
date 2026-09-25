export default function Logo({ light = false, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-navy via-primary to-bright text-white font-display font-bold text-[15px] shadow-soft">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
        <span className="relative">AK</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[16px] font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          AL-KHOMASI
        </span>
        <span className={`mt-1 text-[9.5px] font-semibold tracking-[0.22em] ${light ? 'text-white/50' : 'text-mist'}`}>
          SOFTWARE PVT. LTD.
        </span>
      </span>
    </span>
  )
}
