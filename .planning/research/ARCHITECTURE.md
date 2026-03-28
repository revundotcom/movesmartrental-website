# Architecture Patterns: MoveSmartRentals.com

**Domain:** Multi-market rental property management website + programmatic SEO system
**Stack:** Next.js 15 (App Router) + Sanity v3 CMS + Vercel Pro
**Researched:** 2026-03-28
**Confidence:** HIGH (official Next.js docs, official Vercel limits, official Sanity docs)

---

## Recommended Architecture

The system has four discrete layers. Each has a clear owner and communicates in one direction — content flows from CMS outward to CDN edge.

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 1: Content Lake (Sanity CMS)                             │
│  Sanity Studio v3  ←→  Content Lake API (GROQ over HTTPS)       │
└───────────────────────────────┬─────────────────────────────────┘
                                │ GROQ queries via next-sanity
                                │ sanityFetch() with revalidation tags
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 2: Rendering Engine (Next.js 15 App Router)              │
│                                                                  │
│  Route Groups           generateStaticParams()                   │
│  /app/(site)/           ISR + on-demand revalidation             │
│  /app/studio/           generateMetadata()                       │
│  /app/api/              generateSitemaps()                       │
│                          JSON-LD injection in page.tsx           │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTML + JS bundles
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 3: Edge / CDN (Vercel Pro)                                │
│  Vercel Edge Network    ISR Cache                                │
│  Webhook receiver       revalidateTag() API route                │
│  45-min build limit     Static file uploads ≤1 GB                │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTML served to browsers
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 4: Browser / Third-Party Integrations                     │
│  GTM + GA4              Zoho SalesIQ chat                        │
│  Google Search Console  Bing Webmaster Tools                     │
│  Client-side analytics events                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

### Component 1: Sanity Schema Layer

**Responsibility:** Define all 9 content types with their fields. Acts as the single source of truth for all structured data.

**Communicates with:** Rendering Engine (read-only via GROQ), Sanity Studio (read/write via Content Lake API)

**9 Content Types and Their Primary References:**

| Content Type | Purpose | Key References |
|---|---|---|
| `province` | Top-level geographic parent (CA/US) | none |
| `city` | City with tier, population, slug | `province` |
| `service` | Service definition (tenant-placement, etc.) | none |
| `cityService` | Intersection of city + service — core SEO page | `city`, `service` |
| `blogGuide` | Blog posts and long-form guides | `city` (optional), `service` (optional) |
| `comparison` | Comparison pages (e.g. vs competitors) | `service` (optional) |
| `caseStudy` | Social proof pages | `city` (optional) |
| `propertyCategory` | Rental category hub (apartments, condos) | `city` |
| `propertyListing` | Individual property listing | `city`, `propertyCategory` |

**Design rule for all content types:** Every type has an `seo` fieldset (metaTitle, metaDescription, canonicalOverride, noindex) so editors control search appearance without touching code. This is a standard Sanity pattern supported by `sanity-plugin-seo` or a custom inline fieldset.

---

### Component 2: URL Router (Next.js App Directory)

**Responsibility:** Map Sanity content types to URL patterns. All geographic routes live under a dynamic four-segment hierarchy.

**Communicates with:** Sanity Schema Layer (via `generateStaticParams`), Edge/CDN (sends static HTML)

**File system layout:**

```
app/
├── layout.tsx                          # Root layout: GTM script, fonts, SalesIQ
├── page.tsx                            # Homepage
│
├── (site)/
│   ├── ca/
│   │   └── [province]/
│   │       └── [city]/
│   │           └── [service]/
│   │               └── page.tsx        # /ca/ontario/toronto/tenant-placement/
│   │
│   ├── us/
│   │   └── [state]/
│   │       └── [city]/
│   │           └── [service]/
│   │               └── page.tsx        # /us/florida/miami/tenant-placement/
│   │
│   ├── owners/page.tsx
│   ├── tenants/page.tsx
│   ├── services/[service]/page.tsx
│   ├── locations/page.tsx
│   ├── pricing/page.tsx
│   ├── resources/[slug]/page.tsx
│   ├── franchising/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
│
├── studio/[[...tool]]/page.tsx         # Sanity Studio embedded
│
├── api/
│   ├── revalidate/route.ts             # Sanity webhook receiver
│   └── sitemap/[id]/route.ts           # Per-segment sitemap handler
│
├── sitemap.ts                          # Sitemap index (links to segments)
└── robots.ts                           # robots.txt
```

