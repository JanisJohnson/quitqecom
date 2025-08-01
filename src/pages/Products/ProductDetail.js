import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // ✅ New state
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setProduct(found);
      })
      .catch(err => console.error('Failed to load product:', err));
  }, [id]);

  if (!product) {
    return <div>Loading or Product not found.</div>;
  }

  const rawStock = product.stock ?? 0;
  const cartItem = cartItems.find(item => item.id === product.id);
  const remainingStock = rawStock - (cartItem?.quantity || 0);

  const handleAddToCart = () => {
    if (remainingStock >= quantity) {
      for (let i = 0; i < quantity; i++) {
        addToCart({ ...product });
      }
      toast.success(`${product.name} added to cart (${quantity})`);
    } else {
      toast.warning("Not enough stock");
    }
  };

  const increaseQuantity = () => {
    if (quantity < remainingStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2>{product.name}</h2>

          {/* ⭐ Static Rating */}
          <p style={{ fontSize: "1.2rem" }}>Rating: ⭐⭐⭐⭐☆</p>

          <p className="product-description">{product.description || 'No description available.'}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>In Stock:</strong> {remainingStock}</p>
          <p className="price">₹{product.price}</p>
          <p className="discount">Discount: {product.discount}%</p>
          <p><strong>Sold by:</strong> {product.company_name}</p>

          {/* ➕➖ Quantity Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
            <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} disabled={quantity >= remainingStock}>+</button>
          </div>

          <button
            className="buy-button"
            onClick={handleAddToCart}
            disabled={remainingStock <= 0}
          >
            {remainingStock > 0 ? `Add ${quantity} to Cart` : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
