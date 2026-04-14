/**
 * JSON-LD: Composed CityService schema
 * Used on: /ca/{province}/{city}/{service}/ and /us/{state}/{city}/{service}/
 *
 * Convenience builder that composes three schemas into one @graph payload:
 *   1. LocalBusiness (RealEstateAgent) - MoveSmart at the city level
 *   2. Service - the specific leasing service being offered in this city
 *   3. BreadcrumbList - ordered trail from Home -> Country -> Province/State
 *      -> City -> Service
 *
 * Callers that need any of the three individually should use the underlying
 * builders directly (buildLocalBusinessSchema, buildServiceSchema,
 * buildBreadcrumbListSchema).
 */

import { buildLocalBusinessSchema } from './local-business'
import { buildServiceSchema } from './service-schema'
import { buildBreadcrumbListSchema } from './breadcrumb-list'

export interface CityServiceSchemaInput {
  /**
   * Absolute site URL, e.g. "https://movesmartrentals.com".
   */
  siteUrl: string
  /**
   * Absolute URL of the current city-service page.
   */
  pageUrl: string
  /**
   * Service slug (e.g. "tenant-placement"). Used for the breadcrumb label
   * fallback only - pass `serviceTitle` for the display label.
   */
  serviceSlug: string
  serviceTitle: string
  serviceDescription: string
  /**
   * Specific schema.org serviceType (e.g. "Tenant Placement Service").
   */
  serviceType?: string
  /**
   * Audience - owner | tenant | both.
   */
  audience?: 'owner' | 'tenant' | 'both'
  citySlug: string
  cityName: string
  provinceSlug: string
  provinceName: string
  /**
   * 2-letter province/state abbreviation (e.g. "ON", "CA").
   */
  provinceAbbr?: string
  /**
   * Country code - "CA" or "US".
   */
  country: 'CA' | 'US'
  countryLabel?: string
  phone?: string
  /**
   * Optional postal/zip code for the LocalBusiness address.
   */
  postalCode?: string
  /**
   * Optional offers to attach to the Service entity.
   */
  offers?: Array<Record<string, unknown>>
  offerCatalogName?: string
  /**
   * Provider name (typically "MoveSmart Rentals").
   */
  providerName?: string
}

export function buildCityServiceSchema(
  data: CityServiceSchemaInput
): Record<string, unknown>[] {
  const {
    siteUrl,
    pageUrl,
    serviceTitle,
    serviceDescription,
    serviceType,
    audience,
    citySlug,
    cityName,
    provinceSlug,
    provinceName,
    provinceAbbr,
    country,
    countryLabel,
    phone,
    postalCode,
    offers,
    offerCatalogName,
    providerName,
  } = data

  const provider = providerName ?? 'MoveSmart Rentals'
  const countryPath = country === 'CA' ? 'ca' : 'us'
  const countryDisplay =
    countryLabel ?? (country === 'CA' ? 'Canada' : 'United States')

  const localBusiness = buildLocalBusinessSchema({
    name: `${provider} - ${cityName}`,
    description: `${serviceTitle} in ${cityName}, ${provinceName} - white-glove leasing brokerage with zero upfront cost.`,
    url: pageUrl,
    phone: phone ?? '+18005959755',
    address: {
      streetAddress: '',
      city: cityName,
      province: provinceAbbr ?? provinceName,
      postalCode: postalCode ?? '',
      country,
    },
    areaServed: cityName,
    openingHours: ['Mo-Fr 09:00-18:00'],
    priceRange: '$$',
  })

  const service = buildServiceSchema({
    name: `${serviceTitle} in ${cityName}`,
    description: serviceDescription,
    url: pageUrl,
    provider: {
      name: provider,
      url: siteUrl,
    },
    serviceType,
    audience,
    areaServed: [cityName, provinceName, countryDisplay],
    offers,
    offerCatalogName,
  })

  const breadcrumb = buildBreadcrumbListSchema({
    crumbs: [
      { name: 'Home', url: `${siteUrl}/` },
      {
        name: countryDisplay,
        url: `${siteUrl}/${countryPath}/`,
      },
      {
        name: provinceName,
        url: `${siteUrl}/${countryPath}/${provinceSlug}/`,
      },
      {
        name: cityName,
        url: `${siteUrl}/${countryPath}/${provinceSlug}/${citySlug}/`,
      },
      {
        name: serviceTitle,
        url: pageUrl,
      },
    ],
  })

  return [localBusiness, service, breadcrumb]
}
