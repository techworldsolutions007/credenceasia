'use client'

import Image from 'next/image'
import AnimateIn from '@/components/shared/AnimateIn'

// ── Verified production statistics ────────────────────────────────────────────
const STATS = [
  { value: '2016',   label: 'Founded',                sub: 'Hong Kong' },
  { value: '6+',     label: 'Production countries',   sub: 'Asia network' },
  { value: '14M+',   label: 'Pieces per year',        sub: 'Combined capacity' },
  { value: '3,700+', label: 'Workers',                sub: 'Bangladesh alone' },
]

// ── Fiber & materials certifications ─────────────────────────────────────────
// Verified: BCI, REPREVE, GRS, Refibra, EcoVero, Naia Renew, OBS, OCS
const CERT_LOGOS = [30, 31, 32, 33, 34, 35, 36, 37].map((n) => ({
  src: `/assets/logos/certificates/${n}.png`,
  name: [
    'BCI — Better Cotton Initiative',
    'REPREVE',
    'Global Recycled Standard',
    'Refibra — TENCEL Fiber',
    'LENZING EcoVero',
    'Naia Renew',
    'Organic Blended Content Standard',
    'Organic 100 Content Standard',
  ][n - 30] ?? `Certification ${n}`,
}))

// ── Founding quote — from the brand's own documented copy ─────────────────────
const QUOTE =
  'We develop and create products that work for real customers and real business needs. ' +
  'It begins with the proven principles of good fit and trusted quality. ' +
  'Then we refine, questioning how each detail can support stronger sell-through.'

export default function TrustProof() {
  return (
    <section className="overflow-hidden bg-cream section-py" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* ── Eyebrow ───────────────────────────────────────────────── */}
        <AnimateIn>
          <p className="type-eyebrow mb-4 text-clay">Why buyers choose us</p>
          <h2
            id="proof-heading"
            className="max-w-2xl text-charcoal"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            Credible at every stage of the supply chain.
          </h2>
        </AnimateIn>

        {/* ── Stats row ─────────────────────────────────────────────── */}
        <dl
          className="mt-14 grid grid-cols-2 gap-px bg-beige/40 md:grid-cols-4"
          aria-label="Company statistics"
        >
          {STATS.map((s, i) => (
            <AnimateIn
              key={s.label}
              delay={i * 0.07}
              className="flex flex-col bg-cream px-8 py-10"
            >
              <dt className="order-2 mt-2 type-eyebrow text-clay">{s.label}</dt>
              <dd
                className="order-1 text-charcoal"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </dd>
              <p className="order-3 mt-1 type-eyebrow text-charcoal/35">{s.sub}</p>
            </AnimateIn>
          ))}
        </dl>

        {/* ── Founders quote ────────────────────────────────────────── */}
        <AnimateIn delay={0.1} className="mt-16 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto]">
          <figure className="border-l-2 border-soil/35 pl-7">
            <blockquote
              className="text-charcoal/82"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
              }}
            >
              {`"${QUOTE}"`}
            </blockquote>
            <figcaption className="mt-4 type-eyebrow text-clay">From the founders</figcaption>
          </figure>
        </AnimateIn>
      </div>

      {/* ── Fibre certification logos ─────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-7xl px-6 md:px-10">
        <AnimateIn>
          <p className="mb-7 type-eyebrow text-clay">Fibre and materials certifications</p>
        </AnimateIn>
        <div className="grid grid-cols-2 gap-px bg-beige/40 sm:grid-cols-4 lg:grid-cols-8">
          {CERT_LOGOS.map((cert) => (
            <AnimateIn
              key={cert.src}
              className="group flex flex-col items-center gap-3 bg-cream px-6 py-8 transition-colors duration-300 hover:bg-parchment"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={cert.src}
                  alt={cert.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="120px"
                />
              </div>
              <p className="type-eyebrow text-center text-charcoal/38">{cert.name}</p>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
