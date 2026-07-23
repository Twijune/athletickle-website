import type { Locale } from '../i18n/translations'
import { blogAlternates, blogPath, type Alternate } from '../blog/paths'
import { getPostLocales, type Post } from '../blog/posts'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './config'

export type { Alternate }

export interface PageMeta {
  title: string
  description: string
  path: string
  locale: Locale
  ogType: 'website' | 'article'
  ogImage: string
  publishedTime?: string
  alternates?: Alternate[]
  jsonLd?: Record<string, unknown>[]
  noindex?: boolean
}

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
}

const LANDING_DESCRIPTION =
  'Athletickle is a strength training app with algorithm-driven periodization: adaptive programming, fatigue detection, and 500+ exercises. Start with a free trial.'

const BLOG_INDEX_COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Training intel from Athletickle: evidence-based guides on periodization, progressive overload, RIR, and smarter strength programming.',
  },
  fr: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Intel entraînement par Athletickle : guides fondés sur la science — périodisation, surcharge progressive, RIR et programmation intelligente.",
  },
  de: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Trainings-Intel von Athletickle: evidenzbasierte Guides zu Periodisierung, progressiver Steigerung, RIR und intelligenter Trainingsplanung.',
  },
  es: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Intel de entrenamiento de Athletickle: guías basadas en evidencia sobre periodización, sobrecarga progresiva, RIR y programación inteligente.',
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
}

export function landingMeta(): PageMeta {
  return {
    title: `${SITE_NAME} — Algorithm-Driven Strength Training`,
    description: LANDING_DESCRIPTION,
    path: '/',
    locale: 'en',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [
      { '@context': 'https://schema.org', ...ORGANIZATION_JSON_LD },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
    ],
  }
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
    alternates: blogAlternates(post.slug, getPostLocales(post.slug)),
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: post.lang,
        image: `${SITE_URL}${post.cover ?? DEFAULT_OG_IMAGE}`,
        mainEntityOfPage: `${SITE_URL}${path}`,
        author: ORGANIZATION_JSON_LD,
        publisher: ORGANIZATION_JSON_LD,
      },
    ],
  }
}

// Legal/contact pages are English-only canonical pages (no hreflang alternates).
export function termsMeta(): PageMeta {
  return {
    title: `Terms of Use & EULA | ${SITE_NAME}`,
    description:
      'Athletickle Terms of Use and End User License Agreement, including the health disclaimer and assumption-of-risk terms for training with the app.',
    path: '/terms',
    locale: 'en',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
  }
}

export function privacyMeta(): PageMeta {
  return {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'How Athletickle handles your data. Full privacy policy published ahead of launch.',
    path: '/privacy',
    locale: 'en',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
  }
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
  const image = `${SITE_URL}${meta.ogImage}`
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
    `<meta property="og:locale" content="${OG_LOCALE[meta.locale]}" />`,
  )
  if (meta.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${meta.publishedTime}" />`)
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
