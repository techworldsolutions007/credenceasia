'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {urlFor} from '@/sanity/lib/image'

gsap.registerPlugin(ScrollTrigger)

type Product = {
  _id: string
  name: string
  category?: string
  description?: string
  image?: any
}

export default function CollectionGrid({products}: {products: Product[]}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.cg-head > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      })
      gsap.utils.toArray<HTMLElement>('.cg-card').forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {trigger: card, start: 'top 88%'},
        })
      })
    }, root)

    return () => ctx.revert()
  }, [products])

  return (
    <div ref={root} className="mx-auto max-w-6xl px-6 py-24 md:px-12">
      <div className="cg-head mb-16 md:mb-24">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">Credence Asia</p>
        <h1 className="max-w-2xl text-4xl font-light leading-[1.05] tracking-tight text-stone-800 md:text-6xl">
          A collection built across our production network.
        </h1>
        <p className="mt-6 max-w-md text-stone-500">
          Curated pieces developed with trusted partners, from concept to delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p._id} className="cg-card group">
            {p.image && (
              <div className="mb-5 aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                  src={urlFor(p.image).width(800).height(1067).url()}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <h2 className="text-base font-medium text-stone-800">{p.name}</h2>
              {p.category && (
                <span className="text-[11px] uppercase tracking-[0.15em] text-stone-400">
                  {p.category}
                </span>
              )}
            </div>
            {p.description && (
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{p.description}</p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}