import { groq } from 'next-sanity'

/** Blog/guide listing for resources hub, optionally filtered by category */
export const BLOG_GUIDE_LIST_QUERY = groq`
  *[_type == "blogGuide"
    && select(
      defined($category) => category == $category,
      true
    )
  ] | order(publishing.publishedAt desc) {
    title,
    "slug": slug.current,
    category,
    excerpt,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    author,
    "publishedAt": publishing.publishedAt,
    "cityTitle": city->title,
    "serviceTitle": service->title
  }
`
