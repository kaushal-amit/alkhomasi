import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { ROUTES, resolveRoute, getMeta } from './lib/routes.js'
import { COMPANY } from './data/site.js'

// Used at build time by scripts/prerender.mjs to turn each page into static
// HTML, so it is readable before (and without) JavaScript.
export { ROUTES, COMPANY }

export function render(url) {
  const route = resolveRoute(url)
  return { html: renderToString(<App url={url} />), meta: getMeta(route), path: route.path }
}
