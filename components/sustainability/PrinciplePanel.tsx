import type {LucideIcon} from 'lucide-react'
import {Scale, Compass, Award, Sprout} from 'lucide-react'

type Principle = {
  num: string
  title: string
  Icon: LucideIcon
}

const PRINCIPLES: Principle[] = [
  {num: '01', title: 'Fairness',        Icon: Scale},
  {num: '02', title: 'Responsibility',  Icon: Compass},
  {num: '03', title: 'Lasting Quality', Icon: Award},
  {num: '04', title: 'Sustainability',  Icon: Sprout},
]

export default function PrinciplePanel() {
  return (
    <div
      className="sus2-principles overflow-hidden rounded-sm border border-forest/20"
      role="list"
      aria-label="Our four commitments"
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{gap: '1px', background: 'color-mix(in srgb, var(--color-forest) 20%, transparent)'}}
      >
        {PRINCIPLES.map(({num, title, Icon}) => (
          <div
            key={title}
            role="listitem"
            className="sus2-principle flex items-center gap-3 bg-forest px-5 py-4"
          >
            <span className="w-6 shrink-0 type-eyebrow tabular-nums text-sage/70">
              {num}
            </span>
            <Icon size={14} strokeWidth={1.5} className="shrink-0 text-sage" aria-hidden />
            <span className="type-small font-medium text-ivory">
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
