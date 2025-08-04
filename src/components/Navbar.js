import React from "react";
import "../App.css";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import logo from "../assets/quitqlogo.png";
import { useAuth } from "../pages/context/AuthContext";
import { useCart } from "../pages/Cart/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

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
        <div className="navbar-left">
          <div className="logo-rectangle">
            <img src={logo} alt="QuitQ Logo" className="logo-img-rectangle" />
          </div>
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
          <Link to="/cart" className="nav-link cart-link" style={{ textDecoration: "none" }}>
            <div className="cart-icon-wrapper">
              <MdShoppingCart className="cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-count-badge">{cartItems.length}</span>
              )}
            </div>
            <span>Cart</span>
          </Link>
          {user && (
            <Link
              to="/my-orders"
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              My Orders
            </Link>
          )}
          {user ? (
            <>
              <span className="nav-link">Hello, {user.name}</span>
              <span className="nav-link" onClick={logout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <span className="nav-link">Become a Seller</span>
              <Link
                to="/login"
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="category-bar">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/?category=${encodeURIComponent(cat)}`}
            className="category-link"
          >
            {cat}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
