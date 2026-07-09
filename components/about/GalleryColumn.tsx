type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function GalleryColumn({children, className = '', style}: Props) {
  return (
    <div className={`flex flex-col gap-3 ${className}`} style={style}>
      {children}
    </div>
  )
}
