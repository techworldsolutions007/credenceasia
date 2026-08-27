import type {Metadata} from 'next'
import AnimateIn from '@/components/shared/AnimateIn'
import LookbookGrid from '@/components/lookbook/LookbookGrid'

export const metadata: Metadata = {
  title: 'Lookbook | Credence Asia Group',
  description: 'Browse our collection lookbook — outerwear, knitwear, denim, activewear and more from Credence Asia.',
}

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] pt-[68px]">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{background: 'linear-gradient(200deg, var(--color-mist) 0%, var(--color-haze) 50%, var(--color-ivory) 100%)'}}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(83,99,126,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <AnimateIn>
            <p className="type-eyebrow mb-5 text-soil/70">Lookbook</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="type-hero mb-6 text-charcoal">Collection Preview</h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mx-auto max-w-md type-body text-charcoal/65">
              A curated selection of styles across our core categories.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#f4f1ea] pb-24">
        <LookbookGrid />
      </section>
    </main>
  )
}
