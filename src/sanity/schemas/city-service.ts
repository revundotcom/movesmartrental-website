import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cityService',
  title: 'City Service Page',
  type: 'document',
  fieldsets: [
    { name: 'references', title: 'City & Service References' },
    { name: 'denormalized', title: 'Denormalized Fields (auto-populated)', options: { collapsible: true, collapsed: true } },
    { name: 'localContent', title: 'Required Local Content', description: 'These fields MUST be filled to prevent thin content' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'blocks', title: 'Content Blocks', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ---------- References ----------
    defineField({
      name: 'city',
      title: 'City',
      type: 'reference',
      to: [{ type: 'city' }],
      fieldset: 'references',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      fieldset: 'references',
      validation: (Rule) => Rule.required(),
    }),

    // ---------- Denormalized Fields ----------
    defineField({
      name: 'cityTitle',
      title: 'City Title',
      type: 'string',
      fieldset: 'denormalized',
      readOnly: true,
    }),
    defineField({
      name: 'provinceSlug',
      title: 'Province Slug',
      type: 'string',
      fieldset: 'denormalized',
      readOnly: true,
    }),
    defineField({
      name: 'citySlug',
      title: 'City Slug',
      type: 'string',
      fieldset: 'denormalized',
      readOnly: true,
    }),
    defineField({
      name: 'serviceSlug',
      title: 'Service Slug',
      type: 'string',
      fieldset: 'denormalized',
      readOnly: true,
    }),

    // ---------- Required Local Content ----------
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

    // ---------- Hero Section ----------
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroCta1',
      title: 'Hero CTA 1',
      type: 'object',
      fieldset: 'hero',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroCta2',
      title: 'Hero CTA 2',
      type: 'object',
      fieldset: 'hero',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      fieldset: 'hero',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ---------- Content Blocks ----------
    defineField({
      name: 'painPoints',
      title: 'Pain Points',
      type: 'array',
      fieldset: 'blocks',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'problem',
              title: 'Problem',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'solution',
              title: 'Solution',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'problem' },
          },
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      fieldset: 'blocks',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'lucide-react icon name',
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      fieldset: 'blocks',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'stepNumber',
            },
            prepare({ title, subtitle }) {
              return {
                title: `Step ${subtitle}: ${title}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      fieldset: 'blocks',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'outcome',
              title: 'Outcome',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'city',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      fieldset: 'blocks',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),

    // ---------- Related ----------
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),

    // ---------- SEO & Publishing ----------
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
    defineField({
      name: 'publishing',
      title: 'Publishing Controls',
      type: 'publishingControls',
    }),
  ],
  preview: {
    select: {
      cityTitle: 'cityTitle',
      serviceSlug: 'serviceSlug',
      media: 'heroImage',
    },
    prepare({ cityTitle, serviceSlug, media }) {
      return {
        title: cityTitle ? `${cityTitle} — ${serviceSlug}` : 'New City Service Page',
        media,
      }
    },
  },
})
