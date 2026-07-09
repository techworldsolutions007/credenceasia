'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function AnimateIn({children, className = '', delay = 0, y = 28}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {y, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay,
          ease: 'power3.out',
          scrollTrigger: {trigger: el, start: 'top 88%', once: true},
        },
      )
    })

    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
