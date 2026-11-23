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
// Legal pages: English and Finnish versions of the apps' own documents
// (src/data/legal), paired by hreflang, without the email in the static HTML.
for (const [path, lang] of [['terms', 'en'], ['privacy', 'en'], ['fi/terms', 'fi'], ['fi/privacy', 'fi']]) {
  const html = await readFile(resolve(root, 'dist', path, 'index.html'), 'utf8')
  const id = path.replace('fi/', '')
  assert.match(html, new RegExp(`<html lang="${lang}"`), `${path}: html lang`)
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: one H1`)
  assert.ok(html.includes(`hreflang="en" href="https://athletickle.com/${id}"`), `${path}: hreflang en`)
  assert.ok(html.includes(`hreflang="fi" href="https://athletickle.com/fi/${id}"`), `${path}: hreflang fi`)
  assert.ok(sitemap.includes(`/${path}</loc>`), `${path}: sitemap entry`)
  assert.doesNotMatch(html, /info@athletickle\.com/, `${path}: email stays out of the static HTML`)
  assert.doesNotMatch(html, /English version governs|englanninkielinen versio/i, `${path}: no "English governs"`)
  assert.match(html, lang === 'fi' ? /edullisempaa tulkintaa/ : /more favourable to you applies/, `${path}: language clause`)
}
for (const [path, union] of [['terms', /parkour, climbing, snowboarding and surfing/], ['fi/terms', /ballistinen hyppyharjoittelu/]]) {
  const html = await readFile(resolve(root, 'dist', path, 'index.html'), 'utf8')
  assert.match(html, union, `${path}: §4 covers both editions`)
  assert.match(html, /safety pins|turvatankoja/, `${path}: STR heavy-load bullet`)
}
// Translated landing and app pages: each locale has its own prerendered URL,
// linked to the others by hreflang, with a Play link and a translated hero.
const englishHero = { '': 'A training plan with a direction.', '/parkour': 'Built around your parkour.', '/strength': 'Give your strength training a direction.' }
for (const locale of ['fr', 'de', 'es', 'pt']) {
  for (const page of ['', '/parkour', '/strength']) {
    const path = `${locale}${page}`
    const html = await readFile(resolve(root, 'dist', path, 'index.html'), 'utf8')
    assert.match(html, new RegExp(`<html lang="${locale}"`), `${path}: html lang`)
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: one H1`)
    assert.ok(html.includes(`rel="canonical" href="https://athletickle.com/${path}"`), `${path}: canonical`)
    for (const alt of ['en', 'fr', 'de', 'es', 'pt']) {
      const href = `https://athletickle.com${alt === 'en' ? page || '/' : `/${alt}${page}`}`
      assert.ok(html.includes(`hreflang="${alt}" href="${href}"`), `${path}: hreflang ${alt}`)
    }
    assert.ok(html.includes(`hreflang="x-default" href="https://athletickle.com${page || '/'}"`), `${path}: x-default`)
    assert.ok(sitemap.includes(`/${path}</loc>`), `${path}: sitemap entry`)
    assert.ok(html.includes('href="https://play.google.com/store/apps/details?id=com.athletickle.'), `${path}: Play link`)
    assert.ok(!html.includes(englishHero[page]), `${path}: hero is translated`)
    assert.match(html, /21/, `${path}: 21-day pacing gate stated`)
    if (page) assert.ok(html.includes(`href="/${locale}${page === '/parkour' ? '/strength' : '/parkour'}"`), `${path}: links to the other app in ${locale}`)
  }
}
// Structured data: the brand is tied to its store listings, each edition page
// describes its own app, and blog posts name the founder as author.
function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, raw]) => JSON.parse(raw))
}
const home = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const org = jsonLd(home).find((item) => item['@type'] === 'Organization')
assert.ok(org.sameAs.includes('https://play.google.com/store/apps/details?id=com.athletickle.pk'), 'Organization sameAs: Parkour listing')
assert.ok(org.sameAs.includes('https://play.google.com/store/apps/details?id=com.athletickle.str'), 'Organization sameAs: Strength listing')
const appPages = ['', 'fr/', 'de/', 'es/', 'pt/'].flatMap((prefix) => [[`${prefix}parkour`, 'com.athletickle.pk'], [`${prefix}strength`, 'com.athletickle.str']])
for (const [path, id] of appPages) {
  const html = await readFile(resolve(root, 'dist', path, 'index.html'), 'utf8')
  const app = jsonLd(html).find((item) => item['@type'] === 'SoftwareApplication')
  assert.ok(app, `${path}: SoftwareApplication markup`)
  assert.ok(app.installUrl.endsWith(`id=${id}`), `${path}: installUrl is its own listing`)
  assert.ok(html.includes(`href="${app.installUrl}"`), `${path}: installUrl matches the visible Play link`)
  assert.equal(app.url, `https://athletickle.com/${path}`, `${path}: app markup url is this page`)
}
const post = await readFile(resolve(root, 'dist/blog/rir-autoregulation/index.html'), 'utf8')
const posting = jsonLd(post).find((item) => item['@type'] === 'BlogPosting')
assert.equal(posting.author['@type'], 'Person', 'blog: author is a person')
assert.match(post, /<a[^>]+rel="author"[^>]+href="\/about"|<a[^>]+href="\/about"[^>]+rel="author"/, 'blog: visible byline links to /about')
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

console.log(`Marketing smoke checks passed: 4 routes, 12 translated pages, metadata, sitemap, CTAs, images, edition boundaries; ${exercises.length} unlisted exercise pages.`)
