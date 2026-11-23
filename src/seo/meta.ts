import {
  DISCORD_URL,
  FOUNDER_NAME,
  PARKOUR_PLAY_URL,
  STRENGTH_PLAY_URL,
  editions,
  type Edition,
} from '../data/marketing'
import type { Locale } from '../i18n/translations'
import { blogAlternates, blogPath, pageAlternates, pagePath, type Alternate } from '../blog/paths'
import { getPostLocales, type Post } from '../blog/posts'
import { exercisePath, type ExerciseEntry } from '../exercises/exercise'
import { editionCopy } from '../i18n/editionCopy'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './config'

export type { Alternate }

export interface PageMeta {
  title: string
  description: string
  path: string
  locale: Locale
  ogType: 'website' | 'article'
  /** Site path, or an absolute URL for an image hosted elsewhere. */
  ogImage: string
  publishedTime?: string
  modifiedTime?: string
  alternates?: Alternate[]
  jsonLd?: Record<string, unknown>[]
  noindex?: boolean
  /** Language of the page content when it is not a site locale (the Finnish legal pages). */
  contentLang?: 'fi'
}

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
  pt: 'pt_BR',
}

const BLOG_INDEX_COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Training intel from Athletickle: evidence-based guides on progressive overload, RIR, and smarter strength programming.',
  },
  fr: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Intel entraînement par Athletickle : guides fondés sur la science — surcharge progressive, RIR et programmation intelligente.",
  },
  de: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Trainings-Intel von Athletickle: evidenzbasierte Guides zu progressiver Steigerung, RIR und intelligenter Trainingsplanung.',
  },
  es: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Intel de entrenamiento de Athletickle: guías basadas en evidencia sobre sobrecarga progresiva, RIR y programación inteligente.',
  },
  pt: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Intel de treino da Athletickle: guias baseados em evidências sobre sobrecarga progressiva, RIR e uma programação de força mais inteligente.',
  },
}

