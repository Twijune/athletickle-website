import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useParams } from 'react-router-dom'
import BlogLayout from '../components/BlogLayout'
import NotFound from './NotFound'
import { blogPath, resolveRouteLang } from '../blog/paths'
import { getPost } from '../blog/posts'
import { useLanguage } from '../i18n/LanguageContext'
import { blogPostMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

// Maps markdown elements onto the dark-brutalist design language.
const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="flex items-center gap-3 text-3xl md:text-4xl tracking-tight mt-14 mb-6">
      <span className="w-3 h-3 bg-[#D1622A] shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </h2>
  ),
  h3: ({ children }) => <h3 className="text-2xl tracking-tight mt-10 mb-4">{children}</h3>,
  p: ({ children }) => (
    <p className="font-['Space_Mono'] text-white/70 leading-relaxed mb-6">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#D1622A] underline underline-offset-4 hover:text-[#E07B45] transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="space-y-3 mb-6">{children}</ul>,
  ol: ({ children }) => <ol className="space-y-3 mb-6">{children}</ol>,
  li: ({ children }) => (
    <li className="relative pl-8 font-['Space_Mono'] text-white/70 leading-relaxed before:absolute before:left-0 before:top-3 before:w-4 before:h-px before:bg-[#D1622A]">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#D1622A] pl-6 my-8 text-white/60">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-white/10 px-1.5 py-0.5 text-sm font-['Space_Mono'] text-[#E07B45]">
      {children}
    </code>
  ),
  strong: ({ children }) => <strong className="text-white">{children}</strong>,
  hr: () => <hr className="border-white/10 my-10" />,
}

export default function BlogPost() {
  const { lang: langParam, slug } = useParams()
  const lang = resolveRouteLang(langParam)
  const post = lang && slug ? getPost(lang, slug) : undefined
  const { t } = useLanguage()
  useHead(post ? blogPostMeta(post) : null)

  if (!lang || !post) return <NotFound />

  return (
    <BlogLayout>
      <article className="container mx-auto px-8 py-16 max-w-3xl">
        <Link
          to={blogPath(lang)}
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] font-['Space_Mono'] text-white/40 hover:text-white transition-colors mb-10"
        >
          <span aria-hidden="true">←</span> {t('blog.back')}
        </Link>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-['Space_Mono'] tracking-[0.2em]">
          <span className="text-[#D1622A]">{post.date}</span>
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 border border-white/20 text-white/50 uppercase">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05] mb-6">{post.title}</h1>
        <p className="text-lg font-['Space_Mono'] text-white/50 leading-relaxed mb-10">
          {post.description}
        </p>
        <div className="w-16 h-1 bg-[#D1622A] mb-12" />

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {post.body}
        </ReactMarkdown>

        {/* CTA */}
        <div className="mt-20 border-2 border-white/20 p-10 text-center relative">
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-[#D1622A]" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-[#D1622A]" />
          <p className="font-['Space_Mono'] text-white/50 mb-8 max-w-md mx-auto">
            {t('cta.paragraph')}
          </p>
          <a
            href="/#download"
            className="inline-block px-10 py-5 bg-white text-[#0a0a0a] text-lg tracking-[0.1em] font-bold hover:bg-[#D1622A] transition-colors"
          >
            {t('hero.downloadFree')}
          </a>
        </div>
      </article>
    </BlogLayout>
  )
}
