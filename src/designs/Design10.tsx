import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useEffect, useState } from 'react'

// Design 10: INVERTED DARK BRUTALIST
// Dark background, stark white/neon accents, aggressive angles, high contrast, intense energy

const FeatherLogo = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 120" className={className}>
    <defs>
      <linearGradient id="featherDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7cf0ef" />
        <stop offset="100%" stopColor="#40E0D0" />
      </linearGradient>
    </defs>
    <path
      d="M75 10 Q60 25 55 45 Q50 65 45 85 Q40 100 35 115 Q35 100 38 85 Q25 75 15 60 Q25 65 35 65 Q30 50 25 35 Q35 45 45 50 Q45 35 50 20 Q55 35 55 50 Q65 45 75 35 Q70 50 65 65 Q75 65 85 60 Q75 75 62 85 Q65 100 65 115 Q55 95 50 75 Q45 55 50 35 Q55 20 75 10Z"
      fill="url(#featherDark)"
    />
  </svg>
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
            className="absolute top-0 left-0 text-[#00ffff] mix-blend-screen"
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
  const { scrollYProgress } = useScroll()
  const skewY = useTransform(scrollYProgress, [0, 1], [0, -2])

  const features = [
    { id: '01', title: 'ADAPTIVE ALGORITHM', desc: 'Real-time periodization that evolves with every session' },
    { id: '02', title: 'FATIGUE DETECTION', desc: 'System identifies overreaching before you feel it' },
    { id: '03', title: 'EXERCISE ARSENAL', desc: '500+ movements organized by pattern and equipment' },
    { id: '04', title: 'PROGRESS ENGINE', desc: 'Systematic overload that guarantees forward momentum' },
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
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#7cf0ef]/20 via-transparent to-[#7cf0ef]/20 transform rotate-12 origin-top" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform -rotate-12 origin-top" />
      </div>

      {/* NAV */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      >
        <div className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a]/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <FeatherLogo className="w-10 h-12" />
            <span className="text-xl tracking-[0.3em]">ATHLETICKLE</span>
          </div>

          <div className="hidden md:flex items-center gap-12 text-sm tracking-[0.2em] font-['Space_Mono']">
            {['FEATURES', 'SYSTEM', 'DOWNLOAD'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative group text-white/60 hover:text-white transition-colors"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute -bottom-1 left-0 w-full h-px bg-[#7cf0ef] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-white text-[#0a0a0a] text-sm tracking-[0.2em] font-bold hover:bg-[#7cf0ef] transition-colors"
          >
            GET APP
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="min-h-screen pt-24 flex items-center relative overflow-hidden">
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
                <div className="w-3 h-3 bg-[#7cf0ef]" />
                <span className="text-xs tracking-[0.4em] text-[#7cf0ef] font-['Space_Mono']">
                  ALGORITHM-DRIVEN
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                <GlitchText>DESTROY</GlitchText>
                <br />
                <span className="text-[#7cf0ef]">YOUR</span>
                <br />
                <GlitchText>LIMITS</GlitchText>
              </h1>

              <p className="text-lg font-['Space_Mono'] text-white/50 leading-relaxed max-w-md mb-10">
                No more guessing. No more plateaus. Smart periodization that adapts
                to your body and pushes you forward—systematically, relentlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-10 py-5 bg-white text-[#0a0a0a] text-lg tracking-[0.1em] font-bold relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    DOWNLOAD FREE
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-[#7cf0ef] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>

                <button className="px-10 py-5 border-2 border-white/30 text-lg tracking-[0.1em] hover:border-white hover:bg-white/5 transition-all">
                  WATCH DEMO
                </button>
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
              <div className="absolute -inset-8 border border-[#7cf0ef]/30 transform skew-x-3" />

              <div className="relative">
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-[#7cf0ef]" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-[#7cf0ef]" />

                <div className="bg-[#0a0a0a] border border-white/10 p-3">
                  <img
                    src="/createprog_snip.png"
                    alt="Athletickle App"
                    className="w-full max-w-sm mx-auto"
                  />
                </div>

                {/* Floating stat */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-6 -right-6 px-4 py-2 bg-[#7cf0ef] text-[#0a0a0a] text-xs font-['Space_Mono'] tracking-wider"
                >
                  500+ EXERCISES
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
            <span className="text-xs tracking-[0.3em] text-white/30 font-['Space_Mono']">SCROLL</span>
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
                <div className="w-3 h-3 bg-[#7cf0ef]" />
                <span className="text-xs tracking-[0.4em] text-[#7cf0ef] font-['Space_Mono']">CAPABILITIES</span>
              </div>
              <h2 className="text-5xl md:text-6xl tracking-tight">
                SYSTEM<br />
                <span className="text-white/30">FEATURES</span>
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
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#7cf0ef] group-hover:h-full transition-all duration-300" />

                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-black text-white/10 group-hover:text-[#7cf0ef]/30 transition-colors">
                    {feature.id}
                  </span>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-xl group-hover:border-[#7cf0ef] group-hover:text-[#7cf0ef] transition-colors"
                  >
                    +
                  </motion.div>
                </div>

                <h3 className="text-xl tracking-wide mb-4">{feature.title}</h3>
                <p className="text-sm font-['Space_Mono'] text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section id="system" className="py-32 relative overflow-hidden">
        {/* Diagonal background element */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7cf0ef]/5 to-transparent transform skew-x-12 origin-top-right" />
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
                <div className="absolute -inset-2 bg-[#7cf0ef]/20 transform -skew-x-3" />
                <div className="relative bg-[#0a0a0a] border border-white/10 p-2">
                  <img src="/createprog_snip.png" alt="Builder" className="w-full" />
                </div>
                <p className="text-xs font-['Space_Mono'] text-white/30 mt-3 text-center tracking-wider">BUILDER</p>
              </div>
              <div className="relative mt-12">
                <div className="absolute -inset-2 bg-white/10 transform skew-x-3" />
                <div className="relative bg-[#0a0a0a] border border-white/10 p-2">
                  <img src="/previewofprogram.png" alt="Session" className="w-full" />
                </div>
                <p className="text-xs font-['Space_Mono'] text-white/30 mt-3 text-center tracking-wider">SESSION</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#7cf0ef]" />
                <span className="text-xs tracking-[0.4em] text-[#7cf0ef] font-['Space_Mono']">THE ENGINE</span>
              </div>

              <h2 className="text-5xl md:text-6xl tracking-tight leading-tight mb-8">
                INTELLIGENT<br />
                <span className="text-[#7cf0ef]">PERIODIZATION</span>
              </h2>

              <p className="text-lg font-['Space_Mono'] text-white/50 leading-relaxed mb-8">
                Our algorithm processes your training data—volume, intensity, fatigue markers—and
                generates programs that push you to the edge without pushing you over.
              </p>

              <div className="space-y-4">
                {['RIR-based auto-regulation', 'Volume landmark tracking', 'Automated deload scheduling'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-px bg-[#7cf0ef]" />
                    <span className="text-sm font-['Space_Mono'] tracking-wide">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-16 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7cf0ef]/5 via-transparent to-[#7cf0ef]/5" />

        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '500+', label: 'EXERCISES' },
              { num: '∞', label: 'PROGRAMS' },
              { num: '24/7', label: 'ACCESS' },
              { num: 'FREE', label: 'FOREVER' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl md:text-6xl font-black text-[#7cf0ef] mb-2">{stat.num}</div>
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
            <FeatherLogo className="w-20 h-24 mx-auto mb-8" />

            <h2 className="text-6xl md:text-8xl tracking-tight mb-8">
              <GlitchText>START</GlitchText>
              <br />
              <span className="text-[#7cf0ef]">NOW</span>
            </h2>

            <p className="text-lg font-['Space_Mono'] text-white/50 max-w-md mx-auto mb-12">
              Join thousands of athletes who refuse to accept anything less than
              systematic, intelligent progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-6 bg-white text-[#0a0a0a] text-lg tracking-[0.1em] font-bold hover:bg-[#7cf0ef] transition-colors"
              >
                iOS DOWNLOAD
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-6 border-2 border-white text-lg tracking-[0.1em] hover:bg-white hover:text-[#0a0a0a] transition-colors"
              >
                ANDROID DOWNLOAD
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <FeatherLogo className="w-8 h-10" />
              <span className="text-sm tracking-[0.2em]">ATHLETICKLE © 2026</span>
            </div>
            <div className="flex gap-8 text-xs tracking-[0.2em] text-white/40 font-['Space_Mono']">
              <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS</a>
              <a href="#" className="hover:text-white transition-colors">CONTACT</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
