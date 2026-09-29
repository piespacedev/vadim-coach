import { useEffect, useState } from 'react'
import { Activity, Flame, Trophy } from 'lucide-react'
import { images } from '../content/site'
import { useLang } from '../lib/i18n'
import Dumbbell from './icons/Dumbbell'

const ICONS = { Dumbbell, Activity, Flame, Trophy }

function PanelOne() {
  const { t } = useLang()
  return (
    <div className="animate-fade-up delay-900 relative flex min-h-[180px] flex-col justify-between overflow-hidden bg-[#ECEDEC] p-6 sm:p-8 lg:min-h-[230px] lg:p-10">
      <img
        src={images.panelDecor}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-full opacity-80 mix-blend-multiply"
      />
      <p
        className="relative max-w-[350px] font-display text-lg font-normal text-black sm:text-xl lg:text-[26px]"
        style={{ lineHeight: 1.15, letterSpacing: '-0.04em' }}
      >
        {t.panels.intro.title}
      </p>
      <a
        href="#contacts"
        className="relative mt-6 inline-block w-fit font-body text-base text-black underline underline-offset-4 transition-opacity hover:opacity-60 lg:text-lg"
        style={{ letterSpacing: '-0.03em' }}
      >
        {t.panels.intro.link}
      </a>
    </div>
  )
}

function PanelTwo() {
  const { t } = useLang()
  const cards = t.panels.cards
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length)
    }, 3500)
    return () => clearInterval(id)
  }, [cards.length])

  return (
    <div className="animate-fade-up delay-1000 flex min-h-[180px] flex-col justify-between bg-[#FEFDF9] p-6 sm:p-8 lg:min-h-[230px] lg:p-10">
      <div className="relative flex-1">
        {cards.map((card, i) => {
          const Icon = ICONS[card.icon] ?? Dumbbell
          const isActive = i === active
          return (
            <div
              key={i}
              className={`flex items-start gap-3 transition-all duration-700 ease-out sm:gap-4 ${
                isActive
                  ? 'relative translate-y-0 opacity-100'
                  : 'pointer-events-none absolute inset-0 translate-y-4 opacity-0'
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${card.color}`}
              >
                <Icon size={Icon === Dumbbell ? 24 : 18} strokeWidth={1.5} className="text-white" />
              </span>
              <p
                className="font-body text-sm text-black/80 sm:text-base lg:text-lg"
                style={{ lineHeight: 1.2, letterSpacing: '-0.03em' }}
              >
                {card.text}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex gap-1.5">
        {cards.map((card, i) => (
          <button
            key={i}
            type="button"
            aria-label={t.panels.cardLabel.replace('{n}', String(i + 1))}
            onClick={() => setActive(i)}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
              i === active ? 'bg-black' : 'bg-black/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Тонкая стрелка-«змейка»: из правого верхнего угла, кончик — в левом нижнем (падает на число).
 * Кончик стоит в точке (7, 93) из viewBox 240×100 — под неё подогнано положение в PanelThree.
 * На lg колонка текста слишком узкая (~90px), поэтому там стрелка скрыта.
 */
function SquiggleArrow({ className = '' }) {
  return (
    <svg viewBox="0 0 240 100" fill="none" aria-hidden="true" className={className}>
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M233 7 C231 17 220 22 204 23 S178 26 164 28 C152 30 142 38 135 48 S124 62 101 64 S62 63 46 68 C30 73 16 82 7 93"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M7.7 83 L7 93 L16.6 90.3" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}

function PanelThree() {
  const { t } = useLang()
  return (
    <div className="animate-fade-up delay-1100 relative flex min-h-[180px] items-center gap-4 bg-black p-6 sm:gap-6 sm:p-8 md:col-span-2 lg:col-span-1 lg:min-h-[230px] lg:p-10">
      <img
        src={images.panelCard}
        alt=""
        aria-hidden="true"
        className="h-[82px] w-[120px] shrink-0 rounded-xl object-cover sm:h-[110px] sm:w-[160px] lg:h-[142px] lg:w-[208px]"
      />
      <div>
        <p
          className="font-display text-2xl text-white sm:text-3xl lg:text-[34px]"
          style={{ letterSpacing: '-0.05em', lineHeight: 1.1 }}
        >
          <span className="relative inline-block">
            {t.panels.counter.value}
            <SquiggleArrow className="pointer-events-none absolute bottom-[70%] left-full w-[140px] overflow-visible text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.55)] sm:bottom-[40%] sm:w-[160px] lg:hidden xl:bottom-[70%] xl:block xl:w-[150px] 2xl:bottom-[55%] 2xl:w-[200px]" />
          </span>
        </p>
        <p
          className="mt-2 font-body text-sm text-white/60 sm:text-base lg:text-lg"
          style={{ lineHeight: 1.2, letterSpacing: '-0.02em' }}
        >
          {t.panels.counter.text}
        </p>
      </div>
    </div>
  )
}

export default function Panels() {
  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_2fr]">
      <PanelOne />
      <PanelTwo />
      <PanelThree />
    </div>
  )
}
