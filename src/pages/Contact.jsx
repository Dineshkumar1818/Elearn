"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "../styles/Contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    }

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have questions or feedback? We'd love to hear from you!
        </motion.p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Our Location</h3>
            <p>123 Education Street</p>
            <p>Learning City, ED 12345</p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="info-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon-Fri, 9am-5pm</p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email Us</h3>
            <p>info@edulearn.com</p>
            <p>support@edulearn.com</p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Working Hours</h3>
            <p>Monday-Friday: 9am-5pm</p>
            <p>Saturday: 10am-2pm</p>
          </motion.div>
        </div>

        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Send Us a Message</h2>

          {submitSuccess && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <p>Your message has been sent successfully! We'll get back to you soon.</p>
            </div>
          )}

          {submitError && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <p>There was an error sending your message. Please try again later.</p>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? "error" : ""}
              />
              {formErrors.name && <span className="error-text">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? "error" : ""}
              />
              {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={formErrors.subject ? "error" : ""}
              />
              {formErrors.subject && <span className="error-text">{formErrors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={formErrors.message ? "error" : ""}
              ></textarea>
              {formErrors.message && <span className="error-text">{formErrors.message}</span>}
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="contact-map">
        <h2>Find Us</h2>
        <div className="map-container">
          {/* Placeholder for map - in a real app, you would use Google Maps or similar */}
          <div className="map-placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <p>Interactive map loading...</p>
          </div>
        </div>
      </div>

      <div className="contact-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>How do I enroll in a course?</h3>
            <p>
              To enroll in a course, simply browse our course catalog, select the course you're interested in, and click
              the "Enroll Now" button. You'll be guided through the payment process if it's a paid course.
            </p>
          </div>
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>
              We accept all major credit cards, PayPal, and bank transfers. For some courses, we also offer payment
              plans to make education more accessible.
            </p>
          </div>
          <div className="faq-item">
            <h3>Can I get a refund if I'm not satisfied?</h3>
            <p>
              Yes, we offer a 30-day money-back guarantee for most of our courses. If you're not satisfied with your
              purchase, you can request a refund within 30 days of enrollment.
            </p>
          </div>
          <div className="faq-item">
            <h3>How long do I have access to a course?</h3>
            <p>
              Once enrolled, you have lifetime access to the course materials, including any future updates to the
              content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
