import type {Metadata} from 'next'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import SmartImage from '@/components/shared/SmartImage'
import AnimateIn from '@/components/shared/AnimateIn'
import {ArrowRight} from 'lucide-react'

export const revalidate = 60

const PRODUCTS_QUERY = `*[_type == "product"] | order(order asc, name asc){
  _id, name, title, category, image
}`

export const metadata: Metadata = {
  title: 'Collection | Credence Asia Group',
  description:
    'Women, Men and Kids collections. Tops and Bottoms in Woven, Knits and Denim. Outerwear including seam-sealed, fleece, soft shell, complex washes and garment dye.',
}

const CATEGORIES = [
  'Outerwear',
  'Knits',
  'Woven',
  'Denim',
  'Activewear',
  'Workwear',
  'Casualwear',
  'Beachwear',
]


type Product = {
  _id: string
  name?: string
  title?: string
  category?: string
  image?: any
}

export default async function CollectionPage() {
  const products: Product[] = await client.fetch(PRODUCTS_QUERY).catch(() => [])

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">

      {/* ── Page header ──────────────────────────────────────────── */}
      <header className="border-b border-beige px-6 pb-8 pt-10 md:px-12 md:pt-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-end justify-between gap-8">

            <div>
              <p className="type-eyebrow mb-2 text-clay">Credence Asia Group</p>
              <h1 className="font-serif text-[2.4rem] font-normal leading-none tracking-tight text-charcoal md:text-[3.2rem]">
                Collection
              </h1>
            </div>

            {/* Gender range — tells scope without a label */}
            <div className="hidden flex-col items-end gap-0 md:flex">
              {['Women', 'Men', 'Kids'].map((g) => (
                <span
                  key={g}
                  className="font-serif text-[1.05rem] font-light leading-[1.55] text-charcoal/40"
                >
                  {g}
                </span>
              ))}
            </div>

          </div>
        </div>
      </header>

      {/* ── Category marquee ─────────────────────────────────────── */}
      {/* 4 passes × content width → always fills any viewport.
          Animation translates by -25% (= exactly one pass) for a seamless loop. */}
      <div
        className="overflow-hidden border-b border-beige bg-cream/40 py-[11px]"
        aria-label="Categories: Outerwear, Knits, Woven, Denim, Activewear, Workwear, Casualwear, Beachwear"
      >
        <div className="animate-marquee-4x">
          {Array.from({length: 4}, (_, pass) =>
            CATEGORIES.map((cat) => (
              <span
                key={`${pass}-${cat}`}
                className="inline-flex flex-shrink-0 items-center"
                aria-hidden={pass > 0 ? true : undefined}
              >
                <span className="px-7 font-sans text-[11px] font-normal uppercase tracking-[0.28em] text-charcoal/45">
                  {cat}
                </span>
                <span className="h-[14px] w-px flex-shrink-0 bg-beige" aria-hidden="true" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Masonry product grid ──────────────────────────────────── */}
      <section className="px-4 py-10 md:px-6 md:py-14">

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-36 text-center">
            <div className="mb-5 h-px w-8 bg-beige" />
            <p className="type-eyebrow text-charcoal/30">No products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((p, i) => (
              <AnimateIn key={p._id} delay={(i % 5) * 0.04} y={16}>
                <div className="group relative overflow-hidden">
                  <SmartImage
                    source={p.image}
                    ratio="3/4"
                    tone="light"
                    alt=""
                    width={700}
                    className="w-full"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/[0.06]"
                    aria-hidden="true"
                  />
                </div>
              </AnimateIn>
            ))}
          </div>
        )}

      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-beige/70 bg-cream py-14 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <h2 className="font-serif text-[1.6rem] font-normal text-charcoal md:text-[1.9rem]">
              Brief us on your category.
            </h2>
            <p className="mt-1.5 type-small text-charcoal/55">
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
