import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Design10 from './designs/Design10'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import { LanguageProvider, detectPreferredLocale, useLanguage } from './i18n/LanguageContext'
import { localeFromPath } from './blog/paths'
import type { Locale } from './i18n/translations'

// Blog routes pin the locale via the URL; everywhere else the visitor's
// saved/browser preference applies. Runs on every navigation (post-mount,
// so hydration still matches the prerendered HTML). Auto-syncs never
// persist — only an explicit switcher choice does.
function LocaleSync() {
  const { locale, setLocale } = useLanguage()
  const location = useLocation()
  useEffect(() => {
    const target = localeFromPath(location.pathname) ?? detectPreferredLocale()
    if (target !== locale) setLocale(target, { persist: false })
  }, [location.pathname, locale, setLocale])
  return null
}

// English blog lives at unprefixed /blog; fr/de/es are path-prefixed.
function App({ initialLocale }: { initialLocale?: Locale }) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <LocaleSync />
      <Routes>
        <Route path="/" element={<Design10 />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/:lang/blog" element={<BlogIndex />} />
        <Route path="/:lang/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
