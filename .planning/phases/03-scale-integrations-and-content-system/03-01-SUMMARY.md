---
phase: 03-scale-integrations-and-content-system
plan: 01
subsystem: ui
tags: [next.js, server-components, sanity, cms, seeding, groq, sitemap, geographic-hubs]

# Dependency graph
requires:
  - phase: 02-core-build-templates-and-top-cities
    provides: Province/City schemas, GROQ queries, block components, sitemap infrastructure, Ontario seeding pattern
provides:
  - "/ca/ Canada country hub page with province card listing"
  - "/us/ US country hub page with state card listing"
  - "COUNTRY_PROVINCES_QUERY for country-filtered province data"
  - "4 Canadian province CMS documents (Quebec, BC, Alberta, Nova Scotia)"
  - "17 Tier-2 city CMS documents across 4 provinces"
  - "/ca/ and /us/ URLs in XML sitemap static segment"
affects: [03-02, 03-03, 03-04]

# Tech tracking
tech-stack:
  added: []
  patterns: [country-hub-pattern, province-seeding-per-country]

key-files:
  created:
    - src/app/(site)/ca/page.tsx
    - src/app/(site)/us/page.tsx
    - scripts/seed-canadian-provinces.ts
  modified:
    - src/sanity/queries/province.ts
    - src/app/sitemap.ts

key-decisions:
  - "Country hub pages use hardcoded intro sections (not CMS) since they are thin geographic entry points"
  - "US hub page uses same COUNTRY_PROVINCES_QUERY with country='us' param for symmetry with Canada"
  - "Seed script creates Tier-2 cities (not Tier-1) since these are secondary market cities outside Ontario"

patterns-established:
  - "Country hub pattern: Server Component fetching provinces by country param, rendering as linked cards with city counts"
  - "Province seeding per country: separate scripts per geographic expansion, deterministic IDs, batched transactions"

requirements-completed: [GEO-01, GEO-02, GEO-03]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 3 Plan 01: Country Hub Pages and Canadian Province Seeding Summary

**Canada and US country hub pages with GROQ-powered province/state listings, plus seeding script for 4 Canadian provinces and 17 Tier-2 cities with unique localized content**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T15:59:49Z
- **Completed:** 2026-03-28T16:04:34Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Created /ca/ Canada country hub page (146 lines) with breadcrumbs, hero, intro section, province card listing with city counts, and CTA
- Created /us/ US country hub page (147 lines) with identical pattern for US state listings, US-specific messaging about market expansion
- Added COUNTRY_PROVINCES_QUERY to province.ts for country-filtered province fetching with city count aggregation
- Added /ca/ and /us/ URLs to sitemap static segment with priority 0.8
- Created seed script (502 lines) for 4 provinces (Quebec, BC, Alberta, Nova Scotia) and 17 cities with genuinely unique descriptions covering local rental markets, regulations, and demographics

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /ca/ and /us/ country hub pages** - `459b83f` (feat)
2. **Task 2: Seed 4 new Canadian provinces with CMS content** - `62ef852` (feat)

## Files Created/Modified
- `src/app/(site)/ca/page.tsx` - Canada country hub with province card listing (146 lines)
- `src/app/(site)/us/page.tsx` - US country hub with state card listing (147 lines)
- `src/sanity/queries/province.ts` - Added COUNTRY_PROVINCES_QUERY for country-filtered province data
- `src/app/sitemap.ts` - Added /ca/ and /us/ to static sitemap segment
- `scripts/seed-canadian-provinces.ts` - Seeds 4 provinces + 17 cities with unique content (502 lines)

## Decisions Made
- Country hub pages use hardcoded intro sections rather than CMS content because they are thin geographic entry points that frame the province/state listings -- not content-rich pages requiring editorial control
- US hub page reuses the same COUNTRY_PROVINCES_QUERY with `country='us'` parameter, maintaining architectural symmetry with the Canada hub
- New provinces' cities are seeded as Tier 2 (not Tier 1) since they are secondary market cities outside the initial Ontario launch focus
- City counts per province: Quebec 5, BC 5, Alberta 4, Nova Scotia 3 -- matching the plan's specified cities

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

**SANITY_API_WRITE_TOKEN required before running the seeding script.** The token should already exist from Phase 2 seeding. To run:
```bash
npx tsx scripts/seed-canadian-provinces.ts
```

## Next Phase Readiness
- Country hub pages ready for production -- /ca/ and /us/ both render CMS data
- 4 province documents and 17 city documents ready to seed when script is run
- Province pages will immediately display city listings once seeding is complete
- Pattern established for Plan 03-02 (US state seeding with 10 states and 37 cities)
- Sitemap includes country hub URLs for search engine discovery

## Self-Check: PASSED

- All 6 files found on disk
- Both commit hashes verified (459b83f, 62ef852)
- Line counts: ca/page.tsx 146 (min 80), us/page.tsx 147 (min 80), seed script 502 (min 100)
- TypeScript compilation clean (npx tsc --noEmit --skipLibCheck)

---
*Phase: 03-scale-integrations-and-content-system*
*Completed: 2026-03-28*
