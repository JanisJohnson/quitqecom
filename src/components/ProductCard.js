import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../pages/Cart/CartContext'; // ✅ import useCart

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link
    addToCart(product);
    navigate("/cart"); // ✅ Go to cart
  };

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>{product.discount}% OFF</p>
        <p>Sold by: {product.company_name}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductCard;



