import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleTrack = async () => {
    setError("");
    setTracking(null);

    try {
      const dummyData = {
        courier_name: "Delhivery",
        tracking_number: "DL123456789",
        status: "Out for Delivery",
        estimated_delivery: "2025-08-04T15:00:00",
      };

      if (orderId === "101") {
        setTracking(dummyData);
      } else {
        throw new Error("Tracking details not found.");
      }
    } catch (err) {
      setError("No tracking info found for that Order ID.");
    }
  };

  return (
    <div className="track-order-container">
      {/* Styled Home Button */}
      <button className="track-btn home-track-btn" onClick={() => navigate("/")}>
        Home
      </button>

      <h2>Track Your Order</h2>

      <p className="track-desc">
        To track your order please enter your Order ID in the box below and press the
        <strong> “Track Order”</strong> button. This was given to you on your receipt.
      </p>

      <label className="track-label">Order ID *</label>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter Your Order ID"
        className="track-input"
      />

      <label className="track-label">Billing Email *</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Address"
        className="track-input"
      />

      <button onClick={handleTrack} className="track-btn">Track Order</button>

      {error && <p className="error-msg">{error}</p>}

      {tracking && (
        <div className="tracking-info">
          <p><strong>Status:</strong> {tracking.status}</p>
          <p><strong>Courier:</strong> {tracking.courier_name}</p>
          <p><strong>Tracking No:</strong> {tracking.tracking_number}</p>
          <p><strong>Estimated Delivery:</strong> {new Date(tracking.estimated_delivery).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;



