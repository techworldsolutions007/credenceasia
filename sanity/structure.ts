import {CogIcon, LeaveIcon, PackageIcon, UsersIcon, EarthGlobeIcon, DocumentIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([

      // ── Pages ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Sustainability Page')
                .child(S.document().schemaType('sustainabilityPage').documentId('sustainabilityPage')),
              S.listItem()
                .title('Contact Page')
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
            ]),
        ),

      S.divider(),

      // ── Sustainability ──────────────────────────────────────────────────
      S.listItem()
        .title('Sustainability')
        .icon(LeaveIcon)
        .child(
          S.list()
            .title('Sustainability')
            .items([
              S.documentTypeListItem('sustainabilityItem').title('Sustainability Pillars'),
            ]),
        ),

      S.divider(),

      // ── Products ───────────────────────────────────────────────────────
      S.listItem()
        .title('Products')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('productCategory').title('Product Categories'),
              S.documentTypeListItem('product').title('Products'),
            ]),
        ),

      // ── Customers ──────────────────────────────────────────────────────
      S.listItem()
        .title('Customers')
        .icon(UsersIcon)
        .child(S.documentTypeList('customer').title('Customers')),

      // ── Production Network ─────────────────────────────────────────────
      S.listItem()
        .title('Production Network')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Production Network')
            .items([
              S.documentTypeListItem('productionLocation').title('Production Locations'),
              S.documentTypeListItem('country').title('Countries'),
            ]),
        ),

      S.divider(),

      // ── Settings ───────────────────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
