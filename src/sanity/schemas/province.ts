import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * Province / State page schema.
 * Covers both Canadian provinces and US states (distinguished by the `country` field).
 * Kept under the existing type name `province` to avoid breaking published content;
 * the title/description reflect the broader scope per contract §20.7.
 */
export default defineType({
  name: 'province',
  title: 'Province / State',
  type: 'document',
  fieldsets: [
    { name: 'identity', title: 'Identity' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Content Blocks' },
    { name: 'legal', title: 'Local Law & Trust' },
    { name: 'links', title: 'Internal Links' },
    { name: 'media', title: 'Media' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    // ---------- Identity ----------
    defineField({
      name: 'title',
      title: 'Province / State Name',
      type: 'string',
      description: 'Full display name (e.g. "Ontario", "Florida"). Used as the primary label.',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'provinceOrStateName',
      title: 'Province or State Name (alias)',
      type: 'string',
      description: 'Explicit alias for contract compliance. Mirror of Title when empty.',
      fieldset: 'identity',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'abbreviation',
      title: 'Province / State Code',
      type: 'string',
      description: 'Two-letter code (e.g., ON, FL).',
      fieldset: 'identity',
    }),
    defineField({
      name: 'provinceOrStateCode',
      title: 'Province or State Code (alias)',
      type: 'string',
      description: 'Explicit alias for contract compliance. Mirror of Abbreviation when empty.',
      fieldset: 'identity',
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
      name: 'introBody',
      title: 'Intro Body',
      type: 'portableContent',
      fieldset: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description (legacy)',
      type: 'text',
      description: 'Legacy plain-text description. Prefer Intro Body.',
      fieldset: 'content',
    }),
    defineField({
      name: 'serviceSummaryBlocks',
      title: 'Service Summary Blocks',
      type: 'array',
      fieldset: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceSummary',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'summary', title: 'Summary', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'serviceRef', title: 'Linked Service', type: 'reference', to: [{ type: 'service' }] }),
            defineField({ name: 'icon', title: 'Icon', type: 'string', description: 'lucide-react icon name' }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
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

    // ---------- Legal ----------
    defineField({
      name: 'localLawSummary',
      title: 'Local Law Summary',
      type: 'portableContent',
      description: 'Province- or state-wide landlord/tenant law overview.',
      fieldset: 'legal',
    }),

    // ---------- Internal Links ----------
    defineField({
      name: 'internalLinkBlocks',
      title: 'Internal Link Blocks',
      type: 'array',
      fieldset: 'links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'linkBlock',
          fields: [
            defineField({ name: 'heading', title: 'Block Heading', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'link',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'url', title: 'URL', type: 'string', validation: (Rule) => Rule.required() }),
                  ],
                  preview: { select: { title: 'label' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
    }),
    defineField({
      name: 'relatedServiceLinks',
      title: 'Related Service Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'links',
    }),
    defineField({
      name: 'relatedCityLinks',
      title: 'Related City Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
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

    // ---------- SEO & Publishing objects ----------
    defineField({
      name: 'seo',
      title: 'SEO (shared object - OG image, keywords, schema fields)',
      type: 'seoFields',
      fieldset: 'seo',
    }),
    defineField({
      name: 'publishing',
      title: 'Publishing Controls',
      type: 'publishingControls',
      fieldset: 'publishing',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'country',
      media: 'heroImage',
    },
  },
})
