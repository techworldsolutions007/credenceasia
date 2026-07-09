import type {Metadata} from 'next'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import {aboutPageQuery} from '@/sanity/lib/queries'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimateIn from '@/components/shared/AnimateIn'
import AboutFeatureGrid from '@/components/about/AboutFeatureGrid'
import AboutHero from '@/components/about/AboutHero'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About | Credence Asia Group',
  description:
    'Founded in 2016 in Hong Kong, Credence Asia Group links European and American design and market knowledge with Asian manufacturing. Conscious quality and value through design.',
}

const OFFER = [
  {title: 'Design & Research',      body: 'Colour, print, graphics, silhouette and washing research from Copenhagen, Denmark. Brand and customer-specific range planning.'},
  {title: 'Sampling & Prototyping', body: 'In-house sample rooms with first prototypes produced in days to accelerate line planning and design sign-off.'},
  {title: 'Sourcing & Scale',       body: 'Fabric libraries and supplier access, target-price engineering without compromising design or quality. MOQs that flex from first sample to full bulk, scaled to seasonality and channel.'},
  {title: 'Manufacturing Presence', body: 'Across Bangladesh, China, Cambodia, Myanmar and Vietnam. Deep experience across knits, woven, denim, outerwear, activewear, sportswear and workwear.'},
  {title: 'Compliance & Quality',   body: 'BSCI, Sedex, Oeko-Tex, WRAP and GMP built into every production pathway. Individual QC per plant — daily in-line audits and AQL 1.5–2.5 across all facilities.'},
  {title: 'Logistics',              body: 'Freight planning and multi-term options including FOB, CIF, DAP and DDP to suit your delivery and commercial requirements.'},
]

const MANUFACTURING = [
  {
    location: 'Bangladesh',
    detail: 'Woven and Knits, Tops and Bottoms',
    specs: [
      'Compliant custom bonded facility',
      '2 manufacturing units',
      '36 production lines',
      '3,000 machines',
      '3,700 employees',
      '1 million pcs per month',
      'In-house embroidery and washing plant',
    ],
  },
  {
    location: 'China',
    detail: 'Jackets and Workwear',
    specs: [
      'Compliant facility',
      '200 machines',
      '400 workers',
      '1 million pcs per year',
      'Materials and trim sourcing',
    ],
  },
  {
    location: 'India',
    detail: 'Activewear and Beachwear',
    specs: [
      'Activewear, tops, blouses and coordinates',
      'Beachwear and cover-ups',
      '350+ machines',
      '1.2 million pcs yearly capacity',
    ],
  },
  {
    location: 'Cambodia',
    detail: 'Casualwear and Uniforms',
    specs: [
      'Long-standing partner factories',
      'Casual and uniform-grade garments',
      'Audited and compliant facilities',
    ],
  },
]

const VALUES = [
  {title: 'Ethical business',    body: 'Strong social standards, safe conditions and transparent audits at every partner factory.'},
  {title: 'Quality without compromise', body: 'Fit, testing and detail done right from the start. Garments customers love and trust.'},
  {title: 'Honest pricing',      body: 'Target-price engineering without hidden margins. Cost clarity from sample through bulk.'},
  {title: 'Long-term partnerships', body: 'Grounded in transparency and traceability. We invest in relationships, not transactions.'},
]

