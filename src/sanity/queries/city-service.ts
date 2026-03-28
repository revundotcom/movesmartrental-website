import { groq } from 'next-sanity'

/** Full CityService page data with resolved references and all blocks */
export const CITY_SERVICE_PAGE_QUERY = groq`
  *[_type == "cityService"
    && city->slug.current == $citySlug
    && service->slug.current == $serviceSlug
    && city->province->slug.current == $provinceSlug
  ][0] {
    _id,
    _type,
    // Resolved references
    "city": city-> {
      _id,
      title,
      slug,
      tier,
      population,
      medianRent,
      vacancyRate,
      neighbourhoods,
      transitInfo
    },
    "province": city->province-> {
      _id,
      title,
      slug,
      country,
      abbreviation
    },
    "service": service-> {
      _id,
      title,
      slug,
      shortDescription,
      audience,
      icon
    },
    // Denormalized fields
    cityTitle,
    provinceSlug,
    citySlug,
    serviceSlug,
    // Required local content
    localMedianRent,
    localVacancyRate,
    neighbourhoodNames,
    localRegulatory,
    localBody,
    // Hero fields
    heroHeadline,
    heroSubheadline,
    heroCta1,
    heroCta2,
    heroImage {
      asset,
      alt,
      hotspot
    },
    // Block data arrays
    painPoints,
    benefits,
    howItWorks,
    testimonials,
    faq,
    // Related
    "relatedServices": relatedServices[]-> {
      title,
      slug,
      shortDescription,
      icon
    },
    seo,
    publishing
  }
`

/** Minimal query for generateMetadata (SEO fields only) */
export const CITY_SERVICE_SEO_QUERY = groq`
  *[_type == "cityService"
    && city->slug.current == $citySlug
    && service->slug.current == $serviceSlug
    && city->province->slug.current == $provinceSlug
  ][0] {
    seo,
    heroHeadline,
    "cityTitle": city->title,
    "serviceTitle": service->title,
    "provinceName": city->province->title
  }
`

/** For generateStaticParams: all Tier-1 city x service combinations */
export const CITY_SERVICE_PARAMS_QUERY = groq`
  *[_type == "cityService" && city->tier == 1] {
    "province": city->province->slug.current,
    "city": city->slug.current,
    "service": service->slug.current
  }
`
