export type CustomerCategory = 'Fashion' | 'Premium Denim' | 'Workwear' | 'Industrial Uniform' | 'Retail' | 'Kidswear'

export type CustomerBrand = {
  slug: string
  name: string
  domain: string
  category: CustomerCategory
  region: 'Europe' | 'Americas' | 'Asia' | 'Global'
}

// All 25 brands surfaced on PDF page 17.
// `domain` is used by the optional logo download script and as the
// outbound link target. `category` powers the customer page grouping.
export const CUSTOMER_BRANDS: CustomerBrand[] = [
  {slug: 'liberte-essentiel', name: 'Liberte Essentiel',     domain: 'liberte-essentiel.com', category: 'Fashion',           region: 'Europe'},
  {slug: 'cocouture',         name: "co'couture",            domain: 'cocouture.com',         category: 'Fashion',           region: 'Europe'},
  {slug: 'rosemunde',         name: 'rosemunde Copenhagen',  domain: 'rosemunde.com',         category: 'Fashion',           region: 'Europe'},
  {slug: 'freequent',         name: 'FREE/QUENT',            domain: 'freequent.com',         category: 'Fashion',           region: 'Europe'},
  {slug: 'neo-noir',          name: 'NEO NOIR',              domain: 'neonoir.com',           category: 'Fashion',           region: 'Europe'},
  {slug: 'coverstory',        name: 'COVERSTORY',            domain: 'coverstory.co.in',      category: 'Fashion',           region: 'Asia'},
  {slug: 'mufti',             name: 'MUFTI',                 domain: 'muftijeans.in',         category: 'Fashion',           region: 'Asia'},
  {slug: 'madame',            name: 'madame',                domain: 'madame.in',             category: 'Fashion',           region: 'Asia'},
  {slug: 'balilab',           name: 'BALILAB',               domain: 'balilab.com',           category: 'Fashion',           region: 'Asia'},
  {slug: 'mavi',              name: 'mavi',                  domain: 'mavi.com',              category: 'Premium Denim',     region: 'Global'},
  {slug: '7-for-all-mankind', name: '7 For All Mankind',     domain: '7forallmankind.com',    category: 'Premium Denim',     region: 'Global'},
  {slug: 'us-polo-assn',      name: 'U.S. Polo Assn.',       domain: 'uspoloassn.com',        category: 'Fashion',           region: 'Global'},
  {slug: 'tillys',            name: "Tilly's",               domain: 'tillys.com',            category: 'Retail',            region: 'Americas'},
  {slug: 'tjx',               name: 'TJX',                   domain: 'tjx.com',               category: 'Retail',            region: 'Americas'},
  {slug: 'walmart',           name: 'Walmart',               domain: 'walmart.com',           category: 'Retail',            region: 'Americas'},
  {slug: 'sanetta',           name: 'Sanetta',               domain: 'sanetta.de',            category: 'Kidswear',          region: 'Europe'},
  {slug: 'herff-jones',       name: 'Herff Jones',           domain: 'herffjones.com',        category: 'Workwear',          region: 'Americas'},
  {slug: 'bass-pro-shops',    name: 'Bass Pro Shops',        domain: 'basspro.com',           category: 'Workwear',          region: 'Americas'},
  {slug: 'bmw',               name: 'BMW',                   domain: 'bmw.com',               category: 'Industrial Uniform', region: 'Europe'},
  {slug: 'audi',              name: 'Audi',                  domain: 'audi.com',              category: 'Industrial Uniform', region: 'Europe'},
  {slug: 'vw',                name: 'Volkswagen',            domain: 'vw.com',                category: 'Industrial Uniform', region: 'Europe'},
  {slug: 'ktm',               name: 'KTM',                   domain: 'ktm.com',               category: 'Industrial Uniform', region: 'Europe'},
  {slug: 'stihl',             name: 'STIHL',                 domain: 'stihl.com',             category: 'Industrial Uniform', region: 'Europe'},
  {slug: 'hilti',             name: 'HILTI',                 domain: 'hilti.com',             category: 'Industrial Uniform', region: 'Europe'},
  {slug: 'claas',             name: 'CLAAS',                 domain: 'claas.com',             category: 'Industrial Uniform', region: 'Europe'},
]

export const CUSTOMER_CATEGORIES: CustomerCategory[] = [
  'Fashion',
  'Premium Denim',
  'Retail',
  'Kidswear',
  'Workwear',
  'Industrial Uniform',
]

export function groupByCategory(brands: CustomerBrand[]) {
  const out: Record<string, CustomerBrand[]> = {}
  for (const cat of CUSTOMER_CATEGORIES) out[cat] = []
  for (const b of brands) out[b.category].push(b)
  return out
}
