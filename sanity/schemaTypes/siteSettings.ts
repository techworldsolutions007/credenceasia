import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Credence Asia Group'}),
    defineField({
      name: 'logo',
      title: 'Brand Logo Image (Navbar + Footer)',
      description: 'The Credence Asia logo — appears in the top navbar and the site footer. Recommended: PNG with transparent background, landscape orientation, min 400px wide.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'email', title: 'Contact Email', type: 'string', initialValue: 'amita@credenceasialtd.com'}),
    defineField({name: 'phone', title: 'Phone', type: 'string', initialValue: '+852 2650 0058'}),
    defineField({name: 'address', title: 'Office Address', type: 'text', rows: 3, initialValue: 'Unit 608, 8/F, Hope Sea Industrial Centre\n26 Lam Hing Street, Kowloon Bay\nKowloon, Hong Kong'}),
    defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'footerText', title: 'Footer Tagline', type: 'string', initialValue: 'European design intelligence, Asian production scale. From research in Copenhagen to delivery from Asia.'}),
    defineField({name: 'metaTitle', title: 'Default Meta Title', type: 'string', initialValue: 'Credence Asia Group, Apparel Sourcing and Production Partner'}),
    defineField({name: 'metaDescription', title: 'Default Meta Description', type: 'text', rows: 2, initialValue: 'Credence Asia Group supports apparel brands with product development, sourcing, sampling, production coordination, quality control, and delivery across global manufacturing networks.'}),
    defineField({
      name: 'ogImage',
      title: 'Default Social Share / OG Image',
      description: 'Image shown when any page is shared on LinkedIn, WhatsApp, or other social platforms. Recommended: 1200 × 630 px, JPG or PNG.',
      type: 'image',
    }),
  ],
  preview: {select: {title: 'siteName'}},
})
