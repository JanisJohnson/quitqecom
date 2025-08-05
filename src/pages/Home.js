// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";
import "../App.css";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]); // raw products
  const [products, setProducts] = useState([]); // filtered shown products

  // Load all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setAllProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Recompute filtered products when URL params or allProducts change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category") || "";
    const q = (params.get("q") || "").trim().toLowerCase();

    let filtered = allProducts;

    // If no search query, apply category filter (if any).
    // If there is a search query, search across all products (ignore categoryParam).
    if (!q && categoryParam) {
      filtered = filtered.filter(
        (p) => (p.category || "").toLowerCase() === categoryParam.toLowerCase()
      );
    }

    if (q) {
      filtered = filtered.filter((p) => {
        const name = (p.name || p.title || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();

        return (
          name.includes(q) ||
          brand.includes(q) ||
          desc.includes(q) ||
          cat.includes(q)
        );
      });
    }

    setProducts(filtered);
  }, [location.search, allProducts]);

  const category = new URLSearchParams(location.search).get("category");
  const qParam = new URLSearchParams(location.search).get("q");

  const handleShowAll = () => {
    // Remove category while keeping other params (like q) intact
    const params = new URLSearchParams(location.search);
    params.delete("category");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Heading logic: if searching show search text, else show category or All Products
  const heading = qParam
    ? `Search results for "${qParam}"`
    : category
    ? `${category} Products`
    : "All Products";

  return (
    <div>
      <div className="carousel-wrapper">
        <BannerSlider />
      </div>

      <div className="home-container">
        {category && !qParam && (
          <div style={{ marginBottom: 12 }}>
            <button
              onClick={handleShowAll}
              className="back-all-btn"
              aria-label="Back to all products"
            >
              ← Back to All Products
            </button>
          </div>
        )}

        <h2>{heading}</h2>

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div style={{ padding: 24 }}>
              {qParam
                ? `No products found for "${qParam}".`
                : "No products found."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
