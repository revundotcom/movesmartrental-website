/**
 * JSON-LD: Organization schema
 * Used on: Homepage, About page
 *
 * MoveSmart Rentals is a white-glove rental brokerage. This builder frames
 * the entity as an Organization with leasing-specific knowsAbout, areaServed,
 * and contact metadata.
 */

export interface OrganizationSchemaInput {
  name: string
  url: string
  logo: string
  description: string
  contactEmail?: string
  contactPhone?: string
  socialLinks?: string[]
  foundingDate?: string
  numberOfEmployees?: string
  /**
   * List of 2-letter country codes (e.g. 'CA', 'US') or full country names.
   * Defaults to ['CA', 'US'] (Canada primary + US priority markets).
   */
  areaServed?: string[]
  /**
   * Optional override for knowsAbout list - defaults to leasing brokerage topics.
   */
  knowsAbout?: string[]
  /**
   * Optional legal address (head office / registered entity). Defaults to
   * MoveSmart Rentals HQ: 1 King St W, Suite 4801, Toronto, ON M5H 1A1.
   */
  address?: {
    streetAddress: string
    city: string
    province: string
    postalCode: string
    country: string
  }
  /**
   * serviceType label - defaults to "Rental Brokerage / Leasing Services".
   */
  serviceType?: string
}

const DEFAULT_KNOWS_ABOUT = [
  'Rental brokerage',
  'Tenant placement',
  'Tenant screening and qualification',
  'Rental pricing strategy',
  'Lease-up campaigns',
  'MLS listing syndication',
  'Rental market analysis',
  'Move-in coordination',
  'Rental protection and rent guarantee',
  'Institutional lease-up',
]

const DEFAULT_HEAD_OFFICE = {
  streetAddress: '1 King St W, Suite 4801',
  city: 'Toronto',
  province: 'ON',
  postalCode: 'M5H 1A1',
  country: 'CA',
}

export function buildOrganizationSchema(
  data: OrganizationSchemaInput
): Record<string, unknown> {
  const address = data.address ?? DEFAULT_HEAD_OFFICE
  const areaServedCodes = data.areaServed ?? ['CA', 'US']

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: {
      '@type': 'ImageObject',
      url: data.logo,
    },
    description: data.description,
    foundingDate: data.foundingDate,
    numberOfEmployees: data.numberOfEmployees
      ? {
          '@type': 'QuantitativeValue',
          value: data.numberOfEmployees,
        }
      : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.city,
      addressRegion: address.province,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: data.contactEmail ?? 'contact@movesmartrentals.com',
      telephone: data.contactPhone ?? '+18005959755',
      contactType: 'customer service',
      areaServed: areaServedCodes,
      availableLanguage: ['English'],
    },
    sameAs: data.socialLinks ?? [
      'https://www.linkedin.com/company/movesmart-rentals',
      'https://www.instagram.com/movesmartrentals',
      'https://www.facebook.com/movesmartrentals',
      'https://www.youtube.com/@movesmartrentals',
    ],
    areaServed: areaServedCodes.map((code) => ({
      '@type': 'Country',
      name: code,
    })),
    knowsAbout: data.knowsAbout ?? DEFAULT_KNOWS_ABOUT,
    serviceType: data.serviceType ?? 'Rental Brokerage / Leasing Services',
  }
}
