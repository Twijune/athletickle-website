import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'
import { blogPath } from '../blog/paths'
import { landingMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

const MotionLink = motion.create(Link)

const DISCORD_URL = 'https://discord.gg/PrXwF4QSuf'

// Design 10: INVERTED DARK BRUTALIST
// Dark background, stark white/neon accents, aggressive angles, high contrast, intense energy

const AthleLogo = ({ className = '' }: { className?: string }) => (
  <img src="/athletickle-favicon-256.png" alt="Athletickle" className={className} />
)

const GlitchText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-[#ff0040] mix-blend-screen"
            style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translateX(-2px)' }}
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 text-[#D1622A] mix-blend-screen"
            style={{ clipPath: 'inset(50% 0 20% 0)', transform: 'translateX(2px)' }}
          >
            {children}
          </span>
        </>
      )}
      {children}
    </span>
  )
}

export default function Design10() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()
  useHead(landingMeta())
  const { scrollYProgress } = useScroll()
  const skewY = useTransform(scrollYProgress, [0, 1], [0, -2])

  const features = [
    { id: '01', title: t('features.1.title'), desc: t('features.1.desc') },
    { id: '02', title: t('features.2.title'), desc: t('features.2.desc') },
    { id: '03', title: t('features.3.title'), desc: t('features.3.desc') },
    { id: '04', title: t('features.4.title'), desc: t('features.4.desc') },
  ]

  const editions = [
    {
      id: 'V1',
      title: t('editions.v1.title'),
      desc: t('editions.v1.desc'),
      tag: t('editions.v1.tag'),
      chips: t('editions.v1.sports').split(',').map((s) => s.trim()),
    },
    {
      id: 'V2',
      title: t('editions.v2.title'),
      desc: t('editions.v2.desc'),
      tag: t('editions.v2.tag'),
      chips: [t('editions.v2.track1'), t('editions.v2.track2'), t('editions.v2.track3')],
    },
  ]

  // '/#...' instead of '#...' so the links also work from /blog pages
  const navItems = [
    { label: t('nav.features'), href: '/#features' },
    { label: t('nav.system'), href: '/#system' },
    { label: t('nav.editions'), href: '/#editions' },
    { label: t('nav.blog'), href: blogPath(locale) },
    { label: t('nav.download'), href: '/#download' },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white font-['Archivo_Black'] overflow-x-hidden">
      {/* Aggressive grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 45%, white 45%, white 55%, transparent 55%),
            linear-gradient(-45deg, transparent 45%, white 45%, white 55%, transparent 55%)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal accent lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#D1622A]/20 via-transparent to-[#D1622A]/20 transform rotate-12 origin-top" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform -rotate-12 origin-top" />
      </div>

      {/* PRE-LAUNCH ANNOUNCEMENT BAR */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-10 flex items-center justify-center bg-[#D1622A] text-[#0a0a0a] px-4">
        <span className="text-[10px] sm:text-xs tracking-[0.15em] font-['Space_Mono'] font-bold text-center truncate">
          {t('launch.bar')}
        </span>
      </div>

      {/* NAV */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-10 left-0 right-0 z-50 border-b border-white/10"
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-[#0a0a0a]/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <AthleLogo className="w-10 h-12" />
            <span className="hidden sm:inline text-xl tracking-[0.3em]">ATHLETICKLE</span>
          </div>

          <div className="hidden md:flex items-center gap-12 text-sm tracking-[0.2em] font-['Space_Mono']">
            {navItems.map((item, i) => {
              const inner = (
                <>
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-[#D1622A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </>
              )
              const shared = {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: i * 0.1 },
                className: 'relative group text-white/60 hover:text-white transition-colors',
              }
              // hash links scroll natively; route links stay SPA navigations
              return item.href.startsWith('/#') ? (
                <motion.a key={item.href} href={item.href} {...shared}>
                  {inner}
                </motion.a>
              ) : (
                <MotionLink key={item.href} to={item.href} {...shared}>
                  {inner}
                </MotionLink>
              )
            })}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white text-[#0a0a0a] text-sm tracking-[0.2em] font-bold hover:bg-[#D1622A] transition-colors"
            >
              {t('nav.getApp')}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="min-h-screen pt-36 flex items-center relative overflow-hidden">
        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[30vw] font-black text-white/[0.02] tracking-tighter">
            TRAIN
          </span>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Accent badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-[#D1622A]" />
                <span className="text-xs tracking-[0.4em] text-[#D1622A] font-['Space_Mono']">
                  {t('hero.badge')}
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                <GlitchText>{t('hero.title1')}</GlitchText>
                <br />
                <span className="text-[#D1622A]">{t('hero.title2')}</span>
                <br />
                <GlitchText>{t('hero.title3')}</GlitchText>
              </h1>

              <p className="text-lg font-['Space_Mono'] text-white/50 leading-relaxed max-w-md mb-10">
                {t('hero.paragraph')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="px-10 py-5 bg-white text-[#0a0a0a] text-lg tracking-[0.1em] font-bold cursor-default opacity-90 flex items-center gap-2">
                  {t('launch.cta')}
                </div>

                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 border-2 border-white/30 text-lg tracking-[0.1em] hover:border-white hover:bg-white/5 transition-all text-center"
                >
                  {t('launch.discord')}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ skewY }}
              className="relative"
            >
              {/* Aggressive frame */}
              <div className="absolute -inset-4 border-2 border-white/20 transform -skew-x-2" />
              <div className="absolute -inset-8 border border-[#D1622A]/30 transform skew-x-3" />

              <div className="relative">
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-[#D1622A]" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-[#D1622A]" />

                <div className="bg-[#0a0a0a] border border-white/10 p-3">
                  <img
                    src="/createprog_snip.png"
                    alt={t('hero.appAlt')}
                    className="w-full max-w-sm mx-auto"
                  />
                </div>

                {/* Floating stat */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-6 -right-6 px-4 py-2 bg-[#D1622A] text-[#0a0a0a] text-xs font-['Space_Mono'] tracking-wider"
                >
                  {t('hero.floatingStat')}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.3em] text-white/30 font-['Space_Mono']">{t('hero.scroll')}</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 relative">
        {/* Section accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#D1622A]" />
                <span className="text-xs tracking-[0.4em] text-[#D1622A] font-['Space_Mono']">{t('features.kicker')}</span>
              </div>
              <h2 className="text-5xl md:text-6xl tracking-tight">
                {t('features.heading1')}<br />
                <span className="text-white/30">{t('features.heading2')}</span>
              </h2>
            </div>
            <span className="text-[120px] font-black text-white/[0.03] leading-none hidden lg:block">01</span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {features.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-10 group hover:bg-white/5 transition-colors relative overflow-hidden"
              >
                {/* Hover accent */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#D1622A] group-hover:h-full transition-all duration-300" />

                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-black text-white/10 group-hover:text-[#D1622A]/30 transition-colors">
                    {feature.id}
                  </span>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-xl group-hover:border-[#D1622A] group-hover:text-[#D1622A] transition-colors"
                  >
                    +
                  </motion.div>
                </div>

                <h3 className="text-xl tracking-wide mb-4">{feature.title}</h3>
                <p className="text-sm font-['Space_Mono'] text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Privacy-first note */}
          <MotionLink
            to={blogPath(locale, 'privacy-first-by-design')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10 p-8 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-[#D1622A] text-xl" aria-hidden="true">🔒</span>
              <span className="text-sm font-['Space_Mono'] text-white/60 leading-relaxed">
                {t('privacy.strip')}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] font-['Space_Mono'] text-[#D1622A] whitespace-nowrap">
              {t('privacy.stripLink')} <span aria-hidden="true">→</span>
            </span>
          </MotionLink>
        </div>
      </section>

      {/* SYSTEM */}
      <section id="system" className="py-32 relative overflow-hidden">
        {/* Diagonal background element */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D1622A]/5 to-transparent transform skew-x-12 origin-top-right" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-[#D1622A]/20 transform -skew-x-3" />
                <div className="relative bg-[#0a0a0a] border border-white/10 p-2">
                  <img src="/createprog_snip.png" alt={t('system.captionBuilder')} className="w-full" />
                </div>
                <p className="text-xs font-['Space_Mono'] text-white/30 mt-3 text-center tracking-wider">{t('system.captionBuilder')}</p>
              </div>
              <div className="relative mt-12">
                <div className="absolute -inset-2 bg-white/10 transform skew-x-3" />
                <div className="relative bg-[#0a0a0a] border border-white/10 p-2">
                  <img src="/previewofprogram.png" alt={t('system.captionSession')} className="w-full" />
                </div>
                <p className="text-xs font-['Space_Mono'] text-white/30 mt-3 text-center tracking-wider">{t('system.captionSession')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#D1622A]" />
                <span className="text-xs tracking-[0.4em] text-[#D1622A] font-['Space_Mono']">{t('system.kicker')}</span>
              </div>

              <h2 className="text-5xl md:text-6xl tracking-tight leading-tight mb-8">
                {t('system.heading1')}<br />
                <span className="text-[#D1622A]">{t('system.heading2')}</span>
              </h2>

              <p className="text-lg font-['Space_Mono'] text-white/50 leading-relaxed mb-8">
                {t('system.paragraph')}
              </p>

              <div className="space-y-4">
                {[t('system.bullet1'), t('system.bullet2'), t('system.bullet3')].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-px bg-[#D1622A]" />
                    <span className="text-sm font-['Space_Mono'] tracking-wide">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EDITIONS */}
      <section id="editions" className="py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#D1622A]" />
                <span className="text-xs tracking-[0.4em] text-[#D1622A] font-['Space_Mono']">{t('editions.kicker')}</span>
              </div>
              <h2 className="text-5xl md:text-6xl tracking-tight">
                {t('editions.heading1')}<br />
                <span className="text-white/30">{t('editions.heading2')}</span>
              </h2>
            </div>
            <span className="text-[120px] font-black text-white/[0.03] leading-none hidden lg:block">02</span>
          </div>

          <p className="text-sm font-['Space_Mono'] text-white/50 mb-12 max-w-xl">{t('editions.shared')}</p>

          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {editions.map((edition, i) => (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] p-10 group hover:bg-white/5 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#D1622A] group-hover:h-full transition-all duration-300" />

                <div className="flex items-start justify-between mb-6 gap-4">
                  <span className="text-5xl font-black text-white/10 group-hover:text-[#D1622A]/30 transition-colors">
                    {edition.id}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] font-['Space_Mono'] text-[#D1622A] border border-[#D1622A]/40 px-3 py-1 text-right">
                    {edition.tag}
                  </span>
                </div>

                <h3 className="text-xl tracking-wide mb-4">{edition.title}</h3>
                <p className="text-sm font-['Space_Mono'] text-white/50 leading-relaxed mb-6">{edition.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {edition.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-xs font-['Space_Mono'] tracking-wide text-white/70 border border-white/15 px-3 py-1"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-16 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D1622A]/5 via-transparent to-[#D1622A]/5" />

        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '500+', label: t('stats.exercises') },
              { num: '∞', label: t('stats.programs') },
              { num: '24/7', label: t('stats.access') },
              { num: t('stats.trialNum'), label: t('stats.trialLabel') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl md:text-6xl font-black text-[#D1622A] mb-2">{stat.num}</div>
                <div className="text-xs tracking-[0.3em] text-white/40 font-['Space_Mono']">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="py-32 relative">
        <div className="container mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AthleLogo className="w-20 h-24 mx-auto mb-8" />

            <h2 className="text-6xl md:text-8xl tracking-tight mb-8">
              <GlitchText>{t('cta.title1')}</GlitchText>
              <br />
              <span className="text-[#D1622A]">{t('cta.title2')}</span>
            </h2>

            <p className="text-lg font-['Space_Mono'] text-white/50 max-w-md mx-auto mb-12">
              {t('cta.paragraph')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="px-12 py-6 bg-white/10 text-white/60 text-lg tracking-[0.1em] font-bold cursor-default border border-white/10">
                {t('launch.ios')}
              </div>
              <div className="px-12 py-6 border-2 border-white/20 text-white/60 text-lg tracking-[0.1em] cursor-default">
                {t('launch.android')}
              </div>
            </div>

            <p className="text-xs font-['Space_Mono'] text-white/40 mt-8 tracking-wide">{t('launch.note')}</p>
            <p className="text-xs font-['Space_Mono'] text-white/30 mt-2 tracking-wide">
              <Link to="/terms" className="underline hover:text-white transition-colors">{t('launch.terms')}</Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <AthleLogo className="w-8 h-10" />
              <span className="text-sm tracking-[0.2em]">ATHLETICKLE © 2026</span>
            </div>
            <div className="flex gap-8 text-xs tracking-[0.2em] text-white/40 font-['Space_Mono']">
              <Link to={blogPath(locale)} className="hover:text-white transition-colors">{t('nav.blog')}</Link>
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
