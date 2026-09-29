import Reveal from './Reveal'

/** Шапка секции: маленькая метка + крупный заголовок + подзаголовок. */
export default function SectionHead({ label, title, subtitle, dark = false, className = '' }) {
  return (
    <div className={`max-w-[760px] ${className}`}>
      <Reveal
        className={`font-body text-xs uppercase tracking-[0.18em] ${
          dark ? 'text-emerald-400/80' : 'text-emerald-700'
        }`}
      >
        {label}
      </Reveal>

      <Reveal
        as="h2"
        delay={0.08}
        className={`mt-4 font-display text-[26px] leading-[1.12] sm:text-[34px] lg:text-[44px] ${
          dark ? 'text-white' : 'text-black'
        }`}
        style={{ letterSpacing: '-0.04em' }}
      >
        {title}
      </Reveal>

      {subtitle && (
        <Reveal
          as="p"
          delay={0.16}
          className={`mt-5 max-w-[560px] font-body text-base lg:text-lg ${
            dark ? 'text-white/60' : 'text-black/60'
          }`}
          style={{ lineHeight: 1.5, letterSpacing: '-0.02em' }}
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  )
}
