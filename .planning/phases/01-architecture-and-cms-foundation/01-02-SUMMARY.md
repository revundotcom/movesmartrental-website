---
phase: 01-architecture-and-cms-foundation
plan: 02
subsystem: cms
tags: [sanity, schema, typescript, seo, portable-text, cms]

# Dependency graph
requires:
  - phase: none
    provides: n/a
provides:
  - 9 Sanity CMS document type schemas (province, city, service, cityService, blogGuide, comparison, caseStudy, propertyCategory, propertyListing)
  - 3 reusable object types (seoFields, publishingControls, portableContent)
  - Schema registry exporting all 12 types
  - TypeScript interfaces for all 9 content types plus shared sub-types
affects: [01-03, 01-04, 01-05, 02-content, groq-queries, page-templates]

# Tech tracking
tech-stack:
  added: [sanity (defineType, defineField, defineArrayMember), @portabletext/types]
  patterns: [reusable-object-types, required-field-validation, fieldset-grouping, denormalized-fields]

key-files:
  created:
    - src/sanity/objects/seo-fields.ts
    - src/sanity/objects/publishing-controls.ts
    - src/sanity/objects/portable-text.ts
    - src/sanity/schemas/province.ts
    - src/sanity/schemas/city.ts
    - src/sanity/schemas/service.ts
    - src/sanity/schemas/city-service.ts
    - src/sanity/schemas/blog-guide.ts
    - src/sanity/schemas/comparison.ts
    - src/sanity/schemas/case-study.ts
    - src/sanity/schemas/property-category.ts
    - src/sanity/schemas/property-listing.ts
    - src/sanity/schemas/index.ts
    - src/types/sanity.ts
  modified: []

key-decisions:
  - "Portable text link annotations include allowRelative: true for internal navigation"
  - "CityService uses fieldset grouping for Studio UX (references, denormalized, localContent, hero, blocks)"
  - "neighbourhoodNames requires min(3) items to enforce content depth"

patterns-established:
  - "All document schemas include seo (type: seoFields) and publishing (type: publishingControls) fieldsets"
  - "All image fields include required alt text via nested defineField with Rule.required()"
  - "Reference fields use to: [{ type: 'typeName' }] pattern for Sanity Studio cross-referencing"
  - "Rich text content uses portableContent custom type (not raw array of block)"

requirements-completed: [FOUND-02, CMS-01, CMS-02, CMS-03, SEO-07]

# Metrics
duration: 14min
completed: 2026-03-28
---

# Phase 1 Plan 2: Sanity CMS Schema Definitions Summary

**9 Sanity CMS schemas with required-field thin-content prevention, reusable SEO/publishing fieldsets, and 254-line TypeScript interface layer**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-28T13:35:18Z
- **Completed:** 2026-03-28T13:49:00Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Defined all 9 content type schemas with 15-30+ fields each, covering the full content model for provinces, cities, services, city-service junction pages, blog/guides, comparisons, case studies, property categories, and property listings
- Enforced required local content fields on CityService (localMedianRent, localVacancyRate, neighbourhoodNames min 3, localRegulatory, localBody) to prevent thin content deindexing
- Created reusable seoFields (metaTitle max 60, metaDescription max 160, ogImage with alt, keywords) and publishingControls (canonical, noindex, sitemap, redirect, dates) applied to all 9 types
- Built portableContent with block styles (h2-h4, blockquote), lists (bullet, number), marks (strong, em, underline, link), and image with required alt
- TypeScript interfaces for all 9 content types plus 10 shared sub-types (SanityReference, SanityImage, SanitySlug, SeoFields, PublishingControls, CtaButton, PainPoint, Benefit, HowItWorksStep, Testimonial, FaqItem, CompetitorComparison)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create reusable schema objects and TypeScript types** - `d6ab1bb` (feat)
2. **Task 2: Create all 9 Sanity content type schemas and registry** - `07c534a` (feat)

## Files Created/Modified
- `src/sanity/objects/seo-fields.ts` - Reusable SEO fieldset (metaTitle, metaDescription, ogImage, keywords)
- `src/sanity/objects/publishing-controls.ts` - Reusable publishing controls (canonical, noindex, sitemap, redirect, dates, author)
- `src/sanity/objects/portable-text.ts` - Custom Portable Text with styles, lists, marks, images
- `src/types/sanity.ts` - TypeScript interfaces for all 9 content types and shared sub-types (254 lines)
- `src/sanity/schemas/province.ts` - Province/state schema with country, abbreviation, heroImage
- `src/sanity/schemas/city.ts` - City schema with province reference, tier, population, medianRent, neighbourhoods
- `src/sanity/schemas/service.ts` - Service schema with audience, FAQ, body
- `src/sanity/schemas/city-service.ts` - CityService junction schema with required local content fields and content blocks
- `src/sanity/schemas/blog-guide.ts` - Blog/guide schema with category, optional city/service references
- `src/sanity/schemas/comparison.ts` - Competitor comparison schema with nested feature arrays
- `src/sanity/schemas/case-study.ts` - Case study schema with outcome, optional city reference
- `src/sanity/schemas/property-category.ts` - Property category schema with propertyType options
- `src/sanity/schemas/property-listing.ts` - Property listing schema with price, bedrooms, bathrooms, images
- `src/sanity/schemas/index.ts` - Schema registry exporting all 12 types (9 documents + 3 objects)

## Decisions Made
- Portable text link annotations include `allowRelative: true` to support internal navigation links alongside external URLs
- CityService uses Sanity fieldset grouping (references, denormalized, localContent, hero, blocks) for better Studio editing UX
- neighbourhoodNames requires minimum 3 items (`Rule.required().min(3)`) to enforce content depth on city-service pages
- localBody requires minimum 1 block (`Rule.required().min(1)`) to prevent empty content body

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed sanity dependency**
- **Found during:** Pre-task setup
- **Issue:** Project had no `sanity` package installed (scaffolded with create-next-app but without CMS dependencies). Plan 01-01 (scaffolding) had not been executed when this plan started.
- **Fix:** Installed `sanity@^4.22.0` and `@portabletext/types` via npm with `--legacy-peer-deps` (next-sanity@12+ requires Next.js 16, but we are on 15.2.4)
- **Files modified:** package.json, package-lock.json (committed separately by user)
- **Verification:** `npx tsc --noEmit` exits 0
- **Committed in:** External (user committed scaffolding separately)

**2. [Rule 3 - Blocking] Recreated directory structure after project restructure**
- **Found during:** Task 2
- **Issue:** Project was restructured (src/src/ -> src/, added shadcn components) between task executions, deleting the directories created for Task 1
- **Fix:** Recreated src/sanity/objects/, src/sanity/schemas/, src/types/ and rewrote all files
- **Files modified:** All 14 files
- **Verification:** All files exist, TypeScript compiles cleanly
- **Committed in:** d6ab1bb, 07c534a

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes were necessary to unblock schema creation. No scope creep.

## Issues Encountered
- next-sanity@12+ requires Next.js 16 peer dependency, but project uses Next.js 15.2.4 per architecture decision. Used `--legacy-peer-deps` for installation. This is a known trade-off documented in STACK.md research.
- Project was restructured by external process during execution, requiring directory recreation.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 9 CMS schemas ready for Sanity Studio configuration (Plan 01-03)
- Schema registry exports all types for Studio initialization
- TypeScript interfaces ready for GROQ query typing (Plan 01-04)
- CityService required fields will enforce content quality once content entry begins

---
*Phase: 01-architecture-and-cms-foundation*
*Completed: 2026-03-28*
