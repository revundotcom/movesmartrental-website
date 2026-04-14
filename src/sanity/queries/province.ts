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

/** Full province page data with nested city list */
export const PROVINCE_PAGE_QUERY = groq`
  *[_type == "province" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    provinceOrStateName,
    slug,
    country,
    abbreviation,
    provinceOrStateCode,
    // Legacy description (kept for back-compat)
    description,
    // New content fields (contract §20.7)
    metaTitle,
    metaDescription,
    heroHeading,
    heroSubheading,
    introBody,
    serviceSummaryBlocks[] {
      heading,
      summary,
      icon,
      "serviceRef": serviceRef-> {
        _id,
        title,
        "slug": slug.current,
        icon
      }
    },
    localLawSummary,
    faqItems,
    internalLinkBlocks[] {
      heading,
      links[] {
        label,
        url
      }
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
      "provinceSlug": province->slug.current
    },
    ${SEO_PROJECTION},
    ${PUBLISHING_PROJECTION}
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
      "provinceSlug": province->slug.current,
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
