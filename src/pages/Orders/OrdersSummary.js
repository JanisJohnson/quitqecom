import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    orderId,
    products,
    total,
    discount,
    finalAmount,
    address,
    paymentMethod,
    date,
  } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/'); // Redirect if accessed directly
    }
  }, [location.state, navigate]);

  return (
    <div className="order-summary-page">
      <div className="confirmation">
        <div className="checkmark">✅</div>
        <h2>Thanks for your order!</h2>
        <p>Your order was placed successfully.</p>
      </div>

      <div className="summary-grid">
        <div className="order-box">
          <h3>Order Info</h3>
          <ul>
            <li><strong>Order ID:</strong> {orderId}</li>
            <li><strong>Date:</strong> {date}</li>
            <li><strong>Payment Method:</strong> {paymentMethod}</li>
          </ul>
        </div>

        <div className="order-box">
          <h3>Shipping Address</h3>
          <ul>
            <li>{address.name}</li>
            <li>{address.street}, {address.city}</li>
            <li>{address.state} - {address.pincode}</li>
            <li>{address.phone}</li>
          </ul>
        </div>

        <div className="order-box">
          <h3>Products</h3>
          <ul>
            {products?.map((product, idx) => (
              <li key={idx}>{product.name} × {product.quantity}</li>
            ))}
          </ul>
        </div>

        <div className="order-box">
          <h3>Price Summary</h3>
          <ul>
            <li><strong>Total:</strong> ₹{total}</li>
            <li><strong>Discount:</strong> -₹{discount}</li>
            <li><strong>Final Amount:</strong> ₹{finalAmount}</li>
          </ul>
        </div>
      </div>

      <button className="home-btn" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

export default OrderSummary;
