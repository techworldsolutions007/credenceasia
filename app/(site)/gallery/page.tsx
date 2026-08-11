import type {Metadata} from 'next'
import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
import {client} from '@/sanity/lib/client'
import CategoryNav from '@/components/gallery/CategoryNav'
import MasonryGrid, {type MasonryProduct} from '@/components/gallery/MasonryGrid'

export const revalidate = 60

/* ── GROQ ──────────────────────────────────────────────────────
   product.category is a plain string that matches productCategory.name,
   so we join via string equality rather than a reference.
─────────────────────────────────────────────────────────────── */
const GALLERY_QUERY = `
  *[_type == "productCategory"] | order(order asc) {
    _id,
    "title": coalesce(sectionHeading, name),
    "slug": slug.current,
    "background": coalesce(background, "ivory"),
    "products": *[_type == "product" && category == ^.name] | order(order asc) {
      _id,
      featured,
      "alt": coalesce(image.alt, title, name, ""),
      "aspect": image.asset->metadata.dimensions.aspectRatio,
      "w":      image.asset->metadata.dimensions.width,
      "h":      image.asset->metadata.dimensions.height,
      "lqip":   image.asset->metadata.lqip,
      image
    }
  }
`

type GalleryCategory = {
  _id: string
  title: string
  slug: string
  background: 'ivory' | 'cream' | 'celadon' | 'mist'
  products: MasonryProduct[]
}

const BG: Record<string, string> = {
  ivory:   'bg-ivory',
  cream:   'bg-cream',
  celadon: 'bg-celadon',
  mist:    'bg-mist',
}

export const metadata: Metadata = {
  title: 'Gallery | Credence Asia Group',
  description:
    'Browse our full product image gallery — Outerwear, Woven, Knits, Denim, Activewear, Workwear and Accessories from Credence Asia\'s sourcing network.',
}

export default async function GalleryPage() {
  const categories: GalleryCategory[] = await client
    .fetch(GALLERY_QUERY, {}, {next: {revalidate: 60}})
    .catch(() => [])

  const navItems = categories
    .filter((c) => c.slug)
    .map((c) => ({slug: c.slug, title: c.title}))

  const totalProducts = categories.reduce((sum, c) => sum + c.products.length, 0)

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">

      {/* ── Sticky category nav ──────────────────────────────── */}
      <CategoryNav categories={navItems} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden border-b border-beige/60"
        style={{background: 'linear-gradient(135deg, #f9f6f0 0%, #eee5d4 100%)'}}
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(44,44,44,0.065) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Radial vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, #f2ebe0 100%)',
          }}
        />

        <div className="site-container relative py-16 md:py-24">
          <p className="type-eyebrow mb-4 text-olive/80">SS26 — Product Gallery</p>
          <h1
            className="font-serif leading-[1.05] tracking-[-0.025em] text-charcoal"
            style={{fontSize: 'clamp(2.4rem, 7vw, 5.5rem)'}}
          >
            <span className="font-light text-soil/60">Every garment,</span>{' '}
            <span className="font-semibold">every category.</span>
          </h1>
          <div className="mt-5 h-px w-10 bg-charcoal/20" aria-hidden="true" />
          <p className="type-small mt-5 max-w-[40ch] text-charcoal/55">
            {totalProducts} images across {categories.length} product categories — sourced,
            sampled and produced across our six-country manufacturing network.
          </p>
        </div>
      </header>

      {/* ── Category sections ─────────────────────────────────── */}
      {categories.map((cat, catIdx) => {
        const num = `.${String(catIdx + 1).padStart(2, '0')}`
        const bg = BG[cat.background] ?? 'bg-ivory'

        return (
          <section
            key={cat._id}
            id={cat.slug ?? undefined}
            /*
              scroll-margin-top = site nav (68px) + category nav (~48px) + breathing room (8px)
              keeps the section heading clear of both sticky bars when an anchor fires.
            */
            className={`border-b border-beige/60 ${bg} [scroll-margin-top:124px]`}
            aria-label={cat.title}
          >
            {/* Section header */}
            <div className="site-container pb-5 pt-10 md:pt-14">
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-end gap-4">
                  <span className="type-eyebrow mb-0.5 text-olive/80">{num}</span>
                  <h2
                    className="font-serif font-semibold leading-none tracking-tight text-charcoal"
                    style={{fontSize: 'clamp(1.7rem, 3vw, 2.6rem)'}}
                  >
                    {cat.title}
                  </h2>
                </div>
                {cat.products.length > 0 && (
                  <span className="type-eyebrow shrink-0 text-charcoal/35">
                    {cat.products.length}&thinsp;
                    {cat.products.length === 1 ? 'image' : 'images'}
                  </span>
                )}
              </div>
              <hr className="mt-5 border-beige/60" />
            </div>

            {/* Masonry */}
            <div className="site-container pb-12 pt-5 md:pb-16">
              <MasonryGrid products={cat.products} priority={catIdx === 0} />
            </div>
          </section>
        )
      })}

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="bg-sage py-16 md:py-20" aria-label="Contact">
        <div className="site-container flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="type-eyebrow mb-3 text-forest/55">Ready to produce?</p>
            <h2
              className="font-serif font-semibold leading-tight tracking-tight text-forest"
              style={{fontSize: 'clamp(1.6rem, 3vw, 2.4rem)'}}
            >
              Let&apos;s build your next collection together.
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full bg-soil px-7 type-label text-ivory transition-colors duration-200 hover:bg-moss"
          >
            Start an Enquiry
            <ArrowRight
              size={12}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

    </main>
  )
}
