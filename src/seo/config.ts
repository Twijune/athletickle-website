// Production origin used for canonical URLs, hreflang, OG tags, and the
// sitemap. Override per deployment with VITE_SITE_URL; update the fallback
// once the real domain is live.
export const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://athletickle.com'

export const SITE_NAME = 'Athletickle'

// Social preview fallback; replace with a dedicated 1200x630 OG image later.
export const DEFAULT_OG_IMAGE = '/logo_preview.png'
