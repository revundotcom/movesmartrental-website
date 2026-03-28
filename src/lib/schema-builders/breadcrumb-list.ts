/**
 * JSON-LD: BreadcrumbList schema
 * Used on: All geographic pages (province, city, city-service)
 */
export function buildBreadcrumbListSchema(data: {
  crumbs: Array<{ name: string; url: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}
