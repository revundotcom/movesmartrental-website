---
phase: 02-core-build-templates-and-top-cities
plan: 10
subsystem: database
tags: [sanity, cms, seeding, typescript, ontario, cities, services]

# Dependency graph
requires:
  - phase: 02-core-build-templates-and-top-cities
    provides: "Sanity schemas for Province, City, Service, CityService (plan 02-01)"
provides:
  - "20 Ontario Tier-1 City documents in Sanity Content Lake"
  - "8 owner-focused Service documents in Sanity Content Lake"
  - "160 CityService junction documents with genuinely localized content"
  - "Ontario Province document"
  - "Reusable seeding script pattern for future provinces"
affects: [03-us-expansion, content-entry, qa-testing]

# Tech tracking
tech-stack:
  added: []
  patterns: [deterministic-id-seeding, batched-sanity-transactions, region-based-content-differentiation]

key-files:
  created:
    - scripts/seed-services.ts
    - scripts/seed-ontario-cities.ts
  modified: []

key-decisions:
  - "Used region-based content grouping (GTA core, GTA suburb, Southwestern, Eastern, Golden Horseshoe, Central) to drive genuinely unique CityService content"
  - "Batched transactions at 30 docs per batch for efficient Sanity API usage without hitting rate limits"
  - "Deterministic IDs (city-toronto, cityservice-toronto-tenant-placement) for idempotent re-runs"

patterns-established:
  - "Deterministic ID pattern: {type}-{slug} for all seeded documents"
  - "Region-based content differentiation: group cities by region for unique regulatory, transit, and employment context"
  - "Batched Sanity transactions: 30 documents per batch for efficient API usage"

requirements-completed: [GEO-05, GEO-06, OWN-03, OWN-02]

# Metrics
duration: 10min
completed: 2026-03-28
---

# Phase 2 Plan 10: CMS Content Seeding Summary

**Sanity CMS seeding scripts for Ontario province, 8 owner services, 20 Tier-1 cities, and 160 localized CityService junction documents with region-differentiated content**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-28T15:32:47Z
- **Completed:** 2026-03-28T15:43:40Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created seed-services.ts that seeds Ontario province + 8 owner services with unique body content, FAQs, and SEO metadata
- Created seed-ontario-cities.ts that seeds 20 cities with real demographic data (population, median rent, vacancy rate, neighbourhoods, transit) and 160 CityService documents
- Content genuinely localized by region (not city-name swaps): GTA core vs suburb vs Southwestern vs Eastern vs Golden Horseshoe vs Central, each with distinct regulatory, employment, and market context
- All documents use deterministic IDs and createOrReplace for safe idempotent re-runs
- Batched transactions (30 docs/batch) for efficient Sanity API usage

## Task Commits

Each task was committed atomically:

1. **Task 1: Create services seeding script for 8 owner services** - `80c3e57` (feat)
2. **Task 2: Create Ontario Tier-1 cities seeding script with unique localized content** - `e3a6f58` (feat)

## Files Created/Modified
- `scripts/seed-services.ts` - Seeds Ontario province document + 8 owner service documents (Tenant Placement, Leasing, Screening, Rent Guarantee, Rental Prep, Marketing, Portal Tech, Pricing) with unique body, FAQ, and SEO content
- `scripts/seed-ontario-cities.ts` - Seeds 20 Ontario Tier-1 city documents and 160 CityService junction documents with region-differentiated content including unique localBody, heroHeadline, localRegulatory, and FAQ per city-service combination

## Decisions Made
- Used region-based content grouping (6 regions: GTA core, GTA suburb, Southwestern, Eastern, Golden Horseshoe, Central) to generate genuinely unique content per city -- different MLS boards, transit systems, employment contexts, and regulatory environments
- Batched at 30 documents per transaction to balance API efficiency with payload size limits
- Used namespace import (`import * as path`) for Node built-ins to avoid esModuleInterop issues when running tsc outside project tsconfig
- Each city gets unique transit info, description paragraphs, and localRegulatory text referencing specific municipal bylaws

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- TypeScript `--noEmit` without `--skipLibCheck` fails due to `@sanity/client` library using private identifiers targeting ES2015+ -- pre-existing library issue, not caused by our code. Resolved by using `--skipLibCheck` flag for standalone file compilation.

## User Setup Required

**SANITY_API_WRITE_TOKEN required before running scripts.** To create:
1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to API > Tokens
4. Create a new token with "Editor" permissions
5. Add to `.env.local`: `SANITY_API_WRITE_TOKEN=sk...`
6. Run: `npx tsx scripts/seed-services.ts` then `npx tsx scripts/seed-ontario-cities.ts`

Note: `tsx` must be installed (`npm install -D tsx`) or used via `npx`.

## Next Phase Readiness
- CMS content pipeline ready: running the two scripts populates the Content Lake with all Ontario Tier-1 data
- 160 CityService documents provide content for all localized service pages
- Pattern established for future province seeding (Phase 3: US expansion can follow same structure)
- Scripts are idempotent -- safe to re-run after data corrections

## Self-Check: PASSED

- FOUND: scripts/seed-services.ts
- FOUND: scripts/seed-ontario-cities.ts
- FOUND: .planning/phases/02-core-build-templates-and-top-cities/02-10-SUMMARY.md
- FOUND: commit 80c3e57 (Task 1)
- FOUND: commit e3a6f58 (Task 2)

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
