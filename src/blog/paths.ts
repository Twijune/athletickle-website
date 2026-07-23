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

/**
 * hreflang alternates for a blog index (no slug) or post (slug) page. `locales`
 * defaults to all locales (indexes exist in every locale); pass a post's actual
 * locales so an English-only post doesn't advertise pages that 404. x-default
 * always points at English, which every post is required to have.
 */
export function blogAlternates(slug?: string, locales: readonly Locale[] = LOCALES): Alternate[] {
  return [
    ...locales.map((locale) => ({ hreflang: locale as string, path: blogPath(locale, slug) })),
    { hreflang: 'x-default', path: blogPath('en', slug) },
  ]
}

/** Slug of the blog post at `pathname`, or null if it isn't a blog post URL. */
export function blogSlugFromPath(pathname: string): string | null {
  const locale = localeFromPath(pathname)
  if (!locale) return null
  const prefix = locale === 'en' ? '/blog/' : `/${locale}/blog/`
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length) || null : null
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
