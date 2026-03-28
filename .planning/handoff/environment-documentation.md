# MoveSmart Rentals — Environment and Architecture Documentation

> Last updated: 2026-03-28
>
> This document provides everything a developer needs to understand the project
> architecture, set up a local development environment, and deploy to production.

---

## 1. Architecture Overview

MoveSmart Rentals is a server-rendered Next.js website backed by Sanity CMS,
deployed on Vercel with edge CDN and automatic SSL.

| Layer         | Technology                           |
|---------------|--------------------------------------|
| Framework     | Next.js 15.2.4 (App Router)          |
| Language      | TypeScript 5                         |
| Styling       | Tailwind CSS v4                      |
| CMS           | Sanity v3 (Free Tier)                |
| Hosting       | Vercel (auto-deploy from GitHub)     |
| CDN / SSL     | Vercel Edge Network (automatic)      |
| Analytics     | Google Analytics 4 via Google Tag Manager |
| Chat          | Zoho SalesIQ (lazy-loaded widget)    |
| Spam Protection | Google reCAPTCHA v3                |

### Content Architecture

- **9 CMS content types**: City, CityService, Service, Province, BlogGuide,
  Comparison, CaseStudy, FAQ, PropertyCategory
- **10 block components**: Hero, CTA Banner, FAQ, Service Grid, City Grid,
  Property Card, Trust, How It Works, Pain Point, Benefits
- **ISR (Incremental Static Regeneration)**: Pages are statically generated at
  build time and revalidated on-demand when content is published in Sanity via
  webhook-triggered revalidation.

### URL Structure

```
/ca/{province}/{city}/{service}/      # Canadian city-service pages
/us/{state}/{city}/{service}/         # US city-service pages
/ca/{province}/{city}/                # City hub pages
/us/{state}/{city}/                   # US city hub pages
/ca/{province}/                       # Province pages
/us/{state}/                          # US state pages
/ca/                                  # Canada hub
/us/                                  # US hub
/services/{service}/                  # National service pages
/resources/{slug}/                    # Blog guides, comparisons, case studies
/owners/                              # Owner hub
/tenants/                             # Tenant hub
/contact/                             # Contact page with form
/studio/                              # Sanity Studio (embedded)
```

All URLs use trailing slashes and lowercase enforcement via Next.js middleware.

---

## 2. Directory Structure

```
src/
  app/                        # Next.js pages and API routes (App Router)
    (site)/                   # Public-facing pages under shared layout
      ca/[province]/          # Canadian geographic routes
        [city]/
          [service]/
          rentals/[slug]/
      us/[state]/             # US geographic routes
        [city]/
          [service]/
      services/[service]/     # National service pages
      resources/[slug]/       # Blog/guide/comparison/case study pages
      owners/                 # Owner hub
      tenants/                # Tenant hub
      about/                  # About page
      contact/                # Contact page
      faq/                    # FAQ hub
      locations/              # Locations directory
      pricing/                # Pricing page
      franchising/            # Franchising page
    api/                      # API routes
      contact/                # Contact form submission handler
      revalidate/             # Sanity webhook ISR revalidation
      analytics/              # Analytics data endpoint
    studio/                   # Sanity Studio (embedded at /studio)
    layout.tsx                # Root layout (GTM, SalesIQ, Header, Footer)
    page.tsx                  # Homepage
    robots.ts                 # robots.txt generation
    sitemap.ts                # Dynamic XML sitemap (6 segments)
  components/                 # React components
    blocks/                   # 10 CMS block components
    layout/                   # Header, Footer, BreadcrumbNav
    tracking/                 # GTM event tracking components
    ui/                       # Shared UI primitives
    contact-form.tsx          # Contact form with reCAPTCHA
    portable-text.tsx         # Portable Text renderer
  sanity/                     # Sanity configuration
    client.ts                 # Sanity client instance
    fetch.ts                  # sanityFetch() — single CMS data access point
    queries.ts                # All GROQ queries
    schemas/                  # 9 CMS schema definitions
    sanity.config.ts          # Sanity Studio configuration
  lib/                        # Utility functions
    utils.ts                  # URL builders, metadata helpers
    metadata.ts               # SEO metadata generation
    schema-builders.ts        # JSON-LD schema builders
  types/                      # TypeScript type definitions
    blocks.ts                 # Block component prop types
    sanity.ts                 # Sanity document types
```

