import React, { useEffect, useState } from 'react';
import '../../App.css'; // using your existing App.css

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  return (
    <div className="slider-container">
      <div className="slider-track">
        {products.map(product => (
          <div key={product.id} className="slider-item">
            <img src={product.imageUrl} alt={product.name} className="slider-image" />
            <p className="slider-name">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
