'use client'

import Image from 'next/image'
import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MAILTO =
  'mailto:contact@credenceasialtd.com?subject=Sourcing%20Enquiry%20%E2%80%94%20Credence%20Asia'

type Props = {
  ctaTitle?: string
  ctaText?: string
  ctaPrimaryButtonText?: string
  ctaPrimaryButtonLink?: string
  ctaSecondaryButtonText?: string
  ctaSecondaryButtonLink?: string
}

export default function FinalCTA({ctaText}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Image: clip-path reveal from bottom (matches WhoWeAre)
      gsap.fromTo(
        '.fcta-img-wrap',
        {clipPath: 'inset(0 0 100% 0)'},
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {trigger: '.fcta-img-wrap', start: 'top 82%', once: true},
        },
      )
      gsap.fromTo(
        '.fcta-img-inner',
        {scale: 1.08},
        {
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {trigger: '.fcta-img-wrap', start: 'top 82%', once: true},
        },
      )

      // Decorative line draws left → right
      gsap.from('.fcta-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.0,
        ease: 'power4.inOut',
        scrollTrigger: {trigger: '.fcta-right', start: 'top 82%', once: true},
      })

      // Right column cascades down
      gsap.from('.fcta-right > *', {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.11,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {trigger: '.fcta-right', start: 'top 82%', once: true},
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const subtext =
    ctaText ??
    'Direct line to our founding team — share what you need and we will come back with the right production pathway within one business day.'

  return (
    <section ref={ref} className="overflow-hidden" style={{background: 'var(--color-cream)'}}>
      <div className="grid min-h-[600px] grid-cols-1 xl:grid-cols-2 xl:min-h-[680px]">

        {/* ── Left: full-bleed image ── */}
        <div className="fcta-img-wrap relative h-72 overflow-hidden sm:h-96 xl:h-full">
          <div className="fcta-img-inner relative h-full">
            <Image
              src="/manufacturing-studio.png"
              alt="Credence Asia manufacturing studio"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 50vw"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-charcoal/40" />
          </div>
        </div>

        {/* ── Right: contact content ── */}
        <div className="fcta-right flex flex-col items-start justify-center section-py px-8 md:px-14 xl:px-16">

          <p className="type-eyebrow mb-3 text-charcoal/50">.07</p>
          <div className="fcta-line mb-6 h-px w-10 bg-charcoal/20" />

          <h2 className="type-h2 mb-6 text-charcoal">
            <span className="font-light text-charcoal/55">Let's build your</span>{' '}
            <span className="font-semibold">next collection</span>{' '}
            <span className="font-light text-charcoal/55">together.</span>
          </h2>

          <p className="type-body mb-10 max-w-[44ch] text-charcoal/60">
            {subtext}
          </p>

          <a
            href={MAILTO}
            className="inline-flex items-center bg-charcoal px-9 py-4 type-label text-ivory transition-colors duration-200 hover:bg-charcoal/85"
          >
            Start a Conversation
          </a>


        </div>
      </div>
    </section>
  )
}
