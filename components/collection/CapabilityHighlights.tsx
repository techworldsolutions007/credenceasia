'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HIGHLIGHTS = [
  {
    number: '01',
    title: 'Design and Product Development',
    description:
      'Technical design, tech packs, and concept development aligned to your brand requirements and seasonal program.',
  },
  {
    number: '02',
    title: 'Material and Trim Sourcing',
    description:
      'Global fabric and trim sourcing from verified mills and suppliers across our established production network.',
  },
  {
    number: '03',
    title: 'Sampling and Fit Refinement',
    description:
      'Proto sampling, size sets, and fit approval across categories with detailed quality review at every stage.',
  },
  {
    number: '04',
    title: 'Production and Quality Control',
    description:
      'Factory coordination, in-line inspection, final QC, compliance documentation, and delivery management.',
  },
]

export default function CapabilityHighlights() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.cap-head > *', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {trigger: '.cap-head', start: 'top 84%'},
      })
      gsap.utils.toArray<HTMLElement>('.cap-card').forEach((card) => {
        gsap.from(card, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {trigger: card, start: 'top 90%'},
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="capabilities" className="bg-[#f9f6f0] py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section header */}
        <div className="cap-head mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-stone-400">
              Our Process
            </p>
            <h2 className="max-w-sm text-3xl font-light leading-[1.08] tracking-[-0.015em] text-stone-900 md:text-[2.6rem]">
              Capabilities across every stage of development
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone-500 md:text-right">
            Each stage is managed through our production network, connecting intent to execution.
          </p>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.number}
              className="cap-card group bg-[#f9f6f0] p-8 transition-colors duration-300 hover:bg-[#ede5d5] md:p-10"
            >
              <span className="mb-7 block text-[11px] font-medium tracking-[0.22em] text-stone-400 transition-colors duration-300 group-hover:text-stone-600">
                {h.number}
              </span>
              <h3 className="mb-4 text-sm font-medium leading-snug text-stone-900">{h.title}</h3>
              <p className="text-sm leading-[1.75] text-stone-500">{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
