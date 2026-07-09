import Image from 'next/image'
import FrameworkPreview from './FrameworkPreview'

export default function SustainabilityMedia() {
  return (
    <div className="sus2-media relative overflow-hidden rounded-sm">
      {/* Aspect ratio: 4/3 on mobile, tall fixed minimum on desktop */}
      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[440px]">
        <Image
          src="/manufacturing-studio.png"
          alt="Credence Asia Group production facility — responsible manufacturing"
          fill
          sizes="(max-width: 1024px) 100vw, (max-width: 1360px) 50vw, 680px"
          className="object-cover"
          loading="lazy"
        />

        {/* Textile grain ~2% */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* We Care framework panel overlay */}
        <FrameworkPreview />
      </div>
    </div>
  )
}
