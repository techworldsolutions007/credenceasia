'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

import CollectionHero from './CollectionHero'
import ProductCapabilityCard, {type Product} from './ProductCapabilityCard'
import B2BStorySection from './B2BStorySection'
import CapabilityHighlights from './CapabilityHighlights'
import CollectionCTA from './CollectionCTA'

gsap.registerPlugin(ScrollTrigger)

export default function CollectionPageClient({products}: {products: Product[]}) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cg-card', sectionRef.current!).forEach((card) => {
        gsap.fromTo(
          card,
          {y: 28, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {trigger: card, start: 'top 88%', once: true},
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#f9f6f0]">
      <CollectionHero />
      <B2BStorySection />

      {/* ── Product capability showcase ── */}
      <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="mb-4 h-px w-12 bg-stone-300" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone-400">
              No products added yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCapabilityCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <CapabilityHighlights />
      <CollectionCTA />
    </div>
  )
}
