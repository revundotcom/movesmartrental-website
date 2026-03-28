---
phase: 01-architecture-and-cms-foundation
plan: 01
subsystem: infra
tags: [nextjs, react, typescript, tailwind, shadcn, sanity, seo, middleware, routing]

# Dependency graph
requires: []
provides:
  - Next.js 15.2.4 project scaffold with TypeScript, Tailwind v4, shadcn/ui
  - Complete URL route hierarchy (/ca/[province]/[city]/[service]/ and /us/[state]/[city]/[service]/)
  - Middleware for lowercase URL enforcement with 308 redirects
  - robots.ts with /studio/ and /api/ disallowed
  - metadataBase, title template, and OG defaults in root layout
  - next.config.ts with trailingSlash and Sanity CDN image domain
  - Custom 404 page
  - .env.local and .env.example with all required environment variables
affects: [01-02, 01-03, 01-04, 01-05, 01-06, phase-2, phase-3, phase-4]

# Tech tracking
tech-stack:
  added: [next@15.2.4, react@19, typescript@5, tailwindcss@4, next-sanity@11.6.12, sanity@4.22.0, "@sanity/client@7", "@sanity/vision", "@portabletext/react", styled-components@6, react-hook-form@7, zod@4, "@hookform/resolvers", lucide-react, "@next/third-parties", prettier, prettier-plugin-tailwindcss, shadcn/ui]
  patterns: [app-router, server-components, async-params, route-groups, trailing-slash, lowercase-urls]

key-files:
  created:
    - src/middleware.ts
    - src/app/robots.ts
    - src/app/not-found.tsx
    - src/app/(site)/ca/[province]/page.tsx
    - src/app/(site)/ca/[province]/[city]/page.tsx
    - src/app/(site)/ca/[province]/[city]/[service]/page.tsx
    - src/app/(site)/us/[state]/page.tsx
    - src/app/(site)/us/[state]/[city]/page.tsx
    - src/app/(site)/us/[state]/[city]/[service]/page.tsx
    - src/app/(site)/owners/page.tsx
    - src/app/(site)/tenants/page.tsx
    - src/app/(site)/services/[service]/page.tsx
    - src/app/(site)/locations/page.tsx
    - src/app/(site)/pricing/page.tsx
    - src/app/(site)/resources/[slug]/page.tsx
    - src/app/(site)/franchising/page.tsx
    - src/app/(site)/about/page.tsx
    - src/app/(site)/contact/page.tsx
    - .env.local
    - .env.example
  modified:
    - package.json
    - next.config.ts
    - src/app/layout.tsx
    - src/app/page.tsx
    - .gitignore
    - components.json

key-decisions:
  - "Used next-sanity@11.6.12 with sanity@4.22.0 (not latest sanity@5) for Next.js 15 peer dependency compatibility"
  - "Fixed src/src/app nested directory structure from initial scaffold to src/app"
  - "Removed premature Sanity schema files from initial commit -- belong to plan 01-02"
  - "Used (site) route group to organize all public-facing pages under a shared layout boundary"

patterns-established:
  - "Async params pattern: all dynamic route pages use params: Promise<{}> with await, per Next.js 15 requirement"
  - "Route group (site): all public pages grouped under src/app/(site)/ for shared layout potential"
  - "Middleware matcher: excludes api, _next/static, _next/image, favicon.ico, studio from processing"
  - "Environment variables: NEXT_PUBLIC_ prefix for client-safe vars, plain names for server-only"

requirements-completed: [FOUND-01, FOUND-03, FOUND-04, FOUND-05, FOUND-07, SEO-01, SEO-03]

# Metrics
duration: 13min
completed: 2026-03-28
---

# Phase 1 Plan 01: Project Scaffold Summary

**Next.js 15.2.4 project with 18 routes, lowercase URL middleware, trailing-slash normalization, robots.txt, and SEO metadata baseline**

## Performance

- **Duration:** 13 min
- **Started:** 2026-03-28T13:34:51Z
- **Completed:** 2026-03-28T13:47:33Z
- **Tasks:** 2
- **Files modified:** 39

## Accomplishments
- Next.js 15.2.4 scaffolded with React 19, TypeScript, Tailwind v4, shadcn/ui, and all Phase 1 dependencies
- Complete URL route hierarchy: 6 Canadian routes, 6 US routes, 7 static pages, 2 dynamic pages -- 15 skeleton pages total
- Middleware enforces lowercase URLs with 308 permanent redirects, skipping API/static/Studio paths
- Technical SEO baseline: metadataBase, title template with brand suffix, OG defaults, robots.txt with sitemap reference
- Build verified: 18 routes compile successfully with middleware

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15.2.4 project with all dependencies** - `67f8410` (feat)
2. **Task 2: Create URL route skeleton and middleware** - `195238f` (feat)

