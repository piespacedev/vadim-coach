import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, type Copy, type Lang } from '@/content/site'

// Тот же ключ читает инлайн-скрипт, если он появится в index.html.
const STORAGE_KEY = 'coach-landing:lang'

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void; toggleLang: () => void; t: Copy }
const LangContext = createContext<LangContextValue | null>(null)

/** Сохранённый выбор → язык браузера (ru* → RU, всё остальное → EN). */
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'ru'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch {
    // localStorage недоступен (заблокированы cookies) — просто определяем по браузеру.
  }
  return navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    const copy = content[lang]
    document.documentElement.lang = lang
    document.title = copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Без localStorage выбор просто не переживёт перезагрузку.
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggleLang = useCallback(() => setLangState((p) => (p === 'ru' ? 'en' : 'ru')), [])
  const value = useMemo(() => ({ lang, setLang, toggleLang, t: content[lang] }), [lang, setLang, toggleLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
