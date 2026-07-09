export default function CollectionCTA() {
  return (
    <section id="enquiry" className="bg-[#f0ebe2] py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="border border-stone-300 p-10 md:p-20">
          <div className="max-w-2xl">
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-stone-400">
              Work With Credence Asia
            </p>
            <h2 className="mb-6 text-3xl font-light leading-[1.06] tracking-[-0.02em] text-stone-900 md:text-[3rem]">
              Looking to develop your next apparel range?
            </h2>
            <p className="mb-10 max-w-lg text-base leading-[1.85] text-stone-500">
              Share your category, quantity, timeline, and sourcing requirements. Our team
              can help align product development with the right production network.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a
                href="mailto:info@credenceasia.com"
                className="inline-flex h-12 items-center bg-stone-900 px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f9f6f0] transition-colors duration-300 hover:bg-stone-700"
              >
                Start an Enquiry
              </a>
              <a
                href="/contact"
                className="inline-flex h-12 items-center border border-stone-400 px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-700 transition-all duration-300 hover:border-stone-900 hover:text-stone-900"
              >
                Contact Credence Asia
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
