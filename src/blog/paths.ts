import { LOCALES, type Locale } from '../i18n/translations'

// English lives at the unprefixed URLs (/blog/...); the other locales are
// path-prefixed (/fr/blog/...). x-default therefore always points at English.
const PREFIXED_LOCALES = LOCALES.filter((l) => l !== 'en')

export function blogPath(locale: Locale, slug?: string): string {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return slug ? `${prefix}/blog/${slug}` : `${prefix}/blog`
}

export interface Alternate {
  hreflang: string
  path: string
}

/** hreflang alternates for a blog index (no slug) or post (slug) page. */
export function blogAlternates(slug?: string): Alternate[] {
  return [
    ...LOCALES.map((locale) => ({ hreflang: locale as string, path: blogPath(locale, slug) })),
    { hreflang: 'x-default', path: blogPath('en', slug) },
  ]
}

/** Locale pinned by the URL, or null when the page manages its own locale. */
export function localeFromPath(pathname: string): Locale | null {
  for (const locale of PREFIXED_LOCALES) {
    if (pathname === `/${locale}/blog` || pathname.startsWith(`/${locale}/blog/`)) {
      return locale
    }
  }
  if (pathname === '/blog' || pathname.startsWith('/blog/')) return 'en'
  return null
}

/** Same page under another locale (blog routes only; other paths unchanged). */
export function swapLocaleInPath(pathname: string, next: Locale): string {
  const current = localeFromPath(pathname)
  if (!current) return pathname
  const rest = current === 'en' ? pathname : pathname.slice(`/${current}`.length)
  return next === 'en' ? rest : `/${next}${rest}`
}

/**
 * Route param → locale. '/blog' (no param) is English; '/:lang/blog' is only
 * valid for the prefixed locales — '/en/blog' would be duplicate content of
 * '/blog', so it resolves to null (404).
 */
export function resolveRouteLang(param: string | undefined): Locale | null {
  if (param === undefined) return 'en'
  return (PREFIXED_LOCALES as readonly string[]).includes(param) ? (param as Locale) : null
}
