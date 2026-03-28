import { groq } from 'next-sanity'

/** Full service data for service detail page (includes available cities) */
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
    publishing,
    "availableCities": *[_type == "cityService" && service._ref == ^._id] {
      "title": city->title,
      "slug": city->slug.current,
      "provinceSlug": city->province->slug.current,
      "population": city->population,
      "medianRent": city->medianRent
    }
  }
`

/** All services for generateStaticParams */
export const SERVICE_LIST_QUERY = groq`
  *[_type == "service"] {
    slug
  }
`

/** All services ordered for services hub page */
export const SERVICE_ALL_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    audience
  }
`

/** Owner-facing services for owners hub (audience is 'owner' or 'both') */
export const SERVICE_OWNER_QUERY = groq`
  *[_type == "service" && (audience == "owner" || audience == "both")] | order(order asc) {
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    audience
  }
`
