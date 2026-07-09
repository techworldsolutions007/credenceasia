'use client'

import {useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import SustainabilityContent from '@/components/sustainability/SustainabilityContent'
import SustainabilityMedia from '@/components/sustainability/SustainabilityMedia'
import SustainabilityLogoCloud from '@/components/sustainability/SustainabilityLogoCloud'
import type {CertificateLogo} from '@/lib/certificates'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = {
  items?: unknown[]
  sustainabilityTitle?: string
  sustainabilityText?: string
  certificateLogos?: CertificateLogo[]
}

export default function SustainabilityPreview({certificateLogos = []}: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Left column: eyebrow → heading → rule → quote → principles
      gsap.from('.sus2-eyebrow', {
        y: 14, opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: {trigger: '.sus2-eyebrow', start: 'top 84%', once: true},
      })

      gsap.from('.sus2-heading', {
        y: 36, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {trigger: '.sus2-heading', start: 'top 84%', once: true},
      })

      gsap.from('.sus2-rule', {
        scaleX: 0, transformOrigin: 'left center', duration: 0.7, ease: 'power2.out',
        scrollTrigger: {trigger: '.sus2-rule', start: 'top 87%', once: true},
      })

      gsap.from('.sus2-quote', {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {trigger: '.sus2-quote', start: 'top 87%', once: true},
      })

      gsap.from('.sus2-principle', {
        y: 16, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: {trigger: '.sus2-principles', start: 'top 88%', once: true},
      })

      // Right column: image fades up, categories stagger in
      gsap.from('.sus2-media', {
        y: 28, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: {trigger: '.sus2-media', start: 'top 82%', once: true},
      })

      gsap.from('.sus2-category', {
        y: 18, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {trigger: '.sus2-media', start: 'top 72%', once: true},
      })

      // Logo cloud fades in as a unit — individual logos scroll via CSS marquee
      gsap.from('.sus2-logo-cloud', {
        opacity: 0, duration: 0.7, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {trigger: '.sus2-logo-cloud', start: 'top 92%', once: true},
      })
    },
    {scope: sectionRef},
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Sustainability"
      style={{
        background: 'var(--color-sage)',
        paddingBlock: 'clamp(2.75rem, 5vw, 4.5rem)',
      }}
    >
      {/* Paper/textile grain at ~2.5% opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-16">

        {/* Upper two-column split */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <SustainabilityContent />
          <SustainabilityMedia />
        </div>

        {/* Lower logo cloud */}
        <SustainabilityLogoCloud logos={certificateLogos} />

      </div>
    </section>
  )
}
