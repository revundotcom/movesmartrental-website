import { groq } from 'next-sanity'

/** Homepage aggregation query: featured services, featured cities, and stats */
export const HOMEPAGE_QUERY = groq`
  {
    "featuredServices": *[_type == "service"] | order(order asc) {
      title,
      "slug": slug.current,
      shortDescription,
      icon,
      audience
    },
    "featuredCities": *[_type == "city" && tier == 1] | order(title asc) {
      title,
      "slug": slug.current,
      "provinceSlug": province->slug.current,
      population,
      medianRent,
      "heroImageUrl": heroImage.asset->url,
      "heroImageAlt": heroImage.alt
    },
    "stats": {
      "cityServiceCount": count(*[_type == "cityService"]),
      "cityCount": count(*[_type == "city"]),
      "serviceCount": count(*[_type == "service"])
    }
  }
`
