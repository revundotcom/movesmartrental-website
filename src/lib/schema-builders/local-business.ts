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
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.phone,
    email: 'info@movesmartrentals.com',
    priceRange: data.priceRange || 'Success-based fee — $0 upfront',
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
    openingHoursSpecification: data.openingHours
      ? data.openingHours.map(() => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        }))
      : undefined,
  }
}
