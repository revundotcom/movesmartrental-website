/**
 * JSON-LD: RealEstateListing schema
 * Used on: Property listing pages
 */
export function buildRealEstateListingSchema(data: {
  name: string
  price: number
  address: string
  numberOfRooms?: number
  bathrooms?: number
  sqft?: number
  url: string
  images?: string[]
  available?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: data.name,
    url: data.url,
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: 'CAD',
      availability: data.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address,
    },
    numberOfRooms: data.numberOfRooms,
    numberOfBathroomsTotal: data.bathrooms,
    floorSize: data.sqft
      ? {
          '@type': 'QuantitativeValue',
          value: data.sqft,
          unitCode: 'FTK',
        }
      : undefined,
    image: data.images || [],
  }
}
