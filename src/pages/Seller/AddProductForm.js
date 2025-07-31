import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


const AddProductForm = ({ sellerId, companyName, onProductAdded }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    imageUrl: "",
    category: "",
    description: "",
    stockCount: ""
  });

  // ✅ Load products for this seller
  useEffect(() => {
    fetch(`http://localhost:5000/products?sellerId=${sellerId}`)
      .then((res) => res.json())
      .then(setProducts);
  }, [sellerId]);

  // ✅ Handle input for new product
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Add product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      id: uuidv4(),
      ...formData,
      price: parseFloat(formData.price),
      discount: parseInt(formData.discount || 0, 10),
      stockCount: parseInt(formData.stockCount || 0, 10),
      sellerId,
      company_name: companyName
    };

    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    setProducts((prev) => [...prev, newProduct]);
    onProductAdded?.();

    // reset form
    setFormData({
      name: "",
      price: "",
      discount: "",
      imageUrl: "",
      category: "",
      description: "",
      stockCount: ""
    });
  };

  // ✅ Inline update stock count
  const handleStockUpdate = async (id, stockCount) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, stockCount } : p
    );
    setProducts(updatedProducts);

    await fetch(`http://localhost:5000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockCount })
    });
  };

  return (
    <div className="product-table-container">
      <h2 className="section-title">Manage Products</h2>
      <div className="table-scroll">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Discount (%)</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {/* Existing Products */}
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-img"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.discount}</td>
                <td>{product.category}</td>
                <td>
                  <input
                    type="number"
                    className="stock-input"
                    value={product.stockCount}
                    onChange={(e) =>
                      handleStockUpdate(product.id, e.target.value)
                    }
                  />
                </td>
                <td>{product.description}</td>
              </tr>
            ))}

            {/* New Product Row */}
            <tr className="add-row">
              <td>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                  required
                />
              </td>
              <td>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                />
              </td>
              <td>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                />
              </td>
              <td>
                <input
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Discount"
                />
              </td>
              <td>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                />
              </td>
              <td>
                <input
                  name="stockCount"
                  type="number"
                  value={formData.stockCount}
                  onChange={handleChange}
                  placeholder="Qty"
                  required
                />
              </td>
              <td>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit} className="add-btn">
        + Add Product
      </button>
    </div>
  );
};

export default AddProductForm;
