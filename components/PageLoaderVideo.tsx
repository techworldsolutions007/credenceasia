'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

/*
  ─── Video opening animation ──────────────────────────────────────────────
  Loaded with ssr:false (see app/layout.tsx) so this component is purely
  client-side. That means:
    • localStorage is available on the very first render — no hydration mismatch.
    • The intro plays exactly once per browser (localStorage persists across
      hard refreshes, new tabs, and sessions).
    • Hard refresh → skips instantly, no overlay shown.

  Skip behaviour:
    Desktop  — mouse wheel scroll OR any key press  → panel lifts immediately.
    Mobile   — first swipe (touchmove)              → panel lifts immediately.
    Natural  — video ends                           → 1.4 s hold then lifts.
*/

const VIDEO_SRC  = '/intro.mp4'
const SEEN_KEY   = 'ca-intro-seen'   // localStorage key
const FALLBACK_MS = 10000

export default function PageLoaderVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)

  // Because this component is ssr:false, localStorage is always available here.
  // Returning true synchronously means the component renders null on the very
  // first render for returning visitors — zero flash of the dark overlay.
  const [gone, setGone] = useState<boolean>(() => {
    try { return localStorage.getItem(SEEN_KEY) === '1' } catch { return false }
  })

  useEffect(() => {
    if (gone) return  // returning visitor — nothing to do

    const el    = containerRef.current
    const video = videoRef.current
    if (!el || !video) return

    // Mark as seen immediately so any hard refresh / new tab skips the intro.
    try { localStorage.setItem(SEEN_KEY, '1') } catch { /* ignore */ }

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      setGone(true)
    }

    const fallback = setTimeout(finish, FALLBACK_MS)
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Skip-on-interaction ───────────────────────────────────────────────
    let revealed = false
    const doReveal = (quick: boolean) => {
      if (revealed) return
      revealed = true
      video.removeEventListener('ended', onEnded)
      gsap.timeline({ onComplete: finish })
        .to({}, { duration: quick ? 0.12 : 1.4 })
        .to(el,  { yPercent: -100, duration: 0.9, ease: 'power3.inOut' })
    }
    const onEnded = () => doReveal(false)
    const onSkip  = () => doReveal(true)
    // ─────────────────────────────────────────────────────────────────────

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.5, onComplete: finish })
        return
      }

      // Logo fades in at the very start and remains visible for the whole clip.
      // The element starts at opacity:0 / visibility:hidden (set in JSX) so
      // there is no flash before this tween runs.
      gsap.to(logoRef.current, { autoAlpha: 1, duration: 0.55, ease: 'power2.out', delay: 0.15 })

      video.addEventListener('ended', onEnded, { once: true })
      video.addEventListener('error', finish,   { once: true })

      // Desktop: wheel or key press skips
      window.addEventListener('wheel',   onSkip, { passive: true, once: true })
      window.addEventListener('keydown', onSkip, { once: true })
      // Mobile: swipe skips
      window.addEventListener('touchmove', onSkip, { passive: true, once: true })

      const p = video.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => { gsap.delayedCall(0.8, finish) })
      }
    }, containerRef)

    return () => {
      finished = true
      clearTimeout(fallback)
      window.removeEventListener('wheel',     onSkip)
      window.removeEventListener('keydown',   onSkip)
      window.removeEventListener('touchmove', onSkip)
      ctx.revert()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])   // run once on mount — gone is stable at mount time

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
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        autoPlay
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Soft vignette + bottom scrim so the wordmark stays legible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 90% 90% at 50% 45%, transparent 55%, rgba(28,26,24,0.45) 100%), linear-gradient(to bottom, rgba(28,26,24,0.15) 0%, transparent 30%, transparent 70%, rgba(28,26,24,0.55) 100%)',
        }}
      />

      {/* Brand wordmark — visible throughout the clip */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: 0,
          visibility: 'hidden',
        }}
      >
        {/* Soft ivory glow pool behind the wordmark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 'min(84vw, 480px)',
            height: 'min(48vw, 260px)',
            background:
              'radial-gradient(ellipse at center, rgba(246,241,232,0.55) 0%, rgba(246,241,232,0.28) 42%, transparent 72%)',
            filter: 'blur(6px)',
          }}
        />
        <Image
          src="/credence_asia_logo_hd_transparent.png"
          alt="Credence Asia Group"
          width={240}
          height={80}
          priority
          style={{
            position: 'relative',
            width: 'min(52vw, 240px)',
            height: 'auto',
            objectFit: 'contain',
            filter:
              'brightness(0) drop-shadow(0 1px 2px rgba(255,255,255,0.6)) drop-shadow(0 2px 22px rgba(246,241,232,0.85))',
          }}
        />
      </div>
    </div>
  )
}
