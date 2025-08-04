import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../pages/Cart/CartContext';
import { toast } from 'react-toastify'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`); 
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
