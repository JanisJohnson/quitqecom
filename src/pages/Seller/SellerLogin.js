import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSellerAuth } from "../context/SellerAuthContext";

function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useSellerAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/sellers");
      const sellers = await res.json();

      const matchedSeller = sellers.find(
        (s) => s.email === email && s.password === password
      );

      if (!matchedSeller) {
        alert("Invalid credentials");
        return;
      }

      const businessRes = await fetch(
        `http://localhost:5000/businessDetails?sellerId=${matchedSeller.id}`
      );
      const business = await businessRes.json();
      const kycStatus = business[0]?.kycStatus || "pending";

      const sellerData = {
        id: matchedSeller.id,
        name: matchedSeller.name,
        email: matchedSeller.email,
        company_name: matchedSeller.company_name,
        products: matchedSeller.products || [],
      };

      // ✅ Set login context AFTER confirming KYC
      login(sellerData, "mock-token-123");

      alert("Login successful");

      // ✅ Navigate after login context is set
      if (kycStatus === "verified") {
        navigate("/seller", { replace: true });
      } else {
        navigate("/pending-verification", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="welcome-text">Hello Seller,</h2>
        <p className="sub-text">
          To access your QuitQ seller account, please login.
        </p>

        <h3 className="login-title">Login</h3>

        <form onSubmit={handleLogin} className="login-form">
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

          <button type="submit" className="login-btn">
            Login
          </button>
          <br></br>
          <button
            type="button"
            className="register-btn"
            onClick={() => navigate("/buisness-register")}
          >
            Register
          </button>
        </form>

        <p className="terms-text">
          By clicking <b>Login</b>, you agree to QuitQ's{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;
