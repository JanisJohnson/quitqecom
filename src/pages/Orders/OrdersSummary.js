// src/pages/OrderSummary/OrderSummary.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, paymentMethod, address } = location.state || {};
  const date = new Date().toLocaleDateString();

  const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(total * 0.1);
  const finalAmount = total - discount;

  return (
    <div className="order-summary-page">
      <div className="confirmation">
        <div className="checkmark">✅</div>
        <h2>Thank you</h2>
        <p>Your order has been received</p>
        <small>You will receive an email with your order details</small>
      </div>

      <div className="summary-grid">
        <div className="order-box">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> #{Math.floor(Math.random() * 9000 + 1000)}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Payment:</strong> {paymentMethod}</p>
          <p><strong>Delivery Address:</strong><br />{address}</p>
        </div>

        <div className="order-box">
          <h3>Products</h3>
          <ul>
            {products.map((item) => (
              <li key={item.id}>
                {item.quantity} × {item.name} – ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-box">
          <h3>Pricing Summary</h3>
          <p>Subtotal: ₹{total}</p>
          <p>Discount: ₹{discount}</p>
          <hr />
          <p><strong>Total: ₹{finalAmount}</strong></p>
        </div>
      </div>

      <button className="home-btn" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default OrderSummary;
