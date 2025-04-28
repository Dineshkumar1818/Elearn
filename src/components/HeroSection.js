"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/HeroSection.css"

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Expand Your Knowledge & Achieve Your Goals
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Access thousands of high-quality courses from expert instructors around the world. Start learning today and
          unlock your potential.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/courses" className="hero-button primary">
            Explore Courses
          </Link>
          <Link to="/signup" className="hero-button secondary">
            Join For Free
          </Link>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Courses</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Instructors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2M+</span>
            <span className="stat-label">Students</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-image">
        <img src="/images/hero-image.jpg" alt="Online Learning" />
      </div>

      <div className="hero-categories">
        <div className="category-label">Popular Categories:</div>
        <div className="category-tags">
          <Link to="/category/web-development" className="category-tag">
            Web Development
          </Link>
          <Link to="/category/data-science" className="category-tag">
            Data Science
          </Link>
          <Link to="/category/business" className="category-tag">
            Business
          </Link>
          <Link to="/category/design" className="category-tag">
            Design
          </Link>
          <Link to="/category/marketing" className="category-tag">
            Marketing
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
