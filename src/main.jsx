import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { resolveRoute } from './lib/routes.js'
import './index.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Production pages are prerendered (scripts/prerender.mjs) — hydrate them when
// the markup belongs to this URL. If a host served another page's HTML (e.g. a
// fallback to index.html for an unknown path), render fresh instead.
const prerenderedFor = root.dataset.route
if (root.firstElementChild && prerenderedFor === resolveRoute(window.location.pathname).path) {
  ReactDOM.hydrateRoot(root, app)
} else {
  root.textContent = ''
  ReactDOM.createRoot(root).render(app)
}
