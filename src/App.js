import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./Admin.css";
import "./Seller.css";

// === User Components ===
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// === User Pages ===
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
import FooterContent from "./pages/FooterContent";

// === Seller Pages ===
import SellerDashboard from "./pages/Seller/SellerDashboard";
import AddProductForm from "./pages/Seller/AddProductForm";
import EditProduct from "./pages/Seller/EditProduct";
import SellerLogin from "./pages/Seller/SellerLogin";
import BuisnessRegistration from "./pages/Seller/BuisnessRegistration";
import PendingVerification from "./pages/Seller/PendingVerification";
import ProtectedSellerRoute from "./pages/Seller/ProtectedSellerRoute";
import ProfilePage from "./pages/Seller/ProfilePage";

// === Admin Pages ===
import AdminDashboard from "./pages/Admin/AdminDashboard";
import KYCApproval from "./pages/Admin/KYCApproval";

// === Context Providers ===
import { CartProvider } from "./pages/Cart/CartContext";
import { AuthProvider } from "./pages/context/AuthContext";
import { SellerAuthProvider } from "./pages/context/SellerAuthContext";

// === Toast ===
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <SellerAuthProvider>
            <AppContent />
            <ToastContainer position="bottom-right" autoClose={3000} />
          </SellerAuthProvider>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

// === Main layout inside Router ===
function AppContent() {
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith("/seller");
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      <Navbar />

      <div className="content">
        <Routes>
          {/* === Public Routes === */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/buisness-register" element={<BuisnessRegistration />} />
          <Route path="/buisness-register/:sellerId" element={<BuisnessRegistration />} />
          <Route path="/pending-verification" element={<PendingVerification />} />

          {/* === Protected User Routes === */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-summary"
            element={
              <ProtectedRoute>
                <OrderSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-order"
            element={
              <ProtectedRoute>
                <TrackOrder />
              </ProtectedRoute>
            }
          />

          {/* === Public Footer Pages === */}
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

          {/* === Admin Routes === */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/kyc" element={<KYCApproval />} />

          {/* === Seller Protected Routes === */}
          <Route
            path="/seller/*"
            element={
              <ProtectedSellerRoute>
                <SellerRoutes />
              </ProtectedSellerRoute>
            }
          />

          {/* === 404 Page === */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </div>

      {!isSellerRoute && !isAdminRoute && <Footer />}
    </div>
  );
}

// === Seller Nested Routes ===
function SellerRoutes() {
  return (
    <Routes>
      <Route path="" element={<SellerDashboard />}>
        <Route index element={<ProfilePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="add-product" element={<AddProductForm />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
