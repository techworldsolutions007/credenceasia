import {defineType, defineField} from 'sanity'

export const customer = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Customer / Brand Name', type: 'string'}),
    defineField({
      name: 'logo',
      title: 'Customer Brand Logo Image',
      description: 'Upload the customer or brand logo. Shown in the customers grid on the homepage and Customers page. PNG with transparent background, landscape format, min 300px wide.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'type',
      title: 'Customer Type',
      type: 'string',
      options: {list: ['Brand', 'Retailer', 'Sourcing Partner', 'Other']},
    }),
    defineField({name: 'country', title: 'Country / Region', type: 'string'}),
    defineField({name: 'website', title: 'Website URL', type: 'url'}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
    defineField({name: 'isFeatured', title: 'Show on Homepage?', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'name', subtitle: 'type', media: 'logo'}},
  orderings: [{
    title: 'Display Order',
    name: 'orderAsc',
    by: [{field: 'order', direction: 'asc'}],
  }],
})
