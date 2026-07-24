'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const FALLBACK_TIMEOUT_MS = 8000

export default function PageLoaderFabricFold() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let finished = false
    const finish = () => {
      if (!finished) {
        finished = true
        setGone(true)
      }
    }

    const fallback = setTimeout(finish, FALLBACK_TIMEOUT_MS)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.to(el, { autoAlpha: 0, duration: 0.35, delay: 0.3, onComplete: finish })
        return
      }

      const topFlap    = el.querySelector<HTMLElement>('.pf-top')
      const bottomFlap = el.querySelector<HTMLElement>('.pf-bottom')
      const topShadow  = el.querySelector<HTMLElement>('.pf-shadow-top')
      const botShadow  = el.querySelector<HTMLElement>('.pf-shadow-bot')
      const logo       = el.querySelector<HTMLElement>('.pf-logo')
      const crease     = el.querySelector<HTMLElement>('.pf-crease')
      const creaseSecT = el.querySelector<HTMLElement>('.pf-crease-sec-top')
      const creaseSecB = el.querySelector<HTMLElement>('.pf-crease-sec-bot')

      // ── Initial folded state ────────────────────────────────────
      gsap.set(topFlap,    { rotateX: -72, transformOrigin: 'center bottom' })
      gsap.set(bottomFlap, { rotateX:  72, transformOrigin: 'center top' })
      gsap.set(logo,       { autoAlpha: 0 })

      gsap
        .timeline({ onComplete: finish })

        // 0 ── hold so viewer registers the folded fabric state
        .to({}, { duration: 0.55 })

        // 1 ── unfold top and bottom flaps (slight offset = natural, non-mechanical)
        .to(topFlap, {
          rotateX: 0,
          duration: 1.45,
          ease: 'power2.inOut',
        })
        .to(bottomFlap, {
          rotateX: 0,
          duration: 1.45,
          ease: 'power2.inOut',
        }, '<+0.07')

        // 2 ── fold shadows fade as fabric lays flat
        .to([topShadow, botShadow], {
          autoAlpha: 0,
          duration: 1.0,
          ease: 'power1.out',
        }, '<+0.2')

        // 3 ── crease lines dissolve
        .to([crease, creaseSecT, creaseSecB], {
          autoAlpha: 0,
          duration: 0.55,
          ease: 'power1.in',
        }, '<+0.45')

        // 4 ── logo materialises on the now-flat fabric surface
        .to(logo, {
          autoAlpha: 1,
          duration: 0.72,
          ease: 'power2.out',
        }, '<-0.1')

        // 5 ── hold / breathe
        .to({}, { duration: 0.7 })

        // 6 ── fabric panel lifts away to reveal site beneath
        .to(el, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
        })

    }, containerRef)

    return () => {
      finished = true
      clearTimeout(fallback)
      ctx.revert()
    }
  }, [])

  if (gone) return null

  // Subtle crosshatch woven-fabric texture
  const weave = `
    repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(201,188,162,0.038) 5px, rgba(201,188,162,0.038) 6px),
    repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(201,188,162,0.038) 5px, rgba(201,188,162,0.038) 6px)
  `

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#1C1A18',
        overflow: 'hidden',
        // Perspective on this element creates the 3D space for child flaps
        perspective: '1400px',
      }}
    >
      {/* ── Flat background fabric surface (always flat, behind flaps) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#252421',
        backgroundImage: weave,
        zIndex: 0,
      }} />

      {/* ── Top fold flap ─────────────────────────────────────────────── */}
      <div
        className="pf-top"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: '#252421',
          backgroundImage: weave,
          zIndex: 2,
        }}
      >
        {/*
          Shadow darkest at the crease (bottom edge of top flap) —
          simulates the deep shadow a fold casts at its spine
        */}
        <div className="pf-shadow-top" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.03) 58%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Bottom fold flap ──────────────────────────────────────────── */}
      <div
        className="pf-bottom"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: '#252421',
          backgroundImage: weave,
          zIndex: 2,
        }}
      >
        {/* Shadow darkest at the crease (top edge of bottom flap) */}
        <div className="pf-shadow-bot" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.03) 58%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Primary crease line at fold ───────────────────────────────── */}
      <div
        className="pf-crease"
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '2px',
          transform: 'translateY(-1px)',
          background: 'linear-gradient(to right, transparent 0%, rgba(201,188,162,0.5) 12%, rgba(201,188,162,0.5) 88%, transparent 100%)',
          boxShadow: '0 -12px 36px rgba(0,0,0,0.65), 0 12px 36px rgba(0,0,0,0.65)',
          zIndex: 4,
        }}
      />

      {/* ── Secondary crease lines (add garment realism) ──────────────── */}
      <div
        className="pf-crease-sec-top"
        style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(201,188,162,0.14) 20%, rgba(201,188,162,0.14) 80%, transparent 100%)',
          boxShadow: '0 -4px 14px rgba(0,0,0,0.3), 0 4px 14px rgba(0,0,0,0.3)',
          zIndex: 3,
        }}
      />
      <div
        className="pf-crease-sec-bot"
        style={{
          position: 'absolute',
          top: '75%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(201,188,162,0.14) 20%, rgba(201,188,162,0.14) 80%, transparent 100%)',
          boxShadow: '0 -4px 14px rgba(0,0,0,0.3), 0 4px 14px rgba(0,0,0,0.3)',
          zIndex: 3,
        }}
      />

      {/* ── Logo — above flaps so it's visible when it fades in ───────── */}
      <div
        className="pf-logo"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/credence_asia_logo_hd_transparent.png"
          alt="Credence Asia Group"
          width={240}
          height={80}
          priority
          style={{
            width: '180px',
            height: 'auto',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1) sepia(0.12)',
          }}
        />
      </div>
    </div>
  )
}
