import React, { useEffect, useState } from "react";

const ProductTable = ({ sellerId }) => {
  const [products, setProducts] = useState([]);

  const fetchSellerProducts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/products?sellerId=${sellerId}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching seller products:", err);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, [sellerId]);

  return (
    <div className="product-table">
      <h2 className="section-title">Your Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Discount (%)</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>
                  <img src={prod.imageUrl} alt={prod.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
                </td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.discount}</td>
                <td>{prod.category}</td>
                <td>{prod.stockCount}</td>
                <td style={{ maxWidth: "300px" }}>{prod.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
