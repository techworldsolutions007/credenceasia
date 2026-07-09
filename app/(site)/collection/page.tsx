import type {Metadata} from 'next'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import SmartImage from '@/components/shared/SmartImage'
import ImagePlaceholder from '@/components/shared/ImagePlaceholder'
import AnimateIn from '@/components/shared/AnimateIn'
import {ArrowRight} from 'lucide-react'

export const revalidate = 60

const PRODUCTS_QUERY = `*[_type == "product"] | order(order asc, name asc){
  _id, name, title, category, description, capabilityLine, capabilities, image
}`

export const metadata: Metadata = {
  title: 'Collection | Credence Asia Group',
  description:
    'Women, Men and Kids collections. Tops and Bottoms in Woven, Knits and Denim. Outerwear including seam-sealed, fleece, soft shell, complex washes and garment dye.',
}

const PRODUCT_TYPES = [
  {
    name: 'Outerwear',
    detail: 'Seam-sealed shells, fleece, soft-shell, technical jackets.',
    countries: ['China', 'Bangladesh'],
  },
  {
    name: 'Knits',
    detail: 'Tops, bottoms, sweats and base layers across weights.',
    countries: ['Bangladesh', 'India'],
  },
  {
    name: 'Woven',
    detail: 'Shirts, blouses, bottoms, dresses.',
    countries: ['Bangladesh', 'Vietnam', 'India'],
  },
  {
    name: 'Denim',
    detail: 'Five-pocket and beyond. Garment-dyed, rinsed and finished.',
    countries: ['Bangladesh', 'Vietnam'],
  },
  {
    name: 'Activewear',
    detail: 'Performance bottoms, tops and coordinates.',
    countries: ['India'],
  },
  {
    name: 'Workwear',
    detail: 'Heavy-duty cotton and blends, reinforced construction.',
    countries: ['China'],
  },
  {
    name: 'Casualwear',
    detail: 'Woven shirts, chinos and casualwear programmes.',
    countries: ['China', 'Bangladesh', 'Cambodia', 'Vietnam'],
  },
  {
    name: 'Beachwear',
    detail: 'Beach wears, cover-ups and coordinates.',
    countries: ['India'],
  },
]

type Product = {
  _id: string
  name?: string
  title?: string
  category?: string
  image?: any
  capabilityLine?: string
  capabilities?: string[]
}

export default async function CollectionPage() {
  const products: Product[] = await client.fetch(PRODUCTS_QUERY).catch(() => [])

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">

      {/* ── Slim page header ── */}
      <div className="border-b border-beige/70 px-6 py-7 md:px-10">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
          <div>
            <p className="type-eyebrow mb-1.5 text-clay">
              Credence Asia Group
            </p>
            <h1 className="type-h2 text-charcoal">
              Collection
            </h1>
          </div>
          <p className="hidden text-right type-small text-charcoal/55 md:block md:max-w-[38ch]">
            Women, Men &amp; Kids — woven, knits, denim and outerwear.
          </p>
        </div>
      </div>

      {/* ── Products grid ── */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-10">

          {/* Sanity products (if any) */}
          {products.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((p, i) => (
                <AnimateIn key={p._id} delay={(i % 5) * 0.06} y={22} className="h-full">
                <article
                  className="pp-card group flex h-full flex-col overflow-hidden border border-beige bg-white"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <SmartImage
                      source={p.image}
                      ratio="3/4"
                      tone="light"
                      label={p.title || p.name}
                      alt={p.title || p.name || ''}
                      width={600}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-4">
                    {p.category && (
                      <p className="type-eyebrow text-clay">
                        {p.category}
                      </p>
                    )}
                    <h3 className="font-serif text-[15px] font-normal leading-snug text-charcoal">
                      {p.title || p.name}
                    </h3>
                    {p.capabilities && p.capabilities.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {p.capabilities.map((c) => (
                          <span
                            key={c}
                            className="border border-beige px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-clay"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
                </AnimateIn>
              ))}
            </div>
          )}

          {/* Product type categories — always shown */}
          {products.length > 0 && (
            <h2 className="mb-6 mt-14 font-serif text-[1.1rem] font-normal text-charcoal/60">
              By category
            </h2>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {PRODUCT_TYPES.map((t, i) => (
              <AnimateIn key={t.name} delay={(i % 4) * 0.07} y={22} className="h-full">
                <article
                  className="pp-card group flex h-full flex-col overflow-hidden border border-beige bg-white"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <ImagePlaceholder
                      ratio="3/4"
                      tone="light"
                      label={t.name}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="font-serif text-[16px] font-normal text-charcoal">
                      {t.name}
                    </h3>
                    <p className="type-small text-charcoal/60">
                      {t.detail}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {t.countries.map((c) => (
                        <span
                          key={c}
                          className="border border-beige/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-clay"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Simple CTA strip ── */}
      <section className="border-t border-beige/60 bg-cream py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <h2 className="font-serif text-[1.55rem] font-normal text-charcoal md:text-[1.8rem]">
              Brief us on your category.
            </h2>
            <p className="mt-1.5 type-small text-charcoal/60">
              Share your programme and we'll match it to the right country and factory.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex h-11 flex-shrink-0 items-center gap-2.5 border border-soil/70 px-7 type-label text-soil transition-all duration-200 hover:bg-soil hover:text-ivory"
          >
            Start an Enquiry
            <ArrowRight size={13} strokeWidth={1.6} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </main>
  )
}
