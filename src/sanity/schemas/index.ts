import province from './province'
import city from './city'
import service from './service'
import cityService from './city-service'
import blogGuide from './blog-guide'
import comparison from './comparison'
import caseStudy from './case-study'
import propertyCategory from './property-category'
import propertyListing from './property-listing'

import seoFields from '../objects/seo-fields'
import publishingControls from '../objects/publishing-controls'
import portableContent from '../objects/portable-text'

export const schemaTypes = [
  // Document types (9)
  province,
  city,
  service,
  cityService,
  blogGuide,
  comparison,
  caseStudy,
  propertyCategory,
  propertyListing,

  // Object types (3)
  seoFields,
  publishingControls,
  portableContent,
]
