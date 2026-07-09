import {urlFor} from '@/sanity/lib/image'
import ImagePlaceholder from './ImagePlaceholder'

type Props = {
  source?: any
  ratio: string
  tone?: 'light' | 'dark'
  label?: string
  caption?: string
  className?: string
  width?: number
  height?: number
  alt?: string
  quality?: number
}

export default function SmartImage({
  source,
  ratio,
  tone = 'light',
  label,
  caption,
  className = '',
  width = 1200,
  height,
  alt,
  quality = 82,
}: Props) {
  if (source) {
    let builder = urlFor(source).width(width).quality(quality).auto('format')
    if (height) builder = builder.height(height)
    const url = builder.url()
    return (
      <div className={`relative overflow-hidden ${className}`} style={{aspectRatio: ratio}}>
        <img
          src={url}
          alt={alt || label || ''}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        {caption && (
          <div
            className={`absolute inset-x-0 bottom-0 px-4 py-3 type-label leading-snug ${
              tone === 'dark' ? 'bg-charcoal/70 text-ivory/85' : 'bg-ivory/85 text-charcoal/85'
            }`}
          >
            {caption}
          </div>
        )}
      </div>
    )
  }
  return (
    <ImagePlaceholder
      ratio={ratio}
      tone={tone}
      label={label}
      caption={caption}
      className={className}
    />
  )
}
