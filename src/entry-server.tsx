import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { LOCALES, type Locale } from './i18n/translations'
import { getAllSlugs, getPost } from './blog/posts'
import exercises from './data/exercises.json'
import {
  embedExercise,
  exerciseSlugFromPath,
  type ExerciseEntry,
} from './exercises/exercise'
import {
  aboutMeta,
  editionMeta,
  blogIndexMeta,
  blogPostMeta,
  contactMeta,
  exerciseMeta,
  landingMeta,
  notFoundMeta,
  privacyMeta,
  renderHead,
  termsMeta,
  type Alternate,
  type PageMeta,
} from './seo/meta'

export { SITE_URL } from './seo/config'

export interface StaticRoute {
  path: string
  locale: Locale
  head: string
  lastmod?: string
  alternates?: Alternate[]
  includeInSitemap: boolean
}

// The SSR bundle is the only place the full exercise list is imported; it is
// a build intermediate and never deployed (see exercises/exercise.ts).
const EXERCISES = exercises as ExerciseEntry[]

function exerciseFor(url: string): ExerciseEntry | null {
  const slug = exerciseSlugFromPath(url)
  return EXERCISES.find((exercise) => exercise.slug === slug) ?? null
}

export function render(url: string, locale: Locale): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App initialLocale={locale} exercise={exerciseFor(url)} />
      </StaticRouter>
    </StrictMode>,
  )
}

export function getStaticRoutes(): StaticRoute[] {
  const routes: StaticRoute[] = []
  const add = (meta: PageMeta, includeInSitemap: boolean, lastmod?: string, extraHead?: string) => {
    routes.push({
      path: meta.path,
      locale: meta.locale,
      head: extraHead ? `${renderHead(meta)}\n    ${extraHead}` : renderHead(meta),
      lastmod,
      alternates: meta.alternates,
      includeInSitemap,
    })
  }

  add(landingMeta(), true)
  add(editionMeta('parkour'), true)
  add(editionMeta('strength'), true)
  add(aboutMeta(), true)
  for (const locale of LOCALES) add(blogIndexMeta(locale), true)
  for (const slug of getAllSlugs()) {
    for (const locale of LOCALES) {
      const post = getPost(locale, slug)
      if (post) add(blogPostMeta(post), true, post.date)
    }
  }
  add(termsMeta(), true)
  add(privacyMeta(), true)
  add(contactMeta(), true)
  // Unlisted: noindex and kept out of the sitemap. robots.txt still allows
  // them, because a crawler has to fetch a page to see its noindex.
  for (const exercise of EXERCISES) add(exerciseMeta(exercise), false, undefined, embedExercise(exercise))
  add(notFoundMeta(), false)
  return routes
}
