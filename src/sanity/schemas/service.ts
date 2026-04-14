import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fieldsets: [
    { name: 'identity', title: 'Identity' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Content' },
    { name: 'pricing', title: 'Pricing & CTA' },
    { name: 'media', title: 'Media' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    // ---------- Identity ----------
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceName',
      title: 'Service Name (alias)',
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
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: [
          { title: 'Property Owner', value: 'owner' },
          { title: 'Tenant', value: 'tenant' },
          { title: 'Both', value: 'both' },
        ],
      },
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'lucide-react icon name (e.g., "home", "key", "building")',
      fieldset: 'identity',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'One-liner used on service cards and listings.',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),

    // ---------- Content ----------
    defineField({
      name: 'introBody',
      title: 'Intro Body',
      type: 'portableContent',
      fieldset: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Main Body (legacy)',
      type: 'portableContent',
      description: 'Legacy body. Prefer Intro Body + How It Works + Benefits.',
      fieldset: 'content',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      fieldset: 'content',
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
      name: 'howItWorks',
      title: 'How It Works (ordered)',
      type: 'array',
      fieldset: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
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
    defineField({
      name: 'faq',
      title: 'FAQ (legacy)',
      type: 'array',
      description: 'Legacy FAQ field. Prefer FAQ Items above.',
      fieldset: 'content',
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

    // ---------- Pricing & CTA ----------
    defineField({
      name: 'pricingSummary',
      title: 'Pricing Summary',
      type: 'portableContent',
      description: 'Transparent pricing / success-fee model summary.',
      fieldset: 'pricing',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'Button / form headline shown on the page.',
      fieldset: 'pricing',
    }),
    defineField({
      name: 'ctaFormVariant',
      title: 'CTA Form Variant',
      type: 'string',
      fieldset: 'pricing',
      options: {
        list: [
          { title: 'Owner lead form', value: 'owner-lead' },
          { title: 'Tenant lead form', value: 'tenant-lead' },
          { title: 'Short contact form', value: 'contact-short' },
          { title: 'Multi-step qualifier', value: 'qualifier-multistep' },
          { title: 'Call-only CTA', value: 'call-only' },
        ],
      },
    }),
    defineField({
      name: 'relatedServiceLinks',
      title: 'Related Service Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'pricing',
    }),
    defineField({
      name: 'relatedCityLinks',
      title: 'Related City Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      fieldset: 'pricing',
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
      subtitle: 'audience',
      media: 'heroImage',
    },
  },
})
