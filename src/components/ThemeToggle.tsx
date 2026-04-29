import { useState, useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
    window.dispatchEvent(new Event('themeChange'))
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    window.dispatchEvent(new Event('themeChange'))
  }

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ThemeToggle