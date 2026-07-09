type Props = {
  ratio?: string
  label?: string
  className?: string
  tone?: 'light' | 'dark'
  caption?: string
}

export default function ImagePlaceholder({
  ratio = '3/4',
  label,
  className = '',
  tone = 'light',
  caption,
}: Props) {
  const isDark = tone === 'dark'

  return (
    <div
      role="img"
      aria-label={label ?? 'Image placeholder'}
      className={`relative overflow-hidden ${
        isDark ? 'bg-charcoal text-ivory/55' : 'bg-beige/40 text-soil/55'
      } ${className}`}
      style={{aspectRatio: ratio}}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(246,241,232,0.10) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(107,79,58,0.18) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="opacity-40"
        >
          <rect x="3" y="3" width="18" height="18" rx="0.5" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>

      <div className="absolute left-3 top-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em]">
        <span className="inline-block h-px w-4 bg-current opacity-50" />
        <span>{ratio}</span>
      </div>

      {label && (
        <div className="absolute bottom-3 left-3 right-3 type-eyebrow leading-snug">
          {label}
        </div>
      )}

      {caption && (
        <div
          className={`absolute inset-x-0 bottom-0 px-4 py-3 type-label leading-snug ${
            isDark ? 'bg-charcoal/70 text-ivory/85' : 'bg-ivory/85 text-charcoal/85'
          }`}
        >
          {caption}
        </div>
      )}
    </div>
  )
}
