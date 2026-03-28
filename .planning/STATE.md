---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: completed
stopped_at: Completed 04-04-PLAN.md
last_updated: "2026-03-28T16:36:30.741Z"
last_activity: 2026-03-28 — Completed 04-04-PLAN.md (source code transfer checklist, clone-deploy verification)
progress:
  total_phases: 4
  completed_phases: 4
  total_plans: 28
  completed_plans: 28
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-28)

**Core value:** A search-dominant acquisition system that attracts property owners and tenants organically and scales to new local markets without rebuilding the architecture.
**Current focus:** Phase 4 — Audit, Hardening, and Handoff

## Current Position

Phase: 4 of 4 (Audit, Hardening, and Handoff)
Plan: 4 of 4 in current phase
Status: Complete
Last activity: 2026-03-28 — Completed 04-04-PLAN.md (source code transfer checklist, clone-deploy verification)

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: —
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 01 P01 | 13min | 2 tasks | 39 files |
| Phase 01 P02 | 14min | 2 tasks | 14 files |
| Phase 01 P03 | 9min | 2 tasks | 21 files |
| Phase 01 P04 | 4min | 2 tasks | 5 files |
| Phase 01 P05 | 4min | 2 tasks | 6 files |
| Phase 01 P06 | 4min | 2 tasks | 6 files |
| Phase 02 P01 | 2min | 2 tasks | 9 files |
| Phase 02 P02 | 4min | 2 tasks | 4 files |
| Phase 02 P03 | 2min | 1 tasks | 1 files |
| Phase 02 P05 | 5min | 2 tasks | 4 files |
| Phase 02 P07 | 5min | 2 tasks | 2 files |
| Phase 02 P04 | 6min | 2 tasks | 6 files |
| Phase 02 P08 | 8min | 2 tasks | 6 files |
| Phase 02 P06 | 10min | 2 tasks | 5 files |
| Phase 02 P09 | 1min | 1 tasks | 1 files |
| Phase 02 P10 | 10min | 2 tasks | 2 files |
| Phase 03 P04 | 2min | 2 tasks | 3 files |
| Phase 03 P05 | 2min | 2 tasks | 3 files |
| Phase 03 P01 | 4min | 2 tasks | 5 files |
| Phase 03 P03 | 4min | 2 tasks | 3 files |
| Phase 03 P07 | 5min | 2 tasks | 3 files |
| Phase 03 P02 | 7min | 2 tasks | 5 files |
| Phase 03 P06 | 2min | 2 tasks | 7 files |
| Phase 03 P08 | 1min | 2 tasks | 2 files |
| Phase 04 P01 | 3min | 2 tasks | 4 files |
| Phase 04 P02 | 3min | 2 tasks | 3 files |
| Phase 04 P03 | 5min | 2 tasks | 3 files |
| Phase 04 P04 | 2min | 1 tasks | 1 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-Phase 1]: Stay on Next.js 15.2.4 (not 16) — 5 breaking changes in Next.js 16 would consume sprint days with no SEO value
- [Pre-Phase 1]: Sanity Free Tier ($0) confirmed — 500K API req/mo and 20GB bandwidth sufficient for launch
- [Pre-Phase 1]: Ontario-first ISR strategy — pre-render only Tier-1 ~320 pages at build time; on-demand ISR for remainder (avoids 45-min Vercel build timeout)
- [Pre-Phase 1]: CMS required-field enforcement must be Phase 1 — cannot be retrofitted after city pages are published (thin content deindexing risk)
- [Phase 01]: Used next-sanity@11.6.12 with sanity@4.22.0 for Next.js 15 compatibility (latest v12 requires Next.js 16)
- [Phase 01]: Organized public routes under (site) route group for shared layout in plan 01-04
- [Phase 01]: CityService uses fieldset grouping for Studio UX (references, denormalized, localContent, hero, blocks)
- [Phase 01]: neighbourhoodNames requires min(3) items to enforce content depth on city-service pages
- [Phase 01]: Portable text link annotations include allowRelative: true for internal navigation
- [Phase 01]: sanityFetch() is the single CMS data access point -- all page queries go through it for tag-based ISR revalidation
- [Phase 01]: Sanity Studio layout overrides root layout for full-screen embed at /studio
- [Phase 01]: CityService GROQ queries filter by city+service+province triple-slug for geographic disambiguation
- [Phase 01]: JSON-LD sanitization escapes < as \\u003c to prevent XSS via script injection
- [Phase 01]: Used base-ui render prop for NavigationMenuLink and BreadcrumbLink composition with next/link
- [Phase 01]: BreadcrumbNav uses inline script tag for JSON-LD (Plan 03 JsonLd component may not exist yet)
- [Phase 01]: Created src/types/blocks.ts as Rule 3 auto-fix since Plan 05 not yet executed -- shared type definitions for all 10 blocks
- [Phase 01]: PropertyCardBlock uses placeholder URL /ca/{province}/{city}/rentals/{slug}/ pattern for listing links
- [Phase 01]: Used base-ui render prop (render={<Link>}) for Button-as-Link composition in HeroBlock and CTABannerBlock
- [Phase 01]: FAQBlock schemaEnabled defaults to true for SEO-first approach
- [Phase 01]: ServiceGridBlock uses static ICON_MAP lookup (8 Lucide icons) to stay as Server Component
- [Phase 02]: Bedroom route placed under [service] segment (not [propertyType]) to avoid Next.js dynamic segment name conflict
- [Phase 02]: Property type pages served by existing [service] dynamic segment since both occupy same URL level
- [Phase 02]: Sanity image URL built from asset _ref without @sanity/image-url package (zero added deps)
- [Phase 02]: Blog/guide list query uses GROQ select() for optional category filtering in a single query
- [Phase 02]: Aggregated FAQ query uses GROQ spread operator to flatten FAQ items from services and cityServices
- [Phase 02]: PortableTextBody is a Server Component (no use client) since @portabletext/react supports RSC
- [Phase 02]: Homepage portal and franchising sections are custom inline JSX (not block components) since they are homepage-specific
- [Phase 02]: Homepage FAQ uses 6 hardcoded general questions with schemaEnabled for FAQ JSON-LD
- [Phase 02]: Property category template placed in [service]/page.tsx per 02-02 resolution -- Next.js shares segment for services and property types
- [Phase 02]: Bedroom slug parsed via regex with notFound() for invalid formats
- [Phase 02]: UNIVERSAL_RESOURCE_QUERY uses GROQ conditional projection for multi-type slug resolution in a single query
- [Phase 02]: Comparison table uses semantic HTML table with Tailwind alternating row colors
- [Phase 02]: Contact form uses native HTML select/textarea (not Radix) to avoid unnecessary complexity
- [Phase 02]: FAQ hub falls back to hardcoded categorized FAQs when CMS is empty
- [Phase 02]: FAQBlock schemaEnabled=false on FAQ hub -- single FAQPage JSON-LD injected via JsonLd for aggregated set
- [Phase 02]: TMPL-21 Portal/Technology satisfied by Owners hub section (Plan 04) -- no dedicated page
- [Phase 02]: SERVICE_PAGE_QUERY enhanced with availableCities sub-query joining through cityService documents
- [Phase 02]: Owner hub messaging hardcoded (not CMS) because contract-required points must always render
- [Phase 02]: Locations hub uses single PROVINCES_WITH_CITIES_QUERY for all provinces with nested cities in one request
- [Phase 02]: CityService and PropertyCategory coexist in [service] segment via dispatch pattern (CityService checked first)
- [Phase 02]: ServiceGridBlock extended with basePath prop for city-context geographic links
- [Phase 02]: Sitemap uses inline minimal GROQ projections (slug-only) instead of importing page queries to minimize CMS payload
- [Phase 02]: Tier-based sitemap priority scoring: Tier-1 cities 0.8-0.9, others 0.6-0.7 for crawl budget optimization
- [Phase 02]: Blog guides and comparisons/case studies in separate sitemap segments (blog vs resources) despite shared /resources/ URL prefix
- [Phase 02]: Region-based content grouping (6 regions) for genuinely unique CityService content differentiation
- [Phase 02]: Batched Sanity transactions at 30 docs/batch for API efficiency without rate limits
- [Phase 02]: Deterministic IDs (city-toronto, cityservice-toronto-tenant-placement) for idempotent seeding re-runs
- [Phase 03]: Removed duplicate Window.dataLayer declaration to avoid conflict with @next/third-parties type definitions
- [Phase 03]: reCAPTCHA v3 script loaded dynamically via useEffect (not global script tag) to avoid loading on non-form pages
- [Phase 03]: Graceful degradation when RECAPTCHA env vars not set -- form works without spam protection in local dev
- [Phase 03]: Server-side zod validation duplicated in API route for defense-in-depth (not imported to keep API route self-contained)
- [Phase 03]: Priority scoring: tier 40%, population 30%, service coverage 30% -- tier weighted highest for established service pages
- [Phase 03]: Static CSV baseline with all 73 known cities pre-populated; script regenerates from live CMS data on demand
- [Phase 03]: US city slugs prefixed with state abbreviation (fl-miami, tx-houston) matching 03-02 deterministic ID convention
- [Phase 03]: Country hub pages use hardcoded intro sections (not CMS) since they are thin geographic entry points
- [Phase 03]: US hub page reuses COUNTRY_PROVINCES_QUERY with country='us' param for architectural symmetry with Canada hub
- [Phase 03]: Non-Ontario provinces seeded as Tier-2 cities since they are secondary market cities
- [Phase 03]: Publishing workflow references actual Sanity schema field names (metaTitle, localBody, neighbourhoodNames, etc.) for SOP accuracy
- [Phase 03]: Each prompt template maps output to specific Sanity CMS fields so editors paste directly into correct fields
- [Phase 03]: Weak-page refresh uses 4 distinct GSC patterns (CTR, position, indexing, bounce) with tiered priority matrix
- [Phase 03]: Refresh frequency tiered by business importance: Tier-1 monthly, Tier-2 quarterly, blogs semi-annually
- [Phase 03]: City IDs use state abbreviation prefix (city-fl-miami) for cross-country uniqueness
- [Phase 03]: US cities seeded as Tier 2 (expansion market, not core)
- [Phase 03]: US service pages show Coming Soon fallback when no CityService data exists
- [Phase 03]: Sitemap CA queries now explicitly filter country=ca to prevent US data leaking into CA segments
- [Phase 03]: Dashboard guide covers all 9 GA4 event types plus engagement events; Analytics API returns CMS counts only (user analytics in Looker Studio)
- [Phase 03]: CTATracker wraps Server Component CTAs as Client Component span with onClick -- composition avoids converting parent to Client Component
- [Phase 03]: CTA event type inferred from href pattern (account/signup -> account_creation, else book_a_call)
- [Phase 04]: AVIF listed before WebP in formats array for best compression with automatic fallback
- [Phase 04]: Explicit deviceSizes and imageSizes in next.config.ts to survive future config changes
- [Phase 04]: Passive: true added to LinkTracker click listener since handler never calls preventDefault()
- [Phase 04]: Grouped env vars by service in .env.example with inline comments for self-documenting config
- [Phase 04]: Credentials doc uses checklist format with post-transfer verification and security notes
- [Phase 04]: CMS content model reference documents schemas in frequency-of-use order (City first, PropertyListing last) for editor convenience
- [Phase 04]: Training session structured as 3 modules (20+30+20 min) targeting 60-90 minute delivery window
- [Phase 04]: Glossary defines 20 terms using non-technical language (ISR, GROQ, canonical, slug, thin content, CDN, etc.)
- [Phase 04]: Option C (fresh push) highlighted as current situation since no remote is configured

### Pending Todos

None yet.

### Blockers/Concerns

- [Pre-Phase 1]: Sanity plan pricing discrepancy — PROJECT.md referenced $374/month but current Growth plan is $15/seat/month. Free Tier ($0) confirmed as the plan. Verify with client if any paid plan is ever needed.
- [Pre-Phase 1]: Content briefs for 16+ page family types do not exist yet — editorial dependency that must be resolved before Phase 2 content entry begins
- [Pre-Phase 1]: US state compliance framing (Florida, Texas, California) requires state-specific legal research before Phase 3 US content is written

## Session Continuity

Last session: 2026-03-28T16:34:55.116Z
Stopped at: Completed 04-04-PLAN.md
Resume file: None
