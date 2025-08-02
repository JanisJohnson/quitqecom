import React, { useEffect, useState } from "react";

const OrderList = ({ sellerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:5000/orders");
      const allOrders = await res.json();
      const sellerOrders = allOrders.filter(
        (o) => parseInt(o.sellerId) === parseInt(sellerId)
      );
      setOrders(sellerOrders);
    };

    fetchOrders();
  }, [sellerId]);

  return (
    <div className="order-list-container">
      <h2 className="section-title">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-cards-wrapper">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <h3 className="order-id">Order ID: #{order.id}</h3>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Address:</strong>
                <br />
                {order.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
