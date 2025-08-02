// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import "../App.css";

const Home = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/products.json');
        const data = await res.json();
        const category = new URLSearchParams(location.search).get('category');
        const filtered = category
          ? data.filter((p) => p.category === category)
          : data;
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [location.search]);

  const category = new URLSearchParams(location.search).get('category');

  return (
    <div>
      {/* Full-width banner */}
      <div className="carousel-wrapper">
        <BannerSlider />
      </div>

      {/* Main content (centered) */}
      <div className="home-container">
        <h2>{category ? `${category} Products` : 'All Products'}</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
