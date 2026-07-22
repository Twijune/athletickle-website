import { useEffect } from 'react'
import { canonicalUrl, type PageMeta } from './meta'

function upsertDescription(content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.name = 'description'
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

// Keeps title/description/canonical current across SPA navigation. Crawlers
// get the full tag set from the prerendered HTML (see seo/meta.ts renderHead).
export function useHead(meta: PageMeta | null): void {
  useEffect(() => {
    if (!meta) return
    document.title = meta.title
    upsertDescription(meta.description)
    if (meta.noindex) {
      // noindex pages must not carry a canonical (conflicting signals)
      document.head.querySelector('link[rel="canonical"]')?.remove()
    } else {
      upsertCanonical(canonicalUrl(meta))
    }
  }, [meta])
}
