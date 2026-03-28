# Phase 1: Architecture and CMS Foundation - Research

**Researched:** 2026-03-28
**Domain:** Next.js 15 App Router + Sanity v3 CMS + ISR + Programmatic SEO Architecture
**Confidence:** HIGH (stack and architecture verified against official docs; one critical hosting constraint flagged)

## Summary

Phase 1 must deliver a deployed Next.js 15 + Sanity v3 scaffold with all irreversible architectural decisions locked in: URL structure, ISR strategy, CMS schema shape, block component API, and technical SEO baseline. Everything built in Phases 2-4 has a hard dependency on decisions made here.

The core challenge is balancing three constraints simultaneously: (1) Sanity Free Tier limits (10,000 documents, 250K API requests/month, 3 users with write access), (2) Vercel hosting tier restrictions (the Hobby plan prohibits commercial use per Vercel's fair use guidelines -- this is a critical constraint that must be resolved), and (3) a 29-day delivery timeline that demands zero rework on foundational decisions.

**Primary recommendation:** Scaffold the Next.js 15.2.4 project with TypeScript, Tailwind v4, and shadcn/ui. Set up Sanity Free Tier with all 9 content type schemas including required-field enforcement for local content differentiation. Implement the URL hierarchy (`/ca/[province]/[city]/[service]/`), middleware for lowercase/trailing-slash normalization, `metadataBase` in root layout, and on-demand ISR via Sanity webhook-triggered `revalidateTag()`. Build all 10 block components as React Server Components with typed props. Deploy to Vercel with ISR configured to pre-render only Tier-1 Ontario pages (~320) at build time. Resolve the Vercel commercial-use restriction before deployment.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Next.js 15 App Router project scaffolded with TypeScript, Tailwind v4, shadcn/ui | Standard Stack section: exact versions, install commands, shadcn/ui init with Tailwind v4 |
| FOUND-02 | Sanity Studio v3 (Free Tier) configured with all 9 content types and structured field schemas | CMS Schema Architecture section: all 9 types with field specs; Free Tier capacity analysis |
| FOUND-03 | Vercel deployment with automatic SSL, edge CDN, ISR support | Hosting Constraint section: Hobby vs Pro analysis; Vercel ISR patterns |
| FOUND-04 | GitHub repo in client's REVUN account with full source code | Standard workflow -- no special research needed |
| FOUND-05 | URL architecture: /ca/{province}/{city}/{service}/ and /us/{state}/{city}/{service}/ | URL Architecture section: file system layout, route structure |
| FOUND-06 | On-demand ISR with Sanity webhook-triggered revalidation (revalidateTag) | ISR Strategy section: sanityFetch wrapper, webhook handler, tag-based revalidation |
| FOUND-07 | metadataBase set, trailing-slash normalization, lowercase URL enforcement | Technical SEO Baseline section: middleware pattern, next.config.ts settings |
| NAV-01 | 10-item top navigation | Block Components section: NavigationMenu from shadcn/ui |
| NAV-02 | Full footer with all link groups | Block Components section: Footer as Server Component |
| NAV-03 | Mobile-responsive hamburger navigation | Block Components section: Sheet component from shadcn/ui for mobile nav |
| NAV-04 | Breadcrumb system with BreadcrumbList schema | Block Components section: BreadcrumbBlock with JSON-LD builder |
| BLOCK-01 | Hero block (headline, subheadline, CTAs, background image) | Block Components section: HeroBlock with priority image prop |
| BLOCK-02 | CTA block (primary + secondary call-to-action with form variant) | Block Components section: CTABannerBlock |
| BLOCK-03 | FAQ block with FAQ schema markup | Block Components section: FAQBlock with Accordion + JSON-LD |
| BLOCK-04 | ServiceGrid block (linked service cards) | Block Components section: ServiceGridBlock |
| BLOCK-05 | CityGrid block (linked city cards with location data) | Block Components section: CityGridBlock |
| BLOCK-06 | PropertyCard block (listing preview with key details) | Block Components section: PropertyCardBlock |
| BLOCK-07 | TrustBlock (social proof, stats, testimonials) | Block Components section: TrustBlock |
| BLOCK-08 | HowItWorks block (numbered steps process) | Block Components section: HowItWorksBlock |
| BLOCK-09 | PainPoint block (problem/solution layout) | Block Components section: PainPointBlock |
| BLOCK-10 | BenefitsBlock (feature/benefit cards) | Block Components section: BenefitsBlock |
| CMS-01 | 9 structured content types in Sanity | CMS Schema Architecture section: full type definitions with fields |
| CMS-02 | 15-20+ fields per content type including SEO fields | CMS Schema Architecture section: field specs per type; reusable SEO fieldset |
| CMS-03 | Publishing controls: canonical, index/noindex, sitemap inclusion, redirect, author, dates | CMS Schema Architecture section: publishing controls fieldset definition |
| SEO-01 | SSL/HTTPS enforced | Vercel handles automatically; no code needed |
| SEO-03 | Robots.txt with sitemap reference and indexing controls | Technical SEO Baseline section: robots.ts pattern |
| SEO-04 | Canonical tags on all pages (self-referencing) | Technical SEO Baseline section: metadataBase + generateMetadata pattern |
| SEO-05 | Open Graph fields on every page | Technical SEO Baseline section: generateMetadata OG pattern |
| SEO-07 | Image alt text describing actual image with location/service | CMS Schema Architecture section: required alt text in image schema |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.2.4 | App Router framework, ISR, Metadata API | Current stable. Avoids Next.js 16 breaking changes (5 total: middleware rename, async APIs enforced, sitemap id as Promise, serverRuntimeConfig removed, Turbopack default). All ISR and metadata features are stable in 15. |
| React | 19.0.0 | UI rendering | Required by Next.js 15. Server Components are the rendering model for all ISR pages. |
| TypeScript | 5.4+ | Type safety | Type-safe GROQ query results and metadata payloads. Required for CMS schema type inference. |
| Sanity Studio | v3 (3.57+) | Headless CMS | Managed infrastructure, structured content types for 9 schemas, non-developer publishing. Free Tier: 10K docs, 250K API req/mo, 20 seats. |
| next-sanity | 12.1.1 | Official Next.js + Sanity bridge | Provides `sanityFetch()`, Draft Mode, Live Content API, webhook-driven ISR. The ONLY official integration package. |
| Tailwind CSS | v4.1 | Utility-first CSS | CSS-first `@theme` directives, Rust engine (100x faster builds). No `tailwind.config.ts` needed. |
| shadcn/ui | CLI v4 | Accessible component library (source code, not dependency) | Generates owned Radix UI component source. Saves 2-3 days on Accordion, NavigationMenu, Breadcrumb, Sheet, Dialog, Form, Card, Button. Fully compatible with React 19 + Tailwind v4. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @portabletext/react | ^3.x | Render Sanity Portable Text | Blog/guide/long-form content rendering |
| @sanity/client | 6.x | GROQ query client | Included via next-sanity; direct import for webhook handlers |
| sanity | latest | Sanity Studio core | Required for embedded Studio at `/studio` route |
| @sanity/vision | latest | GROQ query explorer in Studio | Developer tool for testing queries |
| lucide-react | 0.577.0 | Icon library | Default shadcn/ui icon set, tree-shakable SVGs |
| react-hook-form | ^7.x | Form state management | Contact, Book a Call, lead capture forms |
| zod | ^3.x | Schema validation | Client + server validation; shared with Server Actions |
| @hookform/resolvers | ^3.x | Zod-to-react-hook-form adapter | Required bridge package |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Next.js 15 | Next.js 16 | 16 has 5 breaking changes; zero SEO benefit; burns sprint days |
| Sanity v3 | Contentful | More expensive at scale, less flexible schema system |
| Sanity v3 | Payload CMS | Requires self-hosted infra (violates zero-DevOps goal) |
| Tailwind v4 | Tailwind v3 | v3 requires JS config file; no reason to use older version for greenfield |
| shadcn/ui | Chakra UI / MUI | Bundle weight without SEO benefit; version lock-in |
| Built-in sitemap.ts | next-sitemap | next-sitemap is postbuild; cannot query Sanity at runtime; incompatible with ISR |
| @portabletext/react | @sanity/block-content-to-react | Latter is officially deprecated |

**Installation:**
```bash
# Scaffold
npx create-next-app@15.2.4 movesmart-rentals \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd movesmart-rentals

# Sanity CMS
npm install next-sanity @portabletext/react @sanity/client sanity@latest @sanity/vision

# Forms
npm install react-hook-form zod @hookform/resolvers

# Icons
npm install lucide-react

# shadcn/ui init (compatible with Tailwind v4)
npx shadcn@latest init

# shadcn/ui components needed for Phase 1
npx shadcn@latest add button card accordion navigation-menu breadcrumb sheet form input

# Dev tools
npm install -D prettier prettier-plugin-tailwindcss
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx                          # Root layout: metadataBase, fonts, global metadata
│   ├── page.tsx                            # Homepage
│   ├── not-found.tsx                       # Custom 404
│   ├── robots.ts                           # Dynamic robots.txt
│   ├── sitemap.ts                          # Sitemap index
│   │
│   ├── (site)/                             # Route group for public pages
│   │   ├── ca/
│   │   │   └── [province]/
│   │   │       ├── page.tsx                # Province hub
│   │   │       └── [city]/
│   │   │           ├── page.tsx            # City hub
│   │   │           └── [service]/
│   │   │               └── page.tsx        # CityService page (core SEO page)
│   │   │
│   │   ├── us/
│   │   │   └── [state]/
│   │   │       ├── page.tsx
│   │   │       └── [city]/
│   │   │           ├── page.tsx
│   │   │           └── [service]/
│   │   │               └── page.tsx
│   │   │
│   │   ├── owners/page.tsx
│   │   ├── tenants/page.tsx
│   │   ├── services/[service]/page.tsx
│   │   ├── locations/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── resources/[slug]/page.tsx
│   │   ├── franchising/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── studio/[[...tool]]/page.tsx         # Sanity Studio embedded
│   │
│   └── api/
│       └── revalidate/route.ts             # Sanity webhook receiver
│
├── components/
│   ├── blocks/                             # 10 reusable block components
│   │   ├── hero-block.tsx
│   │   ├── cta-banner-block.tsx
│   │   ├── faq-block.tsx
│   │   ├── service-grid-block.tsx
│   │   ├── city-grid-block.tsx
│   │   ├── property-card-block.tsx
│   │   ├── trust-block.tsx
│   │   ├── how-it-works-block.tsx
│   │   ├── pain-point-block.tsx
│   │   └── benefits-block.tsx
│   │
│   ├── layout/                             # Layout components
│   │   ├── header.tsx                      # Top nav (Server Component)
│   │   ├── footer.tsx                      # Footer (Server Component)
│   │   ├── mobile-nav.tsx                  # Hamburger nav (Client Component)
│   │   └── breadcrumb-nav.tsx              # Breadcrumbs (Server Component)
│   │
│   └── ui/                                 # shadcn/ui generated components
│
├── sanity/
│   ├── client.ts                           # Sanity client config (useCdn per environment)
│   ├── fetch.ts                            # sanityFetch() wrapper with revalidation tags
│   ├── schemas/                            # All 9 content type schemas
│   │   ├── index.ts                        # Schema registry
│   │   ├── province.ts
│   │   ├── city.ts
│   │   ├── service.ts
│   │   ├── city-service.ts                 # Junction type (most complex)
│   │   ├── blog-guide.ts
│   │   ├── comparison.ts
│   │   ├── case-study.ts
│   │   ├── property-category.ts
│   │   └── property-listing.ts
│   │
│   ├── objects/                            # Reusable schema objects
│   │   ├── seo-fields.ts                   # metaTitle, metaDescription, canonicalOverride, noindex
│   │   ├── publishing-controls.ts          # canonical, index/noindex, sitemap, redirect, dates
│   │   └── portable-text.ts               # Custom Portable Text block definition
│   │
│   └── queries/                            # GROQ query library
│       ├── city.ts
│       ├── service.ts
│       ├── city-service.ts
│       └── navigation.ts
│
├── lib/
│   ├── schema-builders/                    # JSON-LD builder functions
│   │   ├── organization.ts
│   │   ├── local-business.ts
│   │   ├── service.ts
│   │   ├── faq-page.ts
│   │   ├── breadcrumb-list.ts
│   │   ├── article.ts
│   │   └── real-estate-listing.ts
│   │
│   ├── metadata.ts                         # Shared metadata helpers
│   └── utils.ts                            # URL normalization, slug helpers
│
└── types/
    ├── sanity.ts                           # Generated/manual Sanity document types
    └── blocks.ts                           # Block component prop types
```

### Pattern 1: sanityFetch Wrapper with Tag-Based Revalidation

**What:** A centralized fetch wrapper that attaches revalidation tags to all GROQ queries, enabling on-demand ISR via Sanity webhooks.

**When to use:** Every CMS data fetch in the application. Never use raw `createClient().fetch()` in page components.

```typescript
// src/sanity/fetch.ts
import { client } from './client'

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags,
      // When tags are provided, cache indefinitely until revalidateTag() is called
      // Do NOT mix revalidate (time-based) with tags (on-demand)
    },
  })
}
```

**Source:** [Sanity caching and revalidation docs](https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs), [next-sanity npm](https://www.npmjs.com/package/next-sanity)

### Pattern 2: On-Demand ISR via Webhook

**What:** Sanity publishes content -> GROQ webhook fires -> hits `/api/revalidate` -> calls `revalidateTag()` -> affected cached pages regenerate on next request.

**When to use:** Every content publish/update/delete event in Sanity.

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: string
    }>(req, process.env.SANITY_WEBHOOK_SECRET!)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad request', { status: 400 })
    }

    // Revalidate all pages that use this document type
    revalidateTag(body._type)

    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (err) {
    return new NextResponse('Error', { status: 500 })
  }
}
```

**Source:** [Sanity webhooks and on-demand revalidation guide](https://www.sanity.io/guides/sanity-webhooks-and-on-demand-revalidation-in-nextjs)

### Pattern 3: generateStaticParams with Partial Pre-rendering

**What:** Pre-render only Tier-1 Ontario city pages (~320) at build time. All remaining pages generate on-demand via ISR.

**When to use:** All dynamic geographic routes.

```typescript
// src/app/(site)/ca/[province]/[city]/[service]/page.tsx
export async function generateStaticParams() {
  // Pre-render only Tier-1 Ontario cities at build time
  const params = await sanityFetch<Array<{
    province: string
    city: string
    service: string
  }>>({
    query: `*[_type == "cityService" && city->tier == 1]{
      "province": city->province->slug.current,
      "city": city->slug.current,
      "service": service->slug.current
    }`,
    tags: ['cityService'],
  })
  return params
}

