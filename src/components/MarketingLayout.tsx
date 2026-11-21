import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { marketingCopy } from '../i18n/marketingCopy'
import { DISCORD_URL } from '../data/marketing'

export default function MarketingLayout({ children, localized = false }: { children: ReactNode; localized?: boolean }) {
  const { locale, t } = useLanguage()
  const c = marketingCopy[localized ? locale : 'en']
  return <div className="marketing-site" lang={localized ? locale : 'en'}>
    <SiteHeader />
    <main id="main">{children}</main>
    <footer className="marketing-footer"><Link className="brand" to="/">ATHLETICKLE © 2026</Link><nav aria-label="Footer"><Link to="/about">{localized ? c.about : 'The founder'}</Link><Link to="/privacy">{t('footer.privacy')}</Link><Link to="/terms">{t('footer.terms')}</Link><Link to="/contact">{t('footer.contact')}</Link><a href={DISCORD_URL}>Discord ↗</a></nav></footer>
  </div>
}
