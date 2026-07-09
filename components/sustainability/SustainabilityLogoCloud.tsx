import Image from 'next/image'
import type {CertificateLogo} from '@/lib/certificates'

type Props = {
  logos: CertificateLogo[]
}

export default function SustainabilityLogoCloud({logos}: Props) {
  if (logos.length === 0) return null

  return (
    <div className="sus2-logo-cloud mt-10 border-b border-t border-ivory/15 py-5 md:mt-12">

      <p className="mb-4 text-center type-eyebrow text-ivory/40">
        Fibre &amp; Material Standards
      </p>

      {/* Marquee — two identical sets end-to-end, CSS animates the track by -50% */}
      <div className="overflow-hidden" aria-label="Sustainable fibre and material standards">
        <div className="animate-marquee flex gap-5">

          {/* First set — screen-reader visible */}
          {logos.map((logo) => (
            <div
              key={`a-${logo.src}`}
              className="flex shrink-0 items-center justify-center rounded-sm bg-ivory px-4 py-2"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={48}
                loading="lazy"
                className="h-auto max-h-8 w-auto max-w-[100px] object-contain"
              />
            </div>
          ))}

          {/* Duplicate set — aria-hidden, makes the loop seamless */}
          {logos.map((logo) => (
            <div
              key={`b-${logo.src}`}
              aria-hidden
              className="flex shrink-0 items-center justify-center rounded-sm bg-ivory px-4 py-2"
            >
              <Image
                src={logo.src}
                alt=""
                width={120}
                height={48}
                loading="lazy"
                className="h-auto max-h-8 w-auto max-w-[100px] object-contain"
              />
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}
