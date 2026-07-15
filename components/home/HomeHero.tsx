'use client'

// ─── OLD HERO (preserved — may be reused) ────────────────────────────────────
/*
import {useEffect, useRef} from 'react'
import Link from 'next/link'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ArrowRight, ArrowUpRight} from 'lucide-react'
import {Spotlight} from '@/components/ui/spotlight'
import SmartImage from '@/components/shared/SmartImage'

gsap.registerPlugin(ScrollTrigger)

type HomePageData = {
  heroImage?: any
} | null

const TITLE_LINES: Array<Array<{w: string; bold: boolean}>> = [
  [{w: 'European', bold: false}, {w: 'design,', bold: true}],
  [{w: 'Asian', bold: false}, {w: 'production', bold: false}, {w: 'scale.', bold: true}],
]

const PROOF_ITEMS = [
  {value: '2',       label: 'Design and HQ hubs'},
  {value: '6',       label: 'Production countries'},
  {value: '3,700+',  label: 'Workers'},
  {value: '14M+',    label: 'Pcs per year'},
]

const CERTS = ['BSCI', 'Sedex', 'Oeko-Tex', 'WRAP', 'GMP']

export default function HomeHero({data}: {data: HomePageData}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {ease: 'power3.out'}})

      tl.from('.hh-meta > *',  {y: 14, opacity: 0, duration: 0.55, stagger: 0.06}, 0.15)
      tl.from('.hh-word',      {y: '105%', duration: 0.95, ease: 'power4.out', stagger: 0.055}, 0.35)
      tl.from('.hh-desc',      {y: 22, opacity: 0, duration: 0.7}, 0.95)
      tl.from('.hh-cta-row',   {y: 18, opacity: 0, duration: 0.65}, 1.10)
      tl.from('.hh-proof > *', {y: 14, opacity: 0, duration: 0.5, stagger: 0.07}, 1.25)
      tl.from('.hh-image',     {opacity: 0, scale: 1.03, duration: 1.1, ease: 'power3.out'}, 0.55)
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-parchment md:min-h-screen"
    >
      <Spotlight fill="rgba(163,169,133,0.22)" size={800} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6B4F3A 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 12% 20%, rgba(216,199,168,0.45) 0%, transparent 60%), radial-gradient(ellipse 40% 45% at 88% 85%, rgba(107,79,58,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 px-6 pt-[88px] md:grid-cols-[1.05fr_1fr] md:gap-x-12 md:px-10 lg:gap-x-20">

        <div className="relative flex flex-col py-10 md:justify-between md:py-16">

          <div className="hh-meta flex flex-wrap items-center gap-3 type-eyebrow text-soil/70">
            <span className="block h-px w-8 bg-soil/40" />
            <span>Est. 2016</span>
            <span className="text-soil/40">/</span>
            <span>HQ Hong Kong</span>
            <span className="text-soil/40">/</span>
            <span>Design Copenhagen</span>
          </div>

          <div className="my-10 md:my-0">
            <h1 className="font-serif text-[2.4rem] font-normal leading-[1.04] text-charcoal md:text-[3.2rem] lg:text-[3.6rem]">
              {TITLE_LINES.map((line, i) => (
                <span key={i} className="block">
                  {line.map(({w, bold}, j) => (
                    <span
                      key={j}
                      className={`inline-block overflow-hidden align-top ${
                        j < line.length - 1 ? 'mr-[0.28em]' : ''
                      }`}
                    >
                      <span
                        className={`hh-word inline-block ${
                          bold ? 'font-semibold text-charcoal' : 'font-normal text-charcoal/85'
                        }`}
                      >
                        {w}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="hh-desc mt-8 max-w-[54ch] type-body text-charcoal/75">
              European design intelligence, Asian production scale. From first sketch to final
              delivery through one accountable pathway, with commercial presence across Europe
              and the Americas.
            </p>

            <div className="hh-cta-row mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="group relative inline-flex h-12 items-center overflow-hidden bg-soil px-8 type-label text-ivory transition-colors duration-300 hover:bg-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soil"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer-slide_0.65s_ease-in-out_forwards]"
                />
                <span className="relative inline-flex items-center gap-2">
                  Start an Enquiry
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                </span>
              </Link>

              <Link
                href="/collection"
                className="group inline-flex items-center gap-3 type-label text-charcoal/75 transition-colors hover:text-soil"
              >
                <span className="border-b border-charcoal/30 pb-1 transition-colors duration-300 group-hover:border-soil/60">
                  View Capabilities
                </span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <dl className="hh-proof mt-12 grid grid-cols-2 gap-y-5 gap-x-6 border-t border-soil/15 pt-6 max-w-xl sm:grid-cols-4">
              {PROOF_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="font-serif text-xl font-semibold text-charcoal md:text-2xl">
                    {item.value}
                  </dt>
                  <dd className="mt-1 type-eyebrow text-soil/70">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="hh-proof mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 type-eyebrow text-soil/80">
              <span className="text-soil/60">Certified</span>
              {CERTS.map((cert) => (
                <span key={cert} className="font-medium">{cert}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center pb-10 pt-2 md:py-0">
          <div className="hh-image relative w-full max-w-[460px]">
            <SmartImage
              source={data?.heroImage}
              ratio="3/4"
              tone="light"
              alt="Credence Asia Group production"
              label="Hero. Production floor, Dhaka, Bangladesh"
              caption="Knit production line. 36 lines, 3,700 employees, 1M pcs per month."
              width={1200}
              height={1600}
              className="w-full"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-full w-full border border-beige"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
*/
// ─────────────────────────────────────────────────────────────────────────────

