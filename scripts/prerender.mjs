// Writes one static HTML file per route after `vite build`, each with its
// own <head> tags, plus 404.html, sitemap.xml and robots.txt.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.m?js$/.test(f))
const { render, ROUTES, COMPANY } = await import(pathToFileURL(path.join(ssrDir, entry)).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
for (const marker of ['<!--app-html-->', '<!--app-head-->']) {
  if (!template.includes(marker)) throw new Error(`dist/index.html is missing ${marker}`)
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headTags(meta) {
  const image = `${COMPANY.siteUrl}/og-image.png`
  const tags = [
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : '',
    meta.url ? `<link rel="canonical" href="${esc(meta.url)}" />` : '',
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(COMPANY.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    meta.url ? `<meta property="og:url" content="${esc(meta.url)}" />` : '',
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    // JSON-LD: escape "<" so the payload can never close the script tag
    meta.jsonLd ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>` : '',
  ]
  return tags.filter(Boolean).join('\n    ')
}

function page(url) {
  const { html, meta, path: routePath } = render(url)
  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace('<!--app-head-->', headTags(meta))
    // Tag the markup with its route so the client only hydrates matching HTML
    .replace('<div id="root">', `<div id="root" data-route="${esc(routePath)}">`)
    .replace('<!--app-html-->', html)
}

for (const url of ROUTES) {
  const out = path.join(dist, url, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, page(url))
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404/'))

const today = new Date().toISOString().slice(0, 10)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((u) => `  <url><loc>${COMPANY.siteUrl}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${COMPANY.siteUrl}/sitemap.xml\n`)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${ROUTES.length} pages + 404.html, sitemap.xml, robots.txt`)
