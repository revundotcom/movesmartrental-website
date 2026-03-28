---
phase: 03-scale-integrations-and-content-system
plan: 02
subsystem: geo
tags: [sanity, seeding, us-states, sitemap, groq, next-app-router]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: Province/City CMS schemas, sanityFetch, GROQ query patterns
  - phase: 02-core-build-templates-and-top-cities
    provides: Canadian province/city/service page templates, sitemap segments, seed-ontario-cities pattern
provides:
  - 10 US state Province documents with unique landlord-tenant law content
  - 37 US city documents with real neighbourhood, population, rent, vacancy data
  - Full US state/city/service page templates matching Canadian pattern
  - US sitemap segments (us-cities, us-services)
affects: [03-03, 03-04, phase-4]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "State-abbreviation-prefixed city IDs for cross-country uniqueness (city-fl-miami)"
    - "Country-filtered GROQ queries in sitemap to separate CA and US segments"
    - "Coming Soon fallback pattern for US service pages without CityService data"
    - "USD currency formatting (en-US locale) for US city pages"

key-files:
  created:
    - scripts/seed-us-states.ts
  modified:
    - src/app/(site)/us/[state]/page.tsx
    - src/app/(site)/us/[state]/[city]/page.tsx
    - src/app/(site)/us/[state]/[city]/[service]/page.tsx
    - src/app/sitemap.ts

key-decisions:
  - "City IDs use state abbreviation prefix (city-fl-miami) to avoid slug collisions with Canadian cities"
  - "US cities seeded as Tier 2 (not Tier 1) since US market is expansion, not core"
  - "No CityService documents seeded for US -- services not yet active in US market"
  - "US city pages use USD formatting (en-US) instead of CAD formatting (en-CA)"
  - "Sitemap CA queries now explicitly filter by country='ca' to prevent US data leaking into CA segments"
  - "US service pages show Coming Soon fallback with link back to city hub when no CityService data exists"

patterns-established:
  - "US page templates mirror Canadian templates but use /us/ path prefix and 'United States' breadcrumb label"
  - "State-specific content differentiation based on landlord-tenant law (FL no rent control, CA AB 1482, TX landlord-friendly)"

requirements-completed: [GEO-04, GEO-08]

# Metrics
duration: 7min
completed: 2026-03-28
---

# Phase 3 Plan 2: US State Seeding and Page Template Enhancement Summary

**10 US states with 37 cities seeded via deterministic script, stub pages upgraded to full CMS-driven templates with local data and sitemap coverage**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-28T15:59:58Z
- **Completed:** 2026-03-28T16:07:21Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Created seeding script for 10 US states (FL, TX, CA, NY, IL, GA, NC, AZ, CO, NJ) with 37 cities total, each with unique state-specific landlord-tenant law content
- Upgraded US state/city/service page stubs from `<h1>` placeholders to full CMS-driven templates matching Canadian page patterns (BreadcrumbNav, HeroBlock, CityGridBlock, local data, JSON-LD)
- Added us-cities and us-services sitemap segments with country-filtered GROQ queries
- Fixed existing CA sitemap queries to filter by country='ca' preventing future data leakage

## Task Commits

Each task was committed atomically:

1. **Task 1: Create US state seeding script with 10 states and city databases** - `975c440` (feat)
2. **Task 2: Enhance US page templates from stubs to full functional pages** - `a6b6afa` (feat)

## Files Created/Modified
- `scripts/seed-us-states.ts` - 729-line seeding script for 10 US states with 37 cities, deterministic IDs, batched createOrReplace
- `src/app/(site)/us/[state]/page.tsx` - Full state page with PROVINCE_PAGE_QUERY, CityGridBlock, breadcrumbs (176 lines)
- `src/app/(site)/us/[state]/[city]/page.tsx` - Full city hub with local data section, LocalBusiness JSON-LD, services grid (315 lines)
- `src/app/(site)/us/[state]/[city]/[service]/page.tsx` - CityService dispatch with Coming Soon fallback for unactivated services (293 lines)
- `src/app/sitemap.ts` - Added us-cities/us-services segments, country-filtered CA GROQ queries

## Decisions Made
- City IDs use state abbreviation prefix (city-fl-miami) to avoid slug collisions with Canadian cities of the same name
- US cities seeded as Tier 2 since US market is expansion territory, not core
- No CityService junction documents seeded -- services will be activated in future phase
- US city pages format currency as USD (en-US locale) rather than CAD
- Existing CA sitemap queries updated to explicitly filter country='ca'
- US service pages render a Coming Soon placeholder with city hub link when no CityService data exists

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Country-filtered CA sitemap queries**
- **Found during:** Task 2 (sitemap update)
- **Issue:** Existing SITEMAP_CITIES_QUERY and SITEMAP_PROVINCES_QUERY had no country filter, meaning US states/cities would leak into the ca-cities sitemap segment after seeding
- **Fix:** Renamed to SITEMAP_CA_CITIES_QUERY, SITEMAP_CA_PROVINCES_QUERY, SITEMAP_CA_CITY_SERVICES_QUERY with `country == "ca"` filter
- **Files modified:** src/app/sitemap.ts
- **Verification:** TypeScript compiles cleanly
- **Committed in:** a6b6afa (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential fix for correct sitemap segmentation. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required. The seeding script requires SANITY_API_WRITE_TOKEN which is already configured from Phase 2.

## Next Phase Readiness
- US state and city page templates are live and ready to render CMS content once seeding script is run
- Seeding script is idempotent and can be safely re-run
- US service pages gracefully handle missing CityService data with Coming Soon fallback
- Sitemap correctly segments US and CA geographic URLs

## Self-Check: PASSED

All 6 files verified present. Both task commits (975c440, a6b6afa) verified in git log.

---
*Phase: 03-scale-integrations-and-content-system*
*Completed: 2026-03-28*
