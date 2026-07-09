import {defineType, defineField} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Page Title', type: 'string', initialValue: 'Contact Credence Asia'}),
    defineField({name: 'introText', title: 'Intro Text', type: 'text', rows: 3, initialValue: 'Share your sourcing, product development, or production requirements with our team.'}),
    defineField({
      name: 'image',
      title: 'Contact Page — Sidebar Decorative Image',
      description: 'Image shown next to the contact form on the right side of the Contact page. Recommended: portrait format (4:5 ratio), high quality. (e.g. office, team, fabric studio)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'email', title: 'Contact Email', type: 'string', initialValue: 'amita@credenceasialtd.com'}),
    defineField({name: 'phone', title: 'Phone Number', type: 'string', initialValue: '+852 2650 0058'}),
    defineField({name: 'address', title: 'Office Address', type: 'text', rows: 3, initialValue: 'Unit 608, 8/F, Hope Sea Industrial Centre\n26 Lam Hing Street, Kowloon Bay\nKowloon, Hong Kong'}),
  ],
  preview: {select: {title: 'title'}},
})
