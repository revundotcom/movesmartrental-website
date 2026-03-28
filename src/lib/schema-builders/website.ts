/**
 * JSON-LD: WebSite schema with SearchAction (Sitelinks Searchbox)
 * Used on: Homepage
 */
export function buildWebSiteSchema(data: { url: string; name: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.url}/resources/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
