---
phase: 03-scale-integrations-and-content-system
plan: 05
subsystem: integrations
tags: [recaptcha, spam-protection, ai-discoverability, llms-txt, contact-form, api-route]

# Dependency graph
requires:
  - phase: 02-core-build
    provides: "Contact form component with react-hook-form + zod validation"
provides:
  - "reCAPTCHA v3 invisible spam protection on contact form"
  - "Contact API endpoint with server-side reCAPTCHA verification"
  - "llms.txt file for AI crawler discoverability"
affects: [04-audit-hardening-handoff]

# Tech tracking
tech-stack:
  added: [google-recaptcha-v3]
  patterns: [dynamic-script-loading, server-side-token-verification, graceful-degradation]

key-files:
  created:
    - src/app/api/contact/route.ts
    - public/llms.txt
  modified:
    - src/components/contact-form.tsx

key-decisions:
  - "reCAPTCHA v3 script loaded dynamically via useEffect (not global script tag) to avoid loading on non-form pages"
  - "Graceful degradation when RECAPTCHA env vars not set -- form works without spam protection in local dev"
  - "Server-side zod validation duplicated in API route for defense-in-depth (not imported to keep API route self-contained)"

patterns-established:
  - "Dynamic third-party script loading: useEffect with cleanup for script lifecycle management"
  - "API route graceful degradation: check env vars and skip external service calls when not configured"

requirements-completed: [INT-02, AI-03]

# Metrics
duration: 2min
completed: 2026-03-28
---

# Phase 3 Plan 5: reCAPTCHA v3 + llms.txt Summary

**Invisible reCAPTCHA v3 spam protection on contact form with server-side token verification API and llms.txt AI crawler discoverability file**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-28T15:59:33Z
- **Completed:** 2026-03-28T16:01:33Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Contact form now sends invisible reCAPTCHA v3 token with every submission (no user interaction required)
- Server-side API route at /api/contact verifies reCAPTCHA token via Google siteverify API (score >= 0.5)
- Full graceful degradation -- form works without reCAPTCHA configured (for local dev and pre-key setup)
- llms.txt file documents all 8 services, 5 Canadian provinces, 10 US states for AI crawler discoverability

## Task Commits

Each task was committed atomically:

1. **Task 1: Add reCAPTCHA v3 to contact form and create API route** - `ba4e885` (feat)
2. **Task 2: Create llms.txt file for AI discoverability** - `c3cd15f` (feat)

## Files Created/Modified
- `src/components/contact-form.tsx` - Updated with reCAPTCHA v3 dynamic script loading, token acquisition, API submission, error state handling
- `src/app/api/contact/route.ts` - New POST endpoint with zod validation, reCAPTCHA token verification, graceful degradation
- `public/llms.txt` - AI crawler guidance file following llmstxt.org specification with full site structure

## Decisions Made
- reCAPTCHA v3 script loaded dynamically via useEffect (not global script tag) to avoid loading on non-form pages
- Graceful degradation when RECAPTCHA env vars not set -- form works without spam protection in local dev
- Server-side zod validation duplicated in API route for defense-in-depth (not imported to keep API route self-contained)
- Window.grecaptcha TypeScript declaration added inline (no @types package needed for v3)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

External services require manual configuration:
- **NEXT_PUBLIC_RECAPTCHA_SITE_KEY**: Google reCAPTCHA Admin Console > Settings > Site key (use reCAPTCHA v3)
- **RECAPTCHA_SECRET_KEY**: Google reCAPTCHA Admin Console > Settings > Secret key
- **Dashboard setup**: https://www.google.com/recaptcha/admin > Create (+) > reCAPTCHA v3 > add domain movesmartrentals.com

The form works without these keys (graceful degradation) but spam protection will not be active until configured.

## Next Phase Readiness
- Contact form is fully wired to API endpoint, ready for email notification integration
- reCAPTCHA keys need to be configured in Vercel environment variables before production deployment
- llms.txt is static and ready for deployment -- no additional configuration needed

## Self-Check: PASSED

All files verified present, all commits found, all line count minimums exceeded.

---
*Phase: 03-scale-integrations-and-content-system*
*Completed: 2026-03-28*
