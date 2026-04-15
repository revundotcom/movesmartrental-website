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
    // without secrets). Return [] so callers that expect arrays (most
    // generateStaticParams usages) can call .filter/.map without crashing;
    // callers expecting a single object generally use `data?.field ?? fallback`
    // patterns, which also degrade safely against [].
    return [] as unknown as T
  }
  return await client.fetch<T>(query, params, {
    next: { tags },
  })
}
