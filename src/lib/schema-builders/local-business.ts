/**
 * JSON-LD: LocalBusiness / RealEstateAgent schema
 * Used on: Homepage, About, CityService pages, City hub pages
 *
 * MoveSmart Rentals is a rental brokerage - the preferred schema.org subtype
 * is RealEstateAgent (which inherits from LocalBusiness). We emit both as an
 * @type array so consumers that only recognize LocalBusiness still parse it.
 */

export interface LocalBusinessSchemaInput {
  name: string
  description: string
  url: string
  phone?: string
  email?: string
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
  /**
   * Optional hasOfferCatalog - a list of leasing services this location offers.
   * Typically pointed at the 9 MoveSmart services.
   */
  hasOfferCatalog?: {
    name: string
    items: Array<{
      name: string
      description?: string
      url?: string
      serviceType?: string
    }>
  }
  /**
   * Optional aggregate rating (only if real review data is available).
   */
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
}

export function buildLocalBusinessSchema(
  data: LocalBusinessSchemaInput
): Record<string, unknown> {
  const postalAddress: Record<string, unknown> = {
    '@type': 'PostalAddress',
    addressLocality: data.address.city,
    addressRegion: data.address.province,
    addressCountry: data.address.country,
  }
  if (data.address.streetAddress) {
    postalAddress.streetAddress = data.address.streetAddress
  }
  if (data.address.postalCode) {
    postalAddress.postalCode = data.address.postalCode
  }

  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.phone ?? '+18005959755',
    email: data.email ?? 'contact@movesmartrentals.com',
    priceRange: data.priceRange ?? '$$',
    address: postalAddress,
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
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          opens: '09:00',
          closes: '18:00',
        }))
      : undefined,
    hasOfferCatalog: data.hasOfferCatalog
      ? {
          '@type': 'OfferCatalog',
          name: data.hasOfferCatalog.name,
          itemListElement: data.hasOfferCatalog.items.map((item) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: item.name,
              ...(item.description && { description: item.description }),
              ...(item.url && { url: item.url }),
              ...(item.serviceType && { serviceType: item.serviceType }),
            },
          })),
        }
      : undefined,
    aggregateRating: data.aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: data.aggregateRating.ratingValue,
          reviewCount: data.aggregateRating.reviewCount,
          bestRating: data.aggregateRating.bestRating ?? 5,
          worstRating: data.aggregateRating.worstRating ?? 1,
        }
      : undefined,
  }
}
