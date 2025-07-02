import React, { useEffect, useState } from 'react';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { fetchWithAuth } from '../../api';

const Dashboard = () => {
  const [user, setUser] = useState(null);      // Stores user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchUser() {
    const res = await fetchWithAuth('http://localhost:5000/api/user/dashboard');
    if (res && res.ok) {
      const data = await res.json();
      setUser(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  fetchUser();
}, []);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (!user) return <div>خطا در دریافت اطلاعات کاربر</div>;

  return (
    <>
      {user.role === 'admin'
        ? <AdminDashboard user={user} />
        : <UserDashboard user={user} />}
    </>
  );
};

export default Dashboard;
