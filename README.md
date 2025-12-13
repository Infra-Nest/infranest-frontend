# Infranest Frontend 🚀

Frontend del proyecto **Infranest**, construido con **React + TypeScript** usando **Vite**.

---

## 🔖 Tecnologías

| Tecnología | Versión |
|------------|---------|
| Node.js    | 20.16.0 |
| npm        | 10.x.x  |
| React      | 19.2.3  |
| TypeScript | 5.9.3   |
| Vite       | 7.2.7   |

![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.7-blue?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-20.16.0-green?logo=node.js)

---

## ⚡ Instalación

Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone <URL_DEL_REPO>
cd infranest-frontend
```

Instala las dependencias:

```bash
npm install
```

---

## 🚀 Ejecución en desarrollo
Para iniciar la app en modo desarrollo:

```bash
npm run dev
```
Abre tu navegador en la dirección que aparezca en la consola (por ejemplo, http://localhost:5173).

---

## 🏗 Estructura básica del proyecto
```php
Copiar código
infranest-frontend/
├─ node_modules/       # dependencias
├─ public/             # archivos estáticos
├─ src/                # código fuente
│  ├─ App.tsx          # componente principal
│  └─ main.tsx         # punto de entrada
├─ package.json        # info del proyecto y dependencias
├─ tsconfig.json       # configuración TypeScript
├─ vite.config.ts      # configuración Vite
└─ .gitignore          # archivos ignorados por Git
```

---

## 🔹 Notas
* Se utiliza TypeScript para mayor seguridad y escalabilidad.

* `.gitignore` incluye `node_modules/`, `dist/` y archivos de configuración locales para mantener el repo limpio.

* Puedes agregar librerías adicionales según necesites (React Router, Tailwind, Material UI, etc.).

📄 Licencia
Este proyecto es libre de usar y modificar según tus necesidades.

yaml
Copiar código

---

Si quieres, puedo hacer también **una versión más “minimalista para GitHub”** que quede limpia y bonita en la página principal del repo, lista para mostrar a otros.  

¿Quieres que haga eso?

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
