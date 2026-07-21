import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { LOCALES, LOCALE_NAMES } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

// Disclosure pattern (button + list of buttons) rather than a fake ARIA
// listbox, which would require arrow-key navigation and focus management.
export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        ref={triggerRef}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${t('lang.label')}: ${LOCALE_NAMES[locale]}`}
        className="flex items-center gap-2 px-4 py-3 border-2 border-white/30 text-sm tracking-[0.2em] font-['Space_Mono'] hover:border-white hover:bg-white/5 transition-all"
      >
        {locale.toUpperCase()}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] leading-none"
          aria-hidden="true"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 min-w-full bg-[#0a0a0a] border-2 border-white/30 z-50"
          >
            {LOCALES.map((l) => (
              <li key={l}>
                <button
                  onClick={() => {
                    setLocale(l)
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                  aria-label={LOCALE_NAMES[l]}
                  aria-current={l === locale ? 'true' : undefined}
                  className={`w-full px-4 py-3 text-sm tracking-[0.2em] font-['Space_Mono'] text-left transition-colors ${
                    l === locale
                      ? 'text-[#D1622A]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
