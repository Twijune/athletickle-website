import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'
import { blogPath } from '../blog/paths'

const AthleLogo = ({ className = '' }: { className?: string }) => (
  <img src="/athletickle-favicon-256.png" alt="Athletickle" className={className} />
)

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = useLanguage()

  const navItems = [
    { label: t('nav.features'), href: '/#features' },
    { label: t('nav.editions'), href: '/#editions' },
    { label: t('nav.blog'), href: blogPath(locale) },
    { label: t('nav.download'), href: '/#download' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Archivo_Black'] overflow-x-hidden">
      {/* NAV — mirrors Design10's inline nav (kept separate to avoid churn there).
          initial={false}: an initial-hidden state would be serialized into the
          prerendered HTML and leave the page blank until JS hydrates. */}
      <motion.nav
        initial={false}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-[#0a0a0a]/90 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-4">
            <AthleLogo className="w-10 h-12" />
            <span className="hidden sm:inline text-xl tracking-[0.3em]">ATHLETICKLE</span>
          </Link>

          <div className="hidden md:flex items-center gap-12 text-sm tracking-[0.2em] font-['Space_Mono']">
            {navItems.map((item) =>
              item.href.startsWith('/#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative group text-white/60 hover:text-white transition-colors"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-[#D1622A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative group text-white hover:text-white transition-colors"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-[#D1622A]" />
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.nav>

      <main className="pt-24">{children}</main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 mt-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-4">
              <AthleLogo className="w-8 h-10" />
              <span className="text-sm tracking-[0.2em]">ATHLETICKLE © 2026</span>
            </Link>
            <div className="flex gap-8 text-xs tracking-[0.2em] text-white/40 font-['Space_Mono']">
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
