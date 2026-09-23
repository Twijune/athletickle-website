# Local validation — 23 September 2026

- TypeScript project build: passed.
- ESLint: passed, no warnings/errors.
- Vite client and server builds plus prerendering: passed; 21 routes generated.
- Static marketing checks: four routes, single H1, canonical metadata, sitemap inclusion, Discord CTA, local images and 1200×630 PNG social cards passed.
- Chromium at 1440px and 390px: homepage, Parkour, Strength and founder pages rendered with no horizontal overflow or runtime exceptions.
- Homepage EN/FR/DE/ES copy checked at 390px; mobile menu navigation and Escape dismissal checked.
- Public Discord invite resolves to Athletickle / gathering-place and has no expiry. No account joined and no message was sent.

Build emits Vite's advisory that the shared client bundle exceeds 500 kB. This is not a build failure; existing blog/Markdown/navigation dependencies remain in the bundle. No dependency or bundler configuration changes were made for this marketing work.

Not verified: real-device app screens, store purchases, test-build distribution, Discord new-member permissions, human comprehension testing, founder portrait, named endorsements or training outcomes. These are captured in RELEASE-CHECKLIST.md.
