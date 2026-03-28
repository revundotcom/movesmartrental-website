# Phase 2: Core Build -- Templates and Top Cities - Research

**Researched:** 2026-03-28
**Domain:** Next.js 15 page templates, Sanity CMS content composition, programmatic SEO, JSON-LD structured data, XML sitemaps
**Confidence:** HIGH

## Summary

Phase 2 transforms the Phase 1 foundation (10 block components, 9 CMS schemas, 7 JSON-LD builders, sanityFetch wrapper, header/footer/breadcrumbs) into 23 fully-rendered page templates, populates 20 Ontario Tier-1 cities with localized content, wires all 7 JSON-LD schema types into their target pages, builds dynamic XML sitemaps, and ensures AI discoverability patterns. This is the largest phase: 47 requirements across templates (TMPL-01--23), owner hub (OWN-01--05), tenant hub (TEN-01--05), geography (GEO-05--06), SEO (SEO-02, SEO-06, SEO-08), schema (SCHEMA-01--07), and AI (AI-01--02).

The core technical work is composition, not creation. Every building block exists. Page templates are Server Components that call `sanityFetch()`, pass data to block components, and inject JSON-LD via the `JsonLd` component. The primary risk is not technical complexity -- it is content thin-ness. The CMS schema already enforces required local fields on CityService pages (localMedianRent, localVacancyRate, neighbourhoodNames min 3, localRegulatory, localBody). But the templates must surface that data prominently in rendered HTML, and the content seeded for 20 Ontario cities must be genuinely localized -- not city-name swaps.

