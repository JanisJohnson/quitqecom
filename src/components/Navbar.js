import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { FaBars, FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import logo from "../assets/quitqlogo.png";
import { useAuth } from "../pages/context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    "Electronics",
    "Fashion",
    "Mobile",
    "Bags & Footwear",
    "Baby & Kids",
    "Home & Furniture",
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left" ref={dropdownRef}>
          <div className="logo-circle">
            <img src={logo} alt="QuitQ Logo" className="logo-img" />
          </div>

          <div className="categories" onClick={toggleDropdown}>
            <FaBars className="menu-icon" />
            <span>Categories</span>
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              {categories.map((cat) => (
                <Link key={cat} to={`/?category=${encodeURIComponent(cat)}`} className="dropdown-link">
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-search">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search for anything"
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="navbar-right">
          {user ? (
            <>
              <span className="nav-link">Hello, {user.name}</span>
              <span className="nav-link" onClick={logout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" style={{ textDecoration: "none" }}>
                Login
              </Link>
              <span className="nav-link">Become a Seller</span>
            </>
          )}
          <div className="nav-link cart-link">
            <MdShoppingCart className="cart-icon" />
            <span>Cart</span>
          </div>
        </div>
      </nav>

      <div className="category-bar">
        {categories.map((cat) => (
          <Link key={cat} to={`/?category=${encodeURIComponent(cat)}`} className="category-link">
            {cat}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
