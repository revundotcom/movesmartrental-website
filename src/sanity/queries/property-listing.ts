import { groq } from 'next-sanity'

/** Single property listing with resolved references */
export const PROPERTY_LISTING_QUERY = groq`
  *[_type == "propertyListing" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    price,
    bedrooms,
    bathrooms,
    sqft,
    address,
    description,
    images[] {
      asset,
      alt,
      hotspot
    },
    available,
    availableDate,
    "city": city-> {
      _id,
      title,
      slug,
      tier,
      population,
      medianRent
    },
    "province": city->province-> {
      _id,
      title,
      slug,
      country,
      abbreviation
    },
    "category": category-> {
      _id,
      title,
      slug,
      propertyType
    },
    seo,
    publishing
  }
`

/** Listings by category for PropertyCardBlock display */
export const PROPERTY_LISTINGS_BY_CATEGORY_QUERY = groq`
  *[_type == "propertyListing" && category._ref == $categoryId && available == true] | order(price asc) {
    title,
    "slug": slug.current,
    "citySlug": city->slug.current,
    "provinceSlug": city->province->slug.current,
    price,
    bedrooms,
    bathrooms,
    sqft,
    address,
    "imageUrl": images[0].asset->url,
    "imageAlt": images[0].alt,
    available
  }
`

/** All listings with city and province slugs for generateStaticParams */
export const PROPERTY_LISTING_PARAMS_QUERY = groq`
  *[_type == "propertyListing"] {
    "slug": slug.current,
    "citySlug": city->slug.current,
    "provinceSlug": city->province->slug.current
  }
`
