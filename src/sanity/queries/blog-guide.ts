import { groq } from 'next-sanity'

/** Single blog/guide page with resolved references */
export const BLOG_GUIDE_QUERY = groq`
  *[_type == "blogGuide" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    category,
    body,
    excerpt,
    heroImage {
      asset,
      alt,
      hotspot
    },
    author,
    "city": city-> {
      _id,
      title,
      slug,
      "provinceSlug": province->slug.current
    },
    "service": service-> {
      _id,
      title,
      slug
    },
    seo,
    publishing
  }
`

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
