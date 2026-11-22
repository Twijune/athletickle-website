import LegalPage from '../components/LegalPage'
import type { SiteLang } from '../data/legal/site'
import { termsMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// NOTE: This document is a starting template and is NOT legal advice — have a lawyer
// review it, especially the injury/liability clauses (§§3–7), the narrow
// indemnity (§11) and the subscription/withdrawal terms (§8), and the Finnish
// version, before relying on it.
//
// The text is the apps' own (src/data/legal/app.ts + app.fi.ts, synced from
// Athletickle PK by scripts/sync-legal.mjs): edit it in the apps, bump
// LEGAL_UPDATED in their company.ts, and re-run the script. The one deliberate
// difference is §4, the union of both editions' risk text (src/data/legal/site.ts).
// Served at /terms (English) and /fi/terms (Finnish).

export default function Terms({ lang = 'en' }: { lang?: SiteLang }) {
  useHead(termsMeta(lang))
  return <LegalPage id="terms" lang={lang} />
}
