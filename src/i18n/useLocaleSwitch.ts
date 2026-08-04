import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { blogPath, blogSlugFromPath, swapLocaleInPath } from '../blog/paths'
import { getPost } from '../blog/posts'
import type { Locale } from './translations'

// On blog routes the locale is part of the URL, so switching language
// navigates to the same page under the new locale prefix. When the current
// page is a blog post that has no version in the target locale (posts may be
// English-only), fall back to that locale's blog index instead of a 404.
export function useLocaleSwitch() {
  const { setLocale } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  return (next: Locale) => {
    setLocale(next)
    let target = swapLocaleInPath(location.pathname, next)
    const slug = blogSlugFromPath(location.pathname)
    if (slug && !getPost(next, slug)) target = blogPath(next)
    if (target !== location.pathname) navigate(target)
  }
}