**URL convention enforcement (next.config.ts):**
- `trailingSlash: true` — all URLs end with `/`
- Middleware normalizes uppercase to lowercase
- `redirects` array handles legacy WordPress URL patterns

---

### Component 3: Page Data Pipeline

**Responsibility:** Fetch CMS data per route, assemble page data, pass to template. Every page route follows the same three-step pattern.

**Communicates with:** Sanity Schema Layer (GROQ), Block Composer (props down)

**Pattern per route:**

```typescript
// Step 1: generateStaticParams — pre-render priority pages at build time
export async function generateStaticParams() {
  // Pre-render: all Tier-1 Ontario cities × all services = ~320 pages
  // Returns partial list; dynamicParams = true lets remainder generate on-demand
  const priority = await sanityFetch({
    query: `*[_type == "cityService" && city->tier == 1]{
      "province": city->province->slug.current,
      "city": city->slug.current,
      "service": service->slug.current
    }`,
    tags: ["cityService"]
  })
  return priority
}

export const dynamicParams = true  // Non-priority pages generate on first visit

// Step 2: generateMetadata — SEO metadata per route
export async function generateMetadata({ params }) { ... }

// Step 3: Page component — fetch full page data, render blocks
export default async function CityServicePage({ params }) {
  const data = await sanityFetch({ query: CITY_SERVICE_QUERY, tags: [...] })
  return <PageTemplate blocks={data.blocks} schema={buildJsonLd(data)} />
}
```

**Caching strategy:**
- `sanityFetch()` wraps all CMS queries with revalidation tags
- Tags are document type names: `["cityService", "city", "service"]`
- When Sanity content changes, webhook fires → `revalidateTag("cityService")` → all pages using that tag regenerate on next request

---

### Component 4: Block Composer (UI Component System)

**Responsibility:** Render 22+ page templates from ~10 reusable React Server Components. No business logic — purely presentation.

**Communicates with:** Page Data Pipeline (receives props), Browser (sends HTML)

**10 Core Blocks and their usage:**

| Block Component | Props | Used In |
|---|---|---|
| `HeroBlock` | headline, subheadline, cta1, cta2, backgroundImage | Homepage, CityService, ServiceHub |
| `ServiceGridBlock` | services[] with icon, title, link | Homepage, OwnerHub |
| `FAQBlock` | questions[], schemaEnabled: bool | CityService, GuidePages, LandlordFAQ |
| `CTABannerBlock` | headline, primaryCta, secondaryCta, variant | All pages (bottom CTA) |
| `ContentBodyBlock` | portableText (Sanity Portable Text) | Blog, Guide, CaseStudy |
| `TestimonialsBlock` | testimonials[], variant | Homepage, CityService |
| `CityGridBlock` | cities[], province | Locations, ProvinceHub |
| `PropertyListingBlock` | listings[], filters | PropertyCategory, TenantHub |
| `BreadcrumbBlock` | crumbs[] | All geographic pages |
| `ComparisonTableBlock` | rows[], competitors[] | Comparison pages |

**Composition pattern — CityService page template:**

```
<BreadcrumbBlock />      ← always first on geographic pages
<HeroBlock />            ← city + service specific headline
<ContentBodyBlock />     ← localized body copy from Sanity Portable Text
<ServiceGridBlock />     ← related services for cross-linking
<FAQBlock />             ← FAQ schema auto-generated if schemaEnabled
<TestimonialsBlock />    ← social proof
<CTABannerBlock />       ← always last
```

**JSON-LD injection:** Each `page.tsx` builds a schema object from page data and injects it as a native `<script type="application/ld+json">` tag — NOT through `next/script` (which is for executable code). The `<`, character is replaced with `\u003c` to prevent XSS as per official Next.js guidance.

---

### Component 5: Schema Markup System

**Responsibility:** Generate 7 types of JSON-LD structured data. Built as pure TypeScript functions — no external dependency needed.

**Communicates with:** Page Data Pipeline (receives data), Browser (injects into HTML `<head>` region)

**7 Schema types and their page targets:**

