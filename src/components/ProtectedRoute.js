import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // If AuthContext says not authenticated, fallback to localStorage
  const token = localStorage.getItem("token");
  const localUser = JSON.parse(localStorage.getItem("user"));

  const effectiveIsAuthenticated = isAuthenticated || !!token;
  const effectiveUser = user || localUser;

  if (!effectiveIsAuthenticated) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(effectiveUser?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
