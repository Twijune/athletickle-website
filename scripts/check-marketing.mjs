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
assert.match(parkour, /currently belong to Athletickle Strength/)
assert.match(strength, /21-day/)
assert.match(parkour, /21-day/)
console.log('Marketing smoke checks passed: 4 routes, metadata, sitemap, CTAs, images, edition boundaries.')
