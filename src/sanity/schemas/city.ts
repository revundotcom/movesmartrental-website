import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  fieldsets: [
    { name: 'identity', title: 'Identity' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Content' },
    { name: 'market', title: 'Market Data' },
    { name: 'geo', title: 'Geo / Neighbourhoods' },
    { name: 'links', title: 'Related Links' },
    { name: 'media', title: 'Media' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    // ---------- Identity ----------
    defineField({
      name: 'title',
      title: 'City Name',
      type: 'string',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cityName',
      title: 'City Name (alias)',
      type: 'string',
      description: 'Explicit alias for contract compliance. Mirror of Title when empty.',
      fieldset: 'identity',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'province',
      title: 'Province / State (reference)',
      type: 'reference',
      to: [{ type: 'province' }],
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'provinceOrStateName',
      title: 'Province or State Name (denormalized)',
      type: 'string',
      description: 'Plain-string copy for contract compliance and fast rendering.',
      fieldset: 'identity',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'Canada', value: 'ca' },
          { title: 'United States', value: 'us' },
        ],
      },
      fieldset: 'identity',
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'number',
      description: '1=pre-render at build, 2=on-demand ISR, 3=future',
      options: {
        list: [
          { title: 'Tier 1 - Pre-render', value: 1 },
          { title: 'Tier 2 - On-demand ISR', value: 2 },
          { title: 'Tier 3 - Future', value: 3 },
        ],
      },
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),

    // ---------- SEO ----------
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'seo',
      validation: (Rule) => Rule.required().max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      fieldset: 'seo',
      validation: (Rule) => Rule.max(170),
    }),

    // ---------- Hero ----------
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      fieldset: 'hero',
    }),

    // ---------- Content ----------
    defineField({
      name: 'cityIntro',
      title: 'City Intro',
      type: 'portableContent',
      description: 'Short intro shown above the fold.',
      fieldset: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Long Description (legacy)',
      type: 'portableContent',
      description: 'Legacy long description. Prefer City Intro + Rental Market Summary.',
      fieldset: 'content',
    }),
    defineField({
      name: 'rentalMarketSummary',
      title: 'Rental Market Summary',
      type: 'portableContent',
      description: 'Data-led summary of the local rental market: supply, demand, rent trends.',
      fieldset: 'content',
    }),
    defineField({
      name: 'landlordProblemSummary',
      title: 'Landlord Problem Summary',
      type: 'portableContent',
      description: 'The core pain points landlords face in this city and how leasing helps.',
      fieldset: 'content',
    }),
    defineField({
      name: 'servicesAvailable',
      title: 'Services Available',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'content',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      fieldset: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),

    // ---------- Market Data ----------
    defineField({ name: 'population', title: 'Population', type: 'number', fieldset: 'market' }),
    defineField({ name: 'medianRent', title: 'Median Rent', type: 'number', fieldset: 'market' }),
    defineField({ name: 'vacancyRate', title: 'Vacancy Rate', type: 'number', fieldset: 'market' }),
    defineField({
      name: 'averageDaysOnMarket',
      title: 'Average Days on Market',
      type: 'number',
      description: 'Average days to rent in this city',
      fieldset: 'market',
      validation: (Rule) => Rule.min(0).max(365),
    }),
    defineField({
      name: 'rentGrowthYoY',
      title: 'Rent Growth YoY (%)',
      type: 'number',
      description: 'Year-over-year rent change percentage (negative for decline)',
      fieldset: 'market',
    }),
    defineField({
      name: 'dataSourceDate',
      title: 'Data Source Date',
      type: 'date',
      description: 'When this market data was last updated',
      fieldset: 'market',
    }),

    // ---------- Geo ----------
    defineField({ name: 'geoLat', title: 'Latitude', type: 'number', fieldset: 'geo' }),
    defineField({ name: 'geoLng', title: 'Longitude', type: 'number', fieldset: 'geo' }),
    defineField({
      name: 'neighbourhoods',
      title: 'Neighbourhoods',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'geo',
    }),
    defineField({
      name: 'transitInfo',
      title: 'Transit Information',
      type: 'text',
      fieldset: 'geo',
    }),

    // ---------- Links ----------
    defineField({
      name: 'relatedCityLinks',
      title: 'Related City Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      fieldset: 'links',
    }),
    defineField({
      name: 'relatedServiceLinks',
      title: 'Related Service Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'links',
    }),

    // ---------- Media ----------
    defineField({
      name: 'heroImage',
      title: 'Featured / Hero Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'media',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ---------- SEO & Publishing ----------
    defineField({ name: 'seo', title: 'SEO (OG image, keywords, schema fields)', type: 'seoFields', fieldset: 'seo' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls', fieldset: 'publishing' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'province.title',
      media: 'heroImage',
    },
  },
})
