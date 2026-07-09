import type {Metadata} from 'next'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import {customersQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import SectionHeading from '@/components/shared/SectionHeading'
import BrandLogo from '@/components/shared/BrandLogo'
import AnimateIn from '@/components/shared/AnimateIn'
import {CUSTOMER_BRANDS, CUSTOMER_CATEGORIES, groupByCategory} from '@/lib/customers'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Our Customers | Credence Asia Group',
  description:
    'Credence Asia Group works with fashion brands, retailers, and industrial uniform customers across Europe, the Americas and Asia.',
}

type Customer = {
  _id: string
  name: string
  logo?: any
  type?: string
  country?: string
  isFeatured?: boolean
}

export default async function CustomersPage() {
  const sanityCustomers: Customer[] = await client.fetch(customersQuery).catch(() => [])

  // Sanity-driven customers (if Studio is populated) get rendered first.
  // The static 25 from the PDF render as the seed catalogue below.
  const grouped = groupByCategory(CUSTOMER_BRANDS)

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 md:py-40"
        style={{background: 'linear-gradient(130deg, var(--color-navy) 0%, var(--color-clay) 70%, #647490 100%)'}}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(246,241,232,0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <AnimateIn><p className="type-eyebrow mb-5 text-mist/90">Our Customers</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="type-hero mb-7 text-ivory">
              Trusted by fashion, retail and industrial uniform brands.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mx-auto max-w-2xl type-body text-ivory/75">
              From Scandinavian fashion houses to European automotive uniform programs,
              we develop and produce apparel for brands across categories and continents.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-beige/40 bg-cream py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              {value: '25+', label: 'Active customers'},
              {value: '6',    label: 'Customer categories'},
              {value: '3',    label: 'Continents served'},
              {value: '10+',  label: 'Years in operation'},
            ].map((s, i) => (
              <AnimateIn key={s.label} delay={i * 0.08} y={18}>
                <p className="type-stat text-charcoal">{s.value}</p>
                <p className="type-label mt-1 text-clay">{s.label}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Customers grouped by category */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Customer portfolio"
            title="Six categories, one production pathway."
            subtitle="We support brands across fashion, premium denim, retail, kidswear, workwear and industrial uniform programs."
            className="mb-16"
          />

          <div className="flex flex-col gap-16">
            {CUSTOMER_CATEGORIES.map((cat) => {
              const brands = grouped[cat]
              if (!brands?.length) return null
              return (
                <AnimateIn key={cat} y={24}>
                  <div className="mb-6 flex items-center gap-4">
                    <p className="type-label text-soil">
                      {cat}
                    </p>
                    <span className="block h-px flex-1 bg-beige" />
                    <p className="type-eyebrow text-clay">
                      {brands.length} {brands.length === 1 ? 'partner' : 'partners'}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-beige/40 md:grid-cols-4 lg:grid-cols-5">
                    {brands.map((brand) => (
                      <div
                        key={brand.slug}
                        className="flex min-h-[140px] flex-col items-center justify-center gap-3 bg-ivory p-6 transition-colors duration-300 hover:bg-cream"
                      >
                        <BrandLogo brand={brand} />
                        <p className="type-eyebrow mt-2 text-clay">
                          {brand.region}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          {/* If Sanity has additional customers, append them as a separate block */}
          {sanityCustomers.length > 0 && (
            <div className="mt-20">
              <div className="mb-6 flex items-center gap-4">
                <p className="type-label text-soil">
                  More partners
                </p>
                <span className="block h-px flex-1 bg-beige" />
              </div>
              <div className="grid grid-cols-3 gap-px bg-beige/40 md:grid-cols-4 lg:grid-cols-5">
                {sanityCustomers.map((c) => {
                  const logoUrl = c.logo ? urlFor(c.logo).width(300).height(120).url() : null
                  return (
                    <div
                      key={c._id}
                      className="flex min-h-[140px] flex-col items-center justify-center gap-3 bg-ivory p-6"
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={c.name}
                          className="max-h-12 w-full object-contain"
                        />
                      ) : (
                        <span className="type-label text-charcoal/85">
                          {c.name}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Credibility statement */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <figure>
            <blockquote className="type-quote text-charcoal/90">
              {`"Our partnerships are built on consistent delivery, clear communication, and a genuine understanding of each brand's product requirements."`}
            </blockquote>
            <figcaption className="type-eyebrow mt-6 text-clay">
              Credence Asia Group
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="type-h2 mb-6 text-ivory">
            Ready to become a partner?
          </h2>
          <p className="mb-10 type-body text-mist/85">
            Share your sourcing and product development requirements with our team.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center bg-ivory px-8 type-label text-navy transition-all duration-300 hover:bg-cream"
          >
            Start an Enquiry
          </Link>
        </div>
      </section>
    </main>
  )
}
