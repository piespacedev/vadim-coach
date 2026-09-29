import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { brand, images } from '../content/site'
import { useLang } from '../lib/i18n'
import { LanguageToggle } from './LanguageToggle'
import DumbbellsIcon from './icons/Dumbbells'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  return (
    <>
      <nav className="animate-fade-in relative z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
        {/* Логотип */}
        <a
          href="#top"
          className="animate-slide-left delay-200 flex shrink-0 items-center gap-2 font-display font-medium text-white"
          style={{ fontSize: 30, letterSpacing: '-0.05em', lineHeight: 1 }}
        >
          <DumbbellsIcon size={34} className="text-emerald-400" aria-hidden="true" />
          {brand.name}
        </a>

        {/* Меню — десктоп */}
        <div className="animate-fade-in delay-400 hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-10">
          {t.nav.links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap font-display text-[15px] font-medium text-white/90 transition-colors hover:text-white lg:text-[18px]"
              style={{ letterSpacing: '-0.02em' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Иконки справа */}
        <div className="animate-slide-right delay-300 flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
          {/* Язык — десктоп. До lg меню и язык живут в бургер-меню: в шапку не помещаются. */}
          <LanguageToggle className="hidden lg:flex" />

          <img
            src={images.avatar}
            alt={t.nav.avatarAlt}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-white/25 lg:h-10 lg:w-10"
          />

          <button
            type="button"
            aria-label={t.nav.openMenu}
            onClick={() => setOpen(true)}
            className="text-white lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      {open && (
        <div className="animate-fade-in fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-black/90 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            aria-label={t.nav.closeMenu}
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 text-white"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
          {t.nav.links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-medium text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              {item.label}
            </a>
          ))}
          <LanguageToggle className="mt-4 text-sm" />
        </div>
      )}
    </>
  )
}
