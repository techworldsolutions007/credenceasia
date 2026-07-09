import {urlFor} from '@/sanity/lib/image'

export type Product = {
  _id: string
  name: string
  title?: string
  category?: string
  description?: string
  capabilityLine?: string
  capabilities?: string[]
  image?: any
}

export default function ProductCapabilityCard({product}: {product: Product}) {
  const displayTitle = product.title ?? product.name
  const hasChips = product.capabilities && product.capabilities.length > 0

  return (
    <article className="cg-card group">
      {/* Image block */}
      <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-stone-100">
        {product.image ? (
          <img
            src={urlFor(product.image).width(800).height(1067).url()}
            alt={displayTitle}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            style={{filter: 'contrast(1.06) saturate(0.78)'}}
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            style={{background: 'linear-gradient(155deg, #252421 0%, #6B4F3A 55%, #D8C7A8 100%)'}}
          />
        )}

        {/* Ink shadow at bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(37,36,33,0.72) 0%, rgba(37,36,33,0.14) 42%, transparent 70%)',
          }}
        />

        {/* Cream lift at top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(239,230,216,0.07) 0%, transparent 28%)',
          }}
        />

        {/* Hover reveal */}
        <div className="pointer-events-none absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span
            className="text-[10px] uppercase tracking-[0.28em]"
            style={{color: 'rgba(246,241,232,0.75)'}}
          >
            View Capability →
          </span>
        </div>
      </div>

      {/* Text block */}
      <div>
        <h3
          className="font-serif text-[1rem] font-normal leading-snug"
          style={{color: 'var(--color-charcoal)'}}
        >
          {displayTitle}
        </h3>

        {product.capabilityLine && (
          <p
            className="mt-1.5 text-[0.875rem] leading-relaxed"
            style={{color: 'color-mix(in srgb, var(--color-charcoal) 60%, transparent)'}}
          >
            {product.capabilityLine}
          </p>
        )}

        {hasChips && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.capabilities!.map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
                style={{
                  color: 'var(--color-olive)',
                  background: 'color-mix(in srgb, var(--color-olive) 10%, transparent)',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
