import { useRef } from 'react'
import ServiceCarousel from './ServiceCarousel'

const ServicesSection = () => {
  const carouselRef = useRef<any>(null);

  return (
    <section className="services-section section-primary">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-carousel-wrapper">
          <button onClick={() => carouselRef.current?.prev()} className="carousel-nav carousel-prev" aria-label="Previous slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <ServiceCarousel ref={carouselRef} />
          <button onClick={() => carouselRef.current?.next()} className="carousel-nav carousel-next" aria-label="Next slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection