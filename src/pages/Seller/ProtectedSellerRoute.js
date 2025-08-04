import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSellerAuth } from "../context/SellerAuthContext";

const ProtectedSellerRoute = ({ children }) => {
  const { seller } = useSellerAuth();
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!seller?.id) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/businessDetails?sellerId=${seller.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setKycStatus(data[0].kycStatus);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching KYC status:", err);
        setLoading(false);
      });
  }, [seller]);

  if (!seller || !seller.id) {
    return <Navigate to="/seller-login" replace />;
  }

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Checking KYC status...
      </div>
    );
  }

  if (kycStatus !== "verified") {
    return <Navigate to="/pending-verification" replace />;
  }

  return children;
};

export default ProtectedSellerRoute;
