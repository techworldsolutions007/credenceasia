'use client'

import Link from 'next/link'

interface ShimmerButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'dark'
  className?: string
}

export function ShimmerButton({href, children, variant = 'primary', className = ''}: ShimmerButtonProps) {
  if (variant === 'dark') {
    return (
      <Link
        href={href}
        className={`group relative inline-flex h-12 min-h-[48px] items-center overflow-hidden bg-forest px-8 type-label text-ivory transition-colors duration-300 hover:bg-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${className}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-none group-hover:animate-[shimmer-slide_0.65s_ease-in-out_forwards]"
        />
        <span className="relative z-10">{children}</span>
      </Link>
    )
  }

  if (variant === 'primary') {
    return (
      <Link
        href={href}
        className={`group relative inline-flex h-12 items-center overflow-hidden bg-ivory px-8 type-label text-forest transition-colors duration-300 hover:bg-cream ${className}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-none group-hover:animate-[shimmer-slide_0.65s_ease-in-out_forwards]"
        />
        <span className="relative z-10">{children}</span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`relative inline-flex h-12 items-center overflow-hidden border border-ivory/30 px-8 type-label text-ivory/80 transition-all duration-300 hover:border-ivory/70 hover:text-ivory ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  )
}
