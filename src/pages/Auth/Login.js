import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../../App.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); 

  
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPassword = (password) => password.length >= 8;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

   
    const fakeToken = "demo-token";

    const fakeUser = {
      id: 101,
      name: "Demo User",
      email: email,
      password: password,
      contact_number: "9876543210",
      role: "seller", 
    };

    login(fakeToken, fakeUser); 
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-greeting">
          <h3>Hello User,</h3>
          <p>To access your QuitQ account, please login.</p>
        </div>
        <div className="auth-header">
          <h2>Login</h2>
          <Link to="/register" className="auth-switch">
            Register
          </Link>
        </div>
        <form className="auth-form" onSubmit={handleLogin}>
          <label>Email address</label>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>

          <p className="auth-disclaimer">
            By clicking <strong>Login</strong>, you agree to QuitQ’s
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              {" "}
              Terms of Use{" "}
            </a>
            and
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              {" "}
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;