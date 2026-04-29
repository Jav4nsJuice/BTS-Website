import { useTheme } from './useTheme'
import './MissionVisionSection.css'

const MissionVisionSection = () => {
  const theme = useTheme()

  return (
    <section className="mission-vision section-secondary">
      <div className="container">
        <div className="mission-vision-grid">
          <div className="card mission-card">
            <div className="card-icon">
              <img
                src={theme === 'dark' ? '/assets/OUR MISSION DARK.png' : '/assets/OUR MISSION.png'}
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
                src={theme === 'dark' ? '/assets/OUR VISION DARK.png' : '/assets/OUR VISION.png'}
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
  )
}

export default MissionVisionSection