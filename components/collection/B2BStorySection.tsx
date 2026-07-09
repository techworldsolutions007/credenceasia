'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  {value: '50+', label: 'Manufacturing partners'},
  {value: '15', label: 'Countries of operation'},
  {value: '200+', label: 'Products developed annually'},
  {value: '12+', label: 'Years of network expertise'},
]

export default function B2BStorySection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.bs-text > *', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {trigger: '.bs-text', start: 'top 82%'},
      })
      gsap.from('.bs-stat', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {trigger: '.bs-stats', start: 'top 85%'},
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-[#191714] py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 lg:gap-32">
          {/* Left: editorial copy */}
          <div className="bs-text flex flex-col justify-center">
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-stone-500">
              From sample room to shipment
            </p>
            <h2 className="mb-8 text-3xl font-light leading-[1.08] tracking-[-0.02em] text-stone-100 md:text-[2.8rem]">
              Designed for scalable apparel programs.
            </h2>
            <p className="mb-5 text-sm leading-[1.85] text-stone-400 md:text-base">
              Each category represents a development pathway, connecting design intent,
              material sourcing, technical sampling, production planning, quality control,
              and delivery coordination.
            </p>
            <p className="text-sm leading-[1.85] text-stone-400 md:text-base">
              Built through a trusted production network spanning Asia&apos;s leading
              manufacturing hubs, delivering capabilities across fabric, fit, finishing,
              and compliance.
            </p>
          </div>

          {/* Right: stats grid */}
          <div className="bs-stats flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-px bg-stone-700/60">
              {STATS.map((stat) => (
                <div key={stat.label} className="bs-stat bg-[#191714] p-8 md:p-10">
                  <div className="mb-2 text-4xl font-light tracking-tight text-stone-100 md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-stone-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
