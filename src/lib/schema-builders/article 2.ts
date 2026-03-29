/**
 * JSON-LD: Article / BlogPosting schema
 * Used on: Blog posts, Guides, Case studies
 */
export function buildArticleSchema(data: {
  headline: string
  author: string
  datePublished: string
  dateModified?: string
  description: string
  image?: string
  url: string
  isBlogPost?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': data.isBlogPost ? 'BlogPosting' : 'Article',
    headline: data.headline,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    description: data.description,
    image: data.image,
    url: data.url,
  }
}
