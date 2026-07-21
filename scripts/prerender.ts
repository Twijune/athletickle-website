/**
 * Post-build SSG: renders every static route against the SSR bundle and
 * writes per-route HTML files plus sitemap.xml and robots.txt into dist/.
 *
 * Run with Bun (executes TS directly): `bun scripts/prerender.ts`.
 * Expects `vite build` (client → dist/) and
 * `vite build --ssr src/entry-server.tsx --outDir dist-ssr` to have run first.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

type SsrModule = typeof import('../src/entry-server')

const root = process.cwd()
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

// pathToFileURL: raw Windows paths break dynamic ESM import()
const { render, getStaticRoutes, SITE_URL } = (await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)) as unknown as SsrModule

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
if (!template.includes('<!--app-head-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> marker (see index.html)')
}
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is missing an empty <div id="root"></div>')
}

function outFile(routePath: string): string {
  if (routePath === '/') return path.join(distDir, 'index.html')
  if (routePath === '/404') return path.join(distDir, '404.html')
  return path.join(distDir, ...routePath.slice(1).split('/'), 'index.html')
}

const routes = getStaticRoutes()

for (const route of routes) {
  // React 19's renderToString emits resource-hint <link> tags inline at the
  // start of the markup; hydration then fails (#418) on the unexpected node.
  // Hoist them into <head>, where they belong anyway.
  const hints: string[] = []
  const appHtml = render(route.path, route.locale).replace(/<link\b[^>]*\/?>/g, (tag) => {
    hints.push(tag)
    return ''
  })
  // 404.html is served by static hosts for ANY unknown URL; the data-fallback
  // attribute tells main.tsx to client-render instead of hydrating a shell
  // whose locale may not match the requested URL.
  const rootAttrs = route.path === '/404' ? ' data-fallback="404"' : ''
  // function replacers: rendered HTML may contain $-sequences ($&, $', $`)
  // that String.replace would otherwise interpret as substitution patterns
  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${route.locale}"`)
    // page-specific title/description come from the injected head
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\s*?\n/, '')
    .replace(/[ \t]*<meta name="description"[^>]*>\s*?\n/, '')
    .replace('<!--app-head-->', () => [route.head, ...hints].join('\n    '))
    .replace('<div id="root"></div>', () => `<div id="root"${rootAttrs}>${appHtml}</div>`)
  const file = outFile(route.path)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
  console.log(`prerendered ${route.path} -> ${path.relative(root, file)}`)
}

// sitemap.xml with hreflang alternates
const urlEntries = routes
  .filter((route) => route.includeInSitemap)
  .map((route) => {
    const loc = `${SITE_URL}${route.path}`
    const lastmod = route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : ''
    const alternates = (route.alternates ?? [])
      .map(
        (alt) =>
          `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${SITE_URL}${alt.path}"/>`,
      )
      .join('')
    return `  <url>\n    <loc>${loc}</loc>${lastmod}${alternates}\n  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
await writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8')

// SSR bundle is a build intermediate — never ship it
await rm(ssrDir, { recursive: true, force: true })

console.log(`prerendered ${routes.length} routes, wrote sitemap.xml + robots.txt`)