// Allow non-pre-rendered pages to generate on first request
export const dynamicParams = true
```

### Pattern 4: Middleware for URL Normalization

**What:** Redirect uppercase URLs to lowercase and enforce trailing slash consistency.

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes, static files, Next.js internals, and Studio
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Lowercase enforcement
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio).*)'],
}
```

**Source:** [Next.js middleware docs](https://nextjs.org/docs/app/building-your-application/routing/middleware), [nesin.io lowercase redirect pattern](https://nesin.io/blog/redirect-urls-to-lowercase-nextjs-middleware)

### Anti-Patterns to Avoid

- **Client-side GROQ fetching:** Never call `createClient().fetch()` in `useEffect` or client components. Exposes API token, bypasses ISR, content invisible to crawlers.
- **Pre-rendering all pages:** Never return all 1000+ pages from `generateStaticParams`. Will exceed Vercel build timeout (45 min on Pro, less on Hobby).
- **Monolithic root layout data fetch:** Never fetch nav/footer/page data in root `layout.tsx`. Cache invalidation becomes coarse. Fetch nav and footer in their own Server Component wrappers with dedicated revalidation tags.
- **Mixing time-based and tag-based revalidation:** `sanityFetch()` must use EITHER `revalidate: N` OR `tags: [...]`, never both simultaneously. Tags take priority; use tags for all CMS content.
- **`useCdn: false` in production:** Always use `useCdn: true` for public queries. Reserve `false` only for draft mode. Otherwise every render hits Content Lake API directly, causing rate limits and 4-5s response times.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible accordion (FAQ) | Custom collapsible component | shadcn/ui Accordion (Radix primitive) | ARIA states, keyboard navigation, animation already handled |
| Mobile navigation drawer | Custom sidebar/overlay | shadcn/ui Sheet component | Focus trap, scroll lock, animation, escape-to-close |
| Breadcrumb rendering | Custom breadcrumb list | shadcn/ui Breadcrumb component | Accessible markup, separator handling, responsive truncation |
| Form validation | Manual validation logic | react-hook-form + zod + @hookform/resolvers | Shared client/server validation, uncontrolled inputs for performance |
| Navigation menu | Custom dropdown nav | shadcn/ui NavigationMenu (Radix) | Keyboard nav, focus management, responsive triggers |
| Portable Text rendering | Custom rich text parser | @portabletext/react | Handles all Sanity block types including custom marks and annotations |
| Webhook signature validation | Custom HMAC check | next-sanity/webhook `parseBody()` | Handles Sanity's specific signature format correctly |
| Sanity client config | Manual `@sanity/client` setup | next-sanity client utilities | Handles CDN toggling, token management, API versioning |
| XML sitemap generation | Custom XML builder | Next.js built-in `sitemap.ts` + `generateSitemaps()` | Dynamic, ISR-compatible, no postbuild step |
| robots.txt | Static file | Next.js built-in `robots.ts` | Dynamic, version-controlled, no manual file management |

**Key insight:** With a 29-day deadline, every hour spent building UI primitives or CMS integration plumbing is an hour not spent on the 9 CMS schemas and 10 block components that constitute the actual deliverable.

## Common Pitfalls

### Pitfall 1: Vercel Hobby Plan Prohibits Commercial Use

**What goes wrong:** The project is deployed on Vercel's free Hobby plan for a commercial property management website. Vercel's fair use guidelines explicitly state: "the Hobby plan restricts users to non-commercial, personal use only." Commercial usage is defined as "any Deployment that is used for the purpose of financial gain of anyone involved in any part of the production of the project, including a paid employee or consultant writing the code."

**Why it happens:** The user constraint specifies "Vercel must be free/hobby tier" and the prior research referenced "Vercel Pro" without noting this commercial use restriction.

**How to avoid:** Three options:
1. **Vercel Pro ($20/seat/month):** Full ISR support, commercial use allowed, 45-min build timeout, team collaboration. One seat = $20/month. This is the simplest path.
2. **Netlify Free Tier (Starter, $0):** Supports Next.js 15 App Router with ISR via OpenNext adapter. Allows commercial use. 100 GB bandwidth (credit-based). 1 concurrent build. Key limitation: Next.js ISR works but through Netlify Functions, not native Vercel ISR -- slightly different behavior.
3. **Stay on Vercel Hobby and accept risk:** Many freelancers deploy client sites on Hobby. Vercel has not been publicly known to shut down small commercial sites proactively. But the ToS allows them to do so without notice.

**Warning signs:** Vercel sends usage limit notifications; site goes down without warning during a traffic spike.

**Recommendation:** Clarify with client. If zero cost is absolute, Vercel Hobby works technically (ISR, SSL, CDN all function correctly on Hobby) but carries ToS risk. Vercel Pro at $20/month is the safest path and was the original research assumption. Document this decision.

### Pitfall 2: Sanity Free Tier Document Ceiling (10,000 Hard Cap)

**What goes wrong:** Image assets, draft versions, and system documents all count toward the 10,000 document limit. What looks like 400 content documents becomes 1,500+ when images and drafts are included.

**Why it happens:** Every uploaded image creates a `sanity.imageAsset` document. Every draft creates a `drafts.` prefixed document. System documents for CORS, webhooks, etc. also count.

**How to avoid:**
- **Capacity estimate at Ontario launch:** 15 provinces/states + 20 cities + 8 services + 160 cityService + 80 propertyCategory + ~50 listings + ~30 blog/guides + ~10 comparisons + ~5 case studies = ~378 content documents. With 2x multiplier for drafts + images: ~1,500-2,000 documents. Well within 10,000.
- **Monitor:** Sanity dashboard shows document count. Set a mental alarm at 5,000.
- **Optimize images:** Use Sanity's image CDN URL parameters for resizing/format instead of uploading multiple sizes. One image asset per content piece, not three.
- **Avoid unnecessary drafts:** Publish promptly; do not accumulate hundreds of draft documents.

**Warning signs:** Document creation fails silently or with quota error. Check Sanity dashboard monthly.

### Pitfall 3: City-Name-Swap Thin Content (Schema Enforcement)

**What goes wrong:** CityService pages are published with only the city name changed. Google's June 2025 core update deindexed sites entirely (not just demoted) for this pattern. Recovery takes 4-12 months.

**Why it happens:** Speed pressure. 20 cities x 8 services = 160 pages. The shortcut is cloning and swapping city names.

**How to avoid:** The Sanity `cityService` schema MUST enforce required fields for local differentiation:
- `localMedianRent` (number, required)
- `localVacancyRate` (number, required)
- `neighbourhoodNames` (array of strings, minimum 3, required)
- `localRegulatory` (text, required -- e.g., LTB references for Ontario)
- `localBody` (Portable Text, required -- unique editorial content)

If a cityService document can be published without these fields filled, the schema is wrong.

**Warning signs:** GSC shows "Crawled -- currently not indexed" for city pages. Content similarity >85% between city pages.

### Pitfall 4: Missing metadataBase Breaks All Canonicals

**What goes wrong:** Without `metadataBase` in root layout, canonical URLs render as relative paths (`/ca/ontario/toronto/` instead of `https://movesmartrentals.com/ca/ontario/toronto/`). OG tags also break. Silent failure -- no build error.

**How to avoid:** Set in root layout on day one:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://movesmartrentals.com'),
}
```

### Pitfall 5: GROQ Reference Chains Causing Slow Queries

**What goes wrong:** CityService queries resolve `city->province->`, `service->`, and nested arrays in a single GROQ call. Each `->` level is expensive. Complex queries hit 4-5s before CDN caching.

**How to avoid:** Flatten frequently-accessed data. Store city name, province slug, and service name directly on the `cityService` document as denormalized fields (updated via Sanity's Action hooks or manually). Limit reference resolution to max 2 levels. Use projections to fetch only needed fields.

### Pitfall 6: Sanity CDN Disabled in Production

**What goes wrong:** `useCdn: false` deployed to production means every page render hits the Content Lake API. At crawl events (Googlebot + Bingbot), this hits rate limits (500 req/s per IP) and causes LCP failures.

**How to avoid:** Environment-aware client config:
```typescript
// src/sanity/client.ts
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // true in prod, false in dev
})
```

## CMS Schema Architecture

### 9 Content Types with Field Specifications

Each content type includes two reusable object fieldsets: `seoFields` and `publishingControls`.

**Reusable SEO Fieldset (applied to ALL 9 types):**
```
seoFields:
  - metaTitle (string, max 60 chars, required)
  - metaDescription (string, max 160 chars, required)
  - ogImage (image with required alt text)
  - keywords (array of strings)
