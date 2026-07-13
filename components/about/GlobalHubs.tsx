'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimateIn from '@/components/shared/AnimateIn'

gsap.registerPlugin(ScrollTrigger)

const HUBS = [
  {
    id: 'cph',
    city: 'Copenhagen',
    country: 'Denmark',
    role: 'Design Intelligence',
    accentClass: 'text-olive',
    borderClass: 'border-charcoal/15',
    dotClass: 'bg-olive',
    responsibilities: [
      'Colour, print and graphics research',
      'Seasonal trend and silhouette direction',
      'Washing and fabric development',
      'Brand-specific range planning',
      'Commercial product thinking',
    ],
    image: '/hero-atelier.png',
    imageAlt: 'Product-development workspace with material research, fabric swatches, and colour references',
  },
  {
    id: 'hkg',
    city: 'Hong Kong',
    country: 'China SAR',
    role: 'Operational Hub',
    accentClass: 'text-leaf',
    borderClass: 'border-charcoal/15',
    dotClass: 'bg-leaf',
    responsibilities: [
      'Sourcing strategy and vendor coordination',
      'Production scheduling and management',
      'Quality oversight across all facilities',
      'Freight planning and logistics',
      'Client and brand relationship management',
    ],
    image: '/assets/office/page016_203_0.jpeg',
    imageAlt: 'Sourcing and production coordination environment with fabric references and technical documentation',
  },
] as const

export default function GlobalHubs() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 78%',
              once: true,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden section-py"
      style={{ background: 'var(--color-sage)' }}
      aria-labelledby="hubs-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* ── Section intro ─────────────────────────────────────────── */}
        <AnimateIn className="mb-14 max-w-2xl">
          <p className="type-eyebrow mb-4 text-olive">Design and coordination</p>
          <h2
            id="hubs-heading"
            className="text-charcoal"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            <span className="font-light text-charcoal/45">Two hubs.</span>{' '}
            <strong className="font-semibold">One standard.</strong>
          </h2>
          <p className="mt-5 max-w-[52ch] type-body text-charcoal/65">
            Copenhagen brings fashion intelligence and market perspective. Hong Kong
            brings sourcing depth and production precision. Together, they form one
            accountable pathway from brief to delivery.
          </p>
        </AnimateIn>

        {/* ── Connecting line — desktop ─────────────────────────────── */}
        <div className="mb-10 hidden items-center gap-5 md:flex" aria-hidden>
          <span className="shrink-0 type-eyebrow text-charcoal/50">Copenhagen</span>
          <div className="relative h-px flex-1 overflow-hidden bg-charcoal/15">
            <div
              ref={lineRef}
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, var(--color-olive) 0%, var(--color-leaf) 100%)',
              }}
            />
          </div>
          <span className="shrink-0 type-eyebrow text-charcoal/50">Hong Kong</span>
        </div>

        {/* ── Hub columns ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-px bg-charcoal/10 md:grid-cols-2">
          {HUBS.map((hub, i) => (
            <AnimateIn
              key={hub.id}
              delay={i * 0.14}
              className="flex flex-col bg-sage p-8 md:p-10 xl:p-12"
            >
              {/* Image */}
              <div className="relative mb-8 h-52 overflow-hidden border border-charcoal/15 sm:h-64">
                <Image
                  src={hub.image}
                  alt={hub.imageAlt}
                  fill
                  className="object-cover object-center brightness-90"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 50%)' }}
                />
              </div>

              {/* City label */}
              <div className="mb-6">
                <p className={`type-eyebrow mb-2 ${hub.accentClass}`}>{hub.role}</p>
                <h3
                  className="text-charcoal"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.15 }}
                >
                  {hub.city}
                </h3>
                <p className="mt-0.5 type-eyebrow text-charcoal/45">{hub.country}</p>
              </div>

              {/* Responsibilities */}
              <ul className={`flex flex-col gap-3 border-t ${hub.borderClass} pt-6`}>
                {hub.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-3 type-small text-charcoal/65">
                    <span
                      aria-hidden
                      className={`mt-[7px] h-px w-4 shrink-0 ${hub.dotClass} opacity-60`}
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
