'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AboutHeroProps {
  title?: string
  introText?: string
}


export default function AboutHero({ title, introText }: AboutHeroProps) {
  const sectionRef  = useRef<HTMLElement>(null)
  const imgWrapRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Initial hidden states — set synchronously before first paint
      gsap.set('.ah-eyebrow', { opacity: 0, y: 10 })
      gsap.set('.ah-word',    { yPercent: 110 })
      gsap.set('.ah-body',    { opacity: 0, y: 18 })
      gsap.set('.ah-scroll',  { opacity: 0 })

      if (reduced) {
        gsap.set(['.ah-eyebrow', '.ah-body', '.ah-scroll'], { opacity: 1, y: 0 })
        gsap.set('.ah-word', { yPercent: 0 })
        return
      }

      // Parallax on image container
      if (imgWrapRef.current) {
        gsap.to(imgWrapRef.current, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }

      // Staggered entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('.ah-eyebrow', { opacity: 1, y: 0, duration: 0.65 }, 0.2)
      tl.to('.ah-word',    { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, 0.38)
      tl.to('.ah-body',    { opacity: 1, y: 0, duration: 0.75 }, 0.9)
      tl.to('.ah-scroll',  { opacity: 1, duration: 0.5 }, 1.1)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Always use the designed editorial heading — the Sanity `title` field is a
  // document label, not a hero headline. Override via introText for copy changes.
  const headingLines = ['Built across Asia.', 'Designed around your business.']
  void title // reserved for future CMS hero-title field

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col w-full overflow-hidden bg-charcoal"
      style={{ minHeight: 'calc(100svh - 68px)' }}
      aria-labelledby="about-hero-heading"
    >
      {/* ── Background image with parallax container ─────────────────── */}
      <div
        ref={imgWrapRef}
        aria-hidden
        className="absolute will-change-transform"
        style={{ inset: '-10% 0' }}
      >
        <Image
          src="/about-hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Scrim + gradient overlays ─────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 bg-charcoal/48" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(37,36,33,0.5) 0%, transparent 28%)',
            'linear-gradient(to top, rgba(37,36,33,0.92) 0%, rgba(37,36,33,0.6) 32%, transparent 62%)',
          ].join(', '),
        }}
      />

      {/* ── Content: anchored to bottom-left ─────────────────────────── */}
      <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-16 lg:pb-20">
        <div className="max-w-[680px]">

          {/* Eyebrow */}
          <p className="ah-eyebrow mb-5 type-eyebrow text-ivory/55">
            About Credence Asia
          </p>

          {/* Heading — each word wrapped for masked reveal */}
          <h1 id="about-hero-heading">
            {headingLines.map((line, i) => (
              <span key={i} className="block overflow-hidden leading-none">
                <span
                  className="ah-word inline-block font-serif font-semibold text-ivory"
                  style={{
                    fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                    lineHeight: '1.08',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* Supporting copy */}
          <p className="ah-body mt-6 max-w-[52ch] type-body text-ivory/65">
            {introText ??
              'Credence Asia brings design, sourcing, product development, production, quality, and logistics together through one connected apparel network.'}
          </p>

        </div>
      </div>

      {/* ── Scroll indicator — desktop only ──────────────────────────── */}
      <div
        className="ah-scroll pointer-events-none absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="type-eyebrow text-ivory/30" style={{ writingMode: 'vertical-lr', letterSpacing: '0.22em' }}>
          Scroll
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-ivory/12">
          <div
            className="absolute left-0 top-0 w-full bg-ivory/55"
            style={{ height: '40%', animation: 'scroll-line 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
          />
        </div>
      </div>

      {/* ── Corner stamp ─────────────────────────────────────────────── */}
      <p
        className="pointer-events-none absolute bottom-10 right-10 z-10 hidden type-eyebrow text-ivory/18 md:block"
        aria-hidden
      >
        Est. 2016
      </p>
    </section>
  )
}
