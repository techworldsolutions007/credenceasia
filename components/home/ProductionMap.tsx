'use client'

import {useEffect, useRef} from 'react'
import Link from 'next/link'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import SectionHeading from '@/components/shared/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

type Location = {
  _id: string
  name: string
  country?: string
  shortText?: string
  capabilities?: string[]
  isHub?: boolean
}

const FALLBACK_LOCATIONS: Location[] = [
  {
    _id: 'hk',
    name: 'Hong Kong',
    country: 'Hong Kong SAR',
    shortText: 'Headquarters and regional coordination hub. Design knowledge meets supply-chain execution.',
    isHub: true,
    capabilities: ['Project Coordination', 'Sourcing Management', 'Quality Oversight', 'Client Relations'],
  },
  {
    _id: 'bd',
    name: 'Bangladesh',
    country: 'Bangladesh',
    shortText: '2 manufacturing units: 36 production lines, 3,000 machines, 3,700 employees, 1 million pcs/month.',
    capabilities: ['Woven and Knit Tops and Bottoms', 'In-house Embroidery', 'Washing Plant', 'Bulk Production'],
  },
  {
    _id: 'cn',
    name: 'China',
    country: 'China',
    shortText: 'Specialises in Jackets and Workwear: 200 machines, 400 workers, 1 million pcs/year.',
    capabilities: ['Jackets and Outerwear', 'Workwear', 'Materials and Trims', 'Technical Garments'],
  },
  {
    _id: 'in',
    name: 'India',
    country: 'India',
    shortText: 'Activewear, Tops, Blouses, Beach Wears and Coordinates. 350+ machines, 1.2M pcs per year.',
    capabilities: ['Activewear', 'Tops and Blouses', 'Beach Wears', 'Cover Ups and Coordinates'],
  },
  {
    _id: 'kh',
    name: 'Cambodia',
    country: 'Cambodia',
    shortText: 'Manufacturing presence across woven and knit categories.',
    capabilities: ['Woven Production', 'Knit Garments', 'Bulk Manufacturing'],
  },
  {
    _id: 'mm',
    name: 'Myanmar',
    country: 'Myanmar',
    shortText: 'Scalable production capability within our trusted factory network.',
    capabilities: ['Apparel Production', 'Woven Garments', 'Knit Categories'],
  },
]

type Props = {
  locations?: Location[]
  productionTitle?: string
  productionText?: string
}

export default function ProductionMap({locations, productionTitle, productionText}: Props) {
  const ref = useRef<HTMLElement>(null)

  const data = locations?.length ? locations : FALLBACK_LOCATIONS

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.pm-head > *', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {trigger: '.pm-head', start: 'top 82%', once: true},
      })
      gsap.utils.toArray<HTMLElement>('.pm-card').forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          delay: i * 0.07,
          scrollTrigger: {trigger: '.pm-grid', start: 'top 84%', once: true},
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="pm-head mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Production Network"
            title={productionTitle ?? 'Our Production Network'}
            subtitle={productionText ?? 'Long-standing supply-chain execution with a network of trusted factories across China, Bangladesh, Cambodia, Vietnam, Myanmar and India, managed from our Hong Kong coordination hub.'}
            skipAnimation
          />
          <Link
            href="/collections"
            className="shrink-0 self-start type-label text-clay underline-offset-4 hover:underline md:self-auto"
          >
            Explore Capabilities →
          </Link>
        </div>

        {/* Location grid */}
        <div className="pm-grid grid grid-cols-1 gap-px bg-beige/40 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.map((loc) => (
            <div
              key={loc._id}
              className="pm-card group relative bg-ivory p-8 transition-colors duration-300 hover:bg-cream"
            >
              {/* Hub indicator */}
              {loc.isHub && (
                <div className="mb-5 inline-block border border-clay px-2 py-[3px] text-[9px] uppercase tracking-[0.25em] text-clay">
                  Hub
                </div>
              )}

              {/* Location name */}
              <h3 className="type-h3 mb-1 text-charcoal">
                {loc.name}
              </h3>
              {loc.country && loc.country !== loc.name && (
                <p className="mb-4 type-eyebrow text-clay">
                  {loc.country}
                </p>
              )}

              {/* Short text */}
              {loc.shortText && (
                <p className="mb-5 type-small text-soil/65">
                  {loc.shortText}
                </p>
              )}

              {/* Capabilities */}
              {loc.capabilities && loc.capabilities.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {loc.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-2 type-label text-charcoal/60">
                      <span className="h-px w-3 bg-leaf" />
                      {cap}
                    </li>
                  ))}
                </ul>
              )}

              {/* Decorative dot */}
              <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-leaf/30 transition-colors duration-300 group-hover:bg-leaf/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
