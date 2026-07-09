'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const LINE_COUNT = 9
const FALLBACK_TIMEOUT_MS = 6000

export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Guard against double-fire (React StrictMode / race)
    let finished = false
    const finish = () => {
      if (!finished) {
        finished = true
        setGone(true)
      }
    }

    // Safety net: remove loader even if GSAP never fires onComplete
    const fallback = setTimeout(finish, FALLBACK_TIMEOUT_MS)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.to(el, { autoAlpha: 0, duration: 0.35, delay: 0.3, onComplete: finish })
        return
      }

      const lines = gsap.utils.toArray<HTMLElement>('.pl-line', el)
      const logo = el.querySelector<HTMLElement>('.pl-logo')

      // ── Initial states ──────────────────────────────────────────
      gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(logo, { autoAlpha: 0, y: 18 })

      gsap
        .timeline({ onComplete: finish })

        // 1 ─ fabric threads draw left → right
        .to(lines, {
          scaleX: 1,
          duration: 0.82,
          ease: 'power2.inOut',
          stagger: { amount: 0.56, from: 'start' },
        })

        // 2 ─ logo drifts up into view
        .to(logo, { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power2.out' }, '-=0.18')

        // 3, hold to let it breathe
        .to({}, { duration: 0.42 })

        // 4 ─ threads dissolve
        .to(lines, {
          autoAlpha: 0,
          duration: 0.38,
          ease: 'power1.in',
          stagger: { amount: 0.22 },
        })

        // 5 ─ panel lifts away to reveal site beneath
        .to(el, { yPercent: -100, duration: 0.88, ease: 'power3.inOut' }, '-=0.04')

    }, containerRef)

    return () => {
      finished = true
      clearTimeout(fallback)
      ctx.revert()
    }
  }, [])

  if (gone) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#1C1A18',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Fabric-thread lines ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center',
          gap: '11px',
          padding: '0 6%',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="pl-line"
            style={{
              height: '1px',
              width: '100%',
              /* Subtle variation across lines mimics woven fabric density */
              backgroundColor: `rgba(201, 181, 151, ${0.09 + (i % 4) * 0.055})`,
            }}
          />
        ))}
      </div>

      {/* ── Brand block ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo, inverted to warm ivory against charcoal */}
        <div className="pl-logo">
          <Image
            src="/credence_asia_logo_hd_transparent.png"
            alt="Credence Asia Group"
            width={240}
            height={80}
            priority
            style={{
              width: '168px',
              height: 'auto',
              objectFit: 'contain',
              /* brightness(0) → full black silhouette, invert(1) → white,
                 sepia(0.12) → subtle warm ivory tint                     */
              filter: 'brightness(0) invert(1) sepia(0.12)',
            }}
          />
        </div>

      </div>
    </div>
  )
}
