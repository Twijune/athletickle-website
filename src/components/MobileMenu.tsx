import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LOCALES, LOCALE_NAMES } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import { useLocaleSwitch } from '../i18n/useLocaleSwitch'

export interface NavItem {
  label: string
  href: string
}

// Full-screen nav for < lg, where both layouts hide their link lists. Same
// disclosure contract as LanguageSwitcher: Escape closes and returns focus to
// the trigger. The panel only renders while open, so it stays out of the
// prerendered HTML.
export default function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const { locale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const selectLocale = useLocaleSwitch()

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    // Stop the page behind the overlay from scrolling with it.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const legalLinks = [
    { to: '/privacy', label: t('footer.privacy') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/contact', label: t('footer.contact') },
  ]

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t('nav.menu')}
        className="lg:hidden flex items-center justify-center w-11 h-11 -mr-1 border-2 border-white/30 text-lg hover:border-white hover:bg-white/5 transition-all"
      >
        <span aria-hidden="true">☰</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden fixed inset-0 z-[70] bg-[#0a0a0a] flex flex-col px-5 py-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <img src="/athletickle-favicon-256.png" alt="Athletickle" className="w-10 h-12" />
              <button
                ref={closeRef}
                onClick={close}
                aria-label={t('nav.close')}
                className="flex items-center justify-center w-11 h-11 -mr-1 border-2 border-white/30 text-lg hover:border-white hover:bg-white/5 transition-all"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <nav className="flex flex-col gap-6 mt-12">
              {navItems.map((item) =>
                // hash links scroll natively; route links stay SPA navigations
                item.href.startsWith('/#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="text-[clamp(1.75rem,9vw,3rem)] tracking-tight text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={close}
                    className="text-[clamp(1.75rem,9vw,3rem)] tracking-tight text-white hover:text-[#D1622A] transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="mt-auto pt-10">
              <div className="h-px bg-white/10" />

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-xs tracking-[0.2em] text-white/40 font-['Space_Mono']">
                {legalLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={close}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      selectLocale(l)
                      close()
                    }}
                    aria-label={LOCALE_NAMES[l]}
                    aria-current={l === locale ? 'true' : undefined}
                    className={`px-4 py-3 border-2 text-sm tracking-[0.2em] font-['Space_Mono'] transition-colors ${
                      l === locale
                        ? 'border-[#D1622A] text-[#D1622A]'
                        : 'border-white/30 text-white/60 hover:border-white hover:text-white'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
