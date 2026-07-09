import {defineType, defineField} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Product Name', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Women', 'Men', 'Kids', 'Outerwear', 'Activewear', 'Workwear', 'Denim', 'Knits', 'Woven', 'Accessories']},
    }),
    defineField({
      name: 'image',
      title: 'Product Main Image (Collections Page Card)',
      description: 'Primary image for this product — shown on the Collections page product grid card. Recommended: portrait format (3:4 ratio), high quality garment photo on neutral background.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery — Additional Images (optional)',
      description: 'Extra photos for this product. Can include detail shots, alternate angles, or fabric close-ups.',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'title',
      title: 'Garment Title',
      description: 'Descriptive label shown on the tile, e.g. "Garment-dyed cotton overshirt". Falls back to Product Name if left blank.',
      type: 'string',
    }),
    defineField({
      name: 'capabilityLine',
      title: 'Capability Line',
      description: 'One-line fabric + construction descriptor shown under the title, e.g. "Garment-dyed cotton overshirt — woven".',
      type: 'string',
    }),
    defineField({
      name: 'capabilities',
      title: 'Capability Chips',
      description: 'Per-garment tags shown as chips on the tile: fabric type, construction technique, MOQ tier, etc. Leave empty to show no chips.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({name: 'description', title: 'Short Description', type: 'text', rows: 3}),
    defineField({name: 'featured', title: 'Show on Home Page?', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  preview: {select: {title: 'name', subtitle: 'category', media: 'image'}},
})