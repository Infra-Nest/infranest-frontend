# Infranest Frontend

Landing corporativa de **Infranest**, startup tecnológica que desarrolla productos propios y ofrece servicios puntuales para integrarlos en el entorno de cada cliente. Desarrollamos productos tecnológicos que convierten problemas complejos en herramientas claras y útiles. **Odimetry** es nuestro primer producto.

## Requisitos

- Node.js 22, según `.nvmrc`
- npm compatible con Node.js 22

## Desarrollo local

```bash
nvm use
npm ci
npm run dev
```

La landing queda disponible en la URL que indique Vite, normalmente `http://localhost:5173`.

Si se ejecutan las dos landings a la vez, usa el puerto 5173 para esta aplicación:

```bash
npm run dev -- --port 5173
```

Para validar la aplicación:

```bash
npm run lint
npm run build
git diff --check
```

## Estructura relevante

```text
infranest-frontend/
├─ public/brand/infranest-mark.svg  # Isotipo corporativo
├─ public/brand/infranest-wordmark*.svg # Logotipo horizontal, variantes de fondo
├─ public/brand/infranest-social.* # Pieza social 1200x630
├─ src/App.tsx                      # Landing y comportamiento de UI
├─ src/index.css                    # Tokens, temas y estilos responsive
├─ index.html                       # Metadatos y favicon
├─ docs/brandbook.md                # Fuente de verdad de marca
└─ .nvmrc                           # Node.js 22
```

Consulta [docs/brandbook.md](docs/brandbook.md) para la arquitectura de marca, paleta, tipografías, usos y comandos de las dos landings.

## SEO y revisión del build

El dominio canónico es `https://infranest.es/`. `index.html`, `public/robots.txt` y
`public/sitemap.xml` comparten ese destino. Los datos estructurados describen
Infranest como organización, sin valoraciones ni afirmaciones comerciales inventadas.

`npm run build` prerenderiza el mismo componente React en `dist/index.html`, con
el contenido y los enlaces disponibles sin JavaScript. React hidrata ese HTML
para activar el menú y el selector de tema. No requiere un servidor de React
en producción ni dependencias adicionales.

Para revisar el resultado que se publicaría:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Después de publicar, comprobar HTTPS, redirecciones al dominio canónico y enviar
el sitemap a Google Search Console. La validación local no acredita indexación
ni posiciones en buscadores.
