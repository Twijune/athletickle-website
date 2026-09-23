# Athletickle website

React + TypeScript + Vite marketing site for Athletickle Parkour and Athletickle Strength.

## Local development

Install dependencies using the existing `bun.lock`, then run `bun run dev`.

- `bun run build`: type-check, client build, server build and prerendering.
- `bun run lint`: ESLint.
- `node scripts/check-marketing.mjs`: check built landing pages, CTAs, metadata, sitemap and social images.
- `bun run preview`: inspect the production build locally.

The build requires Bun for `scripts/prerender.ts`. That script can also run directly with a Node version supporting TypeScript stripping (tested with Node 26), after the client and SSR builds.

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
