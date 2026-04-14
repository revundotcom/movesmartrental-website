import { createClient, type SanityClient } from '@sanity/client'

// Lazy client — env vars aren't required at build time. `createClient`
// validates `projectId` in its constructor, so instantiating at module
// load would crash `next build` whenever NEXT_PUBLIC_SANITY_PROJECT_ID
// is missing (e.g. preview deploys without secrets, or CI without env).
//
// Call sites access `client` as before; the Proxy defers instantiation
// until the first property/method access and returns `null` gracefully
// via `getClient()` for code paths that want to degrade cleanly.

let _client: SanityClient | null = null

export function getClient(): SanityClient | null {
  if (_client) return _client
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  if (!projectId || !dataset) return null
  _client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
  })
  return _client
}

export const client = new Proxy({} as SanityClient, {
  get(_target, prop, receiver) {
    const c = getClient()
    if (!c) {
      throw new Error(
        'Sanity client is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET env vars.',
      )
    }
    return Reflect.get(c, prop, receiver)
  },
})
