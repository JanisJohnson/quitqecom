// pages/Seller/ProfilePage.js
import React from "react";
import { useOutletContext } from "react-router-dom";
import SellerProfileCard from "./SellerProfileCard";

const ProfilePage = () => {
  const { seller, businessDetails } = useOutletContext();

  return (
    <div className="section">
      <h2 className="section-title">Profile</h2>
      <div className="card">
        <SellerProfileCard seller={seller} businessDetails={businessDetails} />
      </div>
    </div>
  );
};

export default ProfilePage;
