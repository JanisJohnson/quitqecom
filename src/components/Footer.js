// src/components/Footer.js
import React from "react";
import "../App.css";
import logo from "../assets/quitqlogo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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
            <FaLinkedinIn className="social-icon" />
          </div>
        </div>

        {/* Other Columns */}
        <div className="footer-col">
          <h4>About QuitQ</h4>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>QuitQ Stories</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Policy</h4>
          <ul>
            <li>Return Policy</li>
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
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
