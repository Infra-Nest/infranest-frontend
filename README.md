# Infranest Frontend 🚀

Frontend for the **Infranest** project, built with **React + TypeScript** using **Vite**.

---

## 🔖 Technologies

| Technology | Version |
| ---------- | ------- |
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

## ⚡ Installation

Clone the repository and change into the project folder:

```bash
git clone <REPO_URL>
cd infranest-frontend
```

Install dependencies:

```bash
npm install
```

---

## 🚀 Run in development

To start the app in development mode:

```bash
npm run dev
```

Open the address shown in the console (by default, http://localhost:5173).

---

## 🏗 Basic project structure

```
infranest-frontend/
├─ node_modules/       # dependencies
├─ public/             # static files
├─ src/                # source code
│  ├─ App.tsx          # main component
│  └─ main.tsx         # entry point
├─ package.json        # project info and dependencies
├─ tsconfig.json       # TypeScript configuration
├─ vite.config.ts      # Vite configuration
└─ .gitignore          # files ignored by Git
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in rollup-vite) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — uses [SWC](https://swc.rs/) for Fast Refresh.

## React Compiler

The React Compiler is not enabled in this template because of its impact on dev and build performance. To add it, see the React Compiler installation guide: https://react.dev/learn/react-compiler/installation

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Replace tseslint.configs.recommended with a type-checked config
      tseslint.configs.recommendedTypeChecked,
      // Or use the stricter variant
      tseslint.configs.strictTypeChecked,
      // Optionally add stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
