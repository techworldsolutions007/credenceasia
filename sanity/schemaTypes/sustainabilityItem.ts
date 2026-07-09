import {defineType, defineField} from 'sanity'

export const sustainabilityItem = defineType({
  name: 'sustainabilityItem',
  title: 'Sustainability Item',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'shortText', title: 'Short Description', type: 'text', rows: 2, description: 'Shown on homepage preview cards'}),
    defineField({name: 'fullText', title: 'Full Description', type: 'text', rows: 4, description: 'Shown on sustainability page'}),
    defineField({
      name: 'icon',
      title: 'Sustainability Item icon or illustration',
      description: 'Optional icon or illustration for this sustainability topic. Square format, PNG with transparent background or simple graphic.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
    defineField({name: 'isFeatured', title: 'Show on Homepage?', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'title', subtitle: 'shortText'}},
  orderings: [{
    title: 'Display Order',
    name: 'orderAsc',
    by: [{field: 'order', direction: 'asc'}],
  }],
})
