import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import logo from "../assets/quitqlogo.png";
import { useAuth } from "../pages/context/AuthContext";
import { useCart } from "../pages/Cart/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    "Electronics",
    "Fashion",
    "Mobile",
    "Bags & Footwear",
    "Baby & Kids",
    "Home & Furniture",
  ];

  // Local input state synced with URL param `q`
  const params = new URLSearchParams(location.search);
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  // Keep input synchronized if someone navigates / url changes externally
  useEffect(() => {
    const p = new URLSearchParams(location.search).get("q") || "";
    setQuery(p);
  }, [location.search]);

  // Debounce updating the URL as user types
  useEffect(() => {
    const tid = setTimeout(() => {
      const cur = new URLSearchParams(location.search);
      if (query && query.trim() !== "") cur.set("q", query.trim());
      else cur.delete("q");
      // keep category param if present
      navigate(`${location.pathname}?${cur.toString()}`, { replace: true });
    }, 250); // 250ms debounce

    return () => clearTimeout(tid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Immediate update on submit (Enter or search button)
    const cur = new URLSearchParams(location.search);
    if (query && query.trim() !== "") cur.set("q", query.trim());
    else cur.delete("q");
    navigate(`${location.pathname}?${cur.toString()}`, { replace: true });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo-rectangle">
            <img src={logo} alt="QuitQ Logo" className="logo-img-rectangle" />
          </div>
        </div>

        <div className="navbar-search">
          <form className="search-bar" onSubmit={onSubmit} role="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search for anything"
              value={query}
              onChange={onInputChange}
              aria-label="Search products or categories"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="navbar-right">
          <Link
            to="/cart"
            className="nav-link cart-link"
            style={{ textDecoration: "none" }}
          >
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
              <span className="nav-link" onClick={logout} style={{ cursor: "pointer" }}>
                Logout
              </span>
            </>
          ) : (
            <>
              <span
                className="nav-link"
                onClick={() => navigate("/seller-login")}
                style={{ cursor: "pointer" }}
              >
                Become a Seller
              </span>
              <Link to="/login" className="nav-link" style={{ textDecoration: "none" }}>
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
