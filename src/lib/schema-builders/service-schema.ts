/**
 * JSON-LD: Service schema
 * Used on: /services/{slug}/ pages, CityService pages, Service hub pages
 *
 * For MoveSmart Rentals (a leasing brokerage), `serviceType` should be
 * specific to the offering - e.g. "Tenant Placement Service",
 * "Tenant Screening Service", "Rent Guarantee Service",
 * "Institutional Lease-Up Service", "Rental Preparation Service".
 * NEVER use "Property Management" - this is not what MoveSmart does.
 */

export interface ServiceSchemaInput {
  name: string
  description: string
  url: string
  provider: {
    name: string
    url: string
  }
  /**
   * Specific serviceType - required when available for schema quality.
   * Examples: "Tenant Placement Service", "Leasing Services",
   * "Rental Preparation Service", "Rent Guarantee Service".
   */
  serviceType?: string
  areaServed?: string | string[]
  /**
   * Optional offers - either a single OfferCatalog or a flat list of Offer
   * objects. Callers typically pass objects pre-built by buildOfferSchema.
   */
  offers?: Array<Record<string, unknown>>
  /**
   * Optional OfferCatalog wrapper name. When provided, `offers` is packaged as
   * an OfferCatalog.itemListElement instead of a flat array.
   */
  offerCatalogName?: string
  /**
   * Optional audience (owner | tenant | both) - translated to Schema.org
   * Audience entity when present.
   */
  audience?: 'owner' | 'tenant' | 'both'
  /**
   * Optional image URL (used for rich result eligibility).
   */
  image?: string
}

function audienceToSchema(audience?: 'owner' | 'tenant' | 'both') {
  if (!audience) return undefined
  if (audience === 'both') {
    return [
      { '@type': 'Audience', audienceType: 'Landlords and property owners' },
      { '@type': 'Audience', audienceType: 'Tenants and renters' },
    ]
  }
  if (audience === 'owner') {
    return {
      '@type': 'Audience',
      audienceType: 'Landlords and property owners',
    }
  }
  return { '@type': 'Audience', audienceType: 'Tenants and renters' }
}

export function buildServiceSchema(
  data: ServiceSchemaInput
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
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

  if (data.serviceType) {
    schema.serviceType = data.serviceType
  }

  if (data.image) {
    schema.image = data.image
  }

  const audienceSchema = audienceToSchema(data.audience)
  if (audienceSchema) {
    schema.audience = audienceSchema
  }

  if (data.offers && data.offers.length > 0) {
    if (data.offerCatalogName) {
      schema.hasOfferCatalog = {
        '@type': 'OfferCatalog',
        name: data.offerCatalogName,
        itemListElement: data.offers,
      }
    } else {
      schema.offers = data.offers
    }
  }

  return schema
}
