import { groq } from 'next-sanity'

/** Property category page data with available listings */
export const PROPERTY_CATEGORY_QUERY = groq`
  *[_type == "propertyCategory"
    && city->slug.current == $citySlug
    && propertyType == $propertyType
  ][0] {
    _id,
    _type,
    title,
    slug,
    propertyType,
    description,
    averageRent,
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
    "listings": *[_type == "propertyListing" && category._ref == ^._id && available == true] | order(price asc) {
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
    },
    seo,
    publishing
  }
`

/** All property categories with city and province slugs for generateStaticParams */
export const PROPERTY_CATEGORY_PARAMS_QUERY = groq`
  *[_type == "propertyCategory"] {
    "propertyType": propertyType,
    "citySlug": city->slug.current,
    "provinceSlug": city->province->slug.current
  }
`

/** Property category with listings filtered by bedroom count */
export const BEDROOM_COUNT_QUERY = groq`
  *[_type == "propertyCategory"
    && city->slug.current == $citySlug
    && propertyType == $propertyType
  ][0] {
    _id,
    _type,
    title,
    slug,
    propertyType,
    description,
    averageRent,
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
    "listings": *[_type == "propertyListing" && category._ref == ^._id && available == true && bedrooms == $bedrooms] | order(price asc) {
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
    },
    seo,
    publishing
  }
`
