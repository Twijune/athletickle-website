import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { LOCALES, type Locale } from './i18n/translations'
import { getAllSlugs, getPost } from './blog/posts'
import {
  blogIndexMeta,
  blogPostMeta,
  contactMeta,
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

export function render(url: string, locale: Locale): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App initialLocale={locale} />
      </StaticRouter>
    </StrictMode>,
  )
}

export function getStaticRoutes(): StaticRoute[] {
  const routes: StaticRoute[] = []
  const add = (meta: PageMeta, includeInSitemap: boolean, lastmod?: string) => {
    routes.push({
      path: meta.path,
      locale: meta.locale,
      head: renderHead(meta),
      lastmod,
      alternates: meta.alternates,
      includeInSitemap,
    })
  }

  add(landingMeta(), true)
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
  add(notFoundMeta(), false)
  return routes
}