**Primary recommendation:** Organize work into 6-8 plans: static page templates first (homepage, about, contact, pricing, franchising), then hub pages (owners, tenants, services, locations, resources, FAQ), then geographic templates (province, city, service, city-service, property-category, property-detail), then content resource templates (blog, comparison, case-study, legal-guide, market-guide), then sitemaps and 404, then Ontario city content seeding with CMS data. Each plan produces buildable, verifiable output.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TMPL-01 | Homepage template with all contract-required sections | Compose from HeroBlock, PainPointBlock, ServiceGridBlock, CityGridBlock, TrustBlock, HowItWorksBlock, FAQBlock, CTABannerBlock + Organization JSON-LD |
| TMPL-02 | Owners hub template | Compose from HeroBlock, PainPointBlock, BenefitsBlock, ServiceGridBlock (owner audience filter), TrustBlock, FAQBlock, CTABannerBlock |
| TMPL-03 | Tenants hub template | Compose from HeroBlock, CityGridBlock, PropertyCardBlock, FAQBlock, CTABannerBlock |
| TMPL-04 | Services hub template | ServiceGridBlock listing all 8 services with descriptions |
| TMPL-05 | Locations hub template | CityGridBlock grouped by province/state with tier indicators |
| TMPL-06 | Pricing page template | Static content with pricing tiers, FAQ, CTABannerBlock |
| TMPL-07 | Resources hub template | Grid of blog/guide/comparison links |
| TMPL-08 | Franchising page template | Static content with HeroBlock, BenefitsBlock, HowItWorksBlock, CTABannerBlock |
| TMPL-09 | About page template | Static content with Organization JSON-LD |
| TMPL-10 | Contact page template | Contact form (react-hook-form + zod), address, phone, CTABannerBlock |
| TMPL-11 | FAQ hub template | Aggregated FAQBlock from multiple sources with FAQPage JSON-LD |
| TMPL-12 | Blog/guide template | Portable Text body rendering with Article/BlogPosting JSON-LD |
| TMPL-13 | Province/state template | CityGridBlock for province cities, province description |
| TMPL-14 | City template | City overview with ServiceGridBlock, PropertyCardBlock, local data, LocalBusiness JSON-LD |
| TMPL-15 | Service template | Service detail with Portable Text body, Service JSON-LD, CityGridBlock for available cities |
| TMPL-16 | Service-plus-city (CityService) template | Highest-value SEO page: all blocks composed, LocalBusiness + Service + FAQ + BreadcrumbList JSON-LD |
| TMPL-17 | Legal guide template | Blog/guide variant with category='legal-guide' |
| TMPL-18 | Market guide template | Blog/guide variant with category='market-report' |
| TMPL-19 | Comparison template | ComparisonTable layout with competitor data |
| TMPL-20 | Case study/testimonial template | Article JSON-LD, outcome highlight, city reference |
| TMPL-21 | Portal-and-technology template | Static service page describing tech platform |
| TMPL-22 | Property category template (tenant searches) | PropertyCardBlock filtered by category + city, crawlable HTML listings |
| TMPL-23 | Property detail template | Full listing detail with RealEstateListing JSON-LD |
| OWN-01 | Owner-facing pages targeting landlord/investor intent | Owner hub + service pages use owner-specific H1s, meta descriptions, CTAs |
| OWN-02 | Commercial service pages (8 services) | 8 service detail pages with Portable Text body from CMS |
| OWN-03 | Localized service pages for 20 Ontario Tier-1 cities (160 pages) | CityService template x 20 cities x 8 services via generateStaticParams |
| OWN-04 | Owner-facing CTAs | CTABannerBlock variants: Create Free Account, Submit Property, Book a Call, Request Services |
| OWN-05 | Contract-required owner messaging | Messaging woven into PainPointBlock, BenefitsBlock, HowItWorksBlock on owner/service pages |
| TEN-01 | Tenant hub with city rental pages and property type categories | Tenants hub linking to city pages and property category pages |
| TEN-02 | Property type category pages per city | PropertyCategory template at /ca/[province]/[city]/[propertyType]-for-rent/ |
| TEN-03 | Bedroom-count pages where inventory supports | PropertyCategory sub-pages at /ca/[province]/[city]/1-bedroom-apartments/ etc. |
| TEN-04 | Tenant FAQ, application flow, tenant insurance, guarantor pages | Blog/guide templates with tenant-specific content |
| TEN-05 | Search/filter with crawlable HTML listings | PropertyCardBlock renders in server component HTML, not behind JS |
| GEO-05 | 20 Ontario Tier-1 city pages with full page families | City template + CityService pages for all 20 cities |
| GEO-06 | 16+ page families per Ontario city with localized content | Each city has: city hub, 8 service pages, 4 property category pages, 3 bedroom pages = 16+ pages |
| SEO-02 | XML sitemaps segmented by page type | generateSitemaps in sitemap.ts with segment IDs for cities, services, blog, listings, resources |
| SEO-06 | Meta titles 50-60 chars, meta descriptions 140-160 chars, one H1 | generatePageMetadata enforces lengths; templates use single H1 in HeroBlock |
| SEO-08 | 404 handling with custom error page, redirect logic | Enhance not-found.tsx with helpful links; notFound() in dynamic routes for missing CMS content |
| SCHEMA-01 | Organization schema on homepage | buildOrganizationSchema on homepage and about page |
| SCHEMA-02 | LocalBusiness/RealEstateAgent on city pages | buildLocalBusinessSchema on city and city-service pages |
| SCHEMA-03 | FAQ schema on pages with FAQ sections | FAQBlock schemaEnabled=true (already default); buildFaqPageSchema for standalone FAQ pages |
| SCHEMA-04 | Service schema on service pages | buildServiceSchema on service detail and city-service pages |
| SCHEMA-05 | Article/BlogPosting on blog/guide pages | buildArticleSchema on blog, guide, case-study, comparison pages |
| SCHEMA-06 | BreadcrumbList on all pages | BreadcrumbNav component already handles this; wire into every template |
| SCHEMA-07 | RealEstateListing on property detail pages | buildRealEstateListingSchema on property detail page |
| AI-01 | Content structured for AI citation | First 40-60 words must directly answer search intent; data points every 150-200 words in templates |
| AI-02 | Entity clarity with consistent naming | "MoveSmart Rentals" used consistently; Organization schema on homepage |
</phase_requirements>

## Standard Stack

### Core (Already Installed -- Phase 1)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| next | 15.2.4 | App Router, ISR, generateMetadata, generateStaticParams, sitemap.ts | Installed |
| react | 19.0.0 | Server Components for all page templates | Installed |
| typescript | 5.4+ | Type-safe template props and GROQ results | Installed |
| next-sanity | 11.6.12 | sanityFetch wrapper, Sanity Studio embed | Installed |
| sanity | 4.22.0 | CMS schema definitions | Installed |
| @portabletext/react | ^6.0.3 | Portable Text rendering in templates | Installed |
| tailwindcss | 4.x | Styling all templates | Installed |
| shadcn/ui (base-ui) | CLI v4 | UI primitives (Button, Card, Accordion, etc.) | Installed |
| lucide-react | latest | Icons in block components | Installed |
| react-hook-form | 7.x | Contact form, lead capture forms | Installed |
| zod | 4.x | Form validation schemas | Installed |
| @hookform/resolvers | latest | Zod resolver for react-hook-form | Installed |

