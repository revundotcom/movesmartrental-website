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
  wordCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': data.isBlogPost ? 'BlogPosting' : 'Article',
    headline: data.headline,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MoveSmart Rentals',
      url: 'https://movesmartrentals.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://movesmartrentals.com/og-default.png',
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    description: data.description,
    image: data.image,
    url: data.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article h2', 'article p:first-of-type'],
    },
    ...(data.wordCount ? { wordCount: data.wordCount } : {}),
  }
}
