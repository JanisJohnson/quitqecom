import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders.reverse()); 
  }, []);

  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order ID: #{order.id}</h3>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Address:</strong><br />{order.address}</p>
            
            <h4>Products:</h4>
            <ul>
              {order.products.map((item) => (
                <li key={item.id}>
                  {item.quantity} × {item.name} – ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>

            <p><strong>Total Paid:</strong> ₹{order.finalAmount}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
