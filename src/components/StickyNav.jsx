import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { brand } from '../content/site'
import { useLang } from '../lib/i18n'
import { LanguageToggle } from './LanguageToggle'

/**
 * Компактная панель, которая выезжает сверху после первого экрана,
 * чтобы меню и кнопка были под рукой на длинной странице.
 */
export default function StickyNav() {
  const [shown, setShown] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0B0E10]/85 backdrop-blur-md transition-transform duration-500 ease-out ${
        shown ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <a
          href="#top"
          className="shrink-0 font-display font-medium text-white"
          style={{ fontSize: 22, letterSpacing: '-0.05em' }}
        >
          {brand.name}
        </a>

        <div className="hidden flex-1 items-center justify-center gap-6 md:flex lg:gap-10">
          {t.nav.links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap font-display text-[15px] font-medium text-white/80 transition-colors hover:text-white lg:text-base"
              style={{ letterSpacing: '-0.02em' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageToggle className="hidden lg:flex" />

          <a
            href="#contacts"
            className="flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-white px-4 font-body text-sm font-medium text-black transition-colors duration-300 hover:bg-emerald-300"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.nav.cta}
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </div>
  )
}