### Supporting (Phase 2 Additions)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @portabletext/react | ^6.0.3 (already installed) | Render CMS Portable Text body content | Blog, guide, case study, comparison, city-service body content |

**No new npm installations required for Phase 2.** All dependencies are already in place from Phase 1.

## Architecture Patterns

### Existing Project Structure (from Phase 1)

```
src/
  app/
    (site)/
      ca/[province]/[city]/[service]/page.tsx   # CityService skeleton
      ca/[province]/[city]/page.tsx              # City skeleton
      ca/[province]/page.tsx                     # Province skeleton
      us/[state]/[city]/[service]/page.tsx       # US CityService skeleton
      us/[state]/[city]/page.tsx                 # US City skeleton
      us/[state]/page.tsx                        # US State skeleton
      owners/page.tsx                            # Owner hub skeleton
      tenants/page.tsx                           # Tenant hub skeleton
      services/[service]/page.tsx                # Service detail skeleton
      locations/page.tsx                         # Locations hub skeleton
      pricing/page.tsx                           # Pricing skeleton
      resources/[slug]/page.tsx                  # Resource detail skeleton
      franchising/page.tsx                       # Franchising skeleton
      about/page.tsx                             # About skeleton
      contact/page.tsx                           # Contact skeleton
    page.tsx                                     # Homepage skeleton
    not-found.tsx                                # 404 page skeleton
    robots.ts                                    # Robots.txt (complete)
    studio/[[...tool]]/                          # Sanity Studio (complete)
    api/revalidate/route.ts                      # ISR webhook (complete)
  components/
    blocks/                                      # 10 block components (complete)
    layout/                                      # Header, Footer, BreadcrumbNav, MobileNav (complete)
    ui/                                          # shadcn/ui primitives (complete)
    json-ld.tsx                                  # JSON-LD injection component (complete)
  sanity/
    queries/                                     # GROQ queries (city, service, city-service, navigation)
    schemas/                                     # 9 CMS document schemas + 3 object schemas
    client.ts                                    # Sanity client (complete)
    fetch.ts                                     # sanityFetch wrapper (complete)
  lib/
    metadata.ts                                  # generatePageMetadata helper (complete)
    schema-builders/                             # 7 JSON-LD builders (complete)
    utils.ts                                     # buildCanonicalUrl, sanitizeJsonLd, cn (complete)
  types/
    sanity.ts                                    # 9 CMS content type interfaces (complete)
    blocks.ts                                    # 10 block prop interfaces (complete)
```

### New Routes Needed (Phase 2)

These routes do NOT currently exist and must be created:

```
src/app/(site)/
  faq/page.tsx                                   # TMPL-11: FAQ hub
  ca/[province]/[city]/[propertyType]/page.tsx   # TMPL-22: Property category
  ca/[province]/[city]/[propertyType]/[bedroom]/page.tsx  # TEN-03: Bedroom count
  ca/[province]/[city]/rentals/[slug]/page.tsx   # TMPL-23: Property detail
src/app/sitemap.ts                               # SEO-02: Dynamic sitemaps
```

### New GROQ Queries Needed (Phase 2)

```
src/sanity/queries/
  province.ts          # Province page data + city list for province
  property-category.ts # Category pages by city + property type
  property-listing.ts  # Individual listing data + listing list by category
  blog-guide.ts        # Blog/guide page data + list for resources hub
  comparison.ts        # Comparison page data
  case-study.ts        # Case study page data
  homepage.ts          # Homepage aggregation query (featured cities, services, stats)
  faq.ts               # Aggregated FAQ from multiple document types
```

### Pattern: Page Template Composition

Every page template follows this exact pattern:

