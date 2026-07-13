'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface AboutCTAProps {
  ctaTitle?: string
  ctaText?: string
}

const CATEGORIES = [
  'Womenswear', 'Menswear', 'Kidswear',
  'Outerwear', 'Activewear', 'Workwear',
  'Knitwear', 'Denim',
]

export default function AboutCTA({ ctaTitle, ctaText }: AboutCTAProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.acta-item', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden section-py"
      style={{ background: 'var(--color-sage)' }}
      aria-labelledby="cta-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_auto]">

          {/* ── Left: copy ────────────────────────────────────────────── */}
          <div className="max-w-2xl">
            <p className="acta-item type-eyebrow mb-5 text-olive">Start a project</p>

            <h2
              id="cta-heading"
              className="acta-item text-charcoal"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
              }}
            >
              {ctaTitle ?? (
                <>
                  Let's build your<br />
                  next collection.
                </>
              )}
            </h2>

            <p className="acta-item mt-6 max-w-[48ch] type-body text-charcoal/65">
              {ctaText ??
                'Share your category, market, order scale and development requirements. Our team will map the right sourcing and production pathway.'}
            </p>

            {/* ── Category chips ── */}
            <div className="acta-item mt-8">
              <p className="mb-3 type-eyebrow text-charcoal/45">Categories we work across</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/contact?category=${encodeURIComponent(cat)}`}
                    className="border border-charcoal/20 px-3 py-1.5 type-label text-charcoal/55 transition-all duration-200 hover:border-charcoal/55 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── CTAs ── */}
            <div className="acta-item mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex h-12 items-center overflow-hidden bg-charcoal px-8 type-label text-ivory transition-all duration-300 hover:bg-charcoal/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
              >
                <span className="relative inline-flex items-center gap-2">
                  Start a project
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                </span>
              </Link>

              <Link
                href="/collection"
                className="inline-flex h-12 items-center border border-charcoal/30 px-8 type-label text-charcoal/70 transition-all duration-300 hover:border-charcoal/60 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
              >
                Explore capabilities
              </Link>
            </div>
          </div>

          {/* ── Right: contact info strip ─────────────────────────────── */}
          <div className="acta-item hidden shrink-0 flex-col gap-5 border-l border-charcoal/15 pl-12 md:flex">
            <div>
              <p className="type-eyebrow mb-1 text-olive">Email</p>
              <a
                href="mailto:contact@credenceasialtd.com"
                className="type-small text-charcoal/60 transition-colors duration-200 hover:text-charcoal"
              >
                contact@credenceasialtd.com
              </a>
            </div>
            <div>
              <p className="type-eyebrow mb-1 text-olive">Headquarters</p>
              <p className="type-small text-charcoal/60">Hong Kong</p>
            </div>
            <div>
              <p className="type-eyebrow mb-1 text-olive">Design hub</p>
              <p className="type-small text-charcoal/60">Copenhagen, Denmark</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