---

## 3. Environment Variables

All environment variables are listed in `.env.example` at the project root.
Copy it to `.env.local` for local development.

### Public Variables (exposed to browser)

| Variable | Purpose | Where to Get |
|----------|---------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | Sanity Dashboard > Project > Settings > API |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Usually `production` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for OG tags, sitemaps | Set to `https://movesmartrentals.com` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | GTM Dashboard > Container ID (GTM-XXXXXXX) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML verification | GSC > Settings > Ownership verification > HTML tag |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster Tools verification | Bing Webmaster > Settings > Ownership verification |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 client-side site key | Google reCAPTCHA admin console > Site key |
| `NEXT_PUBLIC_SALESIQ_WIDGET_CODE` | Zoho SalesIQ widget identifier | SalesIQ Dashboard > Settings > Widget code |

### Server-Side Variables (never sent to browser)

| Variable | Purpose | Where to Get |
|----------|---------|-------------|
| `SANITY_API_READ_TOKEN` | Sanity API token for authenticated server reads | Sanity Dashboard > API > Tokens > Add token (Viewer role) |
| `SANITY_WEBHOOK_SECRET` | Shared secret for ISR webhook validation | Generate a random string; must match Sanity webhook config |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 server-side verification key | Google reCAPTCHA admin console > Secret key |

### Behavior Notes

- **GTM/SalesIQ**: If `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_SALESIQ_WIDGET_CODE`
  are empty, the respective scripts are not injected (graceful degradation).
- **reCAPTCHA**: If `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY`
  are not set, the contact form works without spam protection (useful for local dev).
- **Site URL**: Falls back to `https://movesmartrentals.com` when not set.

---

## 4. Local Development Setup

### Prerequisites

- **Node.js** 18 or later (LTS recommended)
- **npm** (ships with Node.js)
- **Git** for version control

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/REVUN/movesmart-rentals.git
cd movesmart-rentals

# 2. Copy environment variables
cp .env.example .env.local

# 3. Fill in .env.local with actual values
#    At minimum you need:
#    - NEXT_PUBLIC_SANITY_PROJECT_ID
#    - NEXT_PUBLIC_SANITY_DATASET (usually "production")
#    GTM, SalesIQ, reCAPTCHA are optional for local dev.

# 4. Install dependencies
npm install

# 5. Start development server (uses Turbopack for fast refresh)
npm run dev
```

### Local URLs

| URL | What |
|-----|------|
| `http://localhost:3000` | Site homepage |
| `http://localhost:3000/studio/` | Sanity Studio (CMS admin) |
| `http://localhost:3000/ca/ontario/toronto/` | Example city page |

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

---

## 5. Deployment

### Hosting: Vercel

The project is deployed on Vercel with automatic deployments from GitHub.

**How it works:**
1. Push code to the `main` branch on GitHub
2. Vercel detects the push and starts a new deployment automatically
3. Build runs `next build`, generating static pages and serverless functions
4. Deployment goes live with automatic SSL and edge CDN

### Setting Environment Variables on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the **movesmart-rentals** project
3. Navigate to **Settings > Environment Variables**
4. Add every variable from `.env.example` with production values
5. Ensure variables are enabled for **Production**, **Preview**, and **Development**

**Important:** All 11 variables from `.env.example` must be set in Vercel for
full functionality. The site will build without optional vars (GTM, SalesIQ,
reCAPTCHA) but those features will be disabled.

### Preview Deployments

- Pull requests automatically generate preview deployments
- Each PR gets a unique URL (e.g., `movesmart-rentals-xyz.vercel.app`)
- Preview deployments use the same environment variables as production

