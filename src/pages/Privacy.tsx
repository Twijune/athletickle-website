import LegalPage from '../components/LegalPage'
import type { SiteLang } from '../data/legal/site'
import { privacyMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// NOTE: This document is a starting template and is NOT legal advice — have a lawyer
// review it before relying on it, especially the international-transfers section
// and the Finnish version.
//
// Open items:
//  - Sign a Data Processing Agreement (DPA) with Glyphex and confirm the region
//    they host/process in, then complete the "International transfers" section.
//  - The "the app collects nothing off-device" claim (§3/§6) is accurate today
//    (fully local, no crash/push/in-app-analytics SDKs). Re-check it if any SDK
//    that sends data off the device is ever added. The exercise-video download
//    (§4, bunny.net, played in-app since 2 Nov 2026) is the one request the app
//    makes besides the stores' purchase checks.
//  - Accept bunny.net's DPA (dashboard → Account → Data Processing Agreement):
//    §4 calls Bunny our processor.
//
// The text is the apps' own (src/data/legal/app.ts + app.fi.ts, synced from
// Athletickle PK by scripts/sync-legal.mjs): edit it in the apps and re-run the
// script. Served at /privacy (English) and /fi/privacy (Finnish).

export default function Privacy({ lang = 'en' }: { lang?: SiteLang }) {
  useHead(privacyMeta(lang))
  return <LegalPage id="privacy" lang={lang} />
}
