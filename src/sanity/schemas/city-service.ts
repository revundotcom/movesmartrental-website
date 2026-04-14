import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'cityService',
  title: 'City Service Page',
  type: 'document',
  fieldsets: [
    { name: 'references', title: 'City & Service References' },
    { name: 'denormalized', title: 'Denormalized Fields (auto-populated)', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO & Keywords' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'localContent', title: 'Local Content', description: 'These fields MUST be filled to prevent thin content' },
    { name: 'process', title: 'Service Scope & Process' },
    { name: 'trust', title: 'Trust & Testimonials' },
    { name: 'blocks', title: 'Supporting Blocks', options: { collapsible: true, collapsed: true } },
    { name: 'cta', title: 'CTA & Related' },
    { name: 'media', title: 'Media' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    // ---------- References ----------
    defineField({
      name: 'city',
      title: 'City (reference)',
      type: 'reference',
      to: [{ type: 'city' }],
      fieldset: 'references',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service (reference)',
      type: 'reference',
      to: [{ type: 'service' }],
      fieldset: 'references',
      validation: (Rule) => Rule.required(),
    }),

    // ---------- Denormalized ----------
    defineField({ name: 'cityTitle', title: 'City Title', type: 'string', fieldset: 'denormalized', readOnly: true }),
    defineField({ name: 'cityName', title: 'City Name (denormalized)', type: 'string', fieldset: 'denormalized' }),
    defineField({ name: 'serviceName', title: 'Service Name (denormalized)', type: 'string', fieldset: 'denormalized' }),
    defineField({ name: 'provinceSlug', title: 'Province Slug', type: 'string', fieldset: 'denormalized', readOnly: true }),
    defineField({ name: 'provinceOrStateName', title: 'Province or State Name', type: 'string', fieldset: 'denormalized' }),
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
      fieldset: 'denormalized',
    }),
    defineField({ name: 'citySlug', title: 'City Slug', type: 'string', fieldset: 'denormalized', readOnly: true }),
    defineField({ name: 'serviceSlug', title: 'Service Slug', type: 'string', fieldset: 'denormalized', readOnly: true }),
    defineField({
      name: 'slug',
      title: 'Composed Slug',
      type: 'slug',
      description: 'Composed slug - typically "{service}-in-{city}". Leave empty to auto-compose at render.',
      options: { maxLength: 120 },
      fieldset: 'denormalized',
    }),

    // ---------- SEO & Keywords ----------
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      fieldset: 'seo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'seo',
    }),
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
      name: 'heroHeadline',
      title: 'Hero Headline (legacy alias)',
      type: 'string',
      description: 'Legacy duplicate of Hero Heading - kept for existing queries.',
      fieldset: 'hero',
    }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', fieldset: 'hero' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline (legacy alias)', type: 'string', fieldset: 'hero' }),
    defineField({
      name: 'heroCta1',
      title: 'Hero CTA 1',
      type: 'object',
      fieldset: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroCta2',
      title: 'Hero CTA 2',
      type: 'object',
      fieldset: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'string' }),
      ],
    }),

    // ---------- Local Content ----------
    defineField({
      name: 'localIntro',
      title: 'Local Intro',
      type: 'portableContent',
      fieldset: 'localContent',
    }),
    defineField({
      name: 'localMedianRent',
      title: 'Local Median Rent',
      type: 'number',
      fieldset: 'localContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'localVacancyRate',
      title: 'Local Vacancy Rate',
      type: 'number',
      fieldset: 'localContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'neighbourhoodNames',
      title: 'Neighbourhood Names',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'localContent',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'localRegulatory',
      title: 'Local Regulatory Info',
      type: 'text',
      description: 'City-specific landlord-tenant regulations',
      fieldset: 'localContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'localBody',
      title: 'Local Content Body',
      type: 'portableContent',
      fieldset: 'localContent',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'localPainPoints',
      title: 'Local Pain Points',
      type: 'array',
      fieldset: 'localContent',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'painPoint',
          fields: [
            defineField({ name: 'problem', title: 'Problem', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'solution', title: 'Solution', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'problem' } },
        }),
      ],
    }),
    defineField({
      name: 'painPoints',
      title: 'Pain Points (legacy alias)',
      type: 'array',
      fieldset: 'localContent',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'painPointLegacy',
          fields: [
            defineField({ name: 'problem', title: 'Problem', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'solution', title: 'Solution', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'problem' } },
        }),
      ],
    }),

    // ---------- Service Scope & Process ----------
    defineField({
      name: 'serviceScope',
      title: 'Service Scope',
      type: 'portableContent',
      description: 'What the leasing engagement includes for this city.',
      fieldset: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      fieldset: 'process',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({ name: 'stepNumber', title: 'Step Number', type: 'number', validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'stepNumber' },
            prepare({ title, subtitle }) {
              return { title: `Step ${subtitle}: ${title}` }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'howItWorks',
      title: 'How It Works (legacy alias)',
      type: 'array',
      fieldset: 'process',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'howItWorksStep',
          fields: [
            defineField({ name: 'stepNumber', title: 'Step Number', type: 'number', validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'stepNumber' } },
        }),
      ],
    }),

    // ---------- Trust ----------
    defineField({
      name: 'trustBlock',
      title: 'Trust Block',
      type: 'object',
      fieldset: 'trust',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text' }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'stat',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
              ],
              preview: { select: { title: 'label', subtitle: 'value' } },
            }),
          ],
        }),
        defineField({
          name: 'badges',
          title: 'Badges / Certifications',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      fieldset: 'trust',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'city', title: 'City', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'quote', title: 'Quote', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'outcome', title: 'Outcome', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'city' } },
        }),
      ],
    }),

    // ---------- Supporting Blocks ----------
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      fieldset: 'blocks',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'benefit',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon', type: 'string', description: 'lucide-react icon name' }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      fieldset: 'blocks',
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
    defineField({
      name: 'faq',
      title: 'FAQ (legacy alias)',
      type: 'array',
      fieldset: 'blocks',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqLegacy',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),

    // ---------- CTA & Related ----------
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string', fieldset: 'cta' }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services (legacy)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'cta',
    }),
    defineField({
      name: 'relatedServiceLinks',
      title: 'Related Service Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'cta',
    }),
    defineField({
      name: 'relatedCityLinks',
      title: 'Related City Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      fieldset: 'cta',
    }),

    // ---------- Media ----------
    defineField({
      name: 'heroImage',
      title: 'Hero / Featured Image',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'altText',
      title: 'Image Alt Text (top-level)',
      type: 'string',
      description: 'Alt text for the hero image when generated by the image pipeline.',
      fieldset: 'media',
    }),
    defineField({
      name: 'imagePrompt',
      title: 'Image Prompt',
      type: 'text',
      rows: 3,
      description: 'Prompt used by the image generation system to produce the hero image.',
      fieldset: 'media',
    }),

    // ---------- SEO & Publishing ----------
    defineField({ name: 'seo', title: 'SEO (OG image, keywords, schema fields)', type: 'seoFields', fieldset: 'seo' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls', fieldset: 'publishing' }),
  ],
  preview: {
    select: {
      cityTitle: 'cityTitle',
      serviceSlug: 'serviceSlug',
      media: 'heroImage',
    },
    prepare({ cityTitle, serviceSlug, media }) {
      return {
        title: cityTitle ? `${cityTitle} - ${serviceSlug}` : 'New City Service Page',
        media,
      }
    },
  },
})
