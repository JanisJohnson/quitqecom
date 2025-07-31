import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => setError("Failed to load product"));
  }, [id]);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const base64Image = await toBase64(files[0]);
      setFormData({ ...formData, image: base64Image });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }
    if (formData.stock < 0) {
      setError("Stock cannot be negative");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to update product");

      setError("");
      setSuccess(true);

      setTimeout(() => navigate("/seller"), 1000);
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Edit Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Product updated successfully!</p>}

      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />

        <label>Price ($)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Stock Count</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>

        <label>Product Image</label>
        {formData.image && (
          <div style={{ marginBottom: "10px" }}>
            <img src={formData.image} alt="Product" width="100" />
          </div>
        )}
        <input type="file" name="image" onChange={handleChange} />

        <label>Seller Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Seller Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate("/seller")}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;


