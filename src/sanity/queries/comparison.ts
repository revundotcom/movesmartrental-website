import { groq } from 'next-sanity'

/** All comparisons for listing/linking */
export const COMPARISON_LIST_QUERY = groq`
  *[_type == "comparison"] | order(title asc) {
    title,
    "slug": slug.current,
    "serviceTitle": service->title
  }
`
