// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom"; // Link for routing
import "../App.css";
import logo from "../assets/quitqlogo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {/* Left-aligned Logo and Description */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="QuitQ Logo" />
          </div>
          <p className="footer-description">
            Your one-stop destination for unique finds, daily deals, and unbeatable value. Discover more with QuitQ.
          </p>
          <div className="footer-social-icons">
            <FaFacebookF className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-col">
          <h4>About QuitQ</h4>
          <ul>
            <li><Link to="/contact-us" className="footer-link">Contact Us</Link></li>
            <li><Link to="/about-us" className="footer-link">About Us</Link></li>
            <li><Link to="/careers" className="footer-link">Careers</Link></li>
            <li><Link to="/quitq-stories" className="footer-link">QuitQ Stories</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><Link to="/payments" className="footer-link">Payments</Link></li>
            <li><Link to="/shipping" className="footer-link">Shipping</Link></li>
            <li><Link to="/returns" className="footer-link">Returns</Link></li>
            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Policy</h4>
          <ul>
            <li><Link to="/return-policy" className="footer-link">Return Policy</Link></li>
            <li><Link to="/terms-of-use" className="footer-link">Terms of Use</Link></li>
            <li><Link to="/security" className="footer-link">Security</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 QuitQ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
