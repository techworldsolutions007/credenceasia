import Image from 'next/image'

type Props = {
  src: string
  alt: string
  aspectRatio: string
  sizes: string
  priority?: boolean
  className?: string
}

export default function GalleryImage({
  src,
  alt,
  aspectRatio,
  sizes,
  priority = false,
  className = '',
}: Props) {
  return (
    <div
      className={`wwa2-img group/img relative overflow-hidden rounded-[10px] ${className}`}
      style={{aspectRatio}}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.015]"
        style={{filter: 'saturate(0.88) contrast(1.04) brightness(0.97)'}}
      />
      {/* Shared warm-green shadow tint across all tiles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{background: 'rgba(36,61,43,0.05)'}}
      />
    </div>
  )
}
