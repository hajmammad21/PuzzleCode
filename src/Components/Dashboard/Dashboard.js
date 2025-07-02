import React, { useEffect, useState } from 'react';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const [user, setUser] = useState(null);      // Stores user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch('http://localhost:5000/api/user/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 401) {
        window.location.href = '/login';
      }
      return res.json();
    })
    .then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (!user) return <div>خطا در دریافت اطلاعات کاربر</div>;

  // Here, we assume 'role' is part of the user info.
  return (
    <>
      {user.role === 'admin'
        ? <AdminDashboard user={user} />
        : <UserDashboard user={user} />}
    </>
  );
};

export default Dashboard;
