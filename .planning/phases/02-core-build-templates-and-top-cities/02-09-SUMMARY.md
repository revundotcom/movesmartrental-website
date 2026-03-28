---
phase: 02-core-build-templates-and-top-cities
plan: 09
subsystem: seo
tags: [sitemap, xml, next.js, groq, sanity, seo, isr]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: "Sanity schemas (city, province, service, cityService, blogGuide, comparison, caseStudy, propertyCategory, propertyListing) and sanityFetch utility"
  - phase: 02-core-build-templates-and-top-cities
    provides: "GROQ queries for all CMS content types and route structure"
provides:
  - "Dynamic segmented XML sitemap at /sitemap.xml with 6 segments"
  - "Sitemap index referencing static, ca-cities, ca-services, blog, listings, resources sitemaps"
  - "SEO-02 requirement fulfilled: XML sitemaps segmented by page type"
affects: [phase-03-scale, google-search-console, seo-indexing]

# Tech tracking
tech-stack:
  added: []
  patterns: ["generateSitemaps() for segmented sitemap index", "Tier-based priority scoring for city URLs"]

key-files:
  created: ["src/app/sitemap.ts"]
  modified: []

key-decisions:
  - "Inline GROQ queries in sitemap.ts with minimal projections (slug-only) to minimize payload from CMS"
  - "Tier-based priority: Tier-1 cities get 0.8/0.9 priority, others get 0.6/0.7"
  - "Blog and resource content share /resources/ URL prefix but are in separate sitemap segments for GSC diagnostics"

patterns-established:
  - "Sitemap segmentation: one segment per page type for Google Search Console diagnostics clarity"
  - "CMS-driven sitemap: all dynamic URLs fetched via sanityFetch with appropriate cache tags"

requirements-completed: [SEO-02]

# Metrics
duration: 1min
completed: 2026-03-28
---

# Phase 2 Plan 9: Dynamic XML Sitemaps Summary

**Segmented XML sitemap with 6 segments (static, ca-cities, ca-services, blog, listings, resources) using Next.js generateSitemaps() and sanityFetch for CMS-driven URLs**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-28T15:33:01Z
- **Completed:** 2026-03-28T15:34:18Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Built dynamic sitemap index at /sitemap.xml with 6 segment sitemaps
- Static segment includes all 11 static page URLs (homepage, owners, tenants, services, locations, pricing, resources, franchising, about, contact, faq)
- CMS segments query Sanity via sanityFetch with tag-based ISR revalidation
- Tier-1 cities receive higher priority scores for search engine crawl budget optimization

## Task Commits

Each task was committed atomically:

1. **Task 1: Build segmented XML sitemap with generateSitemaps** - `f6efc0c` (feat)

## Files Created/Modified
- `src/app/sitemap.ts` - Dynamic segmented XML sitemap generator with generateSitemaps() returning 6 segments and default sitemap function returning typed URLs per segment

## Decisions Made
- Used inline GROQ queries with minimal slug-only projections instead of importing existing page queries, since sitemaps only need URL data (not full page content)
- Tier-based priority scoring: Tier-1 cities get higher priority (0.8-0.9) vs others (0.6-0.7) to direct crawl budget toward highest-value pages
- Blog guides and comparisons/case studies placed in separate sitemap segments (blog vs resources) despite sharing /resources/ URL prefix, enabling independent GSC diagnostics per content type

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Sitemap system complete and ready for Google Search Console submission in Phase 3
- All CMS content types covered in sitemap segments
- Sitemap will automatically include new URLs as CMS content is published (via sanityFetch)

## Self-Check: PASSED

- FOUND: src/app/sitemap.ts
- FOUND: commit f6efc0c

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
