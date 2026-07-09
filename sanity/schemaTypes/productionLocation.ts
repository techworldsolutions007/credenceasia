import {defineType, defineField} from 'sanity'

export const productionLocation = defineType({
  name: 'productionLocation',
  title: 'Production Location',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Location Name', type: 'string', description: 'e.g. Hong Kong, India, Bangladesh'}),
    defineField({name: 'country', title: 'Country', type: 'string'}),
    defineField({name: 'shortText', title: 'Short Role / Capability', type: 'string', description: 'e.g. Regional coordination hub'}),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List specific product or service capabilities here',
    }),
    defineField({
      name: 'image',
      title: 'Production Location — Country / Factory Image',
      description: 'Optional photo representing this production location (e.g. city skyline, factory exterior, fabric market). Used if a visual map layout is added. Recommended: landscape format.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'latitude', title: 'Latitude', type: 'number'}),
    defineField({name: 'longitude', title: 'Longitude', type: 'number'}),
    defineField({name: 'isHub', title: 'Mark as Hub?', type: 'boolean', description: 'Use for coordination hubs like Hong Kong', initialValue: false}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  preview: {select: {title: 'name', subtitle: 'country', media: 'image'}},
  orderings: [{
    title: 'Display Order',
    name: 'orderAsc',
    by: [{field: 'order', direction: 'asc'}],
  }],
})
