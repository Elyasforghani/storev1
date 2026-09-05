# ShopNext — Modern E-Commerce Store

A production-ready e-commerce application built with Next.js, featuring a curated product catalog, intelligent cart management, and a clean, modern interface.

**Live Demo:** [storev1-jet.vercel.app](https://storev1-jet.vercel.app)

---
<div class=" grid grid-cols2">
<img width="1886" height="885" alt="Image" src="https://github.com/user-attachments/assets/efeaf69e-038d-48e5-93a8-7b69b1196ab2" />

<img width="1877" height="847" alt="Image" src="https://github.com/user-attachments/assets/5275db38-665d-4f87-8ccb-ec912518004d" />

<img width="1900" height="912" alt="Image" src="https://github.com/user-attachments/assets/23c616f3-73a1-494b-aaea-0d89b165df73" />

<img width="1885" height="894" alt="Image" src="https://github.com/user-attachments/assets/de1c7fea-9d11-4e30-8148-57849948a094" />
</div>
## Overview

ShopNext is a fully functional e-commerce store showcasing cosmetics, fragrances, furniture, and groceries. The application emphasizes seamless user experience with real-time cart management, product filtering, and dynamic pricing displays.

### Key Features

- **Product Catalog** — Browse 30+ items across multiple categories (beauty, fragrances, furniture, groceries)
- **Advanced Filtering** — Sort by category, price range, and customer ratings
- **Deal of the Day** — Highlighted discount product with dynamic pricing
- **Cart Management** — Add/remove items with persistent state using Zustand
- **Responsive Design** — Mobile-first layout with Tailwind CSS
- **Product Details** — Individual product pages with descriptions, ratings, and images
- **Promotional Codes** — SAVE10 promo code for instant discounts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS v3 |
| **State Management** | Zustand |
| **Data Source** | DummyJSON API |
| **Deployment** | Vercel |
| **Version Control** | GitHub |

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/elyasforghani/storev1.git
cd storev1

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

---

## Project Structure

```
storev1/
├── app/
│   ├── page.js              # Home/catalog page
│   ├── [id]/
│   │   └── page.js          # Product detail page
│   ├── cart/
│   │   └── page.js          # Shopping cart page
│   └── layout.js            # Root layout
├── components/
│   ├── Header.jsx           # Navigation & cart button
│   ├── ProductCard.jsx      # Product listing component
│   ├── ProductFilter.jsx    # Category & sort filters
│   └── CartSummary.jsx      # Cart total display
├── store/
│   └── cartStore.js         # Zustand cart state
├── lib/
│   ├── api.js               # DummyJSON API calls
│   └── utils.js             # Helper functions
├── styles/
│   └── globals.css          # Global Tailwind styles
└── public/                  # Static assets
```

---

## How It Works

### Cart State Management

Cart state is managed globally using Zustand, enabling:
- Real-time item count updates
- Persistent cart data (localStorage integration optional)
- Add/remove/update quantity operations
- Cart total calculation

```javascript
// cartStore.js
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, product]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  }))
}));
```

### Product Data Flow

1. **Homepage** fetches all products from DummyJSON API
2. **Filtering & Sorting** applied client-side on product array
3. **Product Cards** render with image, title, price, discount, and CTA button
4. **Detail Pages** load individual product data by ID
5. **Cart Updates** trigger state changes and UI re-renders

### API Integration

Products are fetched from the free DummyJSON API:

```javascript
// lib/api.js
export async function getProducts() {
  const res = await fetch('https://dummyjson.com/products');
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}
```

---

## Styling & Design

The application uses **Tailwind CSS** with a clean, editorial aesthetic:

- **Color Palette** — Neutral grays with accent highlights
- **Typography** — Clear hierarchy with Geist font family
- **Spacing** — Consistent grid-based layout
- **Components** — Reusable, utility-first styled elements
- **Responsive** — Mobile-first breakpoints (sm, md, lg, xl)

### Key CSS Patterns

```css
/* Glass morphism effect (optional) */
@apply backdrop-blur-md bg-white/10 rounded-lg

/* Smooth transitions */
@apply transition-all duration-200 ease-out

/* Responsive grid */
@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
```

---

## Features in Detail

### Sorting Options

- **Featured** — Curated selection (default)
- **Price: Low to High** — Ascending price order
- **Price: High to Low** — Descending price order
- **Top Rated** — By customer rating (4.5+ stars first)
- **Biggest Savings** — By discount percentage

### Category Filtering

Products are organized into:
- **Beauty** — Cosmetics and skincare
- **Fragrances** — Perfumes and colognes
- **Furniture** — Home and office furnishings
- **Groceries** — Food and beverage items

### Discount Display

Each product shows:
- Original price (struck through)
- Discounted price (highlighted)
- Savings percentage (badge)

---

## Performance Optimizations

- **Image Optimization** — Next.js `<Image>` component for lazy loading
- **Code Splitting** — Automatic route-based splitting via App Router
- **Client-Side Rendering** — Filtering/sorting done on client for instant UX
- **Vercel Deployment** — Edge functions and automatic scaling

---

## Future Enhancements

- [ ] User authentication & account management
- [ ] Order history & wishlist
- [ ] Payment integration (Stripe/PayPal)
- [ ] Search bar with autocomplete
- [ ] Product reviews & ratings system
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Inventory management

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The app is pre-configured for Vercel and will auto-deploy on every push to the main branch.

### Alternative Platforms

- **Netlify** — Works with Next.js (requires serverless functions)
- **AWS Amplify** — Full AWS integration
- **Docker** — Containerized deployment

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Contributing

This is a portfolio project. Feel free to fork and adapt for your own use.

---

## License

Open source. Available for personal and commercial use.

---

## Author

**Elyas Forghani**

- Portfolio: [elyasforghani.com](https://elyasforghani.com)
- GitHub: [@elyasforghani](https://github.com/elyasforghani)
- LinkedIn: [elyas-forghani](https://www.linkedin.com/in/elyas-forghani-b4746b263/)
- Instagram: [@elyasforghani.dev](https://www.instagram.com/elyasforghani.dev)

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [DummyJSON API](https://dummyjson.com)
- [Vercel Deployment](https://vercel.com)
