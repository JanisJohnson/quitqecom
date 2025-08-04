import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const KYCApproval = () => {
  const [businessDetails, setBusinessDetails] = useState([]);

  const fetchBusinessDetails = async () => {
    try {
      const res = await axios.get('http://localhost:5001/businessDetails');
      setBusinessDetails(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch business details");
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5001/businessDetails/${id}`, {
        kycStatus: newStatus,
      });
      toast.success(`KYC status updated to ${newStatus}`);
      fetchBusinessDetails(); // Refresh after update
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="kyc-container">
      <h2 className="kyc-heading">KYC Approvals</h2>
      <table className="kyc-table">
        <thead>
          <tr>
            <th>Seller Name</th>
            <th>Business Name</th>
            <th>GST No</th>
            <th>KYC Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businessDetails.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.businessName}</td>
              <td>{item.gstNumber}</td>
              <td>{item.kycStatus}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(item.id, 'approved')}
                  disabled={item.kycStatus === 'approved'}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => updateStatus(item.id, 'rejected')}
                  disabled={item.kycStatus === 'rejected'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KYCApproval;
