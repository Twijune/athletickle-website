import { load } from 'js-yaml'
import { LOCALES, type Locale } from '../i18n/translations'

export interface PostMeta {
  title: string
  description: string
  date: string
  /** Optional YYYY-MM-DD of the last substantive edit; never earlier than `date`. */
  updated?: string
  slug: string
  lang: Locale
  tags: string[]
  cover?: string
}

export interface Post extends PostMeta {
  body: string
}

// Raw markdown, bundled at build time. Works identically in the client and
// SSR bundles, so the prerendered HTML and the hydrated app agree.
const files = import.meta.glob('../content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const PATH_RE = /content\/blog\/([^/]+)\/([a-z]{2})\.md$/
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

function requireString(data: Record<string, unknown>, field: string, file: string): string {
  const value = data[field]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Blog post ${file}: frontmatter field "${field}" must be a non-empty string`)
  }
  return value
}

function parsePost(file: string, raw: string): Post & { draft: boolean } {
  const pathMatch = file.match(PATH_RE)
  if (!pathMatch) {
    throw new Error(`Blog post ${file}: expected path content/blog/<slug>/<lang>.md`)
  }
  const [, dirSlug, fileLang] = pathMatch

  const fmMatch = raw.match(FRONTMATTER_RE)
  if (!fmMatch) throw new Error(`Blog post ${file}: missing "---" frontmatter block`)
  const data = load(fmMatch[1]) as Record<string, unknown>

  const slug = requireString(data, 'slug', file)
  const lang = data.lang
  if (slug !== dirSlug) {
    throw new Error(`Blog post ${file}: slug "${slug}" must match its directory "${dirSlug}"`)
  }
  if (!isLocale(lang) || lang !== fileLang) {
    throw new Error(`Blog post ${file}: lang must match the filename and be one of ${LOCALES.join(', ')}`)
  }

  const date = requireString(data, 'date', file)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Blog post ${file}: date must be YYYY-MM-DD`)
  }

  const updated = data.updated
  if (updated !== undefined && (typeof updated !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(updated) || updated < date)) {
    throw new Error(`Blog post ${file}: updated must be YYYY-MM-DD and not earlier than date`)
  }

  return {
    title: requireString(data, 'title', file),
    description: requireString(data, 'description', file),
    date,
    updated,
    slug,
    lang,
    tags: Array.isArray(data.tags) ? data.tags.filter((t): t is string => typeof t === 'string') : [],
    cover: typeof data.cover === 'string' ? data.cover : undefined,
    draft: data.draft === true,
    body: raw.slice(fmMatch[0].length),
  }
}

const allPosts = Object.entries(files)
  .map(([file, raw]) => parsePost(file, raw))
  .filter((post) => !post.draft)

// Posts are English-first: every post must have an English (en) version, which
// is the canonical/x-default base. Other locales are optional — a post may ship
// English-only. Per-post hreflang alternates are trimmed to the locales that
// actually exist (see blogAlternates + getPostLocales), so they never 404.
const bySlug = new Map<string, Map<Locale, Post>>()
for (const post of allPosts) {
  const variants = bySlug.get(post.slug) ?? new Map<Locale, Post>()
  if (variants.has(post.lang)) {
    throw new Error(`Blog post ${post.slug}: duplicate ${post.lang} version`)
  }
  variants.set(post.lang, post)
  bySlug.set(post.slug, variants)
}
for (const [slug, variants] of bySlug) {
  if (!variants.has('en')) {
    throw new Error(`Blog post ${slug}: an English (en) version is required`)
  }
}

// A published post must not link to a blog post that isn't published (still a
// draft, or a slug that doesn't exist): the link would 404 on the live site.
// Failing here stops the build, so posts that link to each other have to be
// published together or in dependency order.
const BLOG_LINK_RE = /\]\(\/(?:([a-z]{2})\/)?blog\/([a-z0-9-]+)(?=[)#?])/g
for (const post of allPosts) {
  for (const [, lang = 'en', slug] of post.body.matchAll(BLOG_LINK_RE)) {
    if (!bySlug.get(slug)?.has(lang as Locale)) {
      throw new Error(
        `Blog post ${post.slug} (${post.lang}): links to /blog/${slug}, which is not a published ${lang} post`,
      )
    }
  }
}

export function getPosts(lang: Locale): Post[] {
  return allPosts
    .filter((post) => post.lang === lang)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(lang: Locale, slug: string): Post | undefined {
  return bySlug.get(slug)?.get(lang)
}

export function getAllSlugs(): string[] {
  return [...bySlug.keys()]
}

// Locales a given post actually has, in LOCALES order. Used to build hreflang
// alternates that only point at pages that exist.
export function getPostLocales(slug: string): Locale[] {
  const variants = bySlug.get(slug)
  return variants ? LOCALES.filter((locale) => variants.has(locale)) : []
}
