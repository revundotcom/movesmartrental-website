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
  socialLinks?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    contactPoint: data.contactEmail
      ? {
          '@type': 'ContactPoint',
          email: data.contactEmail,
          contactType: 'customer service',
        }
      : undefined,
    sameAs: data.socialLinks || [],
  }
}
