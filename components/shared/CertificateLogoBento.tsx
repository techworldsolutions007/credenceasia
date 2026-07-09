import Image from 'next/image'
import type {CertificateLogo} from '@/lib/certificates'

type Props = {
  logos: CertificateLogo[]
  itemClassName?: string
}

export default function CertificateLogoBento({logos, itemClassName = ''}: Props) {
  if (logos.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-px bg-beige/40 sm:grid-cols-3 lg:grid-cols-4">
      {logos.map((logo) => (
        <div
          key={logo.src}
          className={[
            'group flex min-h-[180px] flex-col items-center justify-center gap-4 bg-ivory px-8 py-10 transition-colors duration-300 hover:bg-cream',
            itemClassName,
          ].filter(Boolean).join(' ')}
        >
          <Image
            src={logo.src}
            alt={logo.name}
            width={240}
            height={120}
            loading="lazy"
            className="h-auto max-h-20 w-full max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <p className="type-eyebrow text-center text-charcoal/45">{logo.name}</p>
        </div>
      ))}
    </div>
  )
}
