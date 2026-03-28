import { groq } from 'next-sanity'

/** Fetch all services for the navigation menu, ordered by display order */
export const NAV_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    title,
    slug,
    audience,
    icon
  }
`

/** Fetch Tier-1 cities for the footer with resolved province slug */
export const FOOTER_CITIES_QUERY = groq`
  *[_type == "city" && tier == 1] | order(title asc) {
    title,
    slug,
    "provinceSlug": province->slug.current
  }
`
