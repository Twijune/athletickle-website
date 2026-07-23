import { useEffect, useRef } from 'react'
import BlogLayout from '../components/BlogLayout'
import { contactMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

const DISCORD_URL = 'https://discord.gg/PrXwF4QSuf'

// Email is assembled at runtime so it never appears as plaintext in the
// prerendered/static HTML that scrapers read. Parts kept separate on purpose.
const EMAIL_USER = 'hello'
const EMAIL_DOMAIN = 'athletickle.com'

export default function Contact() {
  useHead(contactMeta())
  // The address is written into the DOM only after mount, so the prerendered/
  // static HTML that scrapers read shows just the "Loading…" placeholder.
  const emailRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const el = emailRef.current
    if (!el) return
    const addr = `${EMAIL_USER}@${EMAIL_DOMAIN}`
    el.href = `mailto:${addr}`
    el.textContent = addr
  }, [])

  return (
    <BlogLayout>
      <article className="container mx-auto px-8 py-16 max-w-3xl">
        <p className="text-xs tracking-[0.3em] font-['Space_Mono'] text-[#D1622A] mb-4">GET IN TOUCH</p>
        <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05] mb-6">CONTACT</h1>
        <div className="w-16 h-1 bg-[#D1622A] mb-12" />

        <p className="font-['Space_Mono'] text-white/70 leading-relaxed mb-10 max-w-xl">
          The Discord is where it happens — community, questions, and launch updates. For formal,
          legal, or press matters, email us.
        </p>

        <div className="grid sm:grid-cols-2 gap-px bg-white/10 mb-12">
          {/* Discord */}
          <div className="bg-[#0a0a0a] p-10">
            <h2 className="text-xl tracking-wide mb-4">DISCORD</h2>
            <p className="text-sm font-['Space_Mono'] text-white/50 leading-relaxed mb-6">
              Join the community and get launch updates first.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-[#0a0a0a] text-sm tracking-[0.1em] font-bold hover:bg-[#D1622A] transition-colors"
            >
              JOIN THE DISCORD
            </a>
          </div>

          {/* Email */}
          <div className="bg-[#0a0a0a] p-10">
            <h2 className="text-xl tracking-wide mb-4">EMAIL</h2>
            <p className="text-sm font-['Space_Mono'] text-white/50 leading-relaxed mb-6">
              For formal, legal, or press enquiries.
            </p>
            <a
              ref={emailRef}
              href="/contact"
              className="text-[#D1622A] font-['Space_Mono'] underline underline-offset-4 hover:text-[#E07B45] transition-colors break-all"
            >
              Loading email&hellip;
            </a>
          </div>
        </div>
      </article>
    </BlogLayout>
  )
}
