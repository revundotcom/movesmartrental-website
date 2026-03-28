import { groq } from 'next-sanity'

/** Full province page data with nested city list */
export const PROVINCE_PAGE_QUERY = groq`
  *[_type == "province" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    country,
    abbreviation,
    description,
    heroImage {
      asset,
      alt,
      hotspot
    },
    "cities": *[_type == "city" && province._ref == ^._id] | order(title asc) {
      title,
      slug,
      tier,
      population,
      medianRent,
      "provinceSlug": ^.slug.current
    },
    seo,
    publishing
  }
`

/** All provinces for generateStaticParams */
export const PROVINCE_LIST_QUERY = groq`
  *[_type == "province"] {
    slug,
    country
  }
`

/** All provinces with their cities for Locations hub */
export const PROVINCES_WITH_CITIES_QUERY = groq`
  *[_type == "province"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    country,
    "cities": *[_type == "city" && province._ref == ^._id] | order(tier asc, title asc) {
      title,
      "slug": slug.current,
      tier,
      population,
      medianRent,
      "provinceSlug": ^.slug.current,
      "heroImageUrl": heroImage.asset->url,
      "heroImageAlt": heroImage.alt
    }
  }
`

/** Provinces by country for country hub pages */
export const COUNTRY_PROVINCES_QUERY = groq`
  *[_type == "province" && country == $country] | order(title asc) {
    _id, title, "slug": slug.current, abbreviation, description,
    "cityCount": count(*[_type == "city" && province._ref == ^._id])
  }
`

/** Cities by province slug for CityGridBlock */
export const PROVINCE_CITIES_QUERY = groq`
  *[_type == "city" && province->slug.current == $provinceSlug] | order(tier asc, title asc) {
    title,
    "slug": slug.current,
    tier,
    population,
    medianRent,
    "provinceSlug": province->slug.current,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt
  }
`
