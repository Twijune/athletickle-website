import { LOCALES, type Locale } from '../i18n/translations'

// English lives at the unprefixed URLs (/blog/...); the other locales are
// path-prefixed (/fr/blog/...). x-default therefore always points at English.
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== 'en')

export function blogPath(locale: Locale, slug?: string): string {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return slug ? `${prefix}/blog/${slug}` : `${prefix}/blog`
}

// The landing page and the two app pages exist in every locale, with the same
// URL scheme as the blog: English unprefixed, the others under /<locale>.
export const LOCALIZED_PAGES = ['/', '/parkour', '/strength'] as const
export type LocalizedPage = (typeof LOCALIZED_PAGES)[number]

export function pagePath(locale: Locale, page: LocalizedPage): string {
  if (locale === 'en') return page
  return page === '/' ? `/${locale}` : `/${locale}${page}`
}

/** The localized page at `pathname` and the locale its URL pins, or null. */
export function localizedPageFromPath(pathname: string): { locale: Locale; page: LocalizedPage } | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  for (const locale of LOCALES) {
    for (const page of LOCALIZED_PAGES) {
      if (pagePath(locale, page) === clean) return { locale, page }
    }
  }
  return null
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

/** hreflang alternates for a localized page; x-default points at English. */
export function pageAlternates(page: LocalizedPage): Alternate[] {
  return [
    ...LOCALES.map((locale) => ({ hreflang: locale as string, path: pagePath(locale, page) })),
    { hreflang: 'x-default', path: pagePath('en', page) },
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
/** Content language of a page that differs from the site locales (the Finnish legal pages). */
export function contentLangFromPath(pathname: string): 'fi' | null {
  return pathname.startsWith('/fi/') ? 'fi' : null
}

export function localeFromPath(pathname: string): Locale | null {
  const page = localizedPageFromPath(pathname)
  if (page) return page.locale
  for (const locale of PREFIXED_LOCALES) {
    if (pathname === `/${locale}/blog` || pathname.startsWith(`/${locale}/blog/`)) {
      return locale
    }
  }
  if (pathname === '/blog' || pathname.startsWith('/blog/')) return 'en'
  return null
}

/** Same page under another locale (blog and localized pages; other paths unchanged). */
export function swapLocaleInPath(pathname: string, next: Locale): string {
  const page = localizedPageFromPath(pathname)
  if (page) return pagePath(next, page.page)
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
