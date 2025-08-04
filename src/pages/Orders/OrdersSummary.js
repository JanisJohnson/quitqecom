import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();

  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
      navigate('/'); 
    } else {
      const recent = orders[orders.length - 1]; 
      setLatestOrder(recent);
    }
  }, [navigate]);

  const copyOrderId = () => {
    if (latestOrder?.id) {
      navigator.clipboard.writeText(`#${latestOrder.id}`);
      alert("Order ID copied to clipboard!");
    }
  };

  if (!latestOrder) return null;

  return (
    <div className="order-summary-page">
      <div className="confirmation">
        <div className="checkmark"></div>
        <h2>Thanks for your order!</h2>
        <p>Your order was placed successfully.</p>
      </div>

      <div className="summary-grid">
        <div className="order-box">
          <h3>Order Info</h3>
          <ul>
            <li>
              <strong>Order ID:</strong> 
              <span className="order-id"> #{latestOrder.id} </span>
              <button className="copy-btn" onClick={copyOrderId}>Copy</button>
            </li>
            <li><strong>Date:</strong> {latestOrder.date}</li>
            <li><strong>Payment Method:</strong> {latestOrder.paymentMethod}</li>
          </ul>
        </div>

        <div className="order-box">
          <h3>Shipping Address</h3>
          <ul>
            <li>{latestOrder.address.name}</li>
            <li>{latestOrder.address.street}, {latestOrder.address.city}</li>
            <li>{latestOrder.address.state} - {latestOrder.address.pincode}</li>
            <li>{latestOrder.address.phone}</li>
          </ul>
        </div>

        <div className="order-box">
          <h3>Products</h3>
          <ul>
            {latestOrder.products?.map((product, idx) => (
              <li key={idx}>{product.name} × {product.quantity}</li>
            ))}
          </ul>
        </div>

        <div className="order-box">
          <h3>Price Summary</h3>
          <ul>
            <li><strong>Total:</strong> ₹{latestOrder.total}</li>
            <li><strong>Discount:</strong> -₹{latestOrder.discount}</li>
            <li><strong>Final Amount:</strong> ₹{latestOrder.finalAmount}</li>
          </ul>
        </div>
      </div>

      <div className="order-actions">
        <button className="home-btn" onClick={() => navigate('/')}>Go to Home</button>
        <button className="track-btn" onClick={() => navigate('/track-order')}>Track Order</button>
      </div>
    </div>
  );
};

export default OrderSummary;