const ORGANIZATION_JSON_LD = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/athletickle-favicon-256.png`,
  },
  // Ties the brand name to its store listings and community for search engines.
  sameAs: [PARKOUR_PLAY_URL, STRENGTH_PLAY_URL, DISCORD_URL],
}

// Blog author: the founder, whose credentials are on /about.
const AUTHOR_JSON_LD = {
  '@type': 'Person',
  name: FOUNDER_NAME,
  url: `${SITE_URL}/about`,
  jobTitle: 'Exercise physiologist',
  worksFor: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
}

const PLAY_URL: Record<Edition, string> = {
  parkour: PARKOUR_PLAY_URL,
  strength: STRENGTH_PLAY_URL,
}

// The landing and app pages exist per locale (/, /fr, /de/parkour…), linked
// by hreflang; their text lives in i18n/editionCopy.
export function landingMeta(locale: Locale = 'en'): PageMeta {
  return {
    title: editionCopy[locale].landingTitle,
    description: editionCopy[locale].landingDescription,
    path: pagePath(locale, '/'),
    locale,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    alternates: pageAlternates('/'),
    jsonLd: [
      { '@context': 'https://schema.org', ...ORGANIZATION_JSON_LD },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
    ],
  }
}

export function editionMeta(edition: Edition, locale: Locale = 'en'): PageMeta {
  const copy = editionCopy[locale]
  return {
    title: `${editions[edition].name} | ${copy.metaTitleTail}`,
    description: `${copy.editions[edition].short} ${copy.metaDescriptionTail}`,
    path: pagePath(locale, `/${edition}`),
    locale,
    ogType: 'website',
    ogImage: `/social/${edition}.png`,
    alternates: pageAlternates(`/${edition}`),
    jsonLd: [editionJsonLd(edition, locale)],
  }
}

// The app is free to install; later blocks are an in-app subscription whose
// price is shown only in the store, so the offer carries the install price.
function editionJsonLd(edition: Edition, locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: editions[edition].name,
    description: editionCopy[locale].editions[edition].short,
    url: `${SITE_URL}${pagePath(locale, `/${edition}`)}`,
    image: `${SITE_URL}/social/${edition}.png`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android',
    installUrl: PLAY_URL[edition],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: ORGANIZATION_JSON_LD,
  }
}

export function aboutMeta(): PageMeta {
  return { title: `Mika — Founder of Athletickle | ${SITE_NAME}`, description: 'Meet Mika, founder of Athletickle and exercise physiologist (MSc). Parkour athlete since 2005, coach since 2006, and co-founder of Athletica.', path: '/about', locale: 'en', ogType: 'website', ogImage: '/social/about.png' }
}

export function blogIndexMeta(locale: Locale): PageMeta {
  return {
    ...BLOG_INDEX_COPY[locale],
    path: blogPath(locale),
    locale,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    alternates: blogAlternates(),
  }
}

export function blogPostMeta(post: Post): PageMeta {
  const path = blogPath(post.lang, post.slug)
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    path,
    locale: post.lang,
    ogType: 'article',
    ogImage: post.cover ?? DEFAULT_OG_IMAGE,
    // full ISO datetime — the OG spec expects a datetime, not a bare date
    publishedTime: `${post.date}T00:00:00Z`,
    ...(post.updated ? { modifiedTime: `${post.updated}T00:00:00Z` } : {}),
    alternates: blogAlternates(post.slug, getPostLocales(post.slug)),
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: post.lang,
        image: `${SITE_URL}${post.cover ?? DEFAULT_OG_IMAGE}`,
        mainEntityOfPage: `${SITE_URL}${path}`,
        author: AUTHOR_JSON_LD,
        publisher: ORGANIZATION_JSON_LD,
      },
    ],
  }
}

// The legal pages exist in English (/terms, /privacy) and Finnish (/fi/terms,
// /fi/privacy), each pair linked by hreflang. The Finnish pages keep the 'en'
// site locale for the chrome; contentLang makes them lang="fi". Contact is
// English-only.
function legalMeta(
  id: 'terms' | 'privacy',
  lang: 'en' | 'fi',
  copy: Record<'en' | 'fi', { title: string; description: string }>,
): PageMeta {
  return {
    title: `${copy[lang].title} | ${SITE_NAME}`,
    description: copy[lang].description,
    path: lang === 'fi' ? `/fi/${id}` : `/${id}`,
    locale: 'en',
    ...(lang === 'fi' ? { contentLang: 'fi' as const } : {}),
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    alternates: [
      { hreflang: 'en', path: `/${id}` },
      { hreflang: 'fi', path: `/fi/${id}` },
      { hreflang: 'x-default', path: `/${id}` },
    ],
  }
}

export function termsMeta(lang: 'en' | 'fi' = 'en'): PageMeta {
  return legalMeta('terms', lang, {
    en: {
      title: 'Terms of Use & EULA',
      description:
        'Athletickle Terms of Use and End User License Agreement, including the health disclaimer and assumption-of-risk terms for training with the app.',
    },
    fi: {
      title: 'Käyttöehdot ja käyttöoikeussopimus',
      description:
        'Athleticklen käyttöehdot ja käyttöoikeussopimus, mukaan lukien terveyttä koskeva vastuuvapauslauseke ja sovelluksella harjoitteluun liittyvien riskien hyväksyminen.',
    },
  })
}

export function privacyMeta(lang: 'en' | 'fi' = 'en'): PageMeta {
  return legalMeta('privacy', lang, {
    en: {
      title: 'Privacy Policy',
      description:
        'How Athletickle handles your data: what stays on your phone, what the website measures, and who delivers the exercise videos.',
    },
    fi: {
      title: 'Tietosuojaseloste',
      description:
        'Miten Athletickle käsittelee tietojasi: mikä pysyy puhelimessasi, mitä verkkosivusto mittaa ja kuka toimittaa harjoitusvideot.',
    },
  })
}

export function contactMeta(): PageMeta {
  return {
    title: `Contact | ${SITE_NAME}`,
    description: 'Get in touch with the Athletickle team on Discord or by email.',
    path: '/contact',
    locale: 'en',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
  }
}

// Unlisted (see exercises/exercise.ts): noindex, but the share preview still
// shows the clip's poster frame when someone sends the link.
export function exerciseMeta(exercise: ExerciseEntry): PageMeta {
  const apps = exercise.editions.map((edition) => editions[edition].name).join(' and ')
  return {
    title: `${exercise.name} — Exercise demo | ${SITE_NAME}`,
    description: `Demonstration clip of ${exercise.name}, from ${apps}.`,
    path: exercisePath(exercise.slug),
    locale: 'en',
    ogType: 'website',
    ogImage: exercise.poster,
    noindex: true,
  }
}

export function notFoundMeta(): PageMeta {
  return {
    title: `404 | ${SITE_NAME}`,
    description: 'Page not found.',
    path: '/404',
    locale: 'en',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    noindex: true,
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function canonicalUrl(meta: PageMeta): string {
  return `${SITE_URL}${meta.path}`
}

// Static <head> markup injected by scripts/prerender.ts — this is what
// crawlers see. useHead() keeps the client in sync during SPA navigation.
export function renderHead(meta: PageMeta): string {
  const url = canonicalUrl(meta)
  const image = /^https?:\/\//.test(meta.ogImage) ? meta.ogImage : `${SITE_URL}${meta.ogImage}`
  const tags: string[] = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  ]
  // Google: never combine noindex with rel=canonical — the signals conflict
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" />')
  else tags.push(`<link rel="canonical" href="${url}" />`)
  for (const alt of meta.alternates ?? []) {
    tags.push(`<link rel="alternate" hreflang="${alt.hreflang}" href="${SITE_URL}${alt.path}" />`)
  }
  tags.push(
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="${meta.contentLang === 'fi' ? 'fi_FI' : OG_LOCALE[meta.locale]}" />`,
  )
  if (meta.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${meta.publishedTime}" />`)
  }
  if (meta.modifiedTime) {
    tags.push(`<meta property="article:modified_time" content="${meta.modifiedTime}" />`)
  }
  tags.push(
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  )
  for (const jsonLd of meta.jsonLd ?? []) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('</', '<\\/')}</script>`,
    )
  }
  return tags.join('\n    ')
}