import {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {ChevronLeft, ChevronRight, Menu, X} from 'lucide-react'

type HomePageData = {heroImage?: any} | null

const NAV_LINKS = [
  {label: 'Collection',   href: '/collection'},
  {label: 'Network',      href: '/about#network'},
  {label: 'Sustainability', href: '/sustainability'},
  {label: 'About',        href: '/about'},
  {label: 'Contact',      href: '/contact'},
]

const SLIDES = [
  {src: '/hero-atelier.png',         alt: 'Design atelier, Copenhagen'},
  {src: '/hero2.png', alt: 'Production, Asia'},
  {src: '/hero3sus1.png', alt: 'Product capabilities'},
  {src: '/sustainable-fibers.png',   alt: 'Sustainable fibers'},
]

export default function HomeHero({data: _data}: {data: HomePageData}) {
  const [active, setActive]         = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  // Auto-advance. Re-runs whenever `active` changes, so a manual selection
  // resets the 5s window instead of jump-cutting mid-interval.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [active])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Scrolled state for nav background — plain listener, no GSAP needed for a threshold toggle.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const prev = () => setActive(i => (i - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setActive(i => (i + 1) % SLIDES.length)

  return (
    <section className="relative min-h-svh w-full overflow-hidden">

      {/* ── Photographic background — crossfade carousel ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Warm earthy scrim */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-charcoal/50" />

      {/* Directional gradient — heavy bottom darkening for text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(37,36,33,0.45) 0%, rgba(37,36,33,0.0) 40%)',
            'linear-gradient(to top,   rgba(37,36,33,0.82) 0%, rgba(37,36,33,0.45) 35%, rgba(37,36,33,0.0) 60%)',
          ].join(', '),
        }}
      />

      {/* ── Header scrim — 120px gradient behind the nav, independent of photo brightness ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 z-[34] h-[120px]"
        style={{background: 'linear-gradient(to bottom, rgba(37,36,33,0.72) 0%, transparent 100%)'}}
      />

      {/* ── Embedded navigation bar ── */}
      <div
        className={[
          'absolute top-0 left-0 right-0 z-[35] motion-safe:transition-all motion-safe:duration-300',
          scrolled
            ? 'bg-charcoal/92 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="site-container flex h-[68px] items-center">

          {/* Logo — left slot */}
          <Link href="/" className="flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory" aria-label="Credence Asia Group home">
            <Image
              src="/credence_asia_logo_hd_transparent.png"
              alt="Credence Asia Group"
              width={200}
              height={64}
              priority
              style={{width: '219px', height: 'auto'}}
              className="brightness-0 invert"
            />
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right slot — nav links */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium tracking-[0.12em] uppercase text-ivory/75 hover:text-ivory motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={[
          'absolute inset-0 z-40 flex flex-col bg-charcoal/96 backdrop-blur-sm transition-all duration-300 lg:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        {/* Header row inside overlay */}
        <div className="flex h-[68px] items-center justify-between px-6 flex-shrink-0">
          <Link href="/" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory" onClick={() => setMobileOpen(false)}>
            <Image
              src="/credence_asia_logo_hd_transparent.png"
              alt="Credence Asia Group"
              width={112}
              height={36}
              style={{width: '100px', height: 'auto'}}
              className="brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col items-start justify-center gap-1 px-8" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={[
                'font-serif py-3 text-[2.1rem] font-normal text-ivory hover:text-sand transition-all duration-200',
                mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0',
              ].join(' ')}
              style={{
                transitionDelay: mobileOpen ? `${i * 55}ms` : '0ms',
                transitionProperty: 'opacity, transform, color',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className={[
              'mt-8 inline-flex h-11 items-center bg-ivory/95 px-7 type-label text-charcoal transition-all duration-200',
              mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0',
            ].join(' ')}
            style={{
              transitionDelay: mobileOpen ? `${NAV_LINKS.length * 55}ms` : '0ms',
              transitionProperty: 'opacity, transform',
            }}
          >
            Start an Enquiry
          </Link>
        </nav>

        <p className="px-8 pb-10 type-eyebrow text-ivory/30 flex-shrink-0">
          Credence Asia Group © {new Date().getFullYear()}
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           MOBILE layout  (hidden at lg+)
      ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 z-30 flex flex-col justify-end px-6 pb-10 pt-[68px]">

        {/* Story block — vertically occupies the lower ~50% */}
        <div className="mt-auto">
          {/* Headline */}
          <h1
            className="font-serif text-[2.5rem] font-semibold text-ivory leading-[1.1]"
            style={{textShadow: '0 2px 20px rgba(0,0,0,0.65), 0 1px 6px rgba(0,0,0,0.45)'}}
          >
            <span className="hh-line block">Trusted sourcing,</span>
            <span className="hh-line block">exceptional craft.</span>
          </h1>

          {/* Sub-copy */}
          <p
            className="hh-sub mt-3 type-small text-ivory/90 max-w-[36ch]"
            style={{textShadow: '0 1px 8px rgba(0,0,0,0.65)'}}
          >
            From first sketch to final delivery through one accountable pathway, with reach across Europe and the Americas.
          </p>

        </div>

        {/* Slide indicators — prev · dots · next */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="p-1.5 text-ivory/60 active:text-ivory"
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>

          <div className="flex items-center gap-[7px]">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                aria-pressed={i === active}
                className={[
                  'rounded-full transition-all duration-300',
                  i === active
                    ? 'h-[5px] w-6 bg-ivory'
                    : 'h-[5px] w-[5px] bg-ivory/35',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next slide"
            className="p-1.5 text-ivory/60 active:text-ivory"
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           DESKTOP layout  (hidden below lg)
      ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-30 pb-14">
      <div className="site-container flex items-end justify-between">

        {/* Bottom-left: story block */}
        <div className="max-w-[520px]">
          <h1
            className="font-serif text-[3.9rem] font-semibold text-ivory xl:text-[4.75rem]"
            style={{textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 1px 6px rgba(0,0,0,0.4)'}}
          >
            <span className="hh-line block leading-[1.12]">Trusted sourcing,</span>
            <span className="hh-line block leading-[1.12]">exceptional craft.</span>
          </h1>

          <p
            className="hh-sub mt-4 max-w-[44ch] type-body text-ivory"
            style={{textShadow: '0 1px 10px rgba(0,0,0,0.6)'}}
          >
            From first sketch to final delivery through one accountable pathway, with reach across Europe and the Americas.
          </p>

        </div>

        {/* Bottom-right: thumbnail carousel cluster */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="h-9 w-9 flex-shrink-0 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:border-ivory/70 hover:bg-ivory/10 transition-all duration-200"
          >
            <ChevronLeft size={15} strokeWidth={1.75} />
          </button>

          <div className="flex items-center gap-1.5">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}: ${slide.alt}`}
                aria-pressed={i === active}
                className={[
                  'relative flex-shrink-0 overflow-hidden rounded transition-all duration-300',
                  i === active
                    ? 'h-14 w-[78px] ring-2 ring-ivory ring-offset-1 ring-offset-charcoal/40 scale-[1.06]'
                    : 'h-[46px] w-16 opacity-50 hover:opacity-80',
                ].join(' ')}
              >
                <Image src={slide.src} alt={slide.alt} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next slide"
            className="h-9 w-9 flex-shrink-0 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:border-ivory/70 hover:bg-ivory/10 transition-all duration-200"
          >
            <ChevronRight size={15} strokeWidth={1.75} />
          </button>
        </div>
      </div>{/* end site-container */}
      </div>{/* end desktop layout shell */}
    </section>
  )
}
