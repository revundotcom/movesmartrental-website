/**
 * JSON-LD: AggregateRating schema
 * Used on: Reviews page, LocalBusiness, Organization
 */
export function buildAggregateRatingSchema(data: {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
  itemReviewed?: {
    type: string
    name: string
    url?: string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: data.ratingValue,
    reviewCount: data.reviewCount,
    bestRating: data.bestRating ?? 5,
    worstRating: data.worstRating ?? 1,
    ...(data.itemReviewed && {
      itemReviewed: {
        '@type': data.itemReviewed.type,
        name: data.itemReviewed.name,
        url: data.itemReviewed.url,
      },
    }),
  }
}
