// pages/PaymentPage.js
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";

// ✅ Replace with your own Stripe publishable key
const stripePromise = loadStripe("pk_test_51RqzwoLfL2CIuPSuMvdAJDwVVccapTkxW6e4YQMdu6uZNvBqnu6Zwczz39ospJHnqvIZFIGMRK2XB1R5WDkDdDUl00tbVxm3NY");

const PaymentPage = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Payment Page</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
