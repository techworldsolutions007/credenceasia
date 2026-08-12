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
    defineField({
      name: 'headline',
      title: 'Headline / Copy Text',
      type: 'string',
      description: 'Short text used in B (below hero image), D (above portrait), and E (mosaic caption).',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Upload images here. Required count — A: 4 · B: 5 · C: 5 · D: 4 · E: 10 · F: 5',
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
    select: {title: 'title', subtitle: 'layout'},
    prepare({title, subtitle}: Record<string, any>) {
      return {
        title: title ?? 'Denim Grid',
        subtitle: subtitle ? `Layout ${subtitle}` : 'No layout selected',
      }
    },
  },
})
