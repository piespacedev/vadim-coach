import { brand } from '../content/site'
import { useLang } from '../lib/i18n'
import DumbbellsIcon from './icons/Dumbbells'

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer className="border-t border-white/10 bg-[#0B0E10] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 font-display font-medium text-white"
          style={{ fontSize: 24, letterSpacing: '-0.05em' }}
        >
          <DumbbellsIcon size={28} className="text-emerald-400" aria-hidden="true" />
          {brand.name}
        </a>

        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {t.nav.links.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-body text-sm text-white/55 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {brand.footerLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="font-body text-sm text-white/55 transition-colors hover:text-white"
            >
              {typeof item.label === 'string' ? item.label : item.label[lang]}
            </a>
          ))}
        </div>

        <p className="font-body text-sm text-white/30">{t.footer.note}</p>

        <p className="w-full border-t border-white/10 pt-6 font-body text-sm text-white/30">
          {t.footer.madeBy}{' '}
          <a
            href={brand.agency.href}
            target="_blank"
            rel="noreferrer"
            className="text-white/55 underline underline-offset-4 transition-colors hover:text-white"
          >
            {brand.agency.name}
          </a>
        </p>
      </div>
    </footer>
  )
}
