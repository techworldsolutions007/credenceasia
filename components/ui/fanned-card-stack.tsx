'use client'

import * as React from 'react'
import {cn} from '@/lib/utils'
import gsap from 'gsap'
import {Draggable} from 'gsap/Draggable'
import {useGSAP} from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable)
}

interface FannedCardStackProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  rotateFactor?: number
  scaleFactor?: number
  pivot?: {x: number; y: number}
  onReorder?: (newItems: T[]) => void
  className?: string
}

export function FannedCardStack<T>({
  items: initialItems,
  renderItem,
  rotateFactor = 4,
  scaleFactor = 0.05,
  pivot = {x: 50, y: 100},
  onReorder,
  className,
}: FannedCardStackProps<T>) {
  const [items, setItems] = React.useState(initialItems)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const isAnimating = React.useRef(false)
  const hasLoaded = React.useRef(false)

  React.useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  const getCardStyle = React.useCallback(
    (index: number) => {
      return {
        rotation: index * rotateFactor,
        scale: 1 - index * scaleFactor,
        zIndex: items.length - index,
        x: 0,
        y: 0,
        opacity: 1,
      }
    },
    [items.length, rotateFactor, scaleFactor],
  )

  useGSAP(
    () => {
      // Entrance vs. maintenance: first render plays a deal animation, later renders snap into place.
      if (!hasLoaded.current) {
        items.forEach((_, index) => {
          const el = cardRefs.current[index]
          if (el) {
            gsap.set(el, {
              transformOrigin: `${pivot.x}% ${pivot.y}%`,
              rotation: 0,
              x: 0,
              y: 50,
              scale: 0.9,
              opacity: 0,
              zIndex: items.length - index,
            })
          }
        })

        gsap.to(cardRefs.current, {
          rotation: (i) => getCardStyle(i).rotation,
          scale: (i) => getCardStyle(i).scale,
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'back.out(1.2)',
          onComplete: () => {
            hasLoaded.current = true
          },
        })
      } else {
        items.forEach((_, index) => {
          const el = cardRefs.current[index]
          if (!el) return
          const style = getCardStyle(index)

          gsap.set(el, {
            transformOrigin: `${pivot.x}% ${pivot.y}%`,
            rotation: style.rotation,
            scale: style.scale,
            x: 0,
            y: 0,
            zIndex: style.zIndex,
            opacity: 1,
            overwrite: 'auto',
          })
        })
      }

      const topCard = cardRefs.current[0]
      if (!topCard) return

      const draggable = Draggable.create(topCard, {
        type: 'x,y',
        zIndexBoost: false,
        onPress: function () {
          if (isAnimating.current) {
            this.endDrag()
            return
          }
          // Cancel any in-flight snap-back so the user can re-grab mid-air.
          gsap.killTweensOf(this.target)
        },
        onRelease: function () {
          const dist = Math.sqrt(this.x * this.x + this.y * this.y)
          const THRESHOLD = 60

          if (dist > THRESHOLD) {
            isAnimating.current = true
            const lastIndex = items.length - 1
            const targetStyle = getCardStyle(lastIndex)
            const kickX = this.x * 1.5
            const kickY = this.y * 1.5

            const timeline = gsap.timeline({
              onComplete: () => {
                const newItems = [...items]
                const movedItem = newItems.shift()
                if (movedItem) newItems.push(movedItem)
                setItems(newItems)
                if (onReorder) onReorder(newItems)
                isAnimating.current = false
              },
            })

            timeline
              .to(this.target, {
                x: kickX,
                y: kickY,
                scale: 0.8,
                duration: 0.2,
                ease: 'power1.out',
              })
              .set(this.target, {zIndex: 0})
              .to(this.target, {
                x: 0,
                y: 0,
                rotation: targetStyle.rotation,
                scale: targetStyle.scale,
                duration: 0.5,
                ease: 'back.out(1.2)',
              })

            items.forEach((_, i) => {
              if (i === 0) return
              const el = cardRefs.current[i]
              const nextStyle = getCardStyle(i - 1)
              timeline.to(
                el,
                {
                  rotation: nextStyle.rotation,
                  scale: nextStyle.scale,
                  duration: 0.5,
                  ease: 'power2.out',
                },
                0.15,
              )
            })
          } else {
            gsap.to(this.target, {
              x: 0,
              y: 0,
              duration: 0.4,
              ease: 'back.out(1.5)',
            })
          }
        },
      })[0]

      return () => {
        draggable.kill()
      }
    },
    {dependencies: [items, rotateFactor, scaleFactor, pivot]},
  )

  return (
    <div
      className={cn(
        'relative flex items-center justify-center aspect-[3/4] w-64',
        className,
      )}
    >
      {items.map((item, index) => {
        return (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              'border border-soil/10 bg-cream shadow-[0_18px_50px_rgba(37,36,33,0.22)]',
              'rounded-2xl',
              // FOUC guard: start invisible; GSAP fades in on mount.
              'opacity-0',
              index === 0
                ? 'cursor-grab active:cursor-grabbing'
                : 'pointer-events-none',
            )}
            style={{
              zIndex: items.length - index,
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-2xl select-none pointer-events-none">
              {renderItem(item, index)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
