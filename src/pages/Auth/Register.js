import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Regex-based validations
  const isValidName = (name) => {
    return /^[A-Za-z\s]+$/.test(name.trim()); // only letters and spaces
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidName(name)) {
      alert("Name should only contain letters and spaces.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // ✅ Passed all checks
    console.log("Registered with:", name, email, password);
    alert("Registration successful (demo)");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Greeting */}
        <div className="auth-greeting">
          <h3>Welcome to QuitQ!</h3>
          <p>Create your account to explore unique finds and great deals.</p>
        </div>

        {/* Header + Login Switch */}
        <div className="auth-header">
          <h2>Register</h2>
          <Link to="/login" className="auth-switch">Login</Link>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">Register</button>

          {/* Legal Text */}
          <p className="auth-disclaimer">
            By clicking <strong>Register</strong>, you agree to QuitQ’s
            <a href="/terms" target="_blank" rel="noopener noreferrer"> Terms of Use </a>
            and
            <a href="/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
