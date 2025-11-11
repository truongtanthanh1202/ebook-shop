# Ebook Shop

A modern React application built with Vite, TypeScript, Tailwind CSS, and SCSS.

## 🚀 Features

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with SCSS support for styling
- **Prettier** for code formatting
- **ESLint** for code linting
- **Husky** for Git hooks
- **Google Fonts** (Poppins) integration
- Pre-commit hooks for code quality

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

## 🧹 Code Quality

### Formatting

- Check formatting: `npm run format:check`
- Fix formatting: `npm run format`

### Linting

- Check linting: `npm run lint`
- Fix linting: `npm run lint:fix`

### Type Checking

- Run TypeScript check: `npm run type-check`

## 🎨 Styling

This project uses a combination of Tailwind CSS and custom SCSS:

### File Structure

```
src/assets/styles/
├── main.scss              # Main entry point with Tailwind imports
├── app.scss              # Custom SCSS imports
├── libs/
│   ├── _variables.scss   # SCSS variables
│   └── _mixins.scss      # SCSS mixins
├── common/
│   ├── _reset.scss       # CSS reset
│   ├── _typography.scss  # Typography styles
│   └── _layout.scss      # Layout utilities
└── components/
    ├── _buttons.scss     # Button components
    ├── _cards.scss       # Card components
    └── _forms.scss       # Form components
```

### Usage

- Use Tailwind utilities for rapid development
- Use custom SCSS components for complex styling
- All styles use the Poppins font family

## 🔧 Git Hooks

### Pre-commit

- Runs ESLint with auto-fix
- Runs Prettier formatting
- Only on staged files

### Pre-push

- Runs TypeScript type checking

## 🏗️ Build

```bash
npm run build
```

## React + TypeScript + Vite

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
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

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
]);
```
