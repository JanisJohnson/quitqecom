import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import ProductDetail from "./pages/Products/ProductDetail";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart"; // Make sure Cart.js exists

// Context
import { AuthProvider } from "./pages/context/AuthContext";
import { CartProvider } from "./pages/Cart/CartContext";

// Temporary Admin Dashboard
const AdminDashboard = () => <h1>Welcome Admin!</h1>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <Navbar />

            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<div>404 Page Not Found</div>} />
              </Routes>
            </div>

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
