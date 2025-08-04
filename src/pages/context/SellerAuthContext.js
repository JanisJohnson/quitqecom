import React, { createContext, useContext, useState, useEffect } from "react";

const SellerAuthContext = createContext();

export const SellerAuthProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const [token, setToken] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);

  // ✅ On initial load, restore session from localStorage
  useEffect(() => {
    const storedSeller = localStorage.getItem("seller");
    const storedToken = localStorage.getItem("sellerToken");

    if (storedSeller && storedToken) {
      const parsedSeller = JSON.parse(storedSeller);
      setSeller(parsedSeller);
      setToken(storedToken);
      fetchBusinessDetails(parsedSeller.id);
    }
  }, []);

  const fetchBusinessDetails = async (sellerId) => {
    try {
      const res = await fetch(`http://localhost:5000/businessDetails?sellerId=${sellerId}`);
      const data = await res.json();
      if (data.length > 0) {
        setBusinessDetails(data[0]);
      } else {
        setBusinessDetails(null);
      }
    } catch (err) {
      console.error("❌ Failed to fetch business details:", err);
      setBusinessDetails(null);
    }
  };

  const login = (sellerData, token) => {
    // ✅ Save under consistent key: "seller"
    localStorage.setItem("seller", JSON.stringify(sellerData));
    localStorage.setItem("sellerToken", token);
    setSeller(sellerData);
    setToken(token);
    fetchBusinessDetails(sellerData.id); // 🔁 Fetch business info after login
  };

  const logout = () => {
    localStorage.removeItem("seller");
    localStorage.removeItem("sellerToken");
    setSeller(null);
    setToken(null);
    setBusinessDetails(null);
  };

  return (
    <SellerAuthContext.Provider value={{ seller, token, login, logout, businessDetails }}>
      {children}
    </SellerAuthContext.Provider>
  );
};

export const useSellerAuth = () => useContext(SellerAuthContext);

