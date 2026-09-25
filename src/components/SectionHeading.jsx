import Reveal from './Reveal.jsx'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <Reveal className={`flex flex-col ${alignment} max-w-2xl gap-4`}>
      {eyebrow && (
        <span
          className={`text-xs font-semibold tracking-[0.14em] ${
            light ? 'text-bright' : 'text-primary'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-[2.6rem] leading-[1.1] font-semibold tracking-tight ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed ${light ? 'text-white/70' : 'text-mist'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