```

**Reusable Publishing Controls Fieldset (applied to ALL 9 types):**
```
publishingControls:
  - canonicalOverride (url, optional -- defaults to self-referencing)
  - noindex (boolean, default false)
  - includedInSitemap (boolean, default true)
  - redirectTo (url, optional)
  - publishedAt (datetime)
  - updatedAt (datetime)
  - author (string)
```

#### 1. Province (simple)
```
province:
  - title (string, required)
  - slug (slug, required, auto-generated, lowercase)
  - country (string, enum: ['ca', 'us'], required)
  - abbreviation (string, e.g., 'ON', 'FL')
  - description (text)
  - heroImage (image with alt)
  + seoFields
  + publishingControls
```

#### 2. City (geographic entity)
```
city:
  - title (string, required) -- e.g., "Toronto"
  - slug (slug, required, auto-generated)
  - province (reference to province, required)
  - tier (number, enum: [1, 2, 3], required) -- determines build priority
  - population (number)
  - medianRent (number) -- city-level default
  - vacancyRate (number)
  - neighbourhoods (array of strings)
  - transitInfo (text)
  - heroImage (image with alt)
  - description (portable text)
  + seoFields
  + publishingControls
```

#### 3. Service (service definition)
```
service:
  - title (string, required) -- e.g., "Tenant Placement"
  - slug (slug, required) -- becomes URL segment
  - shortDescription (text, required)
  - icon (string, icon name from lucide-react)
  - audience (string, enum: ['owner', 'tenant', 'both'], required)
  - order (number) -- display sort order
  - heroImage (image with alt)
  - body (portable text)
  - faq (array of {question: string, answer: text})
  + seoFields
  + publishingControls
