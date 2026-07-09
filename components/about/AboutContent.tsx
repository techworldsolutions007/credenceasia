import {ShimmerButton} from '@/components/ui/shimmer-button'
import AboutMetadata from './AboutMetadata'

const DEFAULT_PARAGRAPH =
  'Founded in 2016 in Hong Kong, Credence Asia Group links European and American design and market knowledge with disciplined Asian manufacturing across Bangladesh, India, China, Vietnam, Cambodia and Myanmar.'

type Props = {
  paragraph?: string
}

export default function AboutContent({paragraph = DEFAULT_PARAGRAPH}: Props) {
  return (
    <div className="wwa2-content flex flex-col gap-6 lg:justify-center">

      <p className="type-eyebrow mb-1 text-charcoal/45">
        Who We Are
      </p>

      <div>
        <h2 className="type-hero text-charcoal" style={{lineHeight: '0.92'}}>
          <span className="font-light text-charcoal/55">{'Built for'}</span>
          {' '}{'sourcing'}
          <br />
          {'teams.'}
        </h2>
        <div aria-hidden className="mt-5 h-px w-14 origin-left bg-charcoal/20" />
      </div>

      <p className="max-w-[46ch] text-[1.0625rem] leading-[1.75] text-charcoal/70">
        {paragraph}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <ShimmerButton href="/about" variant="dark">
          {'About Us'}
        </ShimmerButton>
      </div>

      <AboutMetadata />

    </div>
  )
}
