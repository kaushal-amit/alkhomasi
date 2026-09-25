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
        <span className={`eyebrow ${light ? 'text-sky' : 'text-primary'}`}>
          <span className={`h-px w-6 ${light ? 'bg-sky/60' : 'bg-primary/50'}`} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-h2 font-semibold ${
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
