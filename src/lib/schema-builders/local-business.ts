/**
 * JSON-LD: LocalBusiness + RealEstateAgent schema
 * Used on: CityService pages, City hub pages
 */
export function buildLocalBusinessSchema(data: {
  name: string
  description: string
  url: string
  phone?: string
  address: {
    streetAddress: string
    city: string
    province: string
    postalCode: string
    country: string
  }
  geo?: {
    lat: number
    lng: number
  }
  areaServed?: string
  openingHours?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.city,
      addressRegion: data.address.province,
      postalCode: data.address.postalCode,
      addressCountry: data.address.country,
    },
    geo: data.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: data.geo.lat,
          longitude: data.geo.lng,
        }
      : undefined,
    areaServed: data.areaServed,
    openingHoursSpecification: data.openingHours,
  }
}
