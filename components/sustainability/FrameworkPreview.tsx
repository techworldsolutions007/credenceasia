'use client'

import {useState} from 'react'
import {Network, Users, Leaf} from 'lucide-react'
import type {LucideIcon} from 'lucide-react'

type Category = {
  label: string
  Icon: LucideIcon
}

const CATEGORIES: Category[] = [
  {label: 'Supply chain sustainability', Icon: Network},
  {label: 'Engaging our people',         Icon: Users},
  {label: 'Managing our footprint',      Icon: Leaf},
]

export default function FrameworkPreview() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      className="absolute bottom-0 left-0 right-0"
      role="list"
      aria-label="We Care framework"
    >
      {/* Mobile: stacked rows — Desktop: three side-by-side panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {CATEGORIES.map(({label, Icon}, i) => (
          <div
            key={label}
            role="listitem"
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            aria-label={label}
            className={[
              'sus2-category group/cat relative cursor-default',
              'flex flex-row items-center gap-3 p-4',
              'lg:flex-col lg:items-start lg:gap-2 lg:p-5',
              // borders between items
              'border-t border-ivory/25 first:border-t-0',
              'lg:border-t-0 lg:border-l lg:first:border-l-0',
              // backdrop
              'backdrop-blur-[2px]',
              // focus ring
              'outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ivory/60',
              // background + opacity
              active === null
                ? 'bg-forest/78 opacity-100'
                : active === i
                  ? 'bg-forest/92 opacity-100'
                  : 'bg-forest/70 opacity-50',
              'transition-[background-color,opacity] duration-300',
            ].filter(Boolean).join(' ')}
          >
            <Icon
              size={15}
              strokeWidth={1.5}
              className="shrink-0 text-sage"
              aria-hidden
            />
            <span className="type-label text-ivory">
              {label}
            </span>
            {/* Reveal line — desktop only */}
            <span
              aria-hidden
              className="absolute bottom-0 left-4 right-4 hidden h-px origin-left scale-x-0 bg-ivory/50 transition-transform duration-500 group-hover/cat:scale-x-100 lg:block"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
