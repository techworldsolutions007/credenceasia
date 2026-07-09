'use client'

import {useEffect, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  categories?: unknown[]
  productTitle?: string
  productText?: string
}

export default function ProductPreview({productText}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Header cascade
      gsap.from('.pp-title', {
        y: 50, opacity: 0, duration: 1.05, ease: 'power3.out', delay: 0.15,
        scrollTrigger: {trigger: '.pp-head', start: 'top 84%', once: true},
      })
      gsap.from('.pp-subtitle', {
        y: 26, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.28,
        scrollTrigger: {trigger: '.pp-head', start: 'top 84%', once: true},
      })

      // Card: left-to-right wipe, then text emerges from bottom
      const tl = gsap.timeline({
        scrollTrigger: {trigger: '.pp-card', start: 'top 78%', once: true},
      })

      tl.fromTo(
        '.pp-card',
        {clipPath: 'inset(0 100% 0 0)'},
        {clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power4.inOut'},
      ).fromTo(
        '.pp-card-text',
        {y: 30, opacity: 0},
        {y: 0, opacity: 1, duration: 0.85, ease: 'power3.out'},
        '-=0.55',
      )


    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="section-py" style={{background: 'var(--color-cream)'}}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Header */}
        <div className="pp-head mb-16 md:mb-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="type-eyebrow mb-3 text-olive/85">.05</p>
              <h2 className="pp-title type-h2 text-charcoal">
                <span className="font-light text-soil/70">Product</span>{' '}
                <span className="font-semibold">expertise.</span>
              </h2>
            </div>
            <p className="pp-subtitle type-small max-w-md text-charcoal/75 md:text-right">
              {productText ??
                'Six product disciplines across our six-country network. From outerwear and denim to performance and casual programs.'}
            </p>
          </div>
          <p className="mt-6 type-label text-soil/80">
            Across Women, Men and Kids collections
          </p>
        </div>

        {/* ─── Single image card ─── */}
        <Link href="/collection" className="pp-card group relative block">

          {/* Mobile — 3:4 portrait, dedicated image */}
          <div className="relative aspect-[3/4] overflow-hidden md:hidden">
            <Image
              src="/categories_mobile.png"
              alt="Apparel product categories"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>

          {/* Desktop — wide landscape, pinned to top so nothing is lost */}
          <div className="relative hidden aspect-[16/7] overflow-hidden md:block">
            <Image
              src="/categories.png"
              alt="Apparel product categories"
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1280px) 90vw, 1200px"
            />
          </div>

          {/* Gradient overlay — heavier at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />

          {/* Hover darkening tint */}
          <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/[0.08]" />

          {/* Text — animated separately after the wipe */}
          <div className="pp-card-text absolute bottom-0 left-0 right-0 flex items-end justify-between p-7 md:p-12">
            <div>
              <h3
                className="type-h3 mb-3 text-ivory"
                style={{fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)'}}
              >
                Explore our collection
              </h3>
              <div className="flex items-center gap-2">
                <span className="border-b border-ivory/40 pb-[2px] type-eyebrow text-ivory/80 transition-all duration-500 group-hover:border-ivory">
                  View all
                </span>
                <span className="translate-x-0 text-[11px] text-ivory/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-ivory">
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}
