'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  id?: string
  skipAnimation?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
  id,
  skipAnimation = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || skipAnimation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sh-item',
        {y: 28, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {trigger: el, start: 'top 88%', once: true},
        },
      )
    }, el)

    return () => ctx.revert()
  }, [skipAnimation])

  const textAlign = align === 'center' ? 'text-center mx-auto' : ''
  const eyebrowColor = light ? 'text-beige/70' : 'text-clay'
  const titleColor = light ? 'text-ivory' : 'text-charcoal'
  const subtitleColor = light ? 'text-beige/80' : 'text-soil/70'

  return (
    <div ref={ref} className={`max-w-2xl ${textAlign} ${className}`}>
      {eyebrow && (
        <p className={`sh-item type-eyebrow mb-5 ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`sh-item type-h2 ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`sh-item type-body mt-5 ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  )
}
