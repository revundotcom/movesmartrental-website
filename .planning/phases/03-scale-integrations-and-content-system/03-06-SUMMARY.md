---
phase: 03-scale-integrations-and-content-system
plan: 06
subsystem: tracking
tags: [gtm, analytics, event-tracking, cta, link-tracking]

# Dependency graph
requires:
  - phase: 03-04
    provides: Analytics utility (pushEvent, trackOutboundClick, trackPhoneClick, trackEmailClick) and GTM setup
provides:
  - CTATracker client wrapper component for CTA button click tracking
  - LinkTracker global listener for outbound, phone, email, and city-to-service clicks
  - Event tracking wired to HeroBlock, CTABannerBlock, and ContactForm
  - All 9 GTM event types now have active triggers across the site
affects: [04-launch-seo-hardening]

# Tech tracking
tech-stack:
  added: []
  patterns: [client-component-wrapper-for-server-component-tracking, href-pattern-inference-for-event-type]

key-files:
  created:
    - src/components/tracking/cta-tracker.tsx
    - src/components/tracking/link-tracker.tsx
  modified:
    - src/app/layout.tsx
    - src/components/blocks/hero-block.tsx
    - src/components/blocks/cta-banner-block.tsx
    - src/components/contact-form.tsx
    - src/types/blocks.ts

key-decisions:
  - "CTATracker wraps Server Component CTAs as Client Component span with onClick -- composition pattern avoids converting parent to Client Component"
  - "CTA event type inferred from href pattern (account/signup -> account_creation, else book_a_call)"
  - "City and service tracking context added as optional props to HeroBlockProps and CTABannerBlockProps"

patterns-established:
  - "Client wrapper pattern: CTATracker wraps any button/link to intercept clicks without converting parent Server Component"
  - "URL pattern inference: inferCTAType detects event type from CTA href for automatic classification"

requirements-completed: [TRACK-04, TRACK-05, TRACK-06, TRACK-07, TRACK-08]

# Metrics
duration: 2min
completed: 2026-03-28
---

# Phase 3 Plan 6: Event Tracking Wiring Summary

**CTATracker and LinkTracker components wired to all CTA buttons, contact form, and link types for complete GTM event coverage across 9 event types**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-28T16:10:06Z
- **Completed:** 2026-03-28T16:12:23Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Created CTATracker client wrapper that tracks account_creation, book_a_call, and service_to_account_conversion CTA clicks with page, city, and service context
- Created LinkTracker global click listener that auto-detects outbound, phone, email, and city-to-service navigation clicks
- Wrapped HeroBlock and CTABannerBlock CTA buttons with CTATracker for tracked events
- Added contact_form_submit event firing to ContactForm after successful submission
- All 9 GTM event types now have active triggers: account_creation, book_a_call, contact_form_submit, scroll_depth, outbound_click, phone_click, email_click, city_to_service_ctr, service_to_account_conversion

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CTA tracker and link tracker components** - `f2c45e2` (feat)
2. **Task 2: Wire event tracking to HeroBlock, CTABannerBlock, and ContactForm** - `b2df8de` (feat)

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified
- `src/components/tracking/cta-tracker.tsx` - Client wrapper that fires GTM events on CTA button clicks
- `src/components/tracking/link-tracker.tsx` - Global click listener for outbound, phone, email, and city-to-service link tracking
- `src/app/layout.tsx` - Added LinkTracker rendering alongside ScrollDepthTracker
- `src/components/blocks/hero-block.tsx` - Wrapped CTA buttons with CTATracker, added city/service props
- `src/components/blocks/cta-banner-block.tsx` - Wrapped CTA buttons with CTATracker, added city/service props
- `src/components/contact-form.tsx` - Added pushEvent call for contact_form_submit after successful submission
- `src/types/blocks.ts` - Added optional city/service props to HeroBlockProps and CTABannerBlockProps

## Decisions Made
- CTATracker uses span wrapper with onClick to intercept clicks in Server Component context without converting parent to Client Component
- CTA event type inferred from href pattern: URLs containing account/sign-up/signup/register map to account_creation, all others to book_a_call
- City and service tracking context passed as optional props so pages with geographic context can enrich GTM events

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 9 GTM event types have active triggers across the site
- Analytics layer (Plan 04) and event wiring (Plan 06) complete
- Ready for Phase 4 launch hardening and GA4 verification

## Self-Check: PASSED

All 7 files verified present. Both task commits (f2c45e2, b2df8de) verified in git log.

---
*Phase: 03-scale-integrations-and-content-system*
*Completed: 2026-03-28*
