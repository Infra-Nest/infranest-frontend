import { createServer, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDirectory = fileURLToPath(new URL('.', import.meta.url))
const landingPages = [
  { fileName: 'index.html', language: 'es' },
  { fileName: 'en/index.html', language: 'en' },
] as const

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'prerender-landing',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, bundle) {
      for (const page of landingPages) {
        const html = bundle[page.fileName]
        if (!html || html.type !== 'asset') throw new Error(`Missing landing HTML: ${page.fileName}`)
      }
      const server = await createServer({
        configFile: false,
        plugins: [react()],
        // This short-lived server only renders SSR; it never serves a browser.
        optimizeDeps: { noDiscovery: true, include: [] },
        server: { middlewareMode: true, watch: null },
        appType: 'custom',
      })
      try {
        const { default: App } = await server.ssrLoadModule('/src/App.tsx')
        const { getMissingEnglishTranslations } = await server.ssrLoadModule('/src/translationAudit.ts')
        for (const page of landingPages) {
          const html = bundle[page.fileName]
          if (!html || html.type !== 'asset') throw new Error(`Missing landing HTML: ${page.fileName}`)
          const markup = renderToString(createElement(App, { language: page.language }))
          if (page.language === 'en') {
            const missingTranslations = getMissingEnglishTranslations()
            if (missingTranslations.length > 0) {
              throw new Error(`Missing English translations:\n${missingTranslations.map((copy: string) => `- ${copy}`).join('\n')}`)
            }
          }
          const template = String(html.source)
          if (!template.includes('<div id="root"></div>')) throw new Error(`Missing prerender root: ${page.fileName}`)
          const previewRobots = process.env.VERCEL_ENV === 'preview' ? '<meta name="robots" content="noindex, nofollow" />' : ''
          html.source = template
            .replace('</head>', `${previewRobots}</head>`)
            .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
        }
      } finally {
        await server.close()
      }
    },
  }],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDirectory, 'index.html'),
        en: resolve(rootDirectory, 'en/index.html'),
      },
    },
  },
})
