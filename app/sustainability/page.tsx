import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import {sustainabilityPageQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import SectionHeading from '@/components/shared/SectionHeading'
import CertificateLogoBento from '@/components/shared/CertificateLogoBento'
import AnimateIn from '@/components/shared/AnimateIn'
import {getCertificateLogos} from '@/lib/certificates'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sustainability | Credence Asia Group',
  description:
    'Fairness, Responsibility, Lasting Quality and Sustainability. Our four named commitments and the We Care framework that guides every sourcing and production decision.',
}

const PILLARS = [
  {
    title: 'Fairness',
    body: 'Fairness guides how we choose partners and how we work every day. Our factories follow strong social standards, safe conditions and transparent audits. Everyone involved in your products is treated with dignity, giving you confidence and clarity across the supply chain.',
  },
  {
    title: 'Responsibility',
    body: 'We take responsibility by questioning every choice. Materials, processes and impact. We prioritise lower-impact options that still work commercially and provide clear documentation for informed decisions. Step by step, we help build collections that respect both business and the future.',
  },
  {
    title: 'Lasting Quality',
    body: 'Quality is created through careful development. Fit, testing and detail done right from the start. Our aim is garments customers love, wear often and trust. For our partners this means fewer returns, stronger margins and long-term value.',
  },
  {
    title: 'Sustainability',
    body: 'Sustainability is part of our everyday work. We follow European standards, choose better fibres and shorten supply routes where possible. Our focus is real progress, helping you build collections that are better for business and better for the world.',
  },
]

// PDF page 5 We Care wheel. Three central segments with ten outer commitments.
const WE_CARE_CENTER = [
  {title: 'Supply chain sustainability', body: 'Long-term, traceable supplier relationships across six countries.'},
  {title: 'Engaging our people',         body: 'Welfare, training and community engagement at every facility.'},
  {title: 'Managing our footprint',      body: 'Ethical processes, resource management and sustainable design across the production line.'},
]

const WE_CARE_OUTER = [
  'Human rights',
  'Enhance well-being',
  'Safe workplaces',
  'Engage our communities',
  'Environmental resilience',
  'Attract and develop talent',
  'Ethical processes',
  'Resource Management',
  'Sustainable design',
  'Managing our footprint',
]

// The 11 sustainable fibre and material certifications visible on PDF page 5,
// plus the five social and compliance certifications referenced in the brief.
const FIBER_CERTS = [
  {slug: 'gots',             name: 'GOTS',                full: 'Global Organic Textile Standard'},
  {slug: 'bci',              name: 'BCI',                 full: 'Better Cotton Initiative'},
  {slug: 'grs-100-recycled', name: 'GRS 100% Recycled',   full: 'Global Recycled Standard, 100% Recycled mark'},
  {slug: 'lenzing-viscose',  name: 'LENZING Viscose',     full: 'Lenzing branded viscose fibre'},
  {slug: 'lenzing-ecovero',  name: 'LENZING EcoVero',     full: 'Lenzing eco-responsible viscose'},
  {slug: 'naia-renew',       name: 'Naia Renew',          full: 'Eastman cellulosic fibre with recycled content'},
  {slug: 'repreve',          name: 'REPREVE',             full: 'Recycled fibre from plastic bottles, by Unifi'},
  {slug: 'ocs-blended',      name: 'OCS Blended',         full: 'Organic Content Standard Blended'},
  {slug: 'ocs-100',          name: 'OCS 100',             full: 'Organic Content Standard 100'},
  {slug: 'refibra',          name: 'Refibra',             full: 'Lenzing TENCEL fibre with recycled cotton'},
  {slug: 'global-recycled',  name: 'Global Recycled Std', full: 'Global Recycled Standard, Textile Exchange'},
]

const COMPLIANCE_CERTS = [
  {slug: 'bsci',    name: 'BSCI',     full: 'Business Social Compliance Initiative'},
  {slug: 'sedex',   name: 'Sedex',    full: 'SMETA four-pillar reporting'},
  {slug: 'oekotex', name: 'Oeko-Tex', full: 'Standard 100'},
  {slug: 'wrap',    name: 'WRAP',     full: 'Worldwide Responsible Accredited Production'},
  {slug: 'gmp',     name: 'GMP',      full: 'Good Manufacturing Practice'},
]

const FOUNDER_QUOTE = 'For us, caring means supporting your brand with honesty, clarity and genuine partnership. We consider people, product and planet in every decision. You can trust us to act responsibly and stay by your side from idea to delivery.'

