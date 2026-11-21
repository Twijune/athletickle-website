// Run after prerendering: node scripts/generate-statichost-routing.mjs
import { readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '../dist')
const files = await readdir(dist, { recursive: true })
if (!files.includes('index.html')) {
  throw new Error('Build the site before generating Statichost routing rules.')
}

const routes = files
  .filter((file) => file.endsWith('/index.html'))
  .sort()
  .map((file) => `/${file.slice(0, -'/index.html'.length)}`)

// Force both rules ahead of static-file handling so directory URLs do not
// acquire trailing slashes. Blog language switching expects slash-free URLs.
// Only match prerendered pages; unknown paths retain the host's real 404.
const rules = routes.flatMap((route) => [
  `${route}/ ${route} 308!`,
  `${route} ${route}/index.html 200!`,
])

await writeFile(resolve(dist, '_redirects'), `${rules.join('\n')}\n`)
console.log(`Generated ${rules.length} Statichost routing rules for ${routes.length} pages.`)
