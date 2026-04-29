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

const SOCIAL_LINKS = [
  { href: 'https://linkedin.com/company/bts-business-tech-solutions', icon: <FaLinkedin />, label: 'LinkedIn' },
  { href: 'https://www.facebook.com/profile.php?id=61587056245051', icon: <FaFacebook />, label: 'Facebook' },
  { href: 'https://www.youtube.com/@BusinessTechSolutions-d4u', icon: <FaYoutube />, label: 'YouTube' },
  { href: 'https://x.com/BTechS2025', icon: <FaXTwitter />, label: 'X' },
];

const CONTACT_INFO = {
  email: 'info@businesstech.solutions',
  phone: '+1 (703) 883-7806',
  phoneRaw: '+17038837806',
  address: 'Vienna, VA 22180, USA'
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Contact Information</h3>
            <p>
              <FaEnvelope />{' '}
              <a href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </a>
            </p>
            <p>
              <FaPhone /> <a href={`tel:${CONTACT_INFO.phoneRaw}`}>{CONTACT_INFO.phone}</a>
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Headquarters</h3>
            <p>
              <FaMapMarkerAlt /> {CONTACT_INFO.address}
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <div className="social-links">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
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