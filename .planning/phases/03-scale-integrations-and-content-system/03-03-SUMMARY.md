---
phase: 03-scale-integrations-and-content-system
plan: 03
subsystem: content
tags: [csv, groq, sanity, seo, content-operations, city-matrix]

# Dependency graph
requires:
  - phase: 02-core-build-templates-and-top-cities
    provides: Ontario Tier-1 city and CityService CMS documents
provides:
  - City-priority matrix generation script (scripts/city-priority-matrix.ts)
  - Static city-priority matrix CSV with 73 cities ranked by SEO opportunity
  - Content-status tracker documenting page family completion per city
affects: [03-07-content-system, 04-handoff]

# Tech tracking
tech-stack:
  added: []
  patterns: [GROQ city query with join counts, weighted priority scoring model, CSV generation]

key-files:
  created:
    - scripts/city-priority-matrix.ts
    - .planning/content/city-priority-matrix.csv
    - .planning/content/content-status-tracker.md
  modified: []

key-decisions:
  - "Priority scoring: tier 40%, population 30%, service coverage 30% -- tier weighted highest because Tier-1 cities have established service pages"
  - "Static CSV baseline pre-populated with all 73 known cities -- script regenerates from live CMS data"
  - "US city slugs prefixed with state abbreviation (e.g., fl-miami) to match 03-02 plan deterministic ID convention"

patterns-established:
  - "Content status tracking: page family = 1 hub + 8 services + 4 categories = 13 minimum pages"
  - "Priority scoring model reusable for any future city expansion prioritization"

requirements-completed: [GEO-07]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 3 Plan 03: City-Priority Matrix, Slug Map, Content-Status Tracker Summary

**GROQ-powered city-priority matrix script with weighted scoring model (tier/population/service coverage) ranking 73 cities across 15 provinces/states, plus content-status tracker documenting page family completion**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T15:59:25Z
- **Completed:** 2026-03-28T16:03:25Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- City-priority matrix generation script queries Sanity GROQ for all cities with service/category/listing counts and outputs a ranked CSV
- Static baseline CSV pre-populated with all 73 known cities (20 Ontario, 16 Canadian expansion, 37 US) with priority scores
- Content-status tracker defines page family completeness and documents status for every city with a clear production queue

## Task Commits

Each task was committed atomically:

1. **Task 1: Create city-priority matrix generation script** - `311ebb2` (feat)
2. **Task 2: Create static content-status tracker and slug map** - `9d0cec0` (feat)

## Files Created/Modified
- `scripts/city-priority-matrix.ts` - GROQ-powered script to generate priority matrix CSV from Sanity CMS data
- `.planning/content/city-priority-matrix.csv` - Static baseline with 73 cities ranked by SEO opportunity (14 columns)
- `.planning/content/content-status-tracker.md` - Tracking document for page family completion per city across all regions

## Decisions Made
- Priority scoring model uses 40% tier, 30% population, 30% service coverage -- tier weighted highest because Tier-1 cities already have established service pages and represent highest SEO value
- Static CSV serves as baseline reference; the script regenerates from live CMS data on demand
- US city slugs use state-abbreviation prefix (fl-miami, tx-houston) matching the deterministic ID convention from the 03-02 plan
- Content production queue orders: Ontario categories first, then top Canadian expansion cities, then US Tier-1 cities

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required. The matrix script uses read-only Sanity access (no write token needed).

## Next Phase Readiness
- Content team can reference the tracker to prioritize which cities need content work
- The priority matrix CSV provides data-driven sequencing for content production
- Script can regenerate live rankings once CMS is populated with expansion cities (after Plans 03-01 and 03-02)

## Self-Check: PASSED

- All 3 artifacts exist and meet minimum line counts
- Both task commits (311ebb2, 9d0cec0) verified in git history
- city-priority-matrix.ts: 294 lines (min 60)
- city-priority-matrix.csv: 74 lines (min 20)
- content-status-tracker.md: 240 lines (min 30)

---
*Phase: 03-scale-integrations-and-content-system*
*Completed: 2026-03-28*
