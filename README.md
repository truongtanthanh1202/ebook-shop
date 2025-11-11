# 📚 E-Book Shop

A modern e-book reading application built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Key Features

- **📖 PDF Reading**: View and read PDF books with full control features.
- \*\*👌🏼 Supports keyboard shortcuts in book reading page
- **💾 Reading Progress**: Automatically save reading progress to localStorage
- **🎯 Page Control**: Navigate pages with buttons, keyboard shortcuts, or direct page input
- **🔍 Zoom Control**: Adjust PDF display size
- **📱 Responsive UI**: Compatible with all screen sizes
- **⚡ High Performance**: Using Vite for fast development and build

## 🚀 Getting Started

### System Requirements

- Define in .nvmrc

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ebook-shop
```

2. Install dependencies:

```bash
npm install
```

2.5 Check husky :v. Setup Husky git hooks

```bash
npm run prepare
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## 📜 Available Scripts

### Development

- `npm run dev` - Start development server with hot reload
- `npm run preview` - Preview production build locally

### Build & Production

- `npm run build` - Build for production with TypeScript check
- `npm run build:testing` - Build for testing environment
- `npm run build:production` - Build for production environment

### Code Quality

- `npm run lint` - Check ESLint errors
- `npm run lint:fix` - Auto-fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Check TypeScript types

## 📁 Project Folder Structure

```
ebook-shop/
├── public/                     # Static files
├── src/                        # Source code
│   ├── assets/                 # Assets (images, data, styles)
│   │   ├── data/              # JSON data files (books.json)
│   │   ├── files/             # Static files
│   │   ├── icons/             # Icon assets
│   │   ├── images/            # Image assets
│   │   └── styles/            # SCSS styles
│   │       ├── app.scss       # Main SCSS entry
│   │       ├── common/        # Common styles (variables, fonts, general)
│   │       ├── components/    # Component-specific styles
│   │       └── libs/          # Third-party styles (Tailwind)
│   │
│   ├── components/            # Shadcn/UI components
│   │   └── ui/
│   │
│   ├── core/                  # Core application logic (API interaction)
│   │
│   ├── layout/                # Layout components
│   │
│   ├── lib/                   # Utility libraries using by Shadcn/ui
│   │   └── utils.ts
│   │
│   ├── modules/               # Feature modules
│   │   ├── homepage/         # Homepage module
│   │   │   ├── components/   # Homepage-specific components
│   │   │   ├── constants/    # Homepage constants
│   │   │   ├── pages/        # Homepage pages
│   │   │   ├── routes.tsx    # Homepage routing
│   │   │   └── types/        # Homepage TypeScript types
│   │   │
│   │   ├── bookManager/      # Book reading module
│   │   │   ├── components/   # Reading components (PDFViewer, ControlBar, etc.)
│   │   │   ├── constants/    # Reading constants (PDF settings, shortcuts)
│   │   │   ├── hooks/        # Reading hooks (useReadingProgress)
│   │   │   ├── pages/        # Reading pages (BookReading)
│   │   │   ├── routes.tsx    # Reading routing
│   │   │   └── types/        # Reading TypeScript types
│   │   │
│   │   └── notFound/         # 404 page module
│   │
│   ├── router/                # Application routing
│   │   ├── index.tsx         # Main router setup
│   │   └── routes.ts         # Route definitions
│   │
│   ├── services/              # API services
│   │
│   ├── shared/                # Shared utilities across modules
│   │   ├── common/           # Common shared logic
│   │   ├── components/       # Shared components
│   │   ├── constants/        # Global constants (route names)
│   │   ├── helpers/          # Utility helper functions
│   │   ├── hooks/            # Shared hooks
│   │   └── interfaces/       # Shared TypeScript interfaces
│   │
│   ├── store/                 # State management
│   │   ├── hooks.ts          # Redux hooks
│   │   ├── index.ts          # Store setup
│   │   ├── store.ts          # Store configuration
│   │   └── modules/          # Store modules (readingBook slice)
│   │
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global CSS with Tailwind
│
├── types/                     # Global TypeScript definitions
├── env/                       # Environment configuration
├── dist/                      # Build output
├── .husky/                    # Git hooks configuration
├── components.json            # shadcn/ui configuration
├── eslint.config.js           # ESLint configuration
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Project dependencies and scripts
```

## 🎯 Key Folder Functions

### `/src/modules/`

Contains independent feature modules:

- **homepage**: Home page displaying book list and reading progress
- **bookManager**: Book reading module with PDF viewer, control bar, progress saving
- **notFound**: 404 page

### `/src/components/ui/`

Reusable UI components:

- **button**: Button component with variants
- **carousel**: Carousel component for book display
- **progress-bar**: Reading progress bar

### `/src/shared/`

Shared utilities and logic:

- **constants**: Route names and global constants
- **helpers**: Helper functions (readingProgress utilities)
- **hooks**: Shared custom hooks

### `/src/store/`

State management with Redux Toolkit:

- **modules/readingBook**: Slice managing reading book state

## 🛠️ Technology Stack

- **React 19** with TypeScript
- **Vite** for development and build
- **Tailwind CSS** + SCSS for styling
- **react-pdf** for PDF display
- **react-router** for routing
- **Redux Toolkit** for state management
- **ESLint** + **Prettier** for code quality
- **Husky** for git hooks

## 📝 Notes

- Reading progress is saved in localStorage
- Supports keyboard shortcuts in book reading page
- Responsive design for mobile and desktop
- Hot reload in development mode
