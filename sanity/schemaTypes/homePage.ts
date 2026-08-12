import {defineType, defineField} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Home Page',
    }),

    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Conscious quality and value through design',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Trusted sourcing, exceptional craft.',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Supporting Text',
      type: 'text',
      rows: 3,
      initialValue:
        'From first sketch to final delivery through one accountable pathway, with commercial presence across Europe and the Americas.',
    }),
    defineField({
      name: 'heroPrimaryButtonText',
      title: 'Hero Primary Button Text',
      type: 'string',
      initialValue: 'Start an Enquiry',
    }),
    defineField({
      name: 'heroPrimaryButtonLink',
      title: 'Hero Primary Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'heroSecondaryButtonText',
      title: 'Hero Secondary Button Text',
      type: 'string',
      initialValue: 'View Capabilities',
    }),
    defineField({
      name: 'heroSecondaryButtonLink',
      title: 'Hero Secondary Button Link',
      type: 'string',
      initialValue: '/collection',
    }),

    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      initialValue: 'Built for sourcing teams.',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      rows: 4,
      initialValue:
        'Founded in 2016 in Hong Kong, Credence Asia Group links European and American design and market knowledge with disciplined Asian manufacturing.',
    }),
    defineField({
      name: 'aboutPoints',
      title: 'About Highlight Points',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'productionTitle',
      title: 'Production Network Title',
      type: 'string',
      initialValue: 'Production across six countries.',
    }),
    defineField({
      name: 'productionText',
      title: 'Production Network Text',
      type: 'text',
      rows: 3,
      initialValue:
        'Long-standing supply chain execution with a network of trusted factories across China, Bangladesh, India, Cambodia, Vietnam and Myanmar, coordinated from Hong Kong.',
    }),

    defineField({
      name: 'journeyStages',
      title: 'Garment Journey, Production Stages',
      description:
        'Each item becomes one stage in the production journey on the homepage. Add up to six entries in production order: Research, Sample, Source, Manufacture, Quality Control, Deliver.',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(8),
      of: [
        {
          type: 'object',
          name: 'journeyStage',
          title: 'Journey Stage',
          fields: [
            defineField({
              name: 'label',
              title: 'Stage Label',
              description: 'Short name of the production stage, e.g. "Sample", "Source", "Manufacture".',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'stat',
              title: 'Stat (big number)',
              description:
                'Headline figure shown large, e.g. "7d", "40+", "AQL 1.5". Keep it short, one to four characters reads best.',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'statLabel',
              title: 'Stat Caption',
              description: 'Small text shown below the stat, e.g. "first prototype", "mill partnerships".',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'variant',
              title: 'Panel Variant',
              description:
                'Choose "QC" for the quality control stage to add five inspection-gate dots that animate in sequence. All other stages use "Default".',
              type: 'string',
              options: {
                list: [
                  {title: 'Default', value: 'default'},
                  {title: 'QC (five inspection-gate dots)', value: 'qc'},
                ],
                layout: 'radio',
              },
              initialValue: 'default',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'stat'},
            prepare({title, subtitle}: Record<string, any>) {
              return {
                title: title || 'Untitled stage',
                subtitle: subtitle ? `Stat: ${subtitle}` : undefined,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'sustainabilityTitle',
      title: 'Sustainability Section Title',
      type: 'string',
      initialValue: 'Step by step towards a more sustainable future.',
    }),
    defineField({
      name: 'sustainabilityText',
      title: 'Sustainability Section Text',
      type: 'text',
      rows: 3,
      initialValue:
        'Real progress over marketing. We invest in audits, materials and routing that reduce impact today and document it so you can prove it to your customers.',
    }),

    defineField({
      name: 'productTitle',
      title: 'Products Section Title',
      type: 'string',
      initialValue: 'Product expertise.',
    }),
    defineField({
      name: 'productText',
      title: 'Products Section Text',
      type: 'text',
      rows: 2,
      initialValue:
        'Six product disciplines across our six-country network. From outerwear and denim to performance and casual programs.',
    }),

    defineField({
      name: 'customersTitle',
      title: 'Customers Section Title',
      type: 'string',
      initialValue: 'Trusted by apparel brands.',
    }),
    defineField({
      name: 'customersText',
      title: 'Customers Section Text',
      type: 'text',
      rows: 2,
      initialValue:
        'We partner with European and American brands and retailers who demand consistent quality, ethical compliance and transparent supply chain management.',
    }),

    defineField({
      name: 'ctaTitle',
      title: 'CTA Heading',
      type: 'string',
      initialValue: 'Start your sourcing enquiry.',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      rows: 3,
      initialValue:
        'Share category, quantity and timeline. We will come back with the right production pathway, named team and indicative cost.',
    }),
    defineField({
      name: 'ctaPrimaryButtonText',
      title: 'CTA Primary Button Text',
      type: 'string',
      initialValue: 'Start an Enquiry',
    }),
    defineField({
      name: 'ctaPrimaryButtonLink',
      title: 'CTA Primary Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'ctaSecondaryButtonText',
      title: 'CTA Secondary Button Text',
      type: 'string',
      initialValue: 'View capabilities',
    }),
    defineField({
      name: 'ctaSecondaryButtonLink',
      title: 'CTA Secondary Button Link',
      type: 'string',
      initialValue: '/collection',
    }),
  ],
  preview: {select: {title: 'title'}},
})
