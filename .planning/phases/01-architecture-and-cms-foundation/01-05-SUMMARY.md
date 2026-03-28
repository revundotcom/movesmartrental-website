---
phase: 01-architecture-and-cms-foundation
plan: 05
subsystem: ui
tags: [react, typescript, blocks, components, json-ld, faq-schema, next-image, server-components]

# Dependency graph
requires:
  - phase: 01-01
    provides: "shadcn/ui components (Button, Card, Accordion, Input), Next.js project scaffold"
provides:
  - HeroBlock with headline, subheadline, 2 CTAs, background image with LCP priority
  - CTABannerBlock with primary/secondary buttons and email form variant
  - FAQBlock with accordion and FAQPage JSON-LD schema markup
  - ServiceGridBlock with icon lookup map linking to /services/{slug}/
  - CityGridBlock with population/rent data linking to /ca/{province}/{city}/
  - TypeScript prop interfaces for all 10 block components
affects: [01-06, phase-2]

# Tech tracking
tech-stack:
  added: []
  patterns: [block-components, icon-lookup-map, json-ld-injection, base-ui-render-prop]

key-files:
  created:
    - src/components/blocks/hero-block.tsx
    - src/components/blocks/cta-banner-block.tsx
    - src/components/blocks/faq-block.tsx
    - src/components/blocks/service-grid-block.tsx
    - src/components/blocks/city-grid-block.tsx
  modified:
    - src/types/blocks.ts

key-decisions:
  - "Used base-ui render prop pattern for Button-as-Link instead of wrapping Link around Button"
  - "FAQBlock schemaEnabled defaults to true for SEO-first approach"
  - "ServiceGridBlock uses static icon lookup map (8 Lucide icons) rather than dynamic import"

patterns-established:
  - "Block component pattern: React Server Components importing typed props from @/types/blocks"
  - "Button-as-Link: Button render={<Link href={...} />} for base-ui/react button composition"
  - "JSON-LD injection: script type=application/ld+json with < escaped as \\u003c"
  - "Grid column pattern: COLUMN_CLASSES lookup object for responsive grid columns"

requirements-completed: [BLOCK-01, BLOCK-02, BLOCK-03, BLOCK-04, BLOCK-05]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 1 Plan 05: Block Components Batch 1 Summary

**5 block components (Hero, CTA Banner, FAQ with JSON-LD, ServiceGrid, CityGrid) with typed props and base-ui render prop composition**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T13:53:49Z
- **Completed:** 2026-03-28T13:58:27Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- HeroBlock renders full-width hero section with next/image background, LCP priority support, dark overlay, and 2 CTA buttons using base-ui render prop for Link composition
- CTABannerBlock provides both default (dual CTA buttons) and form (email input + submit) variants for lead capture
- FAQBlock renders accordion with FAQPage JSON-LD schema markup for rich search results, using base-ui accordion (not Radix)
- ServiceGridBlock renders responsive card grid with Lucide icon lookup map, linking to /services/{slug}/
- CityGridBlock renders responsive card grid with formatted population and median rent, linking to /ca/{province}/{city}/
- TypeScript prop interfaces defined for all 10 block components in a single shared types file

## Task Commits

Each task was committed atomically:

1. **Task 1: Block prop types and HeroBlock + CTABannerBlock** - `52d231d` (feat)
2. **Task 2: FAQBlock, ServiceGridBlock, and CityGridBlock** - `bec831e` (feat)

## Files Created/Modified
- `src/types/blocks.ts` - TypeScript prop interfaces for all 10 block components (shared sub-types + block props)
- `src/components/blocks/hero-block.tsx` - Full-width hero with headline, subheadline, 2 CTAs, background image/gradient fallback
- `src/components/blocks/cta-banner-block.tsx` - CTA banner with primary/secondary buttons and email form variant
- `src/components/blocks/faq-block.tsx` - FAQ accordion with FAQPage JSON-LD schema injection
- `src/components/blocks/service-grid-block.tsx` - Responsive service card grid with icon lookup and hover effects
- `src/components/blocks/city-grid-block.tsx` - Responsive city card grid with population, median rent, and hero images

## Decisions Made
- **base-ui render prop for Button-as-Link:** The shadcn/ui Button uses `@base-ui/react/button` which supports a `render` prop to replace the underlying element. Used `render={<Link href={...} />}` instead of wrapping Link around Button, preserving button styling while getting Link navigation.
- **FAQBlock schemaEnabled defaults to true:** Since the primary purpose of the FAQ block is SEO (FAQ rich results), the JSON-LD injection is enabled by default. Components can opt out by passing `schemaEnabled={false}`.
- **Static icon lookup map:** ServiceGridBlock uses a hardcoded `ICON_MAP` with 8 common Lucide icons rather than dynamic imports. This keeps the component as a Server Component without requiring dynamic imports or client-side rendering. New icons can be added to the map as needed.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added title prop to FAQBlockProps**
- **Found during:** Task 1 (block prop types)
- **Issue:** FAQBlockProps was missing optional `title` prop needed to customize section heading
- **Fix:** Added `title?: string` to FAQBlockProps interface
- **Files modified:** src/types/blocks.ts
- **Verification:** TypeScript compiles cleanly
- **Committed in:** 52d231d (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Minor addition of optional prop for flexibility. No scope creep.

## Issues Encountered
- Pre-existing build failure from `@sanity/vision` module (`useEffectEvent` not exported from react). This is unrelated to block components and was present before this plan's execution. TypeScript compilation succeeds; only the webpack build for the Sanity Studio page fails. Logged as deferred item.

## User Setup Required
None - no external service configuration required for this plan.

## Next Phase Readiness
- All 5 batch 1 block components are ready for use in Phase 2 page templates
- Plan 06 block components (PropertyCard, Trust, HowItWorks, PainPoint, Benefits) share the same types file
- The icon lookup map in ServiceGridBlock can be extended as new service types are added in CMS

## Self-Check: PASSED

All 6 files verified present. Both task commits (52d231d, bec831e) confirmed in git log. All must-have artifact checks passed: hero-block.tsx (78 lines, min 30), cta-banner-block.tsx (75 lines, min 20), faq-block.tsx (54 lines, contains FAQPage + application/ld+json + dangerouslySetInnerHTML), service-grid-block.tsx (77 lines, min 25, contains Link import from next/link), city-grid-block.tsx (80 lines, min 25), blocks.ts (133 lines, min 40).

---
*Phase: 01-architecture-and-cms-foundation*
*Completed: 2026-03-28*
