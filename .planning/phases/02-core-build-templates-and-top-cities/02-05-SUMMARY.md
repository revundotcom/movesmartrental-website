---
phase: 02-core-build-templates-and-top-cities
plan: 05
subsystem: ui
tags: [nextjs, templates, tenant-pages, property-listings, json-ld, server-components, seo]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: Block components (HeroBlock, PropertyCardBlock, CityGridBlock, FAQBlock, CTABannerBlock, HowItWorksBlock), BreadcrumbNav, JsonLd, sanityFetch, generatePageMetadata
  - phase: 02-core-build-templates-and-top-cities
    provides: GROQ queries (property-category, property-listing, homepage), PortableTextBody, route skeletons
provides:
  - Tenants hub page at /tenants/ with city grid, property type cards, how-it-works, FAQ
  - Property category template at /ca/[province]/[city]/[service]/ with server-rendered listings
  - Bedroom count template at /ca/[province]/[city]/[service]/[bedroom]/ with bedroom filter
  - Property detail template at /ca/[province]/[city]/rentals/[slug]/ with RealEstateListing JSON-LD
affects: [02-06, 02-10]

# Tech tracking
tech-stack:
  added: []
  patterns: [bedroom slug parsing regex, Sanity image URL from asset _ref in page template, property detail sidebar with sticky positioning]

key-files:
  created: []
  modified:
    - src/app/(site)/tenants/page.tsx
    - src/app/(site)/ca/[province]/[city]/[service]/page.tsx
    - src/app/(site)/ca/[province]/[city]/[service]/[bedroom]/page.tsx
    - src/app/(site)/ca/[province]/[city]/rentals/[slug]/page.tsx

key-decisions:
  - "Property category template placed in [service]/page.tsx per 02-02 resolution -- Next.js shares [service] segment for both services and property types"
  - "Bedroom slug parsed via regex (e.g. '1-bedroom' -> 1) with notFound() for invalid formats"
  - "Property detail uses Sanity image URL construction from asset _ref (same pattern as PortableTextBody)"

patterns-established:
  - "Tenant-facing templates are pure Server Components with zero 'use client' directives (TEN-05)"
  - "PropertyCardBlock renders in page-level server component for crawlable HTML listings"
  - "Property detail sidebar uses sticky positioning for Apply/Book CTAs"

requirements-completed: [TMPL-03, TMPL-22, TMPL-23, TEN-01, TEN-02, TEN-03, TEN-05, SCHEMA-07]

# Metrics
duration: 5min
completed: 2026-03-28
---

# Phase 02 Plan 05: Tenant Hub, Property Category, Bedroom, and Property Detail Templates Summary

**4 tenant-facing page templates with server-rendered HTML listings, bedroom filtering, and RealEstateListing JSON-LD structured data**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-28T15:21:53Z
- **Completed:** 2026-03-28T15:26:58Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Built Tenants hub page with hero, property type cards (4 types with Lucide icons), CityGridBlock for featured cities, HowItWorks tenant journey (4 steps), tenant-specific FAQ (4 questions), and CTA banner
- Built property category template with generateStaticParams, server-rendered PropertyCardBlock listings (TEN-05), bedroom filter links, Portable Text category description, and BreadcrumbNav
- Built bedroom count template parsing slug format ("1-bedroom" -> 1) with BEDROOM_COUNT_QUERY, notFound() for invalid slugs, back-link to category page
- Built property detail template with RealEstateListing JSON-LD (SCHEMA-07), image gallery with priority LCP image, listing details header, property sidebar with Apply/Book CTAs, and Portable Text description

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Tenants hub and Property category templates** - `1880942` (feat)
2. **Task 2: Build Property detail template with RealEstateListing JSON-LD** - `876e084` (feat)

## Files Created/Modified
- `src/app/(site)/tenants/page.tsx` - Tenants hub with hero, property type cards, CityGridBlock, HowItWorks, FAQ, CTA
- `src/app/(site)/ca/[province]/[city]/[service]/page.tsx` - Property category with server-rendered listings, bedroom filter links
- `src/app/(site)/ca/[province]/[city]/[service]/[bedroom]/page.tsx` - Bedroom count filter with parsed slug and notFound() guard
- `src/app/(site)/ca/[province]/[city]/rentals/[slug]/page.tsx` - Property detail with JSON-LD, image gallery, sidebar CTAs

## Decisions Made
- **Property category in [service] segment:** Per 02-02 resolution, property type pages (apartments-for-rent, condos, etc.) share the `[service]` dynamic segment since Next.js does not allow different parameter names at the same directory level. The property category template replaces the existing skeleton in `[service]/page.tsx`.
- **Bedroom slug parsing:** Used regex `/^(\d+)-bedroom$/` to extract bedroom count from slug, returning `notFound()` for invalid formats (security guard against arbitrary input).
- **Sanity image URL in detail page:** Replicated the image URL construction pattern from `PortableTextBody` directly in the property detail template for image gallery rendering.

## Deviations from Plan

None - plan executed exactly as written. The `[propertyType]` to `[service]` mapping was pre-resolved in Plan 02-02.

## Issues Encountered
- Pre-existing TypeScript error in `src/app/(site)/ca/[province]/[city]/page.tsx` (from a different plan) -- not caused by Plan 05 changes, out of scope.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 4 tenant-facing templates are live and ready for CMS content population (Plan 02-10)
- Property category and bedroom pages ready to display listings once propertyCategory and propertyListing documents are created in Sanity
- Property detail page ready for RealEstateListing JSON-LD validation via Google Rich Results Test
- The `[service]/page.tsx` now serves property category data; Plan 02-04/02-06 will need to handle CityService data differentiation in this same route

## Self-Check: PASSED

- All 4 files found on disk
- Both commit hashes verified (1880942, 876e084)
- TypeScript compilation clean for all Plan 05 files (pre-existing error in unrelated file only)

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
