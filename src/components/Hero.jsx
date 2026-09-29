import { ArrowUpRight } from 'lucide-react'
import { images } from '../content/site'
import { useLang } from '../lib/i18n'

// Слова заголовка выезжают по очереди с шагом 0.1 сек.
// Классы перечислены целиком, чтобы их нашёл сборщик; лишние слова берут последнюю задержку.
const WORD_DELAYS = ['delay-300', 'delay-400', 'delay-500', 'delay-600', 'delay-700', 'delay-800', 'delay-900']

function Word({ word, delay }) {
  return (
    <span
      className={`animate-word-reveal inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] ${delay}`}
    >
      <span className={word.dim ? 'text-white/45' : 'text-white'}>{word.text}</span>
    </span>
  )
}

export default function Hero() {
  const { t } = useLang()
  const lines = t.hero.title
  let wordIndex = 0

  return (
    <section
      id="top"
      className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-8 pt-4 sm:px-8 sm:pt-6 lg:px-10 lg:pb-10"
    >
      <h1
        className="font-display font-normal text-[32px] leading-[38px] sm:text-[48px] sm:leading-[52px] md:text-[64px] md:leading-[66px] lg:text-[82px] lg:leading-[82px] xl:text-[96px] xl:leading-[94px]"
        style={{ letterSpacing: '-0.05em' }}
      >
        {lines.map((line, i) => (
          <span key={i} className="flex flex-wrap items-center gap-x-[0.25em]">
            {line.map((word, j) => {
              const delay = WORD_DELAYS[Math.min(wordIndex++, WORD_DELAYS.length - 1)]
              // Ключ по позиции: при смене языка слово меняется на месте, без повторной анимации.
              return <Word key={j} word={word} delay={delay} />
            })}

            {/* маленькая картинка в конце последней строки */}
            {i === lines.length - 1 && (
              <img
                src={images.accent}
                alt=""
                aria-hidden="true"
                className="animate-scale-in delay-800 ml-2 hidden align-middle sm:inline-block lg:ml-4"
                style={{ height: 'clamp(34px, 4.6vw, 74px)', width: 'auto' }}
              />
            )}
          </span>
        ))}
      </h1>

      {/* Кнопка + описание */}
      <div className="animate-fade-up delay-600 mt-8 flex flex-col gap-5 sm:mt-12 sm:flex-row sm:items-center sm:gap-8 lg:mt-[75px] lg:gap-[50px]">
        <a
          href="#contacts"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-black font-body font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-neutral-900 sm:h-16 sm:w-[240px] md:w-[280px] lg:h-[72px] lg:w-[310px]"
          style={{ letterSpacing: '-0.03em' }}
        >
          <span className="text-base sm:text-lg lg:text-2xl">{t.hero.cta}</span>
          <ArrowUpRight size={22} strokeWidth={1.5} />
        </a>

        <p
          className="max-w-[310px] font-body text-sm text-white sm:text-base lg:text-lg"
          style={{ lineHeight: 1.45, letterSpacing: '-0.03em' }}
        >
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  )
}