| Schema Type | Page Types | Key Fields |
|---|---|---|
| `Organization` | Homepage, About | name, url, logo, contactPoint, sameAs (social) |
| `LocalBusiness` | CityService, City hub | name, address, geo, openingHours, areaServed |
| `Service` | CityService, ServiceHub | name, provider, areaServed, description |
| `RealEstateListing` | PropertyListing | name, price, address, numberOfRooms, url |
| `Article` | Blog, Guide, CaseStudy | headline, author, datePublished, dateModified |
| `FAQPage` | CityService, FAQ pages | mainEntity[] with Question+Answer pairs |
| `BreadcrumbList` | All geographic pages | itemListElement[] matching URL segments |

**Implementation rule:** Each schema builder is a pure function `buildXxxSchema(data) => object`. The page component calls `JSON.stringify(schema).replace(/</g, '\\u003c')` before injecting. TypeScript types come from the `schema-dts` npm package.

---

### Component 6: Sitemap System

**Responsibility:** Generate segmented XML sitemaps that scale to 1000+ pages without hitting the 50,000 URL per sitemap limit.

**Communicates with:** Sanity Schema Layer (queries all published slugs), Google Search Console / Bing (consumes sitemap index)

**Sitemap index → segment structure:**

```
/sitemap.xml                 ← index pointing to all segments
/sitemap/0.xml               ← static pages (homepage, about, etc.)
/sitemap/1.xml               ← CA province + city hub pages
/sitemap/2.xml               ← CA city × service pages (largest segment)
/sitemap/3.xml               ← US state + city hub pages
/sitemap/4.xml               ← US city × service pages
/sitemap/5.xml               ← Blog + guides
/sitemap/6.xml               ← Property listings
```

**Implementation:** Uses `generateSitemaps()` function in `app/sitemap.ts`. Each segment ID maps to a GROQ query that returns URLs with `lastmod`, `changefreq`, and `priority` values. Segments are served at `/sitemap/[id].xml`.

---

### Component 7: Analytics + Tracking Layer

**Responsibility:** Implement GTM, GA4, GSC, SalesIQ without blocking page render or harming Core Web Vitals.

**Communicates with:** Browser (client-side events), Google/Zoho (external reporting)

**Implementation:**

```typescript
// app/layout.tsx — root layout only
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleTagManager gtmId="GTM-XXXXXXX" />  {/* loads after hydration */}
      </body>
    </html>
  )
}
```

- GA4 is configured through GTM — no separate GA4 script tag needed
- All event tracking (account-creation, book-a-call, scroll depth, etc.) is defined as GTM triggers, not hardcoded in components
- Zoho SalesIQ: loaded as a `<Script strategy="lazyOnload">` in root layout to avoid LCP impact
- GSC/Bing verification: via `<meta name="google-site-verification">` in `generateMetadata` in root layout, not as script tags

---

## Data Flow

```
Editor publishes in Sanity Studio
         │
         ▼
Sanity Content Lake (stores document)
         │
         ├─── GROQ-powered webhook fires → POST /api/revalidate
         │              │
         │              ▼
         │    Next.js API route validates signature
         │    calls revalidateTag("cityService")  ← or relevant type
         │
         ▼
Next.js ISR cache invalidated for affected pages
         │
         ▼
Next visitor to /ca/ontario/toronto/tenant-placement/
         │
         ▼
Vercel edge: cache miss → triggers ISR regeneration
         │
         ▼
Next.js renders page.tsx on server:
  1. sanityFetch() calls Content Lake with GROQ
  2. generateMetadata() builds <head> tags
  3. Page component assembles blocks
  4. JSON-LD schema injected as <script>
  5. BreadcrumbBlock renders from URL params
         │
         ▼
Static HTML written to Vercel edge cache
         │
         ▼
Subsequent visitors served from CDN (no GROQ call)
         │
         ▼
Browser: GTM loads → GA4 fires page_view
         Zoho SalesIQ loads lazily
```

**Key data flow rules:**
- GROQ queries always originate from Server Components — never from client components (avoids CORS, avoids secret exposure)
- `sanityFetch()` is the only function that touches Content Lake — not raw `createClient().fetch()`
- All data passed to client components is serialized props — no client-side CMS fetching

---

## Build Order (Phase Dependencies)

These are hard dependencies — each group cannot start until the prior group is complete.

### Group 1: Foundation (no dependencies)
Must be done first because everything else imports from these.

1. **Next.js project scaffold** — `create-next-app` with TypeScript, Tailwind v4, ESLint
2. **Sanity project + Studio setup** — `sanity init`, connect to project ID, configure CORS
3. **Environment variables** — `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_WEBHOOK_SECRET`
4. **`next-sanity` configuration** — `sanityFetch()` wrapper, client config, revalidation tags setup

