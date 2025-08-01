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

  const validateForm = () => {
    const newErrors = {};
    const { fullName, phone, street, city, state, pincode, country } = address;

    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    else if (fullName.trim().length < 3) newErrors.fullName = "Minimum 3 characters required.";

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(phone)) newErrors.phone = "Invalid phone number.";

    if (!street.trim()) newErrors.street = "Street is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!state.trim()) newErrors.state = "State is required.";

    const pincodeRegex = /^\d{6}$/;
    if (!pincode.trim()) newErrors.pincode = "Pincode is required.";
    else if (!pincodeRegex.test(pincode)) newErrors.pincode = "Invalid pincode.";

    if (!country.trim()) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (!validateForm()) return;

    const orderData = {
      paymentMethod,
      products,
      total,
      discount,
      finalAmount,
      address,
    };

    localStorage.setItem("shippingAddress", JSON.stringify(address));

    if (paymentMethod === "Card") {
      navigate("/payment", { state: orderData });
    } else {
      navigate("/order-summary", { state: orderData });
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
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={address.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleInputChange}
            />
            {errors.street && <p className="error-text">{errors.street}</p>}

            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleInputChange}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}

            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleInputChange}
            />
            {errors.state && <p className="error-text">{errors.state}</p>}

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleInputChange}
            />
            {errors.pincode && <p className="error-text">{errors.pincode}</p>}

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleInputChange}
            />
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
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> UPI
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> Card
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
