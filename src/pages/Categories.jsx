"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import coursesData from "../data/coursesData"
import "../styles/Categories.css"

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Extract unique categories and count courses in each category
    const categoryCounts = coursesData.reduce((acc, course) => {
      const category = course.category || "Uncategorized"
      if (!acc[category]) {
        acc[category] = {
          count: 1,
          image: course.image,
        }
      } else {
        acc[category].count += 1
        // Keep the first image we find for each category
        if (!acc[category].image) {
          acc[category].image = course.image
        }
      }
      return acc
    }, {})

    // Transform to array format for rendering
    const categoryArray = Object.keys(categoryCounts).map((name) => ({
      name,
      count: categoryCounts[name].count,
      image: categoryCounts[name].image || "/placeholder.svg",
    }))

    setCategories(categoryArray)
    setIsLoading(false)
  }, [])

  // Category icons mapping
  const categoryIcons = {
    "Web Development": "fas fa-code",
    "Data Science": "fas fa-database",
    Design: "fas fa-paint-brush",
    Marketing: "fas fa-bullhorn",
    "Mobile Development": "fas fa-mobile-alt",
    Photography: "fas fa-camera",
    Business: "fas fa-briefcase",
    Uncategorized: "fas fa-folder",
  }

  // Get icon for a category, default to folder icon if not found
  const getCategoryIcon = (category) => {
    return categoryIcons[category] || "fas fa-folder"
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Course Categories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Browse our course categories and find the perfect course for your needs
        </motion.p>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading categories...</div>
      ) : (
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Link to={`/courses?category=${category.name}`} className="category-link">
                <div className="category-icon">
                  <i className={getCategoryIcon(category.name)}></i>
                </div>
                <div className="category-image">
                  <img src={category.image || "/placeholder.svg"} alt={category.name} />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>
                    {category.count} {category.count === 1 ? "course" : "courses"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="categories-cta">
        <h2>Can't find what you're looking for?</h2>
        <p>Browse all our courses and find the perfect match for your learning journey.</p>
        <Link to="/courses" className="browse-all-btn">
          Browse All Courses
        </Link>
      </div>
    </div>
  )
}

export default Categories
