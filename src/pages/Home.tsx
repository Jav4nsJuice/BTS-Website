import ThemeToggle from '../components/ThemeToggle'
import MissionVisionSection from '../components/MissionVisionSection'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import HowWeWorkSection from '../components/HowWeWorkSection'
import ServicesSection from '../components/ServicesSection'
import TeamSection from '../components/TeamSection'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <ThemeToggle />

      <HeroSection />

      <MissionVisionSection />

      <AboutSection />

      <HowWeWorkSection />

      <ServicesSection />

      <TeamSection />
    </div>
  )
}

export default Home
