'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

/*
  ─── Video opening animation ──────────────────────────────────────────────
  SSR-compatible: the overlay is always in the server HTML so there is zero
  flash of the homepage on first load.

  For returning visitors an inline <script> hides the container synchronously
  before the first browser paint. React then fires useEffect which calls
  setGone(true) and unmounts the overlay entirely.

  Skip behaviour:
    Desktop  — mouse wheel scroll OR any key press  → panel lifts immediately.
    Mobile   — first swipe (touchmove)              → panel lifts immediately.
    Natural  — video ends                           → 1.4 s hold then lifts.
*/

const VIDEO_SRC   = '/intro.mp4'
const SEEN_KEY    = 'ca-intro-seen'
const FALLBACK_MS = 10000

// Inline script that runs synchronously before first paint.
// Hides the overlay for returning visitors before React hydrates.
const HIDE_SCRIPT =
  `(function(){try{if(localStorage.getItem('ca-intro-seen')==='1'){` +
  `var e=document.currentScript.parentElement;if(e)e.style.display='none';` +
  `}}catch(r){}})()`

export default function PageLoaderVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)

  // false during SSR (no window); true on client for returning visitors.
  // Causes a style.display mismatch during hydration for returning visitors —
  // suppressHydrationWarning on the container div suppresses the warning and
  // the inline script already hid the div before React even loaded.
  const [alreadySeen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try { return localStorage.getItem(SEEN_KEY) === '1' } catch { return false }
  })

  const [gone, setGone] = useState<boolean>(false)

  useEffect(() => {
    // Returning visitor — dismiss immediately without playing anything.
    if (alreadySeen) {
      console.log('[IntroLoader] already seen — skipping instantly')
      setGone(true)
      return
    }

    const el    = containerRef.current
    const video = videoRef.current
    if (!el || !video) {
      console.error('[IntroLoader] refs not ready — el:', el, 'video:', video)
      return
    }

    console.log('[IntroLoader] first visit — marking seen and playing intro')
    try { localStorage.setItem(SEEN_KEY, '1') } catch (err) {
      console.error('[IntroLoader] localStorage write failed:', err)
    }

    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      document.body.style.overflow = ''
      console.log('[IntroLoader] finish() — removing overlay')
      setGone(true)
    }

    const fallback = setTimeout(() => {
      console.warn('[IntroLoader] fallback timeout fired')
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
      console.log('[IntroLoader] cleanup')
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
  }, [])

  if (gone) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      suppressHydrationWarning
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#1C1A18',
        overflow: 'hidden',
        // alreadySeen is true only on the client for returning visitors.
        // This mismatches the server render (always false there) — suppressed above.
        display: alreadySeen ? 'none' : undefined,
      }}
    >
      {/* Hides the overlay for returning visitors before React hydrates */}
      <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: HIDE_SCRIPT }} />

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

      {/* Vignette + bottom scrim */}
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

      {/* Brand wordmark — fades in via GSAP at 0.15 s */}
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
