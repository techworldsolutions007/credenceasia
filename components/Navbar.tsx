'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

const NAV_LINKS = [
  {label: 'Collection', href: '/collection'},
  {label: 'Network', href: '/about#network'},
  {label: 'Sustainability', href: '/sustainability'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {document.body.style.overflow = ''}
  }, [open])

  // Home page uses its own embedded nav inside the full-bleed hero
  if (pathname === '/') return null

  return (
    <>
      <header
        className={[
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-ivory/95 shadow-[0_1px_0_0_rgba(37,36,33,0.08)] backdrop-blur-md'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soil">
            <Image
              src="/credence_asia_logo_hd_transparent.png"
              alt="Credence Asia Group"
              width={140}
              height={44}
              priority
              style={{ width: '150px', height: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(link.href.split('#')[0] + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'relative pb-1 text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-200',
                    isActive ? 'text-soil' : 'text-charcoal/70 hover:text-charcoal',
                    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-soil after:transition-all after:duration-300",
                    isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group relative inline-flex h-10 items-center overflow-hidden bg-soil px-7 type-label text-ivory transition-colors duration-300 hover:bg-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-soil"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer-slide_0.65s_ease-in-out_forwards]"
              />
              <span className="relative">Start an Enquiry</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-soil"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span
              className={[
                'block h-px w-6 bg-charcoal transition-all duration-300 origin-center',
                open ? 'translate-y-[5px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-6 bg-charcoal transition-all duration-300',
                open ? 'opacity-0 scale-x-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-6 bg-charcoal transition-all duration-300 origin-center',
                open ? '-translate-y-[5px] -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={[
          'fixed inset-0 z-40 flex flex-col bg-ivory transition-all duration-500 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div className="flex h-[68px] items-center px-6" />
        <nav
          className="flex flex-1 flex-col items-start justify-center gap-2 px-8"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'font-serif py-3 text-3xl font-normal transition-all duration-200',
                pathname === link.href ? 'text-soil' : 'text-charcoal hover:text-clay',
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
              ].join(' ')}
              style={{
                transitionDelay: open ? `${i * 60}ms` : '0ms',
                transitionProperty: 'opacity, transform, color',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={[
              'mt-8 inline-flex h-12 items-center bg-soil px-8 type-label text-ivory transition-all duration-300',
              open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
            ].join(' ')}
            style={{transitionDelay: open ? `${NAV_LINKS.length * 60}ms` : '0ms', transitionProperty: 'opacity, transform'}}
          >
            Start an Enquiry
          </Link>
        </nav>
        <div className="px-8 pb-10">
          <p className="type-eyebrow text-soil/50">
            Credence Asia Group © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  )
}
