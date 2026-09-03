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
    try {
      const seen = localStorage.getItem(SEEN_KEY) === '1'
      console.log('[IntroLoader] localStorage check —', seen ? 'already seen, skipping' : 'first visit, will play')
      return seen
    } catch (err) {
      console.error('[IntroLoader] localStorage read failed:', err)
      return false
    }
  })

  useEffect(() => {
    if (gone) {
      console.log('[IntroLoader] skipped (already seen)')
      return
    }

    const el    = containerRef.current
    const video = videoRef.current
    if (!el || !video) {
      console.error('[IntroLoader] refs not ready — el:', el, 'video:', video)
      return
    }

    console.log('[IntroLoader] mounting intro, marking seen in localStorage')
    try { localStorage.setItem(SEEN_KEY, '1') } catch (err) {
      console.error('[IntroLoader] localStorage write failed:', err)
    }

    // Lock body scroll so the page cannot drift behind the overlay while it
    // is visible. Also snap to top so the reveal always starts at position 0.
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      document.body.style.overflow = ''
      console.log('[IntroLoader] finish() called — removing overlay')
      setGone(true)
    }

    const fallback = setTimeout(() => {
      console.warn('[IntroLoader] fallback timeout fired — forcing reveal')
      finish()
    }, FALLBACK_MS)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    console.log('[IntroLoader] reduced-motion:', reduced)

    let revealed = false
    const doReveal = (quick: boolean) => {
      if (revealed) return
      revealed = true
      console.log('[IntroLoader] doReveal —', quick ? 'quick skip' : 'natural end')
      video.removeEventListener('ended', onEnded)
      // Snap back to top before the panel lifts so the homepage always
      // appears at position 0 regardless of any scroll that snuck through.
      window.scrollTo(0, 0)
      gsap.timeline({ onComplete: finish })
        .to({}, { duration: quick ? 0.12 : 1.4 })
        .to(el,  { yPercent: -100, duration: 0.9, ease: 'power3.inOut' })
    }
    const onEnded = () => { console.log('[IntroLoader] video ended'); doReveal(false) }
    const onSkip  = () => { console.log('[IntroLoader] user skipped'); doReveal(true) }

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.5, onComplete: finish })
        return
      }

      gsap.to(logoRef.current, { autoAlpha: 1, duration: 0.55, ease: 'power2.out', delay: 0.15 })

      video.addEventListener('ended', onEnded, { once: true })
      video.addEventListener('error', (e) => {
        console.error('[IntroLoader] video error:', e)
        finish()
      }, { once: true })

      // Any user interaction dismisses the intro:
      // desktop — scroll wheel, key press, mouse click
      // mobile  — tap (touchstart) or swipe (touchmove)
      window.addEventListener('wheel',      onSkip, { passive: true, once: true })
      window.addEventListener('keydown',    onSkip, { once: true })
      window.addEventListener('click',      onSkip, { once: true })
      window.addEventListener('touchstart', onSkip, { passive: true, once: true })
      window.addEventListener('touchmove',  onSkip, { passive: true, once: true })

      const p = video.play()
      if (p && typeof p.catch === 'function') {
        p.catch((err: unknown) => {
          console.error('[IntroLoader] video.play() rejected:', err)
          gsap.delayedCall(0.8, finish)
        })
      }
    }, containerRef)

    return () => {
      console.log('[IntroLoader] cleanup running')
      finished = true
      clearTimeout(fallback)
      document.body.style.overflow = ''
      window.removeEventListener('wheel',      onSkip)
      window.removeEventListener('keydown',    onSkip)
      window.removeEventListener('click',      onSkip)
      window.removeEventListener('touchstart', onSkip)
      window.removeEventListener('touchmove',  onSkip)
      ctx.revert()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])   // run once on mount

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
