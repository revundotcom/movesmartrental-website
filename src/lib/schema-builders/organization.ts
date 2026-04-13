/**
 * JSON-LD: Organization schema
 * Used on: Homepage, About page
 */
export function buildOrganizationSchema(data: {
  name: string
  url: string
  logo: string
  description: string
  contactEmail?: string
  contactPhone?: string
  socialLinks?: string[]
  foundingDate?: string
  numberOfEmployees?: string
  areaServed?: string[]
}) {
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
    numberOfEmployees: data.numberOfEmployees ? {
      '@type': 'QuantitativeValue',
      value: data.numberOfEmployees,
    } : undefined,
    contactPoint: data.contactEmail
      ? {
          '@type': 'ContactPoint',
          email: data.contactEmail,
          telephone: data.contactPhone || '+14372957688',
          contactType: 'customer service',
          areaServed: data.areaServed || ['CA', 'US'],
          availableLanguage: 'English',
        }
      : undefined,
    sameAs: data.socialLinks || [
      'https://www.linkedin.com/company/movesmart-rentals',
      'https://www.instagram.com/movesmartrentals',
      'https://www.facebook.com/movesmartrentals',
      'https://www.youtube.com/@movesmartrentals',
    ],
    areaServed: data.areaServed?.map(code => ({
      '@type': 'Country',
      name: code,
    })),
  }
}
