---
phase: 01-architecture-and-cms-foundation
plan: 04
subsystem: ui
tags: [navigation, header, footer, breadcrumbs, json-ld, mobile-nav, shadcn-ui, responsive]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    plan: 01
    provides: shadcn/ui components (NavigationMenu, Sheet, Breadcrumb, Button), root layout, route structure
provides:
  - Sticky header with 10 contract-required navigation items
  - Responsive mobile hamburger menu using Sheet component
  - Footer with 5 link group columns (27 total links)
  - BreadcrumbNav component with BreadcrumbList JSON-LD schema markup
  - Root layout wired with Header above content and Footer below
affects: [01-05, 01-06, phase-2, phase-3, phase-4]

# Tech tracking
tech-stack:
  added: []
  patterns: [responsive-nav, server-component-layout, json-ld-breadcrumbs, base-ui-render-prop, controlled-sheet-state]

key-files:
  created:
    - src/components/layout/header.tsx
    - src/components/layout/footer.tsx
    - src/components/layout/mobile-nav.tsx
    - src/components/layout/breadcrumb-nav.tsx
  modified:
    - src/app/layout.tsx

key-decisions:
  - "Used base-ui render prop pattern for NavigationMenuLink and BreadcrumbLink composition with next/link"
  - "BreadcrumbNav uses inline script tag for JSON-LD instead of separate JsonLd component (Plan 03 parallel execution)"

patterns-established:
  - "Layout components as Server Components: header.tsx and footer.tsx are RSC, only mobile-nav.tsx is 'use client'"
  - "Render prop composition: NavigationMenuLink render={<Link href={...} />} for base-ui + next/link integration"
  - "Controlled Sheet state: MobileNav uses useState for open/close to close on link click"
  - "BreadcrumbNav accepts crumbs array and renders both visual breadcrumbs and BreadcrumbList JSON-LD"

requirements-completed: [NAV-01, NAV-02, NAV-03, NAV-04]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 1 Plan 04: Navigation Summary

**Sticky header with 10-item nav, mobile hamburger Sheet, 5-column footer, and BreadcrumbNav with BreadcrumbList JSON-LD schema markup**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T13:52:59Z
- **Completed:** 2026-03-28T13:57:40Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Header component with all 10 contract-required navigation items (Home, Owners, Tenants, Services, Locations, Pricing, Resources, Franchising, About, Contact)
- Mobile hamburger menu using Sheet component with controlled open/close state
- Footer with 5 link group columns: Services (8 links), For Owners (4), For Tenants (4), Locations (5), Company (6) -- 27 total links
- BreadcrumbNav component produces BreadcrumbList JSON-LD structured data for search engine understanding of site hierarchy
- Root layout updated to render Header above content and Footer below on every page

## Task Commits

Each task was committed atomically:

1. **Task 1: Header with 10-item navigation and mobile hamburger menu** - `3ed1207` (feat)
2. **Task 2: Footer, breadcrumb component, and layout wiring** - `c6fa3b0` (feat)

## Files Created/Modified
- `src/components/layout/header.tsx` - Sticky header with NavigationMenu (desktop) and MobileNav (mobile), 10 nav items
- `src/components/layout/mobile-nav.tsx` - Client component with Sheet-based hamburger menu, closes on link click
- `src/components/layout/footer.tsx` - Dark footer with 5-column grid of link groups and copyright line
- `src/components/layout/breadcrumb-nav.tsx` - Breadcrumb component with shadcn/ui primitives and BreadcrumbList JSON-LD
- `src/app/layout.tsx` - Updated to import and render Header and Footer wrapping main content

## Decisions Made
- **Base-ui render prop for link composition:** The shadcn/ui components in this project use `@base-ui/react` primitives (not radix-ui). Used the `render` prop pattern for `NavigationMenuLink` and `BreadcrumbLink` to compose with next/link (e.g., `render={<Link href={...} />}`).
- **Inline JSON-LD for breadcrumbs:** Plan 03 (Sanity data pipeline) runs in parallel and may not have created the `JsonLd` component yet. Used an inline `<script type="application/ld+json">` with `dangerouslySetInnerHTML` for XSS-safe JSON-LD injection, as the plan allows.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- **Pre-existing build failure from Plan 01-03:** `npm run build` fails due to `@sanity/vision` importing `useEffectEvent` from React (not available in React 19 stable). This is from `src/sanity/sanity.config.ts` added by Plan 01-03 and is unrelated to navigation components. TypeScript compilation (`tsc --noEmit`) passes cleanly for all Plan 01-04 files. Logged to `deferred-items.md` for resolution.

## User Setup Required
None - no external service configuration required for this plan.

## Next Phase Readiness
- All layout components are in place -- every page rendered through root layout will have header and footer
- BreadcrumbNav is ready for per-page use in route components (Phase 2 templates)
- The (site) route group pages can import BreadcrumbNav with their specific crumb arrays
- Block components (Plans 01-05 and 01-06) can be placed between Header and Footer in page templates

## Self-Check: PASSED

All 5 files verified present. Both task commits (3ed1207, c6fa3b0) confirmed in git log. Must-have checks: header has 10 nav items, footer has 96 lines (min 60), mobile-nav has 'use client', breadcrumb-nav contains BreadcrumbList, layout imports Header and Footer, header imports MobileNav.

---
*Phase: 01-architecture-and-cms-foundation*
*Completed: 2026-03-28*
