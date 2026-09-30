import { useEffect, useRef, useState } from 'react'
import { Medal } from 'lucide-react'
import { images } from '../content/site'
import { useLang } from '../lib/i18n'
import { arrowHead } from '../lib/arrow'

// Все координаты — в пикселях исходного кадра tournament.webp (924×690).
// SVG поверх фото имеет тот же viewBox, поэтому стрелки масштабируются вместе с картинкой.
// Если заменить фото — пересчитать точки ниже.
const W = 924
const H = 690

// Подписи: точка — правый нижний угол плашки, от неё плашка растёт влево-вверх.
const TAGS = {
  coach: { x: 350, y: 96 },
  masters: { x: 906, y: 96 },
}

// Стрелки: кубическая кривая «старт → c1 → c2 → конец». Конец — у головы спортсмена.
const ARROWS = [
  // к Вадиму (клетчатая рубашка)
  { from: [320, 106], c1: [324, 156], c2: [372, 168], to: [400, 202], delay: 0.35 },
  // к мастеру спорта справа
  { from: [792, 106], c1: [798, 168], c2: [724, 206], to: [646, 212], delay: 0.55 },
  // к мастеру спорта в центре
  { from: [762, 106], c1: [742, 152], c2: [612, 132], to: [530, 224], delay: 0.7 },
]

const pct = (v, total) => `${(v / total) * 100}%`

/** Фото с турнира: стрелки подписывают тренера и двух подопечных — мастеров спорта. */
export default function TournamentShot() {
  const { t } = useLang()
  const s = t.results.showcase
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  // Стрелки рисуются, когда фото попало в зону видимости (как Reveal, но порог выше).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setDrawn(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative ${drawn ? 'is-drawn' : ''}`}>
      <img
        src={images.tournament}
        alt={s.alt}
        width={W}
        height={H}
        loading="lazy"
        className="block h-auto w-full"
      />

      {/* лёгкое затемнение сверху — чтобы подписи читались на светлой стене */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-black/45 to-transparent" />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-emerald-400 [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.55))_drop-shadow(0_0_6px_rgba(52,211,153,0.55))]"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="[stroke-width:4.5] sm:[stroke-width:3.4] lg:[stroke-width:2.8]"
        >
          {ARROWS.map(({ from, c1, c2, to, delay }, i) => (
            <g key={i}>
              <path
                className="shot-line"
                pathLength="1"
                style={{ animationDelay: `${delay}s` }}
                d={`M${from.join(' ')} C${c1.join(' ')} ${c2.join(' ')} ${to.join(' ')}`}
              />
              <path
                className="shot-head"
                style={{ animationDelay: `${delay + 0.75}s` }}
                d={arrowHead(c2, to)}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Тренер */}
      <div
        className="shot-tag absolute"
        style={{ left: pct(TAGS.coach.x, W), top: pct(TAGS.coach.y, H), animationDelay: '0.15s' }}
      >
        <div className="-translate-x-full -translate-y-full">
          <span
            className="block whitespace-nowrap rounded-full bg-[#FEFDF9] px-2 py-1 font-body text-[10px] font-medium text-black shadow-lg sm:px-3 sm:py-1.5 sm:text-xs lg:text-sm"
            style={{ letterSpacing: '-0.02em' }}
          >
            {s.coachTag}
          </span>
        </div>
      </div>

      {/* Мастера спорта */}
      <div
        className="shot-tag absolute"
        style={{ left: pct(TAGS.masters.x, W), top: pct(TAGS.masters.y, H), animationDelay: '0.3s' }}
      >
        <div className="-translate-x-full -translate-y-full">
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-black/80 py-1 pl-1 pr-2.5 text-white shadow-lg ring-1 ring-emerald-400/40 backdrop-blur-md sm:gap-2 sm:rounded-2xl sm:py-1.5 sm:pl-1.5 sm:pr-3.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-black sm:h-8 sm:w-8">
              <Medal strokeWidth={1.8} className="h-3 w-3 sm:h-4 sm:w-4" />
            </span>
            <span className="font-body leading-tight" style={{ letterSpacing: '-0.02em' }}>
              <span className="block text-[10px] font-medium sm:text-xs lg:text-sm">{s.mastersTag}</span>
              <span className="hidden text-[11px] text-emerald-300/90 sm:block lg:text-xs">{s.mastersNote}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
