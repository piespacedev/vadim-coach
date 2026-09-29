import type { Lang } from '@/content/site'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
]

/** Сегментированная «таблетка» RU | EN. Рассчитана на тёмный фон: шапка, StickyNav, мобильное меню. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-white/15 bg-black/20 p-1 font-body text-xs font-medium backdrop-blur-md',
        className,
      )}
      role="group"
      aria-label={t.nav.language}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={cn(
            'rounded-full px-3 py-1.5 tracking-[0.08em] transition-colors duration-300',
            lang === o.value ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
