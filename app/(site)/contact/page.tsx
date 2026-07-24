import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {contactPageQuery} from '@/sanity/lib/queries'
import ContactForm from './ContactForm'
import AnimateIn from '@/components/shared/AnimateIn'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact | Credence Asia Group',
  description:
    'Contact Credence Asia Group. Operational hub in Hong Kong and design hub in Copenhagen, one team handling sourcing, product development and production.',
}

const OFFICE_ADDRESS = 'Unit 608, 8/F, Hope Sea Industrial Centre\n26 Lam Hing Street, Kowloon Bay\nKowloon, Hong Kong'
const OFFICE_PHONE   = '+852 2650 0058'
const OFFICE_PHONE_HREF = '+85226500058'

const MAP_QUERY = encodeURIComponent('Hope Sea Industrial Centre, 26 Lam Hing Street, Kowloon Bay, Hong Kong')
const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`
const MAP_LINK  = `https://maps.google.com/?q=${MAP_QUERY}`

export default async function ContactPage() {
  const data = await client.fetch(contactPageQuery).catch(() => null)

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-32"
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
          <AnimateIn><p className="type-eyebrow mb-5 text-soil/70">Contact us</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="type-hero mb-7 text-charcoal">
              {data?.title ?? 'Brief our team.'}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mx-auto max-w-lg type-body text-charcoal/80">
              {data?.introText ??
                'Share your sourcing, product development or production requirements.'}
            </p>
            <p className="mt-3 type-label text-soil/70">
              We reply within 2 business days
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Enquiry form + map */}
      <section className="bg-cream py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-[5fr_6fr] md:gap-20 md:px-10">
          <div>
            <AnimateIn>
              <p className="type-eyebrow mb-6 text-clay">Send an enquiry</p>
              <h2 className="type-h2 mb-8 text-charcoal">
                Brief us on your program.
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.1}><ContactForm /></AnimateIn>
          </div>

          <div className="flex flex-col gap-8">
            {/* Contact info — no names */}
            <AnimateIn>
              <div className="border-l-2 border-clay/30 pl-6 flex flex-col gap-4">
                <p className="type-eyebrow text-clay">Get in touch</p>
                <a
                  href="mailto:contact@credenceasialtd.com"
                  className="type-small text-charcoal/80 transition-colors hover:text-soil"
                >
                  contact@credenceasialtd.com
                </a>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+85261005224"
                    className="type-small text-charcoal/80 transition-colors hover:text-soil"
                  >
                    +852 6100 5224
                  </a>
                  <a
                    href="tel:+85292854595"
                    className="type-small text-charcoal/80 transition-colors hover:text-soil"
                  >
                    +852 9285 4595
                  </a>
                </div>
              </div>
            </AnimateIn>

            {/* Office locations */}
            <div className="grid grid-cols-1 gap-px bg-beige/40 sm:grid-cols-2">
              <div className="bg-cream p-6">
                <p className="type-eyebrow mb-3 text-clay">Hong Kong</p>
                <p className="type-label mb-1 text-charcoal">Operational Hub</p>
                <p className="whitespace-pre-line type-small text-charcoal/70">
                  {data?.address ?? OFFICE_ADDRESS}
                </p>
                <a
                  href={`tel:${OFFICE_PHONE_HREF}`}
                  className="mt-3 inline-block type-small text-charcoal/70 transition-colors hover:text-soil"
                >
                  {data?.phone ?? OFFICE_PHONE}
                </a>
              </div>
              <div className="bg-cream p-6">
                <p className="type-eyebrow mb-3 text-clay">Copenhagen</p>
                <p className="type-label mb-1 text-charcoal">Design Hub</p>
                <p className="type-small text-charcoal/70">Denmark</p>
                <p className="mt-3 type-small text-charcoal/70">
                  Colour, print, trend direction and range planning.
                </p>
              </div>
            </div>

            <div className="aspect-[4/3] overflow-hidden border border-beige/60">
              <iframe
                src={MAP_EMBED}
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Credence Asia office, Kowloon Bay, Hong Kong"
              />
            </div>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start type-label text-clay underline-offset-4 hover:underline"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Business note */}
      <section className="bg-forest py-16">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="type-body text-beige/90">
            We work with brands, retailers and sourcing teams on apparel product
            development, manufacturing coordination, quality control and delivery
            logistics. If you have a brief, timeline or category in mind, share it
            and our team will get back to you within two business days.
          </p>
        </div>
      </section>
    </main>
  )
}
