"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CourseCard from "../components/CourseCards"
import HeroSection from "../components/HeroSection"
import { motion } from "framer-motion"
import  coursesData from "../data/coursesData"
import "../styles/Home.css"

const Home = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    // Simulate fetching courses from an API
    setCourses(coursesData)
    setFilteredCourses(coursesData)

    // Extract unique categories
    const uniqueCategories = ["All", ...new Set(coursesData.map((course) => course.category))]
    setCategories(uniqueCategories)
  }, [])

  useEffect(() => {
    // Filter courses based on search term and category
    let results = courses

    if (searchTerm) {
      results = results.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      results = results.filter((course) => course.category === selectedCategory)
    }

    setFilteredCourses(results)
  }, [searchTerm, selectedCategory, courses])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="home-container">
      <HeroSection />

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for courses, instructors, or keywords..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </section>

      <section className="categories-section">
        <h2>Browse Categories</h2>
        <div className="categories-container">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`category-button ${selectedCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))
          ) : (
            <p className="no-courses">No courses found matching your criteria.</p>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to start learning?</h2>
          <p>Join thousands of students already learning on our platform.</p>
          <Link to="/signup" className="cta-button">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
