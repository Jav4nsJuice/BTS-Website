import {
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaPhone,
  FaFacebook,
  FaEnvelope,
} from 'react-icons/fa6'
import { FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Contact Information</h3>
            <p>
              <FaEnvelope />{' '}
              <a href="mailto:info@businesstech.solutions">
                info@businesstech.solutions
              </a>
            </p>
            <p>
              <FaPhone /> <a href="tel:+17038837806">+1 (703) 883-7806</a>
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Headquarters</h3>
            <p>
              <FaMapMarkerAlt /> Vienna, VA 22180, USA
            </p>
          </div>
          <div className="footer-section social-media">
            <h3 className="footer-title">Follow Us</h3>
            <div className="social-links">
              <a href="https://linkedin.com/company/bts-business-tech-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://www.facebook.com/profile.php?id=61587056245051" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.youtube.com/@BusinessTechSolutions-d4u" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://x.com/BTechS2025" target="_blank" rel="noopener noreferrer" aria-label="X"><FaXTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BTS - Business Tech Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer