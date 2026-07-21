import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { localeFromPath } from './blog/paths.ts'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App initialLocale={localeFromPath(window.location.pathname) ?? undefined} />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered (see scripts/prerender.ts) and hydrate;
// dev serves an empty #root and renders from scratch.
if (container.hasAttribute('data-fallback')) {
  // static host served 404.html for an unknown URL — its English shell may
  // not match this URL's locale, so client-render instead of hydrating
  container.innerHTML = ''
  createRoot(container).render(app)
} else if (container.childElementCount > 0) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