```

#### 4. CityService (junction -- most complex, core SEO page)
```
cityService:
  - city (reference to city, required)
  - service (reference to service, required)

  # Denormalized for query performance (populated on create)
  - cityTitle (string, read-only)
  - provinceSlug (string, read-only)
  - citySlug (string, read-only)
  - serviceSlug (string, read-only)

  # Required local content (PREVENTS THIN CONTENT)
  - localMedianRent (number, required)
  - localVacancyRate (number, required)
  - neighbourhoodNames (array of strings, min 3, required)
  - localRegulatory (text, required)
  - localBody (portable text, required)

  # Standard blocks
  - heroHeadline (string, required)
  - heroSubheadline (string)
  - heroCta1 (object: {label, url})
  - heroCta2 (object: {label, url})
  - heroImage (image with alt)
  - painPoints (array of {problem: string, solution: string})
  - benefits (array of {title: string, description: text, icon: string})
  - howItWorks (array of {stepNumber: number, title: string, description: text})
  - testimonials (array of {name: string, city: string, quote: text, outcome: string})
  - faq (array of {question: string, answer: text})
  - relatedServices (array of references to service)

  + seoFields
  + publishingControls
```

#### 5. BlogGuide
```
blogGuide:
  - title (string, required)
  - slug (slug, required)
  - category (string, enum: ['blog', 'guide', 'market-report', 'legal-guide'])
  - city (reference to city, optional)
  - service (reference to service, optional)
  - body (portable text, required)
  - excerpt (text, max 200 chars)
  - heroImage (image with alt)
  - author (string)
  + seoFields
  + publishingControls
