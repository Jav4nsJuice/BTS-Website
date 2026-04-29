import { useTheme } from './useTheme'
import './HowWeWorkSection.css'

const HowWeWorkSection = () => {
  const theme = useTheme()

  return (
    <section className="how-we-work-section section-secondary">
      <div className="container">
        <h2 className="section-title">How We Work</h2>
        <div className="how-we-work-grid">
          <div className="work-step-card">
            <div className="work-step-icon">
              <img
                src={theme === 'dark' ? '/assets/GetToKnowYOu DARK.png' : '/assets/GetToKnowYOu.png'}
                alt="Get to Know You"
                style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
              />
            </div>
            <h3 className="work-step-title">Get to Know You</h3>
            <p className="work-step-description">
              We meet and discuss your current challenges while setting clear goals.
            </p>
          </div>
          <div className="work-step-card">
            <div className="work-step-icon">
              <img
                src={theme === 'dark' ? '/assets/IdentifyYourSolution DARK.png' : '/assets/IdentifyYourSolution.png'}
                alt="Identify Your Solution"
                style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
              />
            </div>
            <h3 className="work-step-title">Identify Your Solution</h3>
            <p className="work-step-description">
              We assess the best-fit solutions and provide the knowledge you need to make informed decisions.
            </p>
          </div>
          <div className="work-step-card">
            <div className="work-step-icon">
              <img
                src={theme === 'dark' ? '/assets/ImplementYourSolution DARK.png' : '/assets/ImplementYourSolution.png'}
                alt="Implement Your Solution"
                style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
              />
            </div>
            <h3 className="work-step-title">Implement Your Solution</h3>
            <p className="work-step-description">
              We manage implementation and provide hands-on training.
            </p>
          </div>
          <div className="work-step-card">
            <div className="work-step-icon">
              <img
                src={theme === 'dark' ? '/assets/ContinuousImprovement DARK.png' : '/assets/ContinuousImprovement.png'}
                alt="Continuous Improvement"
                style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
              />
            </div>
            <h3 className="work-step-title">Continuous Improvement</h3>
            <p className="work-step-description">
              We regularly review processes and technology to keep your business performing at its best.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWorkSection