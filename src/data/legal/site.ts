import { getLegalDocument, LEGAL_LAST_UPDATED, type LegalDocument } from './app'

/**
 * The website's Terms and Privacy Policy: the apps' documents (app.ts /
 * app.fi.ts, synced from Athletickle PK by scripts/sync-legal.mjs) with one
 * deliberate difference. One page has to cover whichever app the reader has,
 * so Terms §4 is the union of both editions' risk text: PK's opening widened
 * with STR's heavy lifting, and STR's heavy-load bullet before PK's jump
 * bullet. The STR passages below are copied from STR's legal.ts / legal.fi.ts;
 * keep them in step when STR's §4 changes.
 *
 * If a sync changes PK's §4 so the patch no longer applies, this module throws
 * and the build fails, rather than publishing a half-patched section.
 */

export type SiteLegalId = 'terms' | 'privacy'
export type SiteLang = 'en' | 'fi'

const RISK_UNION: Record<SiteLang, { pkOpening: string; opening: string; pkJump: string; strBullet: string }> = {
  en: {
    pkOpening:
      'You understand that physical training — including strength training and lifestyle sports such as parkour, climbing, snowboarding, and surfing — is inherently dangerous and carries a risk of serious injury, permanent disability, or death.',
    opening:
      'You understand that physical training — including heavy resistance training such as squatting, pressing, deadlifting and Olympic lifting, the ballistic jumping work the App also prescribes, and lifestyle sports such as parkour, climbing, snowboarding and surfing — is inherently dangerous and carries a risk of serious injury, permanent disability, or death.',
    pkJump: '• Jump and impact work is prescribed',
    strBullet:
      '• Loads are prescribed close to your limit, and they go up. The App doses loaded work either by how few reps you should have left in reserve or as a percentage of your one-rep maximum, and it keeps adding load across a block. Heavy work taken near failure can fail mid-rep, and the risk rises when you are fatigued, poorly warmed up, or lifting without safety pins or a spotter.',
  },
  fi: {
    pkOpening:
      'Ymmärrät, että fyysinen harjoittelu – mukaan lukien voimaharjoittelu ja elämäntapalajit, kuten parkour, kiipeily, lumilautailu ja surffaus – on luonnostaan vaarallista, ja siihen liittyy vakavan vamman, pysyvän vammautumisen tai kuoleman riski.',
    opening:
      'Ymmärrät, että fyysinen harjoittelu – mukaan lukien raskas voimaharjoittelu, kuten kyykyt, punnerrukset, maastavedot ja olympianostot, Sovelluksen myös määräämä ballistinen hyppyharjoittelu sekä elämäntapalajit, kuten parkour, kiipeily, lumilautailu ja surffaus – on luonnostaan vaarallista, ja siihen liittyy vakavan vamman, pysyvän vammautumisen tai kuoleman riski.',
    pkJump: '• Hyppy- ja iskuharjoitteet määrätään',
    strBullet:
      '• Kuormat määrätään lähelle suorituskykysi rajaa, ja ne kasvavat. Sovellus määrää kuormitettavan harjoittelun joko sen mukaan, kuinka vähän toistoja sinulla pitäisi jäädä varaan, tai prosentteina yhden toiston maksimistasi, ja se lisää kuormaa jakson edetessä. Lähellä uupumusta tehty raskas toisto voi epäonnistua kesken liikkeen, ja riski kasvaa, kun olet väsynyt, huonosti lämmitelty tai nostat ilman turvatankoja tai varmistajaa.',
  },
}

function withRiskUnion(doc: LegalDocument, lang: SiteLang): LegalDocument {
  const union = RISK_UNION[lang]
  const index = doc.sections.findIndex((section) => section.heading.startsWith('4.'))
  const body = doc.sections[index]?.body ?? ''
  const jump = body.indexOf(union.pkJump)
  if (!body.startsWith(union.pkOpening) || jump < 0) {
    throw new Error(`Terms §4 (${lang}) no longer matches the site's risk-union patch: update src/data/legal/site.ts`)
  }
  const patched =
    union.opening + body.slice(union.pkOpening.length, jump) + union.strBullet + '\n\n' + body.slice(jump)
  return {
    ...doc,
    sections: doc.sections.map((section, i) => (i === index ? { ...section, body: patched } : section)),
  }
}

const DOCUMENTS: Record<SiteLegalId, Record<SiteLang, LegalDocument>> = {
  terms: {
    en: withRiskUnion(getLegalDocument('terms', 'en')!, 'en'),
    fi: withRiskUnion(getLegalDocument('terms', 'fi')!, 'fi'),
  },
  privacy: {
    en: getLegalDocument('privacy', 'en')!,
    fi: getLegalDocument('privacy', 'fi')!,
  },
}

export const siteLegalDocument = (id: SiteLegalId, lang: SiteLang): LegalDocument => DOCUMENTS[id][lang]

/** "19 November 2026" as written in company.ts, or 19.11.2026 in Finnish. */
export function legalUpdated(lang: SiteLang): string {
  if (lang === 'en') return LEGAL_LAST_UPDATED
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [day, month, year] = LEGAL_LAST_UPDATED.split(' ')
  return `${Number(day)}.${MONTHS.indexOf(month) + 1}.${year}`
}

/** Where the same document lives in the other language. */
export const legalPath = (id: SiteLegalId, lang: SiteLang) => (lang === 'fi' ? `/fi/${id}` : `/${id}`)