```

#### 6. Comparison
```
comparison:
  - title (string, required)
  - slug (slug, required)
  - service (reference to service, optional)
  - competitors (array of {name: string, features: array of {feature: string, us: string, them: string}})
  - body (portable text)
  + seoFields
  + publishingControls
```

#### 7. CaseStudy
```
caseStudy:
  - title (string, required)
  - slug (slug, required)
  - city (reference to city, optional)
  - clientName (string)
  - outcome (text, required)
  - body (portable text)
  - heroImage (image with alt)
  + seoFields
  + publishingControls
```

#### 8. PropertyCategory
```
propertyCategory:
  - title (string, required) -- e.g., "Apartments for Rent"
  - slug (slug, required) -- e.g., "apartments-for-rent"
  - city (reference to city, required)
  - propertyType (string, enum: ['apartment', 'condo', 'house', 'townhouse'], required)
  - description (portable text)
  - averageRent (number)
  + seoFields
  + publishingControls
```

#### 9. PropertyListing
```
propertyListing:
  - title (string, required)
  - slug (slug, required)
  - city (reference to city, required)
  - category (reference to propertyCategory, required)
  - price (number, required)
  - bedrooms (number, required)
  - bathrooms (number, required)
  - sqft (number)
  - address (text, required)
  - description (portable text)
  - images (array of image with required alt)
  - available (boolean)
  - availableDate (date)
  + seoFields
  + publishingControls
