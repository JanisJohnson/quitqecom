import React from "react";

function PendingVerification() {
  return (
    <div className="pending-verification">
      <div className="verification-box">
        <div className="spinner" />
        <h2>Verification Pending</h2>
        <p>Your KYC verification is under review.</p>
        <p className="highlight-warning">Please check back later after admin approval.</p>
       
      </div>
    </div>
  );
}

export default PendingVerification;

