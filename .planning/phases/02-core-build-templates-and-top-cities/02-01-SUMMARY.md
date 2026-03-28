---
phase: 02-core-build-templates-and-top-cities
plan: 01
subsystem: api
tags: [groq, sanity, portable-text, next-sanity, queries, cms]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: Sanity schemas, client, fetch utility, TypeScript types (sanity.ts, blocks.ts)
provides:
  - 8 GROQ query files for all Phase 2 page templates (homepage, province, property-category, property-listing, blog-guide, comparison, case-study, faq)
  - Shared PortableTextBody component for CMS body content rendering
  - portableTextComponents config for template-level customization
affects: [02-02, 02-03, 02-04, 02-05, 02-06, 02-07, 02-08, 02-09, 02-10]

# Tech tracking
tech-stack:
  added: []
  patterns: [groq tagged template literal with reference resolution, Sanity CDN image URL from asset ref, PortableText Server Component]

key-files:
  created:
    - src/sanity/queries/homepage.ts
    - src/sanity/queries/province.ts
    - src/sanity/queries/property-category.ts
    - src/sanity/queries/property-listing.ts
    - src/sanity/queries/blog-guide.ts
    - src/sanity/queries/comparison.ts
    - src/sanity/queries/case-study.ts
    - src/sanity/queries/faq.ts
    - src/components/portable-text.tsx
  modified: []

key-decisions:
  - "Sanity image URL built from asset _ref without @sanity/image-url package (zero added deps)"
  - "Blog/guide list query uses GROQ select() for optional category filtering in a single query"
  - "Aggregated FAQ query uses GROQ spread operator to flatten FAQ items from services and cityServices into a single array"
  - "PortableTextBody is a Server Component (no use client) since @portabletext/react supports RSC"

patterns-established:
  - "GROQ queries project to CardData shapes (ServiceCardData, CityCardData, PropertyCardData) for block components"
  - "Reference resolution with -> for slugs and nested province/city data in all page queries"
  - "Params queries for generateStaticParams return minimal {slug, citySlug, provinceSlug} shapes"

requirements-completed: [TMPL-16, SCHEMA-06]

# Metrics
duration: 2min
completed: 2026-03-28
---

# Phase 2 Plan 01: GROQ Queries and Portable Text Summary

**8 GROQ query files covering all Phase 2 page templates plus a shared Portable Text component with custom renderers for images, links, headings, lists, and blockquotes**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-28T15:11:09Z
- **Completed:** 2026-03-28T15:13:42Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Created 8 GROQ query files covering homepage, province, property-category, property-listing, blog-guide, comparison, case-study, and FAQ aggregation
- Every query resolves references with -> syntax for slugs, province data, and city data
- Created shared PortableTextBody component with custom renderers for all block types (images, internal/external links, headings, blockquotes, bullet/numbered lists)
- Sanity image URL construction from asset _ref without adding @sanity/image-url dependency

## Task Commits

Each task was committed atomically:

1. **Task 1: Create all 8 GROQ query files** - `61ee245` (feat)
2. **Task 2: Create shared Portable Text rendering component** - `8919afa` (feat)

## Files Created/Modified
- `src/sanity/queries/homepage.ts` - Homepage aggregation (featured services, tier-1 cities, stats)
- `src/sanity/queries/province.ts` - Province page, list, and cities queries
- `src/sanity/queries/property-category.ts` - Category page, params, and bedroom filter queries
- `src/sanity/queries/property-listing.ts` - Listing page, by-category, and params queries
- `src/sanity/queries/blog-guide.ts` - Blog/guide page and list with optional category filter
- `src/sanity/queries/comparison.ts` - Comparison page and list queries
- `src/sanity/queries/case-study.ts` - Case study page and list queries
- `src/sanity/queries/faq.ts` - Aggregated FAQ from services and cityServices
- `src/components/portable-text.tsx` - Shared PortableText renderer with custom components

## Decisions Made
- Built Sanity image URLs from asset `_ref` using manual string parsing instead of adding `@sanity/image-url` package -- keeps zero new dependencies
- Blog/guide list query uses GROQ `select()` for optional category filtering within a single query rather than two separate queries
- Aggregated FAQ query uses GROQ spread operator `...` to flatten FAQ items from services and cityServices into a unified array
- PortableTextBody is a Server Component (no `use client`) since `@portabletext/react` supports React Server Components

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 8 query files ready to be consumed by Wave 2 template plans (02-02 through 02-10)
- PortableTextBody component ready for any template that renders CMS body content
- All queries follow established patterns from Phase 1 (groq tagged literal, reference resolution, field projection)

## Self-Check: PASSED

- All 9 files found on disk
- Both commit hashes verified (61ee245, 8919afa)
- TypeScript compilation clean (npx tsc --noEmit)

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
