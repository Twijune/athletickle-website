import { Link } from 'react-router-dom'
import MarketingLayout from '../components/MarketingLayout'
import ProgramPreview from '../components/ProgramPreview'
import { pagePath } from '../blog/paths'
import { DISCORD_URL, PARKOUR_PLAY_URL, STRENGTH_PLAY_URL, editions, type Edition as EditionName } from '../data/marketing'
import { useLanguage } from '../i18n/LanguageContext'
import { editionCopy } from '../i18n/editionCopy'
import { marketingCopy } from '../i18n/marketingCopy'
import { editionMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// One page per app and locale (/parkour, /fr/parkour…). App names and codes
// are not translated; everything else comes from i18n/editionCopy.
export default function Edition({ edition }: { edition: EditionName }) {
  const { locale } = useLanguage()
  const copy = editionCopy[locale]
  const c = marketingCopy[locale]
  const { name, code } = editions[edition]
  const text = copy.editions[edition]
  const other = edition === 'parkour' ? 'strength' : 'parkour'
  useHead(editionMeta(edition, locale))
  return <MarketingLayout localized>
    <section className="marketing-section hero-grid"><div><p className="eyebrow">{name} / {c.pkStatus}</p><h1>{text.title}</h1><p className="lead">{text.description}</p><a className="button primary" href={edition === 'parkour' ? PARKOUR_PLAY_URL : STRENGTH_PLAY_URL}>{copy.playCta} ↗</a><p className="small-note">{copy.availableNote}</p></div><ProgramPreview locale={locale} /></section>
    <section className="marketing-section section-rule"><h2>{copy.builtTitle}</h2><div className="feature-grid three-columns">{text.features.map(([title, body], i) => <article key={title}><span className="feature-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="marketing-section section-rule founder-strip"><div><p className="eyebrow">{copy.setupEyebrow}</p><h2>{copy.setupTitle}</h2></div><div><p className="lead">{copy.setupLead}</p><ul className="detail-list">{text.details.map(detail => <li key={detail}>{detail}</li>)}</ul><p>{copy.exportNote}</p></div></section>
    <section className="marketing-section founder-strip section-rule"><div><p className="eyebrow">{c.founderLabel}</p><h2>{copy.founderTitle}</h2></div><div><p className="lead">{copy.founderBio}</p><Link to="/about" className="text-link">{copy.meetMika} →</Link></div></section>
    <section className="marketing-section section-rule offer-section"><div className="offer-number">4<span>{copy.weeks}</span></div><div><p className="eyebrow">{copy.offerEyebrow}</p><h2>{copy.offerTitle}</h2><p className="lead">{copy.offerLead}</p><p>{copy.offerNote}</p></div></section>
    <section className="marketing-section section-rule"><h2>{copy.faqTitle}</h2><div className="faq-list">{[...text.faq, ...copy.sharedFaq].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="marketing-section beta-cta"><p className="eyebrow">{code} / {copy.communityLabel}</p><h2>{copy.communityTitle}</h2><p className="lead">{copy.communityLead}</p><a href={DISCORD_URL} className="button primary">{c.join} ↗</a><p className="small-note"><Link to={pagePath(locale, `/${other}`)}>{copy.exploreOther(editions[other].name)} →</Link></p></section>
  </MarketingLayout>
}
