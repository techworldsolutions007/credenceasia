import {defineType, defineField} from 'sanity'

export const denimGrid = defineType({
  name: 'denimGrid',
  title: 'Denim Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Label shown in Sanity Studio only.',
    }),
    defineField({
      name: 'layout',
      title: 'Grid Layout',
      type: 'string',
      options: {
        list: [
          {
            title: 'Grid A — 4 top portraits + 4 small + 1 wide feature (9 images)',
            value: 'A',
          },
          {
            title: 'Grid B — 1 wide feature + 4 tall portraits, single row (5 images)',
            value: 'B',
          },
          {
            title: 'Grid C — Bento: 2×2 hero + 1×2 portrait + 4 squares + 2×1 wide (7 images)',
            value: 'C',
          },
          {
            title: 'Grid D — 4-col square grid (12 images)',
            value: 'D',
          },
          {
            title: 'Grid E — 5 equal tall portraits in a single row (5 images)',
            value: 'E',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'A',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Uncheck to hide this grid from the collection page without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description:
        'Grid A: 9 imgs · Grid B: 5 imgs · Grid C: 7 imgs (bento) · Grid D: 12 imgs (4×3 squares) · Grid E: 5 imgs',
      of: [
        {
          type: 'object',
          name: 'gridImage',
          title: 'Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
          preview: {
            select: {media: 'image', title: 'alt'},
            prepare({media, title}: Record<string, any>) {
              return {media, title: title ?? 'Image'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', layout: 'layout'},
    prepare({title, layout}: Record<string, any>) {
      return {
        title: title ?? 'Denim Grid',
        subtitle: layout ? `Grid ${layout}` : 'No layout selected',
      }
    },
  },
})