const HERITAGE_QUOTE = 'We develop and create products that work for real customers and real business needs. It begins with the proven principles of good fit and trusted quality. Then we refine, questioning how each detail can support stronger sell-through. The result is commercial clarity with a subtle twist that lifts the everyday. Because when design and business align, collections perform.'

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery).catch(() => null)

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">

      {/* Hero — Silk Animation */}
      <AboutHero title={data?.title} introText={data?.introText} />

      {/* About company — feature grid */}
      <AboutFeatureGrid />

      {/* Heritage and values */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Heritage and values"
            title="Two hubs, one standard."
            className="mb-12"
          />

          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[5fr_4fr] md:gap-20">
            <div>
              <AnimateIn className="flex flex-col gap-5 type-body text-charcoal/85">
                <p>
                  Design and research from Copenhagen, production coordination from Hong Kong —
                  a two-hub model founded in 2016 that pairs European market knowledge with
                  disciplined Asian manufacturing.
                </p>
                <p>
                  Long-standing supply-chain execution with a network of trusted factories across
                  China, Bangladesh, Cambodia, Myanmar and Vietnam, supported by design and
                  research in Copenhagen, Denmark.
                </p>
                <p>
                  Our shared values are constant: ethical business, quality without compromise,
                  honest pricing, and long-term partnerships grounded in transparency and
                  traceability.
                </p>
              </AnimateIn>

              <div className="mt-10 grid grid-cols-1 gap-px bg-beige/40 sm:grid-cols-2">
                {VALUES.map((v, i) => (
                  <AnimateIn key={v.title} delay={(i % 2) * 0.1} className="bg-ivory p-6">
                    <h3 className="type-label mb-2 text-soil">
                      {v.title}
                    </h3>
                    <p className="type-small text-charcoal/80">{v.body}</p>
                  </AnimateIn>
                ))}
              </div>
            </div>

            <AnimateIn delay={0.1}>
              <figure className="border-l-2 border-soil/40 pl-6">
                <blockquote className="type-quote text-charcoal/85">
                  {`"${HERITAGE_QUOTE}"`}
                </blockquote>
                <figcaption className="type-eyebrow mt-4 text-clay">
                  From the founders
                </figcaption>
              </figure>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* What we offer, 10 capabilities */}
      <section className="bg-cream py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="What we offer"
            title="A complete development and production pathway."
            subtitle="We stay grounded in the fundamentals, so your creative vision has a reliable foundation."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-px bg-beige/50 md:grid-cols-2 lg:grid-cols-3">
            {OFFER.map((item, i) => (
              <AnimateIn key={item.title} delay={(i % 3) * 0.08} className="bg-cream p-8 transition-colors duration-300 hover:bg-beige/30 md:p-10">
                <span className="type-eyebrow mb-5 block text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="type-h3 mb-4 text-charcoal">{item.title}</h3>
                <p className="type-small text-charcoal/80">{item.body}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing facilities */}
      <section id="network" className="bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Manufacturing facilities"
              title="Scale up or down, small to large orders."
            />
            <p className="max-w-xs type-small text-charcoal/80 md:text-right">
              Factory expertise across outerwear, casual, sportswear, workwear, knits,
              denim and activewear.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-beige/40 md:grid-cols-2">
            {MANUFACTURING.map((m, i) => (
              <AnimateIn key={m.location} delay={i * 0.1} className="bg-ivory p-8 transition-colors duration-300 hover:bg-cream md:p-10">
                <p className="type-eyebrow mb-1 text-clay">{m.detail}</p>
                <h3 className="type-h3 mb-6 text-charcoal">{m.location}</h3>
                <ul className="flex flex-col gap-2">
                  {m.specs.map((spec, j) => (
                    <li key={j} className="flex items-start gap-3 type-small text-charcoal/80">
                      <span className="mt-2 h-px w-4 shrink-0 bg-leaf" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-beige pt-6">
            <p className="type-eyebrow text-clay">Also present in</p>
            {['Myanmar', 'Vietnam'].map((c) => (
              <span key={c} className="border border-beige px-4 py-1 type-label text-charcoal/75">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <AnimateIn>
            <h2 className="type-h2 mb-6 text-ivory">
              {data?.ctaTitle ?? 'Ready to work with us?'}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.12}>
            <p className="mb-10 type-body text-beige/90">
              {data?.ctaText ??
                'Share your category, quantity, timeline and sourcing requirements. Our team will help build the right production pathway for your brand.'}
            </p>
          </AnimateIn>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center bg-ivory px-8 type-label text-forest transition-all duration-300 hover:bg-cream"
          >
            Contact our team
          </Link>
        </div>
      </section>
    </main>
  )
}