### Group 2: CMS Schema (depends on Group 1)
All 9 content types must be defined before any page template can be built, because `generateStaticParams` and GROQ queries depend on schema shape.

5. **Province + City schemas** — simplest, establishes geographic hierarchy
6. **Service schema** — slug becomes URL segment; define all 16+ service slugs here
7. **CityService junction schema** — most complex; references both City and Service; defines block array for Portable Text body
8. **Blog/Guide, Comparison, CaseStudy schemas** — editorial content types
9. **PropertyCategory + PropertyListing schemas** — tenant-facing content types
10. **Global SEO fieldset** — reusable object added to all content types

### Group 3: Core URL Structure (depends on Group 1)
URL hierarchy must exist before page components are built into it.

11. **`next.config.ts`** — trailing slash, redirects, image domains, headers
12. **Middleware** — lowercase normalization, trailing slash enforcement
13. **Root layout** — GTM tag, font loading, SalesIQ lazy script, global metadata
14. **Geographic route files** — empty `page.tsx` files to establish `/ca/[province]/[city]/[service]/` hierarchy

### Group 4: Reusable Block Components (depends on Group 1; parallel with Groups 2-3)
These are pure React Server Components with typed props — no CMS dependency yet.

15. **HeroBlock, CTABannerBlock** — highest priority; appear on every page
16. **ServiceGridBlock, BreadcrumbBlock, FAQBlock** — SEO-critical blocks
17. **ContentBodyBlock** — requires `@portabletext/react` configuration
18. **TestimonialsBlock, CityGridBlock, PropertyListingBlock, ComparisonTableBlock**

### Group 5: Page Templates (depends on Groups 2, 3, 4)
Wire GROQ queries to block components for each template type.

19. **Homepage** — most blocks; validates the entire block system works
20. **CityService page** — most critical SEO template; must include `generateStaticParams`, `generateMetadata`, all 7 schema types
21. **ServiceHub pages** — `/services/[service]/`
22. **Province/State hub + City hub pages** — geographic overview pages
23. **Tenant pages** — PropertyCategory, PropertyListing templates
24. **Editorial pages** — Blog, Guide, Comparison, CaseStudy templates
25. **Static pages** — About, Pricing, Franchising, Contact (no `generateStaticParams` needed)

### Group 6: Technical SEO Layer (depends on Group 5)
Can only be validated once pages exist with real content.

26. **Sitemap system** — `generateSitemaps()` pulling from all content type slugs
27. **robots.ts** — block `/studio/` and `/api/` from crawlers
28. **JSON-LD schema builders** — one per schema type, integrated into Group 5 page templates
29. **Canonical tags** — via `generateMetadata` alternates
30. **404 page** — `not-found.tsx` with internal links to prevent dead ends

### Group 7: Webhook + Revalidation (depends on Groups 2, 5)
Requires published content types AND deployed page templates to test end-to-end.

31. **`/api/revalidate` route** — HMAC signature validation, `revalidateTag()` calls
32. **Sanity webhook configuration** — GROQ filter per document type, target Vercel deployment URL
33. **End-to-end test** — publish CityService in Studio, confirm ISR fires, confirm updated HTML

### Group 8: Analytics + Handoff (depends on Groups 5, 6, 7)
Final layer; requires working pages to track.

34. **GA4 event tracking** — GTM triggers for all 8 named events
35. **GSC + Bing verification** — meta tags in root layout generateMetadata
36. **Content entry** — Ontario Tier-1 cities × all service types populated in Sanity
37. **Performance audit** — Core Web Vitals (LCP <2.5s, INP <200ms, CLS <0.1)
38. **Handoff documentation** — publishing SOP, deployment checklist, credential transfer

---

## Scalability Considerations

| Concern | At Launch (Ontario Tier-1) | At Full Rollout (CA + US) | At Scale (1000+ listings) |
|---|---|---|---|
| Static pages | ~320 pages pre-rendered | ~2,000 pages; use partial `generateStaticParams` + ISR for long tail | ISR on-demand; build pre-renders only top 100 |
| Build time | <10 min (well under 45-min Vercel limit) | Monitor; switch to empty `generateStaticParams` + `dynamicParams: true` if approaching limit | Full on-demand ISR; build time near-zero |
| GROQ query cost | Negligible | Add projection limits (`{field1, field2}` not `*`) | Cache aggressively with revalidation tags; avoid unbounded queries |
| Sanity API rate limits | N/A for static builds | Tag-based revalidation means one webhook → one `revalidateTag` call, not per-page | GROQ-powered webhooks batch updates intelligently |
| Sitemap | 1-2 segments | 5-6 segments | 7+ segments; `generateSitemaps()` scales linearly |

