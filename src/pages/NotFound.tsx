import { Link } from 'react-router-dom'
import BlogLayout from '../components/BlogLayout'
import { useLanguage } from '../i18n/LanguageContext'
import { notFoundMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

export default function NotFound() {
  const { t } = useLanguage()
  useHead(notFoundMeta())

  return (
    <BlogLayout>
      <section className="container mx-auto px-8 py-24 text-center">
        <div className="text-[25vw] md:text-[12rem] font-black leading-none text-white/[0.05] select-none">
          404
        </div>
        <h1 className="text-3xl md:text-5xl tracking-tight mb-8">
          <span className="text-[#D1622A]">{t('notfound.title')}</span>
        </h1>
        <Link
          to="/"
          className="inline-block px-10 py-5 border-2 border-white/30 text-sm tracking-[0.2em] font-['Space_Mono'] hover:border-white hover:bg-white/5 transition-all"
        >
          {t('notfound.home')}
        </Link>
      </section>
    </BlogLayout>
  )
}
