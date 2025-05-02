"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/Navbar.css"

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()
  const profileRef = useRef(null)
  const navbarRef = useRef(null)

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isProfileMenuOpen) {
      setIsProfileMenuOpen(false)
    }
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleLogout = () => {
    onLogout()
    setIsProfileMenuOpen(false)
  }

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/courses", name: "Courses" },
    // { path: "/categories", name: "Categories" },
    { path: "/about", name: "About Us" },
    { path: "/contact", name: "Contact" },
  ]

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} ref={navbarRef}>
      <div className="navbar-container">
        <motion.div
          className="navbar-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="navbar-logo">
            <motion.i
              className="fas fa-graduation-cap"
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span>EduLearn</span>
            <div className="logo-highlight"></div>
          </Link>
        </motion.div>

        <div className="navbar-right">
          <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                className="nav-link-container"
                onHoverStart={() => setHoveredLink(link.path)}
                onHoverEnd={() => setHoveredLink(null)}
              >
                <Link to={link.path} className={`navbar-link ${location.pathname === link.path ? "active" : ""}`}>
                  {link.name}
                  {hoveredLink === link.path && (
                    <motion.span
                      className="link-underline"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Mobile auth buttons - shown inside the mobile menu */}
            {!isAuthenticated && isMobileMenuOpen && (
              <motion.div
                className="mobile-auth-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="login-button mobile">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="signup-button mobile">
                    Sign Up
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Desktop auth buttons */}
          {!isAuthenticated ? (
            <motion.div
              className="auth-buttons"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="login-button">
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="signup-button">
                  Sign Up
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="user-menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/my-courses" className="navbar-icon-link">
                  <i className="fas fa-book"></i>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/wishlist" className="navbar-icon-link">
                  <i className="fas fa-heart"></i>
                  <motion.span
                    className="notification-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    3
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/notifications" className="navbar-icon-link">
                  <i className="fas fa-bell"></i>
                  <motion.span
                    className="notification-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    3
                  </motion.span>
                </Link>
              </motion.div>

              <div className="profile-dropdown" ref={profileRef}>
                <motion.button
                  className="profile-button"
                  onClick={toggleProfileMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={user?.avatar || "/images/avatar-placeholder.jpg"}
                    alt="Profile"
                    className="profile-avatar"
                  />
                  <motion.div className="profile-indicator" animate={{ rotate: isProfileMenuOpen ? 180 : 0 }}>
                    <i className="fas fa-chevron-down"></i>
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      className="profile-dropdown-menu"
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="dropdown-user-info">
                        <div className="avatar-wrapper">
                          <img
                            src={user?.avatar || "/images/avatar-placeholder.jpg"}
                            alt="Profile"
                            className="dropdown-avatar"
                          />
                          <div className="avatar-ring"></div>
                        </div>
                        <div>
                          <h4>{user?.name || "User"}</h4>
                          <p>{user?.email || "user@example.com"}</p>
                        </div>
                      </div>

                      <div className="dropdown-links">
                        <Link to="/dashboard" className="dropdown-link">
                          <motion.div className="link-icon" whileHover={{ scale: 1.2 }}>
                            <i className="fas fa-tachometer-alt"></i>
                          </motion.div>
                          <span>Dashboard</span>
                        </Link>
                        <Link to="/my-courses" className="dropdown-link">
                          <motion.div className="link-icon" whileHover={{ scale: 1.2 }}>
                            <i className="fas fa-book"></i>
                          </motion.div>
                          <span>My Courses</span>
                        </Link>
                        <Link to="/wallet" className="dropdown-link">
                          <motion.div className="link-icon" whileHover={{ scale: 1.2 }}>
                            <i className="fas fa-wallet"></i>
                          </motion.div>
                          <span>Wallet</span>
                        </Link>
                        <Link to="/profile" className="dropdown-link">
                          <motion.div className="link-icon" whileHover={{ scale: 1.2 }}>
                            <i className="fas fa-user"></i>
                          </motion.div>
                          <span>Profile</span>
                        </Link>
                        <Link to="/settings" className="dropdown-link">
                          <motion.div className="link-icon" whileHover={{ scale: 1.2 }}>
                            <i className="fas fa-cog"></i>
                          </motion.div>
                          <span>Settings</span>
                        </Link>
                      </div>

                      <div className="dropdown-footer">
                        <motion.button
                          className="logout-button"
                          onClick={handleLogout}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          <motion.button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <motion.i
              className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
