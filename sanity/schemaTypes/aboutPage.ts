import {defineType, defineField} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Page Title', type: 'string', initialValue: 'About Credence Asia Group'}),
    defineField({name: 'introText', title: 'Hero Intro Text', type: 'text', rows: 3, initialValue: 'Conscious quality and value through design. Proven, end-to-end apparel sourcing across Asia.'}),
    defineField({
      name: 'heroImage',
      title: 'About Page — Hero Background Image',
      description: 'Background image shown behind the hero section on the About page. Recommended: wide landscape format, 1400px+ wide. Displayed at low opacity as an overlay.',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({name: 'whoTitle', title: 'Who We Are title', type: 'string', initialValue: 'Founded in 2016 in Hong Kong.'}),
    defineField({name: 'whoText', title: 'Who We Are text', type: 'text', rows: 5, initialValue: 'Credence Asia Group is built on years of hands-on apparel and textile production across Asia, shaped by long-standing supplier partnerships and disciplined quality systems. We honour the fundamentals that have always guided responsible manufacturing, ethics, compliance and consistency, while continually investing in the innovation needed to meet tomorrow\'s standards.'}),

    defineField({name: 'whatTitle', title: 'What We Do title', type: 'string', initialValue: 'From first sketch to final delivery.'}),
    defineField({name: 'whatText', title: 'What We Do text', type: 'text', rows: 5, initialValue: 'Our work spans the entire journey from first sketch to final delivery, managed through one accountable pathway that brings clarity in cost, precision in execution and confidence at every stage.'}),

    defineField({
      name: 'image',
      title: 'About page philosophy section image, left column',
      description: 'Image shown on the left side of the Production Philosophy section mid-page on the About page. Portrait format 4:5 ratio. Factory visit, fabric inspection, team.',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({name: 'ctaTitle', title: 'CTA Heading', type: 'string', initialValue: 'Ready to work with us?'}),
    defineField({name: 'ctaText', title: 'CTA Text', type: 'text', rows: 2, initialValue: 'Share your category, quantity, timeline, and sourcing requirements. Our team will help build the right production pathway for your brand.'}),
  ],
  preview: {select: {title: 'title'}},
})