---

## 6. ISR Revalidation

### How It Works

The site uses **Incremental Static Regeneration (ISR)** via Sanity webhooks.
Pages are statically generated at build time and revalidated on-demand when
CMS content changes.

**Flow:**
1. Editor publishes or unpublishes a document in Sanity Studio
2. Sanity fires a webhook POST to `/api/revalidate`
3. The webhook handler validates the `SANITY_WEBHOOK_SECRET`
4. Next.js revalidates the affected pages by tag
5. The next visitor sees updated content (typically within 60 seconds)

### Sanity Webhook Configuration

The webhook must be configured in Sanity Dashboard:

1. Go to [Sanity Manage](https://sanity.io/manage) > your project
2. Navigate to **API > Webhooks**
3. Create a webhook with these settings:
   - **URL**: `https://movesmartrentals.com/api/revalidate`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave blank (fires on all document types)
   - **Secret**: Must match `SANITY_WEBHOOK_SECRET` env var
   - **HTTP method**: POST
4. Save the webhook

### Tier-Based Build Strategy

- **Tier-1 cities** (~20 Ontario cities): Pre-rendered at build time for
  instant load on first visit
- **All other pages**: Generated on-demand on first visit, then cached

---

## 7. Content Publishing Flow

1. **Log in** to Sanity Studio at `https://movesmartrentals.com/studio/`
2. **Create or edit** a document (City, CityService, BlogGuide, etc.)
3. **Fill in required fields** — the Studio enforces minimum content:
   - Cities require `metaTitle`, `metaDescription`, and at least 3
     `neighbourhoodNames`
   - CityServices require `localBody` portable text content
4. **Click Publish** — the document goes live
5. **Webhook fires automatically** — the site page updates within 60 seconds
6. **Verify** by visiting the page URL on the live site

No developer involvement is needed for content changes. The webhook handles
all cache invalidation automatically.

---

## 8. Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.2.4 | React framework (App Router, SSR, ISR) |
| `react` | ^19.0.0 | UI library |
| `sanity` | ^4.22.0 | Sanity Studio (embedded CMS admin) |
| `next-sanity` | ^11.6.12 | Sanity integration for Next.js |
| `@sanity/client` | ^7.20.0 | Sanity API client for data fetching |
| `@next/third-parties` | ^16.2.1 | Google Tag Manager integration |
| `@portabletext/react` | ^6.0.3 | Rich text renderer for Sanity content |
| `lucide-react` | ^1.7.0 | Icon library |
| `zod` | ^4.3.6 | Schema validation (contact form) |
| `react-hook-form` | ^7.72.0 | Form state management |
| `@hookform/resolvers` | ^5.2.2 | Zod resolver for react-hook-form |
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `class-variance-authority` | ^0.7.1 | Component variant management |
| `clsx` | ^2.1.1 | Conditional className utility |
| `tailwind-merge` | ^3.5.0 | Tailwind class deduplication |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `typescript` | Type checking |
| `eslint` + `eslint-config-next` | Code linting |
| `prettier` + `prettier-plugin-tailwindcss` | Code formatting |
| `@tailwindcss/postcss` | Tailwind CSS build integration |

---

## 9. Troubleshooting

### Common Issues

**"Cannot find module" errors after clone:**
Run `npm install` to install all dependencies.

**Sanity Studio shows blank page:**
Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set
in `.env.local`.

**Pages show stale content after CMS publish:**
Verify the Sanity webhook is configured correctly and `SANITY_WEBHOOK_SECRET`
matches between Sanity Dashboard and Vercel environment variables.

**Contact form submits but no spam protection:**
Set both `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY`. The form
works without them but has no bot protection.

**GTM/Analytics not tracking:**
Ensure `NEXT_PUBLIC_GTM_ID` is set. GTM scripts are only injected when the
variable is present.

**Build takes too long or times out:**
The ISR strategy pre-renders only Tier-1 cities at build time. If build times
exceed 45 minutes, check `generateStaticParams` for excessive page generation.
