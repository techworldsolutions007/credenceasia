'use client'

import Image from 'next/image'
import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {PARTNERS, MIN_GRID_COUNT, FALLBACK_TRUST_LINE, type Partner} from './partners'

gsap.registerPlugin(ScrollTrigger)

/*
  Grid layout: 3 cols (mobile) → 5 cols (md+)
  15 logos ÷ 5 = 3 exact rows  |  15 ÷ 3 = 5 exact rows — zero ghost cells.
  LCM(3, 5) = 15; ghostCount always 0 for this list size.
*/
const COL_LCM = 15
const ghostCount = (COL_LCM - (PARTNERS.length % COL_LCM)) % COL_LCM


// ─── Sub-component ────────────────────────────────────────────────────────────

function LogoImage({partner}: {partner: Partner}) {
  return (
    <Image
      src={partner.src}
      width={partner.intrinsic.w}
      height={partner.intrinsic.h}
      alt={partner.name}
      loading="lazy"
      className={[
        // Fill the padded cell — object-contain keeps aspect ratio, no cropping
        'h-full w-full object-contain',
        // Mono treatment at rest; brand colour on interaction
        'grayscale opacity-60',
        'transition-all duration-200 ease-out',
        'group-hover:grayscale-0 group-hover:opacity-100',
        'group-focus-within:grayscale-0 group-focus-within:opacity-100',
      ].join(' ')}
    />
  )
}

// ─── Cell ─────────────────────────────────────────────────────────────────────

function PartnerCell({partner}: {partner: Partner}) {
  const inner = (
    // p-4 gives enough breathing room while letting logos fill the space
    <div className="flex h-full w-full items-center justify-center p-4">
      <LogoImage partner={partner} />
    </div>
  )

  return (
    <li className="cp-cell group flex h-28 items-center justify-center rounded-xl bg-white">
      {partner.url ? (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${partner.name} (opens in new tab)`}
          className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-soil/50"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

type Props = {
  partners?:      unknown[]
  customersTitle?: string
  customersText?:  string
  customers?:      unknown
}

export default function CustomersPreview({customersText}: Props) {
  const ref     = useRef<HTMLElement>(null)
  const showGrid = PARTNERS.length >= MIN_GRID_COUNT

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Decorative line draws left → right (matches WhoWeAre / OurApproach)
      gsap.from('.cp-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.0,
        ease: 'power4.inOut',
        scrollTrigger: {trigger: '.cp-header', start: 'top 82%', once: true},
      })

      // Header block cascades down
      gsap.from('.cp-header > *', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {trigger: '.cp-header', start: 'top 82%', once: true},
      })

      // Cells enter in reading order
      if (showGrid) {
        gsap.from('.cp-cell', {
          y: 14,
          opacity: 0,
          duration: 0.45,
          stagger: {amount: 0.65, from: 'start'},
          ease: 'power2.out',
          scrollTrigger: {trigger: '.cp-grid', start: 'top 85%', once: true},
        })
      }
    }, ref)

    return () => ctx.revert()
  }, [showGrid])

  return (
    <section ref={ref} className="section-py overflow-hidden" style={{background: 'var(--color-mist)'}}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* ── Header ── */}
        <div className="cp-header mb-14">
          <p className="type-eyebrow mb-3 text-olive/85">.06</p>
          <div className="cp-line mb-6 h-px w-10 bg-clay" />
          <h2 className="type-h2 text-charcoal">
            <span className="font-light text-soil/70">A trusted partner for</span>{' '}
            <span className="font-semibold">global brands.</span>
          </h2>
          <p className="type-body mt-5 max-w-[48ch] text-charcoal/65">
            {customersText ??
              'From Scandinavian fashion houses and American retail chains to European automotive workwear — 25+ brands trust Credence Asia for consistent quality and ethical production.'}
          </p>
        </div>

        {/* ── Fallback (< 4 approved logos) ── */}
        {!showGrid && (
          <p className="type-body italic text-charcoal/55">
            {FALLBACK_TRUST_LINE}
          </p>
        )}

        {/* ── Logo grid — white cards on the mist-blue section bg ── */}
        {showGrid && (
          <div className="cp-grid">
            <ul
              role="list"
              className="grid grid-cols-3 gap-3 md:grid-cols-5"
            >
              {PARTNERS.map(partner => (
                <PartnerCell key={partner.src} partner={partner} />
              ))}

              {Array.from({length: ghostCount}).map((_, i) => (
                <li
                  key={`ghost-${i}`}
                  aria-hidden="true"
                  className="h-24 rounded-xl bg-white"
                />
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  )
}
