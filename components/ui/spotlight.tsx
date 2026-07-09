'use client'

import {useRef, useState, useEffect} from 'react'

interface SpotlightProps {
  className?: string
  fill?: string
  size?: number
}

export function Spotlight({
  className = '',
  fill = 'rgba(163,169,133,0.18)',
  size = 700,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({x: -9999, y: -9999})
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const container = containerRef.current?.parentElement
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setPosition({x: e.clientX - rect.left, y: e.clientY - rect.top})
      setOpacity(1)
    }

    const handleMouseLeave = () => setOpacity(0)

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{opacity, transition: 'opacity 0.6s ease'}}
    >
      <div
        className="absolute rounded-full"
        style={{
          left: position.x,
          top: position.y,
          width: size,
          height: size,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${fill} 0%, rgba(163,169,133,0.06) 40%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
