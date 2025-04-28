"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import CourseCard from "../components/CourseCards"
import { coursesData } from "../data/coursesData"
import "../styles/UserDashboard.css"

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const UserDashboard = ({ user }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [recentCourses, setRecentCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get user's enrolled courses
    const fetchEnrolledCourses = () => {
      setIsLoading(true)

      // Filter courses based on user's enrolledCourses array
      const userCourses = coursesData.filter((course) => user.enrolledCourses.includes(course.id))

      setEnrolledCourses(userCourses)

      // Get the most recent 2 courses
      setRecentCourses(userCourses.slice(0, 2))

      setIsLoading(false)
    }

    fetchEnrolledCourses()
  }, [user])

  // Chart data for weekly progress
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Spent Learning",
        data: user.progress.weeklyProgress,
        fill: false,
        backgroundColor: "#4f46e5",
        borderColor: "#4f46e5",
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e1e2d",
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="dashboard-container">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's an overview of your learning progress</p>
      </motion.div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <motion.section
            className="stats-cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="stat-card">
              <div className="stat-icon courses-icon">
                <i className="fas fa-book"></i>
              </div>
              <div className="stat-info">
                <h3>Total Courses</h3>
                <p className="stat-value">{user.progress.totalCourses}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon completed-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-info">
                <h3>Completed</h3>
                <p className="stat-value">{user.progress.completed}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending-icon">
                <i className="fas fa-hourglass-half"></i>
              </div>
              <div className="stat-info">
                <h3>Pending Hours</h3>
                <p className="stat-value">{user.progress.pendingHours}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon wallet-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="stat-info">
                <h3>Wallet Balance</h3>
                <p className="stat-value">${user.wallet.balance}</p>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="weekly-progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="section-header">
              <h2>Weekly Learning Activity</h2>
            </div>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </motion.section>

          <motion.section
            className="recent-courses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="section-header">
              <h2>Continue Learning</h2>
              <Link to="/my-courses" className="view-all">
                View All Courses
              </Link>
            </div>

            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : recentCourses.length > 0 ? (
              <div className="recent-courses-grid">
                {recentCourses.map((course) => (
                  <CourseCard key={course.id} course={course} showProgress={true} />
                ))}
              </div>
            ) : (
              <div className="no-courses-message">
                <p>You haven't enrolled in any courses yet.</p>
                <Link to="/" className="browse-courses-btn">
                  Browse Courses
                </Link>
              </div>
            )}
          </motion.section>
        </div>

        <motion.div
          className="dashboard-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <section className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <img src="/images/avatar-placeholder.jpg" alt="Profile" />
              </div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div className="profile-actions">
              <Link to="/profile" className="profile-action-btn">
                <i className="fas fa-user-edit"></i> Edit Profile
              </Link>
              <Link to="/settings" className="profile-action-btn">
                <i className="fas fa-cog"></i> Settings
              </Link>
            </div>
          </section>

          <section className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/wallet" className="action-btn wallet">
                <i className="fas fa-wallet"></i>
                <span>My Wallet</span>
              </Link>
              <Link to="/certificates" className="action-btn certificates">
                <i className="fas fa-certificate"></i>
                <span>Certificates</span>
              </Link>
              <Link to="/wishlist" className="action-btn wishlist">
                <i className="fas fa-heart"></i>
                <span>Wishlist</span>
              </Link>
              <Link to="/notes" className="action-btn notes">
                <i className="fas fa-sticky-note"></i>
                <span>My Notes</span>
              </Link>
            </div>
          </section>

          <section className="upcoming-events">
            <h3>Upcoming Events</h3>
            <div className="events-list">
              <div className="event-item">
                <div className="event-date">
                  <span className="event-day">15</span>
                  <span className="event-month">May</span>
                </div>
                <div className="event-details">
                  <h4>Live Q&A Session</h4>
                  <p>Web Development Masterclass</p>
                  <span className="event-time">3:00 PM - 4:30 PM</span>
                </div>
              </div>
              <div className="event-item">
                <div className="event-date">
                  <span className="event-day">22</span>
                  <span className="event-month">May</span>
                </div>
                <div className="event-details">
                  <h4>Workshop</h4>
                  <p>UI/UX Design Principles</p>
                  <span className="event-time">1:00 PM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

export default UserDashboard
