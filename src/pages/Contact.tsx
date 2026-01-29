import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'
import ThemeToggle from '../components/ThemeToggle'
import './Contact.css'

const Contact = () => {
  const form = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  
  // 1. State to track if Captcha is valid
  const [capVal, setCapVal] = useState<string | null>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [snackbar, setSnackbar] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  })

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

  const SERVICE_ID = 'service_smvac7c';
  const TEMPLATE_ID = 'template_xgrq1ko'; 
  const PUBLIC_KEY = 'YbBsx9_gTJq5y7mK7'; 
  const RECAPTCHA_SITE_KEY = '6LefsTssAAAAAOD-TveIhxMw0yFT8rXWiWkR9I33'; // PASTE YOUR GOOGLE SITE KEY HERE

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Extra safety check
    if (!capVal) {
      alert('Please complete the CAPTCHA first.')
      return
    }

    setIsSubmitting(true)

    if (form.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log('SUCCESS!', result.text)
          setSnackbar({ show: true, message: 'Contact form sent successfully.', type: 'success' })
          setTimeout(() => setSnackbar(prev => ({ ...prev, show: false })), 3000)
          setFormData({ name: '', email: '', message: '' })
          setCapVal(null) // Reset captcha state
          recaptchaRef.current?.reset()
      })
      .catch((error) => {
          console.log('FAILED...', error.text)
          setSnackbar({ show: true, message: 'Contact form not send.', type: 'error' })
          setTimeout(() => setSnackbar(prev => ({ ...prev, show: false })), 3000)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
    }
  }

  return (
    <div className="contact">
      <ThemeToggle />
      {/* ... Hero Section (unchanged) ... */}

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* ... Info Section (unchanged) ... */}
            <div className="contact-info">
              <h2 className="info-title">Let's Connect</h2>
              <p className="info-description">
                We're here to help you bring your software vision to life.
              </p>
              <div className="contact-details">
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value" style={{ color: 'var(--text-light)' }}>info@businesstech.solutions</span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" ref={form} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* 2. Add ReCAPTCHA Component */}
                <div className="form-group" style={{ marginBottom: '20px', alignItems: 'center' }}>
                  <ReCAPTCHA
                    key={theme}
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(val) => setCapVal(val)}
                    theme={theme}
                  />
                </div>

                {/* 3. Button disabled if capVal is null */}
                <button 
                  type="submit" 
                  className="submit-button"
                  // Disable if submitting OR if captcha value is missing
                  disabled={isSubmitting || !capVal || !formData.name || !formData.email || !formData.message}
                  style={{ 
                    opacity: (!capVal || isSubmitting || !formData.name || !formData.email || !formData.message) ? 0.6 : 1,
                    cursor: (!capVal || isSubmitting || !formData.name || !formData.email || !formData.message) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {snackbar.show && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: snackbar.type === 'success' ? '#28a745' : '#dc3545',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '4px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000,
          fontSize: '1rem',
          fontWeight: 500
        }}>
          {snackbar.message}
        </div>
      )}
    </div>
  )
}

export default Contact