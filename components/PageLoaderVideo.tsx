'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

/*
  ─── Video opening animation ──────────────────────────────────────────────
  Cinematic intro clip (Credence Asia design atelier — slow dolly-in toward
  daylight) plays full-screen, the brand wordmark settles in over the final
  beat, then the panel lifts away to reveal the site.

  The previous CSS/GSAP loaders are preserved and untouched:
    • components/PageLoader.tsx          (active before this — woven threads)
    • components/PageLoaderFabricFold.tsx
    • components/PageLoaderBlind.tsx
  To revert, point app/layout.tsx back at '@/components/PageLoader'.

  Swap the clip: intro.mp4 (default) ↔ intro-alt.mp4 — change VIDEO_SRC below.
*/

const VIDEO_SRC = '/intro.mp4'
// Flip to true to show the intro only once per browser session instead of on
// every hard refresh (matches the old loader's every-load behaviour when false).
const PLAY_ONCE_PER_SESSION = true
const SESSION_KEY = 'ca-intro-shown'
// Safety net: reveal the site even if the video never fires `ended` / stalls.
const FALLBACK_TIMEOUT_MS = 8500
// When the wordmark fades in, measured from the end of the clip.
const LOGO_LEAD_IN_S = 1.15

export default function PageLoaderVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  // Decide synchronously on first render whether to skip entirely (avoids a flash).
  const [skip] = useState(() => {
    if (typeof window === 'undefined') return false
    return PLAY_ONCE_PER_SESSION && sessionStorage.getItem(SESSION_KEY) === '1'
  })

  useEffect(() => {
    if (skip) { setGone(true); return }

    const el = containerRef.current
    const video = videoRef.current
    if (!el || !video) return

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      if (PLAY_ONCE_PER_SESSION) {
        try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
      }
      setGone(true)
    }

    const fallback = setTimeout(finish, FALLBACK_TIMEOUT_MS)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Reduced motion — don't autoplay a moving clip; hold the first frame briefly then reveal.
      if (reduced) {
        gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.5, onComplete: finish })
        return
      }

      gsap.set(logoRef.current, { autoAlpha: 0, y: 14 })
      let logoShown = false

      const revealSite = () => {
        gsap.timeline({ onComplete: finish })
          .to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
          .to({}, { duration: 0.25 })
          .to(el, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' })
      }

      const onTimeUpdate = () => {
        if (!logoShown && video.duration && video.currentTime >= video.duration - LOGO_LEAD_IN_S) {
          logoShown = true
          gsap.to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' })
        }
      }

      video.addEventListener('timeupdate', onTimeUpdate)
      video.addEventListener('ended', revealSite, { once: true })
      video.addEventListener('error', finish, { once: true })

      // Kick off playback; if the browser blocks autoplay, don't trap the user.
      const p = video.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => { gsap.delayedCall(0.8, finish) })
      }
    }, containerRef)

    return () => {
      finished = true
      clearTimeout(fallback)
      ctx.revert()
    }
  }, [skip])

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

      {/* Soft vignette + bottom scrim so the wordmark stays legible over the footage */}
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

      {/* Brand wordmark — settles in over the final beat, solid black with a
          soft ivory pool + glow behind it so it stays legible over the footage */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Gentle light pool that lifts the black wordmark off the footage */}
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
            // brightness(0) forces solid black; light drop-shadows add a halo for contrast
            filter:
              'brightness(0) drop-shadow(0 1px 2px rgba(255,255,255,0.6)) drop-shadow(0 2px 22px rgba(246,241,232,0.85))',
          }}
        />
      </div>
    </div>
  )
}
