// src/pages/FooterContent.js
import React from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

const contentMap = {
  "/about-us": {
    title: "About Us",
    text: "QuitQ is your one-stop destination for everything unique and affordable. We're passionate about offering great products at great prices. Our team is committed to quality, innovation, and customer satisfaction."
  },
  "/contact-us": {
    title: "Contact Us",
    text: "We’d love to hear from you! Whether it’s a question, feedback, or issue, we’re here to help. Reach out via our contact form, email, or support hotline. Your satisfaction is our priority."
  },
  "/careers": {
    title: "Careers",
    text: "Join the QuitQ family and help shape the future of online shopping. We offer exciting roles across tech, marketing, design, and operations. Grow your career with us."
  },
  "/quitq-stories": {
    title: "QuitQ Stories",
    text: "Explore inspiring stories from our users and team. Learn how QuitQ empowers people through creative shopping experiences. Stay updated on what's new and trending."
  },
  "/payments": {
    title: "Payments",
    text: "We support all major payment options: credit/debit cards, UPI, wallets, and cash on delivery. Our secure gateway ensures your payment is always safe and seamless."
  },
  "/shipping": {
    title: "Shipping",
    text: "Fast and reliable shipping across India. Track your orders live and receive updates in real-time. We aim to deliver your products quickly and safely."
  },
  "/returns": {
    title: "Returns",
    text: "Not happy with your order? No worries. We offer an easy and transparent return policy. Just follow the steps in our Returns section to initiate a return."
  },
  "/faq": {
    title: "Frequently Asked Questions",
    text: "Find answers to common questions about orders, accounts, payments, and more. Our FAQ is designed to help you solve issues quickly and independently."
  },
  "/return-policy": {
    title: "Return Policy",
    text: "You can return products within 7 days of delivery. Items must be unused and in original packaging. Check our full return policy for more details."
  },
  "/terms-of-use": {
    title: "Terms of Use",
    text: "By using QuitQ, you agree to follow our terms and conditions. Read about account rules, product usage, and platform guidelines here."
  },
  "/security": {
    title: "Security",
    text: "We prioritize your data protection. QuitQ uses secure encryption and privacy practices to protect all transactions and customer data."
  },
  "/privacy": {
    title: "Privacy Policy",
    text: "Your privacy matters to us. Learn how we collect, use, and protect your personal information in accordance with Indian data laws."
  }
};

const FooterContent = () => {
  const location = useLocation();
  const path = location.pathname;
  const content = contentMap[path];

  if (!content) {
    return (
      <div className="footer-content-page">
        <h2>Page Not Found</h2>
        <p>The page you’re looking for doesn’t exist.</p>
      </div>
    );
  }

  return (
    <div className="footer-content-page">
      <h2>{content.title}</h2>
      <p>{content.text}</p>
    </div>
  );
};

export default FooterContent;
