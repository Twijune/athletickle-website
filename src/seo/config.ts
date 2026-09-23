// Production origin used for canonical URLs, hreflang, OG tags, and the
// sitemap. Override per deployment with VITE_SITE_URL; update the fallback
// once the real domain is live.
export const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://athletickle.com'

export const SITE_NAME = 'Athletickle'

// Dedicated 1200×630 brand card; product pages have their own variants.
export const DEFAULT_OG_IMAGE = '/social/athletickle.png'
