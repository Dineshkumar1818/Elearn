import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/HeroSection.css"

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  // Animation statistics
  const stats = [
    { number: "10K+", label: "Courses" },
    { number: "200+", label: "Expert Instructors" },
    { number: "50K+", label: "Students" },
    { number: "4.8", label: "Average Rating" }
  ]

  useEffect(() => {
    setIsVisible(true)
    
    // Initialize particles
    const particlesContainer = document.querySelector('.particles')
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        
        // Random positioning and animation delays
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 5}s`
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`
        
        particlesContainer.appendChild(particle)
      }
    }
  }, [])

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      }
    }
  }
  
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut", 
        delay: 0.6
      }
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="particles"></div>
      </div>
      
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          Expand Your Knowledge & <span className="highlight">Achieve Your Goals</span>
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Access thousands of high-quality courses from expert instructors around the world. 
          Start learning today and unlock your potential.
        </motion.p>
        
        <motion.div className="hero-buttons" variants={itemVariants}>
          <Link to="/courses" className="hero-button primary">
            <span className="button-text">Explore Courses</span>
            <span className="button-icon">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
          <Link to="/signup" className="hero-button secondary">
            <span className="button-text">Join For Free</span>
            <span className="button-icon">
              <i className="fas fa-user-plus"></i>
            </span>
          </Link>
        </motion.div>
        
        <motion.div className="hero-stats" variants={statsVariants}>
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </section>
  )
}

export default HeroSection