```

### Image Alt Text Enforcement

Every image field in every schema MUST include alt text as a required sibling field:

```typescript
// Sanity schema pattern for images with required alt
defineField({
  name: 'heroImage',
  title: 'Hero Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image with location/service context when relevant',
      validation: (Rule) => Rule.required().error('Alt text is required for SEO'),
    }),
  ],
})
```

## Technical SEO Baseline (Phase 1)

### metadataBase and Root Metadata

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://movesmartrentals.com'),
  title: {
    default: 'MoveSmart Rentals - Property Management Services',
    template: '%s | MoveSmart Rentals',
  },
  description: 'Professional property management services across Ontario and the US.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'MoveSmart Rentals',
  },
}
```

### generateMetadata Pattern (per dynamic route)

```typescript
// Each dynamic route implements generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}): Promise<Metadata> {
  const { province, city, service } = await params
  const data = await sanityFetch<CityServiceSEO>({
    query: CITY_SERVICE_SEO_QUERY,
    params: { province, city, service },
    tags: ['cityService'],
  })

  if (!data) return {}

  return {
    title: data.seo.metaTitle,
    description: data.seo.metaDescription,
    alternates: {
      canonical: `/ca/${province}/${city}/${service}/`,
    },
    openGraph: {
      title: data.seo.metaTitle,
      description: data.seo.metaDescription,
      images: data.seo.ogImage ? [{ url: data.seo.ogImage }] : [],
    },
  }
}
```

### robots.ts

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: 'https://movesmartrentals.com/sitemap.xml',
  }
}
```

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

## Hosting Constraint Analysis

**CRITICAL ISSUE: Vercel Hobby Plan and Commercial Use**

The user constraint states "Vercel must be free/hobby tier." However, Vercel's Hobby plan explicitly prohibits commercial use per their [fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines). This is a property management company website -- clearly commercial.

| Option | Cost | ISR Support | Commercial Use | Risk |
|--------|------|-------------|----------------|------|
| Vercel Hobby | $0 | Full native | PROHIBITED (ToS violation) | Account termination without notice |
| Vercel Pro | $20/seat/mo | Full native | Allowed | None |
| Netlify Starter | $0 | Yes (via OpenNext) | Allowed | Slightly different ISR behavior |

**Technical comparison for free tiers:**

| Feature | Vercel Hobby | Netlify Starter |
|---------|-------------|-----------------|
| Bandwidth | 100 GB/mo | ~30 GB (300 credits, 10/GB) |
| Build minutes | 6,000/mo | ~100 (300 credits, 3/min) |
| Functions | 1M invocations | Credit-based |
| ISR | Native, full support | Via Netlify Functions (OpenNext) |
| Build timeout | Not documented for Hobby | ~15 min |
| Edge CDN | Yes | Yes |
| SSL | Automatic | Automatic |
| Preview deploys | Yes (100/day max) | Yes |

**Recommendation:** If the $0 constraint is truly absolute, deploy to Vercel Hobby and accept the ToS risk (low practical risk for a small site but technically violating terms). If $20/month is feasible, Vercel Pro eliminates all risk and provides better limits. The codebase is identical either way.

## Sanity Free Tier Capacity Analysis

| Resource | Limit | Phase 1 Usage | Full Ontario Launch | Headroom |
|----------|-------|---------------|---------------------|----------|
| Documents | 10,000 | ~200 (schemas + seed data) | ~2,000 (content + images + drafts) | 8,000 remaining |
| API CDN requests | 1M/month | Minimal (dev) | ~50K-100K/month (ISR + Studio) | 900K remaining |
| API requests (non-CDN) | 250K/month | Minimal | ~10K-20K (draft mode, Studio) | 230K remaining |
| Bandwidth | 100 GB/month | Minimal | ~5-10 GB (images served from Sanity CDN) | 90 GB remaining |
| Assets storage | 100 GB | Minimal | ~2-5 GB (images) | 95 GB remaining |
| User seats | 20 | 1-2 (dev) | 3-5 (dev + content team) | Ample |

**Document count breakdown at full Ontario launch:**
- Province/State docs: 15
- City docs: 20 (Tier-1 Ontario)
- Service docs: 8
- CityService docs: 160 (20 cities x 8 services)
- PropertyCategory docs: 80 (20 cities x 4 types)
- PropertyListing docs: ~100 (estimated)
- BlogGuide docs: ~30
- Comparison docs: ~10
- CaseStudy docs: ~5
- Image assets: ~300 (each uploaded image = 1 document)
- Draft versions: ~200 (active drafts)
- System docs: ~20

**Total estimate: ~950-1,200 documents. Well within 10,000 limit for Ontario launch.**

**Risk point:** Full US rollout (10 states x 20 cities x 8 services = 1,600 cityService docs alone) would approach 4,000-5,000 total documents including images. Still within 10,000 but worth monitoring.

## Block Component API Design

All 10 blocks are React Server Components with typed props. No client-side CMS fetching. Client Components used only for interactivity (accordion open/close, mobile nav toggle).

### Block Type Definitions

```typescript
// src/types/blocks.ts

export interface HeroBlockProps {
  headline: string
  subheadline?: string
  cta1?: { label: string; url: string }
  cta2?: { label: string; url: string }
  backgroundImage?: SanityImageSource & { alt: string }
}

