/**
 * JSON-LD: Product schema (for pricing tiers)
 * Used on: Pricing page
 */
export function buildProductSchema(data: {
  name: string
  description: string
  url: string
  brand: string
  offers: Array<{
    name: string
    price: string
    priceCurrency: string
    description: string
    url: string
  }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    url: data.url,
    brand: {
      '@type': 'Organization',
      name: data.brand,
    },
    offers: data.offers.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      description: offer.description,
      url: offer.url,
      availability: 'https://schema.org/InStock',
    })),
  }
}
