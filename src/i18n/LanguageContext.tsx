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

// eslint-disable-next-line react-refresh/only-export-components
export function detectPreferredLocale(): Locale {
  const stored = safeGetStoredLocale()
  if (isLocale(stored)) return stored
  const browser =
    typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2).toLowerCase() : undefined
  return isLocale(browser) ? browser : 'en'
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale, options?: { persist?: boolean }) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

interface LanguageProviderProps {
  children: React.ReactNode
  /**
   * Locale for the FIRST render only, so hydration matches the prerendered
   * HTML (URL-pinned locale on blog routes, 'en' elsewhere). After mount,
   * LocaleSync in App.tsx keeps the locale in step with the current route
   * and the visitor's saved preference (two-pass init).
   */
  initialLocale?: Locale
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? 'en')

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (next: Locale, { persist = true }: { persist?: boolean } = {}) => {
    setLocaleState(next)
    if (persist) safeStoreLocale(next)
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
