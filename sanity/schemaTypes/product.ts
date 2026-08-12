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
      name: 'gender',
      title: 'Collection Tab (Men / Women)',
      description:
        'Which tab this product appears under on the Collection page. "Both" shows it under Men and Women. Products without a value appear under both tabs.',
      type: 'string',
      options: {list: ['Men', 'Women', 'Both'], layout: 'radio'},
      initialValue: 'Both',
    }),
    defineField({
      name: 'image',
      title: 'Product Main Image (Collections Page Card)',
      description: 'Primary image for this product — shown on the Collections page product grid card. Recommended: portrait format (3:4 ratio), high quality garment photo on neutral background.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Brief description of the image for screen readers. Leave blank to hide from assistive technology.',
        }),
      ],
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
    defineField({
      name: 'gridLayout',
      title: 'Grid Layout',
      description: 'Which denim grid layout to use when this product is displayed in the editorial grid. Leave blank to inherit the default.',
      type: 'string',
      options: {
        list: [
          {title: 'A · Staggered Rail  (4 images)', value: 'A'},
          {title: 'B · Hero + Row      (5 images)', value: 'B'},
          {title: 'C · Even Five-Up   (5 images)', value: 'C'},
          {title: 'D · Lifestyle Mix   (4 images)', value: 'D'},
          {title: 'E · Edge-to-Edge Mosaic  (10 images)', value: 'E'},
          {title: 'F · Swipe Strip    (5 images)', value: 'F'},
        ],
        layout: 'radio',
      },
    }),
    defineField({name: 'description', title: 'Short Description', type: 'text', rows: 3}),
    defineField({
      name: 'featured',
      title: 'Featured (Gallery Wide Tile)',
      description: 'When enabled, this product appears as a full-width banner spanning all columns in the Gallery page. Use sparingly — at most one per category.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  preview: {select: {title: 'name', subtitle: 'category', media: 'image'}},
})