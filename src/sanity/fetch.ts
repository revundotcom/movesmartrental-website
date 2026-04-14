import { getClient } from './client'

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  const client = getClient()
  if (!client) {
    // Sanity env vars missing (typical during build or preview deploys
    // without secrets). Return null so callers can fall back to local
    // data instead of crashing `next build` / route data collection.
    return null as T
  }
  return await client.fetch<T>(query, params, {
    next: { tags },
  })
}
