import { createContext, useContext, useEffect, useState } from 'react'
import { translations, LOCALES, type Locale, type TranslationKey } from './translations'

const STORAGE_KEY = 'athletickle-locale'

function isLocale(value: string | null | undefined): value is Locale {
  return value != null && (LOCALES as readonly string[]).includes(value)
}

// localStorage can throw (e.g. "block all cookies" or some embedded contexts);
// language persistence degrades gracefully instead of crashing the page.
function safeGetStoredLocale(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function safeStoreLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // storage unavailable — selection still applies for this visit
  }
}

function detectInitialLocale(): Locale {
  const stored = safeGetStoredLocale()
  if (isLocale(stored)) return stored
  const browser = navigator.language?.slice(0, 2).toLowerCase()
  return isLocale(browser) ? browser : 'en'
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    safeStoreLocale(next)
  }

  const t = (key: TranslationKey) => translations[locale][key]

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
