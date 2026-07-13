'use client'

import Image from 'next/image'
import AnimateIn from '@/components/shared/AnimateIn'

const STATS = [
  { value: '14M+', label: 'Pieces per year',    sub: 'Combined network capacity' },
  { value: '40+',  label: 'Mill partnerships',  sub: 'Fabric libraries and sourcing' },
]

export default function BrandPositioning() {
  return (
    <section className="overflow-hidden bg-cream" aria-labelledby="bp-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Image column ─────────────────────────────────────────── */}
        <div className="relative h-72 overflow-hidden sm:h-[440px] lg:h-auto lg:min-h-[580px]">
          <Image
            src="/manufacturing-studio.png"
            alt="Premium product development and manufacturing environment"
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Restrained warm wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(60,74,52,0.18) 0%, transparent 55%)' }}
          />
          {/* Bottom fade into cream for seamless transition */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-cream))' }}
          />
        </div>

        {/* ── Copy column ──────────────────────────────────────────── */}
        <div className="flex flex-col justify-center gap-8 px-8 py-16 md:px-14 md:py-20 xl:px-18 xl:py-24">

          <div>
            <p className="type-eyebrow mb-4 text-clay">Our perspective</p>
            <h2
              id="bp-heading"
              className="text-charcoal"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
                lineHeight: 1.1,
                fontWeight: 600,
                letterSpacing: '-0.025em',
              }}
            >
              Fashion thinking,<br />
              backed by{' '}
              <strong className="font-semibold text-soil">production depth.</strong>
            </h2>
          </div>

          <AnimateIn className="flex flex-col gap-4 max-w-[46ch]">
            <p className="type-body text-charcoal/72">
              Most sourcing companies manage the factory relationship. We manage the
              product. From the first colour direction in Copenhagen to the final
              AQL inspection at port, the focus is always commercial and design-led.
            </p>
            <p className="type-body text-charcoal/50">
              We work across womenswear, menswear, kidswear, outerwear, activewear,
              and workwear — with the category depth to move from brief to bulk
              without losing the design intention that makes a garment sell.
            </p>
          </AnimateIn>

          {/* Stats */}
          <AnimateIn delay={0.1} className="flex flex-wrap gap-8 border-t border-charcoal/10 pt-7">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  className="text-charcoal"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 2.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </p>
                <p className="mt-1.5 type-label text-soil">{s.label}</p>
                <p className="mt-0.5 type-eyebrow text-charcoal/40">{s.sub}</p>
              </div>
            ))}
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
