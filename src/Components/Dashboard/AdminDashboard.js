import React from 'react';
import AdminContactMessages from './AdminContactMessages';
import AdminNotificationPanel from './AdminNotificationPanel';
import './AdminDashboard.css';

const AdminDashboard = ({ user }) => (
  <div className="dashboard-main">
    <div className="admin-dashboard-grid">
      <AdminContactMessages />
      <AdminNotificationPanel />
    </div>
  </div>
);

export default AdminDashboard;