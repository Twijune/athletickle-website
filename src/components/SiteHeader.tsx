import { Link, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'
import { marketingCopy } from '../i18n/marketingCopy'
import { blogPath } from '../blog/paths'

// One header for every page. MarketingLayout and BlogLayout both render it, so
// moving between sections never swaps the top bar's links, styling or position.
export default function SiteHeader() {
  const { locale, t } = useLanguage()
  const { pathname } = useLocation()
  const c = marketingCopy[locale]
  const navItems = [
    { label: 'Parkour', href: '/parkour' },
    { label: 'Strength', href: '/strength' },
    { label: c.about, href: '/about' },
    { label: t('nav.blog'), href: blogPath(locale) },
  ]
  return <div lang={locale}>
    <a className="skip-link" href="#main">{locale === 'fr' ? 'Aller au contenu' : locale === 'de' ? 'Zum Inhalt' : locale === 'es' ? 'Ir al contenido' : 'Skip to content'}</a>
    <div className="launch-strip">{c.prelaunch}</div>
    <header className="marketing-header">
      <Link to="/" className="brand"><img src="/athletickle-favicon-256.png" width="42" height="42" alt="" /><span>ATHLETICKLE</span></Link>
      <nav className="desktop-links" aria-label="Main navigation">{navItems.map(item => <Link key={item.href} to={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav>
      <div className="header-actions"><LanguageSwitcher /><MobileMenu navItems={navItems} /></div>
    </header>
  </div>
}
