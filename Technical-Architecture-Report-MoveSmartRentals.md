# MoveSmartRentals.com - Technical Architecture Recommendation Report
## Deep Research Findings & Stack Recommendation

**Date:** March 28, 2026
**Project:** MoveSmartRentals.com Website Rebuild
**Scope:** Canada + US rental property management platform
**Timeline:** 29 days, single contractor

---

## TABLE OF CONTENTS

1. [Recommended Tech Stack](#1-recommended-tech-stack)
2. [Template Architecture](#2-template-architecture)
3. [Property Listing System](#3-property-listing-system)
4. [Performance & Core Web Vitals](#4-performance--core-web-vitals)
5. [Schema Markup Implementation](#5-schema-markup-implementation)
6. [XML Sitemaps Strategy](#6-xml-sitemaps-strategy)
7. [Analytics & Tracking Stack](#7-analytics--tracking-stack)
8. [Deployment & Handoff](#8-deployment--handoff)
9. [SalesIQ Integration](#9-salesiq-integration)
10. [29-Day Build Feasibility Assessment](#10-29-day-build-feasibility-assessment)

---

## 1. RECOMMENDED TECH STACK

### Primary Recommendation: Next.js + Sanity CMS + Vercel

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js (App Router) | SSR/SSG/ISR flexibility, React ecosystem, SEO-first architecture |
| **CMS** | Sanity Studio v3 | Non-developer publishing, structured content, real-time collaboration, SEO fields |
| **Hosting** | Vercel | Zero-config Next.js deployment, ISR support, edge functions, preview deployments |
| **Styling** | Tailwind CSS | Rapid UI development, design system tokens, responsive-first |
| **Database** | Sanity Content Lake | Managed, real-time, GROQ query language, no database ops |
| **Search** | Sanity GROQ + Client-side filtering | Server-rendered initial results, progressive enhancement |
| **Images** | Sanity Image Pipeline + Next.js Image | Automatic WebP/AVIF, responsive srcsets, CDN delivery |
| **Analytics** | GA4 + GTM + GSC + Bing Webmaster | Full tracking stack, zero custom infrastructure |
| **Chat** | Zoho SalesIQ | Client requirement, JS widget integration |

### Why This Stack Over Alternatives

**Next.js vs Astro:**
Astro delivers 90% less JavaScript and superior static performance, but MoveSmartRentals needs dynamic property search/filtering, ISR for listing updates, and API routes for form handling. Astro excels at pure content sites but lacks the dynamic rendering flexibility needed here. Next.js provides SSR + SSG + ISR in a single framework.

**Next.js vs Nuxt:**
Both are capable. Next.js wins on ecosystem size, Vercel deployment integration, Sanity CMS first-class support, and the broader contractor talent pool. Nuxt would be equivalent technically but adds risk finding future maintenance developers.

**Sanity vs Strapi vs Payload:**

| Factor | Sanity | Strapi | Payload |
|--------|--------|--------|---------|
| **Non-developer publishing** | Excellent - real-time visual editing, Figma-like collaboration | Good - admin panel, but less polished | Good - click-to-edit, but developer-focused |
| **Structured content** | Excellent - GROQ queries, portable text, references | Good - content types builder | Good - TypeScript schema |
| **SEO fields** | Built-in plugin ecosystem, reusable SEO objects | Plugin-based | Manual configuration |
| **Daily publishing without devs** | Yes - Canvas AI editor, Media Library, scheduled publishing | Yes - but needs more setup | Yes - but more technical |
| **Hosting/ops burden** | Zero - fully managed Content Lake | Self-hosted or Strapi Cloud ($$$) | Self-hosted or Payload Cloud |
| **29-day feasibility** | High - starters available, managed infrastructure | Medium - database setup, hosting config | Medium - same codebase but more config |
| **ISR webhook support** | Native - webhook-triggered revalidation | Requires configuration | Built-in with Next.js |

**Sanity wins** because:
- Zero infrastructure management (no database to provision/maintain)
- Editors can publish daily without developer tickets (contract requirement)
- Real-time collaboration with presence indicators
- Spring 2025 release added Canvas AI editor and centralized Media Library
- Webhook-triggered ISR means content updates go live in seconds without full rebuilds
- Reusable SEO object schemas enforce meta title, description, OG image on every content type

**Payload CMS as Strong Alternative:**
If the client wants everything in one repo (CMS + frontend in the same Next.js app), Payload 3.0 installs directly into the `/app` folder. This reduces moving parts but increases the complexity of the single codebase and makes the admin panel part of the same deployment. For a solo contractor on a 29-day timeline, the Sanity managed approach is less risky.

---

## 2. TEMPLATE ARCHITECTURE

### 22+ Template Types - Component-Based Architecture

#### Directory Structure
```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Homepage
│   │   ├── about/page.tsx              # About
│   │   ├── contact/page.tsx            # Contact
│   │   └── layout.tsx                  # Marketing layout shell
│   ├── (services)/
│   │   ├── [service]/page.tsx          # Service detail
│   │   ├── [service]/[city]/page.tsx   # Service + City (programmatic SEO)
│   │   └── layout.tsx
│   ├── (listings)/
│   │   ├── page.tsx                    # All listings
│   │   ├── [category]/page.tsx         # Category (apartments, condos, etc.)
│   │   ├── [category]/[city]/page.tsx  # Category + City
│   │   ├── [slug]/page.tsx             # Individual listing detail
│   │   └── layout.tsx
│   ├── (content)/
│   │   ├── blog/page.tsx               # Blog index
│   │   ├── blog/[slug]/page.tsx        # Blog post
│   │   ├── resources/page.tsx          # Resources hub
│   │   ├── faq/page.tsx                # FAQ page
│   │   ├── guides/[slug]/page.tsx      # Guide detail
│   │   └── layout.tsx
│   ├── (legal)/
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── layout.tsx
│   └── layout.tsx                      # Root layout (header, footer, analytics)
├── components/
│   ├── ui/                             # Atomic design system (Button, Card, Input, etc.)
│   ├── layout/                         # Header, Footer, Sidebar, Breadcrumbs
│   ├── blocks/                         # CMS-driven content blocks
│   │   ├── HeroBlock.tsx
│   │   ├── CTABlock.tsx
│   │   ├── TestimonialsBlock.tsx
│   │   ├── FAQBlock.tsx
│   │   ├── ServiceGridBlock.tsx
│   │   ├── PropertyCarouselBlock.tsx
│   │   ├── StatsBlock.tsx
│   │   ├── TeamBlock.tsx
│   │   ├── ContactFormBlock.tsx
│   │   └── RichTextBlock.tsx
│   ├── listings/                       # Listing-specific components
│   │   ├── ListingCard.tsx
│   │   ├── ListingGrid.tsx
│   │   ├── ListingFilters.tsx
│   │   ├── ListingDetail.tsx
│   │   ├── PropertyGallery.tsx
│   │   └── PropertyMap.tsx
│   └── seo/                            # SEO components
│       ├── SchemaMarkup.tsx
│       ├── Breadcrumbs.tsx
│       └── MetaFields.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── schemas/
│   ├── utils/
│   └── constants/
└── styles/
```

#### Template Type Inventory (22+)

| # | Template | Rendering | Key Components |
|---|----------|-----------|----------------|
| 1 | Homepage | SSG + ISR | Hero, ServiceGrid, Testimonials, CTA, Stats |
| 2 | About | SSG | RichText, TeamBlock, Timeline |
| 3 | Contact | SSG | ContactForm, Map, LocationCards |
| 4 | Service Landing | SSG | ServiceDetail, FAQBlock, CTA, RelatedServices |
| 5 | Service + City | ISR | ServiceDetail + CityData, LocalBusiness schema |
| 6 | All Listings | SSR | ListingGrid, Filters, Pagination |
| 7 | Category Listing | ISR | ListingGrid filtered by type, CategoryNav |
| 8 | City Listing | ISR | ListingGrid filtered by city, CityHero |
| 9 | Category + City | ISR | Combined filter, breadcrumbs |
| 10 | Property Detail | ISR | Gallery, Detail, Map, ContactCTA, RelatedListings |
| 11 | Blog Index | ISR | PostGrid, CategoryFilter, FeaturedPost |
| 12 | Blog Post | ISR | RichText, Author, ShareButtons, RelatedPosts |
| 13 | Blog Category | ISR | Filtered PostGrid |
| 14 | FAQ | SSG + ISR | Accordion, FAQ schema, SearchBar |
| 15 | Resources Hub | SSG | ResourceGrid, CategoryTabs |
| 16 | Guide Detail | ISR | RichText, TOC, ProgressBar |
| 17 | Testimonials | SSG + ISR | TestimonialGrid, Rating aggregate |
| 18 | Areas Served | SSG | CityGrid, Map, ServiceAreaList |
| 19 | Area Detail | ISR | CityHero, LocalListings, AreaStats |
| 20 | Privacy Policy | SSG | LegalText |
| 21 | Terms of Service | SSG | LegalText |
| 22 | 404 / Error | SSG | ErrorHero, SearchSuggestions |
| 23 | Sitemap HTML | SSG | SitemapTree |
| 24 | Landing Page (flexible) | ISR | Composable blocks from CMS |

### Service + City Page Generation at Scale

**Strategy:** Use Sanity as the data source for both services and cities, then generate pages programmatically.

**Sanity Schemas:**
```
Service: { title, slug, description, features[], faqs[], seoFields }
City: { name, slug, province/state, country, population, coordinates }
ServiceCity: { service -> ref, city -> ref, localContent, localFAQs, seoOverrides }
```

**Generation approach:**
- Use `generateStaticParams()` to build the cartesian product of services x cities
- Launch in cohorts of 50-100 pages (research shows this is the recommended approach)
- Each page must have genuinely unique local content, not just variable substitution
- ISR with `revalidate: 3600` (1 hour) so new content goes live without full rebuilds
- Only generate pages where sufficient local data exists (follow the Nomad List principle: if minimum data thresholds aren't met, the page doesn't generate)

**Content differentiation per city page:**
- Local rental market statistics
- City-specific FAQs
- Neighborhood highlights
- Local regulation/tenant rights info
- Proximity-based nearby services

---

## 3. PROPERTY LISTING SYSTEM

### Indexable Search Architecture

**The Problem:** Most property search widgets use client-side JavaScript rendering (React SPAs, iframes, AJAX-loaded results), which means Google sees empty pages. The contract explicitly requires content that is "indexable, not hidden behind JS."

**The Solution: Server-Side Rendered Listing Pages with Progressive Enhancement**

```
Layer 1 (SSR - what Google sees):
├── Category page with server-rendered listing cards
├── Each card: title, price, location, thumbnail, link to detail page
├── Pagination via URL params (?page=2, ?page=3)
├── Filter state in URL params (?city=toronto&type=apartment&beds=2)
└── Full HTML content, zero JS required to view listings

Layer 2 (Client Enhancement - what users get):
├── Client-side filter panel that updates URL params
├── Instant filter results without page reload
├── Map view toggle
├── Image carousel/lightbox
└── Favorites/save functionality
```

**Key Implementation Patterns:**

1. **URL-based filtering:** Every filter combination produces a unique, crawlable URL
   - `/listings/apartments/toronto` - category + city
   - `/listings/apartments/toronto?beds=2&maxPrice=2500` - with filters
   - Google can crawl the clean category/city URLs; filter params are optional enhancement

2. **Server Components for initial render:**
   ```
   // This runs on the server - Google sees full HTML
   async function ListingsPage({ params, searchParams }) {
     const listings = await sanityClient.fetch(listingsQuery, {
       category: params.category,
       city: params.city,
       ...searchParams
     });
     return <ListingGrid listings={listings} />;
   }
   ```

3. **Pagination as real pages:** Use `<Link>` elements for pagination, not JavaScript-only "Load More" buttons. Each page is a real URL that Google can crawl.

4. **Property detail pages:** Each listing gets its own URL (`/listings/[slug]`) with:
   - Full SSR/ISR rendered content
   - SEO title: "{Property Name} - {Type} for Rent in {City} | MoveSmart Rentals"
   - Meta description: "{Beds}BR/{Baths}BA {Type} in {Neighborhood}, {City}. ${Price}/mo. {Key features}."
   - OG image: Primary property photo
   - Breadcrumbs: Home > Listings > {Category} > {City} > {Property Name}
   - Schema: RealEstateListing + BreadcrumbList

### Category Page Strategy

```
/listings/                          → All listings (SSR, paginated)
/listings/apartments/               → All apartments
/listings/condos/                   → All condos
/listings/townhouses/               → All townhouses
/listings/houses/                   → All houses
/listings/apartments/toronto/       → Apartments in Toronto
/listings/apartments/vancouver/     → Apartments in Vancouver
/listings/condos/new-york/          → Condos in New York
```

Each category page is a real, crawlable page with:
- H1: "{Category} for Rent in {City}" (or "{Category} for Rent" for city-agnostic)
- Intro paragraph with local context
- Server-rendered listing cards
- Internal links to subcategories and related cities
- BreadcrumbList schema
- Canonical URL pointing to the clean path (no query params)

---

## 4. PERFORMANCE & CORE WEB VITALS

### Image Optimization Strategy

| Technique | Implementation |
|-----------|---------------|
| **Format** | AVIF primary (94.7% browser support), WebP fallback, JPEG last resort. Use `<picture>` element or Next.js Image component which handles this automatically. |
| **Lazy loading** | `loading="lazy"` on ALL images EXCEPT the LCP image (hero/above-fold). 16% of sites still lazy-load their LCP image - this is the #1 Core Web Vitals mistake. |
| **Dimensions** | Always set explicit `width` and `height` to prevent CLS (layout shift). |
| **Responsive** | `srcSet` with 640w, 750w, 828w, 1080w, 1200w breakpoints via Next.js Image. |
| **CDN** | Vercel Edge Network (automatic) + Sanity Image CDN for CMS assets. |
| **Compression** | Target quality 75-80 for listings, 85-90 for hero images. |
| **Placeholder** | `blur` placeholder with tiny base64 preview (Next.js Image `placeholder="blur"`). |

**Expected savings:** 50-80% reduction in image payload compared to unoptimized JPEG delivery.

### Rendering Strategy by Page Type

| Page Type | Strategy | Rationale |
|-----------|----------|-----------|
| Homepage | **SSG + ISR (60s)** | Needs to be fast, content changes weekly |
| Service pages | **SSG + ISR (3600s)** | Rarely changes, SEO-critical |
| Service + City | **ISR (3600s)** | Thousands of pages, can't build all at once |
| Listing index/category | **SSR** | Needs real-time data, filter combinations |
| Property detail | **ISR (300s)** | Balance freshness with performance |
| Blog posts | **ISR (3600s)** | Published once, occasional updates |
| Static pages | **SSG** | About, Contact, Legal - rarely change |

**Why ISR is critical for this project:**
- SSG alone for thousands of city/service pages would produce build times exceeding 1 hour (beyond Vercel's 45-minute limit)
- SSR alone adds 150-200ms server response time per request
- ISR provides static-speed delivery (sub-50ms TTFB from edge cache) with automatic background regeneration
- New listings appear within the revalidation window without manual rebuilds

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Preload hero image, avoid lazy-loading LCP element, edge caching via Vercel |
| **FID/INP** | < 200ms | Minimize client JS, use Server Components, defer non-critical scripts |
| **CLS** | < 0.1 | Explicit image dimensions, font-display: swap, reserved ad/widget space |
| **TTFB** | < 800ms | ISR edge caching, Sanity CDN, Vercel Edge Network |

### Performance Budget

- Total page weight: < 500KB initial load
- JavaScript: < 150KB gzipped (framework + app code)
- First paint: < 1.5s on 4G
- Lighthouse score target: 90+ across all categories

---

## 5. SCHEMA MARKUP IMPLEMENTATION

### Schema Types Required (per contract)

All schema markup delivered as **JSON-LD** in the `<head>` via a reusable `<SchemaMarkup>` component.

#### 1. Organization (site-wide, root layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MoveSmart Rentals",
  "url": "https://movesmartrentals.com",
  "logo": "https://movesmartrentals.com/logo.png",
  "sameAs": ["social media URLs"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service",
    "areaServed": ["CA", "US"]
  }
}
```

#### 2. LocalBusiness (on location/area pages)
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "MoveSmart Rentals - {City}",
  "address": { "@type": "PostalAddress", ... },
  "geo": { "@type": "GeoCoordinates", ... },
  "openingHoursSpecification": [...],
  "areaServed": { "@type": "City", "name": "{City}" }
}
```

#### 3. FAQPage (on FAQ and service pages with FAQs)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

#### 4. Service (on service detail pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Property Management in {City}",
  "provider": { "@type": "Organization", "name": "MoveSmart Rentals" },
  "areaServed": { "@type": "City", "name": "{City}" },
  "description": "..."
}
```

#### 5. Article (on blog posts and guides)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "...",
  "dateModified": "...",
  "image": "...",
  "publisher": { "@type": "Organization", "name": "MoveSmart Rentals" }
}
```

#### 6. BreadcrumbList (on every page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://movesmartrentals.com" },
    { "@type": "ListItem", "position": 2, "name": "{Category}", "item": "https://movesmartrentals.com/{category}" },
    { "@type": "ListItem", "position": 3, "name": "{Page}", "item": "https://movesmartrentals.com/{category}/{page}" }
  ]
}
```

#### 7. RealEstateListing (on property detail pages)
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "...",
  "description": "...",
  "url": "...",
  "datePosted": "...",
  "image": ["..."],
  "address": { "@type": "PostalAddress", ... },
  "offers": {
    "@type": "Offer",
    "price": "...",
    "priceCurrency": "CAD"
  }
}
```

### Implementation in Sanity

Create a reusable `seoFields` object schema that content editors fill in:
```
seoFields: {
  metaTitle (string, max 60 chars, with character counter)
  metaDescription (string, max 160 chars, with character counter)
  ogImage (image with alt text)
  canonicalUrl (url, optional override)
  noIndex (boolean, default false)
}
```

Editors see these fields on every content type. The front-end `<SchemaMarkup>` component reads the content type and automatically generates the appropriate JSON-LD.

---

## 6. XML SITEMAPS STRATEGY

### Segmented Sitemap Architecture

```
/sitemap.xml                    → Sitemap index (master)
├── /sitemap/pages.xml          → Static pages (about, contact, privacy, etc.)
├── /sitemap/services.xml       → Service landing pages
├── /sitemap/service-cities.xml → Service + City combination pages
├── /sitemap/listings.xml       → Property listing detail pages (may split into /1.xml, /2.xml if >50k)
├── /sitemap/categories.xml     → Category and category+city pages
├── /sitemap/blog.xml           → Blog posts
├── /sitemap/resources.xml      → Guides, resources
└── /sitemap/areas.xml          → Area/city pages
```

### Next.js Implementation

Use the App Router's native sitemap support with `generateSitemaps()`:

- Place `sitemap.ts` files in each route segment: `app/sitemap.xml`, `app/listings/sitemap.xml`, `app/blog/sitemap.xml`, etc.
- For segments with >50,000 URLs, use `generateSitemaps()` to return an array of sitemap IDs, producing `/listings/sitemap/0.xml`, `/listings/sitemap/1.xml`, etc.
- Each sitemap entry includes: `url`, `lastModified`, `changeFrequency`, `priority`
- Sitemaps auto-generate at build time and regenerate with ISR

### Priority Strategy

| Page Type | Priority | Change Frequency |
|-----------|----------|-----------------|
| Homepage | 1.0 | daily |
| Service pages | 0.9 | weekly |
| Service + City pages | 0.8 | weekly |
| Listing detail pages | 0.8 | daily |
| Category pages | 0.7 | daily |
| Blog posts | 0.6 | monthly |
| Area pages | 0.7 | weekly |
| Static pages | 0.3 | monthly |

### Submission

- Submit sitemap index URL to Google Search Console
- Submit same URL to Bing Webmaster Tools (or import from GSC for automatic verification)
- Add `Sitemap: https://movesmartrentals.com/sitemap.xml` to `robots.txt`

---

## 7. ANALYTICS & TRACKING STACK

### GA4 Configuration

**Installation:** Via Google Tag Manager (GTM), not direct GA4 snippet. GTM acts as the central hub for all tracking scripts.

**Core Events to Track:**

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `page_view` | Every page | `page_title`, `page_location`, `content_type` |
| `listing_view` | Property detail page | `listing_id`, `property_type`, `city`, `price` |
| `listing_inquiry` | Contact form submit on listing | `listing_id`, `inquiry_type` |
| `search_performed` | Filter/search action | `search_term`, `category`, `city`, `results_count` |
| `cta_click` | Any CTA button click | `cta_text`, `cta_location`, `page_path` |
| `phone_click` | Click-to-call | `phone_number`, `source_page` |
| `email_click` | Email link click | `email_address`, `source_page` |
| `form_start` | User begins filling form | `form_name`, `form_location` |
| `form_submit` | Form submission | `form_name`, `form_location`, `success` |
| `chat_opened` | SalesIQ widget opened | `page_path`, `trigger` |
| `scroll_depth` | 25%, 50%, 75%, 90% | `percent_scrolled`, `page_path` |
| `outbound_click` | External link click | `link_url`, `link_text` |
| `file_download` | PDF/doc download | `file_name`, `file_type` |

### GTM Configuration

**Container Structure:**

```
GTM Container
├── Tags
│   ├── GA4 Configuration Tag (fires on all pages)
│   ├── GA4 Event - CTA Click
│   ├── GA4 Event - Form Submit
│   ├── GA4 Event - Scroll Depth
│   ├── GA4 Event - Outbound Click
│   ├── GA4 Event - Listing View
│   ├── GA4 Event - Search
│   ├── Zoho SalesIQ Script
│   └── (Future: Google Ads, Meta Pixel)
├── Triggers
│   ├── All Pages (Page View)
│   ├── CTA Button Click (CSS selector: [data-cta])
│   ├── Form Submission (form submit event)
│   ├── Scroll Depth (25, 50, 75, 90)
│   ├── Outbound Link Click (hostname != movesmartrentals.com)
│   └── Listing Detail Page (URL matches /listings/*)
├── Variables
│   ├── Click Text
│   ├── Click URL
│   ├── Page Path
│   ├── Data Layer Variables (listing_id, property_type, etc.)
│   └── Custom JS Variables (extract listing data from page)
└── Data Layer
    └── Push listing/page metadata on page load
```

**Scroll Depth:** Use GTM's built-in Scroll Depth trigger (not GA4 Enhanced Measurement which only tracks 90%). Configure thresholds at 25%, 50%, 75%, and 90% for granular engagement data.

### GSC & Bing Webmaster Tools Setup

1. **Google Search Console:**
   - Verify via DNS TXT record (recommended for Vercel deployments)
   - Submit sitemap index URL
   - Set up property for both `movesmartrentals.com` and `www.movesmartrentals.com`
   - Monitor index coverage, Core Web Vitals, and search performance

2. **Bing Webmaster Tools:**
   - Import directly from GSC (automatic verification)
   - Or verify via CNAME/TXT DNS record
   - Submit same sitemap index

### Dashboard & Reporting

**Recommendation: Looker Studio (free)**

Build a custom Looker Studio dashboard with GA4 as the data source. Key modules:

| Dashboard Section | Metrics |
|-------------------|---------|
| **Overview** | Sessions, users, bounce rate, avg. engagement time (28-day rolling) |
| **Acquisition** | Traffic by channel, top landing pages, organic search performance |
| **Listings Performance** | Most viewed listings, listing inquiry rate, avg. time on listing page |
| **Content Performance** | Blog post views, scroll depth by post, CTA click rate |
| **Geographic** | Traffic by city (Canada + US split), top performing markets |
| **Conversions** | Form submissions, phone clicks, email clicks, chat opens |
| **SEO Health** | GSC impressions, clicks, CTR, avg. position (via GSC connector) |

---

## 8. DEPLOYMENT & HANDOFF

### Hosting: Vercel (Recommended)

**Why Vercel over Netlify:**

| Factor | Vercel | Netlify |
|--------|--------|---------|
| Next.js support | Native (they built it) | Good, but not native |
| ISR | Full support, edge-cached | Supported via adapter |
| Preview deployments | Automatic per PR | Automatic per PR |
| Edge Functions | Yes | Yes (Edge Functions) |
| Build limits | 45 min (Pro) | 15 min (free), 30 min (Pro) |
| Commercial use (free tier) | Allowed with limits | Allowed |
| Analytics | Built-in Web Vitals | Basic |

Vercel is the optimal choice because ISR is a first-class feature, and the project depends heavily on ISR for service+city pages and listing pages.

**Vercel Plan Recommendation:** Pro plan ($20/mo per team member) for:
- 45-minute build timeout (needed for initial full build)
- Unlimited bandwidth
- Custom domains with automatic SSL
- Preview deployments for content review

### SSL & HTTPS

Vercel provides automatic SSL certificates via Let's Encrypt for all custom domains. No manual configuration needed. HTTPS is enforced by default with automatic HTTP -> HTTPS redirect.

### GitHub Transfer & Handoff Process

**Step 1: Development Phase**
- Develop in contractor's GitHub account
- Use feature branches and PR-based workflow
- Maintain clean commit history

**Step 2: Pre-Transfer Checklist**
- [ ] Remove all hardcoded secrets from codebase (use environment variables)
- [ ] Verify `.env.example` documents all required environment variables
- [ ] Ensure `.gitignore` excludes `.env.local`, `node_modules`, `.next`
- [ ] Run full build successfully
- [ ] All tests passing
- [ ] README with setup instructions

**Step 3: Repository Transfer**
- Go to repo Settings > General > Danger Zone > Transfer
- Transfer to REVUN GitHub organization
- All stars, issues, PRs, commit history, and branches transfer intact
- GitHub automatically sets up URL redirects from old repo location

**Step 4: Vercel Reconnection**
- After transfer, reconnect Vercel project to the new repo location under REVUN's account
- Transfer Vercel project ownership or set up new Vercel project connected to REVUN's repo
- Re-configure environment variables in Vercel dashboard

### Environment Documentation Requirements

Deliver a `HANDOFF.md` file (or equivalent document) containing:

```
1. ARCHITECTURE OVERVIEW
   - Tech stack diagram
   - Data flow: Sanity -> Next.js -> Vercel
   - Key dependencies and versions

2. ENVIRONMENT VARIABLES
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - NEXT_PUBLIC_SANITY_DATASET
   - SANITY_API_TOKEN (read token for preview)
   - NEXT_PUBLIC_GA_MEASUREMENT_ID
   - NEXT_PUBLIC_GTM_ID
   - NEXT_PUBLIC_SITE_URL
   - SANITY_WEBHOOK_SECRET
   - ZOHO_SALESIQ_WIDGET_CODE

3. LOCAL DEVELOPMENT
   - Prerequisites (Node.js version, pnpm/npm)
   - Setup steps
   - Running dev server
   - Running Sanity Studio locally

4. DEPLOYMENT
   - Vercel configuration
   - Build command, output directory
   - Environment variable setup in Vercel
   - Custom domain configuration

5. CONTENT MANAGEMENT
   - Sanity Studio URL
   - How to create/edit/publish content
   - Content type reference guide
   - Image upload guidelines
   - SEO field instructions

6. THIRD-PARTY SERVICES
   - Sanity account credentials/access
   - Google Analytics property ID
   - GTM container ID
   - Google Search Console access
   - Bing Webmaster Tools access
   - Zoho SalesIQ account access
   - Vercel team access

7. MAINTENANCE
   - How to update dependencies
   - How to add new content types
   - How to add new city/service pages
   - Monitoring and alerting
```

---

## 9. SALESIQ INTEGRATION

### Zoho SalesIQ Implementation in Next.js

**Approach:** Load via GTM (preferred) or as a client component.

#### Option A: Via GTM (Recommended)
- Add SalesIQ widget code as a Custom HTML tag in GTM
- Fire on All Pages trigger
- Benefits: Centralized script management, easy to disable/modify without code changes, doesn't affect Core Web Vitals (loaded async via GTM)

#### Option B: Next.js Client Component
```tsx
// components/SalesIQWidget.tsx
'use client';

import { useEffect } from 'react';

export function SalesIQWidget() {
  useEffect(() => {
    // Initialize SalesIQ global
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode: process.env.NEXT_PUBLIC_ZOHO_WIDGET_CODE,
      values: {},
      ready: function() {
        // API customizations here
      }
    };

    // Load SalesIQ script
    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.src = 'https://salesiq.zohopublic.com/widget';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
      const existingScript = document.getElementById('zsiqscript');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return null;
}
```

**Place in root layout:**
```tsx
// app/layout.tsx
import { SalesIQWidget } from '@/components/SalesIQWidget';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SalesIQWidget />
      </body>
    </html>
  );
}
```

**Performance consideration:** Use `defer` attribute and load after page content. SalesIQ script is non-critical for initial render. If it impacts LCP, consider loading it after a `requestIdleCallback` or on user interaction (scroll/click).

### Tracking SalesIQ Events in GA4

Push chat events to the GTM data layer:
```js
window.$zoho.salesiq.ready = function() {
  $zoho.salesiq.chat.start(function() {
    window.dataLayer.push({
      event: 'chat_started',
      chat_source: 'salesiq'
    });
  });
};
```

---

## 10. 29-DAY BUILD FEASIBILITY ASSESSMENT

### Realistic Timeline with Sanity + Next.js + Vercel

| Week | Days | Deliverables |
|------|------|-------------|
| **Week 1** (Days 1-7) | **Foundation** | Project scaffold (Next.js + Sanity + Vercel), design system setup (Tailwind tokens, UI components), Sanity schemas for all content types, root layout with header/footer, SEO component library (SchemaMarkup, Breadcrumbs, MetaFields), GTM/GA4 container setup |
| **Week 2** (Days 8-14) | **Core Pages** | Homepage, About, Contact, Service pages, Service+City template, Blog index + detail, FAQ page, all schema markup wired up |
| **Week 3** (Days 15-21) | **Listings & Content** | Property listing system (index, category, city, detail pages), search/filter with SSR, property detail pages with gallery, listing schema markup, initial content population in Sanity, SalesIQ integration |
| **Week 4** (Days 22-29) | **Polish & Launch** | XML sitemaps (segmented), robots.txt, GSC + Bing submission, Core Web Vitals optimization pass, cross-browser/device testing, Looker Studio dashboard, handoff documentation, GitHub transfer to REVUN, production deployment |

### Risk Factors & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| Design not finalized by day 1 | High | Use a design system starter (shadcn/ui) and iterate. Agree on a reference site aesthetic early. |
| Content not ready for CMS | High | Build with placeholder content. Sanity's editorial interface means client can populate after handoff. |
| Service+City page scale | Medium | Start with top 10-20 cities, use ISR for rest. Don't try to launch all cities at once. |
| Property data source unclear | Medium | Build the listing system against Sanity's data model. If external API integration is needed later, the front-end templates still work. |
| Core Web Vitals below 90 | Low | Next.js + Vercel + ISR inherently scores well. Budget 2 days for performance optimization. |
| SalesIQ performance impact | Low | Load async via GTM, defer to idle. Minimal impact on LCP. |

### What Makes 29 Days Feasible

1. **Sanity is managed** - No database provisioning, no server setup, no DevOps
2. **Vercel is zero-config** - Push to GitHub, site is live
3. **Next.js App Router** - Layouts, loading states, error boundaries built-in
4. **Tailwind CSS** - Rapid styling without writing custom CSS
5. **Reusable block system** - Build 10 blocks, compose 22+ page templates
6. **ISR** - Don't need to generate thousands of pages at build time
7. **Sanity starters exist** - Don't start from zero (SanityPress, next-sanity starter)

### What Would Break the 29-Day Timeline

- Custom design system beyond Tailwind + shadcn/ui components
- Complex property data API integrations (MLS, IDX feeds)
- Multi-language (EN/FR) requirement
- User authentication / tenant portal
- Payment processing
- Custom map integration beyond a basic embed

---

## FINAL RECOMMENDATION SUMMARY

**Ship this stack:**

```
Next.js 15+ (App Router) + Sanity Studio v3 + Vercel Pro
```

- **Framework:** Next.js with App Router, Server Components, ISR
- **CMS:** Sanity (managed Content Lake, no database ops, real-time editorial)
- **Hosting:** Vercel Pro ($20/mo, automatic SSL, edge CDN, preview deploys)
- **Styling:** Tailwind CSS + shadcn/ui component library
- **Analytics:** GA4 via GTM, GSC, Bing Webmaster Tools, Looker Studio dashboard
- **Chat:** Zoho SalesIQ via GTM or client component
- **Schema:** JSON-LD for Organization, LocalBusiness, FAQPage, Service, Article, BreadcrumbList, RealEstateListing
- **Sitemaps:** Segmented by page type via Next.js App Router native sitemap support
- **Images:** Next.js Image component + Sanity Image CDN (automatic AVIF/WebP)
- **Handoff:** GitHub repo transfer to REVUN, Vercel project transfer, full documentation package

This stack satisfies every contract requirement, can realistically be built in 29 days by a single experienced contractor, and sets the client up for daily content publishing without developer tickets.

---

## SOURCES

### Tech Stack & CMS Comparison
- [10 best CMSs for Next.js in 2026 - Hygraph](https://hygraph.com/blog/nextjs-cms)
- [Best Headless CMS for Developers in 2026 - Prismic](https://prismic.io/blog/best-headless-cms-for-developers)
- [Payload: The Next.js Headless CMS](https://payloadcms.com/)
- [Headless CMS 2026: Contentful vs Strapi vs Sanity vs Payload - DEV Community](https://dev.to/pooyagolchian/headless-cms-2026-contentful-vs-strapi-vs-sanity-vs-payload-compared-25mh)
- [2025 Headless CMS Guide: Payload vs Strapi vs Sanity - Pooya Golchian](https://pooya.blog/blog/headless-cms-consultancy/)
- [Best Headless CMS: Directus, Strapi, Payload, Sanity - Kernelics](https://kernelics.com/blog/headless-cms-comparison-guide)
- [Payload 3.0: The first CMS that installs directly into any Next.js app](https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app)
- [Payload CMS: The Future-Proof Solution for Websites 2026](https://what.digital/payload-cms-future-proof-solution/)

### Framework Comparison
- [Astro vs Next.js (2026): Pros, Cons & Popularity - Senorit](https://senorit.de/en/blog/astro-vs-nextjs-2025)
- [Astro vs Next.js: Features, performance, and use cases - Contentful](https://www.contentful.com/blog/astro-next-js-compared/)
- [2025 Frontend Framework Showdown - Leapcell](https://leapcell.io/blog/the-2025-frontend-framework-showdown-next-js-nuxt-js-sveltekit-and-astro)
- [Next.js vs Astro in 2025 - Makers Den](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website)

### Programmatic SEO & Template Architecture
- [Programmatic SEO in 2025: from templates to systems - Palo Santo](https://www.palosanto.ai/blog/programmatic-seo-2025-from-templates-to-systems)
- [Programmatic SEO in Next.js - Practical Programmatic](https://practicalprogrammatic.com/blog/programmatic-seo-in-nextjs)
- [Programmatic SEO: Scale Without Google Penalties (2025)](https://guptadeepak.com/the-programmatic-seo-paradox-why-your-fear-of-creating-thousands-of-pages-is-both-valid-and-obsolete/)
- [Complete Guide to Scalable Next.js Architecture - DEV Community](https://dev.to/alexeagleson/how-to-build-scalable-architecture-for-your-nextjs-project-2pb7)
- [Frontend Architecture: Building Scalable Next.js Applications - Medium](https://blog.bitsrc.io/frontend-architecture-a-complete-guide-to-building-scalable-next-js-applications-d28b0000e2ee)

### Property Listings & SEO
- [How to Get Your Property Listings Indexed - Prerender.io](https://prerender.io/blog/how-to-get-your-property-listings-indexed/)
- [Search Engine Friendly Real Estate Listings - UltimateIDX](https://www.ultimateidx.com/search-engine-friendly/)
- [Schema Markup for Real Estate Websites - eSEOspace](https://eseospace.com/blog/schema-markup-for-real-estate-websites/)
- [Schema Markup for Real Estate & Property Listings - seoClarity](https://www.seoclarity.net/blog/structured-data-for-real-estate-listings)
- [RealEstateListing - Schema.org](https://schema.org/RealEstateListing)

### Core Web Vitals & Performance
- [Image Optimization for Core Web Vitals - corewebvitals.io](https://www.corewebvitals.io/pagespeed/optimize-images-for-core-web-vitals)
- [How to Optimize Website Images 2026 - Request Metrics](https://requestmetrics.com/web-performance/high-performance-images/)
- [Image Optimization 2025: WebP, AVIF & Best Practices - FrontendTools](https://www.frontendtools.tech/blog/modern-image-optimization-techniques-2025)
- [Next.js Rendering Strategies: CSR vs SSR vs SSG vs ISR - DEV Community](https://dev.to/rayan2228/nextjs-rendering-strategies-csr-vs-ssr-vs-ssg-vs-isr-complete-guide-26j4)
- [SSR vs SSG in Next.js - TSH](https://tsh.io/blog/ssr-vs-ssg-in-nextjs)

### Analytics & Tracking
- [Scroll Tracking with GA4 - Analytics Mania](https://www.analyticsmania.com/post/scroll-tracking-with-google-analytics-4-and-google-tag-manager/)
- [Track Events with GA4 - Analytics Mania](https://www.analyticsmania.com/post/how-to-track-events-with-google-analytics-4-and-google-tag-manager/)
- [Set Up GA4 Tags Using GTM 2025 - OWOX](https://www.owox.com/blog/articles/set-up-ga4-tags-using-gtm)
- [GA4 Looker Studio Template 2025 - Mr Jonathan Jones](https://www.mrjonathanjones.com/2024/12/20/google-analytics-4-made-simple-a-new-looker-studio-template/)

### Deployment & Hosting
- [Netlify vs Vercel: 2025 Comparison - Netlify](https://www.netlify.com/guides/netlify-vs-vercel/)
- [Vercel vs Netlify: Which Hosting is Best for Next.js - DEV Community](https://dev.to/shaahzaibrehman/vercel-vs-netlify-which-hosting-is-best-for-nextjs-2j5n)
- [Vercel vs Netlify - Vercel Knowledge Base](https://vercel.com/kb/guide/vercel-vs-netlify)

### Sitemaps
- [Metadata Files: sitemap.xml - Next.js Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Functions: generateSitemaps - Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps)
- [Building a Dynamic Sitemap - Sanity Learn](https://www.sanity.io/learn/course/seo-optimization/building-a-dynamic-sitemap)

### Sanity CMS Editorial & SEO
- [The Ultimate Guide to SEO with Sanity](https://www.sanity.io/seo-with-sanity)
- [Sanity for Content Editors](https://www.sanity.io/content-editors)
- [Sanity as a Production CMS: Architecture Guide](https://www.felixyu.net/blog/sanity-complete-tech-guide)
- [Best Use Cases of Sanity CMS 2025-2026 - Pagepro](https://pagepro.co/blog/best-use-cases-of-sanity/)
- [Sanity CMS 2025 Spring Release](https://www.represent.no/short-stories/sanity-cms-huge-2025-spring-release)

### SalesIQ
- [SalesIQ JavaScript APIs - Zoho](https://www.zoho.com/salesiq/help/developer-section/js-api.html)
- [How do I integrate Zoho SalesIQ using Next.js - Zoho Community](https://help.zoho.com/portal/en/community/topic/how-do-i-integrate-zoho-sales-iq-using-next-js)

### Schema & Breadcrumbs
- [How To Add BreadcrumbList Markup - Google Developers](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [SEO Breadcrumbs: Structure, Benefits & Best Practices - Search Engine Land](https://searchengineland.com/guide/seo-breadcrumbs)
- [Local Business Schema Markup Guide - LocalMighty](https://www.localmighty.com/blog/local-business-schema-markup/)

### GitHub Handoff
- [Transferring a Repository - GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)
- [Handover Documentation Checklist - GitHub Gist](https://gist.github.com/TimothyJones/1508a7081405d57073b99180312f5caa)
