import React, { useEffect, useState } from "react";

const SellerProfileCard = ({ seller }) => {
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const res = await fetch("http://localhost:5000/businessDetails");
        const data = await res.json();
        const matched = data.find((b) => b.sellerId === seller.id);
        setBusiness(matched || null);
      } catch (error) {
        console.error("Failed to load business details", error);
      }
    };

    if (seller?.id) {
      fetchBusinessDetails();
    }
  }, [seller]);

  return (
    <div className="seller-profile-card">
      <h2>Seller Profile</h2>
      {business ? (
        <div className="profile-details">
          <div className="profile-row">
            <span className="label"> Name:</span>
            <span>{seller.name}</span>
          </div>
          <div className="profile-row">
            <span className="label">Business:</span>
            <span>{business.businessName}</span>
          </div>
          <div className="profile-row">
            <span className="label"> Email:</span>
            <span>{seller.email}</span>
          </div>
          <div className="profile-row">
            <span className="label"> Phone:</span>
            <span>{business.phone}</span>
          </div>
          <div className="profile-row">
            <span className="label">Address:</span>
            <span>{business.address}</span>
          </div>
        </div>
      ) : (
        <p>Loading business info...</p>
      )}
    </div>
  );
};

export default SellerProfileCard;
