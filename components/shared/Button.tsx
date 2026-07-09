import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'

type Props = {
  href?: string
  onClick?: () => void
  variant?: Variant
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  external?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-soil text-ivory hover:bg-moss border border-soil hover:border-moss',
  secondary:
    'bg-transparent text-soil border border-soil hover:bg-soil hover:text-ivory',
  ghost:
    'bg-transparent text-ivory border border-ivory/50 hover:border-ivory hover:bg-ivory/10',
  light:
    'bg-ivory text-charcoal border border-ivory hover:bg-cream',
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  external = false,
}: Props) {
  const base =
    'inline-flex h-12 items-center px-8 type-label transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const cls = `${base} ${VARIANTS[variant]} ${className}`

  if (href) {
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
