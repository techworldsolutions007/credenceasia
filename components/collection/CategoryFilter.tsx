'use client'

const CATEGORIES = [
  {label: 'All', value: 'all'},
  {label: 'Womenswear', value: 'Women'},
  {label: 'Menswear', value: 'Men'},
  {label: 'Kidswear', value: 'Kids'},
  {label: 'Outerwear', value: 'Outerwear'},
  {label: 'Activewear', value: 'Activewear'},
  {label: 'Workwear', value: 'Workwear'},
  {label: 'Denim', value: 'Denim'},
  {label: 'Knits', value: 'Knits'},
  {label: 'Woven', value: 'Woven'},
  {label: 'Accessories', value: 'Accessories'},
]

type Props = {
  activeCategory: string
  onCategoryChange: (cat: string) => void
  availableCategories: string[]
}

export default function CategoryFilter({activeCategory, onCategoryChange, availableCategories}: Props) {
  const visible = CATEGORIES.filter(
    (c) => c.value === 'all' || availableCategories.includes(c.value),
  )

  return (
    <div className="sticky top-0 z-40 border-b border-stone-200 bg-[#f9f6f0]/[0.96] backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div
          className="hide-scrollbar flex gap-1 overflow-x-auto py-4"
          role="tablist"
          aria-label="Product category filter"
        >
          {visible.map((cat) => {
            const isActive = activeCategory === cat.value
            return (
              <button
                key={cat.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.value)}
                className={[
                  'min-h-[48px] shrink-0 px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-900',
                  isActive
                    ? 'bg-stone-900 text-[#f9f6f0]'
                    : 'text-stone-500 hover:text-stone-900',
                ].join(' ')}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
