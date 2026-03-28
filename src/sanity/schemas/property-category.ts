import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'propertyCategory',
  title: 'Property Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'reference',
      to: [{ type: 'city' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'apartment' },
          { title: 'Condo', value: 'condo' },
          { title: 'House', value: 'house' },
          { title: 'Townhouse', value: 'townhouse' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableContent',
    }),
    defineField({
      name: 'averageRent',
      title: 'Average Rent',
      type: 'number',
    }),
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
      title: 'title',
      subtitle: 'propertyType',
    },
  },
})
