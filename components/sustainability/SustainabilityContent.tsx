import {ShimmerButton} from '@/components/ui/shimmer-button'
import PrinciplePanel from './PrinciplePanel'

const QUOTE =
  'For us, caring means supporting your brand with honesty, clarity and genuine partnership. We consider people, product and planet in every decision. You can trust us to act responsibly and stay by your side from idea to delivery.'

export default function SustainabilityContent() {
  return (
    <div className="flex flex-col gap-5 lg:justify-center">

      <p className="sus2-eyebrow type-eyebrow text-forest/60">
        Credence Asia Group
      </p>

      <div>
        <h2 className="sus2-heading type-h2 max-w-[560px] text-forest" style={{lineHeight: '1.05'}}>
          We Care
        </h2>
        <div aria-hidden className="sus2-rule mt-5 h-px w-14 origin-left bg-forest/40" />
      </div>

      <p className="sus2-quote type-small max-w-[540px] text-charcoal/65">
        {QUOTE}
      </p>

      <PrinciplePanel />

      <div>
        <ShimmerButton href="/sustainability" variant="primary">
          <span className="flex items-center gap-2">
            Our Approach
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              {'→'}
            </span>
          </span>
        </ShimmerButton>
      </div>

    </div>
  )
}
