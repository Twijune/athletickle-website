import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogLayout from './BlogLayout'
import { EMAIL_DOMAIN, EMAIL_USER } from '../data/company'
import { legalPath, legalUpdated, siteLegalDocument, type SiteLang, type SiteLegalId } from '../data/legal/site'

// Renders a legal document (the same text the apps bundle, see
// src/data/legal/site.ts): paragraphs split on blank lines, "• " paragraphs
// as bullets, and the few addresses in the text as links.

const LABELS: Record<SiteLang, { kicker: string; updated: string; other: string; emailLoading: string }> = {
  en: { kicker: 'LEGAL', updated: 'Last updated', other: 'Suomeksi', emailLoading: 'Loading email…' },
  fi: { kicker: 'OIKEUDELLISET TIEDOT', updated: 'Päivitetty viimeksi', other: 'In English', emailLoading: 'Ladataan sähköpostiosoitetta…' },
}

// Finnish compounds are too long for a phone-width H1 and browsers rarely
// carry Finnish hyphenation, so the titles get soft hyphens (\u00AD) at the
// word boundaries: they break there with a hyphen, or not at all.
const TITLE_BREAKS: Record<string, string> = {
  KÄYTTÖOIKEUSSOPIMUS: 'KÄYTTÖ\u00ADOIKEUS\u00ADSOPIMUS',
  TIETOSUOJASELOSTE: 'TIETOSUOJA\u00ADSELOSTE',
}
const breakableTitle = (title: string) =>
  title.toUpperCase().replace(/\p{L}+/gu, (word) => TITLE_BREAKS[word] ?? word)

const LINK_CLASS = 'text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors'

// The address is written into the DOM only after mount, so the prerendered
// HTML that scrapers read never contains it (same as the Contact page).
function Email({ lang }: { lang: SiteLang }) {
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const address = `${EMAIL_USER}@${EMAIL_DOMAIN}`
    el.href = `mailto:${address}`
    el.textContent = address
  }, [])
  return (
    <a ref={ref} href="/contact" className={`${LINK_CLASS} break-all`}>
      {LABELS[lang].emailLoading}
    </a>
  )
}

const EXTERNAL: Record<string, string> = {
  'glyphex.io': 'https://glyphex.io',
  'bunny.net': 'https://bunny.net',
  'tietosuoja.fi': 'https://tietosuoja.fi',
}

const TOKEN = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|athletickle\.com\/contact|glyphex\.io|bunny\.net|tietosuoja\.fi)/

function Linked({ text, lang }: { text: string; lang: SiteLang }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (i % 2 === 0) return part
        if (part.includes('@')) return <Email key={i} lang={lang} />
        if (part === 'athletickle.com/contact') {
          return (
            <Link key={i} to="/contact" className={LINK_CLASS}>
              {part}
            </Link>
          )
        }
        return (
          <a key={i} href={EXTERNAL[part]} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            {part}
          </a>
        )
      })}
    </>
  )
}

/** Paragraphs and bullet lists of one text block. */
function Blocks({ text, lang }: { text: string; lang: SiteLang }) {
  const groups: string[][] = []
  for (const paragraph of text.split(/\n\n+/)) {
    const bullet = paragraph.startsWith('• ')
    const last = groups[groups.length - 1]
    if (bullet && last && last[0].startsWith('• ')) last.push(paragraph)
    else groups.push([paragraph])
  }
  return (
    <>
      {groups.map((group, g) =>
        group[0].startsWith('• ') ? (
          <ul key={g} className="space-y-4 pl-1">
            {group.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[#D1622A] shrink-0" aria-hidden="true">
                  —
                </span>
                <span>
                  <Linked text={item.slice(2)} lang={lang} />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={g}>
            <Linked text={group[0]} lang={lang} />
          </p>
        ),
      )}
    </>
  )
}

export default function LegalPage({ id, lang }: { id: SiteLegalId; lang: SiteLang }) {
  const doc = siteLegalDocument(id, lang)
  const labels = LABELS[lang]
  const other: SiteLang = lang === 'fi' ? 'en' : 'fi'

  return (
    <BlogLayout>
      {/* lang marks the document's language for screen readers and
          hyphenation even when the site chrome is in another language */}
      <article lang={lang} className="container mx-auto px-8 py-16 max-w-3xl">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <p className="text-xs tracking-[0.3em] font-['Space_Mono'] text-[#D1622A]">{labels.kicker}</p>
          <Link
            to={legalPath(id, other)}
            hrefLang={other}
            lang={other}
            className="text-xs tracking-[0.2em] font-['Space_Mono'] text-white/50 hover:text-white transition-colors whitespace-nowrap"
          >
            {labels.other.toUpperCase()} →
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05] mb-6 break-words hyphens-auto">
          {breakableTitle(doc.title)}
        </h1>
        <p className="text-sm font-['Space_Mono'] text-white/40 mb-4">
          {labels.updated}: {legalUpdated(lang)}
        </p>
        <div className="w-16 h-1 bg-[#D1622A] mb-12" />

        <div className="font-['Space_Mono'] text-white/70 leading-relaxed mb-12 space-y-4">
          <Blocks text={doc.intro} lang={lang} />
        </div>

        {doc.sections.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl md:text-3xl tracking-tight mb-6">
              <span className="w-3 h-3 bg-[#D1622A] shrink-0" aria-hidden="true" />
              <span>{section.heading}</span>
            </h2>
            <div className="space-y-4 font-['Space_Mono'] text-white/70 leading-relaxed">
              <Blocks text={section.body} lang={lang} />
            </div>
          </section>
        ))}
      </article>
    </BlogLayout>
  )
}
