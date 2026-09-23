import { marketingCopy } from '../i18n/marketingCopy'
import type { Locale } from '../i18n/translations'

// An explicitly labelled explanatory diagram, never presented as a native screenshot.
export default function ProgramPreview({ locale = 'en' }: { locale?: Locale }) {
  const c = marketingCopy[locale]
  return (
    <figure className="roadmap-preview">
      <figcaption className="eyebrow">{c.previewLabel}</figcaption>
      <p className="preview-heading">{c.previewTitle}</p>
      <div className="roadmap-block active-block">
        <span className="block-number">01</span>
        <div><span className="eyebrow">{c.block} 01</span><h3>{c.blockOne}</h3><p>{c.free}</p></div>
        <span className="block-mark" aria-hidden="true">↗</span>
      </div>
      {[2, 3].map(n => <div className="roadmap-block" key={n}>
        <span className="block-number">0{n}</span>
        <div><span className="eyebrow">{c.block} 0{n}</span><h3>{c.next}</h3><p>{c.premium}</p></div>
      </div>)}
      <p className="small-note">{c.previewNote}</p>
    </figure>
  )
}
