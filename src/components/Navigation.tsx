import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
      setTheme(currentTheme)
    }
    updateTheme()
    window.addEventListener('themeChange', updateTheme)
    return () => window.removeEventListener('themeChange', updateTheme)
  }, [])

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link 
          to="/" 
          className="logo" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="BTS Home"
        >
          <img 
            src={theme === 'dark' ? '/assets/BTS BANNER DARK.png' : '/assets/BTS-Banner.png'} 
            alt="BTS Business Tech Solutions" 
            className="logo-image" 
          />
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
