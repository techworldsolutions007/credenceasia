import GalleryImage from './GalleryImage'
import GalleryColumn from './GalleryColumn'

const SMALL_SIZES = '(max-width: 768px) 45vw, (max-width: 1360px) 22vw, 270px'
const LARGE_SIZES = '(max-width: 768px) 55vw, (max-width: 1360px) 32vw, 400px'

const MASK = 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)'

export default function AboutMediaGallery() {
  return (
    <div
      className="relative"
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >

      {/* ── Mobile / tablet: 2-column stagger ── */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        <div className="flex flex-col gap-3">
          <GalleryImage
            src="/assets/office/page016_206_0.jpeg"
            alt="Garment development and sewing workspace with production staff"
            aspectRatio="3/4"
            sizes={LARGE_SIZES}
            priority
          />
          <GalleryImage
            src="/assets/office/page014_189_0.jpeg"
            alt="Garment workers sewing inside an apparel production workshop"
            aspectRatio="4/5"
            sizes={SMALL_SIZES}
          />
          <GalleryImage
            src="/assets/office/page014_192_0.jpeg"
            alt="Modern apparel showroom and product-development workspace"
            aspectRatio="1/1"
            sizes={SMALL_SIZES}
          />
        </div>
        <div className="flex flex-col gap-3 pt-8">
          <GalleryImage
            src="/assets/office/page014_191_0.jpeg"
            alt="Technical apparel team working at computer workstations"
            aspectRatio="4/3"
            sizes={SMALL_SIZES}
          />
          <GalleryImage
            src="/assets/office/page016_203_0.jpeg"
            alt="Garment workers handling bright fabric pieces around a production table"
            aspectRatio="3/2"
            sizes={LARGE_SIZES}
          />
          <GalleryImage
            src="/assets/office/page016_204_0.jpeg"
            alt="Active apparel sewing floor with production teams and machinery"
            aspectRatio="4/3"
            sizes={SMALL_SIZES}
          />
        </div>
      </div>

      {/* ── Desktop: 3-column masonry ── */}
      <div
        className="hidden gap-3 lg:grid"
        style={{gridTemplateColumns: '28fr 40fr 32fr'}}
      >
        <GalleryColumn className="wwa2-col-1">
          <GalleryImage
            src="/assets/office/page014_189_0.jpeg"
            alt="Garment workers sewing inside an apparel production workshop"
            aspectRatio="4/5"
            sizes={SMALL_SIZES}
          />
          <GalleryImage
            src="/assets/office/page014_191_0.jpeg"
            alt="Technical apparel team working at computer workstations"
            aspectRatio="4/3"
            sizes={SMALL_SIZES}
          />
        </GalleryColumn>

        <GalleryColumn className="wwa2-col-2" style={{paddingTop: '4rem'}}>
          <GalleryImage
            src="/assets/office/page016_206_0.jpeg"
            alt="Garment development and sewing workspace with production staff and digital equipment"
            aspectRatio="3/4"
            sizes={LARGE_SIZES}
            priority
          />
          <GalleryImage
            src="/assets/office/page016_203_0.jpeg"
            alt="Garment workers handling bright fabric pieces around a production table"
            aspectRatio="3/2"
            sizes={LARGE_SIZES}
          />
        </GalleryColumn>

        <GalleryColumn className="wwa2-col-3" style={{paddingTop: '2rem'}}>
          <GalleryImage
            src="/assets/office/page014_192_0.jpeg"
            alt="Modern apparel showroom and product-development workspace"
            aspectRatio="1/1"
            sizes={SMALL_SIZES}
          />
          <GalleryImage
            src="/assets/office/page016_204_0.jpeg"
            alt="Active apparel sewing floor with production teams and machinery"
            aspectRatio="4/3"
            sizes={SMALL_SIZES}
          />
        </GalleryColumn>
      </div>

    </div>
  )
}
