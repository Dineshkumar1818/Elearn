"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CourseDetails from "./pages/CourseDetails"
import UserDashboard from "./pages/UserDashboard"
import MyCourses from "./pages/MyCourses"
import Wallet from "./pages/Wallet"
import VideoPlayer from "./pages/VideoPlayer"
import Courses from "./pages/Courses"
import Categories from "./pages/Categories"
import About from "./pages/About"
import Contact from "./pages/Contact"

// Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup onLogin={handleLogin} />}
            />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UserDashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyCourses user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Wallet user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video/:courseId/:moduleId/:videoId"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <VideoPlayer user={user} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
