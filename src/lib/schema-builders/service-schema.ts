/**
 * JSON-LD: Service schema
 * Used on: CityService pages, Service hub pages
 */
export function buildServiceSchema(data: {
  name: string
  description: string
  url: string
  provider: {
    name: string
    url: string
  }
  areaServed?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    url: data.url,
    provider: {
      '@type': 'Organization',
      name: data.provider.name,
      url: data.provider.url,
    },
    areaServed: data.areaServed,
  }
}
