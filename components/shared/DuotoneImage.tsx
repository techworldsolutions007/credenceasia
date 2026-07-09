type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

export default function DuotoneImage({src, alt, className = '', imgClassName = ''}: Props) {
  return (
    <div className={`relative isolate ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`relative block h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
