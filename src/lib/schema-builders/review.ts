/**
 * JSON-LD: Review schema
 * Used on: Testimonials section, Service pages, CityService pages
 *
 * IMPORTANT: Do NOT fabricate reviews. Callers MUST supply real author names,
 * ratings, and review text. The itemReviewed should be the specific service
 * (e.g. "Tenant Placement Service") or the LocalBusiness entity.
 */

export interface ReviewSchemaInput {
  author: string
  /**
   * ISO date the review was published (YYYY-MM-DD or full ISO timestamp).
   */
  datePublished: string
  reviewBody: string
  reviewRating: {
    ratingValue: number
    bestRating?: number
    worstRating?: number
  }
  /**
   * The service/business being reviewed. For MoveSmart this is typically one
   * of the 9 leasing services, or the LocalBusiness as a whole.
   */
  itemReviewed: {
    /**
     * Schema.org type - e.g. "Service", "RealEstateAgent", "LocalBusiness".
     */
    type: string
    name: string
    url?: string
  }
  /**
   * Optional publisher (e.g. "Google Reviews", "MoveSmart Rentals").
   */
  publisher?: string
  /**
   * Optional short headline / review title.
   */
  headline?: string
  /**
   * Optional location the reviewer was based in (city name).
   */
  locationCity?: string
}

export function buildReviewSchema(
  data: ReviewSchemaInput
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: data.author,
      ...(data.locationCity && {
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.locationCity,
        },
      }),
    },
    datePublished: data.datePublished,
    reviewBody: data.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.reviewRating.ratingValue,
      bestRating: data.reviewRating.bestRating ?? 5,
      worstRating: data.reviewRating.worstRating ?? 1,
    },
    itemReviewed: {
      '@type': data.itemReviewed.type,
      name: data.itemReviewed.name,
      ...(data.itemReviewed.url && { url: data.itemReviewed.url }),
    },
  }

  if (data.headline) schema.headline = data.headline
  if (data.publisher) {
    schema.publisher = {
      '@type': 'Organization',
      name: data.publisher,
    }
  }

  return schema
}
