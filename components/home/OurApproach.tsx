'use client'

import {useEffect, useRef} from 'react'
import Link from 'next/link'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ArrowUpRight} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type Capability = {
  num: string
  label: string
  body: string
  stat: string
  accent: string
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    label: 'Sampling & Prototyping',
    body: 'In-house sample rooms produce wearable first prototypes in days, accelerating line planning and merchant sign-off.',
    stat: '7-day sample window',
    accent: 'rgba(60,74,52,',
  },
  {
    num: '02',
    label: 'Sourcing & Costing',
    body: 'Fabric libraries, mill partnerships and target-price engineering. Cost set up front without compromising design.',
    stat: '40+ mill partners',
    accent: 'rgba(83,99,126,',
  },
  {
    num: '03',
    label: 'Manufacturing & Scale',
    body: 'Knits, woven, denim, outerwear, activewear and workwear across six countries. Flexible MOQs from first sample to full bulk, scaled to seasonality and channel.',
    stat: '14 M+ units / year',
    accent: 'rgba(87,105,74,',
  },
  {
    num: '04',
    label: 'Compliance & QC',
    body: 'BSCI, Sedex, Oeko-Tex, WRAP and GMP as standard. Daily in-line audits and strict pre-delivery inspection.',
    stat: 'AQL 1.5 – 2.5',
    accent: 'rgba(100,112,82,',
  },
  {
    num: '05',
    label: 'Logistics',
    body: 'Freight planning and multi-term shipping. FOB, CIF, DAP or DDP, built around your channel and lead-time.',
    stat: 'FOB · CIF · DAP · DDP',
    accent: 'rgba(163,173,146,',
  },
  {
    num: '06',
    label: 'Partnership',
    body: 'Long-term planning, honest pricing, transparent communication. Built to compound over seasons, not single orders.',
    stat: '5-year avg. client tenure',
    accent: 'rgba(55,71,94,',
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

function CapabilityCard({
  num, label, body, stat, accent,
  className = '',
}: Capability & {className?: string}) {
  return (
    <Link
      href="/contact"
      className={[
        'oa-col group relative flex flex-col overflow-hidden bg-ivory p-8 transition-colors duration-300 hover:bg-cream md:p-10',
        className,
      ].join(' ')}
    >
      <p className="type-eyebrow mb-3 text-olive/55">
        {num}
      </p>
      <h3 className="type-h3 mb-5 text-charcoal">
        {label}
      </h3>
      <p className="type-small mb-6 text-charcoal/70">
        {body}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-beige/60 pt-4">
        <span className="type-label text-soil/75">
          {stat}
        </span>
        <ArrowUpRight
          size={13}
          strokeWidth={1.75}
          aria-hidden="true"
          className="shrink-0 text-soil/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-soil/65"
        />
      </div>
      {/* Accent underline grows left → right on hover */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{background: `linear-gradient(90deg, ${accent}0.55) 0%, ${accent}0.12) 100%)`}}
      />
    </Link>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function OurApproach() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from(['.oa-num', '.oa-heading > span', '.oa-sub'], {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {trigger: ref.current, start: 'top 82%', once: true},
      })

      gsap.from('.oa-col', {
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {trigger: '.oa-grid', start: 'top 80%', once: true},
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="section-py"
      aria-labelledby="capabilities-heading"
      style={{background: 'var(--color-cream)'}}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* ── Header ── */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-[1fr_22rem] md:items-end">
          <div>
            <p className="oa-num type-eyebrow mb-3 text-olive/85">.03</p>
            <h2
              id="capabilities-heading"
              className="oa-heading type-h2 text-charcoal"
            >
              <span className="font-light text-soil/70">What</span>{' '}
              <span className="font-semibold">we do.</span>
            </h2>
          </div>
          <p className="oa-sub type-small max-w-sm text-charcoal/75 md:text-right">
            Six capabilities, one accountable team. From research in Copenhagen
            through bulk delivery from Asia, coordinated from Hong Kong.
          </p>
        </div>

        {/*
          ── Capability grid ─────────────────────────────────────────────────
          gap-px + bg-beige/40: the 1 px gap exposes the grid background
          as hairline rules in both axes — no double-borders on adjacent cells.
          Outer border wraps the whole block cleanly.

          Layout:
            mobile  → 1 col (all 7 cards stacked)
            sm      → 2 cols (3 rows of 2, Partnership spans both cols)
            lg      → 3 cols (2 rows of 3, Partnership spans all 3 cols)
        */}
        <div
          className="oa-grid overflow-hidden border border-beige/60"
          aria-label="Capabilities"
        >
          <div
            role="list"
            className="grid grid-cols-1 gap-px bg-beige/40 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CAPABILITIES.map(cap => (
              <div key={cap.label} role="listitem">
                <CapabilityCard {...cap} className="h-full" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
