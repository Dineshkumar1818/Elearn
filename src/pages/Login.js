"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/Auth.css"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Add style for checkbox on component mount
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    
    // Add the CSS rules
    style.innerHTML = `
      /* Custom Checkbox Styling */
      .remember-me input[type="checkbox"] {
        width: 18px;
        height: 18px;
        appearance: auto;
        -webkit-appearance: auto;
        -moz-appearance: auto;
        border: 1px solid #cbd5e1;
        border-radius: 3px;
        background-color: white;
        vertical-align: middle;
        position: relative;
        margin-right: 8px;
        cursor: pointer;
      }

      .remember-me input[type="checkbox"]:checked {
        background-color: #6366f1;
        border-color: #6366f1;
      }

      .remember-me input[type="checkbox"]:checked::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 2px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .remember-me {
        display: flex;
        align-items: center;
        margin: 12px 0;
        font-size: 14px;
      }

      .remember-me label {
        cursor: pointer;
        user-select: none;
        margin-left: 4px;
        color: #334155;
      }

      .remember-me input[type="checkbox"]:focus {
        outline: 2px solid rgba(99, 102, 241, 0.5);
        outline-offset: 1px;
      }

      .remember-me input[type="checkbox"]:hover {
        border-color: #6366f1;
      }
    `;
    
    // Append the style element to the head
    document.head.appendChild(style);
    
    // Clean up function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate form
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      setTimeout(() => {
        // Mock successful login
        const userData = {
          id: 1,
          name: "John Doe",
          email: email,
          wallet: {
            balance: 500,
            transactions: [],
          },
          enrolledCourses: [1, 3, 5],
          progress: {
            totalCourses: 3,
            completed: 1,
            pendingHours: 24,
            weeklyProgress: [2, 3, 1, 5, 2, 0, 4],
          },
        }

        onLogin(userData)
        navigate("/dashboard")
        setIsLoading(false)
      }, 1500)
    } catch (err) {
      setError("Invalid email or password")
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
        <h2>Login to Your Account</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
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
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </motion.div>

      <div className="auth-image">
        <div className="auth-image-content">
          <h2>Expand Your Knowledge</h2>
          <p>Access thousands of courses from expert instructors around the world.</p>
        </div>
      </div>
    </div>
  )
}

export default Login