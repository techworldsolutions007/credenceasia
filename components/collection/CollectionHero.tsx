'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'

export default function CollectionHero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.ch-reveal', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-12"
      style={{
        background: 'linear-gradient(140deg, #f9f6f0 0%, #f0ebe2 55%, #e8dcc8 100%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(44,44,44,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(44,44,44,0.045) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial fade softens grid at edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #f9f6f0 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <p
          className="ch-reveal mb-4 text-[10px] uppercase tracking-[0.15em]"
          style={{color: 'var(--color-olive)'}}
        >
          Product Categories and Capabilities
        </p>

        <h1
          className="ch-reveal type-h2 text-stone-900"
        >
          Collections built across our production network.
        </h1>

        <p className="ch-reveal mt-3 text-sm leading-relaxed text-stone-500">
          Curated apparel capabilities developed through trusted manufacturing partners, from concept and sampling to production and delivery.
        </p>
      </div>
    </section>
  )
}
