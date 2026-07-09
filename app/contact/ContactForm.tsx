'use client'

import {useState} from 'react'

const CATEGORIES = [
  'Womenswear', 'Menswear', 'Kidswear', 'Outerwear',
  'Activewear', 'Workwear', 'Denim', 'Knits', 'Woven', 'Accessories', 'Other',
]

const INPUT = 'w-full border-b border-soil/25 bg-transparent py-3 type-small text-charcoal placeholder:text-soil/35 focus:border-soil focus:outline-none transition-colors duration-200'
const LABEL = 'mb-2 block type-eyebrow text-clay'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    // Build mailto link as simple client-side fallback
    const name = data.get('name') as string
    const company = data.get('company') as string
    const email = data.get('email') as string
    const phone = data.get('phone') as string
    const category = data.get('category') as string
    const message = data.get('message') as string

    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category}\n\nMessage:\n${message}`,
    )

    window.location.href = `mailto:amita@credenceasialtd.com?subject=Sourcing%20Enquiry%20from%20${encodeURIComponent(name)}&body=${body}`

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 py-8">
        <div className="h-px w-12 bg-leaf" />
        <h3 className="type-h3 text-charcoal">
          Thank you for your enquiry.
        </h3>
        <p className="type-small text-soil/65">
          Your email client should have opened. If not, please email us directly at{' '}
          <a href="mailto:amita@credenceasialtd.com" className="text-soil underline">
            amita@credenceasialtd.com
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" className={INPUT} />
        </div>
        <div>
          <label htmlFor="company" className={LABEL}>Company</label>
          <input id="company" name="company" type="text" placeholder="Your company" className={INPUT} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <input id="email" name="email" type="email" required placeholder="your@email.com" className={INPUT} />
        </div>
        <div>
          <label htmlFor="phone" className={LABEL}>Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="+1 234 567 8900" className={INPUT} />
        </div>
      </div>

      <div>
        <label htmlFor="category" className={LABEL}>Product Category</label>
        <select id="category" name="category" className={`${INPUT} cursor-pointer`}>
          <option value="">Select a category…</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Share your category, quantity, timeline, and development requirements…"
          className={`${INPUT} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-fit items-center bg-soil px-8 type-label text-ivory transition-colors duration-300 hover:bg-moss disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soil"
      >
        {loading ? 'Opening…' : 'Send Enquiry'}
      </button>

      <p className="type-label text-soil/40">
        Submitting will open your email client. We respond within 2 business days.
      </p>
    </form>
  )
}
