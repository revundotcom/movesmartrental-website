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
    // without secrets). Return null so `sanityData ?? fallback` patterns
    // trigger correctly for single-doc queries. Array callers must use
    // `?? []` before calling .filter/.map.
    return null as unknown as T
  }
  return await client.fetch<T>(query, params, {
    next: { tags },
  })
}