```typescript
// src/app/(site)/ca/[province]/[city]/[service]/page.tsx
import { sanityFetch } from '@/sanity/fetch'
import { CITY_SERVICE_PAGE_QUERY, CITY_SERVICE_PARAMS_QUERY } from '@/sanity/queries/city-service'
import { generatePageMetadata } from '@/lib/metadata'
import { buildLocalBusinessSchema, buildServiceSchema, buildFaqPageSchema, buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { PainPointBlock } from '@/components/blocks/pain-point-block'
import { BenefitsBlock } from '@/components/blocks/benefits-block'
import { HowItWorksBlock } from '@/components/blocks/how-it-works-block'
import { TrustBlock } from '@/components/blocks/trust-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Step 1: Pre-render Tier-1 city-service combos at build time
export async function generateStaticParams() {
  const params = await sanityFetch<Array<{ province: string; city: string; service: string }>>({
    query: CITY_SERVICE_PARAMS_QUERY,
    tags: ['cityService'],
  })
  return params
}

export const dynamicParams = true // Non-priority pages generate on-demand

// Step 2: SEO metadata from CMS
export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}): Promise<Metadata> {
  const { province, city, service } = await params
  const data = await sanityFetch({ query: CITY_SERVICE_SEO_QUERY, params: { provinceSlug: province, citySlug: city, serviceSlug: service }, tags: ['cityService'] })
  if (!data) return {}
  return generatePageMetadata({
    seo: data.seo,
    path: `/ca/${province}/${city}/${service}`,
    fallbackTitle: `${data.serviceTitle} in ${data.cityTitle}`,
    fallbackDescription: `Professional ${data.serviceTitle?.toLowerCase()} services in ${data.cityTitle}, ${data.provinceName}. MoveSmart Rentals provides expert property management.`,
  })
}

// Step 3: Render page with blocks + JSON-LD
export default async function CityServicePage({
  params,
}: {
  params: Promise<{ province: string; city: string; service: string }>
}) {
  const { province, city, service } = await params
  const data = await sanityFetch({
    query: CITY_SERVICE_PAGE_QUERY,
    params: { provinceSlug: province, citySlug: city, serviceSlug: service },
    tags: ['cityService', 'city', 'service'],
  })

  if (!data) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const pageUrl = `${siteUrl}/ca/${province}/${city}/${service}/`

  // Build JSON-LD schemas from SAME data object (prevents Pitfall 6)
  const schemas = [
    buildLocalBusinessSchema({ name: `MoveSmart Rentals - ${data.city.title}`, description: data.seo?.metaDescription || '', url: pageUrl, address: { streetAddress: '', city: data.city.title, province: data.province.title, postalCode: '', country: 'CA' }, areaServed: data.city.title }),
    buildServiceSchema({ name: data.service.title, description: data.service.shortDescription, url: pageUrl, provider: { name: 'MoveSmart Rentals', url: siteUrl }, areaServed: data.city.title }),
    ...(data.faq?.length ? [buildFaqPageSchema({ questions: data.faq })] : []),
    buildBreadcrumbListSchema({ crumbs: [
      { name: 'Home', url: siteUrl },
      { name: data.province.title, url: `${siteUrl}/ca/${province}/` },
      { name: data.city.title, url: `${siteUrl}/ca/${province}/${city}/` },
      { name: data.service.title, url: pageUrl },
    ]}),
  ]

  return (
    <>
      {schemas.map((schema, i) => <JsonLd key={i} data={schema} />)}

      <BreadcrumbNav crumbs={[
        { label: 'Home', href: '/' },
        { label: data.province.title, href: `/ca/${province}/` },
        { label: data.city.title, href: `/ca/${province}/${city}/` },
        { label: data.service.title, href: `/ca/${province}/${city}/${service}/` },
      ]} />

      <HeroBlock
        headline={data.heroHeadline}
        subheadline={data.heroSubheadline}
        cta1={data.heroCta1 ? { label: data.heroCta1.label, href: data.heroCta1.url } : undefined}
        cta2={data.heroCta2 ? { label: data.heroCta2.label, href: data.heroCta2.url } : undefined}
        priority={true}
      />

      {/* AI-01: Direct answer in first 40-60 words */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg">
          <PortableText value={data.localBody} />
        </div>
        {/* Localized data points for content differentiation */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div><strong>Median Rent:</strong> ${data.localMedianRent}/mo</div>
          <div><strong>Vacancy Rate:</strong> {data.localVacancyRate}%</div>
          <div><strong>Neighbourhoods:</strong> {data.neighbourhoodNames?.join(', ')}</div>
        </div>
      </section>

      {data.painPoints?.length > 0 && <PainPointBlock painPoints={data.painPoints} />}
      {data.benefits?.length > 0 && <BenefitsBlock benefits={data.benefits} />}
      {data.howItWorks?.length > 0 && <HowItWorksBlock steps={data.howItWorks} />}
      {data.testimonials?.length > 0 && <TrustBlock testimonials={data.testimonials} />}
      {data.faq?.length > 0 && <FAQBlock questions={data.faq} />}

      <CTABannerBlock
        headline="Get Started with MoveSmart Rentals"
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </>
  )
}
```

### Pattern: Sitemap with generateSitemaps (Next.js 15.2.4)

**CRITICAL: Next.js 15.2.4 uses `id: string` (NOT `id: Promise<string>` -- that is a Next.js 16 change).**

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/fetch'

