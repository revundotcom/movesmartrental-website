import { groq } from 'next-sanity'

/** Single comparison page with resolved service reference */
export const COMPARISON_QUERY = groq`
  *[_type == "comparison" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    "service": service-> {
      _id,
      title,
      slug
    },
    competitors[] {
      name,
      features[] {
        feature,
        us,
        them
      }
    },
    body,
    seo,
    publishing
  }
`

/** All comparisons for listing/linking */
export const COMPARISON_LIST_QUERY = groq`
  *[_type == "comparison"] | order(title asc) {
    title,
    "slug": slug.current,
    "serviceTitle": service->title
  }
`
