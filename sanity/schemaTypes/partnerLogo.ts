import {defineType, defineField} from 'sanity'

export const partnerLogo = defineType({
  name: 'partnerLogo',
  title: 'Partner Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand / Partner Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      description: 'PNG with transparent background preferred. Landscape format, min 300 px wide.',
      type: 'image',
      options: {hotspot: false},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Lower numbers appear first in the logo wall.',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
