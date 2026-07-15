'use client'

import Image from 'next/image'
import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutFeatureGrid() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Images reveal upward with clip-path
      gsap.fromTo(
        '.afg-img',
        {clipPath: 'inset(100% 0 0 0)'},
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          stagger: 0.3,
          ease: 'power4.inOut',
          scrollTrigger: {trigger: ref.current, start: 'top 80%', once: true},
        },
      )
      // Text panel children cascade in
      gsap.from('.afg-panel > *', {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {trigger: ref.current, start: 'top 80%', once: true},
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="overflow-hidden">
      <div className="grid grid-cols-1 gap-px bg-beige/50 lg:grid-cols-2">

        {/* Q1 — top-left: image */}
        <div className="afg-img relative h-72 overflow-hidden bg-charcoal sm:h-[420px] lg:h-auto lg:min-h-[520px]">
          <Image
            src="/assets/hero/sus1.png"
            alt="Credence Asia sourcing"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Q2 — top-right: Who We Are */}
        <div className="afg-panel flex flex-col justify-center gap-6 bg-ivory p-10 md:p-14 xl:p-16">
          <div>
            <p className="type-eyebrow mb-3 text-clay">Who We Are</p>
            <div aria-hidden className="h-px w-8 bg-clay/35" />
          </div>

          <h2 className="type-h2 text-charcoal" style={{lineHeight: '1.07'}}>
            Built on{' '}
            <strong className="font-semibold text-soil">trust</strong>,
            <br className="hidden sm:block" />
            {' '}driven by{' '}
            <strong className="font-semibold text-soil">craft</strong>.
          </h2>

          <div className="flex flex-col gap-4">
            <p className="max-w-[44ch] type-body text-charcoal/70">
              Founded in 2016 in Hong Kong, we bridge European design knowledge
              with disciplined Asian manufacturing, one accountable team from
              first sketch to final delivery.
            </p>
            <p className="max-w-[44ch] type-body text-charcoal/55">
              Our shared values of ethical business, honest pricing and long-term
              partnership guide every relationship and every production decision
              we make on your behalf.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-charcoal/10 pt-6">
            {[
              {label: 'Founded', value: '2016'},
              {label: 'Headquarters', value: 'Hong Kong'},
              {label: 'Countries', value: '6+'},
              {label: 'Units / year', value: '14 M+'},
            ].map((s) => (
              <div key={s.label}>
                <p className="type-eyebrow text-charcoal/40">{s.label}</p>
                <p className="type-label mt-1 text-charcoal">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Q3 — bottom-left: What We Do */}
        <div className="afg-panel flex flex-col justify-center gap-6 bg-ivory p-10 md:p-14 xl:p-16">
          <div>
            <p className="type-eyebrow mb-3 text-clay">What We Do</p>
            <div aria-hidden className="h-px w-8 bg-sage/50" />
          </div>

          <h2 className="type-h2 text-charcoal" style={{lineHeight: '1.07'}}>
            <strong className="font-semibold text-soil">End-to-end</strong>{' '}
            sourcing,
            <br className="hidden sm:block" />
            {' '}one{' '}
            <strong className="font-semibold text-soil">pathway</strong>.
          </h2>

          <div className="flex flex-col gap-4">
            <p className="max-w-[44ch] type-body text-charcoal/70">
              Design, sampling, production, QC and logistics across six
              countries, managed from Hong Kong with full transparency at
              every stage.
            </p>
            <p className="max-w-[44ch] type-body text-charcoal/55">
              One accountable pathway means clear cost from the start, precise
              execution through production, and confidence at delivery.
            </p>
          </div>

          <ul className="flex flex-col gap-2.5 border-t border-charcoal/10 pt-6">
            {[
              'Design & Research',
              'Sampling & Prototyping',
              'Manufacturing & Scale',
              'Quality Control & Compliance',
              'Logistics & Delivery',
            ].map((cap) => (
              <li key={cap} className="flex items-center gap-3 type-small text-charcoal/65">
                <span aria-hidden className="h-px w-5 shrink-0 bg-sage/70" />
                {cap}
              </li>
            ))}
          </ul>
        </div>

        {/* Q4 — bottom-right: image */}
        <div className="afg-img relative h-72 overflow-hidden bg-charcoal sm:h-[420px] lg:h-auto lg:min-h-[520px]">
          <Image
            src="/assets/office/page016_204_0.jpeg"
            alt="Credence Asia production facility"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  )
}
