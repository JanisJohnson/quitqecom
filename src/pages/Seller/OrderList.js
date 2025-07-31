import React, { useEffect, useState } from "react";

const OrderList = ({ sellerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:5000/orders");
      const allOrders = await res.json();
      const sellerOrders = allOrders.filter(o => parseInt(o.sellerId) === parseInt(sellerId));
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
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Buyer</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.orderId}</td>
                <td>{o.productId}</td>
                <td>{o.buyerName}</td>
                <td>{o.quantity}</td>
                <td>₹{o.totalPrice}</td>
                <td>{o.status}</td>
                <td>{o.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;

