'use client'

import type {CustomerBrand} from '@/lib/customers'

type Props = {
  brand: CustomerBrand
  className?: string
}

// Renders a brand's logo if a file exists at /assets/logos/{slug}.png.
// Falls back to a clean styled name tile that reads as deliberate, not as
// "missing image".
export default function BrandLogo({brand, className = ''}: Props) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      {/* The img will 404 silently if the asset has not been added yet.
          Setting onError to hide it lets the fallback render in its place. */}
      <picture className="block max-h-12 w-full">
        <img
          src={`/assets/logos/${brand.slug}.png`}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          className="max-h-12 w-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none'
            const sib = e.currentTarget.nextElementSibling as HTMLElement | null
            if (sib) sib.style.display = 'flex'
          }}
        />
        <span
          style={{display: 'none'}}
          className="h-12 w-full items-center justify-center text-center type-label text-charcoal/85"
        >
          {brand.name}
        </span>
      </picture>
    </div>
  )
}
