"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "../styles/About.css"

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="about-page">
      <div className="about-header">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          About EduLearn
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Empowering learners worldwide with quality education
        </motion.p>
      </div>

      <section className="about-mission">
        <div className="container">
          <motion.div
            className="mission-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <h2>Our Mission</h2>
            <p>
              At EduLearn, our mission is to provide accessible, affordable, and high-quality education to learners
              around the world. We believe that education is a fundamental right and that everyone should have the
              opportunity to learn and grow, regardless of their background or circumstances.
            </p>
            <p>
              We are committed to creating a platform that empowers individuals to achieve their personal and
              professional goals through continuous learning and skill development.
            </p>
          </motion.div>
          <motion.div
            className="mission-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <img src="/placeholder.svg?height=400&width=600" alt="Our Mission" />
          </motion.div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <motion.div
            className="story-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <img src="/placeholder.svg?height=400&width=600" alt="Our Story" />
          </motion.div>
          <motion.div
            className="story-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <h2>Our Story</h2>
            <p>
              EduLearn was founded in 2020 with a simple idea: to make quality education accessible to everyone. What
              started as a small collection of courses has grown into a comprehensive platform offering thousands of
              courses across various disciplines.
            </p>
            <p>
              Our journey has been driven by the passion to transform lives through education. We've helped thousands of
              learners acquire new skills, advance their careers, and pursue their passions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            Our Core Values
          </motion.h2>
          <div className="values-grid">
            <motion.div
              className="value-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              variants={fadeIn}
            >
              <div className="value-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Quality Education</h3>
              <p>
                We are committed to providing high-quality educational content that meets the needs of our learners.
              </p>
            </motion.div>
            <motion.div
              className="value-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeIn}
            >
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Inclusivity</h3>
              <p>
                We believe in creating an inclusive learning environment that welcomes learners from all backgrounds.
              </p>
            </motion.div>
            <motion.div
              className="value-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeIn}
            >
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>We continuously innovate to improve the learning experience and stay ahead of educational trends.</p>
            </motion.div>
            <motion.div
              className="value-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
            >
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Integrity</h3>
              <p>We operate with honesty, transparency, and ethical standards in all our interactions.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            Meet Our Team
          </motion.h2>
          <div className="team-grid">
            <motion.div
              className="team-member"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              variants={fadeIn}
            >
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Team Member" />
              </div>
              <h3>John Smith</h3>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">John has over 15 years of experience in education and technology.</p>
            </motion.div>
            <motion.div
              className="team-member"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeIn}
            >
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Team Member" />
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Chief Learning Officer</p>
              <p className="member-bio">Sarah is passionate about creating engaging learning experiences.</p>
            </motion.div>
            <motion.div
              className="team-member"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeIn}
            >
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Team Member" />
              </div>
              <h3>Michael Brown</h3>
              <p className="member-role">CTO</p>
              <p className="member-bio">Michael leads our technology team with innovation and excellence.</p>
            </motion.div>
            <motion.div
              className="team-member"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
            >
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Team Member" />
              </div>
              <h3>Emily Chen</h3>
              <p className="member-role">Head of Content</p>
              <p className="member-bio">Emily ensures that our course content meets the highest standards.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        >
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already learning on our platform.</p>
          <div className="cta-buttons">
            <Link to="/courses" className="cta-button primary">
              Browse Courses
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default About
