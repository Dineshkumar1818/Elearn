import { Link } from "react-router-dom"
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <i className="fas fa-graduation-cap"></i>
            <span>EduLearn</span>
          </div>

          <div className="footer-description">
            <p>
              EduLearn is a leading online learning platform that helps anyone learn business, software, technology, and
              creative skills to achieve personal and professional goals.
            </p>
          </div>

          <div className="footer-social">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-links-column">
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/press">Press</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/affiliates">Affiliates</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Community</h3>
            <ul>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
              <li>
                <Link to="/developers">Developers</Link>
              </li>
              <li>
                <Link to="/beta-testers">Beta Testers</Link>
              </li>
              <li>
                <Link to="/forum">Forum</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Support</h3>
            <ul>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/system-status">System Status</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Legal</h3>
            <ul>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/copyright">Copyright</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest news and updates delivered straight to your inbox.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} EduLearn. All rights reserved.</p>
          </div>

          <div className="footer-payment">
            <span>Payment Methods:</span>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-apple-pay"></i>
            </div>
          </div>

          <div className="footer-language">
            <select>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
