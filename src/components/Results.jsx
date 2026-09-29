import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { useLang } from '../lib/i18n'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TournamentShot from './TournamentShot'

export default function Results() {
  const { t } = useLang()
  const results = t.results
  const showcase = results.showcase
  const [open, close] = results.quoteMarks

  return (
    <section
      id="results"
      className="scroll-mt-16 bg-[#ECEDEC] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px]">
        <SectionHead label={results.label} title={results.title} subtitle={results.subtitle} />

        {/* Фото с турнира + подпись */}
        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-5">
          <Reveal delay={0.1} className="overflow-hidden rounded-2xl bg-black">
            <TournamentShot />
          </Reveal>

          <Reveal
            delay={0.2}
            className="flex flex-col rounded-2xl bg-black p-6 text-white lg:p-10"
          >
            <p className="font-body text-xs uppercase tracking-[0.18em] text-emerald-400/80">
              {showcase.eyebrow}
            </p>
            <p
              className="mt-4 font-display text-[22px] leading-[1.12] lg:text-[30px]"
              style={{ letterSpacing: '-0.04em' }}
            >
              {showcase.title}
            </p>
            <p
              className="mt-4 font-body text-base text-white/60 lg:text-lg"
              style={{ lineHeight: 1.5, letterSpacing: '-0.02em' }}
            >
              {showcase.text}
            </p>
            <a
              href="#contacts"
              className="mt-8 inline-flex w-fit items-center gap-1.5 font-body text-base text-white underline underline-offset-4 transition-opacity hover:opacity-60 lg:mt-auto lg:text-lg"
              style={{ letterSpacing: '-0.03em' }}
            >
              {t.hero.cta}
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </a>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3 lg:mt-5 lg:gap-5">
          {results.cases.map((item, i) => (
            <Reveal
              key={i}
              delay={0.1 + i * 0.1}
              className="flex flex-col rounded-2xl bg-[#FEFDF9] p-6 lg:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black font-body text-sm font-medium text-white">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p
                    className="font-body text-base font-medium text-black"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {item.name}
                  </p>
                  <p className="font-body text-sm text-black/45">{item.sport}</p>
                </div>
              </div>

              <div className="mb-7 mt-7 flex items-start gap-2.5">
                <TrendingUp size={20} strokeWidth={1.6} className="mt-1 shrink-0 text-emerald-700" />
                <div>
                  <p
                    className="font-display text-[19px] text-black lg:text-[22px]"
                    style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}
                  >
                    {item.metric}
                  </p>
                  <p className="mt-1 font-body text-sm text-black/45">{item.period}</p>
                </div>
              </div>

              {item.quote && (
                <p
                  className="mt-auto border-t border-black/10 pt-6 font-body text-sm text-black/60 lg:text-base"
                  style={{ lineHeight: 1.5, letterSpacing: '-0.02em' }}
                >
                  {open}
                  {item.quote}
                  {close}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
