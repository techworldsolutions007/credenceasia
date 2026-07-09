import {readdir} from 'node:fs/promises'
import path from 'node:path'

export type CertificateLogo = {
  name: string
  src: string
}

const IMAGE_EXTENSIONS = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp'])

const CERTIFICATE_DIRS = [
  {
    filesystemPath: path.join(process.cwd(), 'public', 'assets', 'certificates'),
    publicPath: '/assets/certificates',
  },
  {
    filesystemPath: path.join(process.cwd(), 'public', 'assets', 'logos', 'certificates'),
    publicPath: '/assets/logos/certificates',
  },
  {
    filesystemPath: path.join(process.cwd(), 'public', 'assets', 'certifications'),
    publicPath: '/assets/certifications',
  },
]

const CERTIFICATE_NAME_OVERRIDES: Record<string, string> = {
  // Numeric filenames (30–37)
  '30': 'BCI — Better Cotton Initiative',
  '31': 'REPREVE',
  '32': 'Global Recycled Standard',
  '33': 'Refibra — Reborn TENCEL Fiber',
  '34': 'LENZING EcoVero',
  '35': 'Naia Renew',
  '36': 'Organic Blended Content Standard',
  '37': 'Organic 100 Content Standard',
  // Named filenames
  bci: 'BCI',
  'better-cotton': 'BCI',
  'better-cotton-initiative': 'BCI',
  ecovero: 'EcoVero',
  'eco-vero': 'EcoVero',
  'lenzing-ecovero': 'LENZING EcoVero',
  gots: 'GOTS',
  grs: 'GRS',
  'global-recycled': 'Global Recycled Standard',
  'global-recycled-standard': 'Global Recycled Standard',
  'naia-renew': 'Naia Renew',
  'ocs-100': 'OCS 100',
  'organic-100': 'Organic 100 Content Standard',
  'organic-blended': 'Organic Blended Content Standard',
  refibra: 'REFIBRA',
  repreve: 'REPREVE',
}

const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'})

function toLabel(filename: string) {
  const parsed = path.parse(filename)
  const normalized = parsed.name
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  if (CERTIFICATE_NAME_OVERRIDES[normalized]) return CERTIFICATE_NAME_OVERRIDES[normalized]
  if (/^\d+$/.test(normalized)) return `Certification ${normalized}`

  return normalized
    .split('-')
    .filter(Boolean)
    .map((part) => part.toUpperCase() === part ? part : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export async function getCertificateLogos(): Promise<CertificateLogo[]> {
  for (const directory of CERTIFICATE_DIRS) {
    try {
      const entries = await readdir(directory.filesystemPath, {withFileTypes: true})
      const files = entries
        .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
        .map((entry) => entry.name)
        .sort((a, b) => collator.compare(a, b))

      if (files.length > 0) {
        return files.map((file) => ({
          name: toLabel(file),
          src: `${directory.publicPath}/${encodeURIComponent(file)}`,
        }))
      }
    } catch {
      // The folder is optional; keep checking the configured fallbacks.
    }
  }

  return []
}
