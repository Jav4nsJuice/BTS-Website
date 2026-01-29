import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link 
          to="/" 
          className="logo" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="BTS Home"
        >
          <img src="/assets/BTS-Banner.png" alt="BTS Business Tech Solutions" className="logo-image" />
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
          <Link 
            to="/contact" 
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
