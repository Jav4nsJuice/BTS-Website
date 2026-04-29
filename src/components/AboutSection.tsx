import AboutCard from './AboutCard'
import './AboutSection.css'

const AboutSection = () => {
  return (
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
  )
}

export default AboutSection