import { Link } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { blogPath } from '../blog/paths'

const AthleLogo = ({ className = '' }: { className?: string }) => (
  <img src="/athletickle-favicon-256.png" alt="Athletickle" className={className} />
)

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Archivo_Black'] overflow-x-hidden">
      <SiteHeader />

      <main id="main">{children}</main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 mt-24">
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-4">
              <AthleLogo className="w-8 h-10" />
              <span className="text-sm tracking-[0.2em]">ATHLETICKLE © 2026</span>
            </Link>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs tracking-[0.2em] text-white/40 font-['Space_Mono']">
              <Link to={blogPath(locale)} className="hover:text-white transition-colors">
                {t('nav.blog')}
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
              <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
              <Link to="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
