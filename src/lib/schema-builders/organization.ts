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
    contactPoint: data.contactEmail
      ? {
          '@type': 'ContactPoint',
          email: data.contactEmail,
          telephone: data.contactPhone || '+14372957688',
          contactType: 'customer service',
          areaServed: ['CA', 'US'],
          availableLanguage: 'English',
        }
      : undefined,
    sameAs: data.socialLinks || [],
  }
}
