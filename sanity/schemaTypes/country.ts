import {defineType, defineField} from 'sanity'

export const country = defineType({
  name: 'country',
  title: 'Production Country',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Country Name', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'tag',
      title: 'Category Tag',
      type: 'string',
      description: 'Short label shown in the network card. e.g. "Manufacturing", "Production", "Coordination Hub"',
    }),
    defineField({
      name: 'svgId',
      title: 'SVG Country Code (ISO alpha-3)',
      type: 'string',
      description: 'Three-letter ISO code matching the path ID in the Asia SVG map. e.g. CHN, BGD, IND, VNM, KHM, MMR, HKG. Used to highlight the country on the map and link dots to cards.',
    }),
    defineField({
      name: 'role',
      title: 'Role / Description',
      type: 'text',
      rows: 2,
      description: 'Shown in the country card below the map. e.g. "36 production lines, 3,700 employees, 1M pcs per month"',
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key product categories or capabilities for this country.',
    }),
    defineField({name: 'isHub', title: 'Coordination Hub?', type: 'boolean', description: 'Turn on for Hong Kong. Hides the card from the grid but still plots on the map.', initialValue: false}),
    defineField({name: 'latitude', title: 'Latitude', type: 'number'}),
    defineField({name: 'longitude', title: 'Longitude', type: 'number'}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tag'},
  },
})