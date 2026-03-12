import { useState, useRef, useEffect } from 'react'
import HeroCarousel from '../components/HeroCarousel'
import ThemeToggle from '../components/ThemeToggle'
import './Home.css'

const AboutCard = ({ title, content }: { title: string; content: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setShowReadMore(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      )
    }
  }, [])

  return (
    <div className="about-card">
      <h3 className="about-card-title">{title}</h3>
      <p
        ref={contentRef}
        className="about-card-content"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'unset' : 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {content}
      </p>
      {showReadMore && (
        <button
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
          <span className="btn-arrow">{isExpanded ? '↑' : '→'}</span>
        </button>
      )}
    </div>
  )
}

const services = [
  {
    icon: <img src="/assets/IT CONSULTING.png" alt="IT Consulting" className="service-icon-img" style={{ width: '1em', height: '1em' }} />,
    title: 'IT Consulting',
    content:
      'Process improvement plans, technology assessments, implementation, and training.',
  },
  {
    icon: <img src="/assets/PROCESS OP.png" alt="Process Optimization" className="service-icon-img" style={{ width: '1em', height: '1em' }} />,
    title: 'Process Optimization',
    content:
      'In-depth analysis of operations and tailored solutions to boost efficiency.',
  },
  {
    icon: <img src="/assets/TECHNICAL SUPPORT.png" alt="Technical Support" className="service-icon-img" style={{ width: '1em', height: '1em' }} />,
    title: 'Technical Support',
    content: 'Comprehensive IT assistance for hardware and software needs.',
  },
  {
    icon: <img src="/assets/SOFTWARE D.png" alt="Software Development" className="service-icon-img" style={{ width: '1em', height: '1em' }} />,
    title: 'Software Development',
    content:
      'Customized solutions, including AI-driven features, to streamline operations.',
  },
  {
    icon: <img src="/assets/HARDWARE A.png" alt="Hardware as a Service" className="service-icon-img" style={{ width: '1em', height: '1em' }} />,
    title: 'Hardware as a Service (HaaS)',
    content:
      'Access the latest technology with flexible, scalable, and fully managed hardware solutions.',
  },
]

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
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
      if (window.innerWidth < 768) {
        setVisibleItems(1)
      } else if (window.innerWidth < 992) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

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
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, isTransitioning])

  const extendedServices = [...services, ...services.slice(0, visibleItems)]

  return (
    <div className="services-carousel-wrapper">
      <button onClick={handlePrev} className="carousel-nav carousel-prev" aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
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
              <div
                key={index}
                className="service-card-wrapper"
                style={{ flex: `0 0 ${100 / visibleItems}%` }}
              >
                <div className="service-card">
                  <div className="service-card-icon">{service.icon}</div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-content">{service.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleNext} className="carousel-nav carousel-next" aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  )
}

const Home = () => {
  return (
    <div className="home">
      <ThemeToggle />

      <section className="hero section-primary">
        <HeroCarousel />
      </section>

      <section className="mission-vision section-secondary">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="card mission-card">
              <div className="card-icon">
                <img
                  src="/assets/OUR MISSION.png"
                  alt="Our Mission"
                  style={{ width: '1em', height: '1em' }}
                />
              </div>
              <h2 className="card-title">Our Mission</h2>
              <p className="card-content">
                To provide customized technological solutions that drive the
                sustainable growth of our clients.
              </p>
            </div>

            <div className="card vision-card">
              <div className="card-icon">
                <img
                  src="/assets/OUR VISION.png"
                  alt="Our Vision"
                  style={{ width: '1em', height: '1em' }}
                />
              </div>
              <h2 className="card-title">Our Vision</h2>
              <p className="card-content">
                To be leaders in digital transformation, recognized for our
                technological excellence, commitment to the customer, and
                business adaptability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section section-primary">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-grid">
            <AboutCard
              title="Who We Are"
              content="Our team combines deep experience in business operations with hands-on expertise in software configuration, data migration, and system implementation. Whether you are streamlining workflows, upgrading legacy systems, or launching scalable platforms, we guide you from planning to go-live and beyond."
            />
            <AboutCard
              title="What We Do"
              content="We work closely with your team to understand how your business operates today and design the right tools and processes to prepare you for tomorrow."
            />
            <AboutCard
              title="Our Vision for You"
              content="To make your business more efficient, scalable, and ready for growth."
            />
          </div>
        </div>
      </section>

      <section className="how-we-work-section section-secondary">
        <div className="container">
          <h2 className="section-title">How We Work</h2>
          <div className="how-we-work-grid">
            <div className="work-step-card">
              <div className="work-step-emoji">🤝</div>
              <h3 className="work-step-title">Get to Know You</h3>
              <p className="work-step-description">
                We meet and discuss your current challenges while setting clear goals.
              </p>
            </div>
            <div className="work-step-card">
              <div className="work-step-emoji">💡</div>
              <h3 className="work-step-title">Identify Your Solution</h3>
              <p className="work-step-description">
                We assess the best-fit solutions and provide the knowledge you need to make informed decisions.
              </p>
            </div>
            <div className="work-step-card">
              <div className="work-step-emoji">🚀</div>
              <h3 className="work-step-title">Implement Your Solution</h3>
              <p className="work-step-description">
                We manage implementation and provide hands-on training.
              </p>
            </div>
            <div className="work-step-card">
              <div className="work-step-emoji">📈</div>
              <h3 className="work-step-title">Continuous Improvement</h3>
              <p className="work-step-description">
                We regularly review processes and technology to keep your business performing at its best.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-primary">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <ServiceCarousel />
        </div>
      </section>

      <section className="team-section section-secondary">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member-card">
              <img src="/assets/MA.jpg" alt="Marcelo Albarracin" className="team-member-avatar-img" />
              <h3 className="team-member-name">Marcelo Albarracin</h3>
              <p className="team-member-quote">
                “Turning Strategy into Results with Technology and Analytics”
              </p>
            </div>

            <div className="team-member-card">
              <img src="/assets/JF.png" alt="Jorge Ferrel" className="team-member-avatar-img" />
              <h3 className="team-member-name">Jorge Ferrel</h3>
              <p className="team-member-quote">
                “Driving Innovation and Efficiency Through Technology
                Solutions”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
