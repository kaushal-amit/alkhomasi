import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Production HTML is prerendered (see scripts/prerender.mjs) — hydrate it.
// In dev the root is empty, so render from scratch.
if (root.firstElementChild) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
