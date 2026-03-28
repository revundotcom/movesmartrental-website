---
phase: 02-core-build-templates-and-top-cities
plan: 04
subsystem: ui
tags: [next-page, sanity-fetch, json-ld, breadcrumbs, owner-hub, services, locations]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: Block components (Hero, CTA, FAQ, ServiceGrid, CityGrid, PainPoint, Benefits, Trust), BreadcrumbNav, JsonLd, schema builders, Sanity fetch, TypeScript types
  - phase: 02-core-build-templates-and-top-cities
    plan: 01
    provides: GROQ queries (service, province), PortableTextBody component
provides:
  - Owners hub page with all OWN-05 messaging points
  - Services hub listing all services
  - Service detail template with CMS body, FAQ, available cities, and Service JSON-LD
  - Locations hub with province-grouped city grids
  - SERVICE_OWNER_QUERY, SERVICE_ALL_QUERY, PROVINCES_WITH_CITIES_QUERY GROQ queries
  - Enhanced SERVICE_PAGE_QUERY with availableCities sub-query
affects: [02-06, 02-10]

# Tech tracking
tech-stack:
  added: []
  patterns: [owner-audience GROQ filtering, province-grouped city rendering, Service JSON-LD on detail pages]

key-files:
  created:
    - src/app/(site)/services/page.tsx
  modified:
    - src/app/(site)/owners/page.tsx
    - src/app/(site)/services/[service]/page.tsx
    - src/app/(site)/locations/page.tsx
    - src/sanity/queries/service.ts
    - src/sanity/queries/province.ts

key-decisions:
  - "SERVICE_PAGE_QUERY enhanced with availableCities sub-query joining through cityService documents"
  - "Owner services filtered by GROQ audience field (owner or both) for targeted service grid"
  - "Locations hub uses single PROVINCES_WITH_CITIES_QUERY to fetch all provinces with nested cities in one request"
  - "Service detail page uses buildSanityImageUrl helper (same pattern as PortableText) for hero image"

patterns-established:
  - "Owner hub page uses static content for messaging points (not CMS) per contract requirements"
  - "Province-grouped city display: fetch provinces with nested cities, filter empty, render CityGridBlock per province"
  - "Service detail pages include available cities via cityService reverse-reference sub-query"

requirements-completed: [TMPL-02, TMPL-04, TMPL-05, TMPL-15, OWN-01, OWN-02, OWN-05, SCHEMA-04, SCHEMA-06]

# Metrics
duration: 6min
completed: 2026-03-28
---

# Phase 2 Plan 04: Owners Hub, Services Hub, Service Detail, and Locations Hub Summary

**Owner acquisition funnel with 9 contract messaging points, services hub listing all services, service detail with CMS body and Service JSON-LD, and locations hub with province-grouped city grids**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-28T15:22:14Z
- **Completed:** 2026-03-28T15:27:53Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Owners hub renders all 9 OWN-05 messaging points (nothing upfront, self-serve, account manager, MLS, screening, rent protection, property prep, portal visibility, tech + brick-and-mortar) plus pain points, service grid, trust stats, FAQ, and CTA
- Services hub lists all services ordered by position with breadcrumbs and CTA
- Service detail renders CMS body via PortableTextBody, service-specific FAQ, available cities via CityGridBlock, and Service JSON-LD
- Locations hub shows cities grouped by province with CityGridBlock per province and BreadcrumbNav
- Added 3 new GROQ queries (SERVICE_OWNER_QUERY, SERVICE_ALL_QUERY, PROVINCES_WITH_CITIES_QUERY) and enhanced SERVICE_PAGE_QUERY with availableCities

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Owners hub and Locations hub templates** - `2b58a24` (feat)
2. **Task 2: Build Service detail template with CMS body and JSON-LD** - Files matched existing HEAD (services pages created during parallel execution of plans 02-07), content verified correct

## Files Created/Modified
- `src/app/(site)/owners/page.tsx` - Full owner hub with 7 sections: hero, pain points, 9 benefits, service grid, trust stats, owner FAQ, CTA
- `src/app/(site)/services/page.tsx` - Services hub listing all CMS services with breadcrumbs
- `src/app/(site)/services/[service]/page.tsx` - Service detail with CMS body, FAQ, available cities, Service JSON-LD, notFound guard
- `src/app/(site)/locations/page.tsx` - Locations hub with province-grouped city grids and breadcrumbs
- `src/sanity/queries/service.ts` - Added SERVICE_OWNER_QUERY, SERVICE_ALL_QUERY, enhanced SERVICE_PAGE_QUERY with availableCities
- `src/sanity/queries/province.ts` - Added PROVINCES_WITH_CITIES_QUERY for locations hub

## Decisions Made
- Owner hub messaging is hardcoded (not CMS) because these are contract-required messaging points that must always be present regardless of CMS state
- SERVICE_PAGE_QUERY enhanced with availableCities sub-query that joins through cityService documents to find cities where each service is offered
- Locations hub uses a single PROVINCES_WITH_CITIES_QUERY to minimize API calls (one query fetches all provinces with nested cities)
- Service detail hero image uses the same buildSanityImageUrl pattern from PortableText component for consistency

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Task 2 services files were already present at HEAD from parallel plan execution (02-07 created them with identical content). Verified content matches all plan requirements. No additional commit needed for Task 2.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 4 owner-facing acquisition funnel pages complete and ready for CMS content entry
- Service detail pages will auto-populate available cities as CityService documents are created in CMS
- Locations hub will auto-populate as Province and City documents are added in Phase 2 Plan 10

## Self-Check: PASSED

- All 6 files found on disk
- Task 1 commit hash verified (2b58a24)
- TypeScript compilation: only pre-existing errors in unrelated files (ca/[province]/page.tsx, ca/[province]/[city]/page.tsx)

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
