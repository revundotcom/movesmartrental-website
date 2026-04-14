import { groq } from 'next-sanity'

/**
 * Shared SEO projection fragment.
 * Keep in sync with src/sanity/objects/seo-fields.ts
 */
const SEO_PROJECTION = `
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset,
      alt,
      hotspot
    },
    featuredImage {
      asset,
      alt,
      hotspot
    },
    keywords,
    primaryKeyword,
    secondaryKeywords,
    aiSummary,
    schemaFields {
      schemaType,
      includeFaqSchema,
      includeBreadcrumbSchema,
      includeLocalBusinessSchema,
      customJsonLd
    }
  }
`

/**
 * Shared Publishing projection fragment.
 * Keep in sync with src/sanity/objects/publishing-controls.ts
 */
const PUBLISHING_PROJECTION = `
  publishing {
    canonicalSetting,
    canonicalOverride,
    indexControl,
    noindex,
    sitemapInclude,
    includedInSitemap,
    redirectTo,
    redirectFrom,
    author,
    publishedAt,
    updatedAt
  }
`

/** Full city data with resolved province reference */
export const CITY_PAGE_QUERY = groq`
  *[_type == "city" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    cityName,
    slug,
    country,
    provinceOrStateName,
    tier,
    // Market data
    population,
    medianRent,
    vacancyRate,
    averageDaysOnMarket,
    rentGrowthYoY,
    dataSourceDate,
    // Geo
    geoLat,
    geoLng,
    neighbourhoods,
    transitInfo,
    // Legacy fields (kept for back-compat)
    description,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    // New content fields (contract §20.7)
    metaTitle,
    metaDescription,
    heroHeading,
    heroSubheading,
    cityIntro,
    rentalMarketSummary,
    landlordProblemSummary,
    faqItems,
    "servicesAvailable": servicesAvailable[]-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      icon,
      audience
    },
    "relatedCityLinks": relatedCityLinks[]-> {
      _id,
      title,
      "slug": slug.current,
      "provinceSlug": province->slug.current
    },
    "relatedServiceLinks": relatedServiceLinks[]-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      icon
    },
    heroImage {
      asset,
      alt,
      hotspot
    },
    "province": province-> {
      _id,
      title,
      "slug": slug.current,
      country,
      abbreviation,
      provinceOrStateCode
    },
    ${SEO_PROJECTION},
    ${PUBLISHING_PROJECTION}
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
