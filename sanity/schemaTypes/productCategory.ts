import {defineType, defineField} from 'sanity'

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Category Name', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}}),
    defineField({
      name: 'image',
      title: 'Product Category Card Image',
      description: 'Hero image for this product category. Shown on the homepage product grid cards and the collection page. Portrait format (3:4 ratio), high quality garment or fabric photo.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'shortText', title: 'Short Description', type: 'string', description: 'One-line description shown on cards'}),
    defineField({name: 'description', title: 'Full Description', type: 'text', rows: 3}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
    defineField({name: 'isFeatured', title: 'Show on Homepage?', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'name', subtitle: 'shortText', media: 'image'}},
  orderings: [{
    title: 'Display Order',
    name: 'orderAsc',
    by: [{field: 'order', direction: 'asc'}],
  }],
})
