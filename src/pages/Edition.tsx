import { Link } from 'react-router-dom'
import MarketingLayout from '../components/MarketingLayout'
import ProgramPreview from '../components/ProgramPreview'
import { DISCORD_URL, editions, FOUNDER_BIO, sharedFaq, type Edition as EditionName } from '../data/marketing'
import { editionMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

export default function Edition({ edition }: { edition: EditionName }) {
  const data = editions[edition]
  useHead(editionMeta(edition))
  return <MarketingLayout>
    <section className="marketing-section hero-grid"><div><p className="eyebrow">{data.name} / PRE-LAUNCH</p><h1>{data.title}</h1><p className="lead">{data.description}</p><a className="button primary" href={DISCORD_URL}>Join the beta community ↗</a><p className="small-note">On Discord. Test-build availability will be announced there.</p></div><ProgramPreview /></section>
    <section className="marketing-section section-rule"><h2>Built for your training.</h2><div className="feature-grid three-columns">{data.features.map(([title, text], i) => <article key={title}><span className="feature-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="marketing-section section-rule founder-strip"><div><p className="eyebrow">FROM SETUP TO SESSION</p><h2>Make the plan yours.</h2></div><div><p className="lead">Review your exercises. Swap eligible movements for equivalents before saving. Follow the prescribed sets, reps, effort and rest.</p><ul className="detail-list">{data.details.map(text => <li key={text}>{text}</li>)}</ul><p>Export your program through your phone’s share menu. Logging is optional; your generated block is ready to follow.</p></div></section>
    <section className="marketing-section founder-strip section-rule"><div><p className="eyebrow">MIKA / FOUNDER OF ATHLETICKLE</p><h2>Experience behind the programming.</h2></div><div><p className="lead">{FOUNDER_BIO}</p><Link to="/about" className="text-link">Meet Mika →</Link></div></section>
    <section className="marketing-section section-rule offer-section"><div className="offer-number">4<span>WEEKS</span></div><div><p className="eyebrow">YOUR FIRST BLOCK IS FREE</p><h2>A complete place to start.</h2><p className="lead">Your first four-week block includes its scheduled deload. Continue into later blocks with a subscription.</p><p>The next block has a 21-day pacing gate, including for subscribers. Store pricing and billing terms appear before purchase. Both apps are pre-launch; joining Discord is not a subscription.</p></div></section>
    <section className="marketing-section section-rule"><h2>Before you start.</h2><div className="faq-list">{[...data.faq, ...sharedFaq].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="marketing-section beta-cta"><p className="eyebrow">{data.code} / BETA COMMUNITY</p><h2>Bring your questions. Help shape the release.</h2><p className="lead">Meet the founder and other early testers on Discord. Follow announcements for build availability and share what works—and what needs work.</p><a href={DISCORD_URL} className="button primary">Join the beta community ↗</a><p className="small-note"><Link to={edition === 'parkour' ? '/strength' : '/parkour'}>Explore Athletickle {edition === 'parkour' ? 'Strength' : 'Parkour'} →</Link></p></section>
  </MarketingLayout>
}
