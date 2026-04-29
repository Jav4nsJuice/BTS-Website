import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useTheme } from './useTheme'
import './ServiceCarousel.css'

const services = [
  {
    iconLight: '/assets/IT CONSULTING LIGHT.png',
    iconDark: '/assets/IT CONSULTING DARK.png',
    title: 'IT Consulting',
    content: 'Process improvement plans, technology assessments, implementation, and training.',
  },
  {
    iconLight: '/assets/PROCESS OP LIGHT.png',
    iconDark: '/assets/PROCESS OP DARK.png',
    title: 'Process Optimization',
    content: 'In-depth analysis of operations and tailored solutions to boost efficiency.',
  },
  {
    iconLight: '/assets/TECHNICAL SUPPORT LIGHT.png',
    iconDark: '/assets/TECHNICAL SUPPORT DARK.png',
    title: 'Technical Support',
    content: 'Comprehensive IT assistance for hardware and software needs.',
  },
  {
    iconLight: '/assets/SOFTWARE D LIGHT.png',
    iconDark: '/assets/SOFTWARE D DARK.png',
    title: 'Software Development',
    content: 'Customized solutions, including AI-driven features, to streamline operations.',
  },
  {
    iconLight: '/assets/HARDWARE A LIGHT.png',
    iconDark: '/assets/HARDWARE A DARK.png',
    title: 'Hardware as a Service (HaaS)',
    content: 'Access the latest technology with flexible, scalable, and fully managed hardware solutions.',
  },
]

const ServiceCarousel = forwardRef((_props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const theme = useTheme()
  const [visibleItems, setVisibleItems] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1
      if (window.innerWidth < 992) return 2
    }
    return 3
  })
  const [isTransitioning, setIsTransitioning] = useState(true)
  const timeoutRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleItems(1)
      else if (window.innerWidth < 992) setVisibleItems(2)
      else setVisibleItems(3)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useImperativeHandle(ref, () => ({
    next: handleNext,
    prev: handlePrev
  }));

  const handleNext = () => {
    if (currentIndex >= services.length) {
      setIsTransitioning(false)
      setCurrentIndex(0)
      setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(1)
      }, 50)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false)
      setCurrentIndex(services.length)
      setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(services.length - 1)
      }, 50)
    } else {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  useEffect(() => {
    intervalRef.current = window.setInterval(handleNext, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [currentIndex])

  useEffect(() => {
    if (currentIndex === services.length) {
      timeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
      }, 500)
    } else if (currentIndex === 0 && !isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true))
      })
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [currentIndex, isTransitioning])

  const extendedServices = [...services, ...services.slice(0, visibleItems)]

  return (
    <>
      <div className="services-carousel-container">
        <div className="services-carousel-viewport">
          <div
            className="services-carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
            }}
          >
            {extendedServices.map((service, index) => (
              <div key={index} className="service-card-wrapper" style={{ flex: `0 0 ${100 / visibleItems}%` }}>
                <div className="service-card">
                  <div className="service-card-icon">
                    <img src={theme === 'dark' ? service.iconDark : service.iconLight} alt={service.title} className="service-icon-img" style={{ width: '3rem', height: '3rem', objectFit: 'contain' }} />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-content">{service.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
})
export default ServiceCarousel