// Run after the production build: node scripts/check-marketing.mjs
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
const root = resolve(import.meta.dirname, '..')
const sitemap = await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8')
const pages = ['', 'parkour', 'strength', 'about']
for (const path of pages) {
  const html = await readFile(resolve(root, 'dist', path, 'index.html'), 'utf8')
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: one H1`)
  assert.match(html, /href="https:\/\/discord.gg\/PrXwF4QSuf"/, `${path}: Discord CTA`)
  assert.match(html, /rel="canonical"/, `${path}: canonical`)
  assert.match(html, /property="og:image" content="[^\"]+\/social\//, `${path}: dedicated preview`)
  assert.ok(sitemap.includes(`/${path}</loc>`), `${path}: sitemap entry`)
  assert.doesNotMatch(html, /createprog_snip|previewofprogram|Join thousands|COMING LATER|no more plateaus/i)
  // Every public local image referenced in the rendered page exists.
  for (const [, src] of html.matchAll(/<img[^>]+src="(\/[^\"]+)"/g)) {
    assert.ok((await stat(resolve(root, 'dist', src.slice(1)))).isFile(), src)
  }
  const preview = html.match(/property="og:image" content="https?:\/\/[^/]+([^\"]+)"/)[1]
  const bytes = await readFile(resolve(root, 'dist', preview.slice(1)))
  assert.equal(bytes.subarray(1,4).toString(), 'PNG')
  assert.equal(bytes.readUInt32BE(16), 1200)
  assert.equal(bytes.readUInt32BE(20), 630)
}
const strength = await readFile(resolve(root, 'dist/strength/index.html'), 'utf8')
const parkour = await readFile(resolve(root, 'dist/parkour/index.html'), 'utf8')
assert.match(strength, /two full-body sessions/i)
assert.match(parkour, /currently only in Athletickle Strength/)
assert.match(strength, /21-day/)
assert.match(parkour, /21-day/)
// Exercise demo pages are unlisted: every one is prerendered with its clip,
// carries noindex and no canonical, stays out of the sitemap, and nothing
// lists them. The browser bundle must not ship the full list.
const exercises = JSON.parse(await readFile(resolve(root, 'src/data/exercises.json'), 'utf8'))
assert.ok(exercises.length > 250, 'exercise pages generated')
for (const exercise of exercises) {
  const path = `exercises/${exercise.slug}`
  const html = await readFile(resolve(root, 'dist', path, 'index.html'), 'utf8')
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: one H1`)
  assert.match(html, /<meta name="robots" content="noindex" \/>/, `${path}: noindex`)
  assert.doesNotMatch(html, /rel="canonical"/, `${path}: no canonical next to noindex`)
  assert.ok(html.includes(`src="${exercise.video}"`), `${path}: plays its clip`)
  assert.ok(html.includes(`property="og:image" content="${exercise.poster}"`), `${path}: poster preview`)
  assert.ok(html.includes('id="exercise-data"'), `${path}: embedded entry for hydration`)
  assert.ok(!sitemap.includes(`/${path}<`), `${path}: not in the sitemap`)
}
await assert.rejects(stat(resolve(root, 'dist/exercises/index.html')), 'no /exercises listing')
const { readdir } = await import('node:fs/promises')
for (const file of await readdir(resolve(root, 'dist/assets'))) {
  if (!file.endsWith('.js')) continue
  const js = await readFile(resolve(root, 'dist/assets', file), 'utf8')
  assert.ok(!js.includes('b-cdn.net/'), `${file}: ships clip URLs (the exercise list leaked into the bundle)`)
}
const vercel = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'))
assert.ok(
  vercel.headers.some((rule) => rule.source === '/exercises/(.*)' && rule.headers.some((h) => h.key === 'X-Robots-Tag' && h.value === 'noindex')),
  'X-Robots-Tag noindex header on /exercises/',
)

console.log(`Marketing smoke checks passed: 4 routes, metadata, sitemap, CTAs, images, edition boundaries; ${exercises.length} unlisted exercise pages.`)
