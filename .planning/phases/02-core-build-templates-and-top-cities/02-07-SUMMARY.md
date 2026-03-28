---
phase: 02-core-build-templates-and-top-cities
plan: 07
subsystem: ui
tags: [resources, blog, guide, comparison, case-study, portable-text, json-ld, article-schema]

# Dependency graph
requires:
  - phase: 02-core-build-templates-and-top-cities
    provides: GROQ queries for blogGuide, comparison, caseStudy; PortableTextBody component
provides:
  - Resources hub listing page aggregating all content types with categorized grid
  - Universal content detail template handling blogGuide, comparison, and caseStudy types
  - Article JSON-LD on all resource detail pages
  - ComparisonTable component for competitor feature comparisons
affects: [02-08, 02-09, 02-10]

# Tech tracking
tech-stack:
  added: []
  patterns: [GROQ union query for multi-type slug resolution, type-discriminated rendering with conditional JSX, contextual CTA by content type]

key-files:
  created:
    - src/app/(site)/resources/page.tsx
  modified:
    - src/app/(site)/resources/[slug]/page.tsx

key-decisions:
  - "UNIVERSAL_RESOURCE_QUERY uses GROQ conditional projection (_type == 'x' => {fields}) to fetch all three content types in a single query"
  - "Content type resolution via single GROQ union query instead of sequential fallback queries for efficiency"
  - "Comparison table uses HTML table with Tailwind alternating row colors, not a custom component library"
  - "Category badge colors shared between hub and detail pages for visual consistency"

patterns-established:
  - "Multi-type slug resolution: GROQ union query with _type in [...] and conditional field projection"
  - "Content hub pattern: parallel fetch of multiple content types, grouped display with section anchors"
  - "Type-discriminated rendering: doc._type conditional blocks in JSX for polymorphic pages"

requirements-completed: [TMPL-07, TMPL-12, TMPL-17, TMPL-18, TMPL-19, TMPL-20, SCHEMA-05, TEN-04]

# Metrics
duration: 5min
completed: 2026-03-28
---

# Phase 2 Plan 07: Resources Hub and Content Detail Templates Summary

**Resources hub with categorized content grid plus universal detail template handling blog/guide, comparison, and case study types with Article JSON-LD**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-28T15:21:55Z
- **Completed:** 2026-03-28T15:26:42Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Built Resources hub page that fetches blog/guides, comparisons, and case studies in parallel, grouped by category with anchor navigation tabs
- Built universal content detail template with GROQ union query resolving blogGuide, comparison, and caseStudy types from a single slug
- BlogGuide rendering handles all four sub-categories (blog, guide, market-report, legal-guide) with hero image and PortableTextBody
- Comparison rendering includes ComparisonTable with feature-by-feature competitor comparison using HTML tables
- CaseStudy rendering features green outcome highlight box with bold text
- Article JSON-LD via buildArticleSchema on all detail pages with type-specific isBlogPost flag
- generateStaticParams combines all three content type slugs for static generation
- Contextual CTA banners vary by content type (quote for guides, pricing for comparisons, contact for case studies)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Resources hub page** - `cab6f6c` (feat)
2. **Task 2: Build universal content detail template** - `70cb5c7` (feat)

## Files Created/Modified
- `src/app/(site)/resources/page.tsx` - Resources hub listing all content types in categorized grid with anchor navigation
- `src/app/(site)/resources/[slug]/page.tsx` - Universal content detail template handling blogGuide, comparison, caseStudy with Article JSON-LD

## Decisions Made
- Used GROQ conditional projection (`_type == "blogGuide" => { ... }`) in a single union query instead of sequential fallback queries -- more efficient single request
- Content type resolution via `_type in ["blogGuide", "comparison", "caseStudy"]` filter in GROQ
- Comparison table uses semantic HTML table with Tailwind styling (alternating bg-gray-50/bg-white rows) rather than a custom component library
- Category badge colors and labels shared between hub page and detail page for visual consistency
- Sanity image URL built inline using same pattern as portable-text.tsx (manual ref parsing)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Resources hub and all 5 content detail types (blog, guide, legal-guide, market-report, comparison, case-study) are rendering-ready
- All resource pages have Article JSON-LD for search appearance
- Tenant-relevant content (FAQ, application flow, insurance, guarantor) renders via blogGuide branch automatically when CMS documents are published

## Self-Check: PASSED

- All 2 files found on disk
- Both commit hashes verified (cab6f6c, 70cb5c7)
- resources/page.tsx: 341 lines (min 50)
- resources/[slug]/page.tsx: 456 lines (min 80)
- TypeScript compilation clean (no errors in resources files)

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
