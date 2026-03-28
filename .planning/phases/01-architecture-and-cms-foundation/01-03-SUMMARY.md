---
phase: 01-architecture-and-cms-foundation
plan: 03
subsystem: cms
tags: [sanity, groq, isr, revalidation, seo, json-ld, metadata, schema-org, webhook]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js 15.2.4 scaffold with route hierarchy and env vars
  - phase: 01-02
    provides: 9 Sanity CMS schemas, schema registry, TypeScript interfaces
provides:
  - Sanity client with CDN toggling (src/sanity/client.ts)
  - sanityFetch() wrapper with tag-based ISR revalidation (src/sanity/fetch.ts)
  - Sanity Studio embedded at /studio route
  - Webhook endpoint for ISR revalidation at /api/revalidate
  - GROQ query library for navigation, city, service, and city-service data
  - generatePageMetadata() helper for canonical tags and OG fields
  - 7 JSON-LD schema builder functions (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Article, RealEstateListing)
  - JsonLd React component for safe structured data injection
affects: [01-04, 01-05, 01-06, 02-content, page-templates, seo-implementation]

# Tech tracking
tech-stack:
  added: [next-sanity/webhook, next-sanity/studio, "@sanity/vision", groq]
  patterns: [tag-based-isr, sanity-fetch-wrapper, json-ld-builders, webhook-revalidation, canonical-trailing-slash]

key-files:
  created:
    - src/sanity/client.ts
    - src/sanity/fetch.ts
    - src/sanity/sanity.config.ts
    - src/app/studio/[[...tool]]/page.tsx
    - src/app/studio/[[...tool]]/layout.tsx
    - src/app/api/revalidate/route.ts
    - src/sanity/queries/navigation.ts
    - src/sanity/queries/city.ts
    - src/sanity/queries/service.ts
    - src/sanity/queries/city-service.ts
    - src/lib/metadata.ts
    - src/lib/schema-builders/organization.ts
    - src/lib/schema-builders/local-business.ts
    - src/lib/schema-builders/service-schema.ts
    - src/lib/schema-builders/faq-page.ts
    - src/lib/schema-builders/breadcrumb-list.ts
    - src/lib/schema-builders/article.ts
    - src/lib/schema-builders/real-estate-listing.ts
    - src/lib/schema-builders/index.ts
    - src/components/json-ld.tsx
  modified:
    - src/lib/utils.ts

key-decisions:
  - "sanityFetch() is the ONLY function that queries the Content Lake from page components"
  - "Sanity Studio layout overrides root layout for full-screen embed without site nav/footer"
  - "CityService GROQ queries filter by city+service+province slugs for geographic disambiguation"
  - "JSON-LD sanitization escapes < as \\u003c to prevent XSS via script injection"

patterns-established:
  - "All CMS data access goes through sanityFetch() with revalidation tags matching _type names"
  - "GROQ queries are organized per-entity in src/sanity/queries/ with named exports"
  - "generatePageMetadata() ensures trailing-slash canonical URLs and OG fields from seo data"
  - "JSON-LD builders are pure functions returning plain objects, rendered via JsonLd component"

requirements-completed: [FOUND-06, SEO-04, SEO-05]

# Metrics
duration: 9min
completed: 2026-03-28
---

# Phase 1 Plan 03: Sanity Data Pipeline and SEO Metadata Summary

**Sanity fetch wrapper with tag-based ISR, webhook revalidation endpoint, embedded Studio, GROQ query library, and 7 JSON-LD schema builders for search engine structured data**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-28T13:52:49Z
- **Completed:** 2026-03-28T14:02:13Z
- **Tasks:** 2
- **Files modified:** 21

## Accomplishments
- Built the complete Sanity data pipeline: client with CDN toggling, centralized sanityFetch() wrapper with tag-based ISR revalidation, and webhook endpoint that validates HMAC signatures and calls revalidateTag()
- Embedded Sanity Studio at /studio with full-screen layout override, configured with all 12 schema types from plan 01-02
- Created GROQ query library covering navigation (nav menu + footer cities), city pages, service pages, and city-service junction pages with full reference resolution
- Implemented generatePageMetadata() helper producing consistent canonical tags (trailing slash) and Open Graph fields from CMS seo data
- Built 7 JSON-LD schema builder functions for Organization, LocalBusiness/RealEstateAgent, Service, FAQPage, BreadcrumbList, Article/BlogPosting, and RealEstateListing
- Created JsonLd React component with XSS-safe serialization via sanitizeJsonLd()

## Task Commits

Each task was committed atomically:

1. **Task 1: Sanity client, fetch wrapper, Studio embed, and revalidation webhook** - `c14faa9` (feat)
2. **Task 2: SEO metadata helper and JSON-LD schema builders** - `b60ebc9` (feat)

