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
    cityName,
    serviceName,
    provinceSlug,
    provinceOrStateName,
    country,
    citySlug,
    serviceSlug,
    slug,
    // SEO / Keywords (top-level denormalized - shared SEO object projected below)
    primaryKeyword,
    secondaryKeywords,
    metaTitle,
    metaDescription,
    // Hero
    heroHeading,
    heroHeadline,
    heroSubheading,
    heroSubheadline,
    heroCta1,
    heroCta2,
    heroImage {
      asset,
      alt,
      hotspot
    },
    imagePrompt,
    altText,
    // Required local content
    localIntro,
    localMedianRent,
    localVacancyRate,
    neighbourhoodNames,
    localRegulatory,
    localBody,
    localPainPoints,
    // Legacy alias
    painPoints,
    // Service scope & process
    serviceScope,
    processSteps,
    howItWorks,
    // Trust
    trustBlock,
    testimonials,
    // Supporting blocks
    benefits,
    faqItems,
    // Legacy FAQ alias
    faq,
    // CTA
    ctaText,
    // Related
    "relatedServices": relatedServices[]-> {
      _id,
      title,
      slug,
      shortDescription,
      icon
    },
    "relatedServiceLinks": relatedServiceLinks[]-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      icon
    },
    "relatedCityLinks": relatedCityLinks[]-> {
      _id,
      title,
      "slug": slug.current,
      "provinceSlug": province->slug.current
    },
    ${SEO_PROJECTION},
    ${PUBLISHING_PROJECTION}
  }
`

/** Minimal query for generateMetadata (SEO fields only) */
export const CITY_SERVICE_SEO_QUERY = groq`
  *[_type == "cityService"
    && city->slug.current == $citySlug
    && service->slug.current == $serviceSlug
    && city->province->slug.current == $provinceSlug
  ][0] {
    metaTitle,
    metaDescription,
    ${SEO_PROJECTION},
    ${PUBLISHING_PROJECTION},
    heroHeading,
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
