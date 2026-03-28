# Deferred Items - Phase 01

## Pre-existing Build Issues

### 1. @sanity/vision useEffectEvent import error
- **Discovered during:** Plan 01-04, Task 2 verification
- **Source:** `@sanity/vision` package imports `useEffectEvent` from React, which is not available in React 19 stable
- **Trace:** `src/sanity/sanity.config.ts` -> `src/app/studio/[[...tool]]/page.tsx`
- **Origin:** Plan 01-03 (Sanity data pipeline)
- **Impact:** `npm run build` fails. TypeScript compilation (`tsc --noEmit`) passes.
- **Fix needed:** Either pin `@sanity/vision` to a compatible version or remove the Vision plugin from the Studio config until the package is updated for React 19