export interface CTABannerBlockProps {
  headline: string
  primaryCta: { label: string; url: string }
  secondaryCta?: { label: string; url: string }
  variant?: 'default' | 'form' // form variant includes inline lead capture
}

export interface FAQBlockProps {
  questions: Array<{ question: string; answer: string }>
  enableSchema?: boolean // controls JSON-LD FAQPage injection
}

export interface ServiceGridBlockProps {
  services: Array<{
    title: string
    description: string
    icon: string
    href: string
  }>
}

export interface CityGridBlockProps {
  cities: Array<{
    title: string
    province: string
    href: string
    medianRent?: number
    heroImage?: SanityImageSource & { alt: string }
  }>
}

export interface PropertyCardBlockProps {
  listings: Array<{
    title: string
    price: number
    bedrooms: number
    bathrooms: number
    address: string
    href: string
    image?: SanityImageSource & { alt: string }
  }>
}

export interface TrustBlockProps {
  stats?: Array<{ value: string; label: string }>
  testimonials?: Array<{
    name: string
    city: string
    quote: string
    outcome?: string
  }>
}

export interface HowItWorksBlockProps {
  steps: Array<{
    stepNumber: number
    title: string
    description: string
  }>
}

export interface PainPointBlockProps {
  painPoints: Array<{
    problem: string
    solution: string
  }>
}

export interface BenefitsBlockProps {
  benefits: Array<{
    title: string
    description: string
    icon?: string
  }>
}
```

### Hero Block Image Priority

The HeroBlock MUST set `priority` on its image to avoid LCP failures:

```typescript
// src/components/blocks/hero-block.tsx
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export function HeroBlock({ headline, subheadline, cta1, cta2, backgroundImage }: HeroBlockProps) {
  return (
    <section className="relative">
      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).width(1920).height(1080).url()}
          alt={backgroundImage.alt}
          fill
          priority  // CRITICAL: LCP image must not be lazy-loaded
          sizes="100vw"
          className="object-cover"
        />
      )}
      {/* ... content */}
    </section>
  )
}
```

## Environment Variables

```
# Sanity (required)
NEXT_PUBLIC_SANITY_PROJECT_ID=       # Client-safe
NEXT_PUBLIC_SANITY_DATASET=production # Client-safe
SANITY_API_READ_TOKEN=                # Server-only, for Draft Mode
SANITY_WEBHOOK_SECRET=                # Server-only, validates webhook payloads

# Analytics (Phase 3, but env vars set up in Phase 1)
NEXT_PUBLIC_GTM_ID=                   # Google Tag Manager container ID
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `getStaticProps` / `getServerSideProps` | App Router `generateStaticParams` + Server Components | Next.js 13+ (2023) | All page data fetching is in async Server Components |
| `next-sitemap` npm package | Built-in `app/sitemap.ts` + `generateSitemaps()` | Next.js 13.3+ (2023) | Dynamic sitemap generation compatible with ISR |
| `@sanity/block-content-to-react` | `@portabletext/react` | 2022 | Old package officially deprecated |
| `tailwind.config.js` | CSS-first `@theme` in Tailwind v4 | Jan 2025 | No config file needed; faster builds |
| Manual `<Script>` for GTM | `@next/third-parties/google` | Next.js 14+ | Official package with performance-safe loading |
| `sanity-plugin-seo` | Custom SEO fieldset (inline) | Current | Plugin approach adds complexity; inline fieldset is simpler for Free Tier |
| HSL colors in shadcn/ui | OKLCH colors in shadcn/ui v4 | March 2026 | shadcn/ui v4 updated all color tokens to OKLCH |

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Playwright (end-to-end) + Vitest (unit, if needed) |
| Config file | None -- Wave 0 creates `playwright.config.ts` |
| Quick run command | `npx playwright test --project=chromium tests/smoke.spec.ts` |
| Full suite command | `npx playwright test` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Next.js project builds successfully | smoke | `npm run build` | N/A (build command) |
| FOUND-03 | Deployed URL returns 200 with HTTPS | smoke | `npx playwright test tests/smoke.spec.ts` | Wave 0 |
| FOUND-05 | /ca/ontario/toronto/ returns 200 | smoke | `npx playwright test tests/url-structure.spec.ts` | Wave 0 |
| FOUND-06 | Webhook revalidation works end-to-end | manual | POST to /api/revalidate with test payload | Manual |
| FOUND-07 | metadataBase produces absolute canonical | smoke | `npx playwright test tests/seo-baseline.spec.ts` | Wave 0 |
| FOUND-07 | Uppercase URL redirects to lowercase | smoke | `npx playwright test tests/url-normalization.spec.ts` | Wave 0 |
| NAV-01 | All 10 nav items render | smoke | `npx playwright test tests/navigation.spec.ts` | Wave 0 |
| NAV-03 | Mobile nav opens and shows all items | smoke | `npx playwright test tests/navigation.spec.ts` | Wave 0 |
| NAV-04 | Breadcrumb markup present on non-homepage | smoke | `npx playwright test tests/seo-baseline.spec.ts` | Wave 0 |
| SEO-03 | robots.txt accessible with sitemap reference | smoke | `npx playwright test tests/seo-baseline.spec.ts` | Wave 0 |
| SEO-04 | Canonical tag is absolute URL | smoke | `npx playwright test tests/seo-baseline.spec.ts` | Wave 0 |
| SEO-05 | OG tags present on pages | smoke | `npx playwright test tests/seo-baseline.spec.ts` | Wave 0 |
| SEO-07 | Images have alt text | smoke | `npx playwright test tests/seo-baseline.spec.ts` | Wave 0 |
| CMS-01 | All 9 content types appear in Sanity Studio | manual | Visual check in /studio | Manual |
| CMS-02 | Required fields prevent publishing incomplete docs | manual | Attempt publish without required fields | Manual |
| BLOCK-01-10 | Each block renders correctly with props | smoke | `npx playwright test tests/blocks.spec.ts` | Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` (catches type errors and build failures)
- **Per wave merge:** `npx playwright test` (full smoke suite against dev server)
- **Phase gate:** Full suite green against deployed preview URL before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `playwright.config.ts` -- Playwright configuration
- [ ] `tests/smoke.spec.ts` -- Basic site loads, returns 200
- [ ] `tests/url-structure.spec.ts` -- Geographic URL patterns return 200
- [ ] `tests/url-normalization.spec.ts` -- Uppercase redirect, trailing slash
- [ ] `tests/seo-baseline.spec.ts` -- Canonical, OG, robots.txt, breadcrumbs
- [ ] `tests/navigation.spec.ts` -- Header, footer, mobile nav, breadcrumbs
- [ ] `tests/blocks.spec.ts` -- Each block component renders (dev route with test data)
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install chromium`

