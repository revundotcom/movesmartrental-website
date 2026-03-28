---
phase: 03-scale-integrations-and-content-system
plan: 07
subsystem: content
tags: [sanity, cms, content-ops, sop, prompt-engineering, seo, gsc]

# Dependency graph
requires:
  - phase: 01-architecture-and-cms-foundation
    provides: "Sanity CMS schemas for City, CityService, BlogGuide with seoFields and publishingControls"
  - phase: 02-core-build-templates-and-top-cities
    provides: "All page templates, ISR revalidation, XML sitemaps"
provides:
  - "Non-developer publishing workflow SOP for cities, CityService pages, and blog content"
  - "AI prompt framework with 5 reusable templates for first-draft content generation"
  - "Weak-page refresh workflow using GSC data for identifying and improving underperforming pages"
  - "Complete content production pipeline: research -> generate -> publish -> monitor -> refresh"
affects: [04-handoff, content-entry, content-team-training]

# Tech tracking
tech-stack:
  added: []
  patterns: [content-production-pipeline, gsc-driven-refresh-workflow, ai-prompt-templating]

key-files:
  created:
    - .planning/content/publishing-workflow.md
    - .planning/content/prompt-framework.md
    - .planning/content/weak-page-refresh.md
  modified: []

key-decisions:
  - "Publishing workflow references actual Sanity schema field names (metaTitle, localBody, neighbourhoodNames, etc.) for accuracy"
  - "Prompt framework maps each template to specific Sanity CMS fields so outputs can be entered directly"
  - "Weak-page refresh uses 4 distinct weakness patterns (CTR, position, indexing, bounce) for targeted diagnosis"
  - "Refresh frequency tiered by content importance: Tier-1 monthly, Tier-2 quarterly, blog semi-annually"

patterns-established:
  - "Content production pipeline: research local data -> fill prompts -> run AI -> review -> enter into Sanity -> publish -> monitor"
  - "GSC-based page health monitoring with diagnostic checklist and priority matrix"
  - "Prompt template structure: context block with placeholders -> output format specification -> anti-patterns"

requirements-completed: [CMS-04, CMS-05, CMS-06]

# Metrics
duration: 5min
completed: 2026-03-28
---

# Phase 3 Plan 7: Content Production System Summary

**Non-developer publishing SOP, 5-prompt AI content framework, and GSC-driven weak-page refresh workflow forming a complete content production pipeline**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-28T15:59:38Z
- **Completed:** 2026-03-28T16:04:58Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created a 345-line publishing workflow SOP with step-by-step instructions for creating City (9 fields), CityService (all required fields including 3+ neighbourhoods), and BlogGuide documents -- all referencing actual Sanity schema field names
- Created a 350-line prompt framework with 5 complete AI prompt templates (city hub, CityService, FAQ, blog/guide, meta SEO), each mapped to specific CMS fields with placeholder syntax and anti-pattern guidance
- Created a 223-line weak-page refresh workflow with 4 GSC-based weakness detection patterns, 9-point diagnostic checklist, 3-tier priority matrix, and refresh frequency schedule by content tier
- All three documents cross-reference each other forming a coherent pipeline: generate content (prompts) -> publish (workflow) -> monitor and improve (refresh)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create non-developer publishing workflow SOP** - `2d59b18` (feat)
2. **Task 2: Create prompt framework and weak-page refresh workflow** - `f0fd49d` (feat)

## Files Created/Modified
- `.planning/content/publishing-workflow.md` - Step-by-step SOP for content editors to publish City, CityService, and BlogGuide documents in Sanity Studio without developer involvement, including quality checklist, troubleshooting, and field reference appendix
- `.planning/content/prompt-framework.md` - 5 reusable AI prompt templates for generating first-draft content (city descriptions, CityService localBody/heroHeadline/localRegulatory, FAQ, blog articles, meta titles/descriptions) with anti-patterns table and data source reference
- `.planning/content/weak-page-refresh.md` - Monthly workflow for identifying underperforming pages using Google Search Console data, diagnosing issues with a 9-point checklist, prioritizing refresh actions, updating content in Sanity, and tracking results over time

## Decisions Made
- Referenced actual Sanity schema field names throughout all documents (metaTitle, metaDescription, localBody, heroHeadline, neighbourhoodNames, localRegulatory, etc.) rather than generic descriptions, ensuring the SOP maps directly to what editors see in Sanity Studio
- Each prompt template specifies which Sanity CMS fields the output maps to, so editors know exactly where to paste generated content
- Weak-page refresh uses 4 distinct weakness patterns (high impressions/low CTR, declining position, zero impressions, high bounce) rather than a single metric, because different problems require different solutions
- Refresh frequency tiered by business importance: Tier-1 Ontario cities monthly, Tier-2 quarterly, blogs semi-annually

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness
- Content production pipeline complete: content team can now generate, publish, and maintain content independently
- All three documents ready for Phase 4 handoff training materials
- Prompt framework integrates with the publishing workflow for end-to-end content creation
- Weak-page refresh workflow will become actionable once GSC is connected (Plan 03-04) and data accumulates

## Self-Check: PASSED

- FOUND: .planning/content/publishing-workflow.md (345 lines, min 80)
- FOUND: .planning/content/prompt-framework.md (350 lines, min 100)
- FOUND: .planning/content/weak-page-refresh.md (223 lines, min 50)
- FOUND: commit 2d59b18 (Task 1)
- FOUND: commit f0fd49d (Task 2)

---
*Phase: 03-scale-integrations-and-content-system*
*Completed: 2026-03-28*
