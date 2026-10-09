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

- `/`: localized EN/FR/DE/ES homepage.
- `/parkour`, `/strength`, `/about`: English product and founder pages.
- `/blog`, `/fr/blog`, `/de/blog`, `/es/blog`: existing training content.
- `/contact`, `/privacy`, `/terms`: existing company/legal pages.

Shared product facts and the Discord invitation live in `src/data/marketing.ts`. Homepage copy lives in `src/i18n/marketingCopy.ts`; shared navigation/blog labels remain in `src/i18n/translations.ts`. Add public routes to both App and the prerender route list so direct links, crawlers and the sitemap stay aligned.

Generate social preview cards with `python3 scripts/social-cards.py` (Pillow and Liberation Sans required). They are deterministic typography, not AI-generated app screens.

## Launch kit

Start with [docs/marketing/README.md](docs/marketing/README.md). It includes source-backed claims, Discord copy, creator briefs, store copy, content drafts, measurement sheets and release checks.

Both apps are pre-launch. The website uses labelled roadmap illustrations pending real release-build captures. Deployment, Discord setup and external outreach are separate operational steps.
