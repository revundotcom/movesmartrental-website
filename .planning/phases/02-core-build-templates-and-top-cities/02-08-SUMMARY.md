---
phase: 02-core-build-templates-and-top-cities
plan: 08
subsystem: ui
tags: [next.js, react-hook-form, zod, json-ld, seo, static-pages]

# Dependency graph
requires:
  - phase: 02-core-build-templates-and-top-cities
    provides: Block components (HeroBlock, FAQBlock, CTABannerBlock, BenefitsBlock, HowItWorksBlock, TrustBlock), BreadcrumbNav, schema-builders, AGGREGATED_FAQ_QUERY
provides:
  - Pricing page with 3 tiers and feature comparison table
  - About page with Organization JSON-LD
  - Contact page with validated form (react-hook-form + zod)
  - ContactForm reusable client component
  - Franchising page with benefits and 4-step process
  - FAQ hub with aggregated FAQPage JSON-LD and CMS fallback
affects: [03-advanced-features, contact-api, lead-capture]

# Tech tracking
tech-stack:
  added: []
  patterns: [contact-form-validation-with-zod-v4, faq-hub-cms-fallback-pattern, static-page-template-pattern]

key-files:
  created:
    - src/components/contact-form.tsx
  modified:
    - src/app/(site)/pricing/page.tsx
    - src/app/(site)/about/page.tsx
    - src/app/(site)/contact/page.tsx
    - src/app/(site)/franchising/page.tsx
    - src/app/(site)/faq/page.tsx

key-decisions:
  - "Contact form uses native HTML select and textarea (not Radix) to avoid complexity"
  - "FAQ hub falls back to hardcoded categorized FAQs when CMS is empty"
  - "FAQBlock schemaEnabled=false on FAQ hub -- JSON-LD injected separately via JsonLd for full aggregated set"
  - "TMPL-21 Portal/Technology satisfied by Owners hub section (Plan 04) -- no dedicated page created"

patterns-established:
  - "Static page template: BreadcrumbNav + HeroBlock + content sections + CTABannerBlock"
  - "Contact form validation: zod v4 schema + react-hook-form + zodResolver"
  - "FAQ hub CMS fallback: fetch aggregated query, if empty use hardcoded fallbacks grouped by category"

requirements-completed: [TMPL-06, TMPL-08, TMPL-09, TMPL-10, TMPL-11, TMPL-21, SCHEMA-03, SEO-06]

# Metrics
duration: 8min
completed: 2026-03-28
---

# Phase 2 Plan 08: Static Pages Summary

**5 static page templates (Pricing, About, Contact, Franchising, FAQ hub) with validated contact form and FAQPage JSON-LD**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-28T15:19:40Z
- **Completed:** 2026-03-28T15:27:17Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Pricing page with 3 service tiers (Self-Serve, Full Service, Premium), feature comparison table, and pricing FAQ
- About page with Organization JSON-LD, company story, differentiators (BenefitsBlock), and trust stats
- Contact page with ContactForm client component using react-hook-form + zod v4 validation (5 fields, error messages, success state)
- Franchising page with 6 benefits (BenefitsBlock), 4-step process (HowItWorksBlock), and franchise FAQ
- FAQ hub fetching aggregated FAQ from CMS via AGGREGATED_FAQ_QUERY, with fallback to hardcoded categorized FAQs (owner/tenant/general) and FAQPage JSON-LD

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Pricing, About, and Contact pages with form component** - `db3f95a` (feat)
2. **Task 2: Build Franchising page and FAQ hub with aggregated JSON-LD** - `06a88c0` (feat)

## Files Created/Modified
- `src/app/(site)/pricing/page.tsx` - Pricing page with 3 tiers, comparison table, FAQ (245 lines)
- `src/app/(site)/about/page.tsx` - About page with Organization JSON-LD, story, differentiators (127 lines)
- `src/app/(site)/contact/page.tsx` - Contact page server wrapper with form and info cards (110 lines)
- `src/components/contact-form.tsx` - Client component with react-hook-form + zod validation (157 lines)
- `src/app/(site)/franchising/page.tsx` - Franchising page with benefits, process, FAQ (149 lines)
- `src/app/(site)/faq/page.tsx` - FAQ hub with CMS aggregation and fallback (173 lines)

## Decisions Made
- Contact form uses native HTML `<select>` and `<textarea>` instead of Radix components to reduce bundle size and complexity
- FAQ hub falls back to hardcoded categorized FAQs when CMS returns no data, ensuring the page always has content
- Individual FAQBlock instances on FAQ hub have schemaEnabled=false; a single FAQPage JSON-LD is injected via JsonLd component for the full aggregated set
- TMPL-21 (Portal/Technology) is satisfied by the Owners hub portal section from Plan 04, not a dedicated page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 5 static page templates complete and navigation structure finalized
- ContactForm ready for backend API integration in Phase 3+
- FAQ hub ready to display CMS content once Sanity documents are populated

## Self-Check: PASSED

All 6 files verified present. Both task commits (db3f95a, 06a88c0) verified in git log.

---
*Phase: 02-core-build-templates-and-top-cities*
*Completed: 2026-03-28*
