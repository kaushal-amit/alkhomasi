// Injects the server-rendered app into dist/index.html after `vite build`.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = path.join(root, 'dist-ssr')
const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.m?js$/.test(f))
const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href)

const indexPath = path.join(root, 'dist', 'index.html')
const template = fs.readFileSync(indexPath, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('dist/index.html is missing the <!--app-html--> placeholder')

fs.writeFileSync(indexPath, template.replace('<!--app-html-->', render()))
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('Prerendered dist/index.html')