## Open Questions

1. **Vercel Hobby vs Pro for commercial use**
   - What we know: Hobby plan explicitly prohibits commercial use. Pro is $20/seat/month. Netlify Starter ($0) allows commercial use but has different ISR implementation.
   - What's unclear: Whether the client will accept $20/month for Vercel Pro, or whether they want to accept the ToS risk of Hobby, or switch to Netlify.
   - Recommendation: Document this for the client. Default to Vercel Hobby (technically works, low practical risk) and note the upgrade path to Pro if/when the site gains traction. The codebase is identical.

2. **Sanity Free Tier 3-user write limit vs 20-seat limit**
   - What we know: The pricing page says "20 included seats" with Administrator and Viewer roles. Some search results reference "3 users" which appears to be outdated.
   - What's unclear: Whether all 20 seats can write/edit content, or if only some can. The free plan offers only Administrator and Viewer roles.
   - Recommendation: Verify by creating the Sanity project. For this contract, 1-2 developer admins + 1-2 content editors is well within any interpretation.

3. **US state pages and URL structure for Phase 3**
   - What we know: `/us/[state]/[city]/[service]/` mirrors the Canadian structure.
   - What's unclear: Whether US city pages will exist at Phase 1 or only as empty route scaffolds.
   - Recommendation: Create the route files in Phase 1 (empty `page.tsx` stubs) but do NOT create Sanity documents for US cities until Phase 3. This locks the URL structure without consuming document quota.

## Sources

### Primary (HIGH confidence)
- [Next.js 15.2.4 official docs](https://nextjs.org/docs) -- ISR, metadata API, generateStaticParams, middleware, sitemap.ts, robots.ts
- [Sanity pricing page](https://www.sanity.io/pricing) -- Free Tier: 10K docs, 20 seats, 1M CDN req, 250K API req, 100GB bandwidth/assets
- [Sanity caching and revalidation in Next.js](https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs) -- sanityFetch pattern, tag-based revalidation
- [Sanity GROQ-powered webhooks](https://www.sanity.io/docs/content-lake/webhooks) -- webhook setup for on-demand ISR
- [Sanity webhooks and on-demand revalidation guide](https://www.sanity.io/guides/sanity-webhooks-and-on-demand-revalidation-in-nextjs) -- end-to-end webhook + revalidateTag pattern
- [next-sanity npm v12.1.1](https://www.npmjs.com/package/next-sanity) -- official Next.js/Sanity bridge, parseBody for webhooks
- [Vercel Hobby plan docs](https://vercel.com/docs/plans/hobby) -- limits, commercial use restriction
- [Vercel fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines) -- commercial usage definition and prohibition on Hobby
- [shadcn/ui Next.js installation](https://ui.shadcn.com/docs/installation/next) -- init with Tailwind v4
- [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) -- OKLCH colors, data-slot attributes
- [Tailwind CSS v4 release](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, Rust engine
- [Next.js middleware redirect pattern](https://nesin.io/blog/redirect-urls-to-lowercase-nextjs-middleware) -- lowercase URL enforcement

### Secondary (MEDIUM confidence)
- [Netlify Next.js support](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) -- ISR via OpenNext, commercial use on free tier
- [Sanity technical limits](https://www.sanity.io/docs/content-lake/technical-limits) -- document structure, image assets as documents
- [Sanity API cost discussion](https://www.sanity.io/answers/discussion-on-potential-unexpected-costs-of-using-sanity-cms-due-to-api-usage-) -- CDN vs API rate limits
- [Google June 2025 thin content deindexing](https://www.getpassionfruit.com/blog/why-website-pages-are-getting-de-indexed-after-june-2025-google-core-update-complete-recovery-guide) -- programmatic page penalties

### Tertiary (LOW confidence)
- Vercel Hobby commercial use enforcement in practice -- no public data on how aggressively Vercel enforces for small sites. Community consensus is low practical risk but real ToS violation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified against official docs and npm
- Architecture: HIGH -- patterns verified against official Next.js, Sanity, and Vercel docs
- CMS Schema: HIGH -- field requirements derived from SEO research and contract deliverables
- Pitfalls: HIGH (technical) / MEDIUM (Vercel ToS enforcement) -- hosting constraint is the only uncertainty
- Hosting: MEDIUM -- Vercel Hobby works technically but violates commercial use terms

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (30 days -- stable ecosystem, no version changes expected during sprint)
