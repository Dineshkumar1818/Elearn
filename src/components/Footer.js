"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import "../styles/Footer.css"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Simulate subscription
    setTimeout(() => {
      alert(`Thank you for subscribing with ${email}!`)
      setEmail("")
    }, 500)
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactForm({
      ...contactForm,
      [name]: value,
    })
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
      setTimeout(() => {
        setShowContactForm(false)
        setContactForm({
          name: "",
          email: "",
          message: "",
        })
        setFormSubmitted(false)
      }, 3000)
    }, 1000)
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <i className="fas fa-graduation-cap"></i>
            <span>EduLearn</span>
          </div>

          <div className="footer-description">
            <p>
              EduLearn is a leading online learning platform that helps anyone learn business, software, technology, and
              creative skills to achieve personal and professional goals.
            </p>
          </div>

          <div className="footer-social">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-links-column">
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/press">Press</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/affiliates">Affiliates</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Community</h3>
            <ul>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
              <li>
                <Link to="/developers">Developers</Link>
              </li>
              <li>
                <Link to="/beta-testers">Beta Testers</Link>
              </li>
              <li>
                <Link to="/forum">Forum</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Support</h3>
            <ul>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <button className="contact-link" onClick={() => setShowContactForm(!showContactForm)}>
                  Contact Us
                </button>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/system-status">System Status</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Legal</h3>
            <ul>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/copyright">Copyright</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
            </ul>
          </div>
        </div>

        {showContactForm ? (
          <div className="footer-contact-form">
            <h3>Contact Us</h3>
            {formSubmitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="footer-newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest news and updates delivered straight to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        )}

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} EduLearn. All rights reserved.</p>
          </div>

          <div className="footer-payment">
            <span>Payment Methods:</span>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-apple-pay"></i>
            </div>
          </div>

          <div className="footer-language">
            <select>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
