import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    // copy then reverse to avoid mutating localStorage data
    const reversed = [...storedOrders].reverse();
    setOrders(reversed);
  }, []);

  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id || Math.random()} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>

            <div>
              <strong>Address:</strong>
              {order.address ? (
                <div style={{ marginTop: 6 }}>
                  {/* Render each address field explicitly */}
                  {order.address.fullName && <div>{order.address.fullName}</div>}
                  {order.address.street && <div>{order.address.street}</div>}
                  {(order.address.city || order.address.state || order.address.pincode) && (
                    <div>
                      {order.address.city ? `${order.address.city}` : ""}
                      {order.address.city && order.address.state ? ", " : ""}
                      {order.address.state ? `${order.address.state}` : ""}
                      {order.address.pincode ? ` - ${order.address.pincode}` : ""}
                    </div>
                  )}
                  {order.address.country && <div>{order.address.country}</div>}
                  {order.address.phone && <div>Phone: {order.address.phone}</div>}
                </div>
              ) : (
                <div style={{ marginTop: 6 }}>No shipping address</div>
              )}
            </div>

            <h4 style={{ marginTop: 12 }}>Products:</h4>
            <ul>
              {Array.isArray(order.products) && order.products.length > 0 ? (
                order.products.map((item) => (
                  <li key={item.id || `${item.name}-${Math.random()}`}>
                    {item.quantity} × {item.name} – ₹{item.price * item.quantity}
                  </li>
                ))
              ) : (
                <li>No products found for this order.</li>
              )}
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
