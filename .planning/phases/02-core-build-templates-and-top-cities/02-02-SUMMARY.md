---
phase: 02-core-build-templates-and-top-cities
plan: 02
subsystem: ui
tags: [nextjs, routing, dynamic-routes, 404-page, seo]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: site route group layout, existing [service] dynamic segment
provides:
  - FAQ hub route at /faq/
  - Bedroom filter sub-route at /ca/[province]/[city]/[service]/[bedroom]/
  - Property detail route at /ca/[province]/[city]/rentals/[slug]/
  - Enhanced 404 page with 6 navigation cards
affects: [02-03, 02-04, 02-05, 02-06, 02-07, 02-08, 02-09, 02-10]

# Tech tracking
tech-stack:
  added: []
  patterns: [bedroom sub-route under existing [service] segment, navigation card grid for 404]

key-files:
  created:
    - src/app/(site)/faq/page.tsx
    - src/app/(site)/ca/[province]/[city]/[service]/[bedroom]/page.tsx
    - src/app/(site)/ca/[province]/[city]/rentals/[slug]/page.tsx
  modified:
    - src/app/not-found.tsx

key-decisions:
  - "Bedroom route placed under [service] segment (not [propertyType]) to avoid Next.js dynamic segment name conflict"
  - "Property type pages served by existing [service] dynamic segment since both occupy same URL level"

patterns-established:
  - "Dynamic sub-routes nest under [service] for category/bedroom filtering"
  - "404 page uses navigation card grid to reduce bounce rate (SEO-08)"

requirements-completed: [SEO-08]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 02 Plan 02: New Route Files and Enhanced 404 Summary

**3 new route skeletons (FAQ, bedroom filter, property detail) plus SEO-friendly 404 with 6 navigation cards**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T15:10:56Z
- **Completed:** 2026-03-28T15:15:35Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created FAQ hub route skeleton at /faq/ with metadata
- Created bedroom filter sub-route under [service]/[bedroom] for URL patterns like /ca/ontario/toronto/apartments-for-rent/1-bedroom/
- Created property detail route at /ca/[province]/[city]/rentals/[slug]/ for individual listing pages
- Enhanced 404 page with 6 navigation cards (Homepage, Owners, Tenants, Services, Locations, Contact) to reduce bounce rate

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 4 new route files for property and FAQ pages** - `0480093` (feat)
2. **Task 2: Enhance 404 page with helpful navigation links** - `d365690` (feat)
3. **Deviation fix: Resolve dynamic segment conflict** - `ee0f5cd` (fix)

**Plan metadata:** [pending] (docs: complete plan)

## Files Created/Modified
- `src/app/(site)/faq/page.tsx` - FAQ hub route with metadata
- `src/app/(site)/ca/[province]/[city]/[service]/[bedroom]/page.tsx` - Bedroom count filter route
- `src/app/(site)/ca/[province]/[city]/rentals/[slug]/page.tsx` - Property detail route
- `src/app/not-found.tsx` - Enhanced 404 with 6 navigation cards

## Decisions Made
- **Bedroom route under [service] not [propertyType]:** Next.js requires all dynamic segments at the same directory level to share the same parameter name. Since `[service]` already exists from Phase 1, the bedroom sub-route was placed at `[service]/[bedroom]` rather than creating a conflicting `[propertyType]` segment. Property type URLs (apartments-for-rent, houses-for-rent) are served by the existing `[service]` dynamic segment since they occupy the same URL position.
- **Separate [propertyType] page not created:** The plan called for a standalone `[propertyType]/page.tsx` but this is structurally identical to the existing `[service]/page.tsx`. Both serve the same URL pattern. Template differentiation will happen in later plans based on the slug content.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Resolved Next.js dynamic segment name conflict**
- **Found during:** Task 1 verification (build step)
- **Issue:** Creating `[propertyType]` directory alongside existing `[service]` directory caused Next.js build error: "You cannot use different slug names for the same dynamic path ('propertyType' !== 'service')"
- **Fix:** Removed `[propertyType]` directory entirely. Property type pages served by existing `[service]` segment. Bedroom sub-route moved from `[propertyType]/[bedroom]` to `[service]/[bedroom]`.
- **Files modified:** Removed `src/app/(site)/ca/[province]/[city]/[propertyType]/page.tsx`, renamed `[propertyType]/[bedroom]/page.tsx` to `[service]/[bedroom]/page.tsx`
- **Verification:** TypeScript compiles clean, no dynamic segment conflicts
- **Committed in:** `ee0f5cd`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix was necessary for Next.js compatibility. The plan's intent (separate property-type routes) is fully preserved via the existing [service] segment. No scope creep.

## Issues Encountered
- **Pre-existing build failure:** `@sanity/vision` imports `useEffectEvent` from React which does not exist in React 18, causing `npm run build` to fail. This is NOT caused by Phase 2 changes and is logged in `deferred-items.md`. TypeScript compilation succeeds as verification.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All route skeletons in place for template population in plans 02-03 through 02-10
- FAQ, bedroom filter, and property detail routes ready for content templates
- Enhanced 404 page provides SEO safety net during content build-out

## Self-Check: PASSED

- All 4 route files exist on disk
- All 3 commits (0480093, d365690, ee0f5cd) verified in git history
- SUMMARY.md created at expected path

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
