import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSellerAuth } from "../context/SellerAuthContext";
import { useNavigate } from "react-router-dom";
import SellerProfileCard from "./SellerProfileCard";
import AddProductForm from "./AddProductForm";
import OrderList from "./OrderList";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SellerDashboard = () => {
  const { seller } = useSellerAuth();
  const navigate = useNavigate();

  const [businessDetails, setBusinessDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Refs for sidebar navigation
  const profileRef = useRef(null);
  const addProductRef = useRef(null);
  const viewOrdersRef = useRef(null);

  /* fetch business details */
  useEffect(() => {
    if (seller?.id) {
      fetch(`http://localhost:5000/businessDetails?sellerId=${seller.id}`)
        .then((r) => r.json())
        .then((d) => d.length && setBusinessDetails(d[0]));
    }
  }, [seller]);

  /* fetch products */
  const loadProducts = useCallback(() => {
    if (seller?.id) {
      fetch(`http://localhost:5000/products?sellerId=${seller.id}`)
        .then((r) => r.json())
        .then(setProducts);
    }
  }, [seller]);

  useEffect(loadProducts, [loadProducts]);

  /* fetch orders */
  useEffect(() => {
    if (seller?.id) {
      fetch(`http://localhost:5000/orders?sellerId=${seller.id}`)
        .then((r) => r.json())
        .then(setOrders);
    }
  }, [seller]);

  if (!seller) return <p>Loading seller info...</p>;

  const handleLogout = () => {
    localStorage.removeItem("seller");
    navigate("/seller-login");
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Dummy chart data (replace later with real)
  const chartData = [
    { month: "Jan", sales: 30, uploads: 10 },
    { month: "Feb", sales: 45, uploads: 20 },
    { month: "Mar", sales: 60, uploads: 25 },
    { month: "Apr", sales: 50, uploads: 15 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Seller Dashboard</h3>
        <ul>
          <li onClick={() => scrollToSection(profileRef)}>Profile</li>
          <li onClick={() => scrollToSection(addProductRef)}>Manage Products</li>
          <li onClick={() => scrollToSection(viewOrdersRef)}>Orders</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Welcome, {seller.name}</h1>
        </div>


        {/* Seller Profile */}
        <div ref={profileRef} style={{ marginTop: "30px" }}>
          <SellerProfileCard seller={seller} businessDetails={businessDetails} />
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Sales Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#00bcd4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card">
            <h3>Product Uploads</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="uploads" stroke="#ff9800" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* Manage Products */}
        <div ref={addProductRef} style={{ marginTop: "30px" }}>
        
          <AddProductForm
            sellerId={seller.id}
            companyName={businessDetails?.businessName || seller.company_name}
            onProductAdded={loadProducts}
          />
        </div>

        {/* Recent Orders */}
        <div ref={viewOrdersRef} className="orders-section">
          
          <OrderList sellerId={seller.id} />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
