import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../components/useTheme'
import './Contact.css'

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_smvac7c',
  TEMPLATE_ID: 'template_xgrq1ko',
  PUBLIC_KEY: 'YbBsx9_gTJq5y7mK7',
};

const RECAPTCHA_SITE_KEY = '6LefsTssAAAAAOD-TveIhxMw0yFT8rXWiWkR9I33';

const CONTACT_INFO = {
  email: 'info@businesstech.solutions',
};

const Contact = () => {
  const form = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const theme = useTheme()
  
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

  // Ensure fields aren't just whitespace and captcha is solved
  const isFormValid = !!(capVal && formData.name.trim() && formData.email.trim() && formData.message.trim()) && !isSubmitting;

  // Reset captcha value if theme changes because the widget re-renders (via the 'key' prop)
  useEffect(() => {
    setCapVal(null);
  }, [theme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!capVal) {
      alert('Please complete the CAPTCHA first.')
      return
    }

    setIsSubmitting(true)

    if (form.current) {
      emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID, 
        EMAILJS_CONFIG.TEMPLATE_ID, 
        form.current, 
        EMAILJS_CONFIG.PUBLIC_KEY
      )
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
          setSnackbar({ show: true, message: 'Failed to send message. Please try again.', type: 'error' })
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
                  <span className="detail-value" style={{ color: 'var(--text-light)' }}>
                    {CONTACT_INFO.email}
                  </span>
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

                <div className="form-group" style={{ marginBottom: '20px', alignItems: 'center' }}>
                  <ReCAPTCHA
                    key={theme}
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(val) => setCapVal(val)}
                    theme={theme}
                  />
                </div>

                <button 
                  type="submit" 
                  className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
                  disabled={!isFormValid}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className={`snackbar ${snackbar.show ? 'show' : ''} ${snackbar.type}`}>
        {snackbar.message}
      </div>
    </div>
  )
}

export default Contact