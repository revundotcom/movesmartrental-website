/**
 * JSON-LD: ItemList schema
 * Used on: Property category pages, homepage services, city listings
 */
export function buildItemListSchema(data: {
  name: string
  description?: string
  url?: string
  items: Array<{
    name: string
    url: string
    description?: string
    image?: string
    position?: number
  }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.name,
    ...(data.description && { description: data.description }),
    ...(data.url && { url: data.url }),
    numberOfItems: data.items.length,
    itemListElement: data.items.map((item, i) => ({
      '@type': 'ListItem',
      position: item.position ?? i + 1,
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
      ...(item.image && { image: item.image }),
    })),
  }
}
