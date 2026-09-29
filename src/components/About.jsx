import { Check } from 'lucide-react'
import { brand, images } from '../content/site'
import { useLang } from '../lib/i18n'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function About() {
  const { t, lang } = useLang()
  const about = t.about

  return (
    <section id="about" className="scroll-mt-16 bg-[#FEFDF9] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionHead label={about.label} title={about.title} />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16">
          {/* Текст и регалии */}
          <div>
            {about.paragraphs.map((text, i) => (
              <Reveal
                as="p"
                key={i}
                delay={0.1 + i * 0.08}
                className="mb-5 max-w-[620px] font-body text-base text-black/70 lg:text-lg"
                style={{ lineHeight: 1.6, letterSpacing: '-0.02em' }}
              >
                {text}
              </Reveal>
            ))}

            <ul className="mt-10 space-y-4">
              {about.credentials.map((item, i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={0.25 + i * 0.07}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800">
                    <Check size={14} strokeWidth={2} className="text-white" />
                  </span>
                  <span
                    className="font-body text-base text-black/80"
                    style={{ lineHeight: 1.4, letterSpacing: '-0.02em' }}
                  >
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>

            {/* Цифры */}
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-black/10 sm:grid-cols-3">
              {about.stats.map((stat, i) => (
                <Reveal
                  key={i}
                  delay={0.35 + i * 0.08}
                  className="bg-[#ECEDEC] px-6 py-7"
                >
                  <p
                    className="font-display text-[26px] font-light text-black lg:text-[34px]"
                    style={{ letterSpacing: '-0.05em', lineHeight: 1 }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-2 font-body text-sm text-black/55 lg:text-base"
                    style={{ lineHeight: 1.3, letterSpacing: '-0.02em' }}
                  >
                    {stat.caption}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Фото */}
          <Reveal delay={0.2} className="lg:sticky lg:top-24 lg:self-start lg:pt-2">
            <img
              src={images.coach}
              alt={brand.fullName[lang]}
              className="w-full rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
