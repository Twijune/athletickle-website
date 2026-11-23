# Athletickle website

React + TypeScript + Vite marketing site for Athletickle Parkour and Athletickle Strength.

## Local development

Install dependencies using the existing `bun.lock`, then run `bun run dev`.

- `bun run build`: type-check, client build, server build and prerendering.
- `bun run lint`: ESLint.
- `node scripts/check-marketing.mjs`: check built landing pages, CTAs, metadata, sitemap and social images.
- `bun run preview`: inspect the production build locally.

The build requires Bun for `scripts/prerender.ts`. That script can also run directly with a Node version supporting TypeScript stripping (tested with Node 26), after the client and SSR builds.

## Statichost deployment

[`statichost.yml`](statichost.yml) defines the production build: Node 24, Bun 1.3.14, dependencies from `bun.lock`, and output in `dist`. Statichost reads this configuration from the repository instead of relying on the dashboard's build command.

After prerendering, [`scripts/generate-statichost-routing.mjs`](scripts/generate-statichost-routing.mjs) generates `dist/_redirects` from the built pages. It preserves slash-free URLs with forced 308 redirects and 200 rewrites, including nested translated blog routes. Unknown URLs still use `404.html` with a 404 status. The current trailing-slash redirects drop query strings on Statichost.

Production remains indexable: this configuration does not add the test site's `X-Robots-Tag: noindex, nofollow` header. Custom domains are managed in Statichost's domain settings, separately from the build configuration.

## Marketing surfaces

- `/`, `/parkour`, `/strength`: homepage and app pages in English, with French, German and Spanish versions at `/fr`, `/de/parkour`, `/es/strength` and so on. Each version is its own prerendered URL, linked to the others by hreflang. The URL decides the language: a visitor is sent from an English URL to a translated one only if they chose that language in the switcher, never because of the browser language.
- `/about`: English founder page.
- `/blog`, `/fr/blog`, `/de/blog`, `/es/blog`: existing training content.
- `/contact`, `/privacy`, `/terms`: company/legal pages. `/fi/terms` and `/fi/privacy` are the Finnish legal pages.
  The legal text is the apps' own: `node scripts/sync-legal.mjs` copies Athletickle PK's `legal.ts`, `legal.fi.ts` and
  `company.ts` into `src/data/` (Terms §4 adds STR's risk text in `src/data/legal/site.ts`). Edit the apps, never the copies.
- `/exercises/<slug>`: one unlisted demo page per filmed exercise (noindex, no sitemap entry, no index page, not linked from the site). Data comes from both apps' `exercises.json` through `node scripts/sync-exercises.ts` (or Bun); re-run it when either app's exercise list changes and commit `src/data/exercises.json`. Each page embeds only its own entry, so the full list never ships to the browser; `check-marketing.mjs` enforces all of this.

Shared product facts and the Discord invitation live in `src/data/marketing.ts`. Homepage copy lives in `src/i18n/marketingCopy.ts` and app-page copy in `src/i18n/editionCopy/`, one file per language. English is the source: change a product claim in `src/data/marketing.ts` first, then bring every translation into line, or the translated pages will state something the English page no longer does. The shared navigation/blog labels remain in `src/i18n/translations.ts`. Add public routes to both App and the prerender route list so direct links, crawlers and the sitemap stay aligned.

Generate social preview cards with `python3 scripts/social-cards.py` (Pillow and Liberation Sans required). They are deterministic typography, not AI-generated app screens.

## Launch kit

Start with [docs/marketing/README.md](docs/marketing/README.md). It includes source-backed claims, Discord copy, creator briefs, store copy, content drafts, measurement sheets and release checks.

Athletickle Parkour and Athletickle Strength are available on Android via Google Play. Strength’s public listing was verified on 13 November 2026 for Finland and the US. The website uses labelled roadmap illustrations pending real release-build captures. Deployment, Discord setup and external outreach are separate operational steps.
