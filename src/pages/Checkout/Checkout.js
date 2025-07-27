// src/pages/Checkout/Checkout.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("123 Main Street, Chennai, India");

  const products = location.state?.product ? [location.state.product] : cartItems;

  const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(total * 0.1);
  const finalAmount = total - discount;

  const handleConfirmOrder = () => {
    navigate("/order-summary", {
      state: {
        paymentMethod,
        products,
        total,
        discount,
        finalAmount,
        address,
      },
    });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <div className="checkout-left">
          {/* Address Section */}
          <div className="address-section">
            <h3>Delivery Address</h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
            />
            <div className="address-actions">
              <button onClick={() => navigate("/cart")}>Go Back to Cart</button>
              <button onClick={() => setAddress("")}>Change Address</button>
            </div>
          </div>

          {/* Payment Section */}
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Card
            </label>
          </div>

          {/* Order Summary */}
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
            <p>Total MRP: ₹{total}</p>
            <p>Discount: ₹{discount}</p>
            <hr />
            <p><strong>Final Amount: ₹{finalAmount}</strong></p>
            <button className="confirm-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
