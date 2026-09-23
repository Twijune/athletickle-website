import { Link } from 'react-router-dom'
import MarketingLayout from '../components/MarketingLayout'
import ProgramPreview from '../components/ProgramPreview'
import { useLanguage } from '../i18n/LanguageContext'
import { marketingCopy } from '../i18n/marketingCopy'
import { DISCORD_URL } from '../data/marketing'
import { blogPath } from '../blog/paths'
import { landingMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

export default function Design10() {
  const { locale } = useLanguage()
  const c = marketingCopy[locale]
  useHead(landingMeta())
  return <MarketingLayout localized>
    <section className="marketing-section hero-grid">
      <div><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="lead">{c.intro}</p>
        <div className="button-row"><a className="button primary" href={DISCORD_URL}>{c.join} ↗</a><a className="button secondary" href="#editions">{c.choose} ↓</a></div>
        <p className="small-note">{c.joinNote}</p>
      </div><ProgramPreview locale={locale} />
    </section>
    <section id="editions" className="marketing-section section-rule">
      <p className="eyebrow">PARKOUR / STRENGTH</p><h2>{c.editionsTitle}</h2><p className="small-note">{c.english}</p>
      <div className="edition-grid">{(['parkour', 'strength'] as const).map((edition, i) => <article className={`edition-card ${edition}`} key={edition}>
        <div className="card-top"><span className="edition-code">{i === 0 ? 'PK' : 'STR'}</span><span className="eyebrow">{c.prelaunch}</span></div>
        <h3>Athletickle {i === 0 ? 'Parkour' : 'Strength'}</h3><p>{i === 0 ? c.pk : c.str}</p>
        <ul className="tag-list">{(i === 0 ? c.pkTags : c.strTags).map(tag => <li key={tag}>{tag}</li>)}</ul>
        <Link className="text-link" to={`/${edition}`}>{c.explore} →</Link>
      </article>)}</div>
    </section>
    <section className="marketing-section founder-strip section-rule">
      <div><p className="eyebrow">{c.founderLabel}</p><h2>{c.founderTitle}</h2></div><div><p className="lead">{c.founder}</p><Link className="text-link" to="/about">{c.about} →</Link></div>
    </section>
    <section id="features" className="marketing-section section-rule"><h2>{c.featuresTitle}</h2><div className="feature-grid">{c.features.map(([title, text], i) => <article key={title}><span className="feature-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section id="system" className="marketing-section founder-strip section-rule"><div><p className="eyebrow">01 → 02 → 03</p><h2>{c.systemTitle}</h2></div><div><p className="lead">{c.system}</p><p>{c.systemNote}</p><Link className="text-link" to={blogPath(locale)}>{c.systemLink} →</Link></div></section>
    <section className="marketing-section section-rule"><h2>{c.faqTitle}</h2><div className="faq-list">{c.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section id="download" className="marketing-section beta-cta"><p className="eyebrow">DISCORD / BETA</p><h2>{c.ctaTitle}</h2><p className="lead">{c.cta}</p><a className="button primary" href={DISCORD_URL}>{c.join} ↗</a></section>
  </MarketingLayout>
}
