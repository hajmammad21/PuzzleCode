import React from 'react';
import AdminNotificationPanel from './AdminNotificationPanel';

const AdminDashboard = ({ user }) => (
  <div className="dashboard-main">
    <AdminNotificationPanel />
    {/* You can add more admin features here */}
  </div>
);

export default AdminDashboard;