'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import SmartImage from '@/components/shared/SmartImage'

gsap.registerPlugin(ScrollTrigger)

type Props = {image?: any}

export default function SectionBreak({image}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to('.sb-img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{height: 'clamp(360px, 55vw, 720px)'}}
    >
      <div
        className="sb-img absolute left-0 right-0"
        style={{top: '-10%', height: '120%'}}
      >
        <SmartImage
          source={image}
          ratio="16/7"
          tone="dark"
          alt="Cutting floor, Bangladesh facility"
          label="Section break. Cutting floor, Bangladesh"
          width={1920}
          height={840}
          className="h-full w-full"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{background: 'linear-gradient(to bottom, var(--color-cream) 0%, transparent 100%)'}}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{background: 'linear-gradient(to top, var(--color-cream) 0%, transparent 100%)'}}
      />

      {/* Centred caption overlay, earns the slot */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="type-eyebrow mb-3 text-ivory/90">
            Daily in-line audits. AQL 1.5 to 2.5.
          </p>
          <p className="type-quote text-ivory">
            Quality systems built into every stage, not bolted on at the end.
          </p>
        </div>
      </div>
    </div>
  )
}
