'use client'

import {useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import AboutContent from '@/components/about/AboutContent'
import AboutMediaGallery from '@/components/about/AboutMediaGallery'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = {
  aboutText?: string
  aboutImage?: unknown
  aboutTitle?: string
  aboutPoints?: unknown
}

export default function WhoWeAre({aboutText}: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Left column: cascade entrance
      gsap.from('.wwa2-content > *', {
        y: 28, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {trigger: '.wwa2-content', start: 'top 80%', once: true},
      })

      // Gallery images: stagger fade-up
      gsap.from('.wwa2-img', {
        y: 32, opacity: 0, duration: 0.75, stagger: 0.09, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {trigger: '.wwa2-gallery', start: 'top 82%', once: true},
      })

      // Parallax: desktop only
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const trigger = {
          trigger: '.wwa2-gallery',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
        gsap.to('.wwa2-col-1', {y: -50, ease: 'none', scrollTrigger: trigger})
        gsap.to('.wwa2-col-2', {y: 35,  ease: 'none', scrollTrigger: trigger})
        gsap.to('.wwa2-col-3', {y: -55, ease: 'none', scrollTrigger: trigger})
      })
    },
    {scope: sectionRef},
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden lg:min-h-[760px]"
      aria-label="Who We Are"
      style={{paddingBlock: 'clamp(4rem, 6vw, 6rem)', background: 'var(--color-cream)'}}
    >
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">

          <AboutContent paragraph={aboutText} />

          <div className="wwa2-gallery">
            <AboutMediaGallery />
          </div>

        </div>
      </div>
    </section>
  )
}
