import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Adds <link rel="preload"> for the two self-hosted font files so text
// renders in the brand fonts without waiting for the CSS to be parsed.
function preloadFonts() {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        if (!bundle) return html
        const fonts = Object.keys(bundle).filter((f) => /(sora|plus-jakarta-sans)-latin-wght-normal.*\.woff2$/.test(f))
        const tags = fonts.map((f) => ({
          tag: 'link',
          attrs: { rel: 'preload', href: `/${f}`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head',
        }))
        return { html, tags }
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadFonts()],
})
