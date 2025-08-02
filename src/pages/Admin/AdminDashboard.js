import React, { useEffect, useState, useRef } from 'react';
import adminData from '../../mock/adminTestData.json';
import ManageCategories from './ManageCategories';
import KYCApproval from '../Admin/KYCApproval';


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showKYCApproval, setShowKYCApproval] = useState(false); // ✅

  const sellerRef = useRef(null);
  const userRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    setSellers(adminData.sellers);
    setUsers(adminData.users);
    setCategories(adminData.categories || []);

    setStats({
      totalUsers: adminData.users.length,
      totalProducts: 100,
      ordersToday: 25,
      revenueThisMonth: 12000,
      totalSellers: adminData.sellers.length,
    });
  }, []);

  const toggleStatus = (type, index) => {
    const list = type === 'seller' ? [...sellers] : [...users];
    list[index].status = list[index].status === 'active' ? 'inactive' : 'active';
    type === 'seller' ? setSellers(list) : setUsers(list);
  };

  const scrollToSellers = () => sellerRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToUsers = () => userRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToCategories = () => categoryRef.current?.scrollIntoView({ behavior: 'smooth' });

  if (!stats) return <p>Loading admin dashboard...</p>;

  return (
    <div className="admin-wrapper">
      <div className="admin-sidebar">
        <h2>Admin</h2>
        <button onClick={() => setShowKYCApproval(false)}>Dashboard</button>
        <button onClick={scrollToUsers}>Manage Users</button>
        <button onClick={scrollToSellers}>Manage Sellers</button>
        <button onClick={scrollToCategories}>Manage Categories</button>
        <button onClick={() => setShowKYCApproval(true)}>KYC Approval</button>
      </div>

      <div className="admin-main-content">
        {showKYCApproval ? (
          <div className="kyc-approval-wrapper">
            <button className="back-btn" onClick={() => setShowKYCApproval(false)}>
                   ← Back to Dashboard
            </button>
            <KYCApproval />
            </div>

        ) : (
          <>
            <h1>Admin Dashboard</h1>

            <div className="info-cards">
              <div className="info-card"><h3>Total Users</h3><p>{stats.totalUsers}</p></div>
              <div className="info-card"><h3>Total Products</h3><p>{stats.totalProducts}</p></div>
              <div className="info-card"><h3>Orders Today</h3><p>{stats.ordersToday}</p></div>
              <div className="info-card"><h3>Total Sellers</h3><p>{stats.totalSellers}</p></div>
            </div>

            <div className="admin-table" ref={sellerRef}>
              <h3>Seller Login Info</h3>
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Last Login</th><th>Manage</th></tr>
                </thead>
                <tbody>
                  {sellers.map((s, i) => (
                    <tr key={i}>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.lastLogin || 'N/A'}</td>
                      <td>
                        <button
                          className={s.status === 'active' ? 'deactivate' : 'activate'}
                          onClick={() => toggleStatus('seller', i)}
                        >
                          {s.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-table" ref={userRef}>
              <h3>User Login Info</h3>
              <table>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Last Login</th><th>Manage</th></tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>{u.email || 'N/A'}</td>
                      <td>{u.lastLogin || 'N/A'}</td>
                      <td>
                        <button
                          className={u.status === 'active' ? 'deactivate' : 'activate'}
                          onClick={() => toggleStatus('user', i)}
                        >
                          {u.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div ref={categoryRef}>
              <ManageCategories categories={categories} setCategories={setCategories} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
