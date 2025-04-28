"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/Navbar.css"

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [location])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleLogout = () => {
    onLogout()
    setIsProfileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <i className="fas fa-graduation-cap"></i>
            <span>EduLearn</span>
          </Link>

          <div className="navbar-search">
            <input type="text" placeholder="Search for courses..." />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="navbar-right">
          <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/courses" className="navbar-link">
              Courses
            </Link>
            <Link to="/categories" className="navbar-link">
              Categories
            </Link>
            <Link to="/about" className="navbar-link">
              About Us
            </Link>
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>

            {!isAuthenticated && (
              <div className="auth-buttons mobile-only">
                <Link to="/login" className="login-button">
                  Login
                </Link>
                <Link to="/signup" className="signup-button">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {!isAuthenticated ? (
            <div className="auth-buttons desktop-only">
              <Link to="/login" className="login-button">
                Login
              </Link>
              <Link to="/signup" className="signup-button">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/my-courses" className="navbar-icon-link">
                <i className="fas fa-book"></i>
              </Link>
              <Link to="/wishlist" className="navbar-icon-link">
                <i className="fas fa-heart"></i>
              </Link>
              <Link to="/notifications" className="navbar-icon-link">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">3</span>
              </Link>

              <div className="profile-dropdown">
                <button className="profile-button" onClick={toggleProfileMenu}>
                  <img src="/images/avatar-placeholder.jpg" alt="Profile" className="profile-avatar" />
                </button>

                {isProfileMenuOpen && (
                  <motion.div
                    className="profile-dropdown-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="dropdown-user-info">
                      <img src="/images/avatar-placeholder.jpg" alt="Profile" className="dropdown-avatar" />
                      <div>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="dropdown-links">
                      <Link to="/dashboard" className="dropdown-link">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/my-courses" className="dropdown-link">
                        <i className="fas fa-book"></i>
                        <span>My Courses</span>
                      </Link>
                      <Link to="/wallet" className="dropdown-link">
                        <i className="fas fa-wallet"></i>
                        <span>Wallet</span>
                      </Link>
                      <Link to="/profile" className="dropdown-link">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                      </Link>
                      <Link to="/settings" className="dropdown-link">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="dropdown-footer">
                      <button className="logout-button" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
