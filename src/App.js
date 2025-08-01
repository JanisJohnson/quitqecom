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
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderSummary from "./pages/Orders/OrdersSummary";
import MyOrders from "./pages/Orders/MyOrders";
import PaymentPage from "./pages/PaymentPage"; // ✅ Make sure this path exists
import TrackOrder from './pages/TrackOrder';



// Context
import { CartProvider } from "./pages/Cart/CartContext";
import { AuthProvider } from "./pages/context/AuthContext";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Temporary Admin Dashboard
const AdminDashboard = () => <h1>Welcome Admin!</h1>;

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <div className="app-container">
            <Navbar />

            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-summary" element={<OrderSummary />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/track-order" element={<TrackOrder />} />

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

          <ToastContainer position="bottom-right" autoClose={3000} />
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
