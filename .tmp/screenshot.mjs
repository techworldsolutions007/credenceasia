import {chromium} from 'playwright'

const url = process.argv[2] || 'http://localhost:3000'
const out = process.argv[3] || './hero.png'
const width = parseInt(process.argv[4] || '1440', 10)
const height = parseInt(process.argv[5] || '900', 10)
const hoverSelector = process.argv[6] || ''

const browser = await chromium.launch()
const ctx = await browser.newContext({viewport: {width, height}, deviceScaleFactor: 1})
const page = await ctx.newPage()
await page.goto(url, {waitUntil: 'networkidle', timeout: 30000})
// Wait for the PageLoader (charcoal full-screen overlay, ~5s) to lift + GSAP hero timeline (~2.5s).
await page.waitForTimeout(7500)

if (hoverSelector) {
  const el = await page.$(hoverSelector)
  if (el) {
    await el.hover()
    await page.waitForTimeout(900) // let the 700ms transition complete
  }
}

await page.screenshot({path: out, fullPage: false})
await browser.close()
console.log('OK', out)
