# Deferred Items - Phase 04

## Pre-existing Build Failure

**Discovered during:** 04-01 (CWV & Image Optimization)
**Issue:** `@sanity/vision` imports `useEffectEvent` from React, which is not exported in the current React version (React 19). This causes `next build` to fail.
**Trace:** `@sanity/vision/lib/_chunks-es/SanityVision.js` -> `src/sanity/sanity.config.ts` -> `src/app/studio/[[...tool]]/page.tsx`
**Impact:** Build fails for all plans, not just 04-01. Verified this failure exists on clean `main` branch before any 04-01 changes.
**Suggested fix:** Update `@sanity/vision` to a version compatible with the installed React version, or pin React to a compatible version.
