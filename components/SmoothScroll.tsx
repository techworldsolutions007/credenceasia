'use client'

import {useEffect} from 'react'
import Lenis from 'lenis'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({children}: {children: React.ReactNode}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    } as any)

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // First refresh after layout settles; second on window load catches
    // async resources (GeoJSON fetch, web fonts, lazy images) that shift layout.
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 500)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad, {once: true})

    return () => {
      clearTimeout(refreshId)
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
