# Uniqliurz - Custom Gifts & Keepsakes

Premium headless Shopify e-commerce store for handcrafted custom gifts and keepsakes. Built with React, TypeScript, and Tailwind CSS, powered by Shopify Storefront API.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Shopify Storefront API (headless)
- **Hosting**: Vercel (www.uniqliurz.com)
- **Domain**: Google Cloud DNS

## Features

- 56 handcrafted products across 10+ categories
- Headless Shopify integration with local product fallback
- Multi-product enquiry system via WhatsApp
- Buy Now with Shopify checkout
- Product personalization (custom text, color, notes)
- Full SEO: structured data (JSON-LD), dynamic meta tags, sitemap
- Responsive design with dark theme (#121212)

## Getting Started

```sh
npm install
npm run dev
```

### Build for production

```sh
npm run build
```

Generates sitemap and builds to `dist/`.

## Environment

No `.env` file required — Shopify credentials are configured in `src/config/shopify.ts`.

## Project Structure

```
src/
├── components/     # UI components (Header, Footer, SchemaMarkup, etc.)
├── config/         # Shopify API configuration
├── data/           # Local product data (56 products)
├── hooks/          # Custom hooks (useProducts, useSEO)
├── lib/            # Shopify client, structured data schemas
├── pages/          # Route pages (Index, Shop, ProductDetail, etc.)
└── App.tsx         # Root with routing and global SchemaMarkup
```

## Deployment

Auto-deploys from GitHub `main` branch to Vercel. Every build generates a fresh sitemap via `scripts/generate-sitemap.js`.

## License

Private - All rights reserved.
