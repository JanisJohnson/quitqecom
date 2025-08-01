import React, { useEffect, useState } from 'react';
import adminData from '../../mock/adminTestData.json';



const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching from API
    setSellers(adminData.sellers);
    setUsers(adminData.users);
    setStats({
      totalUsers: adminData.users.length,
      totalProducts: 100,
      ordersToday: 25,
      revenueThisMonth: 12000,
      totalSellers: adminData.sellers.length
    });
  }, []);

  const toggleStatus = (type, index) => {
    const list = type === 'seller' ? [...sellers] : [...users];
    list[index].status = list[index].status === 'active' ? 'inactive' : 'active';
    type === 'seller' ? setSellers(list) : setUsers(list);
  };

  if (!stats) return <p>Loading admin dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin</h2>
        <button>Manage Users</button>
        <button>Manage Sellers</button>
        <button>KYC Approval</button>
        <button>Manage Categories</button>
      </div>

      <div className="main-content">
        <h1>Admin Dashboard</h1>

        <div className="info-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="card">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>
          <div className="card">
            <h3>Orders Today</h3>
            <p>{stats.ordersToday}</p>
          </div>
          <div className="card">
            <h3>Total Sellers</h3>
            <p>{stats.totalSellers}</p>
          </div>
        </div>

        {/* Seller Login Info Table */}
        <div className="custom-table">
          <h3>Seller Login Info</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Last Login</th><th>Manage Account</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.lastLogin}</td>
                  <td>
                    <button
                      className={s.status === 'active' ? 'deactivate' : 'activate'}
                      onClick={() => toggleStatus('seller', index)}
                    >
                      {s.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Login Info Table */}
        <div className="custom-table">
          <h3>User Login Info</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Last Login</th><th>Manage Account</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.lastLogin}</td>
                  <td>
                    <button
                      className={u.status === 'active' ? 'deactivate' : 'activate'}
                      onClick={() => toggleStatus('user', index)}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
