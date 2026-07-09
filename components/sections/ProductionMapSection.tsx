'use client'

import {useEffect, useRef} from 'react'
import {motion} from 'motion/react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import PresenceMap from '@/components/sections/PresenceMap'

gsap.registerPlugin(ScrollTrigger)

export type Country = {
  _id: string
  name: string
  tag?: string
  role?: string
  svgId?: string
  specialties?: string[]
  isHub?: boolean
  order?: number
}

const FALLBACK: Country[] = [
  {_id: 'bgd', name: 'Bangladesh', tag: 'Flagship. Knits and Woven', svgId: 'BGD', role: 'Two custom-bonded units: 36 lines, 3,000 machines and 3,700 people producing one million pieces a month — with embroidery and washing in-house.'},
  {_id: 'chn', name: 'China',      tag: 'Jackets and Workwear',      svgId: 'CHN', role: 'Specialist outerwear and workwear facility. 200 machines and 400 workers building one million pieces a year, with materials and trims sourced at origin.'},
  {_id: 'ind', name: 'India',      tag: 'Activewear and Beachwear',  svgId: 'IND', role: 'Activewear, tops, blouses, beachwear and coordinates. 350+ machines with 1.2 million pieces of annual capacity.'},
  {_id: 'khm', name: 'Cambodia',   tag: 'Casualwear and Uniforms',   svgId: 'KHM', role: 'Casual and uniform-grade programmes through long-standing, audited partner factories.'},
  {_id: 'mmr', name: 'Myanmar',    tag: 'Partner Capacity',          svgId: 'MMR', role: 'Flexible cut-and-sew capacity through audited partner factories, scaled to season and channel.'},
  {_id: 'vnm', name: 'Vietnam',    tag: 'Woven and Knits',           svgId: 'VNM', role: 'Scalable cut-and-sew capacity for woven and knit programmes through trusted partner factories.'},
]

const HUBS = [
  {label: 'Design Hub',  location: 'Copenhagen, Denmark', body: 'Colour, print, graphics, silhouette and washing research, translated into brand-specific range plans before the first sample is cut.'},
  {label: 'Group HQ',    location: 'Hong Kong',           body: 'Founded here in 2016. One named team runs sourcing, costing, sampling and freight — a single accountable pathway from enquiry to delivery.'},
  {label: 'Commercial',  location: 'Europe and Americas', body: 'Customer-facing teams in European and American markets, keeping design decisions and market insight close to where our partners sell.'},
]

type Props = {countries?: Country[]}

export default function ProductionMapSection({countries}: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const locations = countries?.length ? countries : FALLBACK
  const productionLocations = locations.filter((loc) => !loc.isHub)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const fmt = new Intl.NumberFormat('en-US')
      const counters: Array<{selector: string; end: number; render: (v: number) => string}> = [
        {selector: '.pms-count-countries', end: 6,    render: (v) => String(Math.round(v))},
        {selector: '.pms-count-monthly',   end: 1,    render: (v) => `${Math.round(v)}M+`},
        {selector: '.pms-count-annual',    end: 14,   render: (v) => `${Math.round(v)}M+`},
        {selector: '.pms-count-workers',   end: 3700, render: (v) => `${fmt.format(Math.round(v))}+`},
      ]

      counters.forEach(({selector, end, render}) => {
        const el = document.querySelector<HTMLElement>(selector)
        if (!el) return
        const obj = {val: 0}
        gsap.to(obj, {
          val: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {trigger: '.pms-stats-card', start: 'top 85%', once: true},
          onStart() { el.textContent = render(0) },
          onUpdate() { el.textContent = render(obj.val) },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-24 pb-0"
      style={{background: 'var(--color-cream)'}}
      aria-labelledby="production-map-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-eyebrow mb-3 text-olive/85">.02</p>
            <h2
              id="production-map-heading"
              className="type-h2 text-charcoal"
            >
              <span className="font-light text-soil/70">Production</span>{' '}
              <span className="font-semibold">across six countries.</span>
            </h2>
            <p className="type-label mt-3 text-soil/70">
              Plus design and commercial hubs in Europe and the Americas.
            </p>
          </div>
          <motion.p
            className="max-w-sm type-small text-charcoal/75 md:text-right"
            initial={{y: 20, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.7, delay: 0.15, ease: 'easeOut'}}
          >
            Design in Copenhagen, coordination from Hong Kong and audited
            factories across six countries — one accountable pathway from
            first sketch to final delivery.
          </motion.p>
        </div>

        {/* Hub strip, above the map. */}
        <div className="mb-10 grid grid-cols-1 gap-px bg-beige/40 sm:grid-cols-3">
          {HUBS.map((hub) => (
            <div key={hub.label} className="flex flex-col gap-2 bg-ivory p-6">
              <span className="text-[9px] uppercase tracking-[0.32em] text-leaf">
                {hub.label}
              </span>
              <h3 className="type-h3 text-charcoal">
                {hub.location}
              </h3>
              <p className="type-small text-soil/80">{hub.body}</p>
            </div>
          ))}
        </div>

        {/* Map — contained line-art */}
        <div className="mb-10">
          <PresenceMap />
        </div>

        {/* Location cards — 6 cells: 5 production countries + 1 network summary */}
        <div
          className="grid grid-cols-1 gap-px bg-beige/40 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Production network locations"
        >
          {productionLocations.map((loc, i) => (
            <motion.div
              key={loc._id}
              id={`country-card-${loc.svgId ?? loc.name}`}
              role="listitem"
              className={`group relative flex flex-col overflow-hidden bg-ivory p-6 transition-all duration-300 hover:bg-cream/80 hover:shadow-[inset_0_0_0_1px_rgba(87,105,74,0.12)] md:p-8 ${
                i === 0 ? 'lg:col-span-2' : ''
              }`}
              initial={{y: 20, opacity: 0}}
              whileInView={{y: 0, opacity: 1}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.55, delay: i * 0.07, ease: 'easeOut'}}
            >
              {/* Hover bottom accent */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-full opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                style={{background: 'linear-gradient(90deg, var(--color-leaf), var(--color-sage), var(--color-leaf))'}}
              />

              <div className="mb-1 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-leaf/60 transition-colors duration-300 group-hover:bg-leaf" />
                <span className="text-[9px] uppercase tracking-[0.22em] text-clay">
                  {loc.tag ?? 'Production'}
                </span>
              </div>
              <h3 className="type-h3 mb-3 text-charcoal">
                {loc.name}
              </h3>
              <p className="type-small text-soil/80">{loc.role}</p>
            </motion.div>
          ))}

          {/* 6th cell — aggregated network summary, same card grammar */}
          <motion.div
            role="listitem"
            className="pms-stats-card flex flex-col justify-center bg-cream p-6 sm:col-span-2 md:p-8"
            initial={{y: 20, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.55, delay: productionLocations.length * 0.07, ease: 'easeOut'}}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-leaf" />
              <span className="text-[9px] uppercase tracking-[0.22em] text-leaf">
                Production Network
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="pms-count-countries font-serif text-2xl font-bold tracking-tight text-charcoal">6</p>
                <p className="type-label mt-1.5 text-clay">Countries</p>
              </div>
              <div>
                <p className="pms-count-monthly font-serif text-2xl font-bold tracking-tight text-charcoal">1M+</p>
                <p className="type-label mt-1.5 text-clay">BD / month</p>
              </div>
              <div>
                <p className="pms-count-annual font-serif text-2xl font-bold tracking-tight text-charcoal">14M+</p>
                <p className="type-label mt-1.5 text-clay">Pcs / year</p>
              </div>
              <div>
                <p className="pms-count-workers font-serif text-2xl font-bold tracking-tight text-charcoal">3,700+</p>
                <p className="type-label mt-1.5 text-clay">Workers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