export async function generateSitemaps() {
  return [
    { id: 'static' },      // Homepage, about, contact, pricing, etc.
    { id: 'ca-cities' },   // Ontario city hub pages
    { id: 'ca-services' }, // City x service pages (largest segment)
    { id: 'blog' },        // Blog, guides, comparisons
    { id: 'listings' },    // Property category and detail pages
    { id: 'resources' },   // Case studies, legal guides, market guides
  ]
}

export default async function sitemap({
  id,
}: {
  id: string   // <-- string in Next.js 15, Promise<string> in Next.js 16
}): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

  switch (id) {
    case 'static':
      return [
        { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${siteUrl}/owners/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        // ... all static pages
      ]
    case 'ca-cities': {
      const cities = await sanityFetch({ query: CITY_SITEMAP_QUERY, tags: ['city'] })
      return cities.map((city) => ({
        url: `${siteUrl}/ca/${city.provinceSlug}/${city.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: city.tier === 1 ? 0.8 : 0.6,
      }))
    }
    // ... other segments
  }
}
```

### Pattern: Portable Text Rendering

```typescript
// Use @portabletext/react for all CMS body content
import { PortableText } from '@portabletext/react'

// Define custom components for consistent rendering
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }, alt: string } }) => (
      <Image src={urlForImage(value.asset._ref)} alt={value.alt} width={800} height={400} />
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode, value: { href: string } }) => (
      <a href={value.href} className="text-primary underline" target={value.href.startsWith('http') ? '_blank' : undefined}>
        {children}
      </a>
    ),
  },
}

// Usage in templates:
<PortableText value={data.body} components={portableTextComponents} />
```

### Pattern: 404 Handling for Dynamic Routes

```typescript
// In every dynamic route page component:
import { notFound } from 'next/navigation'

export default async function CityPage({ params }) {
  const data = await sanityFetch({ query: CITY_PAGE_QUERY, params: { slug: city }, tags: ['city'] })
  if (!data) notFound()  // Returns 404 for unpublished/missing CMS content
  // ... render page
}
```

### Anti-Patterns to Avoid

- **City-name-swap content:** NEVER generate content by swapping city names in a template. Each CMS document must have unique localBody, localMedianRent, localVacancyRate, neighbourhoodNames. The CityService schema already enforces this with `Rule.required()`.
- **Client-side CMS fetching:** NEVER use `sanityFetch` or `client.fetch` in `'use client'` components. All CMS data flows through Server Components.
- **Separate data sources for JSON-LD vs rendered content:** NEVER build JSON-LD schema from a different GROQ query than the page rendering query. Same data object feeds both.
- **JS-hidden tenant listings:** NEVER render property listings behind client-side JavaScript. PropertyCardBlock is a Server Component that renders crawlable HTML.
- **Missing notFound() calls:** EVERY dynamic route MUST call `notFound()` when CMS data is null/undefined. Without this, empty pages with only header/footer get indexed.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Portable Text rendering | Custom block-to-HTML converter | `@portabletext/react` PortableText component | Handles all block types, marks, lists, nested content |
| XML sitemap generation | Custom XML builder or next-sitemap | Next.js built-in `sitemap.ts` + `generateSitemaps()` | Native, zero-dependency, auto-generates sitemap index |
| Meta tag generation | Manual `<meta>` tags in page head | `generateMetadata()` + `generatePageMetadata()` helper | Next.js Metadata API handles deduplication, template inheritance |
| JSON-LD serialization | Manual `JSON.stringify` in each page | `JsonLd` component from Phase 1 | Centralized XSS sanitization via `sanitizeJsonLd()` |
| Form validation | Manual form state management | react-hook-form + zod + @hookform/resolvers | Already installed; handles async validation, error states |
| Breadcrumb markup | Manual `<script>` tag per page | `BreadcrumbNav` component from Phase 1 | Renders both visual breadcrumbs and BreadcrumbList JSON-LD |
| URL construction | String concatenation for canonical/sitemap URLs | `buildCanonicalUrl()` from utils.ts | Consistent trailing-slash normalization |

**Key insight:** Phase 2 is assembly, not engineering. All tools exist. The risk is in content quality and completeness, not code complexity.

## Common Pitfalls

### Pitfall 1: CityService Template Missing notFound() Guard

**What goes wrong:** A dynamic route like `/ca/ontario/london/tenant-placement/` renders with no CMS data, producing a page with only header, footer, and empty content area. Google indexes it as thin content.
**Why it happens:** Developer forgets the `if (!data) notFound()` check after `sanityFetch()`.
**How to avoid:** Every dynamic route page component MUST start with `const data = await sanityFetch(...)` followed immediately by `if (!data) notFound()`. This is a mandatory pattern, not optional.
**Warning signs:** Empty pages visible at dynamic URLs during development.

### Pitfall 2: Sitemap ID Type Mismatch (Next.js 15 vs 16)

**What goes wrong:** Sitemap function uses `id: Promise<string>` (Next.js 16 API) instead of `id: string` (Next.js 15 API). Build fails or sitemap returns incorrect data.
**Why it happens:** Official docs show Next.js 16 examples by default. Project is on Next.js 15.2.4.
**How to avoid:** Use `{ id: string }` parameter type in sitemap function. Do NOT `await` the id. The version history clearly states: `v16.0.0` changed id to Promise.
**Warning signs:** TypeScript errors about awaiting non-Promise values.

### Pitfall 3: Missing JSON-LD on Pages That Need It

**What goes wrong:** Page template renders correctly visually but has no structured data. Google Rich Results Test shows nothing for the page.
**Why it happens:** Template composition focuses on visual blocks and forgets schema injection.
**How to avoid:** Create a checklist mapping every page template to its required schema types. Verify with Rich Results Test after each template is built.
**Warning signs:** Running Rich Results Test returns no structured data for the URL.

### Pitfall 4: Homepage Sections Missing Per Contract

**What goes wrong:** Homepage misses contract-required sections. Client review flags missing content.
**Why it happens:** Developer builds homepage as a simple composition of a few blocks without checking all required sections.
**How to avoid:** Homepage success criterion is explicit: hero with dual CTAs, owner problem/solution, service grid, portal section, tenant journey, featured cities, franchising preview, FAQ, final CTA. Every section must be present.
**Warning signs:** Counting sections on rendered homepage yields fewer than 9.

### Pitfall 5: Property Listings Rendered Behind JavaScript

**What goes wrong:** PropertyCardBlock works correctly visually but content is not in the HTML source. Googlebot does not see listings. TEN-05 requirement fails.
**Why it happens:** Developer accidentally makes PropertyCardBlock a client component, or wraps listing fetch in useEffect.
**How to avoid:** PropertyCardBlock is already a Server Component (no `'use client'` directive). Keep it that way. All listing data must flow through `sanityFetch()` in the page Server Component.
**Warning signs:** View page source shows no listing HTML. "View source" differs from rendered DOM.

### Pitfall 6: Tenant Property Category Routes Not Created

**What goes wrong:** Routes for `/ca/ontario/toronto/apartments-for-rent/` and bedroom count pages don't exist. TEN-02 and TEN-03 fail.
**Why it happens:** Phase 1 created the city-service route pattern but not the property category or bedroom count routes.
**How to avoid:** Create new route files at `(site)/ca/[province]/[city]/[propertyType]/page.tsx` and `(site)/ca/[province]/[city]/[propertyType]/[bedroom]/page.tsx`. These are new file system entries, not modifications to existing routes.
**Warning signs:** 404 when navigating to `/ca/ontario/toronto/apartments-for-rent/`.

### Pitfall 7: Owner Messaging Not Present on Service Pages

**What goes wrong:** Service pages exist but lack the contract-required owner messaging: nothing upfront, self-serve online, dedicated account manager, tech + brick-and-mortar, portal visibility, property prep, MLS distribution, structured screening, rent protection.
**Why it happens:** Service page template renders generic content from CMS without explicitly including messaging blocks.
**How to avoid:** OWN-05 messaging should be rendered via BenefitsBlock or dedicated section on every owner-facing service page. This is content that must be in the CMS data.
**Warning signs:** Reading a service page and not seeing any of the 9 required messaging points.

## Code Examples

### Homepage Template Composition (TMPL-01)

```typescript
// src/app/page.tsx
// Source: Phase 1 block components + Phase 2 composition pattern
export default async function HomePage() {
  const [services, cities] = await Promise.all([
    sanityFetch<ServiceCardData[]>({ query: ALL_SERVICES_QUERY, tags: ['service'] }),
    sanityFetch<CityCardData[]>({ query: FEATURED_CITIES_QUERY, tags: ['city'] }),
  ])

  return (
    <>
      <JsonLd data={buildOrganizationSchema({
        name: 'MoveSmart Rentals',
        url: 'https://movesmartrentals.com',
        logo: 'https://movesmartrentals.com/logo.png',
        description: 'Professional property management services across Ontario and the US.',
      })} />

      <HeroBlock
        headline="Professional Property Management, Zero Upfront Cost"
        subheadline="Full-service tenant placement, screening, and rent protection for Ontario landlords"
        cta1={{ label: 'Create Free Account', href: '/contact/' }}
        cta2={{ label: 'Learn More', href: '/owners/' }}
        priority={true}
      />

      <PainPointBlock painPoints={[
        { problem: 'Vacant units costing you thousands', solution: 'We fill vacancies fast with targeted marketing and MLS distribution' },
        { problem: 'Unreliable tenants and missed rent', solution: 'Structured screening and rent guarantee protect your income' },
        // ... more pain points
      ]} />

      <ServiceGridBlock services={services} columns={4} />

      {/* Portal / Technology section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Your Property Management Portal</h2>
        <p>Self-serve online account, dedicated account manager, tech-enabled brick-and-mortar service.</p>
      </section>

      {/* Tenant journey section */}
      <HowItWorksBlock steps={[
        { stepNumber: 1, title: 'Browse Listings', description: 'Search verified rentals by city and property type' },
        { stepNumber: 2, title: 'Apply Online', description: 'Submit your application through our secure portal' },
        { stepNumber: 3, title: 'Move In', description: 'Sign your lease and get your keys' },
      ]} title="How Renting Works" />

      <CityGridBlock cities={cities} columns={4} />

      {/* Franchising preview */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Expand with MoveSmart</h2>
          <p className="mt-4">Franchise opportunities across Canada and the US</p>
        </div>
      </section>

      <FAQBlock questions={[...]} title="Frequently Asked Questions" />

      <CTABannerBlock
        headline="Ready to Protect Your Rental Income?"
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </>
  )
}
```

### Contact Form with react-hook-form + zod (TMPL-10)

```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['owner', 'tenant', 'franchise', 'other']),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Submit to API route or external service
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields with error handling */}
    </form>
  )
}
```

### Enhanced 404 Page (SEO-08)

```typescript
// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Link href="/" className="rounded-lg border p-6 hover:bg-gray-50">
          <h2 className="font-semibold">Homepage</h2>
          <p className="text-sm text-muted-foreground">Start from the beginning</p>
        </Link>
        <Link href="/owners/" className="rounded-lg border p-6 hover:bg-gray-50">
          <h2 className="font-semibold">Property Owners</h2>
          <p className="text-sm text-muted-foreground">Management services</p>
        </Link>
        <Link href="/tenants/" className="rounded-lg border p-6 hover:bg-gray-50">
          <h2 className="font-semibold">Tenants</h2>
          <p className="text-sm text-muted-foreground">Find your next rental</p>
        </Link>
      </div>
    </main>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-sitemap npm package | Built-in `sitemap.ts` + `generateSitemaps()` | Next.js 13.3+ | No external dependency needed |
| Manual `<meta>` tags | `generateMetadata()` + Metadata API | Next.js 13.2+ | Automatic dedup, template inheritance, type safety |
| react-helmet for schema markup | `<script type="application/ld+json">` in Server Components | React 19 / RSC | No client-side overhead, SSR-native |
| next/head for page metadata | App Router `generateMetadata` export | Next.js 13+ | Co-located with data fetching, async support |
| `getStaticPaths` + `getStaticProps` | `generateStaticParams` + async Server Components | Next.js 13+ | Simpler, no data re-fetch needed |
| `{ id: Promise<string> }` sitemap params | `{ id: string }` (Next.js 15) | v15 vs v16 | **Project uses v15 -- id is NOT a promise** |

## Open Questions

1. **Sanity Image URL Helper**
   - What we know: Images are stored as `SanityImage` with `asset._ref`. Block components accept `backgroundImageUrl` as a string URL.
   - What is unclear: Whether a `urlForImage()` helper exists in the project or needs to be created using `@sanity/image-url`.
   - Recommendation: Check if `@sanity/image-url` is installed. If not, add it and create a `urlForImage()` helper in `src/lib/sanity-image.ts`. This is needed for Portable Text image rendering and hero image URLs.

2. **CMS Content for 20 Ontario Cities**
   - What we know: CityService schema enforces required local content fields. Templates will render whatever data exists.
   - What is unclear: How to populate 20 cities x 8 services = 160 CityService documents without a bulk import tool.
   - Recommendation: Create a Sanity CLI script or use Sanity's mutation API to seed initial documents programmatically. This is faster than manual Studio entry. Data (median rents, vacancy rates, neighbourhood names) is publicly available from CMHC and Statistics Canada.

3. **Property Listings Data Source**
   - What we know: PropertyListing schema exists in CMS. PropertyCardBlock renders listing cards.
   - What is unclear: Whether real listing data exists or if placeholder/sample data should be used.
   - Recommendation: Seed 3-5 sample property listings per top city (Toronto, Mississauga, Ottawa) for template validation. Real listing data is a Phase 3+ concern.

4. **BreadcrumbNav Component Props**
   - What we know: BreadcrumbNav exists and renders BreadcrumbList JSON-LD. It accepts a `crumbs` array.
   - What is unclear: The exact prop shape (is it `{ label, href }` or `{ name, url }`?).
   - Recommendation: Read the component source before implementing templates to match its exact interface.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual verification (no automated test framework in project) |
| Config file | None |
| Quick run command | `npm run build` (type checking + build verification) |
| Full suite command | `npm run build && npm run start` (build + serve for manual testing) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TMPL-01 | Homepage renders all 9 contract sections | manual | `curl -s http://localhost:3000/ \| grep -c '<section'` | N/A |
| TMPL-16 | CityService page renders with all blocks and JSON-LD | manual | `curl -s http://localhost:3000/ca/ontario/toronto/tenant-placement/ \| grep 'application/ld+json'` | N/A |
| SEO-02 | Sitemap returns segmented XML | smoke | `curl -s http://localhost:3000/sitemap.xml` | Wave 0 |
| SEO-06 | Meta title length 50-60 chars | manual | Inspect page source for `<title>` tag length | N/A |
| SEO-08 | 404 page renders for missing routes | smoke | `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/nonexistent/` | N/A |
| SCHEMA-01 | Organization schema on homepage | smoke | `curl -s http://localhost:3000/ \| grep 'Organization'` | N/A |
| SCHEMA-02 | LocalBusiness schema on city pages | smoke | `curl -s http://localhost:3000/ca/ontario/toronto/ \| grep 'LocalBusiness'` | N/A |
| TEN-05 | Listings in crawlable HTML | smoke | `curl -s http://localhost:3000/ca/ontario/toronto/apartments-for-rent/ \| grep 'PropertyCard'` | N/A |
| AI-01 | Direct answer in first paragraph | manual | Read page source for first `<p>` content quality | N/A |

### Sampling Rate

- **Per task commit:** `npm run build` (catches TypeScript errors and build failures)
- **Per wave merge:** Full build + manual inspection of key pages
- **Phase gate:** Build succeeds, all 23 template routes render, Rich Results Test passes for at least 3 page types

### Wave 0 Gaps

- [ ] No automated test framework -- build verification is the only automated check
- [ ] Consider adding a simple smoke test script that curls key URLs and checks for expected content markers

## Sources

### Primary (HIGH confidence)
- [Next.js 15 generateSitemaps API](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) -- sitemap segmentation pattern, id parameter type (string in v15, Promise in v16)
- [Next.js 15 sitemap.ts file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) -- MetadataRoute.Sitemap type, changeFrequency, priority fields
- [Next.js 15 not-found.tsx](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) -- 404 handling in App Router
- [@portabletext/react](https://www.npmjs.com/package/@portabletext/react) -- Portable Text rendering, custom components API
- Phase 1 codebase (direct file inspection) -- all existing components, schemas, queries, utilities

### Secondary (MEDIUM confidence)
- [GitHub issue #85632](https://github.com/vercel/next.js/issues/85632) -- Confirms id type change from string to Promise in Next.js 16, verifying Next.js 15 uses string
- [Sanity Portable Text to React docs](https://www.sanity.io/docs/portable-text-to-react) -- Custom component patterns for PortableText

### Tertiary (LOW confidence)
- None -- all findings verified against official docs or direct codebase inspection

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed and verified in Phase 1
- Architecture: HIGH -- all patterns derive from Phase 1 established patterns (sanityFetch, generatePageMetadata, JsonLd, block components)
- Sitemap: HIGH -- verified against official Next.js docs with version-specific id type confirmed
- Pitfalls: HIGH -- all pitfalls identified from Phase 1 research (PITFALLS.md) and direct codebase analysis
- Content seeding: MEDIUM -- the CMS schema enforcement is verified but the data population strategy (CMHC data, bulk import) needs validation during execution

**Research date:** 2026-03-28
**Valid until:** 2026-04-10 (Phase 2 deadline)
