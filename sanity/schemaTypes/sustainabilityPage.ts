import {defineType, defineField} from 'sanity'

export const sustainabilityPage = defineType({
  name: 'sustainabilityPage',
  title: 'Sustainability Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Page Title', type: 'string', initialValue: 'Responsible Sourcing and Sustainability'}),
    defineField({name: 'introText', title: 'Hero Intro Text', type: 'text', rows: 3, initialValue: 'Sustainability is not a feature. It is a responsibility embedded in every sourcing and production decision we support.'}),
    defineField({
      name: 'heroImage',
      title: 'Sustainability Page — Hero Background Image',
      description: 'Background image shown behind the hero section on the Sustainability page. Displayed at low opacity as an overlay over the green gradient. Recommended: wide landscape format, 1400px+ wide. (e.g. natural materials, fabric, leaves, green production)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'sections',
      title: 'Sustainability Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'sectionTitle', title: 'Section Title', type: 'string'},
          {name: 'sectionText', title: 'Section Text', type: 'text', rows: 4},
          {
            name: 'sectionImage',
            title: 'Sustainability Section — Supporting Image',
            description: 'Optional image to accompany this section. Shown alongside the section text. Recommended: landscape or portrait format.',
            type: 'image',
            options: {hotspot: true},
          },
        ],
        preview: {select: {title: 'sectionTitle'}},
      }],
    }),
    defineField({name: 'ctaTitle', title: 'CTA Heading', type: 'string', initialValue: 'Building a more responsible supply chain together.'}),
    defineField({name: 'ctaText', title: 'CTA Text', type: 'text', rows: 2, initialValue: 'Contact our team to discuss sourcing decisions aligned with your sustainability commitments.'}),
  ],
  preview: {select: {title: 'title'}},
})
