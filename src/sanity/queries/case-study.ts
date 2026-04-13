import { groq } from 'next-sanity'

/** All case studies for listing page */
export const CASE_STUDY_LIST_QUERY = groq`
  *[_type == "caseStudy"] | order(title asc) {
    title,
    "slug": slug.current,
    clientName,
    outcome,
    "cityTitle": city->title,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt
  }
`
