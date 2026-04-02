# Tatia’s Pizzeria

Modern, premium pizzeria landing page built with **Vite + Preact**. Includes a functional cart drawer and a clean component-based structure.

## Screenshots

>   `docs/screenshots/` 
> - `docs/screenshots/home.png`
> - `docs/screenshots/sections.png`

![Home](docs/screenshots/home.png)
![Sections](docs/screenshots/sections.png)

## Features

- **Landing page**: hero, features, menu, gallery, reviews, visit, footer
- **Cart drawer**: add items, change quantities, remove, clear, total price
- **UI polish**: smooth scrolling, interactive gallery lightbox, interactive reviews
- **Clean structure**: constants, hooks, components, utilities separated

## Tech stack

- **Vite**
- **Preact** (React-like API)
- **CSS** (no UI framework)

## Getting started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project structure

After refactoring for production, the project now follows a scalable, modular architecture:

```
src/
├── components/
│   ├── common/              # Reusable header & footer
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── sections/            # Page sections
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── MenuSection.jsx
│   │   ├── VisitSection.jsx
│   │   └── ReviewsSection.jsx
│   └── cart/                # Cart modal
│       └── CartPanel.jsx
├── pages/
│   └── HomePage.jsx         # Main landing page
├── hooks/
│   └── useCart.js           # Cart state management
├── data/
│   ├── menu.json            # Menu items
│   └── constants.js         # Brand, features, gallery
├── services/                # API layer (ready for backend integration)
├── utils/
│   └── fallbackIcon.js      # Image fallback utility
├── styles/
│   └── index.css            # Consolidated global styles
└── main.jsx                 # App entry point
```

### Key improvements:
- **Better organization**: Components grouped by responsibility (common, sections, cart, pages)
- **Absolute imports**: Use `@/` prefix for cleaner imports
- **Modular components**: Extracted sub-components to reduce duplication
- **Consolidated styling**: All CSS in one file for easier maintenance
- **Future-ready**: Services folder prepared for API integration, pages folder ready for multi-page routing

See [REFACTORING.md](REFACTORING.md) for detailed refactoring documentation.

