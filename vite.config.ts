import { createServer, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'prerender-landing',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') throw new Error('Missing landing HTML')
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
        const markup = renderToString(createElement(App))
        const template = String(html.source)
        if (!template.includes('<div id="root"></div>')) throw new Error('Missing prerender root')
        html.source = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      } finally {
        await server.close()
      }
    },
  }],
})
