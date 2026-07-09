import Link from 'next/link'

const NAV_LINKS = [
  {label: 'Capabilities', href: '/collection'},
  {label: 'Network',      href: '/about#network'},
  {label: 'Sustainability', href: '/sustainability'},
  {label: 'About',        href: '/about'},
  {label: 'Contact',      href: '/contact'},
]

type Settings = {
  email?: string
  phone?: string
  address?: string
  instagram?: string
  linkedin?: string
  footerText?: string
} | null

export default function Footer({settings}: {settings?: Settings}) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-ivory">

      {/* ── Link columns ── */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-10 border-b border-ivory/8 py-14 md:grid-cols-3 md:gap-8 lg:py-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="mb-4 type-label text-[0.95rem] tracking-[0.12em] text-ivory">
              CREDENCE ASIA
            </p>
            <p className="max-w-[240px] type-small leading-relaxed text-ivory/45">
              {settings?.footerText ?? 'European design intelligence, Asian production scale.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 type-eyebrow text-ivory/30">Pages</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-small text-ivory/55 transition-colors duration-200 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 type-eyebrow text-ivory/30">Contact</p>
            <a
              href="mailto:contact@credenceasialtd.com"
              className="type-small text-ivory/55 transition-colors duration-200 hover:text-ivory"
            >
              contact@credenceasialtd.com
            </a>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-2 py-7 md:flex-row md:items-center md:justify-between">
          <p className="type-label text-ivory/30">
            © {year} Credence Asia Group. All rights reserved.
          </p>
          <p className="type-label text-ivory/20">
            Sourcing · Development · Production
          </p>
        </div>
      </div>

    </footer>
  )
}
