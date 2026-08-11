'use client'

import {useEffect, useRef, useState} from 'react'

type Category = {slug: string; title: string}

export default function CategoryNav({categories}: {categories: Category[]}) {
  const [active, setActive] = useState<string>(categories[0]?.slug ?? '')
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!categories.length) return

    const observers = categories.map(({slug}) => {
      const el = document.getElementById(slug)
      if (!el) return null
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(slug)
        },
        {rootMargin: '-40% 0px -50% 0px', threshold: 0},
      )
      io.observe(el)
      return io
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [categories])

  if (!categories.length) return null

  return (
    <nav
      ref={barRef}
      aria-label="Jump to category"
      className="sticky top-[68px] z-20 border-b border-beige/60 bg-ivory/90 backdrop-blur-sm"
    >
      <div className="site-container">
        <ul className="hide-scrollbar flex items-stretch gap-0 overflow-x-auto">
          {categories.map(({slug, title}) => (
            <li key={slug}>
              <a
                href={`#${slug}`}
                className={[
                  'relative inline-flex items-center px-4 py-3 type-label transition-colors duration-200 whitespace-nowrap',
                  active === slug
                    ? 'text-soil'
                    : 'text-charcoal/40 hover:text-charcoal',
                ].join(' ')}
              >
                {title}
                <span
                  aria-hidden="true"
                  className={[
                    'absolute inset-x-0 bottom-0 h-[2px] bg-soil transition-opacity duration-200',
                    active === slug ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
