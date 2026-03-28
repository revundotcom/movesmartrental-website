---
phase: 03-scale-integrations-and-content-system
plan: 04
subsystem: integrations
tags: [gtm, ga4, google-search-console, bing-webmaster-tools, zoho-salesiq, analytics, tracking]

# Dependency graph
requires:
  - phase: 01-foundation-and-cms-architecture
    provides: Root layout structure, @next/third-parties dependency
provides:
  - GTM integration via GoogleTagManager component (conditional on env var)
  - GA4 data flow through GTM (no direct gtag.js)
  - GSC and Bing verification meta tags in HTML head
  - SalesIQ chat widget with lazyOnload strategy
  - Type-safe pushEvent() analytics utility for 9 event types
  - ScrollDepthTracker component for automatic scroll depth events
affects: [all pages via root layout, future event tracking integrations]

# Tech tracking
tech-stack:
  added: ["@next/third-parties GoogleTagManager", "next/script for SalesIQ"]
  patterns: ["GTM as single analytics entry point (GA4 flows through GTM)", "lazyOnload strategy for third-party chat widgets", "Type-safe dataLayer.push via GTMEvent union type", "Conditional rendering on env vars for all third-party integrations"]

key-files:
  created:
    - src/lib/analytics.ts
    - src/components/tracking/gtm-events.tsx
  modified:
    - src/app/layout.tsx

key-decisions:
  - "Removed duplicate Window.dataLayer declaration to avoid conflict with @next/third-parties type definitions"
  - "Used type assertion (as Record<string, unknown>) in pushEvent to bridge GTMEvent type with @next/third-parties Object[] dataLayer type"

patterns-established:
  - "GTM-only analytics: all tracking events push to dataLayer, GA4 receives data through GTM configuration (never direct gtag.js)"
  - "Env-var gated integrations: third-party scripts only render when their env var is set, safe for all environments"
  - "pushEvent() is the single analytics entry point for all event tracking across the app"

requirements-completed: [TRACK-01, TRACK-02, TRACK-03, INT-01]

# Metrics
duration: 2min
completed: 2026-03-28
---

# Phase 3 Plan 4: Analytics & Integrations Wiring Summary

**GTM with GA4 routing, GSC/Bing verification meta tags, SalesIQ chat widget, and type-safe analytics utility with 9 event types and scroll depth tracking**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-28T15:59:26Z
- **Completed:** 2026-03-28T16:01:36Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- GTM loads on every page via GoogleTagManager component, conditional on NEXT_PUBLIC_GTM_ID env var
- GSC and Bing Webmaster Tools verification meta tags render in HTML head for search engine verification
- SalesIQ chat widget loads with lazyOnload strategy, preventing any LCP impact
- Type-safe pushEvent() utility ready for all 9 GTM event types (account_creation, book_a_call, contact_form_submit, scroll_depth, outbound_click, phone_click, email_click, city_to_service_ctr, service_to_account_conversion)
- ScrollDepthTracker fires scroll_depth events at 25/50/75/100% thresholds on all pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Add GTM, verification meta tags, and SalesIQ to root layout** - `ba4e885` (feat)
2. **Task 2: Create analytics utility module and GTM event component** - `459b83f` (feat)

## Files Created/Modified
- `src/app/layout.tsx` - Root layout with GTM, verification meta tags, SalesIQ script, and ScrollDepthTracker
- `src/lib/analytics.ts` - GTM data layer push utility with GTMEvent type definitions and convenience helpers
- `src/components/tracking/gtm-events.tsx` - Client component for scroll depth tracking via dataLayer events

## Decisions Made
- Removed duplicate `Window.dataLayer` type declaration that conflicted with @next/third-parties built-in type; used type assertion instead
- ScrollDepthTracker placed in root layout between GTM and Header for consistent scroll tracking on all pages

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed dataLayer type conflict with @next/third-parties**
- **Found during:** Task 2 (analytics utility creation)
- **Issue:** Plan included `declare global { interface Window { dataLayer: Record<string, unknown>[] } }` which conflicted with @next/third-parties declaring `dataLayer` as `Object[]` -- TypeScript error TS2687
- **Fix:** Removed the duplicate global declaration and used `as Record<string, unknown>` type assertion in pushEvent() to bridge the types
- **Files modified:** src/lib/analytics.ts
- **Verification:** `npx tsc --noEmit --skipLibCheck` passes cleanly
- **Committed in:** 459b83f (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Type assertion preserves full type safety at the call site while avoiding declaration conflict. No scope creep.

## Issues Encountered
None beyond the auto-fixed type conflict above.

## User Setup Required

External services require manual configuration. The following environment variables must be set:

- **NEXT_PUBLIC_GTM_ID** - Google Tag Manager container ID (format: GTM-XXXXXXX). Source: GTM Admin > Container Settings
- **NEXT_PUBLIC_GSC_VERIFICATION** - Google Search Console HTML tag content value. Source: GSC Settings > Ownership verification
- **NEXT_PUBLIC_BING_VERIFICATION** - Bing Webmaster Tools HTML meta tag content value. Source: Bing Webmaster Tools Settings
- **NEXT_PUBLIC_SALESIQ_WIDGET_CODE** - Zoho SalesIQ widgetcode value from embed script. Source: SalesIQ Settings > Websites

Dashboard configuration:
- Create GA4 property and connect via GTM (Google Analytics Admin > Create Property; then GTM Tags > New > GA4 Configuration)

## Next Phase Readiness
- Analytics utility layer ready for event tracking in forms, CTAs, and navigation components
- GTM container awaits client-provided container ID for activation
- Verification meta tags await client-provided verification codes
- SalesIQ widget awaits client-provided widget code

## Self-Check: PASSED

- [x] src/app/layout.tsx - FOUND
- [x] src/lib/analytics.ts - FOUND
- [x] src/components/tracking/gtm-events.tsx - FOUND
- [x] Commit ba4e885 - FOUND
- [x] Commit 459b83f - FOUND

---
*Phase: 03-scale-integrations-and-content-system*
*Completed: 2026-03-28*
