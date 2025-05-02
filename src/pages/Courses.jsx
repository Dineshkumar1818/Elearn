"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CourseCard from "../components/CourseCards"
import coursesData from "../data/coursesData"
import "../styles/Courses.css"

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("All")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch courses
    setIsLoading(true)
    setTimeout(() => {
      setCourses(coursesData)
      setFilteredCourses(coursesData)
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    // Filter courses based on search term, category, level, and price
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

    if (selectedLevel !== "All") {
      results = results.filter((course) => course.level === selectedLevel)
    }

    if (selectedPrice !== "All") {
      if (selectedPrice === "Free") {
        results = results.filter((course) => course.price === 0)
      } else if (selectedPrice === "Paid") {
        results = results.filter((course) => course.price > 0)
      } else if (selectedPrice === "Under $50") {
        results = results.filter((course) => course.price > 0 && course.price < 50)
      } else if (selectedPrice === "$50 - $100") {
        results = results.filter((course) => course.price >= 50 && course.price <= 100)
      } else if (selectedPrice === "Over $100") {
        results = results.filter((course) => course.price > 100)
      }
    }

    setFilteredCourses(results)
  }, [searchTerm, selectedCategory, selectedLevel, selectedPrice, courses])

  // Extract unique categories from courses
  const categories = ["All", ...new Set(courses.map((course) => course.category))]

  // Extract unique levels from courses
  const levels = ["All", ...new Set(courses.map((course) => course.level))]

  // Price ranges
  const priceRanges = ["All", "Free", "Paid", "Under $50", "$50 - $100", "Over $100"]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Browse All Courses
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore our wide range of courses and find the perfect one for you
        </motion.p>
      </div>

      <div className="courses-container">
        <div className="courses-sidebar">
          <div className="filter-section">
            <h3>Search</h3>
            <div className="search-box">
              <input type="text" placeholder="Search courses..." value={searchTerm} onChange={handleSearch} />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              {categories.map((category, index) => (
                <div className="filter-option" key={index}>
                  <label className={selectedCategory === category ? "active" : ""}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Level</h3>
            <div className="filter-options">
              {levels.map((level, index) => (
                <div className="filter-option" key={index}>
                  <label className={selectedLevel === level ? "active" : ""}>
                    <input
                      type="radio"
                      name="level"
                      checked={selectedLevel === level}
                      onChange={() => setSelectedLevel(level)}
                    />
                    <span>{level}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price</h3>
            <div className="filter-options">
              {priceRanges.map((price, index) => (
                <div className="filter-option" key={index}>
                  <label className={selectedPrice === price ? "active" : ""}>
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice === price}
                      onChange={() => setSelectedPrice(price)}
                    />
                    <span>{price}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="reset-filters"
            onClick={() => {
              setSelectedCategory("All")
              setSelectedLevel("All")
              setSelectedPrice("All")
              setSearchTerm("")
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="courses-grid-container">
          <div className="courses-results">
            <p>
              Showing <span>{filteredCourses.length}</span> of <span>{courses.length}</span> courses
            </p>
          </div>

          {isLoading ? (
            <div className="loading-spinner">Loading courses...</div>
          ) : filteredCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <i className="fas fa-search"></i>
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Courses
