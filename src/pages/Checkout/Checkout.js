import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const products = location.state?.product ? [location.state.product] : cartItems;
  const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(total * 0.1);
  const finalAmount = total - discount;

  const generateOrderId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `#${random}`;
  };

  // Address form validation only (minimal, strict checks)
  const validateForm = () => {
    const newErrors = {};
    const { fullName, phone, street, city, state, pincode, country } = address;

    // Full name: required, min 3 chars, letters/spaces allowed
    if (!fullName || !fullName.toString().trim()) newErrors.fullName = "Full Name is required.";
    else if (fullName.toString().trim().length < 3) newErrors.fullName = "Minimum 3 characters required.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(fullName.toString().trim())) newErrors.fullName = "Only letters and spaces allowed.";

    // Phone: required, Indian 10-digit mobile format
    if (!phone || !phone.toString().trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[6-9]\d{9}$/.test(phone.toString().trim())) newErrors.phone = "Invalid phone number.";

    // Street: required, reasonable length
    if (!street || !street.toString().trim()) newErrors.street = "Street is required.";
    else if (street.toString().trim().length < 5) newErrors.street = "Enter a more detailed street address.";

    // City: required, letters/spaces
    if (!city || !city.toString().trim()) newErrors.city = "City is required.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(city.toString().trim())) newErrors.city = "City can contain only letters and spaces.";

    // State: required, letters/spaces
    if (!state || !state.toString().trim()) newErrors.state = "State is required.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(state.toString().trim())) newErrors.state = "State can contain only letters and spaces.";

    // Pincode: required, 6 digits
    if (!pincode || !pincode.toString().trim()) newErrors.pincode = "Pincode is required.";
    else if (!/^\d{6}$/.test(pincode.toString().trim())) newErrors.pincode = "Invalid pincode.";

    // Country: required, letters/spaces
    if (!country || !country.toString().trim()) newErrors.country = "Country is required.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(country.toString().trim())) newErrors.country = "Country can contain only letters and spaces.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (!validateForm()) return;

    const orderId = generateOrderId();

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString(),
      paymentMethod,
      products,
      total,
      discount,
      finalAmount,
      address,
    };

    const prevOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...prevOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.setItem("shippingAddress", JSON.stringify(address));

    if (paymentMethod === "Card") {
      navigate("/payment", { state: newOrder });
    } else {
      navigate("/order-summary", { state: newOrder });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="checkout-left">
          <h3>Delivery Address</h3>
          <div className="checkout-form-group">
            <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleInputChange} />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <input type="text" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleInputChange} />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <input type="text" name="street" placeholder="Street" value={address.street} onChange={handleInputChange} />
            {errors.street && <p className="error-text">{errors.street}</p>}

            <input type="text" name="city" placeholder="City" value={address.city} onChange={handleInputChange} />
            {errors.city && <p className="error-text">{errors.city}</p>}

            <input type="text" name="state" placeholder="State" value={address.state} onChange={handleInputChange} />
            {errors.state && <p className="error-text">{errors.state}</p>}

            <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleInputChange} />
            {errors.pincode && <p className="error-text">{errors.pincode}</p>}

            <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleInputChange} />
            {errors.country && <p className="error-text">{errors.country}</p>}
          </div>

          <div className="address-actions">
            <button onClick={() => navigate("/cart")}>Go Back to Cart</button>
            <button
              onClick={() => {
                setAddress({
                  fullName: "",
                  phone: "",
                  street: "",
                  city: "",
                  state: "",
                  pincode: "",
                  country: "",
                });
                setErrors({});
              }}
            >
              Clear Address
            </button>
          </div>

          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
            </label>
            <label>
              <input type="radio" name="payment" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} /> UPI
            </label>
            <label>
              <input type="radio" name="payment" value="Card" checked={paymentMethod === "Card"} onChange={(e) => setPaymentMethod(e.target.value)} /> Card
            </label>
          </div>

          <h3>Order Summary</h3>
          <ul className="checkout-products">
            {products.map((item) => (
              <li key={item.id} className="checkout-product">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price} × {item.quantity}</p>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="checkout-right">
          <div className="summary-box">
            <h4>Price Details</h4>
            <p><span>Total MRP:</span> <span>₹{total}</span></p>
            <p><span>Discount:</span> <span>₹{discount}</span></p>
            <hr />
            <p><strong>Final Amount:</strong> <strong>₹{finalAmount}</strong></p>
            <button className="confirm-btn" onClick={handleConfirmOrder}>Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
