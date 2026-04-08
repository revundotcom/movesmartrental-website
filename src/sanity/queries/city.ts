import { groq } from 'next-sanity'

/** Full city data with resolved province reference */
export const CITY_PAGE_QUERY = groq`
  *[_type == "city" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    tier,
    population,
    medianRent,
    vacancyRate,
    neighbourhoods,
    transitInfo,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    description,
    "province": province-> {
      title,
      slug,
      country,
      abbreviation
    },
    seo,
    publishing
  }
`

/** All cities with province slug for generateStaticParams */
export const CITY_LIST_QUERY = groq`
  *[_type == "city"] {
    slug,
    "provinceSlug": province->slug.current,
    "country": province->country
  }
`