## Files Created/Modified
- `src/sanity/client.ts` - Sanity client with CDN toggling based on NODE_ENV
- `src/sanity/fetch.ts` - Centralized sanityFetch() wrapper with tag-based ISR revalidation
- `src/sanity/sanity.config.ts` - Sanity Studio configuration with all 12 schema types
- `src/app/studio/[[...tool]]/page.tsx` - Embedded Sanity Studio page (client component)
- `src/app/studio/[[...tool]]/layout.tsx` - Studio layout overriding root layout for full-screen rendering
- `src/app/api/revalidate/route.ts` - Webhook POST handler validating HMAC signature and calling revalidateTag()
- `src/sanity/queries/navigation.ts` - NAV_QUERY and FOOTER_CITIES_QUERY for header/footer
- `src/sanity/queries/city.ts` - CITY_PAGE_QUERY and CITY_LIST_QUERY
- `src/sanity/queries/service.ts` - SERVICE_PAGE_QUERY and SERVICE_LIST_QUERY
- `src/sanity/queries/city-service.ts` - CITY_SERVICE_PAGE_QUERY, CITY_SERVICE_SEO_QUERY, CITY_SERVICE_PARAMS_QUERY
- `src/lib/metadata.ts` - generatePageMetadata() for canonical tags and OG fields
- `src/lib/schema-builders/organization.ts` - Organization JSON-LD builder
- `src/lib/schema-builders/local-business.ts` - LocalBusiness + RealEstateAgent JSON-LD builder
- `src/lib/schema-builders/service-schema.ts` - Service JSON-LD builder
- `src/lib/schema-builders/faq-page.ts` - FAQPage JSON-LD builder
- `src/lib/schema-builders/breadcrumb-list.ts` - BreadcrumbList JSON-LD builder
- `src/lib/schema-builders/article.ts` - Article/BlogPosting JSON-LD builder
- `src/lib/schema-builders/real-estate-listing.ts` - RealEstateListing JSON-LD builder
- `src/lib/schema-builders/index.ts` - Barrel export of all 7 JSON-LD builders
- `src/components/json-ld.tsx` - JsonLd component with XSS-safe serialization
- `src/lib/utils.ts` - Added buildCanonicalUrl() and sanitizeJsonLd() helpers

## Decisions Made
- **sanityFetch() as single data access point:** All CMS queries must go through sanityFetch() to ensure consistent tag-based revalidation. Direct client.fetch() calls would bypass ISR cache invalidation.
- **Studio layout overrides root layout:** The /studio route uses its own `<html>` and `<body>` tags to render Sanity Studio full-screen without site header/footer interference.
- **CityService query triple-slug filtering:** CITY_SERVICE_PAGE_QUERY filters by city slug + service slug + province slug simultaneously to handle cities with the same name in different provinces (e.g., London, ON vs London, UK).
- **JSON-LD XSS prevention:** sanitizeJsonLd() escapes `<` as `\u003c` in serialized JSON to prevent script injection when injected via dangerouslySetInnerHTML.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Recreated Task 2 files after parallel agent interference**
- **Found during:** Task 2 (commit attempt)
- **Issue:** Parallel plan executors (01-04, 01-05, 01-06) running concurrently modified git state, causing staged Task 2 files to be lost and utils.ts to be reverted to its original state
- **Fix:** Recreated all 11 Task 2 files (utils.ts modifications, metadata.ts, 7 schema builders, index.ts barrel, json-ld.tsx) and re-committed
- **Files modified:** All Task 2 files
- **Verification:** TypeScript compiles cleanly, git commit succeeded
- **Committed in:** b60ebc9

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** File recreation was necessary due to concurrent execution environment. No scope creep, identical output to original.

## Issues Encountered
- Parallel plan executors (01-04, 01-05, 01-06) committed changes to the same repository simultaneously, which caused git staging conflicts. Resolved by recreating and re-staging files.

## User Setup Required
None - no external service configuration required. SANITY_WEBHOOK_SECRET env var was already configured in .env.local by plan 01-01.

## Next Phase Readiness
- sanityFetch() wrapper ready for all page components to query CMS data
- GROQ queries ready for city, service, and city-service page templates
- generatePageMetadata() ready for every route's generateMetadata function
- JSON-LD builders ready for structured data injection on all page types
- Revalidation webhook ready to receive Sanity publish events for ISR cache invalidation
- Sanity Studio accessible at /studio for content editors

## Self-Check: PASSED

All 21 files verified present. Both task commits (c14faa9, b60ebc9) confirmed in git log. All 9 verification checks passed (TypeScript zero errors, useCdn, sanityFetch, POST export, NextStudio, GROQ queries, generatePageMetadata, 7 JSON-LD builders, json-ld.tsx).

---
*Phase: 01-architecture-and-cms-foundation*
*Completed: 2026-03-28*
