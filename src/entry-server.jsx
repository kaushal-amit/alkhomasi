import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used at build time by scripts/prerender.mjs to turn the app into static
// HTML, so the page is readable before (and without) JavaScript.
export function render() {
  return renderToString(<App />)
}
