'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    stage: '01',
    title: 'Material inspection',
    description:
      'Fabric and trim verified before production begins. Colour, hand feel, weight and composition checked against approved specifications.',
  },
  {
    stage: '02',
    title: 'Pre-production approval',
    description:
      'Sealing sample signed off by the QC team before bulk cut. No production proceeds without confirmed merchant approval.',
  },
  {
    stage: '03',
    title: 'Inline production checks',
    description:
      'Daily in-line audits throughout production. Defects identified and corrected at source, not at the end of the line.',
  },
  {
    stage: '04',
    title: 'Measurement control',
    description:
      'Size-set and production garments measured against spec at each stage. Tolerance deviations flagged and resolved immediately.',
  },
  {
    stage: '05',
    title: 'Final inspection',
    description:
      'AQL 1.5–2.5 end-of-line inspection. Full workmanship, measurement, and packaging audit before shipment approval.',
  },
  {
    stage: '06',
    title: 'Shipment approval',
    description:
      'Inspection certificate issued and shipping documents verified before goods leave the facility.',
  },
]

const CERTS = ['BSCI', 'Sedex', 'Oeko-Tex', 'WRAP', 'GMP']

export default function QualitySystem() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.qs-intro > *', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.qs-intro', start: 'top 82%', once: true },
      })

      gsap.utils.toArray<HTMLElement>('.qs-card').forEach((card, i) => {
        gsap.from(card, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: (i % 3) * 0.07,
          scrollTrigger: { trigger: '.qs-grid', start: 'top 80%', once: true },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-ivory section-py"
      aria-labelledby="quality-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* ── Section intro ─────────────────────────────────────────── */}
        <div className="qs-intro mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="type-eyebrow mb-4 text-clay">Quality and compliance</p>
            <h2
              id="quality-heading"
              className="text-charcoal"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                fontWeight: 600,
              }}
            >
              Six stages,{' '}
              <strong className="font-semibold text-soil">zero surprises</strong>.
            </h2>
            <p className="mt-5 max-w-[46ch] type-body text-charcoal/65">
              Every production programme follows the same inspection pathway. From
              material to shipment, quality is built in at every stage, not
              inspected in at the end.
            </p>
          </div>

          {/* Cert badges */}
          <div className="shrink-0">
            <p className="mb-3 type-eyebrow text-clay">Standards applied</p>
            <div className="flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="border border-charcoal/14 px-3 py-1.5 type-label text-charcoal/55 transition-colors duration-200 hover:border-soil/30 hover:text-soil"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stage grid ────────────────────────────────────────────── */}
        <div
          className="qs-grid grid grid-cols-1 gap-px bg-beige/40 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Quality control stages"
        >
          {STAGES.map((s) => (
            <div
              key={s.stage}
              role="listitem"
              className="qs-card group relative overflow-hidden bg-ivory px-8 py-10 transition-colors duration-300 hover:bg-cream"
            >
              {/* Stage number — large decorative */}
              <p
                aria-hidden
                className="mb-4 select-none font-serif text-[3rem] font-bold leading-none text-charcoal/10 transition-colors duration-300 group-hover:text-charcoal/18"
                style={{ letterSpacing: '-0.03em' }}
              >
                {s.stage}
              </p>

              <h3 className="type-h3 mb-3 text-charcoal">{s.title}</h3>
              <p className="type-small text-charcoal/62">{s.description}</p>

              {/* Animated left accent */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-0 w-[2px] bg-leaf transition-all duration-500 ease-out group-hover:h-full"
              />
            </div>
          ))}
        </div>

        {/* ── Bottom note ───────────────────────────────────────────── */}
        <p className="mt-8 type-small text-charcoal/40">
          Individual QC teams per production facility. AQL 1.5–2.5 applied across all programmes.
        </p>
      </div>
    </section>
  )
}
