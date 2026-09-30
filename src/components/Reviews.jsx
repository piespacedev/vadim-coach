import { useEffect, useRef, useState } from 'react'
import { reviewShots } from '../content/site'
import { useLang } from '../lib/i18n'
import { arrowHead } from '../lib/arrow'
import PhoneFrame, { BEZEL } from './PhoneFrame'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

// Десктопная «сцена»: телефон по центру, подписи по бокам, стрелки — SVG с этим viewBox.
// Все числа — в единицах viewBox, поэтому сцена масштабируется целиком.
const W = 1200
const H = 780
const PHONE = { x: 428, y: 30, w: 344 }
const SCREEN = {
  x: PHONE.x + PHONE.w * BEZEL,
  y: PHONE.y + PHONE.w * BEZEL,
  w: PHONE.w * (1 - 2 * BEZEL),
}
// Край подписи и начало стрелки для каждой стороны.
const SIDES = {
  left: { edge: 330, from: 348, dir: 1 },
  right: { edge: 870, from: 852, dir: -1 },
}

const pct = (v, total) => `${(v / total) * 100}%`

/** Стрелка от подписи к точке скриншота: плавная дуга, в конце загибается к цели. */
function arrowTo(note, shotW) {
  const { from: fx, dir } = SIDES[note.side]
  const fy = note.labelY * H
  const scale = SCREEN.w / shotW // пиксели скриншота → единицы сцены
  const tx = SCREEN.x + note.at[0] * scale
  const ty = SCREEN.y + note.at[1] * scale
  const c1 = [fx + dir * 70, fy + (ty - fy) * 0.05]
  const c2 = [tx - dir * 40, ty - (ty - fy) * 0.45]
  return {
    line: `M${fx} ${fy} C${c1.join(' ')} ${c2.join(' ')} ${tx.toFixed(1)} ${ty.toFixed(1)}`,
    head: arrowHead(c2, [tx, ty], 16),
  }
}

/** Отзывы: скриншот переписки в рамке айфона, стрелки подписывают главное. */
export default function Reviews() {
  const { t } = useLang()
  const reviews = t.reviews
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  // Стрелки рисуются, когда сцена попала в зону видимости (как в TournamentShot).
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
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const shot = reviewShots[active]
  const item = reviews.items[active]
  const [shotW, shotH] = shot.size

  return (
    <section
      id="reviews"
      className="scroll-mt-16 overflow-hidden bg-[#FEFDF9] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px]">
        <SectionHead label={reviews.label} title={reviews.title} subtitle={reviews.subtitle} />

        {/* Переключатель появляется, когда отзывов больше одного */}
        {reviewShots.length > 1 && (
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
            {reviews.items.map((review, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full px-4 py-2 font-body text-sm transition-colors duration-300 ${
                  i === active ? 'bg-black text-white' : 'bg-black/[0.06] text-black/60 hover:bg-black/10'
                }`}
                style={{ letterSpacing: '-0.02em' }}
              >
                {review.name}
              </button>
            ))}
          </Reveal>
        )}

        {/* key — чтобы при смене отзыва стрелки нарисовались заново */}
        <div
          key={active}
          ref={ref}
          className={`relative mx-auto mt-12 max-w-[1200px] lg:mt-10 lg:aspect-[1200/780] ${
            drawn ? 'is-drawn' : ''
          }`}
        >
          <Reveal
            delay={0.1}
            className="mx-auto w-[min(300px,80%)] lg:absolute lg:w-[28.667%]"
            style={{ left: pct(PHONE.x, W), top: pct(PHONE.y, H) }}
          >
            <PhoneFrame src={shot.src} alt={item.alt} width={shotW} height={shotH}>
              {/* Метки на экране — вместо стрелок на телефонах и планшетах */}
              {shot.notes.map((note, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="shot-tag absolute lg:hidden"
                  style={{
                    left: pct(note.at[0], shotW),
                    top: pct(note.at[1], shotH),
                    animationDelay: `${0.4 + i * 0.15}s`,
                  }}
                >
                  {/* метка стоит снаружи от точки, на рамке — чтобы не закрывать текст сообщения */}
                  <span
                    className={`flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 font-body text-xs font-semibold text-white shadow-lg ring-2 ring-white ${
                      note.side === 'left' ? '-translate-x-full' : ''
                    }`}
                  >
                    {i + 1}
                  </span>
                </span>
              ))}
            </PhoneFrame>
          </Reveal>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-emerald-600 lg:block"
          >
            <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              {shot.notes.map((note, i) => {
                const arrow = arrowTo(note, shotW)
                const delay = 0.5 + i * 0.2
                return (
                  <g key={i}>
                    <path
                      className="shot-line"
                      pathLength="1"
                      style={{ animationDelay: `${delay}s` }}
                      d={arrow.line}
                    />
                    <path
                      className="shot-head"
                      style={{ animationDelay: `${delay + 0.75}s` }}
                      d={arrow.head}
                    />
                  </g>
                )
              })}
            </g>
          </svg>

          {/* Подписи: на десктопе — по бокам телефона, на мобильном — списком под ним */}
          <ol className="mx-auto mt-10 grid max-w-[420px] gap-6 lg:contents">
            {shot.notes.map((note, i) => {
              const left = note.side === 'left'
              return (
                <li
                  key={i}
                  className="shot-tag lg:absolute lg:w-[24%]"
                  style={{
                    [left ? 'right' : 'left']: left ? pct(W - SIDES.left.edge, W) : pct(SIDES.right.edge, W),
                    top: pct(note.labelY * H, H),
                    animationDelay: `${0.3 + i * 0.2}s`,
                  }}
                >
                  {/* сдвиг на полстроки заголовка — стрелка выходит от него, а не от середины блока */}
                  <div className={`flex gap-3.5 lg:-translate-y-4 lg:flex-col ${left ? 'lg:text-right' : ''}`}>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-body text-xs font-semibold text-white lg:hidden">
                      {i + 1}
                    </span>
                    <div>
                      <p
                        className="font-display text-[20px] leading-[1.1] text-black lg:text-[28px]"
                        style={{ letterSpacing: '-0.04em' }}
                      >
                        {item.notes[i].title}
                      </p>
                      <p
                        className="mt-1.5 font-body text-sm text-black/55 lg:mt-2.5 lg:text-base"
                        style={{ lineHeight: 1.45, letterSpacing: '-0.02em' }}
                      >
                        {item.notes[i].text}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Цитата и подпись автора */}
          <figure
            className="shot-tag mx-auto mt-10 max-w-[420px] rounded-2xl bg-[#ECEDEC] p-6 lg:absolute lg:left-[72.5%] lg:top-[66%] lg:mt-0 lg:w-[26%]"
            style={{ animationDelay: '0.9s' }}
          >
            <blockquote
              className="font-body text-base text-black lg:text-lg"
              style={{ lineHeight: 1.4, letterSpacing: '-0.02em' }}
            >
              {reviews.quoteMarks[0]}
              {item.quote}
              {reviews.quoteMarks[1]}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black font-body text-sm font-medium text-white">
                {item.name.charAt(0)}
              </span>
              <span className="font-body leading-tight" style={{ letterSpacing: '-0.02em' }}>
                <span className="block text-sm font-medium text-black">{item.name}</span>
                <span className="block text-sm text-black/45">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
