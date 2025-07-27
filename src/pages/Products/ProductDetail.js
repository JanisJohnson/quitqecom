import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-description">{product.description || 'No description available.'}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>In Stock:</strong> {product.stock || 50}</p>
          <p className="price">₹{product.price}</p>
          <p className="discount">Discount: {product.discount}%</p>
          <p><strong>Sold by:</strong> {product.company_name}</p> {/* ✅ NEW */}
          {/* Optional Debug Info: */}
          {/* <p><strong>Seller ID:</strong> {product.sellerId}</p> */}
          <button className="buy-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