**Vercel Pro limits that apply to this project:**
- Build time: 45 minutes maximum — use ISR for long-tail pages to stay well under
- Static file uploads: 1 GB — pre-rendered HTML is tiny; not a concern
- ISR reads: First 10,000,000 included in Pro — adequate for launch scale
- Routes per deployment: 2,048 — this is routing rules (rewrites/headers), not page count; not a concern

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client-Side GROQ Fetching
**What:** Calling `createClient().fetch()` inside a `useEffect` or client component
**Why bad:** Exposes Sanity API token to browser; bypasses ISR caching; content not indexable by crawlers (rendered after JS loads)
**Instead:** All GROQ queries in Server Components or `generateStaticParams`. Pass serialized data down as props.

### Anti-Pattern 2: Pre-rendering All 1000+ Pages at Build Time
**What:** Returning all city × service combinations from `generateStaticParams`
**Why bad:** Build times will approach or exceed the 45-minute Vercel limit; blocks deploys; slow content iteration
**Instead:** Pre-render Tier-1 Ontario priority pages (~320) at build time; set `dynamicParams = true` so all other combinations generate on first request and are then cached.

### Anti-Pattern 3: City Name Substitution Thin Content
**What:** CityService pages that only swap the city name in an otherwise identical template
**Why bad:** Google penalizes programmatically generated pages with no unique value; pages won't rank; risk of manual action
**Instead:** Each CityService document in Sanity has a required `localBody` Portable Text field that editors fill with city-specific content (local landlord-tenant law references, neighborhood context, local rental market stats). The template renders this above the generic service description.

### Anti-Pattern 4: Monolithic `layout.tsx` Data Fetching
**What:** Fetching all navigation, footer, and page data in the root layout
**Why bad:** Root layout data is shared across all routes — a single slow query blocks every page; cache invalidation is coarse
**Instead:** Navigation and footer data fetched in their own Server Component wrappers with their own revalidation tags (`nav`, `footer`). Page-specific data fetched in the page component only.

### Anti-Pattern 5: Blocking Scripts in `<head>`
**What:** Adding GTM or SalesIQ scripts as synchronous `<script>` in the document head
**Why bad:** Blocks HTML parsing; increases LCP and INP; poor Core Web Vitals scores hurt rankings
**Instead:** GTM via `@next/third-parties/google` (loads after hydration); SalesIQ via `<Script strategy="lazyOnload">`. JSON-LD structured data uses a native `<script>` tag in body — this is correct and does not block rendering.

### Anti-Pattern 6: Single Monolithic Sitemap
**What:** One `sitemap.xml` with all 1000+ URLs
**Why bad:** Google recommends under 50,000 URLs per sitemap; single sitemap makes GSC diagnostics opaque; slow to generate
**Instead:** Segmented sitemaps via `generateSitemaps()` with one segment per content category. Sitemap index at `/sitemap.xml` references all segments.

---

## Sources

- [generateStaticParams — Next.js official docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — HIGH confidence
- [Incremental Static Regeneration — Next.js official docs](https://nextjs.org/docs/app/guides/incremental-static-regeneration) — HIGH confidence
- [JSON-LD in Next.js — Next.js official docs](https://nextjs.org/docs/app/guides/json-ld) — HIGH confidence
- [generateSitemaps — Next.js official docs](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) — HIGH confidence
- [Third-Party Libraries (GTM) — Next.js official docs](https://nextjs.org/docs/app/guides/third-party-libraries) — HIGH confidence
- [Vercel Pro Limits — official docs](https://vercel.com/docs/limits) — HIGH confidence
- [Sanity + Next.js App Router architecture — Sanity official blog](https://www.sanity.io/blog/sanity-nextjs-enhancements) — HIGH confidence
- [On-demand ISR with Sanity webhooks — Sanity guides](https://www.sanity.io/guides/sanity-webhooks-and-on-demand-revalidation-in-nextjs) — HIGH confidence
- [Sanity caching and revalidation docs](https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs) — HIGH confidence
- [Sanity Portable Text docs](https://www.sanity.io/docs/block-content) — HIGH confidence