export default async function SustainabilityPage() {
  const [pageData, certificateLogos] = await Promise.all([
    client.fetch(sustainabilityPageQuery).catch(() => null),
    getCertificateLogos(),
  ])

  const heroImage = pageData?.heroImage
    ? urlFor(pageData.heroImage).width(1600).quality(82).url()
    : null

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-40">
        {/* Background photo */}
        <Image
          src="/assets/hero/sus1.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Dark forest scrim for text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-forest/70" />
        {/* Sanity hero image overlay (optional, applied on top if set in CMS) */}
        {heroImage && (
          <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay">
            <Image
              src={heroImage}
              alt=""
              fill
              sizes="100vw"
              unoptimized
              className="object-cover"
            />
          </div>
        )}
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <AnimateIn><p className="type-eyebrow mb-5 text-sage">Sustainability</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="type-hero mb-7 text-ivory">
              Step by step towards a more sustainable future.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mx-auto max-w-xl type-body text-beige/90">
              {pageData?.introText ??
                'Sustainability is not a feature. It is a responsibility embedded in every sourcing and production decision we support.'}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Founder quote */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <AnimateIn>
            <figure>
              <blockquote className="type-quote text-charcoal/90">
                {`"${FOUNDER_QUOTE}"`}
              </blockquote>
              <figcaption className="type-eyebrow mt-6 text-clay">
                From the founders
              </figcaption>
            </figure>
          </AnimateIn>
        </div>
      </section>

      {/* Four named pillars */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Our four commitments"
            title="Fairness, Responsibility, Lasting Quality, Sustainability."
            subtitle="The four pillars that guide every sourcing and production decision we make."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-px bg-beige/40 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <AnimateIn key={p.title} delay={(i % 2) * 0.1} className="bg-ivory p-8 transition-colors duration-300 hover:bg-cream md:p-10">
                <span className="type-eyebrow mb-6 block text-moss">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="type-h3 mb-5 text-charcoal">
                  {p.title}
                </h3>
                <p className="type-small text-charcoal/80">
                  {p.body}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* We Care framework */}
      <section
        className="py-24 md:py-36"
        style={{background: 'var(--color-celadon)'}}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="The We Care framework"
            title="Three pillars, ten commitments."
            subtitle="Our framework for putting people, supply chain and planet at the centre of every decision."
            className="mb-16"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {WE_CARE_CENTER.map((c, i) => (
              <AnimateIn key={c.title} delay={i * 0.1} className="h-full">
                <article
                  className="flex h-full flex-col gap-3 border border-forest/15 bg-forest/5 p-7 transition-colors duration-300 hover:bg-forest/10"
                >
                  <h3 className="type-h3 text-forest">
                    {c.title}
                  </h3>
                  <p className="type-small text-forest/80">
                    {c.body}
                  </p>
                </article>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-12 border-t border-forest/15 pt-10">
            <p className="type-eyebrow mb-5 text-forest/70">
              Ten commitments arranged around the framework
            </p>
            <div className="flex flex-wrap gap-2">
              {WE_CARE_OUTER.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center border border-forest/30 bg-forest/5 px-4 py-2 type-label text-forest/85"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable fibre certifications */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Sustainable fibres and materials"
            title="Certification standards we work with."
            subtitle="On request we develop programmes using certified organic, recycled and lower-impact fibres."
            className="mb-16"
          />
          {certificateLogos.length > 0 ? (
            <CertificateLogoBento logos={certificateLogos} />
          ) : (
            <div className="grid grid-cols-2 gap-px bg-beige/40 sm:grid-cols-3 lg:grid-cols-4">
              {FIBER_CERTS.map((c) => (
                <div
                  key={c.slug}
                  className="group flex min-h-[180px] flex-col items-center justify-center gap-3 bg-ivory px-8 py-10 text-center transition-colors duration-300 hover:bg-cream"
                >
                  <p className="font-serif text-xl font-semibold leading-tight text-charcoal transition-transform duration-300 group-hover:scale-105">
                    {c.name}
                  </p>
                  <p className="type-eyebrow leading-normal text-charcoal/45">
                    {c.full}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Social and compliance certifications */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            eyebrow="Social and compliance"
            title="Five standards in place across our factories."
            className="mb-12"
          />
          <div className="grid grid-cols-2 gap-px bg-charcoal/10 sm:grid-cols-3 md:grid-cols-5">
            {COMPLIANCE_CERTS.map((c) => (
              <div
                key={c.slug}
                className="group flex min-h-[180px] flex-col items-center justify-center gap-3 bg-charcoal px-8 py-10 text-center transition-colors duration-300 hover:bg-forest"
              >
                <p className="font-serif text-2xl font-semibold leading-tight text-ivory transition-transform duration-300 group-hover:scale-105">
                  {c.name}
                </p>
                <p className="type-eyebrow leading-normal text-ivory/45">
                  {c.full}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-moss/20 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <AnimateIn>
            <h2 className="type-h2 mb-6 text-charcoal">
              {pageData?.ctaTitle ?? 'Building a more responsible supply chain together.'}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.12}>
            <p className="mb-10 type-body text-charcoal/80">
              {pageData?.ctaText ??
                'Contact our team to discuss sourcing decisions aligned with your sustainability commitments.'}
            </p>
          </AnimateIn>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center bg-forest px-8 type-label text-ivory transition-all duration-300 hover:bg-moss"
          >
            Contact our team
          </Link>
        </div>
      </section>
    </main>
  )
}
