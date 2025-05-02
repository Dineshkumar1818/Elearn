"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import CourseCard from "../components/CourseCards"
import  coursesData  from "../data/coursesData"
import "../styles/MyCourses.css"

const MyCourses = ({ user }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get user's enrolled courses
    const fetchEnrolledCourses = () => {
      setIsLoading(true)

      // Filter courses based on user's enrolledCourses array
      const userCourses = coursesData.filter((course) => user.enrolledCourses.includes(course.id))

      // Add progress data to each course
      const coursesWithProgress = userCourses.map((course) => ({
        ...course,
        progress: Math.floor(Math.random() * 101), // Random progress for demo
      }))

      setEnrolledCourses(coursesWithProgress)
      setFilteredCourses(coursesWithProgress)
      setIsLoading(false)
    }

    fetchEnrolledCourses()
  }, [user])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)

    if (filter === "all") {
      setFilteredCourses(enrolledCourses)
    } else if (filter === "in-progress") {
      setFilteredCourses(enrolledCourses.filter((course) => course.progress > 0 && course.progress < 100))
    } else if (filter === "completed") {
      setFilteredCourses(enrolledCourses.filter((course) => course.progress === 100))
    } else if (filter === "not-started") {
      setFilteredCourses(enrolledCourses.filter((course) => course.progress === 0))
    }
  }

  return (
    <div className="my-courses-container">
      <motion.div
        className="my-courses-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My Courses</h1>
        <p>Track and manage your enrolled courses</p>
      </motion.div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          All Courses
        </button>
        <button
          className={`filter-tab ${activeFilter === "in-progress" ? "active" : ""}`}
          onClick={() => handleFilterChange("in-progress")}
        >
          In Progress
        </button>
        <button
          className={`filter-tab ${activeFilter === "completed" ? "active" : ""}`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
        <button
          className={`filter-tab ${activeFilter === "not-started" ? "active" : ""}`}
          onClick={() => handleFilterChange("not-started")}
        >
          Not Started
        </button>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading your courses...</div>
      ) : filteredCourses.length > 0 ? (
        <motion.div
          className="courses-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CourseCard course={course} showProgress={true} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="no-courses-message">
          <p>You don't have any {activeFilter !== "all" ? activeFilter : ""} courses yet.</p>
          <Link to="/" className="browse-courses-btn">
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyCourses
