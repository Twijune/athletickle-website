import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Design10 from './designs/Design10'
import Edition from './pages/Edition'
import About from './pages/About'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Exercise from './pages/Exercise'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import { LanguageProvider, detectPreferredLocale, getSavedLocale, useLanguage } from './i18n/LanguageContext'
import {
  PREFIXED_LOCALES,
  contentLangFromPath,
  localeFromPath,
  localizedPageFromPath,
  pagePath,
} from './blog/paths'
import { ExerciseContext, type ExerciseEntry } from './exercises/exercise'
import type { Locale } from './i18n/translations'

// Blog routes and the landing/app pages (/, /fr, /de/parkour…) pin the locale
// via the URL; everywhere else the visitor's saved/browser preference applies.
// Runs on every navigation (post-mount, so hydration still matches the
// prerendered HTML). Auto-syncs never persist — only an explicit switcher
// choice does.
function LocaleSync() {
  const { locale, setLocale } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // The English landing and app pages have a translated twin at its own
    // URL. A visitor who chose that language in the switcher is sent there;
    // the browser language alone never redirects (docs/seo/OPPORTUNITIES.md,
    // B1), so search engines and shared links get the URL they asked for.
    // Choosing EN saves the preference, which stops the redirect.
    const saved = getSavedLocale()
    const page = localizedPageFromPath(location.pathname)
    if (page?.locale === 'en' && saved && saved !== 'en') {
      navigate(`${pagePath(saved, page.page)}${location.search}${location.hash}`, { replace: true })
      return
    }
    const target = localeFromPath(location.pathname) ?? detectPreferredLocale()
    if (target !== locale) setLocale(target, { persist: false })
  }, [location.pathname, location.search, location.hash, locale, setLocale, navigate])
  // <html lang> follows the page's content: the Finnish legal pages under /fi/
  // are Finnish whatever language the site chrome is in
  useEffect(() => {
    document.documentElement.lang = contentLangFromPath(location.pathname) ?? locale
  }, [location.pathname, locale])
  return null
}

// English lives at the unprefixed URLs (/, /parkour, /blog); fr/de/es are
// path-prefixed.
// `exercise` is the one exercise a prerendered /exercises/<slug> page carries.
function App({ initialLocale, exercise = null }: { initialLocale?: Locale; exercise?: ExerciseEntry | null }) {
  return (
    <ExerciseContext.Provider value={exercise}>
      <LanguageProvider initialLocale={initialLocale}>
        <LocaleSync />
        <Routes>
          <Route path="/" element={<Design10 />} />
          <Route path="/parkour" element={<Edition edition="parkour" />} />
          <Route path="/strength" element={<Edition edition="strength" />} />
          {PREFIXED_LOCALES.flatMap((l) => [
            <Route key={l} path={`/${l}`} element={<Design10 />} />,
            <Route key={`${l}-parkour`} path={`/${l}/parkour`} element={<Edition edition="parkour" />} />,
            <Route key={`${l}-strength`} path={`/${l}/strength`} element={<Edition edition="strength" />} />,
          ])}
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/fi/terms" element={<Terms lang="fi" />} />
          <Route path="/fi/privacy" element={<Privacy lang="fi" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/exercises/:slug" element={<Exercise />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/:lang/blog" element={<BlogIndex />} />
          <Route path="/:lang/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </ExerciseContext.Provider>
  )
}

export default App
