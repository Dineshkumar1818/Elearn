"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import coursesData from "../data/coursesData"
import "../styles/CourseDetails.css"

const CourseDetails = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedModules, setExpandedModules] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get course details
    const fetchCourseDetails = () => {
      setIsLoading(true)

      // Find course by id
      const foundCourse = coursesData.find((course) => course.id === Number.parseInt(id))

      if (foundCourse) {
        setCourse(foundCourse)
      }

      setIsLoading(false)
    }

    fetchCourseDetails()
  }, [id])

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  if (isLoading) {
    return <div className="loading-spinner">Loading course details...</div>
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="back-to-home">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="course-details-container">
      <div className="course-header">
        <div className="course-header-content">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {course.title}
          </motion.h1>
          <motion.p
            className="course-description"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {course.description}
          </motion.p>

          <motion.div
            className="course-meta"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="meta-item">
              <i className="fas fa-user"></i>
              <span>Instructor: {course.instructor}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-layer-group"></i>
              <span>Level: {course.level}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-clock"></i>
              <span>Duration: {course.duration}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-users"></i>
              <span>Students: {course.students}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="course-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={course.image || "/placeholder.svg"} alt={course.title} />
        </motion.div>
      </div>

      <div className="course-content">
        <div className="course-tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === "curriculum" ? "active" : ""}`}
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum
          </button>
          <button className={`tab ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
            Reviews
          </button>
          <button
            className={`tab ${activeTab === "instructor" ? "active" : ""}`}
            onClick={() => setActiveTab("instructor")}
          >
            Instructor
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-tab">
              <h3>About This Course</h3>
              <p>{course.longDescription || course.description}</p>

              <h3>What You'll Learn</h3>
              <ul className="learning-objectives">
                {course.learningObjectives &&
                  course.learningObjectives.map((objective, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>

              <h3>Requirements</h3>
              <ul className="requirements-list">
                {course.requirements &&
                  course.requirements.map((requirement, index) => (
                    <li key={index}>
                      <i className="fas fa-circle"></i>
                      <span>{requirement}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="curriculum-tab">
              <h3>Course Content</h3>
              <div className="curriculum-info">
                <span>{course.modules ? course.modules.length : 0} modules</span>
                <span>•</span>
                <span>{course.lectures || 0} lectures</span>
                <span>•</span>
                <span>Total: {course.duration}</span>
              </div>

              <div className="modules-list">
                {course.modules &&
                  course.modules.map((module, index) => (
                    <div className="module-item" key={index}>
                      <div className="module-header" onClick={() => toggleModule(module.id)}>
                        <div className="module-title">
                          <i className={`fas ${expandedModules[module.id] ? "fa-minus" : "fa-plus"}`}></i>
                          <h4>
                            Module {index + 1}: {module.title}
                          </h4>
                        </div>
                        <div className="module-meta">
                          <span>{module.totalLectures || 0} lectures</span>
                          <span>•</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>

                      {expandedModules[module.id] && (
                        <div className="module-content">
                          {module.lectureList &&
                            module.lectureList.map((lecture, lectureIndex) => (
                              <div className="lecture-item" key={lectureIndex}>
                                <div className="lecture-info">
                                  <i
                                    className={`fas ${lecture.type === "video" ? "fa-play-circle" : "fa-file-alt"}`}
                                  ></i>
                                  <span className="lecture-title">{lecture.title}</span>
                                </div>
                                <div className="lecture-meta">
                                  <span>{lecture.duration}</span>
                                  {lecture.preview && (
                                    <Link
                                      to={`/video/${course.id}/${module.id}/${lecture.id}`}
                                      className="preview-link"
                                    >
                                      Preview
                                    </Link>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-tab">
              <h3>Student Reviews</h3>
              <div className="reviews-summary">
                <div className="rating-average">
                  <h2>{course.rating}</h2>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className={`fas fa-star ${star <= Math.floor(course.rating) ? "filled" : ""}`}></i>
                    ))}
                  </div>
                  <p>Course Rating</p>
                </div>

                <div className="rating-bars">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div className="rating-bar-item" key={rating}>
                      <div className="rating-label">{rating} stars</div>
                      <div className="rating-bar">
                        <div className="rating-fill" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                      <div className="rating-percent">{Math.floor(Math.random() * 100)}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reviews-list">
                {course.reviews && course.reviews.length > 0 ? (
                  course.reviews.map((review, index) => (
                    <div className="review-item" key={index}>
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={review.userAvatar || "/images/avatar-placeholder.jpg"} alt={review.userName} />
                          <div>
                            <h4>{review.userName}</h4>
                            <div className="stars">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i key={star} className={`fas fa-star ${star <= review.rating ? "filled" : ""}`}></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <p className="review-content">{review.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet for this course.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "instructor" && (
            <div className="instructor-tab">
              <div className="instructor-profile">
                <img src={course.instructorAvatar || "/images/instructor-placeholder.jpg"} alt={course.instructor} />
                <h3>{course.instructor}</h3>
                <p className="instructor-title">{course.instructorTitle || "Expert Instructor"}</p>
              </div>

              <div className="instructor-stats">
                <div className="stat-item">
                  <i className="fas fa-star"></i>
                  <div>
                    <h4>{course.instructorRating || "4.8"}</h4>
                    <p>Instructor Rating</p>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-comment"></i>
                  <div>
                    <h4>{course.instructorReviews || "2,345"}</h4>
                    <p>Reviews</p>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <h4>{course.instructorStudents || "15,273"}</h4>
                    <p>Students</p>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-play-circle"></i>
                  <div>
                    <h4>{course.instructorCourses || "12"}</h4>
                    <p>Courses</p>
                  </div>
                </div>
              </div>

              <div className="instructor-bio">
                <h3>About the Instructor</h3>
                <p>
                  {course.instructorBio ||
                    "This instructor is a highly experienced professional with years of practical experience in the field. They are passionate about teaching and helping students achieve their learning goals."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="course-sidebar">
        <div className="course-card">
          <div className="course-price">
            <h2>${course.price}</h2>
            {course.originalPrice && <span className="original-price">${course.originalPrice}</span>}
            {course.discount && <span className="discount">{course.discount}% off</span>}
          </div>

          <button className="enroll-button">
            <i className="fas fa-shopping-cart"></i> Enroll Now
          </button>

          <button className="wishlist-button">
            <i className="far fa-heart"></i> Add to Wishlist
          </button>

          <div className="course-includes">
            <h3>This Course Includes:</h3>
            <ul>
              <li>
                <i className="fas fa-play-circle"></i>
                <span>{course.lectures || "42"} on-demand videos</span>
              </li>
              <li>
                <i className="fas fa-file-alt"></i>
                <span>{course.resources || "15"} downloadable resources</span>
              </li>
              <li>
                <i className="fas fa-infinity"></i>
                <span>Full lifetime access</span>
              </li>
              <li>
                <i className="fas fa-mobile-alt"></i>
                <span>Access on mobile and TV</span>
              </li>
              <li>
                <i className="fas fa-certificate"></i>
                <span>Certificate of completion</span>
              </li>
            </ul>
          </div>

          <div className="course-guarantee">
            <i className="fas fa-undo"></i>
            <p>30-Day Money-Back Guarantee</p>
          </div>

          <div className="share-course">
            <h3>Share This Course:</h3>
            <div className="social-share">
              <a href="#" className="social-icon facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon linkedin">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-icon whatsapp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
