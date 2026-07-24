'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const SLICE_COUNT = 10
const FALLBACK_MS = 7000

export default function PageLoaderBlind() {
  const outerRef = useRef<HTMLDivElement>(null)
  const logoRef  = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const outer  = outerRef.current
    const logoEl = logoRef.current
    if (!outer || !logoEl) return

    let finished = false
    const finish = () => {
      if (!finished) { finished = true; setGone(true) }
    }
    const fallback = setTimeout(finish, FALLBACK_MS)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const ctx = gsap.context(() => {
        gsap.to(outer, { autoAlpha: 0, duration: 0.35, delay: 0.3, onComplete: finish })
      })
      return () => { finished = true; clearTimeout(fallback); ctx.revert() }
    }

    const ctx = gsap.context(() => {
      const slices = gsap.utils.toArray<HTMLElement>('.pb-slice', outer)
      const evens  = slices.filter((_, i) => i % 2 === 0)
      const odds   = slices.filter((_, i) => i % 2 !== 0)

      gsap.set(logoEl, { autoAlpha: 0, scale: 0.96 })

      gsap.timeline({ onComplete: finish })
        // eye settles
        .to({}, { duration: 0.22 })

        // logo materialises on the ivory surface
        .to(logoEl, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.58,
          ease: 'power2.out',
        })

        // breathe
        .to({}, { duration: 0.52 })

        // logo fades before the blinds open so it doesn't float over the site
        .to(logoEl, { autoAlpha: 0, duration: 0.22, ease: 'power1.in' }, 'shutter')

        // even slices fly upward, odd fly downward — opens like a shutter
        .to(evens, {
          yPercent: -101,
          duration: 0.62,
          ease: 'power2.inOut',
          stagger: { amount: 0.18, from: 'start' },
        }, 'shutter+=0.05')
        .to(odds, {
          yPercent:  101,
          duration: 0.62,
          ease: 'power2.inOut',
          stagger: { amount: 0.18, from: 'end' },
        }, 'shutter+=0.05')
    })

    return () => { finished = true; clearTimeout(fallback); ctx.revert() }
  }, [])

  if (gone) return null

  const sliceH = 100 / SLICE_COUNT

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        // ivory fallback behind slices (fills any sub-pixel gaps)
        backgroundColor: '#F6F1E8',
      }}
    >
      {/* Ivory slices — alternate between ivory and cream for faint depth */}
      {Array.from({ length: SLICE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="pb-slice"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${i * sliceH}%`,
            // tiny overlap prevents hairline gaps during animation
            height: `${sliceH + 0.12}%`,
            backgroundColor: i % 2 === 0 ? '#F6F1E8' : '#EFE6D8',
          }}
        />
      ))}

      {/* Logo — charcoal on ivory, no inversion needed */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
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
            width: '190px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}
