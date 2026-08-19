import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import CollectionView from '@/components/collection/CollectionView'
import type {GridImage, DenimGridProps} from '@/components/DenimGrid'

export const revalidate = 60

const PRODUCTS_QUERY = `
  *[_type == "product" && defined(image.asset)] | order(order asc, name asc) {
    _id,
    category,
    "aspect": image.asset->metadata.dimensions.aspectRatio,
    "lqip":   image.asset->metadata.lqip,
    image
  }
`

const CATEGORIES_QUERY = `
  *[_type == "productCategory"] | order(order asc) {
    "name":       name,
    "heading":    coalesce(sectionHeading, name),
    "slug":       slug.current,
    "background": coalesce(background, "ivory"),
    "order":      coalesce(order, 9999)
  }
`

const DENIM_GRID_QUERY = `
  *[_type == "denimGrid" && published != false] | order(coalesce(order, 9999) asc, _updatedAt desc) {
    _id, title, layout, order,
    images[] {
      _key, alt,
      "lqip": image.asset->metadata.lqip,
      image
    }
  }
`

type RawProduct = {
  _id: string
  category: string | null
  aspect: number | null
  lqip: string | null
  image: unknown
}

type CategorySetting = {
  name: string | null
  heading: string | null
  slug: string | null
  background: string
  order: number
}

export type DenimGridDoc = {
  _id: string
  title?: string | null
  layout: DenimGridProps['layout']
  order?: number | null
  images: GridImage[]
}

const BG_CYCLE = ['ivory', 'cream', 'celadon', 'mist'] as const

export const metadata: Metadata = {
  title: 'Collection | Credence Asia Group',
  description:
    'Women, Men and Kids collections. Tops and Bottoms in Woven, Knits and Denim. Outerwear including seam-sealed, fleece, soft shell, complex washes and garment dye.',
}

export default async function CollectionPage() {
  const [products, catSettings, grids] = await Promise.all([
    client
      .fetch<RawProduct[]>(PRODUCTS_QUERY, {}, {next: {revalidate: 60}})
      .catch(() => [] as RawProduct[]),
    client
      .fetch<CategorySetting[]>(CATEGORIES_QUERY, {}, {next: {revalidate: 60}})
      .catch(() => [] as CategorySetting[]),
    client
      .fetch<DenimGridDoc[]>(DENIM_GRID_QUERY, {}, {next: {revalidate: 60}})
      .catch(() => [] as DenimGridDoc[]),
  ])

  const productsByKey = new Map<string, RawProduct[]>()
  const uncategorized: RawProduct[] = []
  for (const p of products) {
    if (!p.category) { uncategorized.push(p); continue }
    const key = p.category.toLowerCase()
    if (!productsByKey.has(key)) productsByKey.set(key, [])
    productsByKey.get(key)!.push(p)
  }

  const claimed = new Set<string>()

  const primary = catSettings
    .filter((s) => s.name)
    .map((s, idx) => {
      const key = s.name!.toLowerCase()
      claimed.add(key)
      return {
        _id: s.name!,
        title: s.heading ?? s.name!,
        slug: s.slug ?? key.replace(/\s+/g, '-'),
        background: s.background,
        products: productsByKey.get(key) ?? [],
        _order: s.order ?? idx,
      }
    })
    .sort((a, b) => a._order - b._order)

  const extras = Array.from(productsByKey.entries())
    .filter(([key]) => !claimed.has(key))
    .map(([key, prods], idx) => ({
      _id: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      slug: key.replace(/\s+/g, '-'),
      background: BG_CYCLE[(primary.length + idx) % BG_CYCLE.length],
      products: prods,
      _order: 9999 + idx,
    }))

  const categories = [...primary, ...extras]
    .filter((cat) => cat.products.length > 0)
    .map(({_order, ...cat}) => cat)

  if (uncategorized.length > 0) {
    categories.push({
      _id: '__uncategorized__',
      title: 'Other',
      slug: 'other',
      background: BG_CYCLE[(primary.length + extras.length) % BG_CYCLE.length],
      products: uncategorized,
    })
  }

  return <CollectionView categories={categories} grids={grids} />
}
