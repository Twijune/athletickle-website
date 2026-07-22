import { Link, useParams } from 'react-router-dom'
import BlogLayout from '../components/BlogLayout'
import NotFound from './NotFound'
import { blogPath, resolveRouteLang } from '../blog/paths'
import { getPosts } from '../blog/posts'
import { useLanguage } from '../i18n/LanguageContext'
import { blogIndexMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

export default function BlogIndex() {
  const { lang: langParam } = useParams()
  const lang = resolveRouteLang(langParam)
  const { t } = useLanguage()
  useHead(lang ? blogIndexMeta(lang) : null)

  if (!lang) return <NotFound />

  const posts = getPosts(lang)

  return (
    <BlogLayout>
      <section className="container mx-auto px-8 py-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-[#D1622A]" />
              <span className="text-xs tracking-[0.4em] text-[#D1622A] font-['Space_Mono']">
                {t('blog.kicker')}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl tracking-tight">{t('blog.title')}</h1>
          </div>
          <span className="text-[120px] font-black text-white/[0.03] leading-none hidden lg:block">
            {String(posts.length).padStart(2, '0')}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10">
          {/* no entrance animation: an initial-hidden motion state would ship
              opacity:0 in the prerendered HTML (blank page before hydration) */}
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="bg-[#0a0a0a] group hover:bg-white/5 transition-colors relative overflow-hidden"
            >
              <Link to={blogPath(lang, post.slug)} className="block p-10">
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#D1622A] group-hover:h-full transition-all duration-300" />

                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-black text-white/10 group-hover:text-[#D1622A]/30 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-['Space_Mono'] tracking-[0.2em] text-white/40">
                    {post.date}
                  </span>
                </div>

                <h2 className="text-xl tracking-wide mb-4">{post.title}</h2>
                <p className="text-sm font-['Space_Mono'] text-white/50 leading-relaxed mb-6">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] font-['Space_Mono'] text-[#D1622A]">
                  {t('blog.readMore')} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </BlogLayout>
  )
}
