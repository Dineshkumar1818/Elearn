"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/Auth.css"

const Signup = ({ onLogin }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      setTimeout(() => {
        // Mock successful signup
        const userData = {
          id: 1,
          name: name,
          email: email,
          wallet: {
            balance: 0,
            transactions: [],
          },
          enrolledCourses: [],
          progress: {
            totalCourses: 0,
            completed: 0,
            pendingHours: 0,
            weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
          },
        }

        onLogin(userData)
        navigate("/dashboard")
        setIsLoading(false)
      }, 1500)
    } catch (err) {
      setError("Error creating account. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <motion.div
        className="auth-form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Create Your Account</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="social-button google">
            <i className="fab fa-google"></i> Continue with Google
          </button>
          <button className="social-button facebook">
            <i className="fab fa-facebook-f"></i> Continue with Facebook
          </button>
        </div>

        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>

      <div className="auth-image">
        <div className="auth-image-content">
          <h2>Join Our Learning Community</h2>
          <p>Start your learning journey today and unlock your potential.</p>
        </div>
      </div>
    </div>
  )
}

export default Signup
