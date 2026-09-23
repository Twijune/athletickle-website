import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'
import { marketingCopy } from '../i18n/marketingCopy'
import { blogPath } from '../blog/paths'
import { DISCORD_URL } from '../data/marketing'

export default function MarketingLayout({ children, localized = false }: { children: ReactNode; localized?: boolean }) {
  const { locale, t } = useLanguage()
  const { pathname } = useLocation()
  const c = marketingCopy[localized ? locale : 'en']
  const navItems = [
    { label: 'Parkour', href: '/parkour' },
    { label: 'Strength', href: '/strength' },
    { label: localized ? c.about : 'The founder', href: '/about' },
    { label: t('nav.blog'), href: blogPath(locale) },
  ]
  return <div className="marketing-site" lang={localized ? locale : 'en'}>
    <a className="skip-link" href="#main">{localized && locale === 'fr' ? 'Aller au contenu' : localized && locale === 'de' ? 'Zum Inhalt' : localized && locale === 'es' ? 'Ir al contenido' : 'Skip to content'}</a>
    <div className="launch-strip">{c.prelaunch}</div>
    <header className="marketing-header">
      <Link to="/" className="brand"><img src="/athletickle-favicon-256.png" width="42" height="42" alt="" /><span>ATHLETICKLE</span></Link>
      <nav className="desktop-links" aria-label="Main navigation">{navItems.map(item => <Link key={item.href} to={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav>
      <div className="header-actions">{localized && <LanguageSwitcher />}<MobileMenu navItems={navItems} /></div>
    </header>
    <main id="main">{children}</main>
    <footer className="marketing-footer"><Link className="brand" to="/">ATHLETICKLE © 2026</Link><nav aria-label="Footer"><Link to="/about">{localized ? c.about : 'The founder'}</Link><Link to="/privacy">{t('footer.privacy')}</Link><Link to="/terms">{t('footer.terms')}</Link><Link to="/contact">{t('footer.contact')}</Link><a href={DISCORD_URL}>Discord ↗</a></nav></footer>
  </div>
}
