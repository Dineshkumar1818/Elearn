"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/CourseCard.css"

const CourseCards = ({ course, showProgress = false }) => {
  return (
    <motion.div className="course-card" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Link to={`/course/${course.id}`} className="course-card-link">
        <div className="course-image">
          <img src={course.image || "/placeholder.svg"} alt={course.title} />
          {course.bestseller && <div className="bestseller-badge">Bestseller</div>}
          {course.discount && <div className="discount-badge">{course.discount}% OFF</div>}
        </div>

        <div className="course-content">
          <h3 className="course-title">{course.title}</h3>
          <p className="course-instructor">{course.instructor}</p>

          <div className="course-rating">
            <span className="rating-value">{course.rating}</span>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className={`fas fa-star ${star <= Math.floor(course.rating) ? "filled" : ""}`}></i>
              ))}
            </div>
            <span className="rating-count">({course.reviews})</span>
          </div>

          {showProgress && course.progress !== undefined && (
            <div className="course-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
              </div>
              <span className="progress-text">{course.progress}% complete</span>
            </div>
          )}

          <div className="course-meta">
            <div className="course-level">
              <i className="fas fa-signal"></i>
              <span>{course.level}</span>
            </div>
            <div className="course-duration">
              <i className="fas fa-clock"></i>
              <span>{course.duration}</span>
            </div>
            <div className="course-lectures">
              <i className="fas fa-play-circle"></i>
              <span>{course.lectures} lectures</span>
            </div>
          </div>

          <div className="course-price">
            <span className="current-price">${course.price}</span>
            {course.originalPrice && <span className="original-price">${course.originalPrice}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CourseCards
