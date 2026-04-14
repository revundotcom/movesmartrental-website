/**
 * JSON-LD: Offer schema
 * Used on: Pricing page, Service pages, CityService pages
 *
 * For MoveSmart Rentals the canonical offers are:
 *   1. Standard Leasing Success Fee - zero upfront + success fee on placement
 *      (typically equivalent to one month's contracted rent).
 *   2. Institutional Lease-Up - Custom RFP pricing for multi-unit lease-up.
 *   3. Rent Protection Add-On - optional add-on for rental protection.
 *
 * Prices are intentionally NOT hardcoded to a dollar amount. The standard
 * leasing success fee is structured with an upfront price of "0" plus a
 * descriptive priceSpecification explaining the success-fee model.
 */

export interface OfferSchemaInput {
  name: string
  description: string
  url?: string
  /**
   * Headline price. For the success-fee model use "0" (zero upfront).
   */
  price?: string
  priceCurrency?: string
  /**
   * priceRange label (e.g. "$$") used when price is non-numeric / variable.
   */
  priceRange?: string
  /**
   * Free-form price specification (used to describe "zero upfront + success
   * fee on placement"). Accepts either a single spec or an array.
   */
  priceSpecification?:
    | PriceSpecificationInput
    | PriceSpecificationInput[]
  availability?: string
  /**
   * Who the offer is targeted at. Accepts free-form strings like
   * "Landlords", "Property management companies", "Institutional operators".
   */
  eligibleCustomerType?: string | string[]
  /**
   * Provider reference (typically MoveSmart Rentals). Optional - callers may
   * rely on the enclosing Service/LocalBusiness schema instead.
   */
  seller?: {
    name: string
    url?: string
  }
  /**
   * Validity window (ISO dates). Useful for time-limited promotions.
   */
  validFrom?: string
  validThrough?: string
  /**
   * Category label (e.g. "Leasing Services", "Rental Protection").
   */
  category?: string
}

export interface PriceSpecificationInput {
  /**
   * Human-readable name (e.g. "Upfront cost", "Success fee on placement").
   */
  name?: string
  price?: string
  priceCurrency?: string
  /**
   * Free-form description (e.g. "Standard leasing success fee on placement,
   * typically equivalent to one month's contracted rent.").
   */
  description?: string
  /**
   * Optional valueAddedTaxIncluded flag.
   */
  valueAddedTaxIncluded?: boolean
  /**
   * Optional referenceQuantity (for per-unit pricing).
   */
  referenceQuantity?: {
    value: number
    unitCode?: string
    unitText?: string
  }
}

function buildPriceSpecification(
  spec: PriceSpecificationInput
): Record<string, unknown> {
  const out: Record<string, unknown> = {
    '@type': 'PriceSpecification',
  }
  if (spec.name) out.name = spec.name
  if (spec.price !== undefined) out.price = spec.price
  if (spec.priceCurrency) out.priceCurrency = spec.priceCurrency
  if (spec.description) out.description = spec.description
  if (spec.valueAddedTaxIncluded !== undefined) {
    out.valueAddedTaxIncluded = spec.valueAddedTaxIncluded
  }
  if (spec.referenceQuantity) {
    out.referenceQuantity = {
      '@type': 'QuantitativeValue',
      value: spec.referenceQuantity.value,
      ...(spec.referenceQuantity.unitCode && {
        unitCode: spec.referenceQuantity.unitCode,
      }),
      ...(spec.referenceQuantity.unitText && {
        unitText: spec.referenceQuantity.unitText,
      }),
    }
  }
  return out
}

export function buildOfferSchema(
  data: OfferSchemaInput
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: data.name,
    description: data.description,
    availability:
      data.availability ?? 'https://schema.org/InStock',
  }

  if (data.url) schema.url = data.url
  if (data.price !== undefined) schema.price = data.price
  if (data.priceCurrency) schema.priceCurrency = data.priceCurrency
  if (data.priceRange) schema.priceRange = data.priceRange
  if (data.category) schema.category = data.category
  if (data.validFrom) schema.validFrom = data.validFrom
  if (data.validThrough) schema.validThrough = data.validThrough

  if (data.priceSpecification) {
    schema.priceSpecification = Array.isArray(data.priceSpecification)
      ? data.priceSpecification.map(buildPriceSpecification)
      : buildPriceSpecification(data.priceSpecification)
  }

  if (data.eligibleCustomerType) {
    const types = Array.isArray(data.eligibleCustomerType)
      ? data.eligibleCustomerType
      : [data.eligibleCustomerType]
    schema.eligibleCustomerType = types.map((t) => ({
      '@type': 'BusinessEntityType',
      name: t,
    }))
  }

  if (data.seller) {
    schema.seller = {
      '@type': 'Organization',
      name: data.seller.name,
      ...(data.seller.url && { url: data.seller.url }),
    }
  }

  return schema
}
