/**
 * JSON-LD schema builders for MoveSmart Rentals.
 *
 * MoveSmart Rentals is a white-glove rental brokerage delivering full-cycle
 * leasing execution, strategic pricing, disciplined tenant qualification, and
 * complete move-in coordination for landlords, property managers, and
 * institutional rental operators.
 *
 * Contract references: §7.6 (structured data), §20.14 (SEO / schema).
 */

export {
  buildOrganizationSchema,
  type OrganizationSchemaInput,
} from './organization'
export {
  buildLocalBusinessSchema,
  type LocalBusinessSchemaInput,
} from './local-business'
export {
  buildServiceSchema,
  type ServiceSchemaInput,
} from './service-schema'
export { buildFaqPageSchema } from './faq-page'
export { buildBreadcrumbListSchema } from './breadcrumb-list'
// Spec alias - new callers may prefer buildBreadcrumbSchema.
export { buildBreadcrumbListSchema as buildBreadcrumbSchema } from './breadcrumb-list'
export { buildArticleSchema } from './article'
export { buildRealEstateListingSchema } from './real-estate-listing'
export { buildWebSiteSchema } from './website'
export { buildAggregateRatingSchema } from './aggregate-rating'
export { buildHowToSchema } from './how-to'
export { buildProductSchema } from './product'
export { buildItemListSchema } from './item-list'
export {
  buildOfferSchema,
  type OfferSchemaInput,
  type PriceSpecificationInput,
} from './offer'
export { buildReviewSchema, type ReviewSchemaInput } from './review'
export {
  buildCityServiceSchema,
  type CityServiceSchemaInput,
} from './city-service'
