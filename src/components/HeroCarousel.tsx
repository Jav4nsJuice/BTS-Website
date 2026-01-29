import { useState, useEffect } from 'react'

interface CarouselItem {
  id: number
  title: string
  description: string
  image: string
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Business Tech Solutions',
    description: 'Transforming businesses through innovative software solutions',
    image: '/assets/BTS-Banner.png'
  },
  {
    id: 2,
    title: 'Custom Software Development',
    description: 'Tailored solutions built to meet your unique business requirements and drive growth',
    image: '/assets/BTS-4steps.png'
  }
]

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''} ${index === 0 ? 'logo-slide' : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
              <h2 className="carousel-title">{item.title}</h2>
              <p className="carousel-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-nav carousel-prev" onClick={goToPrevious} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button className="carousel-nav carousel-next" onClick={goToNext} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
