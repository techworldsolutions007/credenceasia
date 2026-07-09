'use client'

import {useEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import type {SanityImageSource} from '@sanity/image-url'
import SmartImage from '@/components/shared/SmartImage'

gsap.registerPlugin(ScrollTrigger)

export type JourneyStage = {
  _key?: string
  label: string
  stat: string
  statLabel: string
  image?: SanityImageSource
  variant?: 'default' | 'qc'
  body?: string
}

const FALLBACK_STAGES: JourneyStage[] = [
  {
    label: 'Research',
    stat: 'CPH',
    statLabel: 'Design and research hub',
    body: 'Color, print, graphics, silhouette and washing research in Copenhagen. Brand and customer specific range planning before a single sample is cut.',
    variant: 'default',
  },
  {
    label: 'Sample',
    stat: '7d',
    statLabel: 'First prototype',
    body: 'In-house sample rooms turn first sketches into wearable prototypes in days, accelerating line planning and merchant sign off.',
    variant: 'default',
  },
  {
    label: 'Source',
    stat: '40+',
    statLabel: 'Mill partnerships',
    body: 'Fabric libraries, mill partnerships and target-price engineering. Cost set up front without compromising design or quality.',
    variant: 'default',
  },
  {
    label: 'Manufacture',
    stat: '6',
    statLabel: 'Country network',
    body: 'Knits, woven, denim, outerwear, activewear and workwear across China, Bangladesh, India, Vietnam, Cambodia and Myanmar.',
    variant: 'default',
  },
  {
    label: 'Quality Control',
    stat: 'AQL 1.5',
    statLabel: 'In-line standard',
    body: 'Daily in-line audits, per plant QC teams and strict pre-delivery inspection to AQL 1.5 to 2.5. No surprises at port.',
    variant: 'qc',
  },
  {
    label: 'Deliver',
    stat: '4',
    statLabel: 'Freight terms',
    body: 'Freight planning and multi-term shipping. FOB, CIF, DAP or DDP, built around the channel and lead-time you need.',
    variant: 'default',
  },
]

type Props = {stages?: JourneyStage[]}

export default function GarmentJourney({stages}: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const data = stages?.length ? stages : FALLBACK_STAGES

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.gj-intro > *', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {trigger: sectionRef.current, start: 'top 70%', once: true},
      })

      gsap.utils.toArray<HTMLElement>('.gj-stage').forEach((stage) => {
        gsap.from(stage.querySelectorAll('.gj-reveal'), {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {trigger: stage, start: 'top 75%', once: true},
        })

        const dots = stage.querySelectorAll('.gj-qc-dot')
        if (dots.length) {
          gsap.from(dots, {
            opacity: 0,
            scale: 0.7,
            duration: 0.45,
            stagger: 0.12,
            ease: 'back.out(2.2)',
            scrollTrigger: {trigger: stage, start: 'top 70%', once: true},
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [data.length])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal text-ivory section-py"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Intro */}
        <div className="gj-intro mb-20 max-w-2xl">
          <p className="section-num text-leaf/85">.03</p>
          <p className="type-eyebrow mb-6 text-leaf/85">
            The Journey
          </p>
          <h2
            id="journey-heading"
            className="type-hero text-ivory"
          >
            <span className="font-light text-beige/85">From sketch</span>{' '}
            <span className="font-semibold">to delivery.</span>
          </h2>
          <p className="mt-6 max-w-xl type-body text-ivory/85">
            Six accountable stages, one production pathway. Each stage owned by a named team
            with documented outputs, from research in Copenhagen to delivery at port.
          </p>
        </div>

        {/* Stages, vertical, with a sticky stage-index column on desktop */}
        <ol className="flex flex-col gap-px bg-ivory/10">
          {data.map((stage, i) => (
            <li
              key={stage._key ?? `${stage.label}-${i}`}
              className="gj-stage bg-charcoal"
            >
              <article className="grid grid-cols-1 gap-8 px-6 py-14 md:grid-cols-[140px_1fr_1.1fr] md:gap-12 md:px-10 md:py-20">

                {/* Stage index (sticky on desktop) */}
                <div className="md:sticky md:top-32 md:self-start">
                  <p className="gj-reveal type-eyebrow text-leaf/85">
                    Stage {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="gj-reveal mt-2 type-eyebrow text-ivory/55">
                    of {String(data.length).padStart(2, '0')}
                  </p>
                </div>

                {/* Text */}
                <div>
                  <h3 className="gj-reveal type-h2 text-ivory">
                    {stage.label}
                  </h3>

                  {stage.body && (
                    <p className="gj-reveal mt-5 max-w-md type-body text-ivory/75">
                      {stage.body}
                    </p>
                  )}

                  <div className="gj-reveal mt-8 flex items-baseline gap-4">
                    <p className="type-stat text-ivory">
                      {stage.stat}
                    </p>
                    <p className="type-label text-beige/85">
                      {stage.statLabel}
                    </p>
                  </div>

                  {stage.variant === 'qc' && (
                    <div className="mt-6 flex gap-3">
                      {Array.from({length: 5}).map((_, di) => (
                        <span
                          key={di}
                          className="gj-qc-dot h-2.5 w-2.5 rounded-full bg-leaf shadow-[0_0_12px_rgba(79,111,70,0.6)]"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className="gj-reveal">
                  <SmartImage
                    source={stage.image}
                    ratio="4/3"
                    tone="dark"
                    alt={`Stage ${i + 1}, ${stage.label}`}
                    label={`Stage ${i + 1}. ${stage.label}`}
                    caption={stage.statLabel}
                    width={1400}
                    height={1050}
                    className="w-full"
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
