---
phase: 02-core-build-templates-and-top-cities
plan: 06
subsystem: ui
tags: [next.js, server-components, json-ld, seo, geographic-templates, portable-text, sanity]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: Sanity schemas, block components, schema-builders, BreadcrumbNav, JsonLd
  - phase: 02-core-build-templates-and-top-cities
    provides: GROQ queries (province, city, city-service), PortableTextBody, route skeletons
provides:
  - Province template with city listing and CityGridBlock
  - City hub template with local data display, service grid, property type cards, LocalBusiness JSON-LD
  - CityService template with 4 JSON-LD schemas, all block types, AI-01 content structure
  - generateStaticParams for all 3 geographic page types (Tier-1 pre-rendering)
  - ServiceGridBlock basePath prop for city-contextual service links
affects: [02-07, 02-08, 02-09, 02-10]

# Tech tracking
tech-stack:
  added: []
  patterns: [dispatch pattern for shared dynamic segment, parallel sanityFetch for independent data, city-contextual service linking via basePath]

key-files:
  created: []
  modified:
    - src/app/(site)/ca/[province]/page.tsx
    - src/app/(site)/ca/[province]/[city]/page.tsx
    - src/app/(site)/ca/[province]/[city]/[service]/page.tsx
    - src/components/blocks/service-grid-block.tsx
    - src/types/blocks.ts

key-decisions:
  - "CityService and PropertyCategory coexist in [service] segment via dispatch pattern (CityService checked first, PropertyCategory fallback)"
  - "ServiceGridBlock extended with basePath prop for city-context links (/ca/{province}/{city}/{service}/) instead of hardcoded /services/"
  - "Province description typed as string | any[] to handle both plain string and PortableTextBlock[] from CMS"

patterns-established:
  - "Dispatch pattern: shared dynamic segment checks multiple content types in priority order"
  - "City-contextual linking: geographic templates pass basePath to reusable blocks"
  - "Local data prominence: bg-muted rounded-lg sections with bold data values for SEO content differentiation"

requirements-completed: [TMPL-13, TMPL-14, TMPL-16, OWN-03, SCHEMA-02, SCHEMA-03, SCHEMA-04, AI-01, GEO-05, GEO-06]

# Metrics
duration: 10min
completed: 2026-03-28
---

# Phase 2 Plan 06: Geographic Page Templates Summary

**Province, City hub, and CityService templates with 4 JSON-LD schemas, prominent local data display, AI-01 content structure, and Tier-1 Ontario pre-rendering via generateStaticParams**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-28T15:19:35Z
- **Completed:** 2026-03-28T15:29:35Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Built Province template with CityGridBlock (4 columns), breadcrumbs, generateStaticParams filtered to country='ca', and notFound() guard
- Built City hub template with prominent local data section (population, median rent, vacancy rate, top neighbourhoods), available services grid with city-context links, property type navigation cards, and LocalBusiness JSON-LD
- Built CityService template -- the highest-value SEO page -- with 4 JSON-LD schemas (LocalBusiness, Service, FAQ, BreadcrumbList), all block types (PainPoints, Benefits, HowItWorks, Testimonials, FAQ), AI-01 content structure via localBody, and prominent local data display
- CityService template coexists with PropertyCategory in shared [service] segment via dispatch pattern
- generateStaticParams on CityService pre-renders Tier-1 Ontario city x service combos (~320 pages)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Province and City hub templates** - `293517e` (feat)
2. **Task 2: Build CityService template** - `2ea0e2c` (feat)

## Files Created/Modified
- `src/app/(site)/ca/[province]/page.tsx` - Province template with city listing (176 lines)
- `src/app/(site)/ca/[province]/[city]/page.tsx` - City hub template with local data, services, property types (340 lines)
- `src/app/(site)/ca/[province]/[city]/[service]/page.tsx` - CityService + PropertyCategory dispatch page (644 lines)
- `src/components/blocks/service-grid-block.tsx` - Added basePath prop for city-contextual links
- `src/types/blocks.ts` - Added basePath to ServiceGridBlockProps interface

## Decisions Made
- CityService and PropertyCategory share the [service] dynamic segment; CityService is checked first (highest priority), PropertyCategory as fallback, then notFound() -- avoids route conflicts while maintaining both page types
- ServiceGridBlock extended with optional basePath prop so city pages link to /ca/{province}/{city}/{service}/ instead of /services/{slug}/ -- enables correct geographic linking without duplicating the component
- Province description field typed as union (string | any[]) to handle both plain string and PortableTextBlock[] that might come from CMS, with runtime type checking to select the right renderer

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added basePath prop to ServiceGridBlock**
- **Found during:** Task 1 (City hub template)
- **Issue:** ServiceGridBlock hardcoded links to /services/{slug}/ which is incorrect for city-context pages that need /ca/{province}/{city}/{service}/
- **Fix:** Added optional basePath prop to ServiceGridBlockProps and ServiceGridBlock component, falling back to /services/ default
- **Files modified:** src/types/blocks.ts, src/components/blocks/service-grid-block.tsx
- **Verification:** TypeScript clean, links correctly point to geographic URLs
- **Committed in:** 293517e (Task 1 commit)

**2. [Rule 1 - Bug] Merged CityService with existing PropertyCategory in [service] segment**
- **Found during:** Task 2 (CityService template)
- **Issue:** The [service] route already contained a PropertyCategory page from Plan 02-02; overwriting it would break property type pages
- **Fix:** Created dispatch pattern: page checks CityService data first, falls back to PropertyCategory, then notFound(); both generateStaticParams and generateMetadata handle both content types
- **Files modified:** src/app/(site)/ca/[province]/[city]/[service]/page.tsx
- **Verification:** TypeScript clean, both content type flows preserved
- **Committed in:** 2ea0e2c (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 missing critical, 1 bug)
**Impact on plan:** Both auto-fixes essential for correct linking and route coexistence. No scope creep.

## Issues Encountered
- TypeScript error with `description?: unknown` type: JSX rendering of unknown-typed values caused TS2322; resolved by typing as `string | any[]` union with runtime discrimination

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 3 geographic template types ready and rendering CMS data
- CityService template produces 4 JSON-LD schemas for rich search results
- Tier-1 Ontario pre-rendering configured via generateStaticParams
- Templates consume all GROQ queries from Plan 02-01
- ServiceGridBlock basePath pattern available for any future city-context reuse

## Self-Check: PASSED

- All 5 files found on disk
- Both commit hashes verified (293517e, 2ea0e2c)
- Line counts: province 176 (min 50), city 340 (min 70), city-service 644 (min 100)
- TypeScript compilation clean (npx tsc --noEmit)

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
