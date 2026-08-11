import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

export type MasonryProduct = {
  _id: string
  featured: boolean
  alt: string | null
  aspect: number | null
  w: number | null
  h: number | null
  lqip: string | null
  image: unknown
}

type Props = {
  products: MasonryProduct[]
  /** Pass true for the first category section — marks first 2 items as priority */
  priority?: boolean
}

/* ── Striped placeholder tiles for empty categories ── */
function PlaceholderGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({length: 12}).map((_, i) => (
        <div
          key={i}
          className="aspect-[4/5] bg-beige/30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(200,188,162,0.25) 5px, rgba(200,188,162,0.25) 10px)',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function MasonryGrid({products, priority = false}: Props) {
  if (!products.length) return <PlaceholderGrid />

  return (
    /*
      CSS multi-column masonry.
      `columns: min(230px, 44vw)` → at 375 px it evaluates to min(230, 165) = 165 px
      so the browser fits 2 columns (375 / 165 ≈ 2.27).
      No JS, no grid-auto-flow dense holes.
    */
    <div className="[column-gap:clamp(10px,1.6vw,18px)] [columns:min(230px,44vw)]">
      {products.map((p, idx) => {
        const url = p.image
          ? urlFor(p.image as any)
              .width(900)
              .auto('format')
              .quality(80)
              .fit('max')
              .url()
          : null

        if (!url) return null

        const isPriority = priority && idx < 2

        /* Featured item: spans all columns as a wide cinematic banner */
        if (p.featured) {
          return (
            <figure
              key={p._id}
              className="relative mb-[clamp(10px,1.6vw,18px)] overflow-hidden [column-span:all]"
              style={{aspectRatio: '16/5'}}
            >
              <Image
                src={url}
                alt={p.alt ?? ''}
                fill
                sizes="100vw"
                quality={80}
                placeholder={p.lqip ? 'blur' : 'empty'}
                blurDataURL={p.lqip ?? undefined}
                priority={isPriority}
                className="object-cover"
              />
            </figure>
          )
        }

        /* Regular item */
        return (
          <figure
            key={p._id}
            className="relative mb-[clamp(10px,1.6vw,18px)] break-inside-avoid overflow-hidden"
            style={{aspectRatio: String(p.aspect ?? 0.8)}}
          >
            <Image
              src={url}
              alt={p.alt ?? ''}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 230px"
              quality={80}
              placeholder={p.lqip ? 'blur' : 'empty'}
              blurDataURL={p.lqip ?? undefined}
              priority={isPriority}
              className="object-cover"
            />
          </figure>
        )
      })}
    </div>
  )
}
