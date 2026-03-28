# Deferred Items - Phase 02

## Pre-existing Build Issues

1. **@sanity/vision useEffectEvent import error** - `@sanity/vision` imports `useEffectEvent` from React which does not exist in React 18. This causes `npm run build` to fail. Not caused by Phase 2 changes. Requires either upgrading React or pinning a compatible @sanity/vision version.
