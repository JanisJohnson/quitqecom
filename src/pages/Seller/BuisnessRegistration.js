import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function BuisnessRegistration() {
  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    category: "",
    gstNumber: "",
    aadhaarFileBase64: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, aadhaarFileBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create seller
      const sellerRes = await fetch("http://localhost:5000/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          company_name: form.company_name,
          products: [],
        }),
      });

      if (!sellerRes.ok) throw new Error("Seller creation failed");
      const savedSeller = await sellerRes.json();

      // Step 2: Create business details
      await fetch("http://localhost:5000/businessDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerId: savedSeller.id,
          name: form.name,
          businessName: form.company_name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          category: form.category,
          gstNumber: form.gstNumber,
          aadhaarFileBase64: form.aadhaarFileBase64 || null,
          kycStatus: "pending",
        }),
      });

      // Step 3: Add one default product
      await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          name: "Sample Product",
          price: 500,
          discount: 10,
          imageUrl: "https://via.placeholder.com/150",
          category: form.category,
          description: "This is a sample product added during registration.",
          stockCount: 10,
          sellerId: savedSeller.id,
          company_name: form.company_name,
        }),
      });

      alert("Seller registered successfully. Awaiting verification.");
      navigate("/pending-verification");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2 className="registration-title">Create Seller Account</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="company_name" placeholder="Company" onChange={handleChange} required />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|in|org|net)$"
            title="Enter a valid email ending in .com, .in, .org, or .net"
          />

         <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
            title="Password must be at least 8 characters and include at least one special character (!@#$%^&*)"
         />


          <div className="form-row">
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
              pattern="\d{10}"
              maxLength="10"
              title="Enter a 10-digit phone number"
            />
            <input name="address" placeholder="Address" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <input name="city" placeholder="City" onChange={handleChange} required />
            <select
            name="category"
            onChange={handleChange}
            required
            value={form.category}
            className="styled-input"
           >
          <option value="" disabled>Select Product Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="mobile">Mobile</option>
          <option value="bags & footwear">Bags & Footwear</option>
          <option value="baby & kids">Baby & Kids</option>
          <option value="home & furniture">Home & Furniture</option>
         </select>


          </div>

          <input
            name="gstNumber"
            placeholder="GST Number"
            onChange={handleChange}
            required
            maxLength="15"
            pattern="^[0-9A-Z]{15}$"
            title="Enter a valid 15-character GSTIN"
          />

          <label className="upload-label">Upload Aadhaar (PDF/Image)</label>
          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} required />

          <button type="submit" className="register-btn">
            Register and Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BuisnessRegistration;
