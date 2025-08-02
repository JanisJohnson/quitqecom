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
import PaymentPage from "./pages/PaymentPage";
import TrackOrder from "./pages/TrackOrder";

// Footer Pages (single component)
import FooterContent from "./pages/FooterContent";

// Context
import { CartProvider } from "./pages/Cart/CartContext";
import { AuthProvider } from "./pages/context/AuthContext";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <div className="app-container">
            <Navbar />

            <div className="content">
              <Routes>
                {/* Core Pages */}
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

                {/* Admin Route */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <h1>Welcome Admin!</h1>
                    </ProtectedRoute>
                  }
                />

                {/* === Footer Pages === */}
                <Route path="/about-us" element={<FooterContent />} />
                <Route path="/contact-us" element={<FooterContent />} />
                <Route path="/careers" element={<FooterContent />} />
                <Route path="/quitq-stories" element={<FooterContent />} />
                <Route path="/payments" element={<FooterContent />} />
                <Route path="/shipping" element={<FooterContent />} />
                <Route path="/returns" element={<FooterContent />} />
                <Route path="/faq" element={<FooterContent />} />
                <Route path="/return-policy" element={<FooterContent />} />
                <Route path="/terms-of-use" element={<FooterContent />} />
                <Route path="/security" element={<FooterContent />} />
                <Route path="/privacy" element={<FooterContent />} />
                {/* === End Footer Pages === */}

                {/* 404 Fallback */}
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