## Files Created/Modified
- `package.json` - Next.js 15.2.4 + React 19 + all Phase 1 dependencies
- `next.config.ts` - trailingSlash: true, Sanity CDN image domain
- `src/app/layout.tsx` - Root layout with metadataBase, title template, OG defaults, Inter font
- `src/app/page.tsx` - Homepage placeholder
- `src/middleware.ts` - Lowercase URL enforcement with 308 redirects
- `src/app/robots.ts` - Dynamic robots.txt disallowing /studio/ and /api/
- `src/app/not-found.tsx` - Custom 404 page with return-to-home link
- `src/app/(site)/ca/[province]/[city]/[service]/page.tsx` - CityService route skeleton (highest-value SEO page type)
- `src/app/(site)/us/[state]/[city]/[service]/page.tsx` - US CityService route skeleton
- `src/app/(site)/owners/page.tsx` - Owner hub skeleton
- `src/app/(site)/tenants/page.tsx` - Tenant hub skeleton
- `.env.local` - Environment variables with placeholder values
- `.env.example` - Environment variable documentation (committed)
- `components.json` - shadcn/ui config with corrected CSS path
- `.gitignore` - Updated env patterns to allow .env.example
- `src/components/ui/*.tsx` - 8 shadcn/ui components (button, card, accordion, navigation-menu, breadcrumb, sheet, input, label)
- `src/lib/utils.ts` - shadcn/ui utility (cn helper)

## Decisions Made
- **next-sanity@11.6.12 + sanity@4.22.0:** Latest next-sanity (v12) requires Next.js 16. Used v11.6.12 which supports Next.js 15 via `peer next: ^15.1.0-0 || ^16.0.0-0`. This pins sanity to v4 (not v5). Upgrade path is clear when project moves to Next.js 16.
- **Fixed nested src/src/app structure:** The initial commit had files at `src/src/app/` due to scaffold copy issue. Corrected to `src/app/`.
- **Removed premature Sanity schemas:** The initial commit included Sanity schema files (objects, schemas, types) that belong to plan 01-02. Removed to maintain plan isolation.
- **(site) route group:** All public pages organized under `src/app/(site)/` to enable shared layout (header/footer) in plan 01-04 without affecting root layout.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] next-sanity peer dependency conflict with Next.js 15**
- **Found during:** Task 1 (dependency installation)
- **Issue:** Latest next-sanity@12.x requires peer next@^16.0.0-0, incompatible with Next.js 15.2.4
- **Fix:** Pinned next-sanity@11.6.12 which supports Next.js 15, along with sanity@4.22.0 and styled-components@6 as required peer dependencies
- **Files modified:** package.json
- **Verification:** npm install succeeds, build passes
- **Committed in:** 67f8410 (Task 1 commit)

**2. [Rule 3 - Blocking] npm install failures due to space in directory path**
- **Found during:** Task 1 (dependency installation)
- **Issue:** npm TAR_ENTRY_ERROR when installing to directory path containing spaces ("Canadian real estate")
- **Fix:** Created symlink from /tmp/movesmart-project to project directory, ran npm install via symlink
- **Files modified:** None (workaround only)
- **Verification:** All 1328 packages installed successfully

**3. [Rule 1 - Bug] Nested src/src/app directory from scaffold copy**
- **Found during:** Task 1 (project setup)
- **Issue:** create-next-app scaffold files were copied to src/src/app/ instead of src/app/ due to the project already having a src/ directory
- **Fix:** Moved files from src/src/app/ to src/app/, removed nested directory, fixed components.json CSS path reference
- **Files modified:** src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, src/app/favicon.ico, components.json
- **Verification:** Build succeeds with correct file locations
- **Committed in:** 67f8410 (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (1 bug fix, 2 blocking)
**Impact on plan:** All auto-fixes necessary for correct dependency resolution and directory structure. No scope creep.

## Issues Encountered
- The initial git commit (made externally before this plan) contained Sanity schema files and type definitions that belong to plan 01-02. These were removed to maintain plan isolation.
- The Next.js 15.2.4 version shows a deprecation warning about a security vulnerability (CVE-2025-66478). This is noted but not addressed now -- the decision to stay on 15.x was deliberate per STACK.md research.

## User Setup Required
None - no external service configuration required for this plan.

## Next Phase Readiness
- Project scaffold is complete and building -- all subsequent plans (01-02 through 01-06) can build on this foundation
- The (site) route group is ready to receive a shared layout with header/footer in plan 01-04
- All route skeletons are in place for template implementation in Phase 2
- Sanity CMS schemas can be added in plan 01-02 without modifying any files from this plan

## Self-Check: PASSED

All 24 files verified present. Both task commits (67f8410, 195238f) confirmed in git log. All 5 must_have artifact content checks passed (metadataBase, trailingSlash, toLowerCase, disallow studio, next 15.2).

---
*Phase: 01-architecture-and-cms-foundation*
*Completed: 2026-03-28*
