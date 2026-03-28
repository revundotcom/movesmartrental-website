---
phase: 04-audit-hardening-and-handoff
plan: 01
subsystem: ui
tags: [next-image, avif, webp, core-web-vitals, lcp, inp, cls, font-swap]

# Dependency graph
requires:
  - phase: 01-sanity-schema-and-nextjs-foundation
    provides: "Next.js Image components and layout structure"
  - phase: 03-scale-integrations-and-content-system
    provides: "Event tracking components (ScrollDepthTracker, LinkTracker)"
provides:
  - "AVIF/WebP image format optimization via next.config.ts"
  - "Explicit sizes attributes on all 7 Image components for responsive srcset"
  - "Font display swap for LCP optimization"
  - "Passive event listeners on all tracking components for INP"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "AVIF-first image format with WebP fallback"
    - "Explicit sizes attributes on every next/image for responsive loading"
    - "Passive event listeners for non-blocking interaction tracking"

key-files:
  created: []
  modified:
    - "next.config.ts"
    - "src/components/portable-text.tsx"
    - "src/app/layout.tsx"
    - "src/components/tracking/link-tracker.tsx"

key-decisions:
  - "AVIF listed before WebP in formats array for best compression with automatic fallback"
  - "Explicit deviceSizes and imageSizes in config to survive future config changes"
  - "Added passive: true to LinkTracker click listener since handler never calls preventDefault()"

patterns-established:
  - "All Image components must include sizes attribute for responsive srcset generation"
  - "LCP-candidate images (hero blocks, featured images) must use priority={true}"
  - "Event listeners in tracking components must use { passive: true }"

requirements-completed: [SEO-09, SEO-10]

# Metrics
duration: 3min
completed: 2026-03-28
---

# Phase 04 Plan 01: CWV & Image Optimization Summary

**AVIF/WebP image format optimization with responsive sizes on all 7 Image components, font display swap, and passive event listeners for INP**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-28T16:23:20Z
- **Completed:** 2026-03-28T16:26:21Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Configured AVIF-first with WebP fallback image format optimization in next.config.ts
- Added explicit sizes attribute to portable-text inline images (the only Image component missing it)
- Added explicit display: 'swap' and preload: true to Inter font for LCP optimization
- Added passive: true to LinkTracker click listener for INP improvement
- Verified all 7 Image components across 6 files have sizes attributes, correct priority flags, and fill or explicit dimensions

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure image optimization and fix LCP/CLS across all Image components** - `0dcd18d` (feat)
2. **Task 2: Optimize font loading, script strategy, and INP for Core Web Vitals** - `4170bb9` (feat)

## Files Created/Modified
- `next.config.ts` - Added formats, deviceSizes, imageSizes to images config
- `src/components/portable-text.tsx` - Added sizes attribute to inline content images
- `src/app/layout.tsx` - Added explicit display: 'swap' and preload: true to Inter font
- `src/components/tracking/link-tracker.tsx` - Added passive: true to click event listener

## Decisions Made
- AVIF listed before WebP in formats array for best compression with automatic fallback
- Made deviceSizes and imageSizes explicit (matching Next.js defaults) to prevent regressions from future config changes
- Added passive: true to LinkTracker click listener since handler never calls preventDefault() -- safe to mark passive for INP

## Deviations from Plan

None - plan executed exactly as written. All Image components were already well-configured (fill/dimensions, priority flags, sizes) except portable-text.tsx which needed a sizes attribute.

## Issues Encountered
- Pre-existing build failure: @sanity/vision imports `useEffectEvent` from React which is not exported in the current React version. This affects `next build` for all plans. Verified failure exists on clean main branch. Logged to `deferred-items.md`. TypeScript compilation (`tsc --noEmit`) passes cleanly, confirming changes are correct.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Image optimization is active and will apply to all Sanity CDN images automatically
- All Image components follow consistent patterns for future additions
- Pre-existing @sanity/vision build failure needs resolution (see deferred-items.md)

## Self-Check: PASSED

All 4 modified files verified on disk. Both task commits (0dcd18d, 4170bb9) verified in git history.

---
*Phase: 04-audit-hardening-and-handoff*
*Completed: 2026-03-28*
