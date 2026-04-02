# Project Refactoring Documentation

## 📁 New Structure Overview

This document describes the refactored project structure following production-level best practices.

```
src/
├── assets/
│   └── icons/                 # SVG icons and image assets
├── components/
│   ├── common/               # Reusable components (Header, Footer)
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── sections/             # Page sections (Hero, Feat ures, Menu, etc.)
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── MenuSection.jsx    # Refactored with MenuItem sub-component
│   │   ├── VisitSection.jsx   # Refactored with GalleryGrid sub-component
│   │   └── ReviewsSection.jsx # Refactored with ReviewCard sub-component
│   └── cart/                 # Cart modal component
│       └── CartPanel.jsx      # Refactored into 4 sub-components:
│                              #   - CartPhase, CartItem
│                              #   - CheckoutPhase, CheckoutForm
│                              #   - SuccessPhase
├── pages/
│   └── HomePage.jsx          # Main landing page (replica of old App.jsx)
├── layouts/                  # (Future) Layout wrappers
├── hooks/
│   └── useCart.js            # Shopping cart state management
├── data/
│   ├── menu.json             # Menu items (unchanged)
│   └── constants.js          # Brand, features, gallery data
├── services/                 # (Future) API layer for backend
│   └── README.md
├── utils/
│   └── fallbackIcon.js       # Image fallback SVG
├── styles/
│   └── index.css             # Consolidated global styles
├── main.jsx                  # Entry point (updated)
└── App.jsx                   # (Old file - can be deleted)
```

## 🎯 Key Improvements

### 1. **Better Component Organization**
- **common/**: Reusable header/footer components
- **sections/**: Page sections (each section is now its own component)
- **cart/**: All c art-related logic in one place
- **pages/**: Future-ready for multi-page routing

### 2. **Improved Code Quality**
- **Extracted Sub-Components**: Reduced duplication and improved readability
  - `MenuSection` → `MenuItem` (reusable menu item card)
  - `VisitSection` → `GalleryGrid` (gallery grid logic)
  - `ReviewsSection` → `ReviewCard` (individual review card)
  - `CartPanel` → `CartPhase`, `CartItem`, `CheckoutPhase`, `CheckoutForm`, `SuccessPhase`

- **Enhanced Documentation**: Added JSDoc comments to major components and functions

- **Consistent Naming**: 
  - Components use `CapitalCase` (e.g., `HeroSection`)
  - Utilities use `camelCase` (e.g., `fallbackIcon`)
  - CSS classes use `camelCase` (e.g., `.menuItem`)

### 3. **Absolute Imports**
- Configured Vite with path alias `@` → `./src`
- Cleaner imports: `import '@/data/constants'` instead of `'../../data/constants'`

### 4. **Consolidated Styling**
- All CSS moved to `/styles/index.css`
- Single source of truth for styles
- Removed: `cart/cart.css`, `App.css` (legacy)
- Easier theme updates and maintenance

### 5. **Service Layer Ready**
- `/services` folder established for future API integration
- Prepared for backend order submission, menu fetching, etc.

### 6. **Scalable Data Management**
- `/data/constants.js` holds design constants (brand, features, gallery)
- `/hooks/useCart.js` encapsulates all cart logic
- Future: Add more custom hooks for other features

## 🔄 Component Hierarchy

```
HomePage (pages/HomePage.jsx)
├── Header (common/Header.jsx)
├── HeroSection (sections/HeroSection.jsx)
├── FeaturesSection (sections/FeaturesSection.jsx)
│   └── Feature cards (mapped)
├── MenuSection (sections/MenuSection.jsx)
│   ├── MenuItem (sub-component)
│   ├── Search/Filter controls
│   └── Preview vs. Expanded views
├── VisitSection (sections/VisitSection.jsx)
│   ├── GalleryGrid (sub-component)
│   └── Lightbox modal
├── ReviewsSection (sections/ReviewsSection.jsx)
│   └── ReviewCard (sub-component)
├── CartPanel (components/cart/CartPanel.jsx)
│   ├── CartPhase
│   │   └── CartItem (sub-component)
│   ├── CheckoutPhase
│   │   └── CheckoutForm (sub-component)
│   └── SuccessPhase
└── Footer (common/Footer.jsx)
```

## 🚀 Future Enhancements

### 1. **API Integration** (`services/`)
```javascript
// Example structure
export async function submitOrder(orderData) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })
  return res.json()
}

export async function fetchMenu() {
  // Load menu from backend
}
```

### 2. **Multi-Page Routing**
```
pages/
├── HomePage.jsx       // Current landing page
├── MenuPage.jsx       // Dedicated menu browsing
├── reservation/
│   └── ReservationPage.jsx
└── admin/
    └── DashboardPage.jsx
```

### 3. **Global State Management**
- If app grows, migrate `useCart` from local hook to Context API or Zustand
- Keep current structure; just replace hook with store consumer

### 4. **Theme System**
- Extract CSS variables to `styles/tokens.css`
- Create `styles/themes.css` for light/dark mode
- Leverage existing `::root` CSS variables

### 5. **Utility Functions**
```
utils/
├── fallbackIcon.js    // Current
├── formatters.js      // Price, date formatting
├── validators.js      // Form validation
└── api.js            // HTTP client wrapper
```

## ✅ Migration Checklist

- ✅ Created new folder structure
- ✅ Moved components to appropriate folders
- ✅ Consolidated all CSS into `styles/index.css`
- ✅ Updated imports to use absolute paths (`@/...`)
- ✅ Configured Vite with alias
- ✅ Extracted sub-components to reduce duplication
- ✅ Added JSDoc comments
- ✅ Created `pages/HomePage.jsx`
- ✅ Prepared `/services` folder for APIs
- ✅ Updated `main.jsx` entry point

## 🔧 Development

### Running the Project
```bash
cd pizzeria-project
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

### File Locations for Quick Reference
- **Main Page Logic**: `src/pages/HomePage.jsx`
- **Cart Logic**: `src/hooks/useCart.js`, `src/components/cart/CartPanel.jsx`
- **Styles**: `src/styles/index.css`
- **Menu Data**: `src/data/menu.json`
- **Brand Data**: `src/data/constants.js`
- **Utility Functions**: `src/utils/`

## 📝 Notes

- **Old app.jsx**: Can be safely deleted (functionality moved to `pages/HomePage.jsx`)
- **Old CSS files**: Can be deleted (consolidated into `styles/index.css`)
- **No Functionality Changes**: UI and behavior remain identical
- **Backwards Compatible**: All menu data and styling preserved exactly
