import { groq } from 'next-sanity'

/** Full service data for service hub page */
export const SERVICE_PAGE_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    shortDescription,
    icon,
    audience,
    order,
    heroImage {
      asset,
      alt,
      hotspot
    },
    body,
    faq,
    seo,
    publishing
  }
`

/** All services for generateStaticParams */
export const SERVICE_LIST_QUERY = groq`
  *[_type == "service"] {
    slug
  }
`